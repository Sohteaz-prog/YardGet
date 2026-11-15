// Analyse : évolution par période, répartition, vue lissée, bilan mensuel.

import { iconSvg, colorVars, PERIODS } from '../catalog.js';
import { seriesFor, smoothing, monthReview, catById } from '../calc.js';
import { stackedBars, gauge } from '../charts.js';
import { catIcon, empty, segmented, settingsButton } from '../components.js';
import { setSetting } from '../store.js';
import { esc, fmt, fmtShort, fmtEuro, pct, labelMonthName, labelMonth, currentMonth, addMonths, labelDayFull, monthKey } from '../util.js';

export function currentPeriod(s, ui) {
  if (ui.period) return ui.period;
  const d = s.settings.periodDefault;
  return d && d !== 'derniere' ? d : (s.settings.lastPeriod || 'mois');
}

const AVG_LABEL = { jour: 'Moyenne par jour', semaine: 'Moyenne par semaine', mois: 'Moyenne par mois', annee: 'Moyenne par mois' };
const RANGE_LABEL = { jour: 'Sur les 14 derniers jours', semaine: 'Sur les 8 dernières semaines', mois: 'Sur les 6 derniers mois', annee: 'Depuis le début de l’année' };
const BUDGET_LABEL = { jour: 'budget / jour', semaine: 'budget / semaine', mois: 'budget', annee: 'budget mensuel' };

