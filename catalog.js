// Catalogue : couleurs, icônes et données par défaut.

// Chaque couleur : [clair (graphiques), encre claire (icônes sur fond teinté), sombre]
export const COLORS = {
  bleu: { name: 'Bleu', light: '#2563EB', ink: '#1D4ED8', dark: '#60A5FA' },
  vert: { name: 'Vert', light: '#16A34A', ink: '#15803D', dark: '#4ADE80' },
  jaune: { name: 'Moutarde', light: '#CA8A04', ink: '#A16207', dark: '#FACC15' },
  rouge: { name: 'Rouge', light: '#EF4444', ink: '#B91C1C', dark: '#F87171' },
  violet: { name: 'Violet', light: '#8B5CF6', ink: '#6D28D9', dark: '#A78BFA' },
  orange: { name: 'Orange', light: '#F97316', ink: '#C2410C', dark: '#FB923C' },
  turquoise: { name: 'Turquoise', light: '#14B8A6', ink: '#0F766E', dark: '#2DD4BF' },
  rose: { name: 'Rose', light: '#EC4899', ink: '#BE185D', dark: '#F472B6' },
  ciel: { name: 'Ciel', light: '#0EA5E9', ink: '#0369A1', dark: '#38BDF8' },
  indigo: { name: 'Indigo', light: '#6366F1', ink: '#4338CA', dark: '#818CF8' },
  ardoise: { name: 'Ardoise', light: '#64748B', ink: '#475569', dark: '#94A3B8' },
  olive: { name: 'Olive', light: '#65A30D', ink: '#4D7C0F', dark: '#A3E635' },
  brun: { name: 'Brun', light: '#B45309', ink: '#92400E', dark: '#F59E0B' },
  fuchsia: { name: 'Fuchsia', light: '#C026D3', ink: '#A21CAF', dark: '#E879F9' },
};

// Icônes au trait (viewBox 24, un seul tracé)
export const ICONS = {
  // catégories
  maison: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  panier: 'M2 3h3l2.5 12h11l2-8H6.2M7.5 20a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M16.5 20a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0',
  voiture: 'M5 16v-4l2-5h10l2 5v4zM5 12h14M7 16v3M17 16v3',
  bus: 'M6 3h12a2 2 0 0 1 2 2v12H4V5a2 2 0 0 1 2-2zM4 11h16M7 17v3M17 17v3M8 14h.01M16 14h.01',
  coeur: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  pilule: 'M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7zM8.5 8.5l7 7',
  telephone: 'M9 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2',
  wifi: 'M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01',
  eclair: 'M13 2 4 14h7l-1 8 9-12h-7z',
  diplome: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  tasse: 'M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M8 2v3M12 2v3',
  musique: 'M9 18V5l11-2v13M3 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0M14 16a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  film: 'M4 4h16v16H4zM8 4v16M16 4v16M4 8h4M4 12h4M4 16h4M16 8h4M16 12h4M16 16h4',
  manette: 'M7 8h10a5 5 0 0 1 0 10c-1.5 0-2.5-1-3-2h-4c-.5 1-1.5 2-3 2a5 5 0 0 1 0-10zM8 11v4M6 13h4M15.5 12h.01M17.5 14h.01',
  sport: 'M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12',
  sac: 'M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2',
  tshirt: 'M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z',
  cadeau: 'M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zM12 8c2-4 6-4 6-1.5S15 8 12 8z',
  avion: 'M3 11 21 3l-8 18-2-8zM11 13 21 3',
  patte: 'M8 7a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0M13 7a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0M4.5 11a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0M16.5 11a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0M12 13c-3 0-5 3-5 5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2c0-2-2-5-5-5z',
  outil: 'M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9a4 4 0 0 0-2-2z',
  feuille: 'M5 19c0-9 5-14 15-15-1 10-6 15-15 15zM5 19l7-7',
  mallette: 'M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18',
  cible: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
  pieces: 'M4 7a5 2.5 0 1 0 10 0a5 2.5 0 1 0-10 0M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7M10 15.5c.6 1.2 2.6 2 5 2 2.8 0 5-1.1 5-2.5v-4c0-1.4-2.2-2.5-5-2.5',
  portefeuille: 'M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM3 10h18M16 15h2',
  points: 'M4 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M10.5 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M17 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0',
};

