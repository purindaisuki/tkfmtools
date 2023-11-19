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
    "url": "22ec39ca77b5fccfd95a7f58fe3365ed7d2e47c2-37ecc4638a6df9d51aee.js"
  },
  {
    "url": "231-3c5899c83ba42812e0e3.js"
  },
  {
    "url": "34eaa9ba7885c2be72f0b944f1ae4ca14dd9ffdc-c6162cc71e1fbe5e16de.js"
  },
  {
    "url": "404.html",
    "revision": "f4620afbbfba49c423f028d0f4f929d7"
  },
  {
    "url": "404/index.html",
    "revision": "91f329d89bfe2a8b2ecc925cdc396cf0"
  },
  {
    "url": "4accbfb9ca4c22805f8a5a27dbe87689390fd05d-60564b7b9b149e4a094a.js"
  },
  {
    "url": "503-35bcb21e8465bb1843de.js"
  },
  {
    "url": "537-8c4e3f7accfcd235a80d.js"
  },
  {
    "url": "589-6f6e20cdc243a70d48bc.js"
  },
  {
    "url": "62cfa6c8ea9a82b932eac7cef5357b2ded11d3dc-5a70e90684ec6683f14f.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-37811249b78f7239d57b.js"
  },
  {
    "url": "846-d18894cfacc48a966efb.js"
  },
  {
    "url": "8786e3ffefa4bd5c02054e170499b91b29bc5453-bfd9db026daead412744.js"
  },
  {
    "url": "90286198ea1aced77f746b1f45675ef1436cc742-6e6a698cd9a5178d2362.js"
  },
  {
    "url": "96bdde5b39eebc18d317fdb0ab29c3402e8a4652-eea8adf2af0a5f0e6c40.js"
  },
  {
    "url": "9a778021ae307e66ed44991bf422d7272a3bc1a7-78241abea3d1d590136b.js"
  },
  {
    "url": "a2267787-cf9af3797137b2c67aa6.js"
  },
  {
    "url": "ad7f724d-187cc347df80051abd79.js"
  },
  {
    "url": "analysis/index.html",
    "revision": "3b726a50c5df463307e653082286e2c3"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "4e02818fe80dcd1b2ceb08778db1409a"
  },
  {
    "url": "app-271e2b637ff30279da8a.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "375a083ef015249d91f7124a5b09d1ca"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "843f817dad10f8b7b314c22d09076e19"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-a9e6fc658fb55feee5a2.js"
  },
  {
    "url": "component---src-pages-404-js-7e9f74038aadcdc0df79.js"
  },
  {
    "url": "component---src-pages-analysis-index-js-b0c2e91afcde96d6e0f7.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-2a922f73f43d36abe83c.js"
  },
  {
    "url": "component---src-pages-battle-index-tsx-b5cf4a9bc463ead86081.js"
  },
  {
    "url": "component---src-pages-characters-potential-js-5d0dadad22ce555c8680.js"
  },
  {
    "url": "component---src-pages-enlist-filter-js-1ae5a2ff6fd873b01d97.js"
  },
  {
    "url": "component---src-pages-enlist-index-js-71678a0840d441fa33f0.js"
  },
  {
    "url": "component---src-pages-index-js-e1799ee79bb36334ed1a.js"
  },
  {
    "url": "component---src-pages-items-drop-filter-js-4071bf815483afdfcd35.js"
  },
  {
    "url": "component---src-pages-items-drop-index-js-64decc1367d6e8b64ee5.js"
  },
  {
    "url": "component---src-pages-team-build-js-2ba57d1cb638f89960b9.js"
  },
  {
    "url": "component---src-pages-team-index-js-ade018b07605cbe9ab72.js"
  },
  {
    "url": "dc6a8720040df98778fe970bf6c000a41750d3ae-b499fe8d2f065c712e99.js"
  },
  {
    "url": "de10f4ae648e51141fd55db96f343b235217f6b2-befa3040c27fc99bd601.js"
  },
  {
    "url": "en/404.html",
    "revision": "b90bd7746763bcc932b85bb57251398e"
  },
  {
    "url": "en/404/index.html",
    "revision": "4a0e51e4024d78f27d7acfdbc0dff3ba"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "c63eb61888fa4c5e8127c1696d1c7ed8"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "437f4371fb130a4035e91877566572fd"
  },
  {
    "url": "en/battle/index.html",
    "revision": "a1458e39da954b137b0611e4c3369e45"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "65ef2855cfa09c7cf931b55737c5b1e6"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "24b80b1fbcdfc85aa34d9a368df6126d"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "5306c57ecb89c3bc17738c4e7cd96581"
  },
  {
    "url": "en/index.html",
    "revision": "35f84404ab14b7df67756612f0dacb7d"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "9a098c10a798b41b93c1a4e7536b90f0"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "d0964d708b0bf0202c605171b076569e"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "de1d5d8f4e7c8194a65266a8e0e75797"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "7e8e5d57d8847f6978304fe0eaaa5535"
  },
  {
    "url": "en/team/index.html",
    "revision": "58f040d648c39f656da823e1c8315f21"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "9ac191c378a44d4dbb094a1ae3db127a"
  },
  {
    "url": "enlist/index.html",
    "revision": "59caa35842efec7d3b4dc0452fbfd87c"
  },
  {
    "url": "f5f6e74e6367895a7f6eecb3efd0490eb7855011-bb590cc58865ce88f1d1.js"
  },
  {
    "url": "framework-03d0a40ecfe31ff1099d.js"
  },
  {
    "url": "idb-keyval-3.2.0-iife.min.js"
  },
  {
    "url": "index.html",
    "revision": "d99bda0f3c0285ecf3bb186ce1b6f961"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "7b6e9ef119d34daac5bd2595834f3a19"
  },
  {
    "url": "items/drop/index.html",
    "revision": "4994a3b07e74f17f9995dc2f7aaedc6c"
  },
  {
    "url": "ja/404.html",
    "revision": "ce6c579631ba680028a7a2a6a1b7c301"
  },
  {
    "url": "ja/404/index.html",
    "revision": "c51a629fe2e7d42abd27f7bc47f6b6ad"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "0894356bbaa48927759e30e59a95c050"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "3149fcb345a24e1bec174fe937adf3fd"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "69354404cb33e9d02d7da8485fe837a2"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "7933b2a515c233689727376eac0dee4a"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "a9fc8269e5f5f49203739c2b29fd7e5e"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "f17685a923c481b999e73a19de3944fb"
  },
  {
    "url": "ja/index.html",
    "revision": "8f633b4be68aafff98a17d6e419edcee"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "12fd40be915b0cbdd84b6d4e9a12a946"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "5e69b2030584a033d0975987842c70bb"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "526139d51ad4bbdd72ba40f0743cdac6"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "a6c8c84b5b2d1b4259f1d5311392fb25"
  },
  {
    "url": "ja/team/index.html",
    "revision": "1447c682fff781e1746ff58011402c5f"
  },
  {
    "url": "ko/404.html",
    "revision": "f48b5f2b8d1db8b6355b52f708b43722"
  },
  {
    "url": "ko/404/index.html",
    "revision": "2901e2f8787bf4a600a1472b7bdc0f2b"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "f9df7fd798fd2a724a2bd7f2ad857c24"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "96fba02f10ec11b45b244f1990216748"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "780882c414c53f803f5ae04a887265ad"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "b69478323f28581b73e6a2ecfa861c5a"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "3fcfa8852edda3f5f658dd020cce0253"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "c4bdd6ac75a92d36abae761b037d3e4e"
  },
  {
    "url": "ko/index.html",
    "revision": "c2550a8ddfde22c9737a3a889a94e19c"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "c0fc5b32be2a6f1c306861c3fd52f029"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "223905582564e5cd8ea485ca34b58643"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "171bd7260a3d4fcb115b6bf6a5e64398"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "0faa143718a33de287af2a1fe5ae5c89"
  },
  {
    "url": "ko/team/index.html",
    "revision": "3506612a7c2cd93523a64e2891b1f16d"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "3f356ad469a4064735c9b5ed1b25bcf8"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "b4f02b5b029c3d705c6d8cf044ef0554"
  },
  {
    "url": "team/index.html",
    "revision": "281ada6548c1c03c3fe135afddfc5a77"
  },
  {
    "url": "webpack-runtime-d3cfb9a7521d3c020524.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "c3cfeb7feee803f3d645fbf69d37cd0d"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "d88d8b8545818aa18a8c7dc47cf14f34"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "ab8155012acee6f0cdcc6445db4e1386"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "7d07a3c95c9583d1167e70ec189dbcfe"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "cc95c57cdd0160f9a9070a472aa1411c"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "2a3ad85e133c340fc8df4f467ae10583"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "263fcd116eac2efa8666e7251fe5b872"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "7c951a17d74a2e5730523100c8ae79d9"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "67b7fd16b53044fa18edc426fb30bcbf"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "b4c1db7e1acf7dc31fd13cf7632c7628"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "327d5e954342bf6f57bfbaf22c7db8d2"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "56e281a8e23c5ebb3102c1497a67a54e"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-271e2b637ff30279da8a.js`))) {
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
