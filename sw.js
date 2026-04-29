const C='fc-v6',F=['./','./index.html'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  const url = new URL(e.request.url);
  // Cache JSON filer dynamisk efter de er hentet første gang
  if(url.pathname.endsWith('.json')) {
     e.respondWith(
       caches.match(e.request).then(cached => {
         return cached || fetch(e.request).then(res=>{
             const rc = res.clone();
             caches.open(C).then(c=>c.put(e.request, rc));
             return res;
         });
       })
     );
     return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
