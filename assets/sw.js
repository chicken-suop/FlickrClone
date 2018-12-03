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
workbox.precaching.precacheAndRoute([
  {
    "url": "browserconfig.xml",
    "revision": "ed330e2ec12e36179ee94a39e69f1930"
  },
  {
    "url": "manifest.json",
    "revision": "f4f0b28c83ad096afa2d4442420c309e"
  },
  {
    "url": "media/android-chrome-192x192.png",
    "revision": "8a1f8651e47b1bef8be939ba1afe5bf4"
  },
  {
    "url": "media/android-chrome-512x512.png",
    "revision": "a539b08821ee498285e46e5e92d4ed66"
  },
  {
    "url": "media/apple-touch-icon.png",
    "revision": "1772b6fa260b7023d06460e6832c2e4f"
  },
  {
    "url": "media/favicon-16x16.png",
    "revision": "e2af6a79a159c3fc8292619d7c593cbb"
  },
  {
    "url": "media/favicon-32x32.png",
    "revision": "985b4463ce902c755c6828466675db5c"
  },
  {
    "url": "media/favicon.ico",
    "revision": "5ef37887ed5f6a2c31b6ec13528aa914"
  },
  {
    "url": "media/mstile-150x150.png",
    "revision": "7c2ead1b1dc266a69e0f7aaa7a5a1d54"
  },
  {
    "url": "media/safari-pinned-tab.svg",
    "revision": "9eecda0fbed20ca92cf270a960a389b5"
  }
]);
