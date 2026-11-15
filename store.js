// Données : chargement, sauvegarde locale, export / import, actions.

import { DEFAULT_CATEGORIES, GROUPS } from './catalog.js';
import { uid, todayISO, currentMonth, monthKey, addDays, fromISO, toISO, daysInMonth } from './util.js';

const KEY = 'yardget:v1';
export const DATA_VERSION = 1;

function freshState() {
  return {
    version: DATA_VERSION,
    createdOn: todayISO(),
    settings: {
      theme: 'auto', // auto | clair | sombre
      periodDefault: 'derniere', // derniere | jour | semaine | mois | annee
      lastPeriod: 'mois',
      thresholds: { 50: false, 80: true, 100: true },
      paceAlert: true,
      multiAccounts: false,
      lastBackup: null,
      onboarded: false,
      installDismissedOn: null,
    },
    groups: GROUPS.map((g) => ({ ...g })),
    categories: DEFAULT_CATEGORIES.map((c) => ({
      ...c,
      budget: 0,
      thresholds: null, // null = réglage général
      fixed: !!c.fixed,
    })),
    expenses: [],
    incomes: [],
    subscriptions: [],
    goals: [],
    annuals: [],
    accounts: [{ id: 'courant', name: 'Compte courant' }],
    budgetHistory: {}, // { 'AAAA-MM': { catId: centimes } }
    dismissed: {}, // { 'AAAA-MM': [catId] }
    lastOpenMonth: currentMonth(),
    pendingReview: null, // mois dont le bilan n'a pas encore été vu
  };
}

let state = null;
const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach((fn) => fn(state));
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? migrate(JSON.parse(raw)) : freshState();
  } catch (e) {
    console.error('Lecture des données impossible', e);
    state = freshState();
  }
  startOfSession();
  persistNow();
  return state;
}

function migrate(data) {
  const base = freshState();
  const s = { ...base, ...data };
  s.settings = { ...base.settings, ...(data.settings || {}) };
  s.settings.thresholds = { ...base.settings.thresholds, ...((data.settings || {}).thresholds || {}) };
  for (const k of ['groups', 'categories', 'expenses', 'incomes', 'subscriptions', 'goals', 'annuals', 'accounts']) {
    if (!Array.isArray(s[k])) s[k] = base[k];
  }
  if (!s.groups.length) s.groups = base.groups;
  if (!s.accounts.length) s.accounts = base.accounts;
  s.budgetHistory = s.budgetHistory || {};
  s.dismissed = s.dismissed || {};
  s.version = DATA_VERSION;
  return s;
}

let saveTimer = null;
function persistNow() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Sauvegarde impossible', e);
  }
}

/** Applique une modification, sauvegarde et redessine. */
export function update(mutator) {
  mutator(state);
  clearTimeout(saveTimer);
  persistNow();
  emit();
}

// ---------- Début de session : changement de mois et abonnements ----------

function startOfSession() {
  const mk = currentMonth();
  if (state.lastOpenMonth && state.lastOpenMonth < mk) {
    // On fige les budgets du dernier mois ouvert (et des mois sautés)
    let m = state.lastOpenMonth;
    while (m < mk) {
      if (!state.budgetHistory[m]) state.budgetHistory[m] = snapshotBudgets();
      const [y, mo] = m.split('-').map(Number);
      const d = new Date(y, mo, 1);
      m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }
    // Le bilan du mois précédent devient disponible
    const prev = previousMonth(mk);
    const hadData = state.expenses.some((e) => monthKey(e.date) === prev);
    state.pendingReview = hadData ? prev : null;
  }
  state.lastOpenMonth = mk;
  processSubscriptions();
}

