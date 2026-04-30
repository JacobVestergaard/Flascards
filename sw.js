const C='fc-v6',F=['./','./index.html','./decks.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  // Kortfiler hentes altid frisk (cache-buster via ?v=TS håndterer det)
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
