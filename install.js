// Carte « Installe Yardget » (maquettes M3 option B et M4) : affichée sur téléphone
// quand l'appli est ouverte dans le navigateur au lieu d'être installée.

import { iconSvg } from './catalog.js';
import { setSetting } from './store.js';
import { todayISO, diffDays } from './util.js';

let deferredPrompt = null;
let installedNow = false;

window.addEventListener('beforeinstallprompt', (ev) => {
  ev.preventDefault(); // on garde la fenêtre de Chrome pour le bouton « Installer »
  deferredPrompt = ev;
});
window.addEventListener('appinstalled', () => { installedNow = true; deferredPrompt = null; });

export function isInstalled() {
  return installedNow
    || window.matchMedia('(display-mode: standalone)').matches
    || window.matchMedia('(display-mode: fullscreen)').matches
    || window.navigator.standalone === true;
}

const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

export function shouldShow(s, ui) {
  if (!isTouch()) return false; // téléphone uniquement (décision point 24)
  if (isInstalled() || ui.installHidden) return false;
  if (!s.settings.onboarded) return false;
  const last = s.settings.installDismissedOn;
  return !last || diffDays(last, todayISO()) >= 7;
}

const LOGO = `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke-width="4" transform="rotate(-90 12 12)"><circle cx="12" cy="12" r="7" stroke="#60A5FA" stroke-dasharray="18 44"/><circle cx="12" cy="12" r="7" stroke="#4ADE80" stroke-dasharray="9 44" stroke-dashoffset="-19.5"/><circle cx="12" cy="12" r="7" stroke="#FB923C" stroke-dasharray="7 44" stroke-dashoffset="-30"/><circle cx="12" cy="12" r="7" stroke="#2DD4BF" stroke-dasharray="5 44" stroke-dashoffset="-38.5"/></g></svg>`;

export function render(s, ui) {
  if (!shouldShow(s, ui)) return '';
  if (ui.installSteps) {
    const steps = '<li>Touche le menu <strong>⋮</strong> de Chrome, en haut à droite.</li><li>Choisis <strong>Ajouter à l’écran d’accueil</strong>.</li><li>Confirme avec <strong>Installer</strong>.</li>';
    return `<aside class="install-card" aria-label="Installer l'appli">
      <span class="t">Pour installer Yardget</span>
      <ol class="steps">${steps}</ol>
      <button class="btn sm primary" type="button" data-action="install-steps-ok">J’ai compris</button>
    </aside>`;
  }
  return `<aside class="install-card" aria-label="Installer l'appli">
    <button class="x" type="button" data-action="install-later" aria-label="Fermer">${iconSvg('x', 18)}</button>
    <div class="top">
      <span class="logo">${LOGO}</span>
      <span class="txt"><span class="t">Installe Yardget sur ton téléphone</span><span class="d">Ouverture en un toucher, sans réseau, données protégées.</span></span>
    </div>
    <div class="btn-row">
      <button class="btn sm" type="button" data-action="install-later">Plus tard</button>
      <button class="btn sm primary" type="button" data-action="install-now">Installer</button>
    </div>
  </aside>`;
}

export const actions = {
  'install-later': (ctx) => {
    ctx.ui.installSteps = false;
    setSetting('installDismissedOn', todayISO());
  },
  'install-now': async (ctx) => {
    if (deferredPrompt) {
      const p = deferredPrompt;
      deferredPrompt = null;
      p.prompt();
      try {
        const choice = await p.userChoice;
        if (choice && choice.outcome === 'accepted') { ctx.ui.installHidden = true; ctx.render(); }
      } catch { /* ignoré */ }
    } else {
      ctx.ui.installSteps = true;
      ctx.render();
    }
  },
  'install-steps-ok': (ctx) => {
    ctx.ui.installSteps = false;
    ctx.ui.installHidden = true; // masquée jusqu'à la prochaine ouverture
    ctx.render();
  },
};
