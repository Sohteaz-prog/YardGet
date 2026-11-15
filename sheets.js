// Feuilles : formulaires d'ajout et de modification, aide au budget, confirmations.

import { iconSvg, colorVars, COLORS, ICONS, FREQUENCIES } from './catalog.js';
import {
  catById, regularIncome, recommendedSplit, categoryAverage, monthSummary, goalSaved, goalMonthly,
  monthlyEquivalent, yearlyCost, nextDueDate,
} from './calc.js';
import { gauge } from './charts.js';
import {
  catIcon, sheetHead, amountField, textField, dateField, selectField, categorySelect, switchRow, empty,
} from './components.js';
import * as store from './store.js';
import {
  esc, fmt, fmtShort, fmtEuro, parseAmount, amountToInput, todayISO, labelDayFull, labelDayShort, relativeDay,
  currentMonth, monthKey,
} from './util.js';

// Logo A (anneau) — maquettes M2 et M4
const APP_LOGO = '<svg viewBox="0 0 100 100" width="72" height="72"><rect width="100" height="100" fill="#171A26"/><g fill="none" stroke-width="13" transform="rotate(-90 50 50)"><circle cx="50" cy="50" r="26" stroke="#60A5FA" stroke-dasharray="66 163.4"/><circle cx="50" cy="50" r="26" stroke="#4ADE80" stroke-dasharray="33 163.4" stroke-dashoffset="-70"/><circle cx="50" cy="50" r="26" stroke="#FB923C" stroke-dasharray="26 163.4" stroke-dashoffset="-107"/><circle cx="50" cy="50" r="26" stroke="#2DD4BF" stroke-dasharray="22 163.4" stroke-dashoffset="-137"/></g></svg>';

// ---------- Rendu ----------

export function renderSheet(s, sh, ui) {
  const fn = RENDER[sh.type];
  return fn ? fn(s, sh, ui) : { html: '' };
}

const RENDER = {
  expense: renderExpense,
  sub: renderSub,
  income: renderIncome,
  incomes: renderIncomes,
  cat: renderCat,
  goal: renderGoal,
  'goal-edit': renderGoalEdit,
  annual: renderAnnual,
  helper: renderHelper,
  onboarding: renderOnboarding,
  account: renderAccount,
  confirm: renderConfirm,
};

function accountChoices(s) {
  return s.accounts.map((a) => [a.id, a.name]);
}

// --- Dépense (saisie rapide) ---
function renderExpense(s, sh) {
  const cats = s.categories;
  const sel = sh.cat;
  const cat = catById(s, sel);
  const amountTxt = sh.amount || '';
  const display = (amountTxt || '0') + ' €';
  const editing = !!sh.id;
  const acc = s.accounts.find((a) => a.id === sh.accountId) || s.accounts[0];
  const dateLabel = sh.date === todayISO() ? "Aujourd'hui" : relativeDay(sh.date);
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'];

  return {
    full: true,
    html: `${sheetHead(editing ? 'Modifier la dépense' : 'Nouvelle dépense')}
    <form class="sheet-body" data-form="expense" novalidate>
      <div class="amount-display" aria-live="polite">
        <span class="v${amountTxt ? '' : ' placeholder'}">${esc(display)}</span>
        ${cat ? `<span class="badge cat cv" style="${colorVars(cat.color)};font-size:13px;padding:4px 12px;margin:0;align-self:center">${esc(cat.name)}</span>` : ''}
      </div>
      <div class="meta-chips">
        <span class="meta-chip">${iconSvg('calendrier', 16)}${esc(dateLabel)}
          <input type="date" name="date" value="${esc(sh.date)}" max="${todayISO().slice(0, 4) + 1}-12-31" data-bind="date" data-rerender="1" aria-label="Date de la dépense"></span>
        <button class="meta-chip" type="button" data-action="toggle-note" aria-expanded="${!!sh.showNote}">${iconSvg('crayon', 16)}Note${sh.note ? ' · ' + esc(sh.note.slice(0, 14)) + (sh.note.length > 14 ? '…' : '') : ''}</button>
        ${s.settings.multiAccounts ? `<span class="meta-chip">${iconSvg('portefeuille', 16)}${esc(acc.name)}
          <select name="accountId" data-bind="accountId" data-rerender="1" aria-label="Compte">${s.accounts.map((a) => `<option value="${esc(a.id)}" ${a.id === acc.id ? 'selected' : ''}>${esc(a.name)}</option>`).join('')}</select></span>` : ''}
      </div>
      ${sh.showNote ? `<input class="input" name="note" value="${esc(sh.note || '')}" maxlength="60" placeholder="Ex. boulangerie, cinéma…" data-bind="note" autocomplete="off" aria-label="Note">` : ''}
      <fieldset>
        <legend style="margin-bottom:8px">Catégorie</legend>
        <div class="cat-grid">
          ${cats.map((c) => `<button type="button" class="cat-pick cv" style="${colorVars(c.color)}" data-action="pick-cat" data-id="${esc(c.id)}" aria-pressed="${c.id === sel}">
            <span class="cat-ico">${iconSvg(c.icon, 20)}</span><span class="n">${esc(shortName(c.name))}</span>
          </button>`).join('')}
        </div>
      </fieldset>
      <div class="keypad" style="margin-top:auto">
        ${keys.map((k) => `<button type="button" data-action="key" data-id="${k}" aria-label="${k === 'del' ? 'Effacer' : k === ',' ? 'Virgule' : k}">${k === 'del' ? '⌫' : k}</button>`).join('')}
      </div>
      <div class="${editing ? 'btn-row' : ''}">
        ${editing ? `<button class="btn danger" type="button" data-action="delete-expense">${iconSvg('poubelle', 18)}Supprimer</button>` : ''}
        <button class="btn primary${editing ? '' : ' block'}" type="submit" ${parseAmount(amountTxt) ? '' : 'disabled'}>${editing ? 'Enregistrer' : 'Ajouter ' + esc(display)}</button>
      </div>
      ${sh.subscriptionId ? '<p class="help" style="margin:0;text-align:center">Prélèvement enregistré automatiquement depuis un abonnement.</p>' : ''}
    </form>`,
  };
}

