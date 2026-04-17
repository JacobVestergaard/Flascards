const CACHE = 'flashcards-v1';
const FILES = ['/', '/index.html'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const clone = res.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)); return res; }))));
