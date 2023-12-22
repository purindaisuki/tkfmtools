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
    "revision": "1589e5b8652dd131d863bd21ffad184b"
  },
  {
    "url": "404/index.html",
    "revision": "d3a710ba4e1997a59bddff6d96d8c08f"
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
    "revision": "fc28468e0660a4aa71287056fda6f3a4"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "75a34f434ff95f0b598cc8b2f1e30558"
  },
  {
    "url": "app-0fdc344c15305ffe11e1.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "61f6baa7c8c1bc77908d3c4cc1e27b0e"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "045ffbbcb3f5feeafc8f607ec8ce6c0b"
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
    "url": "component---src-pages-analysis-result-js-7df9c575f1bc33d666ad.js"
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
    "revision": "6b6461f2ee77071ecc8d92bbad8a055a"
  },
  {
    "url": "en/404/index.html",
    "revision": "7a14077a138a37ec1235fa25b10791e9"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "d2d062ccdbf43acaffa516f4311798f9"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "e023a2a4e05865343d0ecd0308176b97"
  },
  {
    "url": "en/battle/index.html",
    "revision": "323cf3288c871dd508409df6930c97aa"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "5b8273d67f7cd7cf52e177d6bc36cd73"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "18d15df19cb90fbabc7f74336bb9b1dc"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "c5b47d03294f4003732c04e8cf745026"
  },
  {
    "url": "en/index.html",
    "revision": "3af834430165773b14526a7fa5fb96b2"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "bb35f7f3e12368564776fb044bd8a2fb"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "5b83d8df53a5b192797e03fdda6df564"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "fb9ea9ba024b8942c8c1014531fca94f"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "f09616dafc544aeb3446cbd238f63261"
  },
  {
    "url": "en/team/index.html",
    "revision": "82fce24b304f4a33e59ec1fec9de8819"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "68f6e558ebaab3c2733368cece24d518"
  },
  {
    "url": "enlist/index.html",
    "revision": "bca4853543ec572324ce29999924969f"
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
    "revision": "1295662bbe2569051f7bc7446d1da713"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "ad02826f2624b292e10747f488ffce47"
  },
  {
    "url": "items/drop/index.html",
    "revision": "80c7dc5e5252ef86aa8c96d91b0eecd4"
  },
  {
    "url": "ja/404.html",
    "revision": "eadf0e6555b923330301932341accbd5"
  },
  {
    "url": "ja/404/index.html",
    "revision": "641142956109a6eb35155b4a5d4cef2c"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "86951bd51d944d3705e742c2f7805ed0"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "85f9360932288b5e481f6e19eb165806"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "91e1e1a91e519f0c8e0db721393c1be0"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "35ee6176a7333533b23fd30bee7070ad"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "9e376410f42b16afe98ebaaf0e79e1d4"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "a20b365ccc5d40fa5e3b708735fb83a9"
  },
  {
    "url": "ja/index.html",
    "revision": "af8c99ea82ea5bdcc09914120c7f5ad4"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "6dcd66822416b51ed07df5254402fdf6"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "602fdf28aafd9034e0b4bd0dde2265b0"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "f2b78fe3844961e49b870fecfb42d5d2"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "821c637b718a0b0302175403a5c6ba93"
  },
  {
    "url": "ja/team/index.html",
    "revision": "8a00e78457080920f95783db69c40d19"
  },
  {
    "url": "ko/404.html",
    "revision": "af50fca11579f0d6b6d789fce97e10be"
  },
  {
    "url": "ko/404/index.html",
    "revision": "ed06a311f52122659cce8691029b9281"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "d35d37d4490dbb8f045c0225c59e70ad"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "e2dec1a36370a62c3f5343679bf4bd0b"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "82f26b6dcc0e38c22ae4e3e91cbd3293"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "89b38880c64e3e31de0466d271dd950c"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "c248ad4a7b7054a359afb912d20d7ceb"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "591988aa9c832d133113647bbcd9ebdf"
  },
  {
    "url": "ko/index.html",
    "revision": "214ab2ecdc05b7465620d6266c125255"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "fbf7546c5a7d2de80f24eca741e52545"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "bd873ca281cfe5a43b19d71b3e5c4e84"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "95f6a11b1b2b5889c80a65d0ab149cdb"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "5d14e909a44ef95ec12e0ed53baba47f"
  },
  {
    "url": "ko/team/index.html",
    "revision": "e4d1153d5df765bd710ebaed557cf676"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "f2ff9163a94100ba4e6425af13e38276"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "ee7dbf9a7a0d3f3cdd1854a53003ffe8"
  },
  {
    "url": "team/index.html",
    "revision": "1d33f49040e7bf30a8f6b95a37588868"
  },
  {
    "url": "webpack-runtime-60d63b1d1fb2b35f6672.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "a8e200d8aa719ba25709b5bee2b5a37b"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "dc30b0c5ad93da19819bbf6b9da2c3d5"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "83d78e1fd500d587e1ec61c71214080f"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "d121cd3354d6704b0346f97244a30121"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "d36cbcb096a76268422a2d9e37018398"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "25aa0cdac1de956d90a716af80b6edc0"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "eb36c8e41c40b17e07635dd35aed1aa2"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "c6fda1a5e0a1b768984cd4f50896c64f"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "4084949d201794f9393add51a9232a3e"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "2276e8c9d8f701b42822920bb0b209e8"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "c33e915efcdd9d48f1f899c53b2e9bf1"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "9bcb20e0a67fcc0bb9ceca7892e4deaa"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-0fdc344c15305ffe11e1.js`))) {
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
