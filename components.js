// Morceaux d'interface réutilisés par plusieurs écrans.

import { iconSvg, colorVars } from './catalog.js';
import { esc } from './util.js';

export function catIcon(cat, cls = '', size = 20) {
  const color = cat ? cat.color : 'ardoise';
  const icon = cat ? cat.icon : 'points';
  return `<span class="cat-ico cv ${cls}" style="${colorVars(color)}">${iconSvg(icon, size)}</span>`;
}

export function notice(kind, icon, title, text, action = '', id = '') {
  const tag = action ? 'button' : 'div';
  const attrs = action ? ` type="button" data-action="${action}" data-id="${esc(id)}"` : ' role="status"';
  return `<${tag} class="notice ${kind}"${attrs}>
    <span class="ibox">${iconSvg(icon, 20)}</span>
    <span class="body"><span class="t">${esc(title)}</span>${text ? `<span class="d">${esc(text)}</span>` : ''}</span>
    ${action ? iconSvg('right', 18) : ''}
  </${tag}>`;
}

export function empty(icon, text, button = '') {
  return `<div class="empty">${iconSvg(icon, 28)}<span>${esc(text)}</span>${button}</div>`;
}

export function tabbar(route) {
  const tab = (r, label, icon) => `<a class="tab" href="#/${r}"${route === r ? ' aria-current="page"' : ''}>${iconSvg(icon, 24)}${label}</a>`;
  return `<nav class="tabbar" aria-label="Navigation principale">
    ${tab('accueil', 'Accueil', 'maison')}
    ${tab('depenses', 'Dépenses', 'ticket')}
    <button class="tab-add" type="button" data-action="add-expense" aria-label="Ajouter une dépense">${iconSvg('plus', 28, 'stroke-width="2.4"')}</button>
    ${tab('budget', 'Budget', 'camembert')}
    ${tab('analyse', 'Analyse', 'barres')}
  </nav>`;
}

export function settingsButton() {
  return `<a class="icon-btn" href="#/reglages" aria-label="Réglages">${iconSvg('engrenage', 22)}</a>`;
}

export function switchRow(name, title, desc, checked, action = '') {
  return `<label class="switch-row">
    <span class="txt"><span class="t">${esc(title)}</span>${desc ? `<span class="help">${esc(desc)}</span>` : ''}</span>
    <span class="switch"><input type="checkbox" name="${esc(name)}" ${checked ? 'checked' : ''} ${action ? `data-change="${action}"` : ''}><span></span></span>
  </label>`;
}

export function segmented(items, current, action) {
  return `<div class="segmented" role="tablist" style="grid-template-columns:repeat(${items.length},minmax(0,1fr))">
    ${items.map(([k, label]) => `<button type="button" role="tab" aria-selected="${k === current}" data-action="${action}" data-id="${esc(k)}">${esc(label)}</button>`).join('')}
  </div>`;
}

export function sheetHead(title, { back = false } = {}) {
  return `<div class="sheet-head">
    <button class="icon-btn" type="button" data-action="close-sheet" aria-label="${back ? 'Retour' : 'Fermer'}">${iconSvg(back ? 'back' : 'x', 20)}</button>
    <h2>${esc(title)}</h2>
    <span style="width:44px"></span>
  </div>`;
}

export function amountField(name, label, cents, { required = true, help = '' } = {}) {
  const v = cents == null ? '' : String((cents / 100).toFixed(2)).replace('.', ',').replace(',00', '');
  return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <div class="input-euro"><input class="input" id="f-${name}" name="${name}" inputmode="decimal" autocomplete="off" value="${esc(v)}" ${required ? 'required' : ''} placeholder="0,00"></div>
    ${help ? `<span class="help">${esc(help)}</span>` : ''}
  </div>`;
}

export function textField(name, label, value, { required = false, placeholder = '', maxlength = 60 } = {}) {
  return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <input class="input" id="f-${name}" name="${name}" value="${esc(value || '')}" maxlength="${maxlength}" ${required ? 'required' : ''} placeholder="${esc(placeholder)}" autocomplete="off">
  </div>`;
}

export function dateField(name, label, value, { required = true } = {}) {
  return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <input class="input" type="date" id="f-${name}" name="${name}" value="${esc(value || '')}" ${required ? 'required' : ''}>
  </div>`;
}

export function selectField(name, label, options, value) {
  return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <select class="input" id="f-${name}" name="${name}">
      ${options.map(([v, l]) => `<option value="${esc(v)}" ${String(v) === String(value) ? 'selected' : ''}>${esc(l)}</option>`).join('')}
    </select>
  </div>`;
}

export function categoryOptions(s, { includeSaving = true } = {}) {
  return s.groups.map((g) => {
    const cats = s.categories.filter((c) => c.groupId === g.id && (includeSaving || g.id !== 'epargne'));
    if (!cats.length) return '';
    return `<optgroup label="${esc(g.name)}">${cats.map((c) => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}</optgroup>`;
  }).join('');
}

export function categorySelect(s, name, label, value) {
  const html = categoryOptions(s).replace(`value="${esc(value)}"`, `value="${esc(value)}" selected`);
  return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <select class="input" id="f-${name}" name="${name}">${html}</select>
  </div>`;
}
