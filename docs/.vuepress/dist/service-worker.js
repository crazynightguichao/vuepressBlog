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
    "revision": "9e2077c4b37d629080f3b70b8c258e26"
  },
  {
    "url": "accumulate/index.html",
    "revision": "30b78e52455dd27e3fb4f92a8f648220"
  },
  {
    "url": "algorithm/index.html",
    "revision": "d9951e4663ca936597aa0b6ccab37439"
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
    "url": "assets/js/10.6c937c9d.js",
    "revision": "c4fda52f08ccc489113ac1fd3dd27f1c"
  },
  {
    "url": "assets/js/11.e1394852.js",
    "revision": "c59b66c7e457f6d84cca8d0b9f86b39d"
  },
  {
    "url": "assets/js/12.24efa90e.js",
    "revision": "25ada84fc9657c1da9831c34b8e348ce"
  },
  {
    "url": "assets/js/13.a3899d13.js",
    "revision": "ee534ed1c0b3511a145f07caab64e660"
  },
  {
    "url": "assets/js/14.9846fd9a.js",
    "revision": "a0bf33a5b39bf98a71a5cf8976045c8a"
  },
  {
    "url": "assets/js/15.71f4a6cb.js",
    "revision": "a8ebc485293b60c161d9cca2a12d891e"
  },
  {
    "url": "assets/js/2.ff4dc118.js",
    "revision": "da2178aa95a53dd550ddba08a373145c"
  },
  {
    "url": "assets/js/3.12570748.js",
    "revision": "ec941e264c7adefa080c404429555fee"
  },
  {
    "url": "assets/js/4.0cb3db7d.js",
    "revision": "5f46ed0272c8c13b6af99d6b8b9a2ef9"
  },
  {
    "url": "assets/js/5.37d190aa.js",
    "revision": "dba91d5b6915b7af44c5ea67e95d00d5"
  },
  {
    "url": "assets/js/6.447367ba.js",
    "revision": "7d3ccef92fe4d72fac260761c2f52207"
  },
  {
    "url": "assets/js/7.bd4b883e.js",
    "revision": "6cad9e5524033791613d802a4e3e570c"
  },
  {
    "url": "assets/js/8.f96db18a.js",
    "revision": "24245d6d0e9af651eedbda6ce9fe0757"
  },
  {
    "url": "assets/js/9.2cb6befe.js",
    "revision": "72d6ca06dde3d9b8ce46dab7b81415f1"
  },
  {
    "url": "assets/js/app.f06013a2.js",
    "revision": "c391f2a032c7d8d1b61e2213589871a0"
  },
  {
    "url": "guide.html",
    "revision": "94a35848caea477211cc254ac456bfaa"
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
    "url": "index.html",
    "revision": "d94b1eb102a64425661dd35d383728f4"
  },
  {
    "url": "interview/CSS.html",
    "revision": "36cc5e063e926857642627c2f3676782"
  },
  {
    "url": "interview/HTML.html",
    "revision": "fdbdc510ef1d5fd16dc4be56d89de95e"
  },
  {
    "url": "interview/HTTP.html",
    "revision": "c429f0a5d8af66acfab05fdcf2158b3a"
  },
  {
    "url": "interview/js基础.html",
    "revision": "1513e822db9ea280c5e9e8bb1fc403a0"
  },
  {
    "url": "interview/vue.html",
    "revision": "01b66c00243515272205b670302c3d93"
  },
  {
    "url": "interview/性能.html",
    "revision": "09b3b7043093f89008892519a802d77f"
  },
  {
    "url": "interview/浏览器.html",
    "revision": "3b102257cf0b9cf4febc715928eea18c"
  },
  {
    "url": "others/index.html",
    "revision": "07c13d4a2a6d4a61bc1985aed5d1a39d"
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
