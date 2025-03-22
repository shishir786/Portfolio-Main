const CACHE_NAME = 'portfolio-v1';
const ASSETS = [
  '/',
  '/css/styles.css',
  '/js/script.js',
  '/images/logo.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
  );
});