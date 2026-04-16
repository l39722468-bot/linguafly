/**
 * Service worker de auto-desregistro.
 *
 * Este archivo sustituye a una versión anterior que cargaba un SW de Monetag
 * vinculado a la zona 10884532 (5gvci.com), la cual inyectaba scripts de
 * `auqot.com`, `jmosl.com` y `094kk.com` (dominios que bloqueamos en CSP por
 * servir contenido publicitario inapropiado).
 *
 * Al servir este archivo como `/sw.js`:
 *   - Los navegadores que ya tenían instalado el SW anterior reciben este nuevo
 *     build en la próxima visita, se activa, se desregistra a sí mismo y limpia
 *     todas las caches asociadas.
 *   - Los navegadores nuevos que intenten instalar `/sw.js` acaban igual: el SW
 *     se desregistra solo y no queda residuo.
 *
 * Cuando todos los clientes recurrentes hayan visitado el sitio al menos una
 * vez con este SW, la limpieza es total y este archivo podría retirarse junto
 * con la ruta /sw.js. Mientras tanto, se queda como mecanismo de limpieza.
 */
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch (_err) {
        // Silencioso: si caches no está disponible, nada que limpiar.
      }

      try {
        await self.registration.unregister();
      } catch (_err) {
        // Silencioso: el siguiente refresh lo intentará de nuevo.
      }

      try {
        const clientsList = await self.clients.matchAll({ type: "window" });
        clientsList.forEach((client) => {
          if ("navigate" in client) {
            client.navigate(client.url);
          }
        });
      } catch (_err) {
        // Silencioso: no pasa nada si no se puede refrescar.
      }
    })()
  );
});
