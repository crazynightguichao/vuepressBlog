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
    "revision": "ca600196700add65e78ad7d38c8d1e58"
  },
  {
    "url": "accumulate/index.html",
    "revision": "277a9163815861c69b29a56b89ea9f86"
  },
  {
    "url": "algorithm/index.html",
    "revision": "b369a74e276b505840dd83fa8ab5c6e2"
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
    "url": "assets/js/10.21c96174.js",
    "revision": "e2032e1d1cc6b3aea4b4466e8c762418"
  },
  {
    "url": "assets/js/11.0f63abfe.js",
    "revision": "5486be71c2a6e626b7afeb7168f5b719"
  },
  {
    "url": "assets/js/12.816a1587.js",
    "revision": "b4f9ec3c6e9e3698a942d10171d67400"
  },
  {
    "url": "assets/js/13.f83ab349.js",
    "revision": "77bd511dc8056cbff4def46877cdac98"
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
    "url": "assets/js/2.ce1608e6.js",
    "revision": "59b9e09855a16d382db7d8ff58d74b0d"
  },
  {
    "url": "assets/js/3.7f8423ba.js",
    "revision": "9b7caca6b3a043c92a0bb63cc1c94984"
  },
  {
    "url": "assets/js/4.7f989b28.js",
    "revision": "daa3a0c2de2bfbb73b2ec75e25c5747a"
  },
  {
    "url": "assets/js/5.bce00662.js",
    "revision": "67eaa01f954a31442562455c07810c9e"
  },
  {
    "url": "assets/js/6.6ce78cbf.js",
    "revision": "3d24432efd9c58634260b6f2dbef886e"
  },
  {
    "url": "assets/js/7.3ef676a3.js",
    "revision": "abb0f9e5b7f8af4325f443102f33c65e"
  },
  {
    "url": "assets/js/8.6047b5e7.js",
    "revision": "0008044b82b8307227faaeb2d979c872"
  },
  {
    "url": "assets/js/9.01e23169.js",
    "revision": "3d56ed131a4f29ff6eeb7a580734b221"
  },
  {
    "url": "assets/js/app.a3fe4feb.js",
    "revision": "3c925d85fd15f731eab24de06e571537"
  },
  {
    "url": "guide.html",
    "revision": "39500681bcfd4795fe11d1ea0876c98d"
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
    "revision": "1e6f80458daa09587a54bcd89b366b9b"
  },
  {
    "url": "interview/CSS.html",
    "revision": "e5586acb37948472181b89c6059d107b"
  },
  {
    "url": "interview/HTML.html",
    "revision": "0e3df0052060d73ddb6b6f94e72627bf"
  },
  {
    "url": "interview/HTTP.html",
    "revision": "407fce5707e380aebe453cd9aaef77b4"
  },
  {
    "url": "interview/js基础.html",
    "revision": "9f1f06f5475995b1cf75062f91fbd6c6"
  },
  {
    "url": "interview/vue.html",
    "revision": "7dfdcb2a902c4cf7af538e7dbffb2135"
  },
  {
    "url": "interview/性能.html",
    "revision": "68cfac1b6f10b4419f139d619825ca01"
  },
  {
    "url": "interview/浏览器.html",
    "revision": "f81c42acb37ed688364de651f95ee794"
  },
  {
    "url": "others/index.html",
    "revision": "1b76d7952f4725443009711e6a3edfa6"
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
