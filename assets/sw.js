importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
// workbox.routing.registerNavigationRoute('/feed');
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
workbox.precaching.precacheAndRoute([
  {
    "url": "browserconfig.xml",
    "revision": "5ea24ddf7f8031b9e1026d0482e49905"
  },
  {
    "url": "client.js",
    "revision": "ba7c917537d94c244dd59234d776e71a"
  },
  {
    "url": "manifest.json",
    "revision": "97cc0ab2ab57562e28d4cdc9d358e3b7"
  },
  {
    "url": "media/android-chrome-192x192.png",
    "revision": "945f8ba8f78a5ff7af391efb49353a79"
  },
  {
    "url": "media/android-chrome-512x512.png",
    "revision": "f8b0b20e878fcd67d1b172391337582e"
  },
  {
    "url": "media/apple-touch-icon.png",
    "revision": "459e46fa0dee159675be673047af9c88"
  },
  {
    "url": "media/favicon-16x16.png",
    "revision": "dc2e1e6019a172a6c74696290f3fc4da"
  },
  {
    "url": "media/favicon-32x32.png",
    "revision": "fbc3ab0b1d3ecec14ebca1759290dd6b"
  },
  {
    "url": "media/favicon.ico",
    "revision": "5b6a47d80b20bd29af6315ad5e43cb8f"
  },
  {
    "url": "media/Icon.png",
    "revision": "627bb207517cb5f51b55366210ca3acc"
  },
  {
    "url": "media/mstile-150x150.png",
    "revision": "d42de2061e7a450e41696906b055132a"
  },
  {
    "url": "media/safari-pinned-tab.svg",
    "revision": "02482f556bbfb71da2ce7bc1e703f184"
  }
]);
