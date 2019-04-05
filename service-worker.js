const version = "0.0.1";
const cacheName = `elm-counter-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/manifest.json`,
        `/icon.png`,
        `/assets/elm.js`
      ])
          .then(() => self.skipWaiting());
    })
  );
});


self.addEventListener('fetch', function (event) {
    console.log('Service Worker Intercept: ' + event.request.url);

    event.respondWith(

        caches.match(event.request).then(function (response) {

            console.log('Service Worker Serve: ' + event.request.url);

            return response || fetch(event.request);

        })

    );
}); 