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
    "revision": "ef18d012c8a8139a3a74541cb9c0b4ff"
  },
  {
    "url": "accumulate/index.html",
    "revision": "b36d8cc8f4e3a0f4614d6da82d5228ab"
  },
  {
    "url": "algorithm/index.html",
    "revision": "2673da43588668420d15672f6cb5f17c"
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
    "url": "assets/js/4.5b9a6c8a.js",
    "revision": "0ec7a0c397ca05efbe3f6a678e620d48"
  },
  {
    "url": "assets/js/5.f3a5a22f.js",
    "revision": "ae19422658ab6dfab4f29febd081ff44"
  },
  {
    "url": "assets/js/6.5fef725a.js",
    "revision": "1994461b7b5171d3b3832e37201d6ffa"
  },
  {
    "url": "assets/js/7.b8ae3c43.js",
    "revision": "3803aa4625b66eb33a316c4938baf13a"
  },
  {
    "url": "assets/js/8.12f716cf.js",
    "revision": "96e584c7b994a13aa55791c93c33f368"
  },
  {
    "url": "assets/js/app.85878735.js",
    "revision": "f7cca44af593dcbc5932031c4cfcfb22"
  },
  {
    "url": "guide.html",
    "revision": "a5b7a764022a41edc02666b248a0c597"
  },
  {
    "url": "images/me.png",
    "revision": "1912a859d72c0b02a5443289f9729a67"
  },
  {
    "url": "index.html",
    "revision": "b9ec6d7c117b3b92782ff75abd8c4b02"
  },
  {
    "url": "others/index.html",
    "revision": "17eb1e72c7a88348ec3dd660980fdc3c"
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
