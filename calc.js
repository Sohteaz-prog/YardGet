// Calculs : totaux, reste à dépenser, alertes, suggestions, séries pour les graphiques.

import { FREQUENCIES } from './catalog.js';
import { nextOccurrence } from './store.js';
import {
  todayISO, currentMonth, monthKey, addMonths, daysInMonth, addDays, diffDays,
  weekStart, isoWeekNumber, labelMonthShort, fromISO, pct,
} from './util.js';

export const catById = (s, id) => s.categories.find((c) => c.id === id);
export const groupById = (s, id) => s.groups.find((g) => g.id === id);
export const isSaving = (s, catId) => (catById(s, catId) || {}).groupId === 'epargne';

/** Budgets d'un mois : figés pour les mois passés, actuels sinon. */
export function budgetsFor(s, mk) {
  if (mk < currentMonth() && s.budgetHistory[mk]) return s.budgetHistory[mk];
  const map = {};
  s.categories.forEach((c) => { map[c.id] = c.budget || 0; });
  return map;
}

export function expensesIn(s, fromIso, toIso, accountId = null) {
  return s.expenses.filter((e) => e.date >= fromIso && e.date <= toIso && (!accountId || e.accountId === accountId));
}

export function monthRange(mk) {
  return [`${mk}-01`, `${mk}-${String(daysInMonth(mk)).padStart(2, '0')}`];
}

export function spentByCategory(s, mk) {
  const [a, b] = monthRange(mk);
  const map = {};
  for (const e of expensesIn(s, a, b)) map[e.categoryId] = (map[e.categoryId] || 0) + e.amount;
  return map;
}

export function regularIncome(s) {
  return s.incomes.filter((i) => i.type === 'regulier').reduce((t, i) => t + i.amount, 0);
}

export function oneOffIncomes(s, mk) {
  return s.incomes.filter((i) => i.type === 'ponctuel' && monthKey(i.date) === mk);
}

/** Résumé d'un mois : budget de dépenses, dépensé, épargné, reste. */
export function monthSummary(s, mk = currentMonth()) {
  const budgets = budgetsFor(s, mk);
  const spentMap = spentByCategory(s, mk);
  let budgetSpend = 0;
  let budgetSave = 0;
  let spent = 0;
  let saved = 0;
  for (const c of s.categories) {
    const b = budgets[c.id] || 0;
    const sp = spentMap[c.id] || 0;
    if (c.groupId === 'epargne') { budgetSave += b; saved += sp; } else { budgetSpend += b; spent += sp; }
  }
  // dépenses de catégories supprimées entre-temps
  for (const [id, v] of Object.entries(spentMap)) if (!catById(s, id)) spent += v;
  const extra = oneOffIncomes(s, mk).filter((i) => i.destination !== 'objectif').reduce((t, i) => t + i.amount, 0);
  const available = budgetSpend + extra;
  const reste = available - spent;
  const today = todayISO();
  const isCurrent = mk === currentMonth();
  const daysLeft = isCurrent ? daysInMonth(mk) - fromISO(today).getDate() + 1 : 0;
  return {
    mk, budgets, spentMap, budgetSpend, budgetSave, spent, saved, extra, available, reste,
    daysLeft, perDay: daysLeft > 0 ? Math.max(0, Math.floor(reste / daysLeft)) : 0,
    progress: isCurrent ? fromISO(today).getDate() / daysInMonth(mk) : 1,
  };
}

/** Totaux par groupe pour le budget courant. */
export function groupBudgets(s) {
  const out = {};
  s.groups.forEach((g) => { out[g.id] = 0; });
  s.categories.forEach((c) => { out[c.groupId] = (out[c.groupId] || 0) + (c.budget || 0); });
  return out;
}

// ---------- Abonnements ----------

export function monthlyEquivalent(sub) {
  return Math.round((sub.amount * FREQUENCIES[sub.frequency].perYear) / 12);
}

export function yearlyCost(sub) {
  return sub.amount * FREQUENCIES[sub.frequency].perYear;
}

/** Prochaine date de prélèvement à partir d'aujourd'hui (incluse), ou null si terminé. */
export function nextDueDate(sub, from = todayISO()) {
  const anchor = Number(sub.startDate.slice(8, 10));
  let d = sub.startDate;
  let guard = 0;
  while (d < from && guard < 1200) { d = nextOccurrence(d, sub.frequency, anchor); guard++; }
  if (sub.endDate && d > sub.endDate) return null;
  return d;
}

