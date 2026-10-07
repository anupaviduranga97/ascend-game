const CACHE='ascend-v14';
const ASSETS=[
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './sw.js',
  './elemento.jpg',
  './pyrion.jpg',
  './aquion.jpg',
  './terron.jpg',
  './vyron.jpg',
  './umbra.jpg',
  './aerix.jpg',
  './voltrix.jpg',
  './mechron.jpg',
  './nexara.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
