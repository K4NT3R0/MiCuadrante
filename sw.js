const C='cuadrante-v5',ASSETS=['./','index.html','privacidad.html','icon.svg','icon-192.png','icon-512.png','manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all(ASSETS.map(a=>c.add(a).catch(()=>{})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok||r.type==='opaque'){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{})}
    return r;
  }).catch(()=>caches.match(e.request).then(m=>m||(e.request.mode==='navigate'?caches.match('index.html'):Response.error()))));
});