function previousMonth(mk) {
  const [y, m] = mk.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function snapshotBudgets() {
  const snap = {};
  state.categories.forEach((c) => { snap[c.id] = c.budget || 0; });
  return snap;
}

/** Date suivante d'un abonnement, en gardant le jour d'ancrage. */
export function nextOccurrence(iso, frequency, anchorDay) {
  if (frequency === 'hebdo') return addDays(iso, 7);
  const step = frequency === 'mensuel' ? 1 : frequency === 'trimestriel' ? 3 : 12;
  const d = fromISO(iso);
  const target = new Date(d.getFullYear(), d.getMonth() + step, 1);
  const mk = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}`;
  const day = Math.min(anchorDay || d.getDate(), daysInMonth(mk));
  target.setDate(day);
  return toISO(target);
}

/** Enregistre automatiquement les prélèvements arrivés à échéance. */
export function processSubscriptions() {
  const today = todayISO();
  for (const sub of state.subscriptions) {
    if (sub.status !== 'actif') continue;
    const anchor = Number(sub.startDate.slice(8, 10));
    let d = sub.startDate;
    let guard = 0;
    while (d <= today && guard < 600) {
      guard++;
      if (sub.endDate && d > sub.endDate) break;
      if (d >= (sub.trackFrom || sub.startDate)) {
        const exists = state.expenses.some((e) => e.subscriptionId === sub.id && e.date === d);
        if (!exists) {
          state.expenses.push({
            id: uid(),
            amount: sub.amount,
            categoryId: sub.categoryId,
            date: d,
            note: sub.name,
            accountId: sub.accountId || null,
            subscriptionId: sub.id,
          });
        }
      }
      d = nextOccurrence(d, sub.frequency, anchor);
    }
  }
}

// ---------- Actions ----------

export function saveExpense(data) {
  update((s) => {
    if (data.id) {
      const i = s.expenses.findIndex((e) => e.id === data.id);
      if (i >= 0) s.expenses[i] = { ...s.expenses[i], ...data };
    } else {
      s.expenses.push({ ...data, id: uid() });
    }
  });
}

export function deleteExpense(id) {
  update((s) => { s.expenses = s.expenses.filter((e) => e.id !== id); });
}

export function saveSubscription(data) {
  update((s) => {
    if (data.id) {
      const i = s.subscriptions.findIndex((x) => x.id === data.id);
      if (i >= 0) s.subscriptions[i] = { ...s.subscriptions[i], ...data };
    } else {
      s.subscriptions.push({ ...data, id: uid(), trackFrom: todayISO() });
    }
  });
  update(() => processSubscriptions());
}

export function deleteSubscription(id, keepHistory = true) {
  update((s) => {
    s.subscriptions = s.subscriptions.filter((x) => x.id !== id);
    if (keepHistory) {
      s.expenses.forEach((e) => { if (e.subscriptionId === id) e.subscriptionId = null; });
    } else {
      s.expenses = s.expenses.filter((e) => e.subscriptionId !== id);
    }
  });
}

export function saveIncome(data) {
  update((s) => {
    if (data.id) {
      const i = s.incomes.findIndex((x) => x.id === data.id);
      if (i >= 0) s.incomes[i] = { ...s.incomes[i], ...data };
    } else {
      const inc = { ...data, id: uid() };
      s.incomes.push(inc);
      if (inc.type === 'ponctuel' && inc.destination === 'objectif' && inc.goalId) {
        const g = s.goals.find((x) => x.id === inc.goalId);
        if (g) g.contributions.push({ id: uid(), date: inc.date, amount: inc.amount, incomeId: inc.id });
      }
    }
  });
}

export function deleteIncome(id) {
  update((s) => {
    s.incomes = s.incomes.filter((x) => x.id !== id);
    s.goals.forEach((g) => { g.contributions = g.contributions.filter((c) => c.incomeId !== id); });
  });
}

export function saveCategory(data) {
  update((s) => {
    if (data.id) {
      const i = s.categories.findIndex((x) => x.id === data.id);
      if (i >= 0) s.categories[i] = { ...s.categories[i], ...data };
    } else {
      s.categories.push({ weight: 10, fixed: false, thresholds: null, budget: 0, ...data, id: uid() });
    }
  });
}

/** Supprime une catégorie en déplaçant ses dépenses et abonnements vers une autre (fusion). */
export function mergeCategory(fromId, toId) {
  update((s) => {
    if (fromId === toId) return;
    const from = s.categories.find((c) => c.id === fromId);
    const to = s.categories.find((c) => c.id === toId);
    if (!from || !to) return;
    s.expenses.forEach((e) => { if (e.categoryId === fromId) e.categoryId = toId; });
    s.subscriptions.forEach((x) => { if (x.categoryId === fromId) x.categoryId = toId; });
    s.annuals.forEach((x) => { if (x.categoryId === fromId) x.categoryId = toId; });
    to.budget = (to.budget || 0) + (from.budget || 0);
    s.categories = s.categories.filter((c) => c.id !== fromId);
  });
}

export function setBudgets(map) {
  update((s) => {
    s.categories.forEach((c) => { if (map[c.id] != null) c.budget = map[c.id]; });
  });
}

export function dismissSuggestion(catId) {
  update((s) => {
    const mk = currentMonth();
    s.dismissed[mk] = [...(s.dismissed[mk] || []), catId];
  });
}

export function saveGoal(data) {
  update((s) => {
    if (data.id) {
      const i = s.goals.findIndex((x) => x.id === data.id);
      if (i >= 0) s.goals[i] = { ...s.goals[i], ...data };
    } else {
      s.goals.push({ contributions: [], ...data, id: uid() });
    }
  });
}

export function addContribution(goalId, amount, date) {
  update((s) => {
    const g = s.goals.find((x) => x.id === goalId);
    if (g) g.contributions.push({ id: uid(), date, amount });
  });
}

export function deleteGoal(id) {
  update((s) => { s.goals = s.goals.filter((x) => x.id !== id); });
}

export function saveAnnual(data) {
  update((s) => {
    if (data.id) {
      const i = s.annuals.findIndex((x) => x.id === data.id);
      if (i >= 0) s.annuals[i] = { ...s.annuals[i], ...data };
    } else {
      s.annuals.push({ ...data, id: uid() });
    }
  });
}

export function deleteAnnual(id) {
  update((s) => { s.annuals = s.annuals.filter((x) => x.id !== id); });
}

export function saveAccount(data) {
  update((s) => {
    if (data.id) {
      const a = s.accounts.find((x) => x.id === data.id);
      if (a) a.name = data.name;
    } else {
      s.accounts.push({ id: uid(), name: data.name });
    }
  });
}

export function deleteAccount(id) {
  update((s) => {
    if (s.accounts.length <= 1) return;
    s.accounts = s.accounts.filter((a) => a.id !== id);
    const fallback = s.accounts[0].id;
    for (const k of ['expenses', 'incomes', 'subscriptions']) {
      s[k].forEach((x) => { if (x.accountId === id) x.accountId = fallback; });
    }
  });
}

export function setSetting(key, value) {
  update((s) => { s.settings[key] = value; });
}

export function setThreshold(level, on) {
  update((s) => { s.settings.thresholds[level] = on; });
}

export function clearPendingReview() {
  update((s) => { s.pendingReview = null; });
}

// ---------- Export / import / remise à zéro ----------

export function exportData() {
  const stamp = todayISO();
  const payload = JSON.stringify({ app: 'yardget', exportedOn: stamp, data: state }, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `yardget-sauvegarde-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  update((s) => { s.settings.lastBackup = stamp; });
}

/** Lit un fichier de sauvegarde. Renvoie les données validées ou lève une erreur. */
export function parseBackup(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Ce fichier n'est pas une sauvegarde lisible.");
  }
  const data = parsed && (parsed.app === 'yardget' || parsed.app === 'mon-budget') ? parsed.data : parsed;
  if (!data || !Array.isArray(data.categories) || !Array.isArray(data.expenses)) {
    throw new Error("Ce fichier ne ressemble pas à une sauvegarde de l'appli.");
  }
  return migrate(data);
}

export function replaceAll(data) {
  state = migrate(data);
  startOfSession();
  persistNow();
  emit();
}

export function resetAll() {
  state = freshState();
  persistNow();
  emit();
}

/** Demande au navigateur de ne pas effacer les données de lui-même. */
export async function requestPersistence() {
  try {
    if (navigator.storage && navigator.storage.persist) {
      const already = await navigator.storage.persisted();
      if (already) return true;
      return await navigator.storage.persist();
    }
  } catch { /* ignoré */ }
  return false;
}

export async function isPersisted() {
  try {
    if (navigator.storage && navigator.storage.persisted) return await navigator.storage.persisted();
  } catch { /* ignoré */ }
  return false;
}
