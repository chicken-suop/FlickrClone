importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
workbox.routing.registerRoute(
  new RegExp('https://api.flickr.com/services/rest'),
  workbox.strategies.cacheFirst()
);
workbox.routing.registerRoute(
  new RegExp('/assets/media/'),
  workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.cacheFirst(),
);
workbox.precaching.precacheAndRoute([]);
