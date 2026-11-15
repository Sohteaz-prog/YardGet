// Dépenses : historique par jour et abonnements.

import { iconSvg, colorVars, FREQUENCIES } from '../catalog.js';
import { catById, monthRange, expensesIn, monthlyEquivalent, yearlyCost, nextDueDate, monthSummary } from '../calc.js';
import { catIcon, empty, segmented, settingsButton } from '../components.js';
import { expenseRow } from './home.js';
import { esc, fmt, fmtShort, labelMonth, labelDayLong, currentMonth, addMonths, todayISO, relativeDay, diffDays, labelDayFull, labelDayShort } from '../util.js';

export function render(s, ui) {
  const tab = ui.expTab || 'historique';
  return `<header class="page-head"><h1>Dépenses</h1>${settingsButton()}</header>
    ${segmented([['historique', 'Historique'], ['abonnements', 'Abonnements']], tab, 'exp-tab')}
    ${tab === 'historique' ? history(s, ui) : subscriptions(s, ui)}`;
}

function filterMatches(s, e, filter) {
  if (!filter || filter === 'tout') return true;
  if (filter === 'abo') return !!e.subscriptionId;
  if (filter.startsWith('cat:')) return e.categoryId === filter.slice(4);
  const c = catById(s, e.categoryId);
  return (c ? c.groupId : 'envies') === filter;
}

function history(s, ui) {
  const mk = ui.histMonth || currentMonth();
  const filter = ui.histFilter || 'tout';
  const account = s.settings.multiAccounts ? (ui.histAccount || '') : '';
  const [a, b] = monthRange(mk);
  const list = expensesIn(s, a, b, account || null)
    .filter((e) => filterMatches(s, e, filter))
    .sort((x, y) => y.date.localeCompare(x.date) || (y.id > x.id ? 1 : -1));
  const total = list.reduce((t, e) => t + e.amount, 0);

  const chip = (k, label) => `<button class="chip" type="button" data-action="hist-filter" data-id="${k}" aria-pressed="${filter === k}">${esc(label)}</button>`;
  let catChip = '';
  if (filter.startsWith('cat:')) {
    const c = catById(s, filter.slice(4));
    if (c) catChip = `<button class="chip cat cv" style="${colorVars(c.color)}" type="button" data-action="hist-filter" data-id="tout" aria-pressed="true" aria-label="Retirer le filtre ${esc(c.name)}">${esc(c.name)} ${iconSvg('x', 14)}</button>`;
  }

  const days = [];
  for (const e of list) {
    let d = days[days.length - 1];
    if (!d || d.date !== e.date) { d = { date: e.date, items: [], total: 0 }; days.push(d); }
    d.items.push(e);
    d.total += e.amount;
  }
  const isCurrent = mk === currentMonth();

  return `
    <div class="month-nav">
      <button class="icon-btn" type="button" data-action="hist-month" data-id="-1" aria-label="Mois précédent">${iconSvg('left', 20)}</button>
      <span class="lbl">${esc(labelMonth(mk))}</span>
      <button class="icon-btn" type="button" data-action="hist-month" data-id="1" aria-label="Mois suivant" ${isCurrent ? 'disabled style="opacity:.35"' : ''}>${iconSvg('right', 20)}</button>
    </div>
    <div class="chips" role="group" aria-label="Filtrer">
      ${catChip}
      ${chip('tout', 'Tout')}${chip('besoins', 'Besoins')}${chip('envies', 'Envies')}${chip('epargne', 'Épargne')}${chip('abo', 'Abonnements')}
    </div>
    ${s.settings.multiAccounts ? `<select class="input" data-change="hist-account" aria-label="Compte">
      <option value="">Tous les comptes</option>
      ${s.accounts.map((acc) => `<option value="${esc(acc.id)}" ${acc.id === account ? 'selected' : ''}>${esc(acc.name)}</option>`).join('')}
    </select>` : ''}
    <div class="card" style="flex-direction:row;align-items:center;justify-content:space-between;padding:14px 16px">
      <span class="muted strong small">${list.length} dépense${list.length > 1 ? 's' : ''}</span>
      <span class="strong">${fmt(total)}</span>
    </div>
    ${days.length ? days.map((d) => `
      <section class="stack" aria-label="${esc(labelDayLong(d.date))}">
        <div class="day-head"><span>${esc(dayLabel(d.date))}</span><span>${fmt(d.total)}</span></div>
        <div class="list-card rows">${d.items.map((e) => expenseRow(s, e, { showDate: false })).join('')}</div>
      </section>`).join('') : empty('ticket', 'Aucune dépense pour cette sélection.')}
  `;
}

function dayLabel(iso) {
  const n = diffDays(iso, todayISO());
  if (n === 0) return "Aujourd'hui";
  if (n === 1) return 'Hier';
  return labelDayLong(iso);
}

