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
    "url": "22ec39ca77b5fccfd95a7f58fe3365ed7d2e47c2-7c0540d8fc32b5b2ef2a.js"
  },
  {
    "url": "231-3c5899c83ba42812e0e3.js"
  },
  {
    "url": "34eaa9ba7885c2be72f0b944f1ae4ca14dd9ffdc-c6162cc71e1fbe5e16de.js"
  },
  {
    "url": "404.html",
    "revision": "ad6301fbe99c53b38aa90d8973f0657d"
  },
  {
    "url": "404/index.html",
    "revision": "4504c67deed3fe8d06b0ada8e2179380"
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
    "revision": "247794f69d5491ed0a3ff6a7f9cb503c"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "641cd40c655faa5c83e818526a3b6440"
  },
  {
    "url": "app-2cfde297e4abfe629027.js"
  },
  {
    "url": "app-34a34e096a08559201fb.js"
  },
  {
    "url": "app-6afe0d54e4bed382840a.js"
  },
  {
    "url": "app-827eabf6632a92dd31a6.js"
  },
  {
    "url": "app-dc3b935083c695bdc6ad.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "a0e7849a30eb613ca2d5ceb42829f641"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "4b10f21672b2d4b27b0a11437238c297"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-a9e6fc658fb55feee5a2.js"
  },
  {
    "url": "component---src-pages-404-js-7e9f74038aadcdc0df79.js"
  },
  {
    "url": "component---src-pages-analysis-index-js-077865d39177a5282ffb.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-24dfd6a035f2ab649bea.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-83af0955dc5a15243e30.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-87aab3a128b671d7b42e.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-916d7023de79d858f858.js"
  },
  {
    "url": "component---src-pages-battle-index-tsx-0e9dfa690977f8880ecc.js"
  },
  {
    "url": "component---src-pages-characters-potential-js-76b3a1b26807b9f1fcb1.js"
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
    "url": "component---src-pages-team-build-js-a856e3460474dcb2f2b5.js"
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
    "revision": "ec6e115da9a900e9a2736db78d091f98"
  },
  {
    "url": "en/404/index.html",
    "revision": "f89c764a79ce392c1c006bebc2b1b773"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "0f01aa197c00b44571685e65f78fc352"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "cb601acd9454b20cb8ae639fa73d6fba"
  },
  {
    "url": "en/battle/index.html",
    "revision": "25333692c4d2738881d7cf026264c6f0"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "727e69bc9e06ace4f7994df280fae22a"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "250ba93b6ec22036c18d471cff24421d"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "09d47498cbbac7ed5c0f530e62a4998e"
  },
  {
    "url": "en/index.html",
    "revision": "624d5d70c758f22554a406480f31730d"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "32531fdfe73a7e5d5704022102d4331b"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "d314e7c63e32864d92886ed7d6995718"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "6e27142cabd04fce095f6359ca224c2f"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "55c653d5df1296a5402032a2a2366763"
  },
  {
    "url": "en/team/index.html",
    "revision": "69477df3897732d5e007d682f972fd34"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "6a79c42eb3c143e5f7ca6f909c0b930b"
  },
  {
    "url": "enlist/index.html",
    "revision": "291d3a562cda65c19a297d4b5d9df5cd"
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
    "revision": "729a975547cc445893f534895c76eb1e"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "cbf2e5637334785969468d7287c48a4c"
  },
  {
    "url": "items/drop/index.html",
    "revision": "ae4e1671ac76377f0a67fcdf78a699d7"
  },
  {
    "url": "ja/404.html",
    "revision": "0195f77920416daef0ab4d176af728a6"
  },
  {
    "url": "ja/404/index.html",
    "revision": "f319084cd2ab0eed43357b48c400fb57"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "66ecc853a586ef7bb86eaa3beeab8157"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "075adac5e68047090a65ba3139774389"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "11c5fd3d1a5e738e023be1f5c68def38"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "f0ce4cef2e4dff0b70c6467b02c45ffe"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "f7966d78d8ef729a6bac6cbd3d9471c5"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "017fdbc4700ad1b6bc4c9116589793d7"
  },
  {
    "url": "ja/index.html",
    "revision": "e1af5b8e995ac900951f371a3c92d618"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "65930c099a896bd4ef0806de7bec6040"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "5a96f74f133b8b6488e508c7c98470a1"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "548944bbe31ff830cf6102faed8bf550"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "bf1e0abc7ec4f95b759c36fac5ce0bdc"
  },
  {
    "url": "ja/team/index.html",
    "revision": "56b6fc8fb1f9024992dbffe0d2afd301"
  },
  {
    "url": "ko/404.html",
    "revision": "6036458c1c5384943bdaf8818fed82fc"
  },
  {
    "url": "ko/404/index.html",
    "revision": "7d13033169c638efee9c89b82fc65fcc"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "9a1b0ce0bbca60e64ce80633f0d9991a"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "e7e6f1a62142f16abd76f43ea46170a5"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "60d067b4bbfbfd14951c5fa6e5a3fb1c"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "d63ed8e5f21fd72aa3647015f64d06ad"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "6e78ac4505c2542a773f9dadfb134345"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "e9dc139620118e45d302395854d8e6be"
  },
  {
    "url": "ko/index.html",
    "revision": "026c4c1befb334d98c82a44e68e5127d"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "93e42d16f5b8b63b052a2f8705e30d16"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "b85ae46c77a0f4fcdae57c9e730d7218"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "db30c284aa679bb54836b07133596621"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "2aaf19a0a3e7ba624102763b995be371"
  },
  {
    "url": "ko/team/index.html",
    "revision": "f054d8354bdd1eb4071afc0f0ed08a81"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "fabbffa56948c413145dc30963b95ff1"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "8b90cd137f393d7b12dda82b6f58d4ed"
  },
  {
    "url": "team/index.html",
    "revision": "455ff8d7eabd6656c854e93fda3befe1"
  },
  {
    "url": "webpack-runtime-2c74060339181f1db120.js"
  },
  {
    "url": "webpack-runtime-2cb8c00d2b6c177a7ff0.js"
  },
  {
    "url": "webpack-runtime-9dafe063fbb5c497464f.js"
  },
  {
    "url": "webpack-runtime-d13d40d9ab19fca29263.js"
  },
  {
    "url": "webpack-runtime-e54935f4e484f984b8db.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "4fdaf23d85746494fe8d1589d2a0efbb"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "e196182ebe2f235e55316c24dbe4c88b"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "2e5bcd8b62282d84d006aec7b2970295"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "1d8923327c92188940363411e957313e"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "15635d0b4f3563abeb4e956181a0a995"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "a4343c8752ed85c057bb38ff9a7cde81"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "55f2e78015646582fdd9ab3a33c12dbb"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "673bbe5767abc823736786f4c037b985"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "55db6a2810f6c3175bd12573e4c42d31"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "a0ccad26e4f9d9b82aa7e1700376381d"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "2a774643ddfb736b71ebb1ff34b681e3"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "2636b9a51b58287940ed9b3a1ebf1ce4"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-2cfde297e4abfe629027.js`))) {
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
