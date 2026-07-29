/* Pollocalipsis — Service Worker
 *
 * El juego es un único HTML autocontenido (~15 MB: todo el arte va incrustado en
 * base64). Eso lo hace ideal para offline: se cachea una vez y después arranca sin
 * red, incluso en modo avión.
 *
 * Estrategia: "cache first" para los archivos propios. Como el HTML es enorme y no
 * cambia salvo que se publique una versión nueva, servirlo desde caché es lo más
 * rápido; la actualización se detecta cambiando CACHE_VERSION al desplegar.
 */

const CACHE_VERSION = 'pollocalipsis-v1.40';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/favicon.png'
];

// --- instalación: descargar y guardar todo ---
self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ARCHIVOS))
      // activar de inmediato sin esperar a que se cierren las pestañas viejas
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] fallo al cachear:', err))
  );
});

// --- activación: borrar cachés de versiones anteriores ---
self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(claves => Promise.all(
        claves.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// --- peticiones: caché primero, red como respaldo ---
self.addEventListener('fetch', evento => {
  const req = evento.request;

  // sólo GET y sólo del mismo origen (no interceptar nada externo)
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  evento.respondWith(
    caches.match(req).then(cacheada => {
      if (cacheada) return cacheada;

      return fetch(req).then(respuesta => {
        // guardar una copia de lo que se vaya pidiendo
        if (respuesta && respuesta.status === 200 && respuesta.type === 'basic') {
          const copia = respuesta.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copia));
        }
        return respuesta;
      }).catch(() => {
        // sin red y sin caché: si pedían una página, devolver el juego
        if (req.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 503, statusText: 'Sin conexión' });
      });
    })
  );
});
