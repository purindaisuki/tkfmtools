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
    "revision": "ec40778c4dd05c1f8c1c5e46d9b70704"
  },
  {
    "url": "404/index.html",
    "revision": "33d24515562455ffe5b825b4390e73ca"
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
    "revision": "24bd27b724d30ce079426602add30126"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "0d0c7b1d3613ec17f08ae5c305b24634"
  },
  {
    "url": "app-7d2b464ed15bb6dd5c25.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "8e646d05190c25335232c07187efa757"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "c924d53f15dcb1a2f7928305d50e9bc9"
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
    "url": "component---src-pages-analysis-result-js-a56b2da98fc173e1a88f.js"
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
    "revision": "bba6dea5c1d63c81fde29fae4dcba058"
  },
  {
    "url": "en/404/index.html",
    "revision": "fa0ab7d1f4806236e4c0461f46827ee4"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "ca5f622f269af31a15a3543d946dacab"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "b87de51c07c550936962c40f5fefd5d3"
  },
  {
    "url": "en/battle/index.html",
    "revision": "44a23743e8f4b69a655724d159745614"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "e5d58884839556b09d50c64c7dcfd110"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "37d8ce419408f46419dd0d414e11980e"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "e185921ab28b5dc64677db1f314d9902"
  },
  {
    "url": "en/index.html",
    "revision": "39c220e282cd0330a254688b8a452635"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "ac2167c36737fcb40629eaaa277cc91c"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "da17f257f0a8d7f56316b7c8afe94974"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "b59c7086320405648d8baa9ada911144"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "909f40bc7c88b2054029c79adee02921"
  },
  {
    "url": "en/team/index.html",
    "revision": "9b9065dacf003ccb394de5800e34518e"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "034033e5bc51e46a28120db1ff7339bb"
  },
  {
    "url": "enlist/index.html",
    "revision": "055b067566bc2797680dc4f1509c49c4"
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
    "revision": "f8db8c547ba86964382df8d6569e67d8"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "42570f7980087f5ef2b4ece659ecca96"
  },
  {
    "url": "items/drop/index.html",
    "revision": "3f087d8824b458908b2682e99235e623"
  },
  {
    "url": "ja/404.html",
    "revision": "b7a4796fa1238d5942d05ca14140f1d2"
  },
  {
    "url": "ja/404/index.html",
    "revision": "fe7690b2bb5c137de86f130fb1a16b46"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "7caafcb6f266e20a9bcddc3d3ba288b7"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "2038fffa07627aeb96dbd29fef138a92"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "bd71c7805f3f1689c0f10595beb2d062"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "097374784fc48ed89fab524d93fc4520"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "0c06ede644eeb1086b4115b9711b805b"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "afc089c2870c9091b710b612219a7bf2"
  },
  {
    "url": "ja/index.html",
    "revision": "11c8360313ba6809c7efd42cb15de599"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "f186f6c3ef168b3ec62772b89b6125f2"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "117a7849c844950d6db509cc5fecc898"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "142555cd078a4c79b1391c5cd4d291c0"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "559137ab69a03b5e445950f31290a33a"
  },
  {
    "url": "ja/team/index.html",
    "revision": "e7f45f53c46242a6e04987a7caa1dc76"
  },
  {
    "url": "ko/404.html",
    "revision": "d8c3df4e10f01323dc22767838e95220"
  },
  {
    "url": "ko/404/index.html",
    "revision": "ac845eae9823e4e1dfae0ff2bf4af088"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "cd6806f8f137ceb2b0c14b981b9d6e45"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "058b2aa70e47a776e2acbfc54c21d182"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "7ff21510f7c7c99f090305d690cdc974"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "c28ad0cdbc040d82edbdbedb0cfdc073"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "18181ba0dccadac74c424d6a81e3c2d8"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "4df2f852a14c761631d408aee61ebf12"
  },
  {
    "url": "ko/index.html",
    "revision": "f4f01caa62d5b477facfda5b0a4dd774"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "1b248fbc5a58738c2893d06ebe380781"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "88cd236cb05990ccfaf8f10d41374400"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "2ef994674631706c0a98380ce9763fb3"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "fb947ce1424e7ad430fe9dcbe34b25b2"
  },
  {
    "url": "ko/team/index.html",
    "revision": "b0a40a0f5db34f8c3a2c2e03e852b122"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "ae577b95f46f8debc15803d071e81d03"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "272b809431214221327544e7065afbe5"
  },
  {
    "url": "team/index.html",
    "revision": "e3194db4c24ffae6225febae1a26bc3c"
  },
  {
    "url": "webpack-runtime-7c6c36e0cdf24a2e0be5.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "15320c4aed0eaf872d4295648eb171a7"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "393439e4c2564296d91af6da65e780f9"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "b330d2a6be7d7445e3c6c327ac642911"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "41ec915c3a4e96793661cd96cefe76f9"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "04dfc25606347cfdc680de47a76f9126"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "5a9a0ab0c26c5232f43de5d545f89f97"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "e540a79870e4ee7b0eb8d9200c6ff26d"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "2397c4b144992eb0a60226e0dc4b10da"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "1ecbc9be4aa5fdd382b21dc0bec694aa"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "83c9655acbdabb57cbc0274c3b189d26"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "c6862789b8e20b81bbae37facf28fce0"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "4fec1d1e0abd8cf6df79a0585dccb19f"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-7d2b464ed15bb6dd5c25.js`))) {
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