function shortName(name) {
  const map = { 'Restaurants et cafés': 'Restos', 'Loisirs et sorties': 'Loisirs' };
  return map[name] || name;
}

// --- Abonnement ---
function renderSub(s, sh) {
  const x = sh.draft;
  const editing = !!sh.id;
  const preview = parseAmount(x.amount);
  return {
    html: `${sheetHead(editing ? "Modifier l'abonnement" : 'Nouvel abonnement')}
    <form class="sheet-body" data-form="sub">
      ${textField('name', 'Nom', x.name, { required: true, placeholder: 'Ex. forfait mobile' })}
      <div class="field-row">
        ${amountField('amount', 'Montant', parseAmount(x.amount))}
        ${selectField('frequency', 'Fréquence', Object.entries(FREQUENCIES).map(([k, f]) => [k, f.name]), x.frequency)}
      </div>
      ${categorySelect(s, 'categoryId', 'Catégorie', x.categoryId)}
      ${dateField('startDate', editing ? 'Date de référence du prélèvement' : 'Date du prochain prélèvement', x.startDate)}
      ${dateField('endDate', 'Date de fin (laisser vide si sans fin)', x.endDate, { required: false })}
      <div class="field-row">
        ${selectField('status', 'Statut', [['actif', 'Actif'], ['envisage', 'Envisagé']], x.status)}
        ${selectField('reminderDays', 'Rappel', [['1', '1 jour avant'], ['3', '3 jours avant'], ['7', '7 jours avant']], x.reminderDays)}
      </div>
      ${s.settings.multiAccounts ? selectField('accountId', 'Compte', accountChoices(s), x.accountId) : ''}
      <p class="help" style="margin:0">${x.status === 'envisage'
        ? 'Un abonnement envisagé n’est pas prélevé : il sert à voir son effet sur ton budget avant de le prendre.'
        : 'Chaque prélèvement est ajouté automatiquement à tes dépenses le jour venu.'}${preview && FREQUENCIES[x.frequency] ? ` Coût : ${fmt(monthlyEquivalent({ amount: preview, frequency: x.frequency }))} par mois, ${fmt(yearlyCost({ amount: preview, frequency: x.frequency }))} par an.` : ''}</p>
      <div class="${editing ? 'btn-row' : ''}">
        ${editing ? `<button class="btn danger" type="button" data-action="delete-sub">${iconSvg('poubelle', 18)}Supprimer</button>` : ''}
        <button class="btn primary${editing ? '' : ' block'}" type="submit">Enregistrer</button>
      </div>
    </form>`,
  };
}

// --- Revenu ---
function renderIncome(s, sh) {
  const x = sh.draft;
  const editing = !!sh.id;
  const oneoff = x.type === 'ponctuel';
  const destinations = [['reste', 'Augmenter le reste à dépenser'], ...s.goals.map((g) => ['goal:' + g.id, 'Objectif : ' + g.name])];
  return {
    html: `${sheetHead(editing ? 'Modifier le revenu' : 'Nouveau revenu')}
    <form class="sheet-body" data-form="income">
      <fieldset>
        <legend style="margin-bottom:8px">Type</legend>
        <div class="segmented" style="grid-template-columns:repeat(2,minmax(0,1fr))">
          <button type="button" aria-pressed="${!oneoff}" data-action="income-type" data-id="regulier">Régulier</button>
          <button type="button" aria-pressed="${oneoff}" data-action="income-type" data-id="ponctuel">Ponctuel</button>
        </div>
      </fieldset>
      <p class="help" style="margin:0">${oneoff ? 'Compté uniquement dans le mois où il arrive (prime, cadeau, remboursement…).' : 'Repris chaque mois (salaire, allocation…). C’est la base de ton budget.'}</p>
      ${textField('name', 'Nom', x.name, { required: true, placeholder: oneoff ? 'Ex. remboursement' : 'Ex. salaire' })}
      ${amountField('amount', oneoff ? 'Montant' : 'Montant par mois', parseAmount(x.amount))}
      ${oneoff ? dateField('date', 'Date', x.date) : ''}
      ${oneoff && !editing ? selectField('destination', 'Utilisation', destinations, x.destination) : ''}
      ${s.settings.multiAccounts ? selectField('accountId', 'Compte', accountChoices(s), x.accountId) : ''}
      <div class="${editing ? 'btn-row' : ''}">
        ${editing ? `<button class="btn danger" type="button" data-action="delete-income">${iconSvg('poubelle', 18)}Supprimer</button>` : ''}
        <button class="btn primary${editing ? '' : ' block'}" type="submit">Enregistrer</button>
      </div>
    </form>`,
  };
}

