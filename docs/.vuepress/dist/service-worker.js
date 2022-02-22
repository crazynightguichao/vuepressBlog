/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "490831399bd5352afc0f6c10be0d49d0"
  },
  {
    "url": "accumulate/index.html",
    "revision": "f9f9696c973fdda4b8d0fb714551c137"
  },
  {
    "url": "algorithm/index.html",
    "revision": "e17eecc7f1e577249831570254e8fedf"
  },
  {
    "url": "assets/css/0.styles.6aaa91c1.css",
    "revision": "7140dfb84c8b6d8186cfe9d28409ec75"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.858e80da.js",
    "revision": "59b9e09855a16d382db7d8ff58d74b0d"
  },
  {
    "url": "assets/js/3.7f8423ba.js",
    "revision": "9b7caca6b3a043c92a0bb63cc1c94984"
  },
  {
    "url": "assets/js/4.d38b5bc0.js",
    "revision": "53a08b42d81cf42bfaa8fb10d2c06066"
  },
  {
    "url": "assets/js/5.104ea040.js",
    "revision": "b8e01329d35de00581ec121fbba7e2d0"
  },
  {
    "url": "assets/js/6.5fef725a.js",
    "revision": "1994461b7b5171d3b3832e37201d6ffa"
  },
  {
    "url": "assets/js/7.06505c80.js",
    "revision": "8a31218f3869d11103dde1bce261c931"
  },
  {
    "url": "assets/js/8.12f716cf.js",
    "revision": "96e584c7b994a13aa55791c93c33f368"
  },
  {
    "url": "assets/js/app.6b311103.js",
    "revision": "b99468d15937659ca54bb33469c1bb58"
  },
  {
    "url": "guide.html",
    "revision": "6c67daad68d5d73448eba4fe43b5ffb3"
  },
  {
    "url": "images/me.png",
    "revision": "1912a859d72c0b02a5443289f9729a67"
  },
  {
    "url": "images/memoryOut.png",
    "revision": "40c86a4d0b9dd70d66390512dcecdf57"
  },
  {
    "url": "index.html",
    "revision": "48103ab0e60a59cd7d5134fd1fffe0de"
  },
  {
    "url": "others/index.html",
    "revision": "e3cb68cbde7a3c618f483032e3e85f4a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
