// Point d'entrée : navigation, rendu, gestion des événements.

import * as store from './store.js';
import { tabbar } from './components.js';
import * as home from './views/home.js';
import * as expenses from './views/expenses.js';
import * as budget from './views/budget.js';
import * as analysis from './views/analysis.js';
import * as settings from './views/settings.js';
import * as sheets from './sheets.js';
import * as install from './install.js';
import { esc } from './util.js';

const VIEWS = {
  accueil: home,
  depenses: expenses,
  'depenses/abonnements': expenses,
  budget,
  analyse: analysis,
  reglages: settings,
};

const ui = {
  route: 'accueil',
  sheet: null,
  homeSel: null,
  expTab: 'historique',
  histMonth: null,
  histFilter: 'tout',
  histAccount: '',
  aboDetail: false,
  period: null,
  reviewMonth: null,
  lastCat: null,
  persisted: false,
};

const viewEl = document.getElementById('view');
const sheetRoot = document.getElementById('sheet');
const toastEl = document.getElementById('toast');
let lastFocus = null;
let toastTimer = null;
let animateNext = false;

// ---------- Contexte partagé avec les écrans ----------

const ctx = {
  ui,
  state: () => store.getState(),
  render,
  renderSheet,
  go(route) {
    const target = '#/' + route;
    if (location.hash === target) handleRoute();
    else location.hash = target;
  },
  openSheet(sh) {
    if (!ui.sheet) lastFocus = document.activeElement;
    animateNext = !ui.sheet || ui.sheet.type !== sh.type;
    ui.sheet = sh;
    renderSheet();
    const panel = sheetRoot.querySelector('.sheet');
    if (panel) panel.focus({ preventScroll: true });
  },
  closeSheet() {
    ui.sheet = null;
    renderSheet();
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  },
  confirm(opts) {
    ctx.openSheet({ type: 'confirm', ...opts });
  },
  toast(message, undo = null) {
    clearTimeout(toastTimer);
    toastEl.innerHTML = `<div class="toast" role="status"><span>${esc(message)}</span>${undo ? '<button type="button" data-action="toast-undo">Annuler</button>' : ''}</div>`;
    toastEl._undo = undo;
    toastTimer = setTimeout(() => { toastEl.innerHTML = ''; toastEl._undo = null; }, undo ? 5000 : 3000);
  },
};

// ---------- Rendu ----------

function render() {
  const s = store.getState();
  const view = VIEWS[ui.route] || home;
  const sameRoute = viewEl.dataset.route === ui.route;
  const y = window.scrollY;
  const card = install.render(s, ui);
  viewEl.innerHTML = view.render(s, ui) + tabbar(ui.route.split('/')[0]) + card;
  document.body.classList.toggle('has-install', !!card);
  viewEl.dataset.route = ui.route;
  if (sameRoute) window.scrollTo(0, y);
}

function renderSheet() {
  const s = store.getState();
  if (!ui.sheet) {
    sheetRoot.classList.remove('open');
    sheetRoot.innerHTML = '';
    document.body.style.overflow = '';
    return;
  }
  const { html, full } = sheets.renderSheet(s, ui.sheet, ui);
  const body = sheetRoot.querySelector('.sheet-body');
  const scroll = body ? body.scrollTop : 0;
  const active = document.activeElement;
  const activeName = active && sheetRoot.contains(active) ? active.getAttribute('name') : null;
  const anim = animateNext ? ' animate' : '';
  animateNext = false;
  sheetRoot.innerHTML = `<div class="scrim${anim}" data-action="${ui.sheet.type === 'onboarding' ? '' : 'close-sheet'}"></div>
    <div class="sheet${full ? ' full' : ''}${anim}" role="dialog" aria-modal="true" aria-label="${esc(((html.match(/<h2[^>]*>([^<]*)<\/h2>/) || [])[1] || 'Fenêtre').replace(/&#39;/g, "'").replace(/&amp;/g, '&'))}" tabindex="-1">${html}</div>`;
  sheetRoot.classList.add('open');
  document.body.style.overflow = 'hidden';
  const nb = sheetRoot.querySelector('.sheet-body');
  if (nb) nb.scrollTop = scroll;
  if (activeName) {
    const again = sheetRoot.querySelector(`[name="${CSS.escape(activeName)}"]`);
    if (again && again.type !== 'checkbox') again.focus({ preventScroll: true });
  }
}

