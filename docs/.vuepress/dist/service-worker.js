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
    "revision": "59168e545e49d2e8870b3d837c176f14"
  },
  {
    "url": "accumulate/index.html",
    "revision": "f7dc889e33a2955b88c54ad67ed7cf1f"
  },
  {
    "url": "algorithm/index.html",
    "revision": "6109764d2b8b378dde7f9df97e35ebd8"
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
    "url": "assets/js/11.56ab5a22.js",
    "revision": "2a61220f7a373dec8c68abcd8b7e5d1a"
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
    "url": "assets/js/4.4a3332c2.js",
    "revision": "70520da2eb3e312fcc7a1e8008c9a116"
  },
  {
    "url": "assets/js/5.b11ebe49.js",
    "revision": "6705a958c4220b631c5025e4f7bcc211"
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
    "url": "assets/js/app.9b3633e7.js",
    "revision": "9df6c8398740f49df5ecbe1ad3702cd8"
  },
  {
    "url": "guide.html",
    "revision": "8ca69253e21a4980e99c365774f8e9cb"
  },
  {
    "url": "images/360.jpg",
    "revision": "4b58a4959ae171d76665b64f1db11cb0"
  },
  {
    "url": "images/exportSVG.png",
    "revision": "d04f33b260dbc712eff003b8cc4dfede"
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
    "url": "images/sleep.png",
    "revision": "de2fc7c3acfe95c8f876fc8450841686"
  },
  {
    "url": "images/surge_run.gif",
    "revision": "f50b67c5fe8bb045f3c2507f50098456"
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
    "revision": "0186a16817a9271b4a3dd43bc7430701"
  },
  {
    "url": "interview/CSS.html",
    "revision": "d834392ba8f291aa2e9cb4f085bf17d5"
  },
  {
    "url": "interview/HTML.html",
    "revision": "12ac7419f2b8971dae284d7b10a830dd"
  },
  {
    "url": "interview/HTTP.html",
    "revision": "4c3c2e401fe2bc106be510b4bc83f83a"
  },
  {
    "url": "interview/js基础.html",
    "revision": "3daf9ed5e99716b81c3d93d2719a5bbb"
  },
  {
    "url": "interview/vue.html",
    "revision": "5f46aa7a5cb4f4469e37023501176d63"
  },
  {
    "url": "interview/性能.html",
    "revision": "4016fac76e5cf682b7f0a5901f992398"
  },
  {
    "url": "interview/浏览器.html",
    "revision": "48fad6dae76934a836fdf03a0ab1b866"
  },
  {
    "url": "others/index.html",
    "revision": "0e72af93c0ae990e644e4ed887615b16"
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
