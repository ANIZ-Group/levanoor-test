/* Levanoor — zeigt Push-Nachrichten im Browser an (ADR-0168). */
const BASIS = '/levanoor-test';

self.addEventListener('push', (ereignis) => {
  const daten = ereignis.data ? ereignis.data.json() : {};
  ereignis.waitUntil(
    self.registration.showNotification(daten.titel || 'Levanoor', {
      body: daten.text || '',
      icon: `${BASIS}/icon-192.png`,
      data: { pfad: daten.pfad || '/' },
    }),
  );
});

self.addEventListener('notificationclick', (ereignis) => {
  ereignis.notification.close();
  ereignis.waitUntil(self.clients.openWindow(`${BASIS}${ereignis.notification.data.pfad}`));
});
