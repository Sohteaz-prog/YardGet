// Graphiques en SVG : anneau du mois et barres empilées.

import { colorVars } from './catalog.js';
import { esc } from './util.js';

/**
 * Anneau : segments [{id, amount, color}] ; selected = id mis en avant.
 */
export function donut(segments, { size = 200, stroke = 24, selected = null, label = '' } = {}) {
  const r = 70;
  const C = 2 * Math.PI * r;
  const total = segments.reduce((t, s) => t + s.amount, 0);
  const gap = segments.length > 1 ? 2.5 : 0;
  let offset = 0;
  const arcs = total > 0 ? segments.map((s) => {
    const len = (s.amount / total) * C;
    const dash = Math.max(0.5, len - gap);
    const dim = selected && selected !== s.id ? ' dim' : '';
    const out = `<circle class="cv seg${dim}" style="${colorVars(s.color)}" cx="90" cy="90" r="${r}" stroke-dasharray="${dash.toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" data-action="donut-pick" data-id="${esc(s.id)}"/>`;
    offset += len;
    return out;
  }).join('') : '';
  return `<svg class="donut" role="img" aria-label="${esc(label)}" width="${size}" height="${size}" viewBox="0 0 180 180">
    <g transform="rotate(-90 90 90)" fill="none" stroke-width="${stroke}">
      <circle class="track" cx="90" cy="90" r="${r}"/>
      ${arcs}
    </g>
  </svg>`;
}

/**
 * Barres empilées besoins / envies avec ligne de budget.
 * rows : [{label, besoins, envies, current, future}]
 */
export function stackedBars(rows, { height = 170, max, budget = 0, budgetLabel = '', ariaLabel = '' }) {
  const scale = (v) => Math.round((v / max) * height);
  const cols = rows.map((r) => {
    const empty = r.total === 0;
    const cls = `bar-col${r.current ? ' current' : ''}${r.future ? ' future' : ''}`;
    return `<div class="${cls}">
      <div class="bar-stack" style="height:${height}px">
        ${empty ? '<span class="bar-empty"></span>' : `
        <span class="bar-seg envies" style="height:${scale(r.envies)}px"></span>
        <span class="bar-seg besoins" style="height:${scale(r.besoins)}px"></span>`}
      </div>
      <span class="bar-label">${esc(r.label)}</span>
    </div>`;
  }).join('');
  const line = budget > 0 && budget <= max
    ? `<div class="budget-line" style="bottom:${scale(budget) + 22}px"><span>${esc(budgetLabel)}</span></div>`
    : '';
  return `<div class="bars" role="img" aria-label="${esc(ariaLabel)}">${line}${cols}</div>`;
}

/** Jauge simple */
export function gauge(value, total, color, { thin = false } = {}) {
  const p = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  const over = total > 0 && value > total;
  return `<div class="gauge${thin ? ' thin' : ''}${over ? ' over' : ''}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}">
    <span class="cv" style="${colorVars(color)};width:${p}%"></span>
  </div>`;
}
