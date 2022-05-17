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
    "revision": "2487150157f059f7ad9d6ac80d977061"
  },
  {
    "url": "accumulate/index.html",
    "revision": "f3871c2f9d82ef40766d8a8337409482"
  },
  {
    "url": "algorithm/index.html",
    "revision": "f360265d9277fe734539bcf7ec5ad258"
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
    "url": "assets/js/10.94da10b1.js",
    "revision": "e5bdcc0b8b1b0800f8c01de34123cf92"
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
    "url": "assets/js/4.8adf341f.js",
    "revision": "7d2bb45c0523c592159dc0641f7dbbc9"
  },
  {
    "url": "assets/js/5.6df56fdb.js",
    "revision": "db159df7cb3f54e418019b2b83ddf929"
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
    "url": "assets/js/app.62e32283.js",
    "revision": "df342f0d9d5f50f26c6088e81b66d9e2"
  },
  {
    "url": "guide.html",
    "revision": "cba1de91464d548330a5aabc3c31df89"
  },
  {
    "url": "images/360.jpg",
    "revision": "4b58a4959ae171d76665b64f1db11cb0"
  },
  {
    "url": "images/localTip.png",
    "revision": "24800444a54f564796e6461a4f1c4583"
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
    "url": "images/tooltipDiv.png",
    "revision": "1e9eb98d552f0b5a20937ddea419bb83"
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
    "revision": "84379888a0826ab31bad4bdbd68068aa"
  },
  {
    "url": "interview/CSS.html",
    "revision": "621c7904dcb770c4c384146359d7b4aa"
  },
  {
    "url": "interview/HTML.html",
    "revision": "07f1b3cb5a3fb2fdfca89cd4d9c43c8f"
  },
  {
    "url": "interview/HTTP.html",
    "revision": "baa65a0a7b462b1e67e3932ac15a182e"
  },
  {
    "url": "interview/js基础.html",
    "revision": "b98b93e4978f73f63c324b79e5ae0884"
  },
  {
    "url": "interview/vue.html",
    "revision": "e042ba3e1109406d6929d395ec79a7ea"
  },
  {
    "url": "interview/性能.html",
    "revision": "65b5b84a36ca4c895f13d3b3fd7756b3"
  },
  {
    "url": "interview/浏览器.html",
    "revision": "c0a94b651b620a10695ea32acbed6166"
  },
  {
    "url": "others/index.html",
    "revision": "e0f2ede387d14dc30673415102e8dc33"
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