function renderIncomes(s) {
  const regular = s.incomes.filter((i) => i.type === 'regulier');
  const oneoff = s.incomes.filter((i) => i.type === 'ponctuel').sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
  const row = (i) => `<button class="row" type="button" data-action="edit-income" data-id="${esc(i.id)}">
    <span class="cat-ico" style="background:var(--ok-bg);color:var(--ok-ink)">${iconSvg('pieces', 20)}</span>
    <span class="main"><span class="t">${esc(i.name)}</span><span class="d">${i.type === 'regulier' ? 'Chaque mois' : esc(labelDayFull(i.date)) + (i.destination === 'objectif' ? ' · vers un objectif' : '')}</span></span>
    <span class="amt pos">+${fmt(i.amount)}</span>
  </button>`;
  return {
    html: `${sheetHead('Revenus')}
    <div class="sheet-body">
      <div class="group-head"><h2>Réguliers</h2><span class="muted small strong">${fmtShort(regularIncome(s))} / mois</span></div>
      ${regular.length ? `<div class="list-card rows">${regular.map(row).join('')}</div>` : '<p class="muted small" style="margin:0 4px">Aucun revenu régulier.</p>'}
      <button class="btn sm" type="button" data-action="add-income" data-id="regulier">${iconSvg('plus', 16)}Revenu régulier</button>
      <div class="group-head"><h2>Ponctuels récents</h2></div>
      ${oneoff.length ? `<div class="list-card rows">${oneoff.map(row).join('')}</div>` : '<p class="muted small" style="margin:0 4px">Aucun revenu ponctuel.</p>'}
      <button class="btn sm" type="button" data-action="add-income" data-id="ponctuel">${iconSvg('plus', 16)}Revenu ponctuel</button>
    </div>`,
  };
}

