// Yardget — fichier généré à partir du code source (claude/code/js/). Ne pas modifier à la main.
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // budget-app/js/catalog.js
  var COLORS = {
    bleu: { name: "Bleu", light: "#2563EB", ink: "#1D4ED8", dark: "#60A5FA" },
    vert: { name: "Vert", light: "#16A34A", ink: "#15803D", dark: "#4ADE80" },
    jaune: { name: "Moutarde", light: "#CA8A04", ink: "#A16207", dark: "#FACC15" },
    rouge: { name: "Rouge", light: "#EF4444", ink: "#B91C1C", dark: "#F87171" },
    violet: { name: "Violet", light: "#8B5CF6", ink: "#6D28D9", dark: "#A78BFA" },
    orange: { name: "Orange", light: "#F97316", ink: "#C2410C", dark: "#FB923C" },
    turquoise: { name: "Turquoise", light: "#14B8A6", ink: "#0F766E", dark: "#2DD4BF" },
    rose: { name: "Rose", light: "#EC4899", ink: "#BE185D", dark: "#F472B6" },
    ciel: { name: "Ciel", light: "#0EA5E9", ink: "#0369A1", dark: "#38BDF8" },
    indigo: { name: "Indigo", light: "#6366F1", ink: "#4338CA", dark: "#818CF8" },
    ardoise: { name: "Ardoise", light: "#64748B", ink: "#475569", dark: "#94A3B8" },
    olive: { name: "Olive", light: "#65A30D", ink: "#4D7C0F", dark: "#A3E635" },
    brun: { name: "Brun", light: "#B45309", ink: "#92400E", dark: "#F59E0B" },
    fuchsia: { name: "Fuchsia", light: "#C026D3", ink: "#A21CAF", dark: "#E879F9" }
  };
  var ICONS = {
    // catégories
    maison: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
    panier: "M2 3h3l2.5 12h11l2-8H6.2M7.5 20a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M16.5 20a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
    voiture: "M5 16v-4l2-5h10l2 5v4zM5 12h14M7 16v3M17 16v3",
    bus: "M6 3h12a2 2 0 0 1 2 2v12H4V5a2 2 0 0 1 2-2zM4 11h16M7 17v3M17 17v3M8 14h.01M16 14h.01",
    coeur: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",
    pilule: "M10.5 20.5a5 5 0 0 1-7-7l6-6a5 5 0 0 1 7 7zM8.5 8.5l7 7",
    telephone: "M9 2h6a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
    wifi: "M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01",
    eclair: "M13 2 4 14h7l-1 8 9-12h-7z",
    diplome: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5",
    tasse: "M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2M8 2v3M12 2v3",
    musique: "M9 18V5l11-2v13M3 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0M14 16a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    film: "M4 4h16v16H4zM8 4v16M16 4v16M4 8h4M4 12h4M4 16h4M16 8h4M16 12h4M16 16h4",
    manette: "M7 8h10a5 5 0 0 1 0 10c-1.5 0-2.5-1-3-2h-4c-.5 1-1.5 2-3 2a5 5 0 0 1 0-10zM8 11v4M6 13h4M15.5 12h.01M17.5 14h.01",
    sport: "M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12",
    sac: "M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2",
    tshirt: "M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z",
    cadeau: "M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S9 8 12 8zM12 8c2-4 6-4 6-1.5S15 8 12 8z",
    avion: "M3 11 21 3l-8 18-2-8zM11 13 21 3",
    patte: "M8 7a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0M13 7a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0M4.5 11a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0M16.5 11a1.5 2 0 1 0 3 0a1.5 2 0 1 0-3 0M12 13c-3 0-5 3-5 5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2c0-2-2-5-5-5z",
    outil: "M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3l9-9a4 4 0 0 0-2-2z",
    feuille: "M5 19c0-9 5-14 15-15-1 10-6 15-15 15zM5 19l7-7",
    mallette: "M4 7h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18",
    cible: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
    pieces: "M4 7a5 2.5 0 1 0 10 0a5 2.5 0 1 0-10 0M4 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7M10 15.5c.6 1.2 2.6 2 5 2 2.8 0 5-1.1 5-2.5v-4c0-1.4-2.2-2.5-5-2.5",
    portefeuille: "M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zM3 10h18M16 15h2",
    points: "M4 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M10.5 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M17 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0"
  };
  var UI = {
    plus: "M12 5v14M5 12h14",
    x: "M18 6 6 18M6 6l12 12",
    check: "m5 12 5 5L20 7",
    down: "m6 9 6 6 6-6",
    right: "m9 6 6 6-6 6",
    left: "m15 6-6 6 6 6",
    back: "M19 12H5M11 6l-6 6 6 6",
    engrenage: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    reglages: "M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M13 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0M7 12a2 2 0 1 0 4 0a2 2 0 1 0-4 0M15 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
    ticket: "M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6M9 16h3",
    camembert: "M21 12A9 9 0 1 1 12 3v9zM15 3.5A9 9 0 0 1 20.5 9H15z",
    barres: "M4 20V11M10 20V5M16 20v-6M21 20H3",
    cloche: "M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4",
    ampoule: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z",
    calendrier: "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM3 10h18M8 3v4M16 3v4",
    crayon: "M4 20h4L19 9l-4-4L4 16z",
    poubelle: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
    telecharger: "M12 3v12M7 10l5 5 5-5M5 21h14",
    importer: "M12 15V3M7 8l5-5 5 5M5 21h14",
    repeter: "M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
    lune: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z",
    soleil: "M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
    alerte: "M12 3 2 20h20zM12 10v4M12 17h.01",
    sauvegarde: "M5 3h11l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM7 3v5h8V3M7 21v-7h10v7",
    info: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 11v5M12 8h.01",
    baguette: "M15 4V2M15 10V8M19 6h2M9 6h2M17.8 8.2l1.4 1.4M17.8 3.8l1.4-1.4M3 21l9-9"
  };
  function iconSvg(name, size = 20, extra = "") {
    const d = ICONS[name] || UI[name] || ICONS.points;
    return `<svg class="ico" ${extra} aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
  }
  function colorVars(key) {
    const c = COLORS[key] || COLORS.ardoise;
    return `--cl:${c.light};--ci:${c.ink};--cd:${c.dark}`;
  }
  var GROUPS = [
    { id: "besoins", name: "Besoins", target: 50, color: "bleu" },
    { id: "envies", name: "Envies", target: 30, color: "orange" },
    { id: "epargne", name: "\xC9pargne", target: 20, color: "indigo" }
  ];
  var DEFAULT_CATEGORIES = [
    { id: "logement", name: "Logement", groupId: "besoins", color: "bleu", icon: "maison", weight: 55, fixed: true },
    { id: "courses", name: "Courses", groupId: "besoins", color: "vert", icon: "panier", weight: 25 },
    { id: "transport", name: "Transport", groupId: "besoins", color: "jaune", icon: "voiture", weight: 9 },
    { id: "sante", name: "Sant\xE9", groupId: "besoins", color: "rouge", icon: "coeur", weight: 4 },
    { id: "telecom", name: "T\xE9l\xE9com", groupId: "besoins", color: "violet", icon: "telephone", weight: 4, fixed: true },
    { id: "etudes", name: "\xC9tudes", groupId: "besoins", color: "ardoise", icon: "diplome", weight: 3 },
    { id: "restaurants", name: "Restaurants et caf\xE9s", groupId: "envies", color: "orange", icon: "tasse", weight: 20 },
    { id: "loisirs", name: "Loisirs et sorties", groupId: "envies", color: "turquoise", icon: "musique", weight: 25 },
    { id: "shopping", name: "Shopping", groupId: "envies", color: "rose", icon: "sac", weight: 25 },
    { id: "cadeaux", name: "Cadeaux", groupId: "envies", color: "ciel", icon: "cadeau", weight: 15 },
    { id: "divers", name: "Divers", groupId: "envies", color: "brun", icon: "points", weight: 15 },
    { id: "epargne", name: "\xC9pargne", groupId: "epargne", color: "indigo", icon: "cible", weight: 100 }
  ];
  var FREQUENCIES = {
    hebdo: { name: "Hebdomadaire", short: "hebdo", perYear: 52 },
    mensuel: { name: "Mensuel", short: "mensuel", perYear: 12 },
    trimestriel: { name: "Trimestriel", short: "trimestriel", perYear: 4 },
    annuel: { name: "Annuel", short: "annuel", perYear: 1 }
  };
  var PERIODS = {
    jour: "Jour",
    semaine: "Semaine",
    mois: "Mois",
    annee: "Ann\xE9e"
  };

  // budget-app/js/util.js
  function esc(value) {
    return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }
  var moneyFull = new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var moneyRound = new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  function fmt(cents) {
    return moneyFull.format((cents || 0) / 100);
  }
  function fmtShort(cents) {
    const c = Math.round(cents || 0);
    return c % 100 === 0 ? moneyRound.format(c / 100) : moneyFull.format(c / 100);
  }
  function fmtEuro(cents) {
    return moneyRound.format(Math.round((cents || 0) / 100));
  }
  function parseAmount(text) {
    if (text == null) return null;
    const clean = String(text).replace(/\s| | |€/g, "").replace(",", ".");
    if (clean === "" || !/^\d*\.?\d{0,2}$/.test(clean)) return null;
    const n = Math.round(parseFloat(clean) * 100);
    return Number.isFinite(n) ? n : null;
  }
  function amountToInput(cents) {
    if (cents == null) return "";
    const euros = Math.floor(Math.abs(cents) / 100);
    const rest = Math.abs(cents) % 100;
    return (cents < 0 ? "-" : "") + euros + (rest ? "," + String(rest).padStart(2, "0") : "");
  }
  function pct(part, total) {
    if (!total) return 0;
    return Math.round(part / total * 100);
  }
  function toISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function fromISO(s) {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  function todayISO() {
    return toISO(/* @__PURE__ */ new Date());
  }
  function monthKey(iso) {
    return iso.slice(0, 7);
  }
  function currentMonth() {
    return monthKey(todayISO());
  }
  function addMonths(mk, n) {
    const [y, m] = mk.split("-").map(Number);
    const d = new Date(y, m - 1 + n, 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  function daysInMonth(mk) {
    const [y, m] = mk.split("-").map(Number);
    return new Date(y, m, 0).getDate();
  }
  function addDays(iso, n) {
    const d = fromISO(iso);
    d.setDate(d.getDate() + n);
    return toISO(d);
  }
  function diffDays(fromIso, toIso) {
    return Math.round((fromISO(toIso) - fromISO(fromIso)) / 864e5);
  }
  function weekStart(iso) {
    const d = fromISO(iso);
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day);
    return toISO(d);
  }
  function isoWeekNumber(iso) {
    const [y, m, day] = iso.split("-").map(Number);
    const d = new Date(Date.UTC(y, m - 1, day));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 864e5 + 1) / 7);
  }
  var fmtMonthLong = new Intl.DateTimeFormat("fr-BE", { month: "long", year: "numeric" });
  var fmtMonthName = new Intl.DateTimeFormat("fr-BE", { month: "long" });
  var fmtMonthShort = new Intl.DateTimeFormat("fr-BE", { month: "short" });
  var fmtDayLong = new Intl.DateTimeFormat("fr-BE", { weekday: "long", day: "numeric", month: "long" });
  var fmtDayShort = new Intl.DateTimeFormat("fr-BE", { day: "numeric", month: "short" });
  var fmtDayFull = new Intl.DateTimeFormat("fr-BE", { day: "numeric", month: "short", year: "numeric" });
  var cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  function labelMonth(mk) {
    return cap(fmtMonthLong.format(fromISO(mk + "-01")));
  }
  function labelMonthName(mk) {
    return cap(fmtMonthName.format(fromISO(mk + "-01")));
  }
  function labelMonthShort(mk) {
    return cap(fmtMonthShort.format(fromISO(mk + "-01")));
  }
  function labelDayLong(iso) {
    return cap(fmtDayLong.format(fromISO(iso)));
  }
  function labelDayShort(iso) {
    return fmtDayShort.format(fromISO(iso));
  }
  function labelDayFull(iso) {
    return fmtDayFull.format(fromISO(iso));
  }
  function relativeDay(iso) {
    const n = diffDays(todayISO(), iso);
    if (n === 0) return "Aujourd'hui";
    if (n === 1) return "Demain";
    if (n === -1) return "Hier";
    if (n > 1 && n <= 7) return `Dans ${n} jours`;
    return labelDayShort(iso);
  }

  // budget-app/js/store.js
  var KEY = "yardget:v1";
  var DATA_VERSION = 1;
  function freshState() {
    return {
      version: DATA_VERSION,
      createdOn: todayISO(),
      settings: {
        theme: "auto",
        // auto | clair | sombre
        periodDefault: "derniere",
        // derniere | jour | semaine | mois | annee
        lastPeriod: "mois",
        thresholds: { 50: false, 80: true, 100: true },
        paceAlert: true,
        multiAccounts: false,
        lastBackup: null,
        onboarded: false,
        installDismissedOn: null
      },
      groups: GROUPS.map((g) => ({ ...g })),
      categories: DEFAULT_CATEGORIES.map((c) => ({
        ...c,
        budget: 0,
        thresholds: null,
        // null = réglage général
        fixed: !!c.fixed
      })),
      expenses: [],
      incomes: [],
      subscriptions: [],
      goals: [],
      annuals: [],
      accounts: [{ id: "courant", name: "Compte courant" }],
      budgetHistory: {},
      // { 'AAAA-MM': { catId: centimes } }
      dismissed: {},
      // { 'AAAA-MM': [catId] }
      lastOpenMonth: currentMonth(),
      pendingReview: null
      // mois dont le bilan n'a pas encore été vu
    };
  }
  var state = null;
  var listeners = /* @__PURE__ */ new Set();
  function getState() {
    return state;
  }
  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }
  function emit() {
    listeners.forEach((fn) => fn(state));
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      state = raw ? migrate(JSON.parse(raw)) : freshState();
    } catch (e) {
      console.error("Lecture des donn\xE9es impossible", e);
      state = freshState();
    }
    startOfSession();
    persistNow();
    return state;
  }
  function migrate(data) {
    const base = freshState();
    const s = { ...base, ...data };
    s.settings = { ...base.settings, ...data.settings || {} };
    s.settings.thresholds = { ...base.settings.thresholds, ...(data.settings || {}).thresholds || {} };
    for (const k of ["groups", "categories", "expenses", "incomes", "subscriptions", "goals", "annuals", "accounts"]) {
      if (!Array.isArray(s[k])) s[k] = base[k];
    }
    if (!s.groups.length) s.groups = base.groups;
    if (!s.accounts.length) s.accounts = base.accounts;
    s.budgetHistory = s.budgetHistory || {};
    s.dismissed = s.dismissed || {};
    s.version = DATA_VERSION;
    return s;
  }
  var saveTimer = null;
  function persistNow() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Sauvegarde impossible", e);
    }
  }
  function update(mutator) {
    mutator(state);
    clearTimeout(saveTimer);
    persistNow();
    emit();
  }
  function startOfSession() {
    const mk = currentMonth();
    if (state.lastOpenMonth && state.lastOpenMonth < mk) {
      let m = state.lastOpenMonth;
      while (m < mk) {
        if (!state.budgetHistory[m]) state.budgetHistory[m] = snapshotBudgets();
        const [y, mo] = m.split("-").map(Number);
        const d = new Date(y, mo, 1);
        m = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      }
      const prev = previousMonth(mk);
      const hadData = state.expenses.some((e) => monthKey(e.date) === prev);
      state.pendingReview = hadData ? prev : null;
    }
    state.lastOpenMonth = mk;
    processSubscriptions();
  }
  function previousMonth(mk) {
    const [y, m] = mk.split("-").map(Number);
    const d = new Date(y, m - 2, 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }
  function snapshotBudgets() {
    const snap = {};
    state.categories.forEach((c) => {
      snap[c.id] = c.budget || 0;
    });
    return snap;
  }
  function nextOccurrence(iso, frequency, anchorDay) {
    if (frequency === "hebdo") return addDays(iso, 7);
    const step = frequency === "mensuel" ? 1 : frequency === "trimestriel" ? 3 : 12;
    const d = fromISO(iso);
    const target = new Date(d.getFullYear(), d.getMonth() + step, 1);
    const mk = `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}`;
    const day = Math.min(anchorDay || d.getDate(), daysInMonth(mk));
    target.setDate(day);
    return toISO(target);
  }
  function processSubscriptions() {
    const today = todayISO();
    for (const sub of state.subscriptions) {
      if (sub.status !== "actif") continue;
      const anchor = Number(sub.startDate.slice(8, 10));
      let d = sub.startDate;
      let guard = 0;
      while (d <= today && guard < 600) {
        guard++;
        if (sub.endDate && d > sub.endDate) break;
        if (d >= (sub.trackFrom || sub.startDate)) {
          const exists = state.expenses.some((e) => e.subscriptionId === sub.id && e.date === d);
          if (!exists) {
            state.expenses.push({
              id: uid(),
              amount: sub.amount,
              categoryId: sub.categoryId,
              date: d,
              note: sub.name,
              accountId: sub.accountId || null,
              subscriptionId: sub.id
            });
          }
        }
        d = nextOccurrence(d, sub.frequency, anchor);
      }
    }
  }
  function saveExpense(data) {
    update((s) => {
      if (data.id) {
        const i = s.expenses.findIndex((e) => e.id === data.id);
        if (i >= 0) s.expenses[i] = { ...s.expenses[i], ...data };
      } else {
        s.expenses.push({ ...data, id: uid() });
      }
    });
  }
  function deleteExpense(id) {
    update((s) => {
      s.expenses = s.expenses.filter((e) => e.id !== id);
    });
  }
  function saveSubscription(data) {
    update((s) => {
      if (data.id) {
        const i = s.subscriptions.findIndex((x) => x.id === data.id);
        if (i >= 0) s.subscriptions[i] = { ...s.subscriptions[i], ...data };
      } else {
        s.subscriptions.push({ ...data, id: uid(), trackFrom: todayISO() });
      }
    });
    update(() => processSubscriptions());
  }
  function deleteSubscription(id, keepHistory = true) {
    update((s) => {
      s.subscriptions = s.subscriptions.filter((x) => x.id !== id);
      if (keepHistory) {
        s.expenses.forEach((e) => {
          if (e.subscriptionId === id) e.subscriptionId = null;
        });
      } else {
        s.expenses = s.expenses.filter((e) => e.subscriptionId !== id);
      }
    });
  }
  function saveIncome(data) {
    update((s) => {
      if (data.id) {
        const i = s.incomes.findIndex((x) => x.id === data.id);
        if (i >= 0) s.incomes[i] = { ...s.incomes[i], ...data };
      } else {
        const inc = { ...data, id: uid() };
        s.incomes.push(inc);
        if (inc.type === "ponctuel" && inc.destination === "objectif" && inc.goalId) {
          const g = s.goals.find((x) => x.id === inc.goalId);
          if (g) g.contributions.push({ id: uid(), date: inc.date, amount: inc.amount, incomeId: inc.id });
        }
      }
    });
  }
  function deleteIncome(id) {
    update((s) => {
      s.incomes = s.incomes.filter((x) => x.id !== id);
      s.goals.forEach((g) => {
        g.contributions = g.contributions.filter((c) => c.incomeId !== id);
      });
    });
  }
  function saveCategory(data) {
    update((s) => {
      if (data.id) {
        const i = s.categories.findIndex((x) => x.id === data.id);
        if (i >= 0) s.categories[i] = { ...s.categories[i], ...data };
      } else {
        s.categories.push({ weight: 10, fixed: false, thresholds: null, budget: 0, ...data, id: uid() });
      }
    });
  }
  function mergeCategory(fromId, toId) {
    update((s) => {
      if (fromId === toId) return;
      const from = s.categories.find((c) => c.id === fromId);
      const to = s.categories.find((c) => c.id === toId);
      if (!from || !to) return;
      s.expenses.forEach((e) => {
        if (e.categoryId === fromId) e.categoryId = toId;
      });
      s.subscriptions.forEach((x) => {
        if (x.categoryId === fromId) x.categoryId = toId;
      });
      s.annuals.forEach((x) => {
        if (x.categoryId === fromId) x.categoryId = toId;
      });
      to.budget = (to.budget || 0) + (from.budget || 0);
      s.categories = s.categories.filter((c) => c.id !== fromId);
    });
  }
  function setBudgets(map) {
    update((s) => {
      s.categories.forEach((c) => {
        if (map[c.id] != null) c.budget = map[c.id];
      });
    });
  }
  function dismissSuggestion(catId) {
    update((s) => {
      const mk = currentMonth();
      s.dismissed[mk] = [...s.dismissed[mk] || [], catId];
    });
  }
  function saveGoal(data) {
    update((s) => {
      if (data.id) {
        const i = s.goals.findIndex((x) => x.id === data.id);
        if (i >= 0) s.goals[i] = { ...s.goals[i], ...data };
      } else {
        s.goals.push({ contributions: [], ...data, id: uid() });
      }
    });
  }
  function addContribution(goalId, amount, date) {
    update((s) => {
      const g = s.goals.find((x) => x.id === goalId);
      if (g) g.contributions.push({ id: uid(), date, amount });
    });
  }
  function deleteGoal(id) {
    update((s) => {
      s.goals = s.goals.filter((x) => x.id !== id);
    });
  }
  function saveAnnual(data) {
    update((s) => {
      if (data.id) {
        const i = s.annuals.findIndex((x) => x.id === data.id);
        if (i >= 0) s.annuals[i] = { ...s.annuals[i], ...data };
      } else {
        s.annuals.push({ ...data, id: uid() });
      }
    });
  }
  function deleteAnnual(id) {
    update((s) => {
      s.annuals = s.annuals.filter((x) => x.id !== id);
    });
  }
  function saveAccount(data) {
    update((s) => {
      if (data.id) {
        const a = s.accounts.find((x) => x.id === data.id);
        if (a) a.name = data.name;
      } else {
        s.accounts.push({ id: uid(), name: data.name });
      }
    });
  }
  function deleteAccount(id) {
    update((s) => {
      if (s.accounts.length <= 1) return;
      s.accounts = s.accounts.filter((a) => a.id !== id);
      const fallback = s.accounts[0].id;
      for (const k of ["expenses", "incomes", "subscriptions"]) {
        s[k].forEach((x) => {
          if (x.accountId === id) x.accountId = fallback;
        });
      }
    });
  }
  function setSetting(key, value) {
    update((s) => {
      s.settings[key] = value;
    });
  }
  function setThreshold(level, on) {
    update((s) => {
      s.settings.thresholds[level] = on;
    });
  }
  function clearPendingReview() {
    update((s) => {
      s.pendingReview = null;
    });
  }
  function exportData() {
    const stamp = todayISO();
    const payload = JSON.stringify({ app: "yardget", exportedOn: stamp, data: state }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yardget-sauvegarde-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2e3);
    update((s) => {
      s.settings.lastBackup = stamp;
    });
  }
  function parseBackup(text) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Ce fichier n'est pas une sauvegarde lisible.");
    }
    const data = parsed && (parsed.app === "yardget" || parsed.app === "mon-budget") ? parsed.data : parsed;
    if (!data || !Array.isArray(data.categories) || !Array.isArray(data.expenses)) {
      throw new Error("Ce fichier ne ressemble pas \xE0 une sauvegarde de l'appli.");
    }
    return migrate(data);
  }
  function replaceAll(data) {
    state = migrate(data);
    startOfSession();
    persistNow();
    emit();
  }
  function resetAll() {
    state = freshState();
    persistNow();
    emit();
  }
  async function requestPersistence() {
    try {
      if (navigator.storage && navigator.storage.persist) {
        const already = await navigator.storage.persisted();
        if (already) return true;
        return await navigator.storage.persist();
      }
    } catch {
    }
    return false;
  }
  async function isPersisted() {
    try {
      if (navigator.storage && navigator.storage.persisted) return await navigator.storage.persisted();
    } catch {
    }
    return false;
  }

  // budget-app/js/components.js
  function catIcon(cat, cls = "", size = 20) {
    const color = cat ? cat.color : "ardoise";
    const icon = cat ? cat.icon : "points";
    return `<span class="cat-ico cv ${cls}" style="${colorVars(color)}">${iconSvg(icon, size)}</span>`;
  }
  function notice(kind, icon, title, text, action = "", id = "") {
    const tag = action ? "button" : "div";
    const attrs = action ? ` type="button" data-action="${action}" data-id="${esc(id)}"` : ' role="status"';
    return `<${tag} class="notice ${kind}"${attrs}>
    <span class="ibox">${iconSvg(icon, 20)}</span>
    <span class="body"><span class="t">${esc(title)}</span>${text ? `<span class="d">${esc(text)}</span>` : ""}</span>
    ${action ? iconSvg("right", 18) : ""}
  </${tag}>`;
  }
  function empty(icon, text, button = "") {
    return `<div class="empty">${iconSvg(icon, 28)}<span>${esc(text)}</span>${button}</div>`;
  }
  function tabbar(route) {
    const tab = (r, label, icon) => `<a class="tab" href="#/${r}"${route === r ? ' aria-current="page"' : ""}>${iconSvg(icon, 24)}${label}</a>`;
    return `<nav class="tabbar" aria-label="Navigation principale">
    ${tab("accueil", "Accueil", "maison")}
    ${tab("depenses", "D\xE9penses", "ticket")}
    <button class="tab-add" type="button" data-action="add-expense" aria-label="Ajouter une d\xE9pense">${iconSvg("plus", 28, 'stroke-width="2.4"')}</button>
    ${tab("budget", "Budget", "camembert")}
    ${tab("analyse", "Analyse", "barres")}
  </nav>`;
  }
  function settingsButton() {
    return `<a class="icon-btn" href="#/reglages" aria-label="R\xE9glages">${iconSvg("engrenage", 22)}</a>`;
  }
  function switchRow(name, title, desc, checked, action = "") {
    return `<label class="switch-row">
    <span class="txt"><span class="t">${esc(title)}</span>${desc ? `<span class="help">${esc(desc)}</span>` : ""}</span>
    <span class="switch"><input type="checkbox" name="${esc(name)}" ${checked ? "checked" : ""} ${action ? `data-change="${action}"` : ""}><span></span></span>
  </label>`;
  }
  function segmented(items, current, action) {
    return `<div class="segmented" role="tablist" style="grid-template-columns:repeat(${items.length},minmax(0,1fr))">
    ${items.map(([k, label]) => `<button type="button" role="tab" aria-selected="${k === current}" data-action="${action}" data-id="${esc(k)}">${esc(label)}</button>`).join("")}
  </div>`;
  }
  function sheetHead(title, { back = false } = {}) {
    return `<div class="sheet-head">
    <button class="icon-btn" type="button" data-action="close-sheet" aria-label="${back ? "Retour" : "Fermer"}">${iconSvg(back ? "back" : "x", 20)}</button>
    <h2>${esc(title)}</h2>
    <span style="width:44px"></span>
  </div>`;
  }
  function amountField(name, label, cents, { required = true, help = "" } = {}) {
    const v = cents == null ? "" : String((cents / 100).toFixed(2)).replace(".", ",").replace(",00", "");
    return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <div class="input-euro"><input class="input" id="f-${name}" name="${name}" inputmode="decimal" autocomplete="off" value="${esc(v)}" ${required ? "required" : ""} placeholder="0,00"></div>
    ${help ? `<span class="help">${esc(help)}</span>` : ""}
  </div>`;
  }
  function textField(name, label, value, { required = false, placeholder = "", maxlength = 60 } = {}) {
    return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <input class="input" id="f-${name}" name="${name}" value="${esc(value || "")}" maxlength="${maxlength}" ${required ? "required" : ""} placeholder="${esc(placeholder)}" autocomplete="off">
  </div>`;
  }
  function dateField(name, label, value, { required = true } = {}) {
    return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <input class="input" type="date" id="f-${name}" name="${name}" value="${esc(value || "")}" ${required ? "required" : ""}>
  </div>`;
  }
  function selectField(name, label, options, value) {
    return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <select class="input" id="f-${name}" name="${name}">
      ${options.map(([v, l]) => `<option value="${esc(v)}" ${String(v) === String(value) ? "selected" : ""}>${esc(l)}</option>`).join("")}
    </select>
  </div>`;
  }
  function categoryOptions(s, { includeSaving = true } = {}) {
    return s.groups.map((g) => {
      const cats = s.categories.filter((c) => c.groupId === g.id && (includeSaving || g.id !== "epargne"));
      if (!cats.length) return "";
      return `<optgroup label="${esc(g.name)}">${cats.map((c) => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("")}</optgroup>`;
    }).join("");
  }
  function categorySelect(s, name, label, value) {
    const html = categoryOptions(s).replace(`value="${esc(value)}"`, `value="${esc(value)}" selected`);
    return `<div class="field">
    <label for="f-${name}">${esc(label)}</label>
    <select class="input" id="f-${name}" name="${name}">${html}</select>
  </div>`;
  }

  // budget-app/js/views/home.js
  var home_exports = {};
  __export(home_exports, {
    actions: () => actions,
    expenseRow: () => expenseRow,
    render: () => render
  });

  // budget-app/js/calc.js
  var catById = (s, id) => s.categories.find((c) => c.id === id);
  function budgetsFor(s, mk) {
    if (mk < currentMonth() && s.budgetHistory[mk]) return s.budgetHistory[mk];
    const map = {};
    s.categories.forEach((c) => {
      map[c.id] = c.budget || 0;
    });
    return map;
  }
  function expensesIn(s, fromIso, toIso, accountId = null) {
    return s.expenses.filter((e) => e.date >= fromIso && e.date <= toIso && (!accountId || e.accountId === accountId));
  }
  function monthRange(mk) {
    return [`${mk}-01`, `${mk}-${String(daysInMonth(mk)).padStart(2, "0")}`];
  }
  function spentByCategory(s, mk) {
    const [a, b] = monthRange(mk);
    const map = {};
    for (const e of expensesIn(s, a, b)) map[e.categoryId] = (map[e.categoryId] || 0) + e.amount;
    return map;
  }
  function regularIncome(s) {
    return s.incomes.filter((i) => i.type === "regulier").reduce((t, i) => t + i.amount, 0);
  }
  function oneOffIncomes(s, mk) {
    return s.incomes.filter((i) => i.type === "ponctuel" && monthKey(i.date) === mk);
  }
  function monthSummary(s, mk = currentMonth()) {
    const budgets = budgetsFor(s, mk);
    const spentMap = spentByCategory(s, mk);
    let budgetSpend = 0;
    let budgetSave = 0;
    let spent = 0;
    let saved = 0;
    for (const c of s.categories) {
      const b = budgets[c.id] || 0;
      const sp = spentMap[c.id] || 0;
      if (c.groupId === "epargne") {
        budgetSave += b;
        saved += sp;
      } else {
        budgetSpend += b;
        spent += sp;
      }
    }
    for (const [id, v] of Object.entries(spentMap)) if (!catById(s, id)) spent += v;
    const extra = oneOffIncomes(s, mk).filter((i) => i.destination !== "objectif").reduce((t, i) => t + i.amount, 0);
    const available = budgetSpend + extra;
    const reste = available - spent;
    const today = todayISO();
    const isCurrent = mk === currentMonth();
    const daysLeft = isCurrent ? daysInMonth(mk) - fromISO(today).getDate() + 1 : 0;
    return {
      mk,
      budgets,
      spentMap,
      budgetSpend,
      budgetSave,
      spent,
      saved,
      extra,
      available,
      reste,
      daysLeft,
      perDay: daysLeft > 0 ? Math.max(0, Math.floor(reste / daysLeft)) : 0,
      progress: isCurrent ? fromISO(today).getDate() / daysInMonth(mk) : 1
    };
  }
  function groupBudgets(s) {
    const out = {};
    s.groups.forEach((g) => {
      out[g.id] = 0;
    });
    s.categories.forEach((c) => {
      out[c.groupId] = (out[c.groupId] || 0) + (c.budget || 0);
    });
    return out;
  }
  function monthlyEquivalent(sub) {
    return Math.round(sub.amount * FREQUENCIES[sub.frequency].perYear / 12);
  }
  function yearlyCost(sub) {
    return sub.amount * FREQUENCIES[sub.frequency].perYear;
  }
  function nextDueDate(sub, from = todayISO()) {
    const anchor = Number(sub.startDate.slice(8, 10));
    let d = sub.startDate;
    let guard = 0;
    while (d < from && guard < 1200) {
      d = nextOccurrence(d, sub.frequency, anchor);
      guard++;
    }
    if (sub.endDate && d > sub.endDate) return null;
    return d;
  }
  function upcomingCharges(s, days = 30) {
    const today = todayISO();
    const limit = addDays(today, days);
    const out = [];
    for (const sub of s.subscriptions) {
      if (sub.status !== "actif") continue;
      const d = nextDueDate(sub, addDays(today, 1));
      if (d && d <= limit) out.push({ sub, date: d });
    }
    return out.sort((a, b) => a.date.localeCompare(b.date));
  }
  function categoryThresholds(s, cat) {
    if (Array.isArray(cat.thresholds)) return cat.thresholds;
    return [50, 80, 100].filter((t) => s.settings.thresholds[t]);
  }
  function alerts(s) {
    const list = [];
    const sum = monthSummary(s);
    const today = todayISO();
    for (const c of s.categories) {
      if (c.groupId === "epargne") continue;
      const b = sum.budgets[c.id] || 0;
      const sp = sum.spentMap[c.id] || 0;
      if (!b || !sp) continue;
      const p = sp / b * 100;
      const reached = categoryThresholds(s, c).filter((t) => p >= t).sort((a, b2) => b2 - a)[0];
      if (!reached) continue;
      if (c.fixed && p <= 100) continue;
      list.push({
        kind: reached >= 100 ? "danger" : "warn",
        icon: "cloche",
        catId: c.id,
        title: `${c.name} : ${Math.round(p)} %`,
        text: reached >= 100 && sp > b ? `Budget d\xE9pass\xE9 de ${Math.round((sp - b) / 100)} \u20AC` : `Seuil de ${reached} % atteint`,
        weight: p
      });
    }
    if (s.settings.paceAlert && sum.progress < 0.9) {
      const [a] = monthRange(sum.mk);
      let flexBudget = 0;
      let flexSpent = 0;
      for (const c of s.categories) {
        if (c.groupId === "epargne" || c.fixed) continue;
        flexBudget += sum.budgets[c.id] || 0;
      }
      for (const e of expensesIn(s, a, today)) {
        const c = catById(s, e.categoryId);
        if (!c || c.groupId === "epargne" || c.fixed || e.subscriptionId) continue;
        flexSpent += e.amount;
      }
      if (flexBudget > 0 && fromISO(today).getDate() >= 5) {
        const ratio = flexSpent / flexBudget;
        if (ratio > sum.progress + 0.15) {
          list.push({
            kind: "warn",
            icon: "alerte",
            title: "Rythme rapide",
            text: `${Math.round(ratio * 100)} % du budget variable d\xE9pens\xE9 pour ${Math.round(sum.progress * 100)} % du mois`,
            weight: 200
          });
        }
      }
    }
    for (const sub of s.subscriptions) {
      if (sub.status !== "actif") continue;
      const remind = Number(sub.reminderDays ?? 3);
      const next = nextDueDate(sub, addDays(today, 1));
      if (next && (sub.frequency === "annuel" || sub.frequency === "trimestriel")) {
        const n = diffDays(today, next);
        if (n <= Math.max(remind, 7)) {
          list.push({ kind: "info", icon: "repeter", title: `${sub.name} : renouvellement`, text: `${n <= 1 ? "Demain" : "Dans " + n + " jours"} \xB7 ${(sub.amount / 100).toFixed(2).replace(".", ",")} \u20AC`, weight: 50 });
        }
      }
      if (sub.endDate) {
        const n = diffDays(today, sub.endDate);
        if (n >= 0 && n <= 14) {
          list.push({ kind: "info", icon: "calendrier", title: `${sub.name} se termine`, text: n === 0 ? "Aujourd'hui" : `Dans ${n} jours`, weight: 40 });
        }
      }
    }
    return list.sort((x, y) => y.weight - x.weight);
  }
  function backupDue(s) {
    if (!s.expenses.length) return false;
    if (!s.settings.lastBackup) return diffDays(s.createdOn, todayISO()) >= 7;
    return diffDays(s.settings.lastBackup, todayISO()) >= 30;
  }
  function categoryAverage(s, catId, n = 3) {
    const firstMonth = monthKey(s.createdOn);
    const values = [];
    let mk = addMonths(currentMonth(), -1);
    while (values.length < n && mk >= firstMonth) {
      const [a, b] = monthRange(mk);
      values.push(expensesIn(s, a, b).filter((e) => e.categoryId === catId).reduce((t, e) => t + e.amount, 0));
      mk = addMonths(mk, -1);
    }
    if (!values.length) return null;
    return { avg: Math.round(values.reduce((t, v) => t + v, 0) / values.length), months: values.length };
  }
  function completedMonths(s) {
    const first = monthKey(s.createdOn);
    let n = 0;
    let mk = addMonths(currentMonth(), -1);
    while (mk >= first && n < 24) {
      n++;
      mk = addMonths(mk, -1);
    }
    return n;
  }
  var round5 = (cents) => Math.max(500, Math.round(cents / 500) * 500);
  function suggestions(s) {
    if (completedMonths(s) < 2) return [];
    const dismissed = s.dismissed[currentMonth()] || [];
    const out = [];
    for (const c of s.categories) {
      if (c.groupId === "epargne" || c.fixed || dismissed.includes(c.id)) continue;
      const a = categoryAverage(s, c.id);
      if (!a || a.months < 2 || a.avg < 500) continue;
      const b = c.budget || 0;
      const diff = a.avg - b;
      if (Math.abs(diff) < Math.max(1e3, b * 0.15)) continue;
      const proposed = round5(a.avg);
      if (proposed === b) continue;
      out.push({ cat: c, avg: a.avg, months: a.months, budget: b, proposed, diff: proposed - b });
    }
    return out.sort((x, y) => Math.abs(y.diff) - Math.abs(x.diff));
  }
  function recommendedSplit(s, income) {
    const result = {};
    const targets = {};
    s.groups.forEach((g) => {
      targets[g.id] = Math.round(income * g.target / 100);
    });
    const fixedSum = {};
    s.categories.forEach((c) => {
      if (c.fixed && c.budget > 0) {
        result[c.id] = c.budget;
        fixedSum[c.groupId] = (fixedSum[c.groupId] || 0) + c.budget;
      }
    });
    const overflow = Math.max(0, (fixedSum.besoins || 0) - (targets.besoins || 0));
    if (overflow && targets.envies != null) targets.envies = Math.max(0, targets.envies - overflow);
    for (const g of s.groups) {
      const free = s.categories.filter((c) => c.groupId === g.id && result[c.id] == null);
      const amount = Math.max(0, (targets[g.id] || 0) - (fixedSum[g.id] || 0));
      const totalWeight = free.reduce((t, c) => t + (c.weight || 0), 0);
      let used = 0;
      free.forEach((c, i) => {
        const w = totalWeight ? c.weight || 0 : 1;
        const tw = totalWeight || free.length;
        let v = Math.round(amount * w / tw / 500) * 500;
        if (i === free.length - 1) v = Math.max(0, amount - used);
        used += v;
        result[c.id] = v;
      });
    }
    return result;
  }
  function seriesFor(s, period) {
    const today = todayISO();
    const mk = currentMonth();
    const monthlyBudget = monthSummary(s, mk).budgetSpend;
    const buckets = [];
    if (period === "jour") {
      for (let i = 13; i >= 0; i--) {
        const d = addDays(today, -i);
        buckets.push({ from: d, to: d, label: String(fromISO(d).getDate()), current: i === 0 });
      }
    } else if (period === "semaine") {
      const ws = weekStart(today);
      for (let i = 7; i >= 0; i--) {
        const from = addDays(ws, -7 * i);
        buckets.push({ from, to: addDays(from, 6), label: "S" + isoWeekNumber(from), current: i === 0 });
      }
    } else if (period === "mois") {
      for (let i = 5; i >= 0; i--) {
        const m = addMonths(mk, -i);
        const [from, to] = monthRange(m);
        buckets.push({ from, to, label: labelMonthShort(m).replace(".", ""), current: i === 0 });
      }
    } else {
      const y = mk.slice(0, 4);
      for (let m = 1; m <= 12; m++) {
        const key = `${y}-${String(m).padStart(2, "0")}`;
        const [from, to] = monthRange(key);
        buckets.push({ from, to, label: labelMonthShort(key).charAt(0), current: key === mk, future: key > mk });
      }
    }
    const perUnit = period === "jour" ? monthlyBudget / daysInMonth(mk) : period === "semaine" ? monthlyBudget * 12 / 52 : monthlyBudget;
    const byCat = {};
    const rows = buckets.map((bk) => {
      let besoins = 0;
      let envies = 0;
      for (const e of expensesIn(s, bk.from, bk.to)) {
        const c = catById(s, e.categoryId);
        const g = c ? c.groupId : "envies";
        if (g === "epargne") continue;
        if (g === "besoins") besoins += e.amount;
        else envies += e.amount;
        byCat[e.categoryId] = (byCat[e.categoryId] || 0) + e.amount;
      }
      return { ...bk, besoins, envies, total: besoins + envies };
    });
    const done = rows.filter((r) => !r.current && !r.future && r.from >= s.createdOn.slice(0, period === "jour" ? 10 : 7));
    const avg = done.length ? Math.round(done.reduce((t, r) => t + r.total, 0) / done.length) : null;
    const total = rows.reduce((t, r) => t + r.total, 0);
    const max = Math.max(perUnit, ...rows.map((r) => r.total), 1);
    const cats = Object.entries(byCat).map(([id, v]) => ({ cat: catById(s, id), amount: v })).filter((x) => x.cat).sort((a, b) => b.amount - a.amount);
    return { rows, budget: Math.round(perUnit), avg, total, max, cats };
  }
  function smoothing(s) {
    const items = [];
    for (const sub of s.subscriptions) {
      if (sub.status !== "actif") continue;
      if (sub.frequency !== "annuel" && sub.frequency !== "trimestriel") continue;
      items.push({ kind: "abo", id: sub.id, name: sub.name, categoryId: sub.categoryId, yearly: yearlyCost(sub), next: nextDueDate(sub) });
    }
    for (const a of s.annuals) {
      const next = nextAnnualDate(a.dueDate);
      items.push({ kind: "annuel", id: a.id, name: a.name, categoryId: a.categoryId, yearly: a.amount, next });
    }
    const total = items.reduce((t, x) => t + x.yearly, 0);
    return { items: items.sort((a, b) => (a.next || "").localeCompare(b.next || "")), total, monthly: Math.round(total / 12) };
  }
  function nextAnnualDate(iso) {
    const today = todayISO();
    let d = iso;
    let guard = 0;
    while (d < today && guard < 100) {
      d = nextOccurrence(d, "annuel");
      guard++;
    }
    return d;
  }
  function monthReview(s, mk) {
    const sum = monthSummary(s, mk);
    const lines = s.categories.filter((c) => c.groupId !== "epargne").map((c) => {
      const b = sum.budgets[c.id] || 0;
      const sp = sum.spentMap[c.id] || 0;
      return { cat: c, budget: b, spent: sp, diff: sp - b };
    }).filter((l) => l.budget || l.spent).sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
    const goalsAdded = s.goals.reduce((t, g) => t + g.contributions.filter((c) => monthKey(c.date) === mk).reduce((x, c) => x + c.amount, 0), 0);
    return { ...sum, lines, goalsAdded, balance: sum.available - sum.spent, usage: pct(sum.spent, sum.available) };
  }
  function goalSaved(goal) {
    return goal.contributions.reduce((t, c) => t + c.amount, 0);
  }
  function goalMonthly(goal) {
    if (!goal.deadline) return null;
    const left = goal.target - goalSaved(goal);
    if (left <= 0) return 0;
    const now = currentMonth();
    const end = goal.deadline.slice(0, 7);
    let months = 0;
    let m = now;
    while (m <= end && months < 600) {
      months++;
      m = addMonths(m, 1);
    }
    return Math.ceil(left / Math.max(1, months));
  }

  // budget-app/js/charts.js
  function donut(segments, { size = 200, stroke = 24, selected = null, label = "" } = {}) {
    const r = 70;
    const C = 2 * Math.PI * r;
    const total = segments.reduce((t, s) => t + s.amount, 0);
    const gap = segments.length > 1 ? 2.5 : 0;
    let offset = 0;
    const arcs = total > 0 ? segments.map((s) => {
      const len = s.amount / total * C;
      const dash = Math.max(0.5, len - gap);
      const dim = selected && selected !== s.id ? " dim" : "";
      const out = `<circle class="cv seg${dim}" style="${colorVars(s.color)}" cx="90" cy="90" r="${r}" stroke-dasharray="${dash.toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" data-action="donut-pick" data-id="${esc(s.id)}"/>`;
      offset += len;
      return out;
    }).join("") : "";
    return `<svg class="donut" role="img" aria-label="${esc(label)}" width="${size}" height="${size}" viewBox="0 0 180 180">
    <g transform="rotate(-90 90 90)" fill="none" stroke-width="${stroke}">
      <circle class="track" cx="90" cy="90" r="${r}"/>
      ${arcs}
    </g>
  </svg>`;
  }
  function stackedBars(rows, { height = 170, max, budget = 0, budgetLabel = "", ariaLabel = "" }) {
    const scale = (v) => Math.round(v / max * height);
    const cols = rows.map((r) => {
      const empty2 = r.total === 0;
      const cls = `bar-col${r.current ? " current" : ""}${r.future ? " future" : ""}`;
      return `<div class="${cls}">
      <div class="bar-stack" style="height:${height}px">
        ${empty2 ? '<span class="bar-empty"></span>' : `
        <span class="bar-seg envies" style="height:${scale(r.envies)}px"></span>
        <span class="bar-seg besoins" style="height:${scale(r.besoins)}px"></span>`}
      </div>
      <span class="bar-label">${esc(r.label)}</span>
    </div>`;
    }).join("");
    const line = budget > 0 && budget <= max ? `<div class="budget-line" style="bottom:${scale(budget) + 22}px"><span>${esc(budgetLabel)}</span></div>` : "";
    return `<div class="bars" role="img" aria-label="${esc(ariaLabel)}">${line}${cols}</div>`;
  }
  function gauge(value, total, color, { thin = false } = {}) {
    const p = total > 0 ? Math.min(100, Math.round(value / total * 100)) : 0;
    const over = total > 0 && value > total;
    return `<div class="gauge${thin ? " thin" : ""}${over ? " over" : ""}" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}">
    <span class="cv" style="${colorVars(color)};width:${p}%"></span>
  </div>`;
  }

  // budget-app/js/views/home.js
  function render(s, ui2) {
    const sum = monthSummary(s);
    const hasBudget = sum.budgetSpend > 0;
    const parts = [];
    parts.push(`<header class="page-head">
    <div><div class="sub">${esc(labelDayLong(todayISO()))}</div><h1>Bonjour</h1></div>
    ${settingsButton()}
  </header>`);
    if (hasBudget) {
      const used = Math.min(100, pct(sum.spent, sum.available));
      parts.push(`<section class="hero" aria-label="Reste \xE0 d\xE9penser">
      <span class="label">Reste \xE0 d\xE9penser</span>
      <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
        <span class="amount${sum.reste < 0 ? " neg" : ""}">${fmtShort(sum.reste)}</span>
        <span class="soft" style="font-size:14px;font-weight:500">jusqu'\xE0 fin ${esc(labelMonthName(currentMonth()).toLowerCase())}</span>
      </div>
      <div class="hero-row">
        <span class="pill">${sum.reste > 0 ? `\u2248 ${fmtEuro(sum.perDay)} par jour` : "Budget \xE9puis\xE9"}</span>
        <span class="soft">${sum.daysLeft} jour${sum.daysLeft > 1 ? "s" : ""} restant${sum.daysLeft > 1 ? "s" : ""}</span>
      </div>
      <div class="track" aria-hidden="true"><span style="width:${used}%"></span></div>
      <div class="foot"><span>${fmtShort(sum.spent)} d\xE9pens\xE9s</span><span>budget ${fmtShort(sum.available)}${sum.extra ? " (revenu ponctuel inclus)" : ""}</span></div>
    </section>`);
    } else {
      parts.push(`<section class="card" aria-label="Premier budget">
      <div class="card-head"><h2>Pr\xE9pare ton budget</h2></div>
      <p class="muted" style="margin:0;font-size:14px">Indique tes revenus r\xE9guliers : l'appli te propose une r\xE9partition par cat\xE9gorie, que tu ajustes ensuite.</p>
      <button class="btn primary" type="button" data-action="open-helper">${iconSvg("baguette", 18)}\xC9tablir mon budget</button>
    </section>`);
    }
    const al = alerts(s);
    const banners = [];
    al.filter((a) => a.kind !== "info").forEach((a) => banners.push(notice(a.kind, a.icon, a.title, a.text, a.catId ? "open-cat-history" : "", a.catId || "")));
    if (s.pendingReview) {
      banners.push(notice("ok", "check", `Le bilan de ${labelMonthName(s.pendingReview).toLowerCase()} est pr\xEAt`, "Voir les \xE9carts et ajuster le mois en cours", "go-review"));
    }
    if (backupDue(s)) {
      banners.push(notice("info", "sauvegarde", "Pense \xE0 sauvegarder tes donn\xE9es", s.settings.lastBackup ? "Derni\xE8re sauvegarde il y a plus d\u2019un mois" : "Aucune sauvegarde pour l\u2019instant", "export-now"));
    }
    al.filter((a) => a.kind === "info").forEach((a) => banners.push(notice(a.kind, a.icon, a.title, a.text)));
    parts.push(...banners.slice(0, 3));
    const segs = s.categories.filter((c) => c.groupId !== "epargne" && (sum.spentMap[c.id] || 0) > 0).map((c) => ({ id: c.id, amount: sum.spentMap[c.id], color: c.color, cat: c })).sort((a, b) => b.amount - a.amount);
    const sel = segs.find((x) => x.id === ui2.homeSel) ? ui2.homeSel : null;
    let center = { l: "D\xE9pens\xE9", v: fmtShort(sum.spent), s: hasBudget ? `sur ${fmtShort(sum.available)}` : "ce mois-ci" };
    if (sel) {
      const seg = segs.find((x) => x.id === sel);
      const b = sum.budgets[sel] || 0;
      center = { l: seg.cat.name, v: fmtShort(seg.amount), s: b ? `${pct(seg.amount, b)} % de ${fmtShort(b)}` : `${pct(seg.amount, sum.spent)} % du mois` };
    }
    parts.push(`<section class="card" aria-label="R\xE9partition du mois">
    <div class="card-head"><h2>${esc(labelMonthName(currentMonth()))}</h2><a class="link-btn" href="#/analyse">Analyse</a></div>
    ${segs.length ? `
      <div class="donut-wrap">
        ${donut(segs, { selected: sel, label: "D\xE9penses du mois par cat\xE9gorie" })}
        <div class="donut-center"><span class="l">${esc(center.l)}</span><span class="v">${esc(center.v)}</span><span class="s">${esc(center.s)}</span></div>
      </div>
      <div class="legend">
        ${segs.map((g) => `<button type="button" class="legend-item cv${g.id === sel ? " on" : ""}" style="${colorVars(g.color)}" data-action="donut-pick" data-id="${esc(g.id)}" aria-pressed="${g.id === sel}">
          ${catIcon(g.cat, "sm", 16)}
          <span class="txt"><span class="n">${esc(g.cat.name)}</span><span class="a">${fmtEuro(g.amount)} \xB7 ${pct(g.amount, sum.spent)} %</span></span>
        </button>`).join("")}
      </div>
      ${sel ? `<button class="btn sm" type="button" data-action="open-cat-history" data-id="${esc(sel)}">Voir les d\xE9penses ${esc(catById(s, sel).name)}</button>` : ""}
    ` : empty("camembert", "Aucune d\xE9pense ce mois-ci pour l\u2019instant.", '<button class="btn sm primary" type="button" data-action="add-expense">Ajouter une d\xE9pense</button>')}
  </section>`);
    const next = upcomingCharges(s, 30).slice(0, 4);
    if (s.subscriptions.length) {
      parts.push(`<section class="card" aria-label="Prochains pr\xE9l\xE8vements">
      <div class="card-head"><h2>Prochains pr\xE9l\xE8vements</h2><a class="link-btn" href="#/depenses/abonnements">Tout voir</a></div>
      ${next.length ? `<div class="rows">${next.map(({ sub, date }) => `
        <button class="row" type="button" data-action="edit-sub" data-id="${esc(sub.id)}">
          ${catIcon(catById(s, sub.categoryId))}
          <span class="main"><span class="t">${esc(sub.name)}</span><span class="d">${esc(relativeDay(date))} \xB7 ${esc(FREQUENCIES[sub.frequency].short)}</span></span>
          <span class="amt">${fmt(sub.amount)}</span>
        </button>`).join("")}</div>` : '<p class="muted small" style="margin:0">Rien dans les 30 prochains jours.</p>'}
    </section>`);
    }
    const recent = [...s.expenses].sort((a, b) => b.date.localeCompare(a.date) || (b.id > a.id ? 1 : -1)).slice(0, 3);
    if (recent.length) {
      parts.push(`<section class="card" aria-label="Derni\xE8res d\xE9penses">
      <div class="card-head"><h2>Derni\xE8res d\xE9penses</h2><a class="link-btn" href="#/depenses">Historique</a></div>
      <div class="rows">${recent.map((e) => expenseRow(s, e)).join("")}</div>
    </section>`);
    }
    return parts.join("");
  }
  function expenseRow(s, e, { showDate = true } = {}) {
    const c = catById(s, e.categoryId);
    const title = e.note || (c ? c.name : "D\xE9pense");
    const meta = e.note ? [c ? c.name : "Cat\xE9gorie supprim\xE9e"] : [];
    if (showDate) meta.push(relativeDay(e.date));
    if (e.subscriptionId) meta.push("abonnement");
    if (s.settings.multiAccounts && e.accountId) {
      const a = s.accounts.find((x) => x.id === e.accountId);
      if (a) meta.push(a.name);
    }
    return `<button class="row" type="button" data-action="edit-expense" data-id="${esc(e.id)}">
    ${catIcon(c)}
    <span class="main"><span class="t">${esc(title)}</span>${meta.length ? `<span class="d">${esc(meta.join(" \xB7 "))}</span>` : ""}</span>
    <span class="amt">${fmt(e.amount)}</span>
  </button>`;
  }
  var actions = {
    "donut-pick": (ctx2, el) => {
      ctx2.ui.homeSel = ctx2.ui.homeSel === el.dataset.id ? null : el.dataset.id;
      ctx2.render();
    },
    "open-cat-history": (ctx2, el) => {
      ctx2.ui.expTab = "historique";
      ctx2.ui.histFilter = "cat:" + el.dataset.id;
      ctx2.ui.histMonth = currentMonth();
      ctx2.go("depenses");
    },
    "go-review": (ctx2) => {
      ctx2.go("analyse");
      setTimeout(() => document.getElementById("bilan")?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  };

  // budget-app/js/views/expenses.js
  var expenses_exports = {};
  __export(expenses_exports, {
    actions: () => actions2,
    changes: () => changes,
    render: () => render2
  });
  function render2(s, ui2) {
    const tab = ui2.expTab || "historique";
    return `<header class="page-head"><h1>D\xE9penses</h1>${settingsButton()}</header>
    ${segmented([["historique", "Historique"], ["abonnements", "Abonnements"]], tab, "exp-tab")}
    ${tab === "historique" ? history2(s, ui2) : subscriptions(s, ui2)}`;
  }
  function filterMatches(s, e, filter) {
    if (!filter || filter === "tout") return true;
    if (filter === "abo") return !!e.subscriptionId;
    if (filter.startsWith("cat:")) return e.categoryId === filter.slice(4);
    const c = catById(s, e.categoryId);
    return (c ? c.groupId : "envies") === filter;
  }
  function history2(s, ui2) {
    const mk = ui2.histMonth || currentMonth();
    const filter = ui2.histFilter || "tout";
    const account = s.settings.multiAccounts ? ui2.histAccount || "" : "";
    const [a, b] = monthRange(mk);
    const list = expensesIn(s, a, b, account || null).filter((e) => filterMatches(s, e, filter)).sort((x, y) => y.date.localeCompare(x.date) || (y.id > x.id ? 1 : -1));
    const total = list.reduce((t, e) => t + e.amount, 0);
    const chip = (k, label) => `<button class="chip" type="button" data-action="hist-filter" data-id="${k}" aria-pressed="${filter === k}">${esc(label)}</button>`;
    let catChip = "";
    if (filter.startsWith("cat:")) {
      const c = catById(s, filter.slice(4));
      if (c) catChip = `<button class="chip cat cv" style="${colorVars(c.color)}" type="button" data-action="hist-filter" data-id="tout" aria-pressed="true" aria-label="Retirer le filtre ${esc(c.name)}">${esc(c.name)} ${iconSvg("x", 14)}</button>`;
    }
    const days = [];
    for (const e of list) {
      let d = days[days.length - 1];
      if (!d || d.date !== e.date) {
        d = { date: e.date, items: [], total: 0 };
        days.push(d);
      }
      d.items.push(e);
      d.total += e.amount;
    }
    const isCurrent = mk === currentMonth();
    return `
    <div class="month-nav">
      <button class="icon-btn" type="button" data-action="hist-month" data-id="-1" aria-label="Mois pr\xE9c\xE9dent">${iconSvg("left", 20)}</button>
      <span class="lbl">${esc(labelMonth(mk))}</span>
      <button class="icon-btn" type="button" data-action="hist-month" data-id="1" aria-label="Mois suivant" ${isCurrent ? 'disabled style="opacity:.35"' : ""}>${iconSvg("right", 20)}</button>
    </div>
    <div class="chips" role="group" aria-label="Filtrer">
      ${catChip}
      ${chip("tout", "Tout")}${chip("besoins", "Besoins")}${chip("envies", "Envies")}${chip("epargne", "\xC9pargne")}${chip("abo", "Abonnements")}
    </div>
    ${s.settings.multiAccounts ? `<select class="input" data-change="hist-account" aria-label="Compte">
      <option value="">Tous les comptes</option>
      ${s.accounts.map((acc) => `<option value="${esc(acc.id)}" ${acc.id === account ? "selected" : ""}>${esc(acc.name)}</option>`).join("")}
    </select>` : ""}
    <div class="card" style="flex-direction:row;align-items:center;justify-content:space-between;padding:14px 16px">
      <span class="muted strong small">${list.length} d\xE9pense${list.length > 1 ? "s" : ""}</span>
      <span class="strong">${fmt(total)}</span>
    </div>
    ${days.length ? days.map((d) => `
      <section class="stack" aria-label="${esc(labelDayLong(d.date))}">
        <div class="day-head"><span>${esc(dayLabel(d.date))}</span><span>${fmt(d.total)}</span></div>
        <div class="list-card rows">${d.items.map((e) => expenseRow(s, e, { showDate: false })).join("")}</div>
      </section>`).join("") : empty("ticket", "Aucune d\xE9pense pour cette s\xE9lection.")}
  `;
  }
  function dayLabel(iso) {
    const n = diffDays(iso, todayISO());
    if (n === 0) return "Aujourd'hui";
    if (n === 1) return "Hier";
    return labelDayLong(iso);
  }
  function subscriptions(s, ui2) {
    const today = todayISO();
    const active = s.subscriptions.filter((x) => x.status === "actif" && !(x.endDate && x.endDate < today));
    const ended = s.subscriptions.filter((x) => x.status === "actif" && x.endDate && x.endDate < today);
    const planned = s.subscriptions.filter((x) => x.status === "envisage");
    const perMonth = active.reduce((t, x) => t + monthlyEquivalent(x), 0);
    const perYear = active.reduce((t, x) => t + yearlyCost(x), 0);
    const detail = !!ui2.aboDetail;
    const sorted = [...active].sort((a, b) => monthlyEquivalent(b) - monthlyEquivalent(a));
    const sum = monthSummary(s);
    const byNext = [...active].sort((a, b) => (nextDueDate(a, addDay(today)) || "9999").localeCompare(nextDueDate(b, addDay(today)) || "9999"));
    const summary = active.length ? `<section class="card" aria-label="Co\xFBt total des abonnements">
      <div class="tiles" style="grid-template-columns:repeat(2,minmax(0,1fr))">
        <div style="display:flex;flex-direction:column;gap:2px"><span class="muted small strong">Par mois</span><span class="big">${fmt(perMonth)}</span></div>
        <div style="display:flex;flex-direction:column;gap:2px"><span class="muted small strong">Par an</span><span class="big">${fmt(perYear)}</span></div>
      </div>
      <div class="split" aria-hidden="true">${sorted.map((x) => {
      const c = catById(s, x.categoryId);
      return `<span class="cv" style="${colorVars(c ? c.color : "ardoise")};background:var(--c);flex:${monthlyEquivalent(x)}"></span>`;
    }).join("")}</div>
      <button class="link-btn" type="button" data-action="abo-detail" aria-expanded="${detail}" style="display:flex;justify-content:space-between;align-items:center;width:100%">
        ${detail ? "Masquer le d\xE9tail" : "Voir le d\xE9tail"} <span style="transform:rotate(${detail ? 180 : 0}deg);display:inline-flex">${iconSvg("down", 18)}</span>
      </button>
      ${detail ? `<div class="stack" style="border-top:1px solid var(--line-soft);padding-top:12px">${sorted.map((x) => {
      const c = catById(s, x.categoryId);
      return `<div style="display:flex;align-items:center;gap:10px;font-size:13px">
          <span class="dot cv" style="${colorVars(c ? c.color : "ardoise")}"></span>
          <span style="flex:1;font-weight:500">${esc(x.name)}</span>
          <span class="strong">${fmt(monthlyEquivalent(x))}/mois</span>
          <span class="muted" style="width:96px;text-align:right">${fmt(yearlyCost(x))}/an</span>
        </div>`;
    }).join("")}</div>` : ""}
    </section>` : "";
    const plannedTotal = planned.reduce((t, x) => t + monthlyEquivalent(x), 0);
    return `
    ${summary}
    <div class="card-head" style="padding:0 4px">
      <h2 style="font-size:17px">Mes abonnements</h2>
      <button class="btn sm" type="button" data-action="add-sub">${iconSvg("plus", 16)}Ajouter</button>
    </div>
    ${active.length ? `<div class="stack">${byNext.map((x) => subRow(s, x)).join("")}</div>` : empty("repeter", "Ajoute tes abonnements (t\xE9l\xE9phone, streaming, assurance\u2026) pour suivre leur co\xFBt et recevoir un rappel avant chaque pr\xE9l\xE8vement.")}
    ${planned.length ? `
      <div class="group-head"><h2>Envisag\xE9s</h2><span class="muted small strong">+${fmt(plannedTotal)}/mois</span></div>
      <p class="help" style="margin:0 4px">Reste \xE0 d\xE9penser ce mois-ci : ${fmtShort(sum.reste)} \u2192 ${fmtShort(sum.reste - plannedTotal)} si tu les prends.</p>
      <div class="stack">${planned.map((x) => subRow(s, x)).join("")}</div>` : ""}
    ${ended.length ? `
      <div class="group-head"><h2>Termin\xE9s</h2></div>
      <div class="stack">${ended.map((x) => subRow(s, x)).join("")}</div>` : ""}
  `;
  }
  function addDay(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    const dt = new Date(y, m - 1, d + 1);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  }
  function subRow(s, x) {
    const c = catById(s, x.categoryId);
    const today = todayISO();
    const f = FREQUENCIES[x.frequency];
    const day = Number(x.startDate.slice(8, 10));
    let when = x.frequency === "mensuel" ? `le ${day === 1 ? "1er" : day}` : x.frequency === "hebdo" ? "chaque semaine" : labelDayShort(nextDueDate(x) || x.startDate);
    const meta = [x.status === "envisage" ? "Envisag\xE9 \xB7 " + f.short : f.name, when, x.endDate ? "" : "sans fin"].filter(Boolean).join(" \xB7 ");
    const badges = [];
    if (x.status === "actif") {
      const next = nextDueDate(x, addDay(today));
      if (x.endDate && x.endDate < today) badges.push(`<span class="badge muted">Termin\xE9 le ${esc(labelDayFull(x.endDate))}</span>`);
      else {
        if (next && diffDays(today, next) <= 7) badges.push(`<span class="badge cat cv" style="${colorVars(c ? c.color : "ardoise")}">${esc(relativeDay(next))}</span>`);
        if (x.endDate) badges.push(`<span class="badge ${diffDays(today, x.endDate) <= 30 ? "danger" : "muted"}">Se termine le ${esc(labelDayFull(x.endDate))}</span>`);
      }
    }
    return `<button class="sub-row${x.status === "envisage" ? " envisage" : ""}" type="button" data-action="edit-sub" data-id="${esc(x.id)}">
    ${catIcon(c)}
    <span class="main" style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
      <span class="t" style="font-size:14px;font-weight:600">${esc(x.name)}</span>
      <span class="d muted small">${esc(meta)}</span>
      ${badges.join("")}
    </span>
    <span class="strong" style="font-size:14px;white-space:nowrap">${fmt(x.amount)}</span>
  </button>`;
  }
  var actions2 = {
    "exp-tab": (ctx2, el) => {
      ctx2.ui.expTab = el.dataset.id;
      ctx2.go(el.dataset.id === "abonnements" ? "depenses/abonnements" : "depenses");
    },
    "hist-filter": (ctx2, el) => {
      ctx2.ui.histFilter = el.dataset.id;
      ctx2.render();
    },
    "hist-month": (ctx2, el) => {
      const next = addMonths(ctx2.ui.histMonth || currentMonth(), Number(el.dataset.id));
      if (next > currentMonth()) return;
      ctx2.ui.histMonth = next;
      ctx2.render();
    },
    "abo-detail": (ctx2) => {
      ctx2.ui.aboDetail = !ctx2.ui.aboDetail;
      ctx2.render();
    }
  };
  var changes = {
    "hist-account": (ctx2, el) => {
      ctx2.ui.histAccount = el.value;
      ctx2.render();
    }
  };

  // budget-app/js/views/budget.js
  var budget_exports = {};
  __export(budget_exports, {
    actions: () => actions3,
    render: () => render3
  });
  function render3(s) {
    const mk = currentMonth();
    const sum = monthSummary(s, mk);
    const income = regularIncome(s);
    const oneoffs = oneOffIncomes(s, mk);
    const gb = groupBudgets(s);
    const totalBudget = Object.values(gb).reduce((t, v) => t + v, 0);
    const base = income || totalBudget;
    const parts = [];
    parts.push(`<header class="page-head"><div><div class="sub">${esc(labelMonth(mk))}</div><h1>Budget</h1></div>${settingsButton()}</header>`);
    parts.push(`<section class="card" aria-label="Revenus">
    <div class="card-head">
      <div style="display:flex;flex-direction:column;gap:2px">
        <span class="muted small strong">Revenus r\xE9guliers</span>
        <span class="big">${fmtShort(income)} <span class="muted" style="font-size:14px;font-weight:600">/ mois</span></span>
      </div>
      <button class="btn sm" type="button" data-action="open-incomes">G\xE9rer</button>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
      <span class="muted small strong">${oneoffs.length ? `+ ${fmtShort(oneoffs.reduce((t, i) => t + i.amount, 0))} ponctuel ce mois-ci` : "Aucun revenu ponctuel ce mois-ci"}</span>
      <button class="link-btn" type="button" data-action="add-income" data-id="ponctuel" style="white-space:nowrap">+ Revenu ponctuel</button>
    </div>
  </section>`);
    const share = (g) => base ? Math.round(gb[g] / base * 100) : 0;
    const unassigned = income ? income - totalBudget : 0;
    parts.push(`<section class="card" aria-label="R\xE9partition">
    <div class="card-head"><h2>R\xE9partition</h2><button class="btn sm" type="button" data-action="open-helper">${iconSvg("baguette", 16)}Aide</button></div>
    ${totalBudget ? `
      <div class="stack" style="gap:6px">
        <span class="small strong">Mon budget</span>
        <div class="split" aria-hidden="true">
          <span class="g-besoins" style="flex:${gb.besoins || 0}"></span>
          <span class="g-envies" style="flex:${gb.envies || 0}"></span>
          <span class="g-epargne" style="flex:${gb.epargne || 0}"></span>
          ${unassigned > 0 ? `<span style="flex:${unassigned};background:transparent"></span>` : ""}
        </div>
        <span class="small strong muted" style="margin-top:4px">R\xE8gle 50 / 30 / 20</span>
        <div class="split ref" aria-hidden="true"><span class="g-besoins" style="flex:50"></span><span class="g-envies" style="flex:30"></span><span class="g-epargne" style="flex:20"></span></div>
      </div>
      <div class="tiles">
        ${s.groups.map((g) => `<div class="tile">
          <span class="k" style="color:var(--g-${g.id})">${esc(g.name)}</span>
          <span class="v">${fmtEuro(gb[g.id] || 0)}</span>
          <span class="h">${share(g.id)} %</span>
          <span class="h">conseill\xE9 ${g.target} %</span>
        </div>`).join("")}
      </div>
      ${income && unassigned !== 0 ? `<p class="help" style="margin:0">${unassigned > 0 ? `${fmtShort(unassigned)} de tes revenus ne sont attribu\xE9s \xE0 aucune cat\xE9gorie.` : `Ton budget d\xE9passe tes revenus r\xE9guliers de ${fmtShort(-unassigned)}.`}</p>` : ""}
    ` : `<p class="muted" style="margin:0;font-size:14px">Aucun budget fix\xE9. L'aide te propose une r\xE9partition \xE0 partir de tes revenus.</p>`}
  </section>`);
    const sugg = suggestions(s);
    sugg.slice(0, 2).forEach((g) => {
      parts.push(`<section class="notice info" style="flex-direction:column;align-items:stretch;gap:10px" aria-label="Suggestion">
      <div style="display:flex;gap:10px;align-items:flex-start">
        <span class="ibox">${iconSvg("ampoule", 20)}</span>
        <span class="body"><span class="t">${esc(g.cat.name)} : ${fmtEuro(g.avg)} en moyenne</span>
        <span class="d">Sur les ${g.months} derniers mois. ${g.diff < 0 ? `Passer de ${fmtEuro(g.budget)} \xE0 ${fmtEuro(g.proposed)} lib\xE9rerait ${fmtEuro(-g.diff)}.` : `Ton budget de ${fmtEuro(g.budget)} est souvent d\xE9pass\xE9 ; ${fmtEuro(g.proposed)} serait plus r\xE9aliste.`}</span></span>
      </div>
      <div class="btn-row">
        <button class="btn sm" type="button" data-action="sugg-keep" data-id="${esc(g.cat.id)}">Garder ${fmtEuro(g.budget)}</button>
        <button class="btn sm primary" type="button" data-action="sugg-apply" data-id="${esc(g.cat.id)}" data-amount="${g.proposed}">Passer \xE0 ${fmtEuro(g.proposed)}</button>
      </div>
    </section>`);
    });
    if (totalBudget && completedMonths(s) < 2) {
      parts.push(`<p class="help" style="margin:0 4px">Apr\xE8s deux mois complets, l'appli comparera ton budget \xE0 tes d\xE9penses r\xE9elles et proposera des ajustements.</p>`);
    }
    for (const g of s.groups) {
      const cats = s.categories.filter((c) => c.groupId === g.id);
      const groupSpent = cats.reduce((t, c) => t + (sum.spentMap[c.id] || 0), 0);
      parts.push(`<section class="stack" aria-label="${esc(g.name)}">
      <div class="group-head">
        <h2><span class="gdot g-${g.id}"></span>${esc(g.name)}</h2>
        <span class="muted small strong">${g.id === "epargne" ? `${fmtEuro(groupSpent)} mis de c\xF4t\xE9` : `${fmtEuro(groupSpent)} / ${fmtEuro(gb[g.id] || 0)}`}</span>
      </div>
      <div class="list-card rows">
        ${cats.length ? cats.map((c) => catLine(s, c, sum)).join("") : `<p class="muted small" style="padding:12px 0;margin:0">Aucune cat\xE9gorie.</p>`}
      </div>
    </section>`);
    }
    parts.push(`<button class="btn block" type="button" data-action="add-cat">${iconSvg("plus", 18)}Nouvelle cat\xE9gorie</button>`);
    parts.push(`<div class="group-head" style="margin-top:6px"><h2>Objectifs d'\xE9pargne</h2><button class="btn sm" type="button" data-action="add-goal">${iconSvg("plus", 16)}Objectif</button></div>`);
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
            <span class="muted small">${goal.deadline ? "\xC9ch\xE9ance " + esc(labelDayFull(goal.deadline)) : "Sans \xE9ch\xE9ance"}</span>
          </span>
          <span class="strong small">${fmtEuro(saved)} <span class="muted" style="font-weight:500">/ ${fmtEuro(goal.target)}</span></span>
        </div>
        ${gauge(saved, goal.target, goal.color)}
        <span class="muted small">${done ? "Objectif atteint !" : monthly ? `Environ ${fmtEuro(monthly)} par mois pour l'atteindre \xE0 temps` : `${pct(saved, goal.target)} % atteint`}</span>
      </button>`);
      });
    } else {
      parts.push(empty("cible", "Un voyage, un fonds d\u2019urgence, un achat : fixe un montant cible et suis ta progression."));
    }
    return parts.join("");
  }
  function catLine(s, c, sum) {
    const b = sum.budgets[c.id] || 0;
    const sp = sum.spentMap[c.id] || 0;
    const p = b ? pct(sp, b) : 0;
    const a = categoryAverage(s, c.id);
    let hint = "";
    if (c.groupId === "epargne") hint = b ? `Pr\xE9vu : ${fmtEuro(b)} par mois` : "Aucun montant pr\xE9vu";
    else if (c.fixed) hint = "D\xE9pense fixe" + (a ? ` \xB7 moyenne ${fmtEuro(a.avg)}` : "");
    else if (a) hint = `Moyenne ${a.months} mois : ${fmtEuro(a.avg)}`;
    else hint = b ? `Reste ${fmtEuro(Math.max(0, b - sp))}` : "Pas de budget fix\xE9";
    const warn = !c.fixed && b && p >= 80;
    return `<button class="cat-line" type="button" data-action="edit-cat" data-id="${esc(c.id)}">
    <span class="top">
      ${catIcon(c, "sm", 18)}
      <span class="name">${esc(c.name)}</span>
      ${warn ? `<span class="badge ${p >= 100 ? "danger" : "warn"}" style="margin:0">${p} %</span>` : ""}
      <span class="val">${fmtEuro(sp)} <span>/ ${fmtEuro(b)}</span></span>
    </span>
    ${gauge(sp, b || (sp ? sp : 1), c.color)}
    <span class="hint">${esc(hint)}</span>
  </button>`;
  }
  var actions3 = {
    "sugg-keep": (ctx2, el) => {
      dismissSuggestion(el.dataset.id);
      ctx2.toast("Budget conserv\xE9 pour ce mois-ci");
    },
    "sugg-apply": (ctx2, el) => {
      setBudgets({ [el.dataset.id]: Number(el.dataset.amount) });
      ctx2.toast("Budget mis \xE0 jour");
    }
  };

  // budget-app/js/views/analysis.js
  var analysis_exports = {};
  __export(analysis_exports, {
    actions: () => actions4,
    currentPeriod: () => currentPeriod,
    render: () => render4
  });
  function currentPeriod(s, ui2) {
    if (ui2.period) return ui2.period;
    const d = s.settings.periodDefault;
    return d && d !== "derniere" ? d : s.settings.lastPeriod || "mois";
  }
  var AVG_LABEL = { jour: "Moyenne par jour", semaine: "Moyenne par semaine", mois: "Moyenne par mois", annee: "Moyenne par mois" };
  var RANGE_LABEL = { jour: "Sur les 14 derniers jours", semaine: "Sur les 8 derni\xE8res semaines", mois: "Sur les 6 derniers mois", annee: "Depuis le d\xE9but de l\u2019ann\xE9e" };
  var BUDGET_LABEL = { jour: "budget / jour", semaine: "budget / semaine", mois: "budget", annee: "budget mensuel" };
  function render4(s, ui2) {
    const period = currentPeriod(s, ui2);
    const data = seriesFor(s, period);
    const parts = [];
    parts.push(`<header class="page-head"><h1>Analyse</h1>${settingsButton()}</header>`);
    parts.push(segmented(Object.entries(PERIODS), period, "period"));
    const current = data.rows.find((r) => r.current);
    const headline = data.avg != null ? fmtShort(data.avg) : fmtShort(current ? current.total : 0);
    const headLabel = data.avg != null ? AVG_LABEL[period] : period === "jour" ? "Aujourd'hui" : period === "semaine" ? "Cette semaine" : "Ce mois-ci";
    parts.push(`<section class="card" aria-label="\xC9volution des d\xE9penses">
    <div class="card-head" style="align-items:flex-end">
      <div style="display:flex;flex-direction:column;gap:2px"><span class="muted small strong">${esc(headLabel)}</span><span class="big">${headline}</span></div>
      <div class="legend-inline"><span><i class="g-besoins"></i>Besoins</span><span><i class="g-envies"></i>Envies</span></div>
    </div>
    ${data.total ? stackedBars(data.rows, {
      max: data.max * 1.08,
      budget: data.budget,
      budgetLabel: `${BUDGET_LABEL[period]} ${fmtEuro(data.budget)}`,
      ariaLabel: `D\xE9penses par ${PERIODS[period].toLowerCase()}, besoins et envies, compar\xE9es au budget`
    }) : empty("barres", "Pas encore de d\xE9penses sur cette p\xE9riode.")}
    ${data.total ? `<span class="muted small">${period === "annee" ? "Total de l\u2019ann\xE9e" : "Total affich\xE9"} : ${fmtShort(data.total)}. La derni\xE8re barre (p\xE9riode en cours) est plus claire.</span>` : ""}
  </section>`);
    if (data.cats.length) {
      const total = data.cats.reduce((t, c) => t + c.amount, 0);
      parts.push(`<section class="card" aria-label="Par cat\xE9gorie">
      <div class="card-head"><h2>Par cat\xE9gorie</h2><span class="muted small strong">${esc(RANGE_LABEL[period])}</span></div>
      <div class="stack" style="gap:12px">
        ${data.cats.map(({ cat, amount }) => `<div class="stack" style="gap:6px">
          <div style="display:flex;align-items:center;gap:10px">
            ${catIcon(cat, "sm", 16)}
            <span style="flex:1;font-size:14px;font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(cat.name)}</span>
            <span class="strong small">${fmtEuro(amount)}</span>
            <span class="muted small" style="width:38px;text-align:right">${pct(amount, total)} %</span>
          </div>
          ${gauge(amount, data.cats[0].amount, cat.color, { thin: true })}
        </div>`).join("")}
      </div>
    </section>`);
    }
    const sm = smoothing(s);
    parts.push(`<section class="card" aria-label="D\xE9penses annuelles liss\xE9es">
    <div class="card-head">
      <div style="display:flex;flex-direction:column;gap:2px">
        <h2>D\xE9penses annuelles liss\xE9es</h2>
        ${sm.items.length ? `<span class="muted small">${fmtShort(sm.total)} par an, soit <strong style="color:var(--text)">${fmtEuro(sm.monthly)} \xE0 mettre de c\xF4t\xE9 chaque mois</strong></span>` : ""}
      </div>
    </div>
    ${sm.items.length ? `<div class="rows">${sm.items.map((x) => {
      const c = catById(s, x.categoryId);
      return `<button class="row" type="button" data-action="${x.kind === "abo" ? "edit-sub" : "edit-annual"}" data-id="${esc(x.id)}">
        ${catIcon(c, "sm", 16)}
        <span class="main"><span class="t">${esc(x.name)}</span><span class="d">${x.next ? "Prochaine \xE9ch\xE9ance : " + esc(labelDayFull(x.next)) : "Termin\xE9"}${x.kind === "abo" ? " \xB7 abonnement" : ""}</span></span>
        <span style="display:flex;flex-direction:column;align-items:flex-end;gap:2px"><span class="amt">${fmtEuro(x.yearly)}/an</span><span class="muted small">${fmt(Math.round(x.yearly / 12))}/mois</span></span>
      </button>`;
    }).join("")}</div>` : '<p class="muted" style="margin:0;font-size:14px">Assurances, taxes, cadeaux de fin d\u2019ann\xE9e, entretien de la voiture\u2026 Ajoute ces grosses d\xE9penses pour savoir combien mettre de c\xF4t\xE9 chaque mois. Les abonnements annuels et trimestriels apparaissent ici automatiquement.</p>'}
    <button class="btn sm" type="button" data-action="add-annual">${iconSvg("plus", 16)}D\xE9pense annuelle</button>
  </section>`);
    const first = monthKey(s.createdOn);
    const rm = ui2.reviewMonth || addMonths(currentMonth(), -1);
    const canPrev = addMonths(rm, -1) >= first;
    const canNext = addMonths(rm, 1) < currentMonth();
    if (rm >= first) {
      const r = monthReview(s, rm);
      const over = r.lines.filter((l) => l.diff > 0).slice(0, 4);
      const under = r.lines.filter((l) => l.diff < 0).slice(0, 3);
      parts.push(`<section class="card" id="bilan" aria-label="Bilan de ${esc(labelMonth(rm))}">
      <div class="month-nav">
        <button class="icon-btn" type="button" data-action="review-month" data-id="-1" aria-label="Mois pr\xE9c\xE9dent" ${canPrev ? "" : 'disabled style="opacity:.35"'}>${iconSvg("left", 18)}</button>
        <h2 style="font-size:17px">Bilan de ${esc(labelMonthName(rm).toLowerCase())}</h2>
        <button class="icon-btn" type="button" data-action="review-month" data-id="1" aria-label="Mois suivant" ${canNext ? "" : 'disabled style="opacity:.35"'}>${iconSvg("right", 18)}</button>
      </div>
      ${r.spent || r.available ? `
        ${r.available ? `<span class="badge ${r.balance >= 0 ? "info" : "danger"}" style="align-self:center;margin:0">${r.balance >= 0 ? `${fmtEuro(r.balance)} sous le budget` : `${fmtEuro(-r.balance)} au-dessus du budget`}</span>` : ""}
        <div class="tiles">
          <div class="tile"><span class="h">D\xE9pens\xE9</span><span class="v">${fmtEuro(r.spent)}</span></div>
          <div class="tile"><span class="h">Budget</span><span class="v">${fmtEuro(r.available)}</span></div>
          <div class="tile"><span class="h">\xC9pargn\xE9</span><span class="v">${fmtEuro(r.saved + r.goalsAdded)}</span></div>
        </div>
        ${over.length || under.length ? `<div class="stack" style="border-top:1px solid var(--line-soft);padding-top:12px;font-size:13px">
          ${over.map((l) => `<div style="display:flex;justify-content:space-between;gap:8px"><span class="strong" style="font-weight:600">${esc(l.cat.name)}</span><span class="strong" style="color:var(--warn-ink)">+${fmtEuro(l.diff)} au-dessus</span></div>`).join("")}
          ${under.map((l) => `<div style="display:flex;justify-content:space-between;gap:8px"><span class="strong" style="font-weight:600">${esc(l.cat.name)}</span><span class="strong" style="color:var(--ok-ink)">\u2212${fmtEuro(-l.diff)} en dessous</span></div>`).join("")}
        </div>` : ""}
        <div class="btn-row">
          <button class="btn sm" type="button" data-action="export-now">${iconSvg("sauvegarde", 16)}Sauvegarder</button>
          <a class="btn sm primary" href="#/budget">Ajuster ${esc(labelMonthName(currentMonth()).toLowerCase())}</a>
        </div>` : '<p class="muted" style="margin:0;font-size:14px">Aucune donn\xE9e pour ce mois.</p>'}
    </section>`);
    } else {
      parts.push(`<section class="card" id="bilan" aria-label="Bilan mensuel">
      <h2 style="font-size:17px">Bilan mensuel</h2>
      <p class="muted" style="margin:0;font-size:14px">Le premier bilan sera disponible au d\xE9but du mois prochain : total d\xE9pens\xE9, \xE9carts par cat\xE9gorie et ajustements propos\xE9s.</p>
    </section>`);
    }
    return parts.join("");
  }
  var actions4 = {
    period: (ctx2, el) => {
      ctx2.ui.period = el.dataset.id;
      setSetting("lastPeriod", el.dataset.id);
    },
    "review-month": (ctx2, el) => {
      const rm = ctx2.ui.reviewMonth || addMonths(currentMonth(), -1);
      const next = addMonths(rm, Number(el.dataset.id));
      if (next >= currentMonth() || next < monthKey(ctx2.state().createdOn)) return;
      ctx2.ui.reviewMonth = next;
      ctx2.render();
    }
  };

  // budget-app/js/views/settings.js
  var settings_exports = {};
  __export(settings_exports, {
    actions: () => actions5,
    changes: () => changes2,
    render: () => render5
  });

  // budget-app/js/version.js
  var APP_VERSION = "1.00essai5";

  // budget-app/js/views/settings.js
  function render5(s, ui2) {
    const item = (action, icon, title, desc, id = "") => `<button class="settings-item" type="button" data-action="${action}" data-id="${esc(id)}">
    <span class="cat-ico sm" style="background:var(--card-2);color:var(--text)">${iconSvg(icon, 18)}</span>
    <span class="main"><span class="t">${esc(title)}</span>${desc ? `<span class="d">${esc(desc)}</span>` : ""}</span>
    ${iconSvg("right", 18)}
  </button>`;
    const nbReg = s.incomes.filter((i) => i.type === "regulier").length;
    return `<header class="page-head">
      <div class="head-left"><a class="icon-btn" href="#/accueil" aria-label="Retour">${iconSvg("back", 20)}</a><h1>R\xE9glages</h1></div>
    </header>

    <div class="section-title">Apparence</div>
    <section class="card">
      ${segmented([["auto", "Auto"], ["clair", "Clair"], ["sombre", "Sombre"]], s.settings.theme, "theme")}
      <span class="help">\xAB Auto \xBB suit le r\xE9glage du t\xE9l\xE9phone.</span>
    </section>

    <div class="section-title">Budget</div>
    <section class="card" style="padding:4px 16px">
      <div class="settings-list">
        ${item("open-incomes", "pieces", "Revenus", `${fmtShort(regularIncome(s))} r\xE9guliers par mois \xB7 ${nbReg} source${nbReg > 1 ? "s" : ""}`)}
        ${item("go-budget", "camembert", "Cat\xE9gories et budgets", `${s.categories.length} cat\xE9gories`)}
        ${item("open-helper", "baguette", "Aide \xE0 la r\xE9partition", "R\xE8gle 50 / 30 / 20 adapt\xE9e \xE0 tes revenus")}
      </div>
    </section>

    <div class="section-title">Comptes</div>
    <section class="card">
      ${switchRow("multiAccounts", "Plusieurs comptes", "Rattacher chaque d\xE9pense et revenu \xE0 un compte", s.settings.multiAccounts, "toggle-accounts")}
      ${s.settings.multiAccounts ? `<div class="settings-list">
        ${s.accounts.map((a) => item("edit-account", "portefeuille", a.name, "", a.id)).join("")}
      </div>
      <button class="btn sm" type="button" data-action="add-account">${iconSvg("plus", 16)}Ajouter un compte</button>` : ""}
    </section>

    <div class="section-title">Alertes</div>
    <section class="card">
      <span class="help">Seuils appliqu\xE9s aux cat\xE9gories qui n'ont pas de r\xE9glage propre. Les alertes s'affichent \xE0 l'ouverture de l'appli.</span>
      ${switchRow("t50", "\xC0 50 % du budget", "", s.settings.thresholds[50], "threshold-50")}
      ${switchRow("t80", "\xC0 80 % du budget", "", s.settings.thresholds[80], "threshold-80")}
      ${switchRow("t100", "\xC0 100 % du budget", "", s.settings.thresholds[100], "threshold-100")}
      ${switchRow("pace", "Alerte de rythme", "Quand tu d\xE9penses plus vite que le mois n\u2019avance", s.settings.paceAlert, "toggle-pace")}
    </section>

    <div class="section-title">Analyse</div>
    <section class="card">
      <div class="field">
        <label for="f-period">P\xE9riode affich\xE9e \xE0 l'ouverture</label>
        <select class="input" id="f-period" data-change="period-default">
          ${[["derniere", "La derni\xE8re choisie"], ["jour", "Jour"], ["semaine", "Semaine"], ["mois", "Mois"], ["annee", "Ann\xE9e"]].map(([v, l]) => `<option value="${v}" ${s.settings.periodDefault === v ? "selected" : ""}>${l}</option>`).join("")}
        </select>
      </div>
    </section>

    <div class="section-title">Donn\xE9es</div>
    <section class="card">
      <div class="notice ${ui2.persisted ? "ok" : "info"}" role="status">
        <span class="ibox">${iconSvg(ui2.persisted ? "check" : "info", 20)}</span>
        <span class="body"><span class="t">${ui2.persisted ? "Stockage prot\xE9g\xE9" : "Stockage non prot\xE9g\xE9"}</span>
        <span class="d">${ui2.persisted ? "Le navigateur ne supprimera pas tes donn\xE9es de lui-m\xEAme." : "Installe l\u2019appli sur l\u2019\xE9cran d\u2019accueil pour que le navigateur prot\xE8ge tes donn\xE9es."}</span></span>
      </div>
      <p class="help" style="margin:0">Tes donn\xE9es restent sur ce t\xE9l\xE9phone. Une sauvegarde r\xE9guli\xE8re te prot\xE8ge si tu effaces les donn\xE9es du navigateur ou changes de t\xE9l\xE9phone.${s.settings.lastBackup ? ` Derni\xE8re sauvegarde : ${esc(labelDayFull(s.settings.lastBackup))}.` : " Aucune sauvegarde pour l\u2019instant."}</p>
      <div class="btn-row">
        <button class="btn sm" type="button" data-action="export-now">${iconSvg("telecharger", 16)}Exporter</button>
        <label class="btn sm" style="cursor:pointer">${iconSvg("importer", 16)}Importer<input type="file" accept="application/json,.json" data-change="import-file" class="sr-only"></label>
      </div>
      <button class="btn sm danger" type="button" data-action="reset-all">${iconSvg("poubelle", 16)}Tout effacer</button>
    </section>

    <div class="brand-foot">
      <span class="wordmark">Yard<span>get</span></span>
      <span class="help">Ton budget, tes yards. \xB7 version ${esc(APP_VERSION)}</span>
    </div>`;
  }
  var actions5 = {
    theme: (ctx2, el) => setSetting("theme", el.dataset.id),
    "go-budget": (ctx2) => ctx2.go("budget"),
    "export-now": (ctx2) => {
      exportData();
      ctx2.toast("Sauvegarde t\xE9l\xE9charg\xE9e");
    },
    "reset-all": (ctx2) => ctx2.confirm({
      title: "Tout effacer ?",
      text: "D\xE9penses, abonnements, revenus, objectifs et r\xE9glages seront supprim\xE9s de ce t\xE9l\xE9phone. Pense \xE0 exporter une sauvegarde avant.",
      ok: "Tout effacer",
      danger: true,
      onOk: () => {
        resetAll();
        ctx2.go("accueil");
        ctx2.toast("Donn\xE9es effac\xE9es");
      }
    })
  };
  var changes2 = {
    "toggle-accounts": (ctx2, el) => setSetting("multiAccounts", el.checked),
    "threshold-50": (ctx2, el) => setThreshold(50, el.checked),
    "threshold-80": (ctx2, el) => setThreshold(80, el.checked),
    "threshold-100": (ctx2, el) => setThreshold(100, el.checked),
    "toggle-pace": (ctx2, el) => setSetting("paceAlert", el.checked),
    "period-default": (ctx2, el) => {
      setSetting("periodDefault", el.value);
      ctx2.ui.period = null;
    },
    "import-file": async (ctx2, el) => {
      const file = el.files && el.files[0];
      el.value = "";
      if (!file) return;
      try {
        const data = parseBackup(await file.text());
        ctx2.confirm({
          title: "Remplacer les donn\xE9es ?",
          text: `Les donn\xE9es actuelles seront remplac\xE9es par celles du fichier \xAB ${file.name} \xBB (${data.expenses.length} d\xE9penses).`,
          ok: "Remplacer",
          danger: true,
          onOk: () => {
            replaceAll(data);
            ctx2.toast("Sauvegarde import\xE9e");
          }
        });
      } catch (e) {
        ctx2.toast(e.message);
      }
    }
  };

  // budget-app/js/sheets.js
  var APP_LOGO = '<svg viewBox="0 0 100 100" width="72" height="72"><rect width="100" height="100" fill="#171A26"/><g fill="none" stroke-width="13" transform="rotate(-90 50 50)"><circle cx="50" cy="50" r="26" stroke="#60A5FA" stroke-dasharray="66 163.4"/><circle cx="50" cy="50" r="26" stroke="#4ADE80" stroke-dasharray="33 163.4" stroke-dashoffset="-70"/><circle cx="50" cy="50" r="26" stroke="#FB923C" stroke-dasharray="26 163.4" stroke-dashoffset="-107"/><circle cx="50" cy="50" r="26" stroke="#2DD4BF" stroke-dasharray="22 163.4" stroke-dashoffset="-137"/></g></svg>';
  function renderSheet(s, sh, ui2) {
    const fn = RENDER[sh.type];
    return fn ? fn(s, sh, ui2) : { html: "" };
  }
  var RENDER = {
    expense: renderExpense,
    sub: renderSub,
    income: renderIncome,
    incomes: renderIncomes,
    cat: renderCat,
    goal: renderGoal,
    "goal-edit": renderGoalEdit,
    annual: renderAnnual,
    helper: renderHelper,
    onboarding: renderOnboarding,
    account: renderAccount,
    confirm: renderConfirm
  };
  function accountChoices(s) {
    return s.accounts.map((a) => [a.id, a.name]);
  }
  function renderExpense(s, sh) {
    const cats = s.categories;
    const sel = sh.cat;
    const cat = catById(s, sel);
    const amountTxt = sh.amount || "";
    const display = (amountTxt || "0") + " \u20AC";
    const editing = !!sh.id;
    const acc = s.accounts.find((a) => a.id === sh.accountId) || s.accounts[0];
    const dateLabel = sh.date === todayISO() ? "Aujourd'hui" : relativeDay(sh.date);
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"];
    return {
      full: true,
      html: `${sheetHead(editing ? "Modifier la d\xE9pense" : "Nouvelle d\xE9pense")}
    <form class="sheet-body" data-form="expense" novalidate>
      <div class="amount-display" aria-live="polite">
        <span class="v${amountTxt ? "" : " placeholder"}">${esc(display)}</span>
        ${cat ? `<span class="badge cat cv" style="${colorVars(cat.color)};font-size:13px;padding:4px 12px;margin:0;align-self:center">${esc(cat.name)}</span>` : ""}
      </div>
      <div class="meta-chips">
        <span class="meta-chip">${iconSvg("calendrier", 16)}${esc(dateLabel)}
          <input type="date" name="date" value="${esc(sh.date)}" max="${todayISO().slice(0, 4) + 1}-12-31" data-bind="date" data-rerender="1" aria-label="Date de la d\xE9pense"></span>
        <button class="meta-chip" type="button" data-action="toggle-note" aria-expanded="${!!sh.showNote}">${iconSvg("crayon", 16)}Note${sh.note ? " \xB7 " + esc(sh.note.slice(0, 14)) + (sh.note.length > 14 ? "\u2026" : "") : ""}</button>
        ${s.settings.multiAccounts ? `<span class="meta-chip">${iconSvg("portefeuille", 16)}${esc(acc.name)}
          <select name="accountId" data-bind="accountId" data-rerender="1" aria-label="Compte">${s.accounts.map((a) => `<option value="${esc(a.id)}" ${a.id === acc.id ? "selected" : ""}>${esc(a.name)}</option>`).join("")}</select></span>` : ""}
      </div>
      ${sh.showNote ? `<input class="input" name="note" value="${esc(sh.note || "")}" maxlength="60" placeholder="Ex. boulangerie, cin\xE9ma\u2026" data-bind="note" autocomplete="off" aria-label="Note">` : ""}
      <fieldset>
        <legend style="margin-bottom:8px">Cat\xE9gorie</legend>
        <div class="cat-grid">
          ${cats.map((c) => `<button type="button" class="cat-pick cv" style="${colorVars(c.color)}" data-action="pick-cat" data-id="${esc(c.id)}" aria-pressed="${c.id === sel}">
            <span class="cat-ico">${iconSvg(c.icon, 20)}</span><span class="n">${esc(shortName(c.name))}</span>
          </button>`).join("")}
        </div>
      </fieldset>
      <div class="keypad" style="margin-top:auto">
        ${keys.map((k) => `<button type="button" data-action="key" data-id="${k}" aria-label="${k === "del" ? "Effacer" : k === "," ? "Virgule" : k}">${k === "del" ? "\u232B" : k}</button>`).join("")}
      </div>
      <div class="${editing ? "btn-row" : ""}">
        ${editing ? `<button class="btn danger" type="button" data-action="delete-expense">${iconSvg("poubelle", 18)}Supprimer</button>` : ""}
        <button class="btn primary${editing ? "" : " block"}" type="submit" ${parseAmount(amountTxt) ? "" : "disabled"}>${editing ? "Enregistrer" : "Ajouter " + esc(display)}</button>
      </div>
      ${sh.subscriptionId ? '<p class="help" style="margin:0;text-align:center">Pr\xE9l\xE8vement enregistr\xE9 automatiquement depuis un abonnement.</p>' : ""}
    </form>`
    };
  }
  function shortName(name) {
    const map = { "Restaurants et caf\xE9s": "Restos", "Loisirs et sorties": "Loisirs" };
    return map[name] || name;
  }
  function renderSub(s, sh) {
    const x = sh.draft;
    const editing = !!sh.id;
    const preview = parseAmount(x.amount);
    return {
      html: `${sheetHead(editing ? "Modifier l'abonnement" : "Nouvel abonnement")}
    <form class="sheet-body" data-form="sub">
      ${textField("name", "Nom", x.name, { required: true, placeholder: "Ex. forfait mobile" })}
      <div class="field-row">
        ${amountField("amount", "Montant", parseAmount(x.amount))}
        ${selectField("frequency", "Fr\xE9quence", Object.entries(FREQUENCIES).map(([k, f]) => [k, f.name]), x.frequency)}
      </div>
      ${categorySelect(s, "categoryId", "Cat\xE9gorie", x.categoryId)}
      ${dateField("startDate", editing ? "Date de r\xE9f\xE9rence du pr\xE9l\xE8vement" : "Date du prochain pr\xE9l\xE8vement", x.startDate)}
      ${dateField("endDate", "Date de fin (laisser vide si sans fin)", x.endDate, { required: false })}
      <div class="field-row">
        ${selectField("status", "Statut", [["actif", "Actif"], ["envisage", "Envisag\xE9"]], x.status)}
        ${selectField("reminderDays", "Rappel", [["1", "1 jour avant"], ["3", "3 jours avant"], ["7", "7 jours avant"]], x.reminderDays)}
      </div>
      ${s.settings.multiAccounts ? selectField("accountId", "Compte", accountChoices(s), x.accountId) : ""}
      <p class="help" style="margin:0">${x.status === "envisage" ? "Un abonnement envisag\xE9 n\u2019est pas pr\xE9lev\xE9 : il sert \xE0 voir son effet sur ton budget avant de le prendre." : "Chaque pr\xE9l\xE8vement est ajout\xE9 automatiquement \xE0 tes d\xE9penses le jour venu."}${preview && FREQUENCIES[x.frequency] ? ` Co\xFBt : ${fmt(monthlyEquivalent({ amount: preview, frequency: x.frequency }))} par mois, ${fmt(yearlyCost({ amount: preview, frequency: x.frequency }))} par an.` : ""}</p>
      <div class="${editing ? "btn-row" : ""}">
        ${editing ? `<button class="btn danger" type="button" data-action="delete-sub">${iconSvg("poubelle", 18)}Supprimer</button>` : ""}
        <button class="btn primary${editing ? "" : " block"}" type="submit">Enregistrer</button>
      </div>
    </form>`
    };
  }
  function renderIncome(s, sh) {
    const x = sh.draft;
    const editing = !!sh.id;
    const oneoff = x.type === "ponctuel";
    const destinations = [["reste", "Augmenter le reste \xE0 d\xE9penser"], ...s.goals.map((g) => ["goal:" + g.id, "Objectif : " + g.name])];
    return {
      html: `${sheetHead(editing ? "Modifier le revenu" : "Nouveau revenu")}
    <form class="sheet-body" data-form="income">
      <fieldset>
        <legend style="margin-bottom:8px">Type</legend>
        <div class="segmented" style="grid-template-columns:repeat(2,minmax(0,1fr))">
          <button type="button" aria-pressed="${!oneoff}" data-action="income-type" data-id="regulier">R\xE9gulier</button>
          <button type="button" aria-pressed="${oneoff}" data-action="income-type" data-id="ponctuel">Ponctuel</button>
        </div>
      </fieldset>
      <p class="help" style="margin:0">${oneoff ? "Compt\xE9 uniquement dans le mois o\xF9 il arrive (prime, cadeau, remboursement\u2026)." : "Repris chaque mois (salaire, allocation\u2026). C\u2019est la base de ton budget."}</p>
      ${textField("name", "Nom", x.name, { required: true, placeholder: oneoff ? "Ex. remboursement" : "Ex. salaire" })}
      ${amountField("amount", oneoff ? "Montant" : "Montant par mois", parseAmount(x.amount))}
      ${oneoff ? dateField("date", "Date", x.date) : ""}
      ${oneoff && !editing ? selectField("destination", "Utilisation", destinations, x.destination) : ""}
      ${s.settings.multiAccounts ? selectField("accountId", "Compte", accountChoices(s), x.accountId) : ""}
      <div class="${editing ? "btn-row" : ""}">
        ${editing ? `<button class="btn danger" type="button" data-action="delete-income">${iconSvg("poubelle", 18)}Supprimer</button>` : ""}
        <button class="btn primary${editing ? "" : " block"}" type="submit">Enregistrer</button>
      </div>
    </form>`
    };
  }
  function renderIncomes(s) {
    const regular = s.incomes.filter((i) => i.type === "regulier");
    const oneoff = s.incomes.filter((i) => i.type === "ponctuel").sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
    const row = (i) => `<button class="row" type="button" data-action="edit-income" data-id="${esc(i.id)}">
    <span class="cat-ico" style="background:var(--ok-bg);color:var(--ok-ink)">${iconSvg("pieces", 20)}</span>
    <span class="main"><span class="t">${esc(i.name)}</span><span class="d">${i.type === "regulier" ? "Chaque mois" : esc(labelDayFull(i.date)) + (i.destination === "objectif" ? " \xB7 vers un objectif" : "")}</span></span>
    <span class="amt pos">+${fmt(i.amount)}</span>
  </button>`;
    return {
      html: `${sheetHead("Revenus")}
    <div class="sheet-body">
      <div class="group-head"><h2>R\xE9guliers</h2><span class="muted small strong">${fmtShort(regularIncome(s))} / mois</span></div>
      ${regular.length ? `<div class="list-card rows">${regular.map(row).join("")}</div>` : '<p class="muted small" style="margin:0 4px">Aucun revenu r\xE9gulier.</p>'}
      <button class="btn sm" type="button" data-action="add-income" data-id="regulier">${iconSvg("plus", 16)}Revenu r\xE9gulier</button>
      <div class="group-head"><h2>Ponctuels r\xE9cents</h2></div>
      ${oneoff.length ? `<div class="list-card rows">${oneoff.map(row).join("")}</div>` : '<p class="muted small" style="margin:0 4px">Aucun revenu ponctuel.</p>'}
      <button class="btn sm" type="button" data-action="add-income" data-id="ponctuel">${iconSvg("plus", 16)}Revenu ponctuel</button>
    </div>`
    };
  }
  function renderCat(s, sh) {
    const x = sh.draft;
    const editing = !!sh.id;
    const others = s.categories.filter((c) => c.id !== sh.id);
    const custom = Array.isArray(x.thresholds);
    const a = editing ? categoryAverage(s, sh.id) : null;
    const sum = monthSummary(s);
    return {
      html: `${sheetHead(editing ? "Modifier la cat\xE9gorie" : "Nouvelle cat\xE9gorie")}
    <form class="sheet-body" data-form="cat">
      <div style="display:flex;align-items:center;gap:12px">
        ${catIcon({ color: x.color, icon: x.icon }, "lg", 24)}
        <div style="flex:1">${textField("name", "Nom", x.name, { required: true, maxlength: 40 })}</div>
      </div>
      ${selectField("groupId", "Groupe", s.groups.map((g) => [g.id, g.name]), x.groupId)}
      ${amountField("budget", "Budget mensuel", parseAmount(x.budget) ?? 0, { required: false, help: a ? `Moyenne sur ${a.months} mois : ${fmtEuro(a.avg)}` : editing ? `D\xE9pens\xE9 ce mois-ci : ${fmtEuro(sum.spentMap[sh.id] || 0)}` : "" })}
      <fieldset>
        <legend style="margin-bottom:8px">Couleur</legend>
        <div class="swatches">${Object.entries(COLORS).map(([k, c]) => `<button type="button" class="swatch cv" style="${colorVars(k)}" data-action="cat-color" data-id="${k}" aria-pressed="${k === x.color}" aria-label="${esc(c.name)}"></button>`).join("")}</div>
      </fieldset>
      <fieldset>
        <legend style="margin-bottom:8px">Ic\xF4ne</legend>
        <div class="icon-grid cv" style="${colorVars(x.color)}">${Object.keys(ICONS).map((k) => `<button type="button" class="icon-choice" data-action="cat-icon" data-id="${k}" aria-pressed="${k === x.icon}" aria-label="Ic\xF4ne ${esc(k)}">${iconSvg(k, 20)}</button>`).join("")}</div>
      </fieldset>
      ${switchRow("fixed", "D\xE9pense fixe", "Montant pay\xE9 en une fois (loyer, forfait) : pas d\u2019alerte de rythme ni de suggestion", x.fixed)}
      ${switchRow("customThresholds", "Seuils d\u2019alerte propres", "Sinon, les seuils g\xE9n\xE9raux des r\xE9glages s\u2019appliquent", custom, "resheet")}
      ${custom ? `<div style="display:flex;gap:8px;flex-wrap:wrap">${[50, 80, 100].map((t) => `<label class="chip" style="cursor:pointer"><input type="checkbox" name="th${t}" ${x.thresholds.includes(t) ? "checked" : ""}> ${t} %</label>`).join("")}</div>` : ""}
      <button class="btn primary block" type="submit">Enregistrer</button>
      ${editing && others.length ? `<div class="card" style="background:var(--card-2)">
        <span class="strong" style="font-size:14px">Supprimer ou fusionner</span>
        <span class="help">Les d\xE9penses, abonnements et le budget de \xAB ${esc(x.name)} \xBB seront d\xE9plac\xE9s vers la cat\xE9gorie choisie.</span>
        <select class="input" name="mergeTo" aria-label="Cat\xE9gorie de destination">${others.map((c) => `<option value="${esc(c.id)}" ${c.id === "divers" ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select>
        <button class="btn sm danger" type="button" data-action="merge-cat">${iconSvg("poubelle", 16)}Supprimer et d\xE9placer</button>
      </div>` : ""}
    </form>`
    };
  }
  function renderGoal(s, sh) {
    const g = s.goals.find((x) => x.id === sh.id);
    if (!g) return { html: "" };
    const saved = goalSaved(g);
    const monthly = goalMonthly(g);
    const history3 = [...g.contributions].sort((a, b) => b.date.localeCompare(a.date));
    return {
      html: `${sheetHead(g.name)}
    <div class="sheet-body">
      <div style="display:flex;align-items:center;gap:12px">
        ${catIcon({ color: g.color, icon: g.icon }, "lg", 24)}
        <div style="flex:1;display:flex;flex-direction:column;gap:2px">
          <span class="big">${fmtShort(saved)}</span>
          <span class="muted small">sur ${fmtShort(g.target)}${g.deadline ? " \xB7 \xE9ch\xE9ance " + esc(labelDayFull(g.deadline)) : ""}</span>
        </div>
      </div>
      ${gauge(saved, g.target, g.color)}
      <span class="muted small">${saved >= g.target ? "Objectif atteint !" : monthly ? `Environ ${fmtEuro(monthly)} par mois pour l\u2019atteindre \xE0 temps.` : `Encore ${fmtShort(g.target - saved)}.`}</span>
      <form class="card" data-form="contribution" style="background:var(--card-2)">
        <span class="strong" style="font-size:14px">Mettre de l\u2019argent de c\xF4t\xE9</span>
        <div class="field-row">
          ${amountField("amount", "Montant", null)}
          ${dateField("date", "Date", todayISO())}
        </div>
        <button class="btn primary" type="submit">${iconSvg("plus", 18)}Ajouter</button>
      </form>
      ${history3.length ? `<div class="group-head"><h2>Historique</h2></div>
      <div class="list-card rows">${history3.map((c) => `<div class="row">
        <span class="main"><span class="t">${esc(labelDayFull(c.date))}</span>${c.incomeId ? '<span class="d">Revenu ponctuel</span>' : ""}</span>
        <span class="amt pos">+${fmt(c.amount)}</span>
        <button class="icon-btn" type="button" data-action="delete-contribution" data-id="${esc(c.id)}" aria-label="Supprimer ce versement">${iconSvg("poubelle", 18)}</button>
      </div>`).join("")}</div>` : ""}
      <div class="btn-row">
        <button class="btn danger" type="button" data-action="delete-goal">${iconSvg("poubelle", 18)}Supprimer</button>
        <button class="btn" type="button" data-action="edit-goal">${iconSvg("crayon", 18)}Modifier</button>
      </div>
    </div>`
    };
  }
  function renderGoalEdit(s, sh) {
    const x = sh.draft;
    return {
      html: `${sheetHead(sh.id ? "Modifier l'objectif" : "Nouvel objectif")}
    <form class="sheet-body" data-form="goal">
      <div style="display:flex;align-items:center;gap:12px">
        ${catIcon({ color: x.color, icon: x.icon }, "lg", 24)}
        <div style="flex:1">${textField("name", "Nom", x.name, { required: true, placeholder: "Ex. voyage d\u2019\xE9t\xE9", maxlength: 40 })}</div>
      </div>
      <div class="field-row">
        ${amountField("target", "Montant cible", parseAmount(x.target))}
        ${dateField("deadline", "\xC9ch\xE9ance (facultatif)", x.deadline, { required: false })}
      </div>
      <fieldset>
        <legend style="margin-bottom:8px">Couleur</legend>
        <div class="swatches">${Object.entries(COLORS).map(([k, c]) => `<button type="button" class="swatch cv" style="${colorVars(k)}" data-action="cat-color" data-id="${k}" aria-pressed="${k === x.color}" aria-label="${esc(c.name)}"></button>`).join("")}</div>
      </fieldset>
      <fieldset>
        <legend style="margin-bottom:8px">Ic\xF4ne</legend>
        <div class="icon-grid cv" style="${colorVars(x.color)}">${Object.keys(ICONS).map((k) => `<button type="button" class="icon-choice" data-action="cat-icon" data-id="${k}" aria-pressed="${k === x.icon}" aria-label="Ic\xF4ne ${esc(k)}">${iconSvg(k, 20)}</button>`).join("")}</div>
      </fieldset>
      <button class="btn primary block" type="submit">Enregistrer</button>
    </form>`
    };
  }
  function renderAnnual(s, sh) {
    const x = sh.draft;
    const editing = !!sh.id;
    return {
      html: `${sheetHead(editing ? "Modifier la d\xE9pense annuelle" : "D\xE9pense annuelle")}
    <form class="sheet-body" data-form="annual">
      <p class="help" style="margin:0">Une grosse d\xE9pense qui revient une fois par an. L'appli calcule combien mettre de c\xF4t\xE9 chaque mois. Elle n'est pas ajout\xE9e automatiquement \xE0 tes d\xE9penses : saisis-la le jour o\xF9 tu la paies.</p>
      ${textField("name", "Nom", x.name, { required: true, placeholder: "Ex. assurance voiture" })}
      <div class="field-row">
        ${amountField("amount", "Montant par an", parseAmount(x.amount))}
        ${dateField("dueDate", "Prochaine \xE9ch\xE9ance", x.dueDate)}
      </div>
      ${categorySelect(s, "categoryId", "Cat\xE9gorie", x.categoryId)}
      <div class="${editing ? "btn-row" : ""}">
        ${editing ? `<button class="btn danger" type="button" data-action="delete-annual">${iconSvg("poubelle", 18)}Supprimer</button>` : ""}
        <button class="btn primary${editing ? "" : " block"}" type="submit">Enregistrer</button>
      </div>
    </form>`
    };
  }
  function renderHelper(s, sh) {
    const income = parseAmount(sh.income) ?? regularIncome(s);
    const split = income ? recommendedSplit(s, income) : {};
    const hasRegular = regularIncome(s) > 0;
    return {
      html: `${sheetHead("Aide \xE0 la r\xE9partition")}
    <form class="sheet-body" data-form="helper">
      <p class="help" style="margin:0">La r\xE8gle 50 / 30 / 20 r\xE9partit les revenus en <strong>besoins</strong> (50 %), <strong>envies</strong> (30 %) et <strong>\xE9pargne</strong> (20 %). L'appli la d\xE9coupe par cat\xE9gorie, puis tu ajustes chaque montant. Les d\xE9penses fixes (loyer, forfait) gardent leur montant actuel.</p>
      <div class="field">
        <label for="f-income">Revenus r\xE9guliers par mois</label>
        <div class="input-euro"><input class="input" id="f-income" name="income" inputmode="decimal" value="${esc(sh.income ?? amountToInput(regularIncome(s)) ?? "")}" placeholder="0,00" data-bind="income" data-rerender="1"></div>
        ${!hasRegular ? '<span class="help">Ce montant sera enregistr\xE9 comme revenu r\xE9gulier.</span>' : ""}
      </div>
      ${income ? s.groups.map((g) => {
        const cats = s.categories.filter((c) => c.groupId === g.id);
        const total = cats.reduce((t, c) => t + (split[c.id] || 0), 0);
        return `<section class="stack" style="gap:6px">
          <div class="group-head"><h2><span class="gdot g-${g.id}"></span>${esc(g.name)} \xB7 ${g.target} %</h2><span class="strong small">${fmtEuro(total)}</span></div>
          <div class="list-card rows">${cats.map((c) => {
          const a = categoryAverage(s, c.id);
          return `<div class="row" style="min-height:52px">
              ${catIcon(c, "sm", 16)}
              <span class="main"><span class="t">${esc(c.name)}</span><span class="d">Actuel ${fmtEuro(c.budget || 0)}${a ? ` \xB7 moyenne ${fmtEuro(a.avg)}` : ""}</span></span>
              <span class="amt">${fmtEuro(split[c.id] || 0)}</span>
            </div>`;
        }).join("")}</div>
        </section>`;
      }).join("") : empty("baguette", "Indique tes revenus pour voir la r\xE9partition conseill\xE9e.")}
      <p class="help" style="margin:0">Le loyer p\xE8se souvent plus que pr\xE9vu : si tes besoins d\xE9passent 50 %, r\xE9duis plut\xF4t les envies que l'\xE9pargne.</p>
      <button class="btn primary block" type="submit" ${income ? "" : "disabled"}>Appliquer cette r\xE9partition</button>
    </form>`
    };
  }
  function renderOnboarding() {
    return {
      full: true,
      html: `<div class="sheet-body" style="justify-content:center;gap:18px;padding-top:calc(30px + env(safe-area-inset-top))">
      <span class="app-logo" aria-hidden="true">${APP_LOGO}</span>
      <h2 style="font-size:26px;font-weight:800;text-align:center">Bienvenue dans <span class="wordmark" style="font-size:inherit">Yard<span>get</span></span></h2>
      <p class="strong muted" style="text-align:center;margin:-10px 0 0">Ton budget, tes yards.</p>
      <p class="muted" style="text-align:center;margin:0">Note tes d\xE9penses en quelques secondes, suis tes abonnements et garde un \u0153il sur ce qu'il te reste jusqu'\xE0 la fin du mois.</p>
      <form class="card" data-form="onboarding">
        ${amountField("income", "Tes revenus r\xE9guliers par mois", null, { required: false, help: "Salaire, allocation\u2026 Tu pourras en ajouter d\u2019autres plus tard." })}
        <label class="switch-row"><span class="txt"><span class="t">Proposer un budget 50 / 30 / 20</span><span class="help">Modifiable \xE0 tout moment</span></span><span class="switch"><input type="checkbox" name="split" checked><span></span></span></label>
        <button class="btn primary block" type="submit">Commencer</button>
      </form>
      <div class="notice info"><span class="ibox">${iconSvg("info", 20)}</span><span class="body"><span class="t">Tes donn\xE9es restent sur ce t\xE9l\xE9phone</span><span class="d">Pas de compte, pas de connexion bancaire. Pense \xE0 exporter une sauvegarde de temps en temps.</span></span></div>
      <button class="link-btn" type="button" data-action="skip-onboarding" style="align-self:center">Passer pour l'instant</button>
    </div>`
    };
  }
  function renderAccount(s, sh) {
    const a = s.accounts.find((x) => x.id === sh.id);
    return {
      html: `${sheetHead(a ? "Modifier le compte" : "Nouveau compte")}
    <form class="sheet-body" data-form="account">
      ${textField("name", "Nom du compte", a ? a.name : "", { required: true, placeholder: "Ex. compte \xE9pargne", maxlength: 40 })}
      <div class="${a && s.accounts.length > 1 ? "btn-row" : ""}">
        ${a && s.accounts.length > 1 ? `<button class="btn danger" type="button" data-action="delete-account">${iconSvg("poubelle", 18)}Supprimer</button>` : ""}
        <button class="btn primary${a && s.accounts.length > 1 ? "" : " block"}" type="submit">Enregistrer</button>
      </div>
      ${a && s.accounts.length > 1 ? '<p class="help" style="margin:0">Les op\xE9rations de ce compte seront rattach\xE9es au premier compte de la liste.</p>' : ""}
    </form>`
    };
  }
  function renderConfirm(s, sh) {
    return {
      html: `<div class="sheet-body" style="padding-top:22px">
      <h2 style="font-size:19px;font-weight:800">${esc(sh.title)}</h2>
      <p class="muted" style="margin:0">${esc(sh.text)}</p>
      <div class="btn-row">
        <button class="btn" type="button" data-action="confirm-cancel">${esc(sh.cancel || "Annuler")}</button>
        <button class="btn primary${sh.danger ? " danger" : ""}" type="button" data-action="confirm-ok" ${sh.danger ? 'style="background:var(--danger-ink);border-color:var(--danger-ink);color:#fff"' : ""}>${esc(sh.ok || "Confirmer")}</button>
      </div>
      ${sh.alt ? `<button class="btn sm" type="button" data-action="confirm-alt">${esc(sh.alt)}</button>` : ""}
    </div>`
    };
  }
  var open = {
    expense(ctx2, id) {
      const s = ctx2.state();
      const e = id ? s.expenses.find((x) => x.id === id) : null;
      const defaultCat = ctx2.ui.lastCat && catById(s, ctx2.ui.lastCat) ? ctx2.ui.lastCat : catById(s, "courses") ? "courses" : s.categories[0]?.id;
      ctx2.openSheet(e ? {
        type: "expense",
        id: e.id,
        amount: amountToInput(e.amount),
        cat: e.categoryId,
        date: e.date,
        note: e.note || "",
        showNote: !!e.note,
        accountId: e.accountId || s.accounts[0].id,
        subscriptionId: e.subscriptionId
      } : {
        type: "expense",
        amount: "",
        cat: defaultCat,
        date: todayISO(),
        note: "",
        showNote: false,
        accountId: s.accounts[0].id
      });
    },
    sub(ctx2, id) {
      const s = ctx2.state();
      const x = id ? s.subscriptions.find((v) => v.id === id) : null;
      ctx2.openSheet({
        type: "sub",
        id: x ? x.id : null,
        draft: x ? { ...x, amount: amountToInput(x.amount), endDate: x.endDate || "", reminderDays: String(x.reminderDays ?? 3) } : { name: "", amount: "", frequency: "mensuel", categoryId: catById(s, "telecom") ? "telecom" : s.categories[0].id, startDate: todayISO(), endDate: "", status: "actif", reminderDays: "3", accountId: s.accounts[0].id }
      });
    },
    income(ctx2, id, type = "regulier") {
      const s = ctx2.state();
      const x = id ? s.incomes.find((v) => v.id === id) : null;
      ctx2.openSheet({
        type: "income",
        id: x ? x.id : null,
        draft: x ? { ...x, amount: amountToInput(x.amount) } : { type, name: "", amount: "", date: todayISO(), destination: "reste", accountId: s.accounts[0].id }
      });
    },
    cat(ctx2, id) {
      const s = ctx2.state();
      const c = id ? catById(s, id) : null;
      ctx2.openSheet({
        type: "cat",
        id: c ? c.id : null,
        draft: c ? { ...c, budget: amountToInput(c.budget || 0), thresholds: Array.isArray(c.thresholds) ? [...c.thresholds] : null } : { name: "", groupId: "envies", color: "turquoise", icon: "points", budget: "", fixed: false, thresholds: null }
      });
    },
    goalEdit(ctx2, id) {
      const s = ctx2.state();
      const g = id ? s.goals.find((v) => v.id === id) : null;
      ctx2.openSheet({
        type: "goal-edit",
        id: g ? g.id : null,
        draft: g ? { ...g, target: amountToInput(g.target), deadline: g.deadline || "" } : { name: "", target: "", deadline: "", color: "indigo", icon: "cible" }
      });
    },
    annual(ctx2, id) {
      const s = ctx2.state();
      const a = id ? s.annuals.find((v) => v.id === id) : null;
      ctx2.openSheet({
        type: "annual",
        id: a ? a.id : null,
        draft: a ? { ...a, amount: amountToInput(a.amount) } : { name: "", amount: "", dueDate: todayISO(), categoryId: catById(s, "divers") ? "divers" : s.categories[0].id }
      });
    }
  };
  function captureDraft(ctx2) {
    const sh = ctx2.ui.sheet;
    const form = document.querySelector("#sheet form[data-form]");
    if (!sh || !sh.draft || !form) return;
    const fd = new FormData(form);
    for (const [k, v] of fd.entries()) {
      if (k.startsWith("th") || k === "mergeTo") continue;
      sh.draft[k] = v;
    }
    form.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      if (cb.name === "customThresholds") {
        if (cb.checked && !Array.isArray(sh.draft.thresholds)) sh.draft.thresholds = categoryDefaultThresholds(ctx2);
        if (!cb.checked) sh.draft.thresholds = null;
      } else if (cb.name.startsWith("th")) {
      } else {
        sh.draft[cb.name] = cb.checked;
      }
    });
    if (Array.isArray(sh.draft.thresholds) && form.querySelector('input[name^="th"]')) {
      sh.draft.thresholds = [50, 80, 100].filter((t) => form.querySelector(`input[name="th${t}"]`)?.checked);
    }
  }
  function categoryDefaultThresholds(ctx2) {
    const t = ctx2.state().settings.thresholds;
    return [50, 80, 100].filter((x) => t[x]);
  }
  var actions6 = {
    "close-sheet": (ctx2) => ctx2.closeSheet(),
    key: (ctx2, el) => {
      const sh = ctx2.ui.sheet;
      let a = sh.amount || "";
      const k = el.dataset.id;
      if (k === "del") a = a.slice(0, -1);
      else if (k === ",") {
        if (!a.includes(",")) a = (a || "0") + ",";
      } else {
        const [, dec] = a.split(",");
        if (dec != null && dec.length >= 2) return;
        if (a.replace(",", "").length >= 7) return;
        a = (a === "0" ? "" : a) + k;
      }
      sh.amount = a;
      ctx2.renderSheet();
    },
    "pick-cat": (ctx2, el) => {
      ctx2.ui.sheet.cat = el.dataset.id;
      ctx2.renderSheet();
    },
    "toggle-note": (ctx2) => {
      ctx2.ui.sheet.showNote = !ctx2.ui.sheet.showNote;
      ctx2.renderSheet();
      if (ctx2.ui.sheet.showNote) document.querySelector('#sheet input[name="note"]')?.focus();
    },
    "delete-expense": (ctx2) => {
      const s = ctx2.state();
      const sh = ctx2.ui.sheet;
      const e = s.expenses.find((x) => x.id === sh.id);
      if (!e) return ctx2.closeSheet();
      deleteExpense(e.id);
      ctx2.closeSheet();
      ctx2.toast("D\xE9pense supprim\xE9e", () => saveExpense({ ...e, id: void 0 }));
    },
    "delete-sub": (ctx2) => {
      const id = ctx2.ui.sheet.id;
      const s = ctx2.state();
      const count = s.expenses.filter((e) => e.subscriptionId === id).length;
      ctx2.confirm({
        title: "Supprimer l'abonnement ?",
        text: count ? `Ses ${count} pr\xE9l\xE8vement${count > 1 ? "s" : ""} d\xE9j\xE0 enregistr\xE9${count > 1 ? "s" : ""} resteront dans l'historique.` : "Il ne sera plus suivi ni pr\xE9lev\xE9.",
        ok: "Supprimer",
        danger: true,
        alt: count ? "Supprimer aussi les pr\xE9l\xE8vements pass\xE9s" : "",
        onOk: () => {
          deleteSubscription(id, true);
          ctx2.toast("Abonnement supprim\xE9");
        },
        onAlt: () => {
          deleteSubscription(id, false);
          ctx2.toast("Abonnement et pr\xE9l\xE8vements supprim\xE9s");
        }
      });
    },
    "income-type": (ctx2, el) => {
      captureDraft(ctx2);
      ctx2.ui.sheet.draft.type = el.dataset.id;
      ctx2.renderSheet();
    },
    "delete-income": (ctx2) => {
      deleteIncome(ctx2.ui.sheet.id);
      ctx2.closeSheet();
      ctx2.toast("Revenu supprim\xE9");
    },
    "cat-color": (ctx2, el) => {
      captureDraft(ctx2);
      ctx2.ui.sheet.draft.color = el.dataset.id;
      ctx2.renderSheet();
    },
    "cat-icon": (ctx2, el) => {
      captureDraft(ctx2);
      ctx2.ui.sheet.draft.icon = el.dataset.id;
      ctx2.renderSheet();
    },
    "merge-cat": (ctx2) => {
      const form = document.querySelector("#sheet form");
      const to = form.querySelector('select[name="mergeTo"]').value;
      const s = ctx2.state();
      const from = catById(s, ctx2.ui.sheet.id);
      const target = catById(s, to);
      ctx2.confirm({
        title: `Supprimer \xAB ${from.name} \xBB ?`,
        text: `Ses d\xE9penses, abonnements et son budget iront dans \xAB ${target.name} \xBB.`,
        ok: "Supprimer",
        danger: true,
        onOk: () => {
          mergeCategory(from.id, to);
          ctx2.toast("Cat\xE9gorie supprim\xE9e");
        }
      });
    },
    "edit-goal": (ctx2) => open.goalEdit(ctx2, ctx2.ui.sheet.id),
    "delete-goal": (ctx2) => {
      const id = ctx2.ui.sheet.id;
      ctx2.confirm({ title: "Supprimer l'objectif ?", text: "Les versements enregistr\xE9s pour cet objectif seront supprim\xE9s.", ok: "Supprimer", danger: true, onOk: () => {
        deleteGoal(id);
        ctx2.toast("Objectif supprim\xE9");
      } });
    },
    "delete-contribution": (ctx2, el) => {
      const goalId = ctx2.ui.sheet.id;
      update((s) => {
        const g = s.goals.find((x) => x.id === goalId);
        if (g) g.contributions = g.contributions.filter((c) => c.id !== el.dataset.id);
      });
    },
    "delete-annual": (ctx2) => {
      deleteAnnual(ctx2.ui.sheet.id);
      ctx2.closeSheet();
      ctx2.toast("D\xE9pense annuelle supprim\xE9e");
    },
    "delete-account": (ctx2) => {
      deleteAccount(ctx2.ui.sheet.id);
      ctx2.closeSheet();
    },
    "skip-onboarding": (ctx2) => {
      setSetting("onboarded", true);
      ctx2.closeSheet();
    },
    "confirm-ok": (ctx2) => {
      const sh = ctx2.ui.sheet;
      ctx2.closeSheet();
      sh.onOk && sh.onOk();
    },
    "confirm-alt": (ctx2) => {
      const sh = ctx2.ui.sheet;
      ctx2.closeSheet();
      sh.onAlt && sh.onAlt();
    },
    "confirm-cancel": (ctx2) => ctx2.closeSheet()
  };
  var changes3 = {
    resheet: (ctx2) => {
      captureDraft(ctx2);
      ctx2.renderSheet();
    }
  };
  var forms = {
    expense(ctx2) {
      const sh = ctx2.ui.sheet;
      const amount = parseAmount(sh.amount);
      if (!amount) return ctx2.toast("Indique un montant");
      if (!sh.cat) return ctx2.toast("Choisis une cat\xE9gorie");
      const data = {
        amount,
        categoryId: sh.cat,
        date: sh.date || todayISO(),
        note: (sh.note || "").trim(),
        accountId: ctx2.state().settings.multiAccounts ? sh.accountId : sh.accountId || null
      };
      if (sh.id) data.id = sh.id;
      saveExpense(data);
      ctx2.ui.lastCat = sh.cat;
      ctx2.closeSheet();
      const c = catById(ctx2.state(), sh.cat);
      ctx2.toast(`${fmt(amount)} ${sh.id ? "modifi\xE9s" : "ajout\xE9s"} \xB7 ${c ? c.name : ""}`);
    },
    sub(ctx2, form) {
      const fd = new FormData(form);
      const amount = parseAmount(fd.get("amount"));
      const name = String(fd.get("name") || "").trim();
      if (!name) return ctx2.toast("Indique un nom");
      if (!amount) return ctx2.toast("Indique un montant valide");
      const startDate = fd.get("startDate");
      const endDate = fd.get("endDate") || null;
      if (!startDate) return ctx2.toast("Indique la date du pr\xE9l\xE8vement");
      if (endDate && endDate < startDate) return ctx2.toast("La date de fin est avant le premier pr\xE9l\xE8vement");
      saveSubscription({
        id: ctx2.ui.sheet.id || void 0,
        name,
        amount,
        frequency: fd.get("frequency"),
        categoryId: fd.get("categoryId"),
        startDate,
        endDate,
        status: fd.get("status"),
        reminderDays: Number(fd.get("reminderDays")),
        accountId: fd.get("accountId") || ctx2.state().accounts[0].id
      });
      ctx2.closeSheet();
      ctx2.toast("Abonnement enregistr\xE9");
    },
    income(ctx2, form) {
      const fd = new FormData(form);
      const sh = ctx2.ui.sheet;
      const amount = parseAmount(fd.get("amount"));
      const name = String(fd.get("name") || "").trim();
      if (!name) return ctx2.toast("Indique un nom");
      if (!amount) return ctx2.toast("Indique un montant valide");
      const type = sh.draft.type;
      const dest = String(fd.get("destination") || sh.draft.destination || "reste");
      const data = {
        id: sh.id || void 0,
        type,
        name,
        amount,
        date: type === "ponctuel" ? fd.get("date") || todayISO() : null,
        destination: dest.startsWith("goal:") ? "objectif" : sh.id ? sh.draft.destination : "reste",
        goalId: dest.startsWith("goal:") ? dest.slice(5) : sh.draft.goalId || null,
        accountId: fd.get("accountId") || ctx2.state().accounts[0].id
      };
      saveIncome(data);
      const reopenList = sh.fromList;
      ctx2.closeSheet();
      if (reopenList) ctx2.openSheet({ type: "incomes" });
      ctx2.toast("Revenu enregistr\xE9");
    },
    cat(ctx2) {
      captureDraft(ctx2);
      const sh = ctx2.ui.sheet;
      const x = sh.draft;
      const name = String(x.name || "").trim();
      if (!name) return ctx2.toast("Indique un nom");
      const budget = parseAmount(x.budget || "0");
      if (budget == null) return ctx2.toast("Budget invalide");
      saveCategory({
        id: sh.id || void 0,
        name,
        groupId: x.groupId,
        color: x.color,
        icon: x.icon,
        budget,
        fixed: !!x.fixed,
        thresholds: Array.isArray(x.thresholds) ? x.thresholds : null
      });
      ctx2.closeSheet();
      ctx2.toast("Cat\xE9gorie enregistr\xE9e");
    },
    contribution(ctx2, form) {
      const fd = new FormData(form);
      const amount = parseAmount(fd.get("amount"));
      if (!amount) return ctx2.toast("Indique un montant");
      addContribution(ctx2.ui.sheet.id, amount, fd.get("date") || todayISO());
      ctx2.toast(`${fmt(amount)} mis de c\xF4t\xE9`);
    },
    goal(ctx2) {
      captureDraft(ctx2);
      const sh = ctx2.ui.sheet;
      const x = sh.draft;
      const name = String(x.name || "").trim();
      const target = parseAmount(x.target);
      if (!name) return ctx2.toast("Indique un nom");
      if (!target) return ctx2.toast("Indique un montant cible");
      saveGoal({ id: sh.id || void 0, name, target, deadline: x.deadline || null, color: x.color, icon: x.icon });
      ctx2.closeSheet();
      ctx2.toast("Objectif enregistr\xE9");
    },
    annual(ctx2, form) {
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const amount = parseAmount(fd.get("amount"));
      if (!name) return ctx2.toast("Indique un nom");
      if (!amount) return ctx2.toast("Indique un montant valide");
      saveAnnual({ id: ctx2.ui.sheet.id || void 0, name, amount, dueDate: fd.get("dueDate") || todayISO(), categoryId: fd.get("categoryId") });
      ctx2.closeSheet();
      ctx2.toast("D\xE9pense annuelle enregistr\xE9e");
    },
    helper(ctx2, form) {
      const s = ctx2.state();
      const income = parseAmount(new FormData(form).get("income"));
      if (!income) return ctx2.toast("Indique tes revenus");
      if (!regularIncome(s)) saveIncome({ type: "regulier", name: "Revenu principal", amount: income, date: null, destination: "reste", accountId: s.accounts[0].id });
      setBudgets(recommendedSplit(ctx2.state(), income));
      ctx2.closeSheet();
      ctx2.toast("Budget appliqu\xE9 \u2014 ajuste chaque cat\xE9gorie si besoin");
    },
    onboarding(ctx2, form) {
      const fd = new FormData(form);
      const income = parseAmount(fd.get("income"));
      const s = ctx2.state();
      if (income) {
        saveIncome({ type: "regulier", name: "Revenu principal", amount: income, date: null, destination: "reste", accountId: s.accounts[0].id });
        if (fd.get("split")) setBudgets(recommendedSplit(ctx2.state(), income));
      }
      setSetting("onboarded", true);
      requestPersistence().then((ok) => {
        ctx2.ui.persisted = ok;
      });
      ctx2.closeSheet();
      if (income && fd.get("split")) ctx2.toast("Budget pr\xEAt \u2014 ajuste-le dans l\u2019onglet Budget");
    },
    account(ctx2, form) {
      const name = String(new FormData(form).get("name") || "").trim();
      if (!name) return ctx2.toast("Indique un nom");
      saveAccount({ id: ctx2.ui.sheet.id || void 0, name });
      ctx2.closeSheet();
    }
  };

  // budget-app/js/install.js
  var deferredPrompt = null;
  var installedNow = false;
  window.addEventListener("beforeinstallprompt", (ev) => {
    ev.preventDefault();
    deferredPrompt = ev;
  });
  window.addEventListener("appinstalled", () => {
    installedNow = true;
    deferredPrompt = null;
  });
  function isInstalled() {
    return installedNow || window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || window.navigator.standalone === true;
  }
  var isTouch = () => window.matchMedia("(pointer: coarse)").matches;
  function shouldShow(s, ui2) {
    if (!isTouch()) return false;
    if (isInstalled() || ui2.installHidden) return false;
    if (!s.settings.onboarded) return false;
    const last = s.settings.installDismissedOn;
    return !last || diffDays(last, todayISO()) >= 7;
  }
  var LOGO = `<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke-width="4" transform="rotate(-90 12 12)"><circle cx="12" cy="12" r="7" stroke="#60A5FA" stroke-dasharray="18 44"/><circle cx="12" cy="12" r="7" stroke="#4ADE80" stroke-dasharray="9 44" stroke-dashoffset="-19.5"/><circle cx="12" cy="12" r="7" stroke="#FB923C" stroke-dasharray="7 44" stroke-dashoffset="-30"/><circle cx="12" cy="12" r="7" stroke="#2DD4BF" stroke-dasharray="5 44" stroke-dashoffset="-38.5"/></g></svg>`;
  function render6(s, ui2) {
    if (!shouldShow(s, ui2)) return "";
    if (ui2.installSteps) {
      const steps = "<li>Touche le menu <strong>\u22EE</strong> de Chrome, en haut \xE0 droite.</li><li>Choisis <strong>Ajouter \xE0 l\u2019\xE9cran d\u2019accueil</strong>.</li><li>Confirme avec <strong>Installer</strong>.</li>";
      return `<aside class="install-card" aria-label="Installer l'appli">
      <span class="t">Pour installer Yardget</span>
      <ol class="steps">${steps}</ol>
      <button class="btn sm primary" type="button" data-action="install-steps-ok">J\u2019ai compris</button>
    </aside>`;
    }
    return `<aside class="install-card" aria-label="Installer l'appli">
    <button class="x" type="button" data-action="install-later" aria-label="Fermer">${iconSvg("x", 18)}</button>
    <div class="top">
      <span class="logo">${LOGO}</span>
      <span class="txt"><span class="t">Installe Yardget sur ton t\xE9l\xE9phone</span><span class="d">Ouverture en un toucher, sans r\xE9seau, donn\xE9es prot\xE9g\xE9es.</span></span>
    </div>
    <div class="btn-row">
      <button class="btn sm" type="button" data-action="install-later">Plus tard</button>
      <button class="btn sm primary" type="button" data-action="install-now">Installer</button>
    </div>
  </aside>`;
  }
  var actions7 = {
    "install-later": (ctx2) => {
      ctx2.ui.installSteps = false;
      setSetting("installDismissedOn", todayISO());
    },
    "install-now": async (ctx2) => {
      if (deferredPrompt) {
        const p = deferredPrompt;
        deferredPrompt = null;
        p.prompt();
        try {
          const choice = await p.userChoice;
          if (choice && choice.outcome === "accepted") {
            ctx2.ui.installHidden = true;
            ctx2.render();
          }
        } catch {
        }
      } else {
        ctx2.ui.installSteps = true;
        ctx2.render();
      }
    },
    "install-steps-ok": (ctx2) => {
      ctx2.ui.installSteps = false;
      ctx2.ui.installHidden = true;
      ctx2.render();
    }
  };

  // budget-app/js/app.js
  var VIEWS = {
    accueil: home_exports,
    depenses: expenses_exports,
    "depenses/abonnements": expenses_exports,
    budget: budget_exports,
    analyse: analysis_exports,
    reglages: settings_exports
  };
  var ui = {
    route: "accueil",
    sheet: null,
    homeSel: null,
    expTab: "historique",
    histMonth: null,
    histFilter: "tout",
    histAccount: "",
    aboDetail: false,
    period: null,
    reviewMonth: null,
    lastCat: null,
    persisted: false
  };
  var viewEl = document.getElementById("view");
  var sheetRoot = document.getElementById("sheet");
  var toastEl = document.getElementById("toast");
  var lastFocus = null;
  var toastTimer = null;
  var animateNext = false;
  var ctx = {
    ui,
    state: () => getState(),
    render: render7,
    renderSheet: renderSheet2,
    go(route) {
      const target = "#/" + route;
      if (location.hash === target) handleRoute();
      else location.hash = target;
    },
    openSheet(sh) {
      if (!ui.sheet) lastFocus = document.activeElement;
      animateNext = !ui.sheet || ui.sheet.type !== sh.type;
      ui.sheet = sh;
      renderSheet2();
      const panel = sheetRoot.querySelector(".sheet");
      if (panel) panel.focus({ preventScroll: true });
    },
    closeSheet() {
      ui.sheet = null;
      renderSheet2();
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
      lastFocus = null;
    },
    confirm(opts) {
      ctx.openSheet({ type: "confirm", ...opts });
    },
    toast(message, undo = null) {
      clearTimeout(toastTimer);
      toastEl.innerHTML = `<div class="toast" role="status"><span>${esc(message)}</span>${undo ? '<button type="button" data-action="toast-undo">Annuler</button>' : ""}</div>`;
      toastEl._undo = undo;
      toastTimer = setTimeout(() => {
        toastEl.innerHTML = "";
        toastEl._undo = null;
      }, undo ? 5e3 : 3e3);
    }
  };
  function render7() {
    const s = getState();
    const view = VIEWS[ui.route] || home_exports;
    const sameRoute = viewEl.dataset.route === ui.route;
    const y = window.scrollY;
    const card = render6(s, ui);
    viewEl.innerHTML = view.render(s, ui) + tabbar(ui.route.split("/")[0]) + card;
    document.body.classList.toggle("has-install", !!card);
    viewEl.dataset.route = ui.route;
    if (sameRoute) window.scrollTo(0, y);
  }
  function renderSheet2() {
    const s = getState();
    if (!ui.sheet) {
      sheetRoot.classList.remove("open");
      sheetRoot.innerHTML = "";
      document.body.style.overflow = "";
      return;
    }
    const { html, full } = renderSheet(s, ui.sheet, ui);
    const body = sheetRoot.querySelector(".sheet-body");
    const scroll = body ? body.scrollTop : 0;
    const active = document.activeElement;
    const activeName = active && sheetRoot.contains(active) ? active.getAttribute("name") : null;
    const anim = animateNext ? " animate" : "";
    animateNext = false;
    sheetRoot.innerHTML = `<div class="scrim${anim}" data-action="${ui.sheet.type === "onboarding" ? "" : "close-sheet"}"></div>
    <div class="sheet${full ? " full" : ""}${anim}" role="dialog" aria-modal="true" aria-label="${esc(((html.match(/<h2[^>]*>([^<]*)<\/h2>/) || [])[1] || "Fen\xEAtre").replace(/&#39;/g, "'").replace(/&amp;/g, "&"))}" tabindex="-1">${html}</div>`;
    sheetRoot.classList.add("open");
    document.body.style.overflow = "hidden";
    const nb = sheetRoot.querySelector(".sheet-body");
    if (nb) nb.scrollTop = scroll;
    if (activeName) {
      const again = sheetRoot.querySelector(`[name="${CSS.escape(activeName)}"]`);
      if (again && again.type !== "checkbox") again.focus({ preventScroll: true });
    }
  }
  function applyTheme() {
    const pref = getState().settings.theme;
    const dark = pref === "sombre" || pref === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0F1117" : "#F4F5F8");
  }
  function handleRoute() {
    const [r, query] = (location.hash || "#/accueil").replace(/^#\//, "").split("?");
    ui.route = VIEWS[r] ? r : "accueil";
    if (query === "ajout") {
      history.replaceState(null, "", "#/" + ui.route);
      setTimeout(() => {
        if (getState().settings.onboarded) open.expense(ctx);
      }, 0);
    }
    if (ui.route === "depenses") ui.expTab = "historique";
    if (ui.route === "depenses/abonnements") ui.expTab = "abonnements";
    if (ui.route === "analyse" && getState().pendingReview) clearPendingReview();
    if (ui.sheet && ui.sheet.type !== "onboarding") {
      ui.sheet = null;
      renderSheet2();
    }
    render7();
    window.scrollTo(0, 0);
  }
  var GLOBAL_ACTIONS = {
    "add-expense": () => open.expense(ctx),
    "edit-expense": (c, el) => open.expense(ctx, el.dataset.id),
    "add-sub": () => open.sub(ctx),
    "edit-sub": (c, el) => open.sub(ctx, el.dataset.id),
    "open-incomes": () => ctx.openSheet({ type: "incomes" }),
    "add-income": (c, el) => {
      const fromList = ui.sheet && ui.sheet.type === "incomes";
      open.income(ctx, null, el.dataset.id || "regulier");
      ui.sheet.fromList = fromList;
    },
    "edit-income": (c, el) => {
      const fromList = ui.sheet && ui.sheet.type === "incomes";
      open.income(ctx, el.dataset.id);
      ui.sheet.fromList = fromList;
    },
    "open-helper": () => ctx.openSheet({ type: "helper" }),
    "add-cat": () => open.cat(ctx),
    "edit-cat": (c, el) => open.cat(ctx, el.dataset.id),
    "add-goal": () => open.goalEdit(ctx),
    "open-goal": (c, el) => ctx.openSheet({ type: "goal", id: el.dataset.id }),
    "add-annual": () => open.annual(ctx),
    "edit-annual": (c, el) => open.annual(ctx, el.dataset.id),
    "add-account": () => ctx.openSheet({ type: "account", id: null }),
    "edit-account": (c, el) => ctx.openSheet({ type: "account", id: el.dataset.id }),
    "export-now": () => {
      exportData();
      ctx.toast("Sauvegarde t\xE9l\xE9charg\xE9e");
    },
    "toast-undo": () => {
      const undo = toastEl._undo;
      toastEl.innerHTML = "";
      toastEl._undo = null;
      if (undo) undo();
    }
  };
  var ACTIONS = {
    ...actions,
    ...actions2,
    ...actions3,
    ...actions4,
    ...actions5,
    ...actions6,
    ...actions7,
    ...GLOBAL_ACTIONS
  };
  var CHANGES = {
    ...changes || {},
    ...changes2 || {},
    ...changes3 || {}
  };
  document.addEventListener("click", (ev) => {
    const submit = ev.target.closest('button[type="submit"]');
    if (submit && !submit.disabled) {
      const form = submit.closest("form[data-form]");
      if (form) {
        ev.preventDefault();
        submitForm(form);
        return;
      }
    }
    const el = ev.target.closest("[data-action]");
    if (!el || el.disabled) return;
    const name = el.dataset.action;
    if (!name) return;
    const fn = ACTIONS[name];
    if (!fn) return;
    if (el.tagName === "A") ev.preventDefault();
    fn(ctx, el, ev);
  });
  document.addEventListener("change", (ev) => {
    const el = ev.target;
    if (el.dataset.bind && ui.sheet) {
      ui.sheet[el.dataset.bind] = el.value;
      if (el.dataset.rerender) renderSheet2();
    }
    const name = el.dataset.change;
    if (name && CHANGES[name]) CHANGES[name](ctx, el, ev);
  });
  document.addEventListener("input", (ev) => {
    const el = ev.target;
    if (el.dataset.bind && ui.sheet && !el.dataset.rerender) ui.sheet[el.dataset.bind] = el.value;
  });
  function submitForm(form) {
    const fn = forms[form.dataset.form];
    if (fn) fn(ctx, form);
  }
  document.addEventListener("submit", (ev) => {
    const form = ev.target.closest("form[data-form]");
    if (!form) return;
    ev.preventDefault();
    submitForm(form);
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && ev.target.tagName === "INPUT" && !["checkbox", "file", "button", "submit"].includes(ev.target.type)) {
      const form = ev.target.closest("form[data-form]");
      if (form && form.dataset.form !== "expense") {
        ev.preventDefault();
        submitForm(form);
        return;
      }
    }
    if (!ui.sheet) return;
    if (ev.key === "Escape" && ui.sheet.type !== "onboarding") {
      ctx.closeSheet();
      return;
    }
    if (ui.sheet.type === "expense") {
      const tag = (ev.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "select" || tag === "textarea") return;
      let key = null;
      if (/^[0-9]$/.test(ev.key)) key = ev.key;
      else if (ev.key === "," || ev.key === ".") key = ",";
      else if (ev.key === "Backspace") key = "del";
      else if (ev.key === "Enter") {
        ev.preventDefault();
        forms.expense(ctx);
        return;
      }
      if (key) {
        ev.preventDefault();
        actions6.key(ctx, { dataset: { id: key } });
      }
    }
  });
  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("appinstalled", () => render7());
  window.matchMedia("(display-mode: standalone)").addEventListener("change", () => render7());
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);
  load();
  subscribe(() => {
    applyTheme();
    render7();
    if (ui.sheet) renderSheet2();
  });
  applyTheme();
  handleRoute();
  var s0 = getState();
  if (!s0.settings.onboarded && !s0.expenses.length && !s0.incomes.length) {
    ctx.openSheet({ type: "onboarding" });
  } else {
    requestPersistence().then((ok) => {
      ui.persisted = ok;
    });
  }
  isPersisted().then((ok) => {
    ui.persisted = ok;
    if (ui.route === "reglages") render7();
  });
  window.__YARDGET_OK__ = true;
  document.getElementById("boot")?.remove();
  if ("serviceWorker" in navigator && location.protocol !== "file:" && !window.__TEST_BUILD__) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((e) => console.warn("Service worker non enregistr\xE9", e));
    });
  }
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      load();
      applyTheme();
      render7();
      if (ui.sheet) renderSheet2();
    }
  });
})();
