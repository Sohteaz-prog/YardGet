// Petits outils partagés : échappement HTML, montants, dates.

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ---------- Montants (stockés en centimes, entiers) ----------

const moneyFull = new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
const moneyRound = new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

/** 125050 -> "1 250,50 €" */
export function fmt(cents) {
  return moneyFull.format((cents || 0) / 100);
}

/** Sans décimales si le montant est rond : 42800 -> "428 €", 42850 -> "428,50 €" */
export function fmtShort(cents) {
  const c = Math.round(cents || 0);
  return c % 100 === 0 ? moneyRound.format(c / 100) : moneyFull.format(c / 100);
}

/** Arrondi à l'euro : 42850 -> "429 €" */
export function fmtEuro(cents) {
  return moneyRound.format(Math.round((cents || 0) / 100));
}

/** "12,50" / "12.5" / "1 250" -> centimes (ou null si invalide) */
export function parseAmount(text) {
  if (text == null) return null;
  const clean = String(text).replace(/\s| | |€/g, '').replace(',', '.');
  if (clean === '' || !/^\d*\.?\d{0,2}$/.test(clean)) return null;
  const n = Math.round(parseFloat(clean) * 100);
  return Number.isFinite(n) ? n : null;
}

/** centimes -> "12,50" pour pré-remplir un champ */
export function amountToInput(cents) {
  if (cents == null) return '';
  const euros = Math.floor(Math.abs(cents) / 100);
  const rest = Math.abs(cents) % 100;
  return (cents < 0 ? '-' : '') + euros + (rest ? ',' + String(rest).padStart(2, '0') : '');
}

export function pct(part, total) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

// ---------- Dates (chaînes locales AAAA-MM-JJ) ----------

export function toISO(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function fromISO(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO() {
  return toISO(new Date());
}

export function monthKey(iso) {
  return iso.slice(0, 7);
}

export function currentMonth() {
  return monthKey(todayISO());
}

export function addMonths(mk, n) {
  const [y, m] = mk.split('-').map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function daysInMonth(mk) {
  const [y, m] = mk.split('-').map(Number);
  return new Date(y, m, 0).getDate();
}

export function addDays(iso, n) {
  const d = fromISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

export function diffDays(fromIso, toIso) {
  return Math.round((fromISO(toIso) - fromISO(fromIso)) / 86400000);
}

/** Lundi de la semaine contenant la date */
export function weekStart(iso) {
  const d = fromISO(iso);
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  return toISO(d);
}

export function isoWeekNumber(iso) {
  const [y, m, day] = iso.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1, day));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

const fmtMonthLong = new Intl.DateTimeFormat('fr-BE', { month: 'long', year: 'numeric' });
const fmtMonthName = new Intl.DateTimeFormat('fr-BE', { month: 'long' });
const fmtMonthShort = new Intl.DateTimeFormat('fr-BE', { month: 'short' });
const fmtDayLong = new Intl.DateTimeFormat('fr-BE', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtDayShort = new Intl.DateTimeFormat('fr-BE', { day: 'numeric', month: 'short' });
const fmtDayFull = new Intl.DateTimeFormat('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' });

export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export function labelMonth(mk) {
  return cap(fmtMonthLong.format(fromISO(mk + '-01')));
}
export function labelMonthName(mk) {
  return cap(fmtMonthName.format(fromISO(mk + '-01')));
}
export function labelMonthShort(mk) {
  return cap(fmtMonthShort.format(fromISO(mk + '-01')));
}
export function labelDayLong(iso) {
  return cap(fmtDayLong.format(fromISO(iso)));
}
export function labelDayShort(iso) {
  return fmtDayShort.format(fromISO(iso));
}
export function labelDayFull(iso) {
  return fmtDayFull.format(fromISO(iso));
}

/** "Aujourd'hui", "Hier", "Demain", "Dans 3 jours"... */
export function relativeDay(iso) {
  const n = diffDays(todayISO(), iso);
  if (n === 0) return "Aujourd'hui";
  if (n === 1) return 'Demain';
  if (n === -1) return 'Hier';
  if (n > 1 && n <= 7) return `Dans ${n} jours`;
  return labelDayShort(iso);
}