function applyTheme() {
  const pref = store.getState().settings.theme;
  const dark = pref === 'sombre' || (pref === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#0F1117' : '#F4F5F8');
}

function handleRoute() {
  const [r, query] = (location.hash || '#/accueil').replace(/^#\//, '').split('?');
  ui.route = VIEWS[r] ? r : 'accueil';
  if (query === 'ajout') {
    history.replaceState(null, '', '#/' + ui.route);
    setTimeout(() => { if (store.getState().settings.onboarded) sheets.open.expense(ctx); }, 0);
  }
  if (ui.route === 'depenses') ui.expTab = 'historique';
  if (ui.route === 'depenses/abonnements') ui.expTab = 'abonnements';
  if (ui.route === 'analyse' && store.getState().pendingReview) store.clearPendingReview();
  if (ui.sheet && ui.sheet.type !== 'onboarding') { ui.sheet = null; renderSheet(); }
  render();
  window.scrollTo(0, 0);
}

// ---------- Actions communes ----------

const GLOBAL_ACTIONS = {
  'add-expense': () => sheets.open.expense(ctx),
  'edit-expense': (c, el) => sheets.open.expense(ctx, el.dataset.id),
  'add-sub': () => sheets.open.sub(ctx),
  'edit-sub': (c, el) => sheets.open.sub(ctx, el.dataset.id),
  'open-incomes': () => ctx.openSheet({ type: 'incomes' }),
  'add-income': (c, el) => {
    const fromList = ui.sheet && ui.sheet.type === 'incomes';
    sheets.open.income(ctx, null, el.dataset.id || 'regulier');
    ui.sheet.fromList = fromList;
  },
  'edit-income': (c, el) => {
    const fromList = ui.sheet && ui.sheet.type === 'incomes';
    sheets.open.income(ctx, el.dataset.id);
    ui.sheet.fromList = fromList;
  },
  'open-helper': () => ctx.openSheet({ type: 'helper' }),
  'add-cat': () => sheets.open.cat(ctx),
  'edit-cat': (c, el) => sheets.open.cat(ctx, el.dataset.id),
  'add-goal': () => sheets.open.goalEdit(ctx),
  'open-goal': (c, el) => ctx.openSheet({ type: 'goal', id: el.dataset.id }),
  'add-annual': () => sheets.open.annual(ctx),
  'edit-annual': (c, el) => sheets.open.annual(ctx, el.dataset.id),
  'add-account': () => ctx.openSheet({ type: 'account', id: null }),
  'edit-account': (c, el) => ctx.openSheet({ type: 'account', id: el.dataset.id }),
  'export-now': () => { store.exportData(); ctx.toast('Sauvegarde téléchargée'); },
  'toast-undo': () => {
    const undo = toastEl._undo;
    toastEl.innerHTML = '';
    toastEl._undo = null;
    if (undo) undo();
  },
};

const ACTIONS = {
  ...home.actions,
  ...expenses.actions,
  ...budget.actions,
  ...analysis.actions,
  ...settings.actions,
  ...sheets.actions,
  ...install.actions,
  ...GLOBAL_ACTIONS,
};

const CHANGES = {
  ...(expenses.changes || {}),
  ...(settings.changes || {}),
  ...(sheets.changes || {}),
};

// ---------- Événements ----------

document.addEventListener('click', (ev) => {
  // Boutons d'enregistrement : on n'utilise pas l'envoi natif du formulaire,
  // bloqué dans l'aperçu de la conversation (bug 6).
  const submit = ev.target.closest('button[type="submit"]');
  if (submit && !submit.disabled) {
    const form = submit.closest('form[data-form]');
    if (form) {
      ev.preventDefault();
      submitForm(form);
      return;
    }
  }
  const el = ev.target.closest('[data-action]');
  if (!el || el.disabled) return;
  const name = el.dataset.action;
  if (!name) return;
  const fn = ACTIONS[name];
  if (!fn) return;
  if (el.tagName === 'A') ev.preventDefault();
  fn(ctx, el, ev);
});

document.addEventListener('change', (ev) => {
  const el = ev.target;
  if (el.dataset.bind && ui.sheet) {
    ui.sheet[el.dataset.bind] = el.value;
    if (el.dataset.rerender) renderSheet();
  }
  const name = el.dataset.change;
  if (name && CHANGES[name]) CHANGES[name](ctx, el, ev);
});

document.addEventListener('input', (ev) => {
  const el = ev.target;
  if (el.dataset.bind && ui.sheet && !el.dataset.rerender) ui.sheet[el.dataset.bind] = el.value;
});

function submitForm(form) {
  const fn = sheets.forms[form.dataset.form];
  if (fn) fn(ctx, form);
}

// Filet de sécurité si un envoi natif a lieu malgré tout
document.addEventListener('submit', (ev) => {
  const form = ev.target.closest('form[data-form]');
  if (!form) return;
  ev.preventDefault();
  submitForm(form);
});

document.addEventListener('keydown', (ev) => {
  // Entrée dans un champ : enregistre le formulaire sans envoi natif (bug 6)
  if (ev.key === 'Enter' && ev.target.tagName === 'INPUT' && !['checkbox', 'file', 'button', 'submit'].includes(ev.target.type)) {
    const form = ev.target.closest('form[data-form]');
    if (form && form.dataset.form !== 'expense') {
      ev.preventDefault();
      submitForm(form);
      return;
    }
  }
  if (!ui.sheet) return;
  if (ev.key === 'Escape' && ui.sheet.type !== 'onboarding') { ctx.closeSheet(); return; }
  if (ui.sheet.type === 'expense') {
    const tag = (ev.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;
    let key = null;
    if (/^[0-9]$/.test(ev.key)) key = ev.key;
    else if (ev.key === ',' || ev.key === '.') key = ',';
    else if (ev.key === 'Backspace') key = 'del';
    else if (ev.key === 'Enter') {
      ev.preventDefault();
      sheets.forms.expense(ctx);
      return;
    }
    if (key) {
      ev.preventDefault();
      sheets.actions.key(ctx, { dataset: { id: key } });
    }
  }
});

window.addEventListener('hashchange', handleRoute);
window.addEventListener('appinstalled', () => render());
window.matchMedia('(display-mode: standalone)').addEventListener('change', () => render());
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

// ---------- Démarrage ----------

store.load();
store.subscribe(() => {
  applyTheme();
  render();
  if (ui.sheet) renderSheet();
});
applyTheme();
handleRoute();

const s0 = store.getState();
if (!s0.settings.onboarded && !s0.expenses.length && !s0.incomes.length) {
  ctx.openSheet({ type: 'onboarding' });
} else {
  store.requestPersistence().then((ok) => { ui.persisted = ok; });
}
store.isPersisted().then((ok) => { ui.persisted = ok; if (ui.route === 'reglages') render(); });

if ('serviceWorker' in navigator && location.protocol !== 'file:' && !window.__TEST_BUILD__) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((e) => console.warn('Service worker non enregistré', e));
  });
}

// Le mois change pendant que l'appli reste ouverte : on recharge les calculs au retour.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    store.load();
    applyTheme();
    render();
    if (ui.sheet) renderSheet();
  }
});
