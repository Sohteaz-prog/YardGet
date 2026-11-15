// Réglages : apparence, revenus, comptes, alertes, analyse, données.

import { iconSvg } from '../catalog.js';
import { regularIncome } from '../calc.js';
import { switchRow, segmented } from '../components.js';
import { setSetting, setThreshold, exportData, parseBackup, replaceAll, resetAll } from '../store.js';
import { esc, fmtShort, labelDayFull } from '../util.js';
import { APP_VERSION } from '../version.js';

export function render(s, ui) {
  const item = (action, icon, title, desc, id = '') => `<button class="settings-item" type="button" data-action="${action}" data-id="${esc(id)}">
    <span class="cat-ico sm" style="background:var(--card-2);color:var(--text)">${iconSvg(icon, 18)}</span>
    <span class="main"><span class="t">${esc(title)}</span>${desc ? `<span class="d">${esc(desc)}</span>` : ''}</span>
    ${iconSvg('right', 18)}
  </button>`;

  const nbReg = s.incomes.filter((i) => i.type === 'regulier').length;

  return `<header class="page-head">
      <div class="head-left"><a class="icon-btn" href="#/accueil" aria-label="Retour">${iconSvg('back', 20)}</a><h1>Réglages</h1></div>
    </header>

    <div class="section-title">Apparence</div>
    <section class="card">
      ${segmented([['auto', 'Auto'], ['clair', 'Clair'], ['sombre', 'Sombre']], s.settings.theme, 'theme')}
      <span class="help">« Auto » suit le réglage du téléphone.</span>
    </section>

    <div class="section-title">Budget</div>
    <section class="card" style="padding:4px 16px">
      <div class="settings-list">
        ${item('open-incomes', 'pieces', 'Revenus', `${fmtShort(regularIncome(s))} réguliers par mois · ${nbReg} source${nbReg > 1 ? 's' : ''}`)}
        ${item('go-budget', 'camembert', 'Catégories et budgets', `${s.categories.length} catégories`)}
        ${item('open-helper', 'baguette', 'Aide à la répartition', 'Règle 50 / 30 / 20 adaptée à tes revenus')}
      </div>
    </section>

    <div class="section-title">Comptes</div>
    <section class="card">
      ${switchRow('multiAccounts', 'Plusieurs comptes', 'Rattacher chaque dépense et revenu à un compte', s.settings.multiAccounts, 'toggle-accounts')}
      ${s.settings.multiAccounts ? `<div class="settings-list">
        ${s.accounts.map((a) => item('edit-account', 'portefeuille', a.name, '', a.id)).join('')}
      </div>
      <button class="btn sm" type="button" data-action="add-account">${iconSvg('plus', 16)}Ajouter un compte</button>` : ''}
    </section>

    <div class="section-title">Alertes</div>
    <section class="card">
      <span class="help">Seuils appliqués aux catégories qui n'ont pas de réglage propre. Les alertes s'affichent à l'ouverture de l'appli.</span>
      ${switchRow('t50', 'À 50 % du budget', '', s.settings.thresholds[50], 'threshold-50')}
      ${switchRow('t80', 'À 80 % du budget', '', s.settings.thresholds[80], 'threshold-80')}
      ${switchRow('t100', 'À 100 % du budget', '', s.settings.thresholds[100], 'threshold-100')}
      ${switchRow('pace', 'Alerte de rythme', 'Quand tu dépenses plus vite que le mois n’avance', s.settings.paceAlert, 'toggle-pace')}
    </section>

    <div class="section-title">Analyse</div>
    <section class="card">
      <div class="field">
        <label for="f-period">Période affichée à l'ouverture</label>
        <select class="input" id="f-period" data-change="period-default">
          ${[['derniere', 'La dernière choisie'], ['jour', 'Jour'], ['semaine', 'Semaine'], ['mois', 'Mois'], ['annee', 'Année']]
            .map(([v, l]) => `<option value="${v}" ${s.settings.periodDefault === v ? 'selected' : ''}>${l}</option>`).join('')}
        </select>
      </div>
    </section>

    <div class="section-title">Données</div>
    <section class="card">
      <div class="notice ${ui.persisted ? 'ok' : 'info'}" role="status">
        <span class="ibox">${iconSvg(ui.persisted ? 'check' : 'info', 20)}</span>
        <span class="body"><span class="t">${ui.persisted ? 'Stockage protégé' : 'Stockage non protégé'}</span>
        <span class="d">${ui.persisted ? 'Le navigateur ne supprimera pas tes données de lui-même.' : 'Installe l’appli sur l’écran d’accueil pour que le navigateur protège tes données.'}</span></span>
      </div>
      <p class="help" style="margin:0">Tes données restent sur ce téléphone. Une sauvegarde régulière te protège si tu effaces les données du navigateur ou changes de téléphone.${s.settings.lastBackup ? ` Dernière sauvegarde : ${esc(labelDayFull(s.settings.lastBackup))}.` : ' Aucune sauvegarde pour l’instant.'}</p>
      <div class="btn-row">
        <button class="btn sm" type="button" data-action="export-now">${iconSvg('telecharger', 16)}Exporter</button>
        <label class="btn sm" style="cursor:pointer">${iconSvg('importer', 16)}Importer<input type="file" accept="application/json,.json" data-change="import-file" class="sr-only"></label>
      </div>
      <button class="btn sm danger" type="button" data-action="reset-all">${iconSvg('poubelle', 16)}Tout effacer</button>
    </section>

    <div class="brand-foot">
      <span class="wordmark">Yard<span>get</span></span>
      <span class="help">Ton budget, tes yards. · version ${esc(APP_VERSION)}</span>
    </div>`;
}

export const actions = {
  theme: (ctx, el) => setSetting('theme', el.dataset.id),
  'go-budget': (ctx) => ctx.go('budget'),
  'export-now': (ctx) => { exportData(); ctx.toast('Sauvegarde téléchargée'); },
  'reset-all': (ctx) => ctx.confirm({
    title: 'Tout effacer ?',
    text: 'Dépenses, abonnements, revenus, objectifs et réglages seront supprimés de ce téléphone. Pense à exporter une sauvegarde avant.',
    ok: 'Tout effacer',
    danger: true,
    onOk: () => { resetAll(); ctx.go('accueil'); ctx.toast('Données effacées'); },
  }),
};

export const changes = {
  'toggle-accounts': (ctx, el) => setSetting('multiAccounts', el.checked),
  'threshold-50': (ctx, el) => setThreshold(50, el.checked),
  'threshold-80': (ctx, el) => setThreshold(80, el.checked),
  'threshold-100': (ctx, el) => setThreshold(100, el.checked),
  'toggle-pace': (ctx, el) => setSetting('paceAlert', el.checked),
  'period-default': (ctx, el) => { setSetting('periodDefault', el.value); ctx.ui.period = null; },
  'import-file': async (ctx, el) => {
    const file = el.files && el.files[0];
    el.value = '';
    if (!file) return;
    try {
      const data = parseBackup(await file.text());
      ctx.confirm({
        title: 'Remplacer les données ?',
        text: `Les données actuelles seront remplacées par celles du fichier « ${file.name} » (${data.expenses.length} dépenses).`,
        ok: 'Remplacer',
        danger: true,
        onOk: () => { replaceAll(data); ctx.toast('Sauvegarde importée'); },
      });
    } catch (e) {
      ctx.toast(e.message);
    }
  },
};