// --- Catégorie ---
function renderCat(s, sh) {
  const x = sh.draft;
  const editing = !!sh.id;
  const others = s.categories.filter((c) => c.id !== sh.id);
  const custom = Array.isArray(x.thresholds);
  const a = editing ? categoryAverage(s, sh.id) : null;
  const sum = monthSummary(s);
  return {
    html: `${sheetHead(editing ? 'Modifier la catégorie' : 'Nouvelle catégorie')}
    <form class="sheet-body" data-form="cat">
      <div style="display:flex;align-items:center;gap:12px">
        ${catIcon({ color: x.color, icon: x.icon }, 'lg', 24)}
        <div style="flex:1">${textField('name', 'Nom', x.name, { required: true, maxlength: 40 })}</div>
      </div>
      ${selectField('groupId', 'Groupe', s.groups.map((g) => [g.id, g.name]), x.groupId)}
      ${amountField('budget', 'Budget mensuel', parseAmount(x.budget) ?? 0, { required: false, help: a ? `Moyenne sur ${a.months} mois : ${fmtEuro(a.avg)}` : editing ? `Dépensé ce mois-ci : ${fmtEuro(sum.spentMap[sh.id] || 0)}` : '' })}
      <fieldset>
        <legend style="margin-bottom:8px">Couleur</legend>
        <div class="swatches">${Object.entries(COLORS).map(([k, c]) => `<button type="button" class="swatch cv" style="${colorVars(k)}" data-action="cat-color" data-id="${k}" aria-pressed="${k === x.color}" aria-label="${esc(c.name)}"></button>`).join('')}</div>
      </fieldset>
      <fieldset>
        <legend style="margin-bottom:8px">Icône</legend>
        <div class="icon-grid cv" style="${colorVars(x.color)}">${Object.keys(ICONS).map((k) => `<button type="button" class="icon-choice" data-action="cat-icon" data-id="${k}" aria-pressed="${k === x.icon}" aria-label="Icône ${esc(k)}">${iconSvg(k, 20)}</button>`).join('')}</div>
      </fieldset>
      ${switchRow('fixed', 'Dépense fixe', 'Montant payé en une fois (loyer, forfait) : pas d’alerte de rythme ni de suggestion', x.fixed)}
      ${switchRow('customThresholds', 'Seuils d’alerte propres', 'Sinon, les seuils généraux des réglages s’appliquent', custom, 'resheet')}
      ${custom ? `<div style="display:flex;gap:8px;flex-wrap:wrap">${[50, 80, 100].map((t) => `<label class="chip" style="cursor:pointer"><input type="checkbox" name="th${t}" ${x.thresholds.includes(t) ? 'checked' : ''}> ${t} %</label>`).join('')}</div>` : ''}
      <button class="btn primary block" type="submit">Enregistrer</button>
      ${editing && others.length ? `<div class="card" style="background:var(--card-2)">
        <span class="strong" style="font-size:14px">Supprimer ou fusionner</span>
        <span class="help">Les dépenses, abonnements et le budget de « ${esc(x.name)} » seront déplacés vers la catégorie choisie.</span>
        <select class="input" name="mergeTo" aria-label="Catégorie de destination">${others.map((c) => `<option value="${esc(c.id)}" ${c.id === 'divers' ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>
        <button class="btn sm danger" type="button" data-action="merge-cat">${iconSvg('poubelle', 16)}Supprimer et déplacer</button>
      </div>` : ''}
    </form>`,
  };
}

// --- Objectif ---
function renderGoal(s, sh) {
  const g = s.goals.find((x) => x.id === sh.id);
  if (!g) return { html: '' };
  const saved = goalSaved(g);
  const monthly = goalMonthly(g);
  const history = [...g.contributions].sort((a, b) => b.date.localeCompare(a.date));
  return {
    html: `${sheetHead(g.name)}
    <div class="sheet-body">
      <div style="display:flex;align-items:center;gap:12px">
        ${catIcon({ color: g.color, icon: g.icon }, 'lg', 24)}
        <div style="flex:1;display:flex;flex-direction:column;gap:2px">
          <span class="big">${fmtShort(saved)}</span>
          <span class="muted small">sur ${fmtShort(g.target)}${g.deadline ? ' · échéance ' + esc(labelDayFull(g.deadline)) : ''}</span>
        </div>
      </div>
      ${gauge(saved, g.target, g.color)}
      <span class="muted small">${saved >= g.target ? 'Objectif atteint !' : monthly ? `Environ ${fmtEuro(monthly)} par mois pour l’atteindre à temps.` : `Encore ${fmtShort(g.target - saved)}.`}</span>
      <form class="card" data-form="contribution" style="background:var(--card-2)">
        <span class="strong" style="font-size:14px">Mettre de l’argent de côté</span>
        <div class="field-row">
          ${amountField('amount', 'Montant', null)}
          ${dateField('date', 'Date', todayISO())}
        </div>
        <button class="btn primary" type="submit">${iconSvg('plus', 18)}Ajouter</button>
      </form>
      ${history.length ? `<div class="group-head"><h2>Historique</h2></div>
      <div class="list-card rows">${history.map((c) => `<div class="row">
        <span class="main"><span class="t">${esc(labelDayFull(c.date))}</span>${c.incomeId ? '<span class="d">Revenu ponctuel</span>' : ''}</span>
        <span class="amt pos">+${fmt(c.amount)}</span>
        <button class="icon-btn" type="button" data-action="delete-contribution" data-id="${esc(c.id)}" aria-label="Supprimer ce versement">${iconSvg('poubelle', 18)}</button>
      </div>`).join('')}</div>` : ''}
      <div class="btn-row">
        <button class="btn danger" type="button" data-action="delete-goal">${iconSvg('poubelle', 18)}Supprimer</button>
        <button class="btn" type="button" data-action="edit-goal">${iconSvg('crayon', 18)}Modifier</button>
      </div>
    </div>`,
  };
}

function renderGoalEdit(s, sh) {
  const x = sh.draft;
  return {
    html: `${sheetHead(sh.id ? "Modifier l'objectif" : 'Nouvel objectif')}
    <form class="sheet-body" data-form="goal">
      <div style="display:flex;align-items:center;gap:12px">
        ${catIcon({ color: x.color, icon: x.icon }, 'lg', 24)}
        <div style="flex:1">${textField('name', 'Nom', x.name, { required: true, placeholder: 'Ex. voyage d’été', maxlength: 40 })}</div>
      </div>
      <div class="field-row">
        ${amountField('target', 'Montant cible', parseAmount(x.target))}
        ${dateField('deadline', 'Échéance (facultatif)', x.deadline, { required: false })}
      </div>
      <fieldset>
        <legend style="margin-bottom:8px">Couleur</legend>
        <div class="swatches">${Object.entries(COLORS).map(([k, c]) => `<button type="button" class="swatch cv" style="${colorVars(k)}" data-action="cat-color" data-id="${k}" aria-pressed="${k === x.color}" aria-label="${esc(c.name)}"></button>`).join('')}</div>
      </fieldset>
      <fieldset>
        <legend style="margin-bottom:8px">Icône</legend>
        <div class="icon-grid cv" style="${colorVars(x.color)}">${Object.keys(ICONS).map((k) => `<button type="button" class="icon-choice" data-action="cat-icon" data-id="${k}" aria-pressed="${k === x.icon}" aria-label="Icône ${esc(k)}">${iconSvg(k, 20)}</button>`).join('')}</div>
      </fieldset>
      <button class="btn primary block" type="submit">Enregistrer</button>
    </form>`,
  };
}

// --- Dépense annuelle (vue lissée) ---
function renderAnnual(s, sh) {
  const x = sh.draft;
  const editing = !!sh.id;
  return {
    html: `${sheetHead(editing ? 'Modifier la dépense annuelle' : 'Dépense annuelle')}
    <form class="sheet-body" data-form="annual">
      <p class="help" style="margin:0">Une grosse dépense qui revient une fois par an. L'appli calcule combien mettre de côté chaque mois. Elle n'est pas ajoutée automatiquement à tes dépenses : saisis-la le jour où tu la paies.</p>
      ${textField('name', 'Nom', x.name, { required: true, placeholder: 'Ex. assurance voiture' })}
      <div class="field-row">
        ${amountField('amount', 'Montant par an', parseAmount(x.amount))}
        ${dateField('dueDate', 'Prochaine échéance', x.dueDate)}
      </div>
      ${categorySelect(s, 'categoryId', 'Catégorie', x.categoryId)}
      <div class="${editing ? 'btn-row' : ''}">
        ${editing ? `<button class="btn danger" type="button" data-action="delete-annual">${iconSvg('poubelle', 18)}Supprimer</button>` : ''}
        <button class="btn primary${editing ? '' : ' block'}" type="submit">Enregistrer</button>
      </div>
    </form>`,
  };
}

// --- Aide à la répartition ---
function renderHelper(s, sh) {
  const income = parseAmount(sh.income) ?? regularIncome(s);
  const split = income ? recommendedSplit(s, income) : {};
  const hasRegular = regularIncome(s) > 0;
  return {
    html: `${sheetHead('Aide à la répartition')}
    <form class="sheet-body" data-form="helper">
      <p class="help" style="margin:0">La règle 50 / 30 / 20 répartit les revenus en <strong>besoins</strong> (50 %), <strong>envies</strong> (30 %) et <strong>épargne</strong> (20 %). L'appli la découpe par catégorie, puis tu ajustes chaque montant. Les dépenses fixes (loyer, forfait) gardent leur montant actuel.</p>
      <div class="field">
        <label for="f-income">Revenus réguliers par mois</label>
        <div class="input-euro"><input class="input" id="f-income" name="income" inputmode="decimal" value="${esc(sh.income ?? amountToInput(regularIncome(s)) ?? '')}" placeholder="0,00" data-bind="income" data-rerender="1"></div>
        ${!hasRegular ? '<span class="help">Ce montant sera enregistré comme revenu régulier.</span>' : ''}
      </div>
      ${income ? s.groups.map((g) => {
        const cats = s.categories.filter((c) => c.groupId === g.id);
        const total = cats.reduce((t, c) => t + (split[c.id] || 0), 0);
        return `<section class="stack" style="gap:6px">
          <div class="group-head"><h2><span class="gdot g-${g.id}"></span>${esc(g.name)} · ${g.target} %</h2><span class="strong small">${fmtEuro(total)}</span></div>
          <div class="list-card rows">${cats.map((c) => {
            const a = categoryAverage(s, c.id);
            return `<div class="row" style="min-height:52px">
              ${catIcon(c, 'sm', 16)}
              <span class="main"><span class="t">${esc(c.name)}</span><span class="d">Actuel ${fmtEuro(c.budget || 0)}${a ? ` · moyenne ${fmtEuro(a.avg)}` : ''}</span></span>
              <span class="amt">${fmtEuro(split[c.id] || 0)}</span>
            </div>`;
          }).join('')}</div>
        </section>`;
      }).join('') : empty('baguette', 'Indique tes revenus pour voir la répartition conseillée.')}
      <p class="help" style="margin:0">Le loyer pèse souvent plus que prévu : si tes besoins dépassent 50 %, réduis plutôt les envies que l'épargne.</p>
      <button class="btn primary block" type="submit" ${income ? '' : 'disabled'}>Appliquer cette répartition</button>
    </form>`,
  };
}

// --- Premier lancement ---
function renderOnboarding() {
  return {
    full: true,
    html: `<div class="sheet-body" style="justify-content:center;gap:18px;padding-top:calc(30px + env(safe-area-inset-top))">
      <span class="app-logo" aria-hidden="true">${APP_LOGO}</span>
      <h2 style="font-size:26px;font-weight:800;text-align:center">Bienvenue dans <span class="wordmark" style="font-size:inherit">Yard<span>get</span></span></h2>
      <p class="strong muted" style="text-align:center;margin:-10px 0 0">Ton budget, tes yards.</p>
      <p class="muted" style="text-align:center;margin:0">Note tes dépenses en quelques secondes, suis tes abonnements et garde un œil sur ce qu'il te reste jusqu'à la fin du mois.</p>
      <form class="card" data-form="onboarding">
        ${amountField('income', 'Tes revenus réguliers par mois', null, { required: false, help: 'Salaire, allocation… Tu pourras en ajouter d’autres plus tard.' })}
        <label class="switch-row"><span class="txt"><span class="t">Proposer un budget 50 / 30 / 20</span><span class="help">Modifiable à tout moment</span></span><span class="switch"><input type="checkbox" name="split" checked><span></span></span></label>
        <button class="btn primary block" type="submit">Commencer</button>
      </form>
      <div class="notice info"><span class="ibox">${iconSvg('info', 20)}</span><span class="body"><span class="t">Tes données restent sur ce téléphone</span><span class="d">Pas de compte, pas de connexion bancaire. Pense à exporter une sauvegarde de temps en temps.</span></span></div>
      <button class="link-btn" type="button" data-action="skip-onboarding" style="align-self:center">Passer pour l'instant</button>
    </div>`,
  };
}

function renderAccount(s, sh) {
  const a = s.accounts.find((x) => x.id === sh.id);
  return {
    html: `${sheetHead(a ? 'Modifier le compte' : 'Nouveau compte')}
    <form class="sheet-body" data-form="account">
      ${textField('name', 'Nom du compte', a ? a.name : '', { required: true, placeholder: 'Ex. compte épargne', maxlength: 40 })}
      <div class="${a && s.accounts.length > 1 ? 'btn-row' : ''}">
        ${a && s.accounts.length > 1 ? `<button class="btn danger" type="button" data-action="delete-account">${iconSvg('poubelle', 18)}Supprimer</button>` : ''}
        <button class="btn primary${a && s.accounts.length > 1 ? '' : ' block'}" type="submit">Enregistrer</button>
      </div>
      ${a && s.accounts.length > 1 ? '<p class="help" style="margin:0">Les opérations de ce compte seront rattachées au premier compte de la liste.</p>' : ''}
    </form>`,
  };
}

function renderConfirm(s, sh) {
  return {
    html: `<div class="sheet-body" style="padding-top:22px">
      <h2 style="font-size:19px;font-weight:800">${esc(sh.title)}</h2>
      <p class="muted" style="margin:0">${esc(sh.text)}</p>
      <div class="btn-row">
        <button class="btn" type="button" data-action="confirm-cancel">${esc(sh.cancel || 'Annuler')}</button>
        <button class="btn primary${sh.danger ? ' danger' : ''}" type="button" data-action="confirm-ok" ${sh.danger ? 'style="background:var(--danger-ink);border-color:var(--danger-ink);color:#fff"' : ''}>${esc(sh.ok || 'Confirmer')}</button>
      </div>
      ${sh.alt ? `<button class="btn sm" type="button" data-action="confirm-alt">${esc(sh.alt)}</button>` : ''}
    </div>`,
  };
}

// ---------- Ouverture ----------

export const open = {
  expense(ctx, id) {
    const s = ctx.state();
    const e = id ? s.expenses.find((x) => x.id === id) : null;
    const defaultCat = (ctx.ui.lastCat && catById(s, ctx.ui.lastCat)) ? ctx.ui.lastCat : (catById(s, 'courses') ? 'courses' : s.categories[0]?.id);
    ctx.openSheet(e ? {
      type: 'expense', id: e.id, amount: amountToInput(e.amount), cat: e.categoryId, date: e.date,
      note: e.note || '', showNote: !!e.note, accountId: e.accountId || s.accounts[0].id, subscriptionId: e.subscriptionId,
    } : {
      type: 'expense', amount: '', cat: defaultCat, date: todayISO(), note: '', showNote: false, accountId: s.accounts[0].id,
    });
  },
  sub(ctx, id) {
    const s = ctx.state();
    const x = id ? s.subscriptions.find((v) => v.id === id) : null;
    ctx.openSheet({
      type: 'sub', id: x ? x.id : null,
      draft: x ? { ...x, amount: amountToInput(x.amount), endDate: x.endDate || '', reminderDays: String(x.reminderDays ?? 3) }
        : { name: '', amount: '', frequency: 'mensuel', categoryId: catById(s, 'telecom') ? 'telecom' : s.categories[0].id, startDate: todayISO(), endDate: '', status: 'actif', reminderDays: '3', accountId: s.accounts[0].id },
    });
  },
  income(ctx, id, type = 'regulier') {
    const s = ctx.state();
    const x = id ? s.incomes.find((v) => v.id === id) : null;
    ctx.openSheet({
      type: 'income', id: x ? x.id : null,
      draft: x ? { ...x, amount: amountToInput(x.amount) }
        : { type, name: '', amount: '', date: todayISO(), destination: 'reste', accountId: s.accounts[0].id },
    });
  },
  cat(ctx, id) {
    const s = ctx.state();
    const c = id ? catById(s, id) : null;
    ctx.openSheet({
      type: 'cat', id: c ? c.id : null,
      draft: c ? { ...c, budget: amountToInput(c.budget || 0), thresholds: Array.isArray(c.thresholds) ? [...c.thresholds] : null }
        : { name: '', groupId: 'envies', color: 'turquoise', icon: 'points', budget: '', fixed: false, thresholds: null },
    });
  },
  goalEdit(ctx, id) {
    const s = ctx.state();
    const g = id ? s.goals.find((v) => v.id === id) : null;
    ctx.openSheet({
      type: 'goal-edit', id: g ? g.id : null,
      draft: g ? { ...g, target: amountToInput(g.target), deadline: g.deadline || '' } : { name: '', target: '', deadline: '', color: 'indigo', icon: 'cible' },
    });
  },
  annual(ctx, id) {
    const s = ctx.state();
    const a = id ? s.annuals.find((v) => v.id === id) : null;
    ctx.openSheet({
      type: 'annual', id: a ? a.id : null,
      draft: a ? { ...a, amount: amountToInput(a.amount) } : { name: '', amount: '', dueDate: todayISO(), categoryId: catById(s, 'divers') ? 'divers' : s.categories[0].id },
    });
  },
};

// ---------- Brouillon : on garde la saisie quand on redessine ----------

export function captureDraft(ctx) {
  const sh = ctx.ui.sheet;
  const form = document.querySelector('#sheet form[data-form]');
  if (!sh || !sh.draft || !form) return;
  const fd = new FormData(form);
  for (const [k, v] of fd.entries()) {
    if (k.startsWith('th') || k === 'mergeTo') continue;
    sh.draft[k] = v;
  }
  // cases à cocher absentes du FormData quand décochées
  form.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    if (cb.name === 'customThresholds') {
      if (cb.checked && !Array.isArray(sh.draft.thresholds)) sh.draft.thresholds = categoryDefaultThresholds(ctx);
      if (!cb.checked) sh.draft.thresholds = null;
    } else if (cb.name.startsWith('th')) {
      // traité ci-dessous
    } else {
      sh.draft[cb.name] = cb.checked;
    }
  });
  if (Array.isArray(sh.draft.thresholds) && form.querySelector('input[name^="th"]')) {
    sh.draft.thresholds = [50, 80, 100].filter((t) => form.querySelector(`input[name="th${t}"]`)?.checked);
  }
}

function categoryDefaultThresholds(ctx) {
  const t = ctx.state().settings.thresholds;
  return [50, 80, 100].filter((x) => t[x]);
}

// ---------- Actions ----------

export const actions = {
  'close-sheet': (ctx) => ctx.closeSheet(),
  key: (ctx, el) => {
    const sh = ctx.ui.sheet;
    let a = sh.amount || '';
    const k = el.dataset.id;
    if (k === 'del') a = a.slice(0, -1);
    else if (k === ',') { if (!a.includes(',')) a = (a || '0') + ','; }
    else {
      const [, dec] = a.split(',');
      if (dec != null && dec.length >= 2) return;
      if (a.replace(',', '').length >= 7) return;
      a = (a === '0' ? '' : a) + k;
    }
    sh.amount = a;
    ctx.renderSheet();
  },
  'pick-cat': (ctx, el) => { ctx.ui.sheet.cat = el.dataset.id; ctx.renderSheet(); },
  'toggle-note': (ctx) => {
    ctx.ui.sheet.showNote = !ctx.ui.sheet.showNote;
    ctx.renderSheet();
    if (ctx.ui.sheet.showNote) document.querySelector('#sheet input[name="note"]')?.focus();
  },
  'delete-expense': (ctx) => {
    const s = ctx.state();
    const sh = ctx.ui.sheet;
    const e = s.expenses.find((x) => x.id === sh.id);
    if (!e) return ctx.closeSheet();
    store.deleteExpense(e.id);
    ctx.closeSheet();
    ctx.toast('Dépense supprimée', () => store.saveExpense({ ...e, id: undefined, }));
  },
  'delete-sub': (ctx) => {
    const id = ctx.ui.sheet.id;
    const s = ctx.state();
    const count = s.expenses.filter((e) => e.subscriptionId === id).length;
    ctx.confirm({
      title: "Supprimer l'abonnement ?",
      text: count ? `Ses ${count} prélèvement${count > 1 ? 's' : ''} déjà enregistré${count > 1 ? 's' : ''} resteront dans l'historique.` : 'Il ne sera plus suivi ni prélevé.',
      ok: 'Supprimer',
      danger: true,
      alt: count ? 'Supprimer aussi les prélèvements passés' : '',
      onOk: () => { store.deleteSubscription(id, true); ctx.toast('Abonnement supprimé'); },
      onAlt: () => { store.deleteSubscription(id, false); ctx.toast('Abonnement et prélèvements supprimés'); },
    });
  },
  'income-type': (ctx, el) => { captureDraft(ctx); ctx.ui.sheet.draft.type = el.dataset.id; ctx.renderSheet(); },
  'delete-income': (ctx) => { store.deleteIncome(ctx.ui.sheet.id); ctx.closeSheet(); ctx.toast('Revenu supprimé'); },
  'cat-color': (ctx, el) => { captureDraft(ctx); ctx.ui.sheet.draft.color = el.dataset.id; ctx.renderSheet(); },
  'cat-icon': (ctx, el) => { captureDraft(ctx); ctx.ui.sheet.draft.icon = el.dataset.id; ctx.renderSheet(); },
  'merge-cat': (ctx) => {
    const form = document.querySelector('#sheet form');
    const to = form.querySelector('select[name="mergeTo"]').value;
    const s = ctx.state();
    const from = catById(s, ctx.ui.sheet.id);
    const target = catById(s, to);
    ctx.confirm({
      title: `Supprimer « ${from.name} » ?`,
      text: `Ses dépenses, abonnements et son budget iront dans « ${target.name} ».`,
      ok: 'Supprimer',
      danger: true,
      onOk: () => { store.mergeCategory(from.id, to); ctx.toast('Catégorie supprimée'); },
    });
  },
  'edit-goal': (ctx) => open.goalEdit(ctx, ctx.ui.sheet.id),
  'delete-goal': (ctx) => {
    const id = ctx.ui.sheet.id;
    ctx.confirm({ title: "Supprimer l'objectif ?", text: 'Les versements enregistrés pour cet objectif seront supprimés.', ok: 'Supprimer', danger: true, onOk: () => { store.deleteGoal(id); ctx.toast('Objectif supprimé'); } });
  },
  'delete-contribution': (ctx, el) => {
    const goalId = ctx.ui.sheet.id;
    store.update((s) => {
      const g = s.goals.find((x) => x.id === goalId);
      if (g) g.contributions = g.contributions.filter((c) => c.id !== el.dataset.id);
    });
  },
  'delete-annual': (ctx) => { store.deleteAnnual(ctx.ui.sheet.id); ctx.closeSheet(); ctx.toast('Dépense annuelle supprimée'); },
  'delete-account': (ctx) => { store.deleteAccount(ctx.ui.sheet.id); ctx.closeSheet(); },
  'skip-onboarding': (ctx) => { store.setSetting('onboarded', true); ctx.closeSheet(); },
  'confirm-ok': (ctx) => { const sh = ctx.ui.sheet; ctx.closeSheet(); sh.onOk && sh.onOk(); },
  'confirm-alt': (ctx) => { const sh = ctx.ui.sheet; ctx.closeSheet(); sh.onAlt && sh.onAlt(); },
  'confirm-cancel': (ctx) => ctx.closeSheet(),
};

