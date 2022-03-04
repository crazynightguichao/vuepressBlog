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
    "revision": "6fd732e303140540958a4c4f77d6ecff"
  },
  {
    "url": "accumulate/index.html",
    "revision": "f5bec900e295ca5e97151161f76b3f33"
  },
  {
    "url": "algorithm/index.html",
    "revision": "defb3c6d6ac83607fab4591e18b6f483"
  },
  {
    "url": "assets/css/0.styles.6aaa91c1.css",
    "revision": "fde2c425d4e8a0f87d70ece6f5dd13a3"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.a29bd9ec.js",
    "revision": "3296ec9bf485f8aeeeeaed693a1e53f5"
  },
  {
    "url": "assets/js/11.d3b3e825.js",
    "revision": "22870a41e44c1e452ba12516035d182c"
  },
  {
    "url": "assets/js/12.6536ac83.js",
    "revision": "062a5d8ad5aff1270101b095650d69c0"
  },
  {
    "url": "assets/js/13.82929d04.js",
    "revision": "b77929dd3be103e91d1a1d6bde6efc79"
  },
  {
    "url": "assets/js/14.5d62c483.js",
    "revision": "908fe21863a1b204232944229a433379"
  },
  {
    "url": "assets/js/15.71f4a6cb.js",
    "revision": "a8ebc485293b60c161d9cca2a12d891e"
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
    "url": "assets/js/4.fb1cd507.js",
    "revision": "52af617bf4b460774b2364fdc229c47a"
  },
  {
    "url": "assets/js/5.be2d8a7c.js",
    "revision": "b1b4305d9c06cf454d1a84b2d7f00364"
  },
  {
    "url": "assets/js/6.6ce78cbf.js",
    "revision": "3d24432efd9c58634260b6f2dbef886e"
  },
  {
    "url": "assets/js/7.bd4b883e.js",
    "revision": "6cad9e5524033791613d802a4e3e570c"
  },
  {
    "url": "assets/js/8.4cb44276.js",
    "revision": "844b652c2b94caa7fff4c5233bf676bd"
  },
  {
    "url": "assets/js/9.e7375948.js",
    "revision": "bc35ed9e14bbee8558a8cf368df2724c"
  },
  {
    "url": "assets/js/app.00a1f5e5.js",
    "revision": "061b8e266c09f2875230bc55747d4026"
  },
  {
    "url": "guide.html",
    "revision": "630fb6ccc7182b0e498dadfeb4ab67ea"
  },
  {
    "url": "images/logo.png",
    "revision": "f59bd5b622dcce93246f1ac1f539f439"
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
    "url": "images/type.png",
    "revision": "b1ae5ba56dd71f93ac5d56c176602877"
  },
  {
    "url": "images/type2.png",
    "revision": "d0ab9fe6d846b6ebea43fdff017bdd43"
  },
  {
    "url": "index.html",
    "revision": "164ad4284949a585c611fe97dc61306c"
  },
  {
    "url": "interview/CSS.html",
    "revision": "0674856c51b0341fbe71b81063d8c178"
  },
  {
    "url": "interview/HTML.html",
    "revision": "8c84ca77f30a04e6508a003bdaf5ae5c"
  },
  {
    "url": "interview/HTTP.html",
    "revision": "29899c3077f749c8fa537999b79383c2"
  },
  {
    "url": "interview/js基础.html",
    "revision": "72f8a63ea99d5cc40df3413632c2a1d5"
  },
  {
    "url": "interview/vue.html",
    "revision": "1dc618244265e5a7573bd1eee747fbb6"
  },
  {
    "url": "interview/性能.html",
    "revision": "fa39df43e347476c3c499fe50da03fe5"
  },
  {
    "url": "interview/浏览器.html",
    "revision": "0d341db39ec5f93ec07e57f7cd18d2ac"
  },
  {
    "url": "others/index.html",
    "revision": "ff00c24dd87ea583292f06d41abcdc58"
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