// Icônes d'interface (non proposées pour les catégories)
export const UI = {
  plus: 'M12 5v14M5 12h14',
  x: 'M18 6 6 18M6 6l12 12',
  check: 'm5 12 5 5L20 7',
  down: 'm6 9 6 6 6-6',
  right: 'm9 6 6 6-6 6',
  left: 'm15 6-6 6 6 6',
  back: 'M19 12H5M11 6l-6 6 6 6',
  engrenage: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  reglages: 'M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M13 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  ticket: 'M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6M9 16h3',
  camembert: 'M21 12A9 9 0 1 1 12 3v9zM15 3.5A9 9 0 0 1 20.5 9H15z',
  barres: 'M4 20V11M10 20V5M16 20v-6M21 20H3',
  cloche: 'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',
  ampoule: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z',
  calendrier: 'M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4',
  crayon: 'M4 20h4L19 9l-4-4L4 16z',
  poubelle: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  telecharger: 'M12 3v12M7 10l5 5 5-5M5 21h14',
  importer: 'M12 15V3M7 8l5-5 5 5M5 21h14',
  repeter: 'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',
  lune: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
  soleil: 'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  alerte: 'M12 3 2 20h20zM12 10v4M12 17h.01',
  sauvegarde: 'M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM7 3v5h8V3M7 21v-7h10v7',
  info: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 11v5M12 8h.01',
  baguette: 'M15 4V2M15 10V8M19 6h2M9 6h2M17.8 8.2l1.4 1.4M17.8 3.8l1.4-1.4M3 21l9-9',
};

export function iconSvg(name, size = 20, extra = '') {
  const d = ICONS[name] || UI[name] || ICONS.points;
  return `<svg class="ico" ${extra} aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
}

/** Variables CSS d'une couleur de catégorie (adaptées au thème par la feuille de style) */
export function colorVars(key) {
  const c = COLORS[key] || COLORS.ardoise;
  return `--cl:${c.light};--ci:${c.ink};--cd:${c.dark}`;
}

export const GROUPS = [
  { id: 'besoins', name: 'Besoins', target: 50, color: 'bleu' },
  { id: 'envies', name: 'Envies', target: 30, color: 'orange' },
  { id: 'epargne', name: 'Épargne', target: 20, color: 'indigo' },
];

// weight : part conseillée à l'intérieur du groupe (aide à la répartition)
export const DEFAULT_CATEGORIES = [
  { id: 'logement', name: 'Logement', groupId: 'besoins', color: 'bleu', icon: 'maison', weight: 55, fixed: true },
  { id: 'courses', name: 'Courses', groupId: 'besoins', color: 'vert', icon: 'panier', weight: 25 },
  { id: 'transport', name: 'Transport', groupId: 'besoins', color: 'jaune', icon: 'voiture', weight: 9 },
  { id: 'sante', name: 'Santé', groupId: 'besoins', color: 'rouge', icon: 'coeur', weight: 4 },
  { id: 'telecom', name: 'Télécom', groupId: 'besoins', color: 'violet', icon: 'telephone', weight: 4, fixed: true },
  { id: 'etudes', name: 'Études', groupId: 'besoins', color: 'ardoise', icon: 'diplome', weight: 3 },
  { id: 'restaurants', name: 'Restaurants et cafés', groupId: 'envies', color: 'orange', icon: 'tasse', weight: 20 },
  { id: 'loisirs', name: 'Loisirs et sorties', groupId: 'envies', color: 'turquoise', icon: 'musique', weight: 25 },
  { id: 'shopping', name: 'Shopping', groupId: 'envies', color: 'rose', icon: 'sac', weight: 25 },
  { id: 'cadeaux', name: 'Cadeaux', groupId: 'envies', color: 'ciel', icon: 'cadeau', weight: 15 },
  { id: 'divers', name: 'Divers', groupId: 'envies', color: 'brun', icon: 'points', weight: 15 },
  { id: 'epargne', name: 'Épargne', groupId: 'epargne', color: 'indigo', icon: 'cible', weight: 100 },
];

export const FREQUENCIES = {
  hebdo: { name: 'Hebdomadaire', short: 'hebdo', perYear: 52 },
  mensuel: { name: 'Mensuel', short: 'mensuel', perYear: 12 },
  trimestriel: { name: 'Trimestriel', short: 'trimestriel', perYear: 4 },
  annuel: { name: 'Annuel', short: 'annuel', perYear: 1 },
};

export const PERIODS = {
  jour: 'Jour',
  semaine: 'Semaine',
  mois: 'Mois',
  annee: 'Année',
};
