const C='fc-v5',F=['./','./index.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('cards.json'))return; // Altid hent frisk kortdata
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