export const changes = {
  resheet: (ctx) => { captureDraft(ctx); ctx.renderSheet(); },
};

// ---------- Validation et enregistrement ----------

export const forms = {
  expense(ctx) {
    const sh = ctx.ui.sheet;
    const amount = parseAmount(sh.amount);
    if (!amount) return ctx.toast('Indique un montant');
    if (!sh.cat) return ctx.toast('Choisis une catégorie');
    const data = {
      amount, categoryId: sh.cat, date: sh.date || todayISO(), note: (sh.note || '').trim(),
      accountId: ctx.state().settings.multiAccounts ? sh.accountId : (sh.accountId || null),
    };
    if (sh.id) data.id = sh.id;
    store.saveExpense(data);
    ctx.ui.lastCat = sh.cat;
    ctx.closeSheet();
    const c = catById(ctx.state(), sh.cat);
    ctx.toast(`${fmt(amount)} ${sh.id ? 'modifiés' : 'ajoutés'} · ${c ? c.name : ''}`);
  },
  sub(ctx, form) {
    const fd = new FormData(form);
    const amount = parseAmount(fd.get('amount'));
    const name = String(fd.get('name') || '').trim();
    if (!name) return ctx.toast('Indique un nom');
    if (!amount) return ctx.toast('Indique un montant valide');
    const startDate = fd.get('startDate');
    const endDate = fd.get('endDate') || null;
    if (!startDate) return ctx.toast('Indique la date du prélèvement');
    if (endDate && endDate < startDate) return ctx.toast('La date de fin est avant le premier prélèvement');
    store.saveSubscription({
      id: ctx.ui.sheet.id || undefined,
      name, amount, frequency: fd.get('frequency'), categoryId: fd.get('categoryId'), startDate, endDate,
      status: fd.get('status'), reminderDays: Number(fd.get('reminderDays')),
      accountId: fd.get('accountId') || ctx.state().accounts[0].id,
    });
    ctx.closeSheet();
    ctx.toast('Abonnement enregistré');
  },
  income(ctx, form) {
    const fd = new FormData(form);
    const sh = ctx.ui.sheet;
    const amount = parseAmount(fd.get('amount'));
    const name = String(fd.get('name') || '').trim();
    if (!name) return ctx.toast('Indique un nom');
    if (!amount) return ctx.toast('Indique un montant valide');
    const type = sh.draft.type;
    const dest = String(fd.get('destination') || sh.draft.destination || 'reste');
    const data = {
      id: sh.id || undefined, type, name, amount,
      date: type === 'ponctuel' ? (fd.get('date') || todayISO()) : null,
      destination: dest.startsWith('goal:') ? 'objectif' : (sh.id ? sh.draft.destination : 'reste'),
      goalId: dest.startsWith('goal:') ? dest.slice(5) : (sh.draft.goalId || null),
      accountId: fd.get('accountId') || ctx.state().accounts[0].id,
    };
    store.saveIncome(data);
    const reopenList = sh.fromList;
    ctx.closeSheet();
    if (reopenList) ctx.openSheet({ type: 'incomes' });
    ctx.toast('Revenu enregistré');
  },
  cat(ctx) {
    captureDraft(ctx);
    const sh = ctx.ui.sheet;
    const x = sh.draft;
    const name = String(x.name || '').trim();
    if (!name) return ctx.toast('Indique un nom');
    const budget = parseAmount(x.budget || '0');
    if (budget == null) return ctx.toast('Budget invalide');
    store.saveCategory({
      id: sh.id || undefined, name, groupId: x.groupId, color: x.color, icon: x.icon, budget,
      fixed: !!x.fixed, thresholds: Array.isArray(x.thresholds) ? x.thresholds : null,
    });
    ctx.closeSheet();
    ctx.toast('Catégorie enregistrée');
  },
  contribution(ctx, form) {
    const fd = new FormData(form);
    const amount = parseAmount(fd.get('amount'));
    if (!amount) return ctx.toast('Indique un montant');
    store.addContribution(ctx.ui.sheet.id, amount, fd.get('date') || todayISO());
    ctx.toast(`${fmt(amount)} mis de côté`);
  },
  goal(ctx) {
    captureDraft(ctx);
    const sh = ctx.ui.sheet;
    const x = sh.draft;
    const name = String(x.name || '').trim();
    const target = parseAmount(x.target);
    if (!name) return ctx.toast('Indique un nom');
    if (!target) return ctx.toast('Indique un montant cible');
    store.saveGoal({ id: sh.id || undefined, name, target, deadline: x.deadline || null, color: x.color, icon: x.icon });
    ctx.closeSheet();
    ctx.toast('Objectif enregistré');
  },
  annual(ctx, form) {
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const amount = parseAmount(fd.get('amount'));
    if (!name) return ctx.toast('Indique un nom');
    if (!amount) return ctx.toast('Indique un montant valide');
    store.saveAnnual({ id: ctx.ui.sheet.id || undefined, name, amount, dueDate: fd.get('dueDate') || todayISO(), categoryId: fd.get('categoryId') });
    ctx.closeSheet();
    ctx.toast('Dépense annuelle enregistrée');
  },
  helper(ctx, form) {
    const s = ctx.state();
    const income = parseAmount(new FormData(form).get('income'));
    if (!income) return ctx.toast('Indique tes revenus');
    if (!regularIncome(s)) store.saveIncome({ type: 'regulier', name: 'Revenu principal', amount: income, date: null, destination: 'reste', accountId: s.accounts[0].id });
    store.setBudgets(recommendedSplit(ctx.state(), income));
    ctx.closeSheet();
    ctx.toast('Budget appliqué — ajuste chaque catégorie si besoin');
  },
  onboarding(ctx, form) {
    const fd = new FormData(form);
    const income = parseAmount(fd.get('income'));
    const s = ctx.state();
    if (income) {
      store.saveIncome({ type: 'regulier', name: 'Revenu principal', amount: income, date: null, destination: 'reste', accountId: s.accounts[0].id });
      if (fd.get('split')) store.setBudgets(recommendedSplit(ctx.state(), income));
    }
    store.setSetting('onboarded', true);
    store.requestPersistence().then((ok) => { ctx.ui.persisted = ok; });
    ctx.closeSheet();
    if (income && fd.get('split')) ctx.toast('Budget prêt — ajuste-le dans l’onglet Budget');
  },
  account(ctx, form) {
    const name = String(new FormData(form).get('name') || '').trim();
    if (!name) return ctx.toast('Indique un nom');
    store.saveAccount({ id: ctx.ui.sheet.id || undefined, name });
    ctx.closeSheet();
  },
};