export function render(s, ui) {
  const period = currentPeriod(s, ui);
  const data = seriesFor(s, period);
  const parts = [];

  parts.push(`<header class="page-head"><h1>Analyse</h1>${settingsButton()}</header>`);
  parts.push(segmented(Object.entries(PERIODS), period, 'period'));

  const current = data.rows.find((r) => r.current);
  const headline = data.avg != null ? fmtShort(data.avg) : fmtShort(current ? current.total : 0);
  const headLabel = data.avg != null ? AVG_LABEL[period] : (period === 'jour' ? "Aujourd'hui" : period === 'semaine' ? 'Cette semaine' : 'Ce mois-ci');

  parts.push(`<section class="card" aria-label="Évolution des dépenses">
    <div class="card-head" style="align-items:flex-end">
      <div style="display:flex;flex-direction:column;gap:2px"><span class="muted small strong">${esc(headLabel)}</span><span class="big">${headline}</span></div>
      <div class="legend-inline"><span><i class="g-besoins"></i>Besoins</span><span><i class="g-envies"></i>Envies</span></div>
    </div>
    ${data.total ? stackedBars(data.rows, {
      max: data.max * 1.08,
      budget: data.budget,
      budgetLabel: `${BUDGET_LABEL[period]} ${fmtEuro(data.budget)}`,
      ariaLabel: `Dépenses par ${PERIODS[period].toLowerCase()}, besoins et envies, comparées au budget`,
    }) : empty('barres', 'Pas encore de dépenses sur cette période.')}
    ${data.total ? `<span class="muted small">${period === 'annee' ? 'Total de l’année' : 'Total affiché'} : ${fmtShort(data.total)}. La dernière barre (période en cours) est plus claire.</span>` : ''}
  </section>`);

  // Par catégorie
  if (data.cats.length) {
    const total = data.cats.reduce((t, c) => t + c.amount, 0);
    parts.push(`<section class="card" aria-label="Par catégorie">
      <div class="card-head"><h2>Par catégorie</h2><span class="muted small strong">${esc(RANGE_LABEL[period])}</span></div>
      <div class="stack" style="gap:12px">
        ${data.cats.map(({ cat, amount }) => `<div class="stack" style="gap:6px">
          <div style="display:flex;align-items:center;gap:10px">
            ${catIcon(cat, 'sm', 16)}
            <span style="flex:1;font-size:14px;font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(cat.name)}</span>
            <span class="strong small">${fmtEuro(amount)}</span>
            <span class="muted small" style="width:38px;text-align:right">${pct(amount, total)} %</span>
          </div>
          ${gauge(amount, data.cats[0].amount, cat.color, { thin: true })}
        </div>`).join('')}
      </div>
    </section>`);
  }

  // Vue lissée
  const sm = smoothing(s);
  parts.push(`<section class="card" aria-label="Dépenses annuelles lissées">
    <div class="card-head">
      <div style="display:flex;flex-direction:column;gap:2px">
        <h2>Dépenses annuelles lissées</h2>
        ${sm.items.length ? `<span class="muted small">${fmtShort(sm.total)} par an, soit <strong style="color:var(--text)">${fmtEuro(sm.monthly)} à mettre de côté chaque mois</strong></span>` : ''}
      </div>
    </div>
    ${sm.items.length ? `<div class="rows">${sm.items.map((x) => {
      const c = catById(s, x.categoryId);
      return `<button class="row" type="button" data-action="${x.kind === 'abo' ? 'edit-sub' : 'edit-annual'}" data-id="${esc(x.id)}">
        ${catIcon(c, 'sm', 16)}
        <span class="main"><span class="t">${esc(x.name)}</span><span class="d">${x.next ? 'Prochaine échéance : ' + esc(labelDayFull(x.next)) : 'Terminé'}${x.kind === 'abo' ? ' · abonnement' : ''}</span></span>
        <span style="display:flex;flex-direction:column;align-items:flex-end;gap:2px"><span class="amt">${fmtEuro(x.yearly)}/an</span><span class="muted small">${fmt(Math.round(x.yearly / 12))}/mois</span></span>
      </button>`;
    }).join('')}</div>` : '<p class="muted" style="margin:0;font-size:14px">Assurances, taxes, cadeaux de fin d’année, entretien de la voiture… Ajoute ces grosses dépenses pour savoir combien mettre de côté chaque mois. Les abonnements annuels et trimestriels apparaissent ici automatiquement.</p>'}
    <button class="btn sm" type="button" data-action="add-annual">${iconSvg('plus', 16)}Dépense annuelle</button>
  </section>`);

  // Bilan
  const first = monthKey(s.createdOn);
  const rm = ui.reviewMonth || addMonths(currentMonth(), -1);
  const canPrev = addMonths(rm, -1) >= first;
  const canNext = addMonths(rm, 1) < currentMonth();
  if (rm >= first) {
    const r = monthReview(s, rm);
    const over = r.lines.filter((l) => l.diff > 0).slice(0, 4);
    const under = r.lines.filter((l) => l.diff < 0).slice(0, 3);
    parts.push(`<section class="card" id="bilan" aria-label="Bilan de ${esc(labelMonth(rm))}">
      <div class="month-nav">
        <button class="icon-btn" type="button" data-action="review-month" data-id="-1" aria-label="Mois précédent" ${canPrev ? '' : 'disabled style="opacity:.35"'}>${iconSvg('left', 18)}</button>
        <h2 style="font-size:17px">Bilan de ${esc(labelMonthName(rm).toLowerCase())}</h2>
        <button class="icon-btn" type="button" data-action="review-month" data-id="1" aria-label="Mois suivant" ${canNext ? '' : 'disabled style="opacity:.35"'}>${iconSvg('right', 18)}</button>
      </div>
      ${r.spent || r.available ? `
        ${r.available ? `<span class="badge ${r.balance >= 0 ? 'info' : 'danger'}" style="align-self:center;margin:0">${r.balance >= 0 ? `${fmtEuro(r.balance)} sous le budget` : `${fmtEuro(-r.balance)} au-dessus du budget`}</span>` : ''}
        <div class="tiles">
          <div class="tile"><span class="h">Dépensé</span><span class="v">${fmtEuro(r.spent)}</span></div>
          <div class="tile"><span class="h">Budget</span><span class="v">${fmtEuro(r.available)}</span></div>
          <div class="tile"><span class="h">Épargné</span><span class="v">${fmtEuro(r.saved + r.goalsAdded)}</span></div>
        </div>
        ${over.length || under.length ? `<div class="stack" style="border-top:1px solid var(--line-soft);padding-top:12px;font-size:13px">
          ${over.map((l) => `<div style="display:flex;justify-content:space-between;gap:8px"><span class="strong" style="font-weight:600">${esc(l.cat.name)}</span><span class="strong" style="color:var(--warn-ink)">+${fmtEuro(l.diff)} au-dessus</span></div>`).join('')}
          ${under.map((l) => `<div style="display:flex;justify-content:space-between;gap:8px"><span class="strong" style="font-weight:600">${esc(l.cat.name)}</span><span class="strong" style="color:var(--ok-ink)">−${fmtEuro(-l.diff)} en dessous</span></div>`).join('')}
        </div>` : ''}
        <div class="btn-row">
          <button class="btn sm" type="button" data-action="export-now">${iconSvg('sauvegarde', 16)}Sauvegarder</button>
          <a class="btn sm primary" href="#/budget">Ajuster ${esc(labelMonthName(currentMonth()).toLowerCase())}</a>
        </div>` : '<p class="muted" style="margin:0;font-size:14px">Aucune donnée pour ce mois.</p>'}
    </section>`);
  } else {
    parts.push(`<section class="card" id="bilan" aria-label="Bilan mensuel">
      <h2 style="font-size:17px">Bilan mensuel</h2>
      <p class="muted" style="margin:0;font-size:14px">Le premier bilan sera disponible au début du mois prochain : total dépensé, écarts par catégorie et ajustements proposés.</p>
    </section>`);
  }

  return parts.join('');
}

export const actions = {
  period: (ctx, el) => {
    ctx.ui.period = el.dataset.id;
    setSetting('lastPeriod', el.dataset.id);
  },
  'review-month': (ctx, el) => {
    const rm = ctx.ui.reviewMonth || addMonths(currentMonth(), -1);
    const next = addMonths(rm, Number(el.dataset.id));
    if (next >= currentMonth() || next < monthKey(ctx.state().createdOn)) return;
    ctx.ui.reviewMonth = next;
    ctx.render();
  },
};
