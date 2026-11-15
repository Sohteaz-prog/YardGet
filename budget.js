// Budget : revenus, répartition, suggestions, catégories, objectifs.

import { iconSvg, colorVars } from '../catalog.js';
import {
  monthSummary, groupBudgets, regularIncome, oneOffIncomes, suggestions, categoryAverage,
  completedMonths, goalSaved, goalMonthly,
} from '../calc.js';
import { gauge } from '../charts.js';
import { catIcon, empty, settingsButton } from '../components.js';
import { dismissSuggestion, setBudgets } from '../store.js';
import { esc, fmt, fmtShort, fmtEuro, pct, labelMonth, currentMonth, labelDayFull } from '../util.js';

export function render(s) {
  const mk = currentMonth();
  const sum = monthSummary(s, mk);
  const income = regularIncome(s);
  const oneoffs = oneOffIncomes(s, mk);
  const gb = groupBudgets(s);
  const totalBudget = Object.values(gb).reduce((t, v) => t + v, 0);
  const base = income || totalBudget;
  const parts = [];

  parts.push(`<header class="page-head"><div><div class="sub">${esc(labelMonth(mk))}</div><h1>Budget</h1></div>${settingsButton()}</header>`);

  // Revenus
  parts.push(`<section class="card" aria-label="Revenus">
    <div class="card-head">
      <div style="display:flex;flex-direction:column;gap:2px">
        <span class="muted small strong">Revenus réguliers</span>
        <span class="big">${fmtShort(income)} <span class="muted" style="font-size:14px;font-weight:600">/ mois</span></span>
      </div>
      <button class="btn sm" type="button" data-action="open-incomes">Gérer</button>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
      <span class="muted small strong">${oneoffs.length ? `+ ${fmtShort(oneoffs.reduce((t, i) => t + i.amount, 0))} ponctuel ce mois-ci` : 'Aucun revenu ponctuel ce mois-ci'}</span>
      <button class="link-btn" type="button" data-action="add-income" data-id="ponctuel" style="white-space:nowrap">+ Revenu ponctuel</button>
    </div>
  </section>`);

  // Répartition
  const share = (g) => (base ? Math.round((gb[g] / base) * 100) : 0);
  const unassigned = income ? income - totalBudget : 0;
  parts.push(`<section class="card" aria-label="Répartition">
    <div class="card-head"><h2>Répartition</h2><button class="btn sm" type="button" data-action="open-helper">${iconSvg('baguette', 16)}Aide</button></div>
    ${totalBudget ? `
      <div class="stack" style="gap:6px">
        <span class="small strong">Mon budget</span>
        <div class="split" aria-hidden="true">
          <span class="g-besoins" style="flex:${gb.besoins || 0}"></span>
          <span class="g-envies" style="flex:${gb.envies || 0}"></span>
          <span class="g-epargne" style="flex:${gb.epargne || 0}"></span>
          ${unassigned > 0 ? `<span style="flex:${unassigned};background:transparent"></span>` : ''}
        </div>
        <span class="small strong muted" style="margin-top:4px">Règle 50 / 30 / 20</span>
        <div class="split ref" aria-hidden="true"><span class="g-besoins" style="flex:50"></span><span class="g-envies" style="flex:30"></span><span class="g-epargne" style="flex:20"></span></div>
      </div>
      <div class="tiles">
        ${s.groups.map((g) => `<div class="tile">
          <span class="k" style="color:var(--g-${g.id})">${esc(g.name)}</span>
          <span class="v">${fmtEuro(gb[g.id] || 0)}</span>
          <span class="h">${share(g.id)} %</span>
          <span class="h">conseillé ${g.target} %</span>
        </div>`).join('')}
      </div>
      ${income && unassigned !== 0 ? `<p class="help" style="margin:0">${unassigned > 0 ? `${fmtShort(unassigned)} de tes revenus ne sont attribués à aucune catégorie.` : `Ton budget dépasse tes revenus réguliers de ${fmtShort(-unassigned)}.`}</p>` : ''}
    ` : `<p class="muted" style="margin:0;font-size:14px">Aucun budget fixé. L'aide te propose une répartition à partir de tes revenus.</p>`}
  </section>`);

  // Suggestions
  const sugg = suggestions(s);
  sugg.slice(0, 2).forEach((g) => {
    parts.push(`<section class="notice info" style="flex-direction:column;align-items:stretch;gap:10px" aria-label="Suggestion">
      <div style="display:flex;gap:10px;align-items:flex-start">
        <span class="ibox">${iconSvg('ampoule', 20)}</span>
        <span class="body"><span class="t">${esc(g.cat.name)} : ${fmtEuro(g.avg)} en moyenne</span>
        <span class="d">Sur les ${g.months} derniers mois. ${g.diff < 0 ? `Passer de ${fmtEuro(g.budget)} à ${fmtEuro(g.proposed)} libérerait ${fmtEuro(-g.diff)}.` : `Ton budget de ${fmtEuro(g.budget)} est souvent dépassé ; ${fmtEuro(g.proposed)} serait plus réaliste.`}</span></span>
      </div>
      <div class="btn-row">
        <button class="btn sm" type="button" data-action="sugg-keep" data-id="${esc(g.cat.id)}">Garder ${fmtEuro(g.budget)}</button>
        <button class="btn sm primary" type="button" data-action="sugg-apply" data-id="${esc(g.cat.id)}" data-amount="${g.proposed}">Passer à ${fmtEuro(g.proposed)}</button>
      </div>
    </section>`);
  });
  if (totalBudget && completedMonths(s) < 2) {
    parts.push(`<p class="help" style="margin:0 4px">Après deux mois complets, l'appli comparera ton budget à tes dépenses réelles et proposera des ajustements.</p>`);
  }

  // Catégories par groupe
  for (const g of s.groups) {
    const cats = s.categories.filter((c) => c.groupId === g.id);
    const groupSpent = cats.reduce((t, c) => t + (sum.spentMap[c.id] || 0), 0);
    parts.push(`<section class="stack" aria-label="${esc(g.name)}">
      <div class="group-head">
        <h2><span class="gdot g-${g.id}"></span>${esc(g.name)}</h2>
        <span class="muted small strong">${g.id === 'epargne' ? `${fmtEuro(groupSpent)} mis de côté` : `${fmtEuro(groupSpent)} / ${fmtEuro(gb[g.id] || 0)}`}</span>
      </div>
      <div class="list-card rows">
        ${cats.length ? cats.map((c) => catLine(s, c, sum)).join('') : `<p class="muted small" style="padding:12px 0;margin:0">Aucune catégorie.</p>`}
      </div>
    </section>`);
  }
  parts.push(`<button class="btn block" type="button" data-action="add-cat">${iconSvg('plus', 18)}Nouvelle catégorie</button>`);

  // Objectifs
  parts.push(`<div class="group-head" style="margin-top:6px"><h2>Objectifs d'épargne</h2><button class="btn sm" type="button" data-action="add-goal">${iconSvg('plus', 16)}Objectif</button></div>`);
  if (s.goals.length) {
    s.goals.forEach((goal) => {
      const saved = goalSaved(goal);
      const monthly = goalMonthly(goal);
      const done = saved >= goal.target;
      parts.push(`<button class="card" type="button" data-action="open-goal" data-id="${esc(goal.id)}" style="text-align:left;cursor:pointer">
        <div style="display:flex;align-items:center;gap:12px;width:100%">
          ${catIcon({ color: goal.color, icon: goal.icon })}
          <span style="flex:1;display:flex;flex-direction:column;gap:2px;min-width:0">
            <span class="strong" style="font-size:14px">${esc(goal.name)}</span>
            <span class="muted small">${goal.deadline ? 'Échéance ' + esc(labelDayFull(goal.deadline)) : 'Sans échéance'}</span>
          </span>
          <span class="strong small">${fmtEuro(saved)} <span class="muted" style="font-weight:500">/ ${fmtEuro(goal.target)}</span></span>
        </div>
        ${gauge(saved, goal.target, goal.color)}
        <span class="muted small">${done ? 'Objectif atteint !' : monthly ? `Environ ${fmtEuro(monthly)} par mois pour l'atteindre à temps` : `${pct(saved, goal.target)} % atteint`}</span>
      </button>`);
    });
  } else {
    parts.push(empty('cible', 'Un voyage, un fonds d’urgence, un achat : fixe un montant cible et suis ta progression.'));
  }

  return parts.join('');
}

function catLine(s, c, sum) {
  const b = sum.budgets[c.id] || 0;
  const sp = sum.spentMap[c.id] || 0;
  const p = b ? pct(sp, b) : 0;
  const a = categoryAverage(s, c.id);
  let hint = '';
  if (c.groupId === 'epargne') hint = b ? `Prévu : ${fmtEuro(b)} par mois` : 'Aucun montant prévu';
  else if (c.fixed) hint = 'Dépense fixe' + (a ? ` · moyenne ${fmtEuro(a.avg)}` : '');
  else if (a) hint = `Moyenne ${a.months} mois : ${fmtEuro(a.avg)}`;
  else hint = b ? `Reste ${fmtEuro(Math.max(0, b - sp))}` : 'Pas de budget fixé';
  const warn = !c.fixed && b && p >= 80;
  return `<button class="cat-line" type="button" data-action="edit-cat" data-id="${esc(c.id)}">
    <span class="top">
      ${catIcon(c, 'sm', 18)}
      <span class="name">${esc(c.name)}</span>
      ${warn ? `<span class="badge ${p >= 100 ? 'danger' : 'warn'}" style="margin:0">${p} %</span>` : ''}
      <span class="val">${fmtEuro(sp)} <span>/ ${fmtEuro(b)}</span></span>
    </span>
    ${gauge(sp, b || (sp ? sp : 1), c.color)}
    <span class="hint">${esc(hint)}</span>
  </button>`;
}

export const actions = {
  'sugg-keep': (ctx, el) => { dismissSuggestion(el.dataset.id); ctx.toast('Budget conservé pour ce mois-ci'); },
  'sugg-apply': (ctx, el) => {
    setBudgets({ [el.dataset.id]: Number(el.dataset.amount) });
    ctx.toast('Budget mis à jour');
  },
};
