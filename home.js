// Accueil : reste à dépenser, alertes, anneau du mois, prochains prélèvements.

import { iconSvg, colorVars, FREQUENCIES } from '../catalog.js';
import { monthSummary, alerts, backupDue, upcomingCharges, catById } from '../calc.js';
import { donut } from '../charts.js';
import { catIcon, notice, empty, settingsButton } from '../components.js';
import { esc, fmt, fmtShort, fmtEuro, pct, labelDayLong, todayISO, labelMonthName, relativeDay, currentMonth } from '../util.js';

export function render(s, ui) {
  const sum = monthSummary(s);
  const hasBudget = sum.budgetSpend > 0;
  const parts = [];

  parts.push(`<header class="page-head">
    <div><div class="sub">${esc(labelDayLong(todayISO()))}</div><h1>Bonjour</h1></div>
    ${settingsButton()}
  </header>`);

  if (hasBudget) {
    const used = Math.min(100, pct(sum.spent, sum.available));
    parts.push(`<section class="hero" aria-label="Reste à dépenser">
      <span class="label">Reste à dépenser</span>
      <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
        <span class="amount${sum.reste < 0 ? ' neg' : ''}">${fmtShort(sum.reste)}</span>
        <span class="soft" style="font-size:14px;font-weight:500">jusqu'à fin ${esc(labelMonthName(currentMonth()).toLowerCase())}</span>
      </div>
      <div class="hero-row">
        <span class="pill">${sum.reste > 0 ? `≈ ${fmtEuro(sum.perDay)} par jour` : 'Budget épuisé'}</span>
        <span class="soft">${sum.daysLeft} jour${sum.daysLeft > 1 ? 's' : ''} restant${sum.daysLeft > 1 ? 's' : ''}</span>
      </div>
      <div class="track" aria-hidden="true"><span style="width:${used}%"></span></div>
      <div class="foot"><span>${fmtShort(sum.spent)} dépensés</span><span>budget ${fmtShort(sum.available)}${sum.extra ? ' (revenu ponctuel inclus)' : ''}</span></div>
    </section>`);
  } else {
    parts.push(`<section class="card" aria-label="Premier budget">
      <div class="card-head"><h2>Prépare ton budget</h2></div>
      <p class="muted" style="margin:0;font-size:14px">Indique tes revenus réguliers : l'appli te propose une répartition par catégorie, que tu ajustes ensuite.</p>
      <button class="btn primary" type="button" data-action="open-helper">${iconSvg('baguette', 18)}Établir mon budget</button>
    </section>`);
  }

  // Bandeaux (3 au maximum, les plus importants d'abord)
  const al = alerts(s);
  const banners = [];
  al.filter((a) => a.kind !== 'info').forEach((a) => banners.push(notice(a.kind, a.icon, a.title, a.text, a.catId ? 'open-cat-history' : '', a.catId || '')));
  if (s.pendingReview) {
    banners.push(notice('ok', 'check', `Le bilan de ${labelMonthName(s.pendingReview).toLowerCase()} est prêt`, 'Voir les écarts et ajuster le mois en cours', 'go-review'));
  }
  if (backupDue(s)) {
    banners.push(notice('info', 'sauvegarde', 'Pense à sauvegarder tes données', s.settings.lastBackup ? 'Dernière sauvegarde il y a plus d’un mois' : 'Aucune sauvegarde pour l’instant', 'export-now'));
  }
  al.filter((a) => a.kind === 'info').forEach((a) => banners.push(notice(a.kind, a.icon, a.title, a.text)));
  parts.push(...banners.slice(0, 3));

  // Anneau du mois
  const segs = s.categories
    .filter((c) => c.groupId !== 'epargne' && (sum.spentMap[c.id] || 0) > 0)
    .map((c) => ({ id: c.id, amount: sum.spentMap[c.id], color: c.color, cat: c }))
    .sort((a, b) => b.amount - a.amount);
  const sel = segs.find((x) => x.id === ui.homeSel) ? ui.homeSel : null;
  let center = { l: 'Dépensé', v: fmtShort(sum.spent), s: hasBudget ? `sur ${fmtShort(sum.available)}` : 'ce mois-ci' };
  if (sel) {
    const seg = segs.find((x) => x.id === sel);
    const b = sum.budgets[sel] || 0;
    center = { l: seg.cat.name, v: fmtShort(seg.amount), s: b ? `${pct(seg.amount, b)} % de ${fmtShort(b)}` : `${pct(seg.amount, sum.spent)} % du mois` };
  }
  parts.push(`<section class="card" aria-label="Répartition du mois">
    <div class="card-head"><h2>${esc(labelMonthName(currentMonth()))}</h2><a class="link-btn" href="#/analyse">Analyse</a></div>
    ${segs.length ? `
      <div class="donut-wrap">
        ${donut(segs, { selected: sel, label: 'Dépenses du mois par catégorie' })}
        <div class="donut-center"><span class="l">${esc(center.l)}</span><span class="v">${esc(center.v)}</span><span class="s">${esc(center.s)}</span></div>
      </div>
      <div class="legend">
        ${segs.map((g) => `<button type="button" class="legend-item cv${g.id === sel ? ' on' : ''}" style="${colorVars(g.color)}" data-action="donut-pick" data-id="${esc(g.id)}" aria-pressed="${g.id === sel}">
          ${catIcon(g.cat, 'sm', 16)}
          <span class="txt"><span class="n">${esc(g.cat.name)}</span><span class="a">${fmtEuro(g.amount)} · ${pct(g.amount, sum.spent)} %</span></span>
        </button>`).join('')}
      </div>
      ${sel ? `<button class="btn sm" type="button" data-action="open-cat-history" data-id="${esc(sel)}">Voir les dépenses ${esc(catById(s, sel).name)}</button>` : ''}
    ` : empty('camembert', 'Aucune dépense ce mois-ci pour l’instant.', '<button class="btn sm primary" type="button" data-action="add-expense">Ajouter une dépense</button>')}
  </section>`);

  // Prochains prélèvements
  const next = upcomingCharges(s, 30).slice(0, 4);
  if (s.subscriptions.length) {
    parts.push(`<section class="card" aria-label="Prochains prélèvements">
      <div class="card-head"><h2>Prochains prélèvements</h2><a class="link-btn" href="#/depenses/abonnements">Tout voir</a></div>
      ${next.length ? `<div class="rows">${next.map(({ sub, date }) => `
        <button class="row" type="button" data-action="edit-sub" data-id="${esc(sub.id)}">
          ${catIcon(catById(s, sub.categoryId))}
          <span class="main"><span class="t">${esc(sub.name)}</span><span class="d">${esc(relativeDay(date))} · ${esc(FREQUENCIES[sub.frequency].short)}</span></span>
          <span class="amt">${fmt(sub.amount)}</span>
        </button>`).join('')}</div>` : '<p class="muted small" style="margin:0">Rien dans les 30 prochains jours.</p>'}
    </section>`);
  }

  // Dernières dépenses
  const recent = [...s.expenses].sort((a, b) => b.date.localeCompare(a.date) || (b.id > a.id ? 1 : -1)).slice(0, 3);
  if (recent.length) {
    parts.push(`<section class="card" aria-label="Dernières dépenses">
      <div class="card-head"><h2>Dernières dépenses</h2><a class="link-btn" href="#/depenses">Historique</a></div>
      <div class="rows">${recent.map((e) => expenseRow(s, e)).join('')}</div>
    </section>`);
  }

  return parts.join('');
}

