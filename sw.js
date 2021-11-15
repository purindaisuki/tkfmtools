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

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "175-9e6797559dacb6f16b73.js"
  },
  {
    "url": "22ec39ca77b5fccfd95a7f58fe3365ed7d2e47c2-236a433ab5849ac8f55e.js"
  },
  {
    "url": "231-3c5899c83ba42812e0e3.js"
  },
  {
    "url": "3118b2d3-c730bced711a3554c4c5.js"
  },
  {
    "url": "378-35400102f16c673f0850.js"
  },
  {
    "url": "404.html",
    "revision": "60a5e177942f1311d7b5a7acfcce342f"
  },
  {
    "url": "404/index.html",
    "revision": "dbeb37f460bc0306792c68324ddabdcc"
  },
  {
    "url": "503-35bcb21e8465bb1843de.js"
  },
  {
    "url": "537-9163d86b023910e7375b.js"
  },
  {
    "url": "589-6f6e20cdc243a70d48bc.js"
  },
  {
    "url": "5b07ef9de3fd5be419a029e59e005ef56e51ac05-5c7f435eed9afa9a705f.js"
  },
  {
    "url": "62cfa6c8ea9a82b932eac7cef5357b2ded11d3dc-e5f76b5cb57c2f367277.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-6fddc1fd62c8d4cd20e5.js"
  },
  {
    "url": "8786e3ffefa4bd5c02054e170499b91b29bc5453-c14257b78eb3f28a3dc2.js"
  },
  {
    "url": "96bdde5b39eebc18d317fdb0ab29c3402e8a4652-3b52f3f0a14ca7843cec.js"
  },
  {
    "url": "9a778021ae307e66ed44991bf422d7272a3bc1a7-78241abea3d1d590136b.js"
  },
  {
    "url": "ad7f724d-93696c5349596d469034.js"
  },
  {
    "url": "analysis/index.html",
    "revision": "b06fb581e6b51727213d5bfdd4de8f07"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "5c8d44efab69dec9ff0c12da395f3bfb"
  },
  {
    "url": "app-d2384d3d2a14a1e1ae9c.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-f2f889fb4f1db4769977.js"
  },
  {
    "url": "battle/index.html",
    "revision": "bff5ee1b8e1e7299c82932d9fbca1762"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "20a8e670c263a2ad26684b14be1e6882"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-a9e6fc658fb55feee5a2.js"
  },
  {
    "url": "component---src-pages-404-js-a5c959d87a53e968a9a1.js"
  },
  {
    "url": "component---src-pages-analysis-index-js-462a3f10d024a10c6bca.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-5c1261e6b61570c727f9.js"
  },
  {
    "url": "component---src-pages-battle-index-tsx-a0e7ebd52305fc971068.js"
  },
  {
    "url": "component---src-pages-characters-potential-js-02bbaa80be232d50c659.js"
  },
  {
    "url": "component---src-pages-enlist-filter-js-028bbf17a77f0188d6c4.js"
  },
  {
    "url": "component---src-pages-enlist-index-js-2cfa479b679bb8e3125c.js"
  },
  {
    "url": "component---src-pages-index-js-c992705fafbdc8a7079b.js"
  },
  {
    "url": "component---src-pages-items-drop-filter-js-b47698fad3a72c157a53.js"
  },
  {
    "url": "component---src-pages-items-drop-index-js-37c4a712f9835aa71064.js"
  },
  {
    "url": "component---src-pages-team-build-js-76eeb54c664933a4b544.js"
  },
  {
    "url": "component---src-pages-team-index-js-f4ae90980ec721fe7aae.js"
  },
  {
    "url": "dc6a8720040df98778fe970bf6c000a41750d3ae-b499fe8d2f065c712e99.js"
  },
  {
    "url": "en/404.html",
    "revision": "fb313adb1b8f4d1d950b2fb83c50c26a"
  },
  {
    "url": "en/404/index.html",
    "revision": "8332ca7e2148691bd57541750cd95a5a"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "e5fd12ea8417f695198e12a28168a470"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "f71aaa308e05a9b42b9cd8fd321799c7"
  },
  {
    "url": "en/battle/index.html",
    "revision": "8090d9ea1cb8834db6fd45b279683ef5"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "009ceb25be2f662ef31a5a243eee014c"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "abcb12ac9b6cbf6cde2b28a293bfacfd"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "cec198b2a22bbcd21751aa3002142bfb"
  },
  {
    "url": "en/index.html",
    "revision": "a760d0ac2b488dd30932a350a1c5cf09"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "f9d106f5d4c195d1cb092176421aea28"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "be25cfad6179cee06851aff6d19e4f34"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "41c1905750202b34acbfd5ecb2838dfc"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "795ce3eaa476cb1b47ac481b8085060b"
  },
  {
    "url": "en/team/index.html",
    "revision": "3684a73b8532828f28f2bce721088371"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "f00a31018bc5f2ce44b981a4abf25f90"
  },
  {
    "url": "enlist/index.html",
    "revision": "48d1a6a12dc0bba8ca0d68ede0d4f54e"
  },
  {
    "url": "f5f6e74e6367895a7f6eecb3efd0490eb7855011-38108303ca3322dd0046.js"
  },
  {
    "url": "fb5f3564c4e0330b430a46c02eb7cdb2bcb091fc-ccb3e55aaccf60431d80.js"
  },
  {
    "url": "framework-e0ebf440d434790df65a.js"
  },
  {
    "url": "idb-keyval-3.2.0-iife.min.js"
  },
  {
    "url": "index.html",
    "revision": "d8dde7923f7436ba548efb5429b6015f"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "189b3be1efd97b8cf2a355746108af44"
  },
  {
    "url": "items/drop/index.html",
    "revision": "14234c0f28339c9328b24f25d6b63d0e"
  },
  {
    "url": "ja/404.html",
    "revision": "87624673b417b8948d4385fcadba6698"
  },
  {
    "url": "ja/404/index.html",
    "revision": "ee66a59efd836a6d344cc943fd4e2d46"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "73bd41ca4914a496f3a2734a980fef75"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "5ac09bb7d6aed5dc1997a2a1cb2ff3f1"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "1e492985fbe3f14910650208ecb9a781"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "7790478cd4cf77e7e26e933f65c1af30"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "253358a9e45ab098348a4c136421d561"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "c549a715dd5c28ccc2287bcd852fce1d"
  },
  {
    "url": "ja/index.html",
    "revision": "4bc54aea682917a87c38af6aae3403fb"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "1c7f15606256ab754aad841156be4b40"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "23e559f25a4dbd4c8fd15617c2a37e6c"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "7445b99b142d6f94009d34c9b2245a5b"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "b8c7f30cc87a00f5e7d491bdb9443650"
  },
  {
    "url": "ja/team/index.html",
    "revision": "182b3ef43f88081d1f1ac1b013b130a1"
  },
  {
    "url": "ko/404.html",
    "revision": "e23237539cbf3da42094ccc5fc2ebbd7"
  },
  {
    "url": "ko/404/index.html",
    "revision": "c9df96ab9981b272cdf327710285c755"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "427a2f5b99773a0e66d57b5e0383f078"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "60ba8fbb1262b49ae96852edb38efc44"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "f3ccec91156c2807e0a714df7dada6bb"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "541006f02c21e4311104e432114e8838"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "c47d1f328ae16510da8cbaa987d2018e"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "8b7e047f75a0cbe4af3f13e33f018ff9"
  },
  {
    "url": "ko/index.html",
    "revision": "d9a26c9c1827998fed29d5d8f23673ae"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "a931a87cd6c5ed924d61b6a81038e759"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "9d8d33e901b2f0affc8c402bd4d93aca"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "bd8dd1d9df1be0cf62b869e30923c53c"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "e1e64077105db3dc335daa9283a90fc6"
  },
  {
    "url": "ko/team/index.html",
    "revision": "2a921093d1728efca6795c40f8759c06"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "e844af7948ae93319175548494eb566e"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "fcded8a2da361f063f48a170aa1aa1d0"
  },
  {
    "url": "team/index.html",
    "revision": "54767f96dd3bfbbd7bd2cdcc77345eae"
  },
  {
    "url": "webpack-runtime-37c6628e1d3fc3c8c7e9.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "2c44a5b14cbc4992a3e75718fa83e7d3"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "ddc0367cbd8bea409f33e7e7f8ff506a"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "790f14787014955d9e65b526db60a79b"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "c209c8a987e5d0e3c784d5152f5602ac"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "c02d424dcd219c91a88d02207df3c559"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "b7fddede93f2d1b9302c85e841e945d7"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "a81cdb8c313986ec47c78f48c76b9830"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "6d5c212000160ff58a0779aa2bf6549c"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "6ab5046ffba78adc11078e79ee998e1c"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "f0adb1e3442b8af159ee3a4870c544f6"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "892efd6185cda7373051fd223610c432"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "b639a0fa1cf12bc6b37d645f61b85314"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "75056f28eb42a62deeb5c47e6173f8c2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^/tkfmtools`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/tkfmtools/app-d2384d3d2a14a1e1ae9c.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/tkfmtools/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
