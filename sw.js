// Service worker : l'appli fonctionne hors connexion.
// Change CACHE à chaque mise à jour publiée (même valeur que APP_VERSION, préfixée « yardget- »)
// pour que les téléphones récupèrent la nouvelle version.
const CACHE = 'yardget-1.00essai4';

const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/app.js',
  './js/store.js',
  './js/calc.js',
  './js/catalog.js',
  './js/charts.js',
  './js/components.js',
  './js/sheets.js',
  './js/install.js',
  './js/util.js',
  './js/version.js',
  './js/views/home.js',
  './js/views/expenses.js',
  './js/views/budget.js',
  './js/views/analysis.js',
  './js/views/settings.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Polices Google : mises en cache au premier passage
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
          return res;
        } catch {
          return hit || Response.error();
        }
      }),
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Fichiers de l'appli : cache d'abord, réseau en secours
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html'))),
  );
});