function subscriptions(s, ui) {
  const today = todayISO();
  const active = s.subscriptions.filter((x) => x.status === 'actif' && !(x.endDate && x.endDate < today));
  const ended = s.subscriptions.filter((x) => x.status === 'actif' && x.endDate && x.endDate < today);
  const planned = s.subscriptions.filter((x) => x.status === 'envisage');
  const perMonth = active.reduce((t, x) => t + monthlyEquivalent(x), 0);
  const perYear = active.reduce((t, x) => t + yearlyCost(x), 0);
  const detail = !!ui.aboDetail;
  const sorted = [...active].sort((a, b) => monthlyEquivalent(b) - monthlyEquivalent(a));
  const sum = monthSummary(s);

  const byNext = [...active].sort((a, b) => (nextDueDate(a, addDay(today)) || '9999').localeCompare(nextDueDate(b, addDay(today)) || '9999'));

  const summary = active.length ? `<section class="card" aria-label="Coût total des abonnements">
      <div class="tiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">
        <div style="display:flex;flex-direction:column;gap:2px"><span class="muted small strong">Par mois</span><span class="big">${fmt(perMonth)}</span></div>
        <div style="display:flex;flex-direction:column;gap:2px"><span class="muted small strong">Par an</span><span class="big">${fmt(perYear)}</span></div>
      </div>
      <div class="split" aria-hidden="true">${sorted.map((x) => {
        const c = catById(s, x.categoryId);
        return `<span class="cv" style="${colorVars(c ? c.color : 'ardoise')};background:var(--c);flex:${monthlyEquivalent(x)}"></span>`;
      }).join('')}</div>
      <button class="link-btn" type="button" data-action="abo-detail" aria-expanded="${detail}" style="display:flex;justify-content:space-between;align-items:center;width:100%">
        ${detail ? 'Masquer le détail' : 'Voir le détail'} <span style="transform:rotate(${detail ? 180 : 0}deg);display:inline-flex">${iconSvg('down', 18)}</span>
      </button>
      ${detail ? `<div class="stack" style="border-top:1px solid var(--line-soft);padding-top:12px">${sorted.map((x) => {
        const c = catById(s, x.categoryId);
        return `<div style="display:flex;align-items:center;gap:10px;font-size:13px">
          <span class="dot cv" style="${colorVars(c ? c.color : 'ardoise')}"></span>
          <span style="flex:1;font-weight:500">${esc(x.name)}</span>
          <span class="strong">${fmt(monthlyEquivalent(x))}/mois</span>
          <span class="muted" style="width:96px;text-align:right">${fmt(yearlyCost(x))}/an</span>
        </div>`;
      }).join('')}</div>` : ''}
    </section>` : '';

  const plannedTotal = planned.reduce((t, x) => t + monthlyEquivalent(x), 0);

  return `
    ${summary}
    <div class="card-head" style="padding:0 4px">
      <h2 style="font-size:17px">Mes abonnements</h2>
      <button class="btn sm" type="button" data-action="add-sub">${iconSvg('plus', 16)}Ajouter</button>
    </div>
    ${active.length ? `<div class="stack">${byNext.map((x) => subRow(s, x)).join('')}</div>`
      : empty('repeter', 'Ajoute tes abonnements (téléphone, streaming, assurance…) pour suivre leur coût et recevoir un rappel avant chaque prélèvement.')}
    ${planned.length ? `
      <div class="group-head"><h2>Envisagés</h2><span class="muted small strong">+${fmt(plannedTotal)}/mois</span></div>
      <p class="help" style="margin:0 4px">Reste à dépenser ce mois-ci : ${fmtShort(sum.reste)} → ${fmtShort(sum.reste - plannedTotal)} si tu les prends.</p>
      <div class="stack">${planned.map((x) => subRow(s, x)).join('')}</div>` : ''}
    ${ended.length ? `
      <div class="group-head"><h2>Terminés</h2></div>
      <div class="stack">${ended.map((x) => subRow(s, x)).join('')}</div>` : ''}
  `;
}

function addDay(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d + 1);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}

function subRow(s, x) {
  const c = catById(s, x.categoryId);
  const today = todayISO();
  const f = FREQUENCIES[x.frequency];
  const day = Number(x.startDate.slice(8, 10));
  let when = x.frequency === 'mensuel' ? `le ${day === 1 ? '1er' : day}`
    : x.frequency === 'hebdo' ? 'chaque semaine'
      : labelDayShort(nextDueDate(x) || x.startDate);
  const meta = [x.status === 'envisage' ? 'Envisagé · ' + f.short : f.name, when, x.endDate ? '' : 'sans fin'].filter(Boolean).join(' · ');
  const badges = [];
  if (x.status === 'actif') {
    const next = nextDueDate(x, addDay(today));
    if (x.endDate && x.endDate < today) badges.push(`<span class="badge muted">Terminé le ${esc(labelDayFull(x.endDate))}</span>`);
    else {
      if (next && diffDays(today, next) <= 7) badges.push(`<span class="badge cat cv" style="${colorVars(c ? c.color : 'ardoise')}">${esc(relativeDay(next))}</span>`);
      if (x.endDate) badges.push(`<span class="badge ${diffDays(today, x.endDate) <= 30 ? 'danger' : 'muted'}">Se termine le ${esc(labelDayFull(x.endDate))}</span>`);
    }
  }
  return `<button class="sub-row${x.status === 'envisage' ? ' envisage' : ''}" type="button" data-action="edit-sub" data-id="${esc(x.id)}">
    ${catIcon(c)}
    <span class="main" style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
      <span class="t" style="font-size:14px;font-weight:600">${esc(x.name)}</span>
      <span class="d muted small">${esc(meta)}</span>
      ${badges.join('')}
    </span>
    <span class="strong" style="font-size:14px;white-space:nowrap">${fmt(x.amount)}</span>
  </button>`;
}

export const actions = {
  'exp-tab': (ctx, el) => { ctx.ui.expTab = el.dataset.id; ctx.go(el.dataset.id === 'abonnements' ? 'depenses/abonnements' : 'depenses'); },
  'hist-filter': (ctx, el) => { ctx.ui.histFilter = el.dataset.id; ctx.render(); },
  'hist-month': (ctx, el) => {
    const next = addMonths(ctx.ui.histMonth || currentMonth(), Number(el.dataset.id));
    if (next > currentMonth()) return;
    ctx.ui.histMonth = next;
    ctx.render();
  },
  'abo-detail': (ctx) => { ctx.ui.aboDetail = !ctx.ui.aboDetail; ctx.render(); },
};

export const changes = {
  'hist-account': (ctx, el) => { ctx.ui.histAccount = el.value; ctx.render(); },
};