export function expenseRow(s, e, { showDate = true } = {}) {
  const c = catById(s, e.categoryId);
  const title = e.note || (c ? c.name : 'Dépense');
  const meta = e.note ? [c ? c.name : 'Catégorie supprimée'] : [];
  if (showDate) meta.push(relativeDay(e.date));
  if (e.subscriptionId) meta.push('abonnement');
  if (s.settings.multiAccounts && e.accountId) {
    const a = s.accounts.find((x) => x.id === e.accountId);
    if (a) meta.push(a.name);
  }
  return `<button class="row" type="button" data-action="edit-expense" data-id="${esc(e.id)}">
    ${catIcon(c)}
    <span class="main"><span class="t">${esc(title)}</span>${meta.length ? `<span class="d">${esc(meta.join(' · '))}</span>` : ''}</span>
    <span class="amt">${fmt(e.amount)}</span>
  </button>`;
}

export const actions = {
  'donut-pick': (ctx, el) => {
    ctx.ui.homeSel = ctx.ui.homeSel === el.dataset.id ? null : el.dataset.id;
    ctx.render();
  },
  'open-cat-history': (ctx, el) => {
    ctx.ui.expTab = 'historique';
    ctx.ui.histFilter = 'cat:' + el.dataset.id;
    ctx.ui.histMonth = currentMonth();
    ctx.go('depenses');
  },
  'go-review': (ctx) => {
    ctx.go('analyse');
    setTimeout(() => document.getElementById('bilan')?.scrollIntoView({ behavior: 'smooth' }), 80);
  },
};
