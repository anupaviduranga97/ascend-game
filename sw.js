const CACHE='ascend-v13';
const ASSETS=['./','./index.html','./manifest.json','./icon.svg','./sw.js','./assets/origins2d/elemento.jpg','./assets/origins2d/pyrion.jpg','./assets/origins2d/aquion.jpg','./assets/origins2d/terron.jpg','./assets/origins2d/vyron.jpg','./assets/origins2d/umbra.jpg','./assets/origins2d/aerix.jpg','./assets/origins2d/voltrix.jpg','./assets/origins2d/mechron.jpg','./assets/origins2d/nexara.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>cached)));});