export function upcomingCharges(s, days = 30) {
  const today = todayISO();
  const limit = addDays(today, days);
  const out = [];
  for (const sub of s.subscriptions) {
    if (sub.status !== 'actif') continue;
    // demain au plus tôt : ce qui tombe aujourd'hui est déjà compté
    const d = nextDueDate(sub, addDays(today, 1));
    if (d && d <= limit) out.push({ sub, date: d });
  }
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

// ---------- Alertes ----------

export function categoryThresholds(s, cat) {
  if (Array.isArray(cat.thresholds)) return cat.thresholds;
  return [50, 80, 100].filter((t) => s.settings.thresholds[t]);
}

export function alerts(s) {
  const list = [];
  const sum = monthSummary(s);
  const today = todayISO();

  // Seuils par catégorie
  for (const c of s.categories) {
    if (c.groupId === 'epargne') continue;
    const b = sum.budgets[c.id] || 0;
    const sp = sum.spentMap[c.id] || 0;
    if (!b || !sp) continue;
    const p = (sp / b) * 100;
    const reached = categoryThresholds(s, c).filter((t) => p >= t).sort((a, b2) => b2 - a)[0];
    if (!reached) continue;
    if (c.fixed && p <= 100) continue; // une dépense fixe payée en une fois n'est pas une alerte
    list.push({
      kind: reached >= 100 ? 'danger' : 'warn',
      icon: 'cloche',
      catId: c.id,
      title: `${c.name} : ${Math.round(p)} %`,
      text: reached >= 100 && sp > b
        ? `Budget dépassé de ${Math.round((sp - b) / 100)} €`
        : `Seuil de ${reached} % atteint`,
      weight: p,
    });
  }

  // Rythme : on dépense plus vite que le mois n'avance (hors dépenses fixes et abonnements)
  if (s.settings.paceAlert && sum.progress < 0.9) {
    const [a] = monthRange(sum.mk);
    let flexBudget = 0;
    let flexSpent = 0;
    for (const c of s.categories) {
      if (c.groupId === 'epargne' || c.fixed) continue;
      flexBudget += sum.budgets[c.id] || 0;
    }
    for (const e of expensesIn(s, a, today)) {
      const c = catById(s, e.categoryId);
      if (!c || c.groupId === 'epargne' || c.fixed || e.subscriptionId) continue;
      flexSpent += e.amount;
    }
    if (flexBudget > 0 && fromISO(today).getDate() >= 5) {
      const ratio = flexSpent / flexBudget;
      if (ratio > sum.progress + 0.15) {
        list.push({
          kind: 'warn',
          icon: 'alerte',
          title: 'Rythme rapide',
          text: `${Math.round(ratio * 100)} % du budget variable dépensé pour ${Math.round(sum.progress * 100)} % du mois`,
          weight: 200,
        });
      }
    }
  }

  // Abonnements : renouvellement annuel ou fin proche
  for (const sub of s.subscriptions) {
    if (sub.status !== 'actif') continue;
    const remind = Number(sub.reminderDays ?? 3);
    const next = nextDueDate(sub, addDays(today, 1));
    if (next && (sub.frequency === 'annuel' || sub.frequency === 'trimestriel')) {
      const n = diffDays(today, next);
      if (n <= Math.max(remind, 7)) {
        list.push({ kind: 'info', icon: 'repeter', title: `${sub.name} : renouvellement`, text: `${n <= 1 ? 'Demain' : 'Dans ' + n + ' jours'} · ${(sub.amount / 100).toFixed(2).replace('.', ',')} €`, weight: 50 });
      }
    }
    if (sub.endDate) {
      const n = diffDays(today, sub.endDate);
      if (n >= 0 && n <= 14) {
        list.push({ kind: 'info', icon: 'calendrier', title: `${sub.name} se termine`, text: n === 0 ? "Aujourd'hui" : `Dans ${n} jours`, weight: 40 });
      }
    }
  }

  return list.sort((x, y) => y.weight - x.weight);
}

export function backupDue(s) {
  if (!s.expenses.length) return false;
  if (!s.settings.lastBackup) return diffDays(s.createdOn, todayISO()) >= 7;
  return diffDays(s.settings.lastBackup, todayISO()) >= 30;
}

// ---------- Moyennes et suggestions ----------

/** Moyenne des N derniers mois complets ayant des données (avant le mois courant). */
export function categoryAverage(s, catId, n = 3) {
  const firstMonth = monthKey(s.createdOn);
  const values = [];
  let mk = addMonths(currentMonth(), -1);
  while (values.length < n && mk >= firstMonth) {
    const [a, b] = monthRange(mk);
    values.push(expensesIn(s, a, b).filter((e) => e.categoryId === catId).reduce((t, e) => t + e.amount, 0));
    mk = addMonths(mk, -1);
  }
  if (!values.length) return null;
  return { avg: Math.round(values.reduce((t, v) => t + v, 0) / values.length), months: values.length };
}

export function completedMonths(s) {
  const first = monthKey(s.createdOn);
  let n = 0;
  let mk = addMonths(currentMonth(), -1);
  while (mk >= first && n < 24) { n++; mk = addMonths(mk, -1); }
  return n;
}

const round5 = (cents) => Math.max(500, Math.round(cents / 500) * 500);

export function suggestions(s) {
  if (completedMonths(s) < 2) return [];
  const dismissed = s.dismissed[currentMonth()] || [];
  const out = [];
  for (const c of s.categories) {
    if (c.groupId === 'epargne' || c.fixed || dismissed.includes(c.id)) continue;
    const a = categoryAverage(s, c.id);
    if (!a || a.months < 2 || a.avg < 500) continue; // pas de dépense régulière : rien à proposer
    const b = c.budget || 0;
    const diff = a.avg - b;
    if (Math.abs(diff) < Math.max(1000, b * 0.15)) continue;
    const proposed = round5(a.avg);
    if (proposed === b) continue;
    out.push({ cat: c, avg: a.avg, months: a.months, budget: b, proposed, diff: proposed - b });
  }
  return out.sort((x, y) => Math.abs(y.diff) - Math.abs(x.diff));
}

/**
 * Répartition conseillée : règle 50/30/20 par groupe, puis pondération par catégorie.
 * Les dépenses fixes déjà budgétées (loyer, forfait) gardent leur montant réel ;
 * si elles dépassent la part des besoins, l'excédent est pris sur les envies.
 */
export function recommendedSplit(s, income) {
  const result = {};
  const targets = {};
  s.groups.forEach((g) => { targets[g.id] = Math.round((income * g.target) / 100); });

  const fixedSum = {};
  s.categories.forEach((c) => {
    if (c.fixed && c.budget > 0) {
      result[c.id] = c.budget;
      fixedSum[c.groupId] = (fixedSum[c.groupId] || 0) + c.budget;
    }
  });
  const overflow = Math.max(0, (fixedSum.besoins || 0) - (targets.besoins || 0));
  if (overflow && targets.envies != null) targets.envies = Math.max(0, targets.envies - overflow);

  for (const g of s.groups) {
    const free = s.categories.filter((c) => c.groupId === g.id && result[c.id] == null);
    const amount = Math.max(0, (targets[g.id] || 0) - (fixedSum[g.id] || 0));
    const totalWeight = free.reduce((t, c) => t + (c.weight || 0), 0);
    let used = 0;
    free.forEach((c, i) => {
      const w = totalWeight ? (c.weight || 0) : 1;
      const tw = totalWeight || free.length;
      let v = Math.round(((amount * w) / tw) / 500) * 500;
      if (i === free.length - 1) v = Math.max(0, amount - used);
      used += v;
      result[c.id] = v;
    });
  }
  return result;
}

// ---------- Séries pour l'analyse ----------

export function seriesFor(s, period) {
  const today = todayISO();
  const mk = currentMonth();
  const monthlyBudget = monthSummary(s, mk).budgetSpend;
  const buckets = [];

  if (period === 'jour') {
    for (let i = 13; i >= 0; i--) {
      const d = addDays(today, -i);
      buckets.push({ from: d, to: d, label: String(fromISO(d).getDate()), current: i === 0 });
    }
  } else if (period === 'semaine') {
    const ws = weekStart(today);
    for (let i = 7; i >= 0; i--) {
      const from = addDays(ws, -7 * i);
      buckets.push({ from, to: addDays(from, 6), label: 'S' + isoWeekNumber(from), current: i === 0 });
    }
  } else if (period === 'mois') {
    for (let i = 5; i >= 0; i--) {
      const m = addMonths(mk, -i);
      const [from, to] = monthRange(m);
      buckets.push({ from, to, label: labelMonthShort(m).replace('.', ''), current: i === 0 });
    }
  } else {
    const y = mk.slice(0, 4);
    for (let m = 1; m <= 12; m++) {
      const key = `${y}-${String(m).padStart(2, '0')}`;
      const [from, to] = monthRange(key);
      buckets.push({ from, to, label: labelMonthShort(key).charAt(0), current: key === mk, future: key > mk });
    }
  }

  const perUnit = period === 'jour' ? monthlyBudget / daysInMonth(mk)
    : period === 'semaine' ? (monthlyBudget * 12) / 52
      : monthlyBudget;

  const byCat = {};
  const rows = buckets.map((bk) => {
    let besoins = 0;
    let envies = 0;
    for (const e of expensesIn(s, bk.from, bk.to)) {
      const c = catById(s, e.categoryId);
      const g = c ? c.groupId : 'envies';
      if (g === 'epargne') continue;
      if (g === 'besoins') besoins += e.amount; else envies += e.amount;
      byCat[e.categoryId] = (byCat[e.categoryId] || 0) + e.amount;
    }
    return { ...bk, besoins, envies, total: besoins + envies };
  });

  const done = rows.filter((r) => !r.current && !r.future && r.from >= s.createdOn.slice(0, period === 'jour' ? 10 : 7));
  const avg = done.length ? Math.round(done.reduce((t, r) => t + r.total, 0) / done.length) : null;
  const total = rows.reduce((t, r) => t + r.total, 0);
  const max = Math.max(perUnit, ...rows.map((r) => r.total), 1);

  const cats = Object.entries(byCat)
    .map(([id, v]) => ({ cat: catById(s, id), amount: v }))
    .filter((x) => x.cat)
    .sort((a, b) => b.amount - a.amount);

  return { rows, budget: Math.round(perUnit), avg, total, max, cats };
}

// ---------- Vue lissée ----------

export function smoothing(s) {
  const items = [];
  for (const sub of s.subscriptions) {
    if (sub.status !== 'actif') continue;
    if (sub.frequency !== 'annuel' && sub.frequency !== 'trimestriel') continue;
    items.push({ kind: 'abo', id: sub.id, name: sub.name, categoryId: sub.categoryId, yearly: yearlyCost(sub), next: nextDueDate(sub) });
  }
  for (const a of s.annuals) {
    const next = nextAnnualDate(a.dueDate);
    items.push({ kind: 'annuel', id: a.id, name: a.name, categoryId: a.categoryId, yearly: a.amount, next });
  }
  const total = items.reduce((t, x) => t + x.yearly, 0);
  return { items: items.sort((a, b) => (a.next || '').localeCompare(b.next || '')), total, monthly: Math.round(total / 12) };
}

/** Prochaine occurrence d'une échéance annuelle (même jour et mois). */
export function nextAnnualDate(iso) {
  const today = todayISO();
  let d = iso;
  let guard = 0;
  while (d < today && guard < 100) { d = nextOccurrence(d, 'annuel'); guard++; }
  return d;
}

// ---------- Bilan mensuel ----------

export function monthReview(s, mk) {
  const sum = monthSummary(s, mk);
  const lines = s.categories
    .filter((c) => c.groupId !== 'epargne')
    .map((c) => {
      const b = sum.budgets[c.id] || 0;
      const sp = sum.spentMap[c.id] || 0;
      return { cat: c, budget: b, spent: sp, diff: sp - b };
    })
    .filter((l) => l.budget || l.spent)
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  const goalsAdded = s.goals.reduce((t, g) => t + g.contributions.filter((c) => monthKey(c.date) === mk).reduce((x, c) => x + c.amount, 0), 0);
  return { ...sum, lines, goalsAdded, balance: sum.available - sum.spent, usage: pct(sum.spent, sum.available) };
}

export function goalSaved(goal) {
  return goal.contributions.reduce((t, c) => t + c.amount, 0);
}

/** Montant mensuel conseillé pour atteindre un objectif à l'échéance. */
export function goalMonthly(goal) {
  if (!goal.deadline) return null;
  const left = goal.target - goalSaved(goal);
  if (left <= 0) return 0;
  const now = currentMonth();
  const end = goal.deadline.slice(0, 7);
  let months = 0;
  let m = now;
  while (m <= end && months < 600) { months++; m = addMonths(m, 1); }
  return Math.ceil(left / Math.max(1, months));
}
