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
    "url": "3118b2d3-ea35752cd5f2f76b9215.js"
  },
  {
    "url": "34eaa9ba7885c2be72f0b944f1ae4ca14dd9ffdc-d78a4d283171cdd4a021.js"
  },
  {
    "url": "378-35400102f16c673f0850.js"
  },
  {
    "url": "404.html",
    "revision": "823159c97a5b3bce354853ea7730ee59"
  },
  {
    "url": "404/index.html",
    "revision": "798cea2e71028fbad44cecd1682f2ddf"
  },
  {
    "url": "4accbfb9ca4c22805f8a5a27dbe87689390fd05d-4d734b0d67b0f6e2efb8.js"
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
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-479ded40c4a2ec22ced7.js"
  },
  {
    "url": "8786e3ffefa4bd5c02054e170499b91b29bc5453-ca2bdc7cf49af2494fbb.js"
  },
  {
    "url": "90286198ea1aced77f746b1f45675ef1436cc742-7d350b9fe66416665d3d.js"
  },
  {
    "url": "96bdde5b39eebc18d317fdb0ab29c3402e8a4652-e0227c47e6bd06c0a9b4.js"
  },
  {
    "url": "9a778021ae307e66ed44991bf422d7272a3bc1a7-78241abea3d1d590136b.js"
  },
  {
    "url": "ad7f724d-187cc347df80051abd79.js"
  },
  {
    "url": "analysis/index.html",
    "revision": "db5a1492d1bbd36ad1f8c89743bdeeb0"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "d6671dfb6707a844b8210fe404acb7ea"
  },
  {
    "url": "app-332005589e2b25f62a2e.js"
  },
  {
    "url": "app-d488516ff4fb3a830829.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "227a61bb19beea7002593377ca9eec03"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "e0ab28884fc24bc504ee71fff4a10324"
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
    "url": "component---src-pages-analysis-result-js-87aab3a128b671d7b42e.js"
  },
  {
    "url": "component---src-pages-battle-index-tsx-03198fdddce21dd7cfd9.js"
  },
  {
    "url": "component---src-pages-characters-potential-js-c40cc195966ae3da39da.js"
  },
  {
    "url": "component---src-pages-enlist-filter-js-55093875c66e5b25a34c.js"
  },
  {
    "url": "component---src-pages-enlist-index-js-71678a0840d441fa33f0.js"
  },
  {
    "url": "component---src-pages-index-js-7ee1a6908cb0503de88b.js"
  },
  {
    "url": "component---src-pages-items-drop-filter-js-4071bf815483afdfcd35.js"
  },
  {
    "url": "component---src-pages-items-drop-index-js-64decc1367d6e8b64ee5.js"
  },
  {
    "url": "component---src-pages-team-build-js-fd8e9427f59548f088cb.js"
  },
  {
    "url": "component---src-pages-team-index-js-eb0a6e729868bac7901e.js"
  },
  {
    "url": "dc6a8720040df98778fe970bf6c000a41750d3ae-b499fe8d2f065c712e99.js"
  },
  {
    "url": "de10f4ae648e51141fd55db96f343b235217f6b2-befa3040c27fc99bd601.js"
  },
  {
    "url": "en/404.html",
    "revision": "78971af7e83af64c2d84866b24e8de38"
  },
  {
    "url": "en/404/index.html",
    "revision": "60f2a9f1322a359dcf7a0d852bcfc0a7"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "106277148a5586c0c86e53bdfea105cb"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "f9b29d7d9850ad6795777207f1d8f497"
  },
  {
    "url": "en/battle/index.html",
    "revision": "77d8d3aeaeb02c35ce53494ee548426e"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "4a671171b1e0b1b8d91c946269d18cfe"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "fc6a7dc0b1e711c5d4e4b630cb1fcfa8"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "be6df5e07a43b1853fbbe9f080c8dd6d"
  },
  {
    "url": "en/index.html",
    "revision": "29fb468fd5522eb762950781b171d491"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "ad710a679b61645de7e352ac031bef33"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "1685640142c3b3b45f084742ebf9ae31"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "62d6b7a7e49d3d39554096ee4ef6d483"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "d057db51cc8751f093b074b7a3cf0097"
  },
  {
    "url": "en/team/index.html",
    "revision": "382dc0717126b0bf9486b4575325ffec"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "17ea9bcb19152144446bf53cf0e1db2f"
  },
  {
    "url": "enlist/index.html",
    "revision": "0e03214a4416df6b73bf86975cd5c507"
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
    "revision": "87595787a74776bd15d0ca663dd8a7cd"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "72c7d0da40127ab595831d17c55e00d8"
  },
  {
    "url": "items/drop/index.html",
    "revision": "12ee644dc887c4288b58ae779c2f46c7"
  },
  {
    "url": "ja/404.html",
    "revision": "be5410820b635d345ad49612f631ef7a"
  },
  {
    "url": "ja/404/index.html",
    "revision": "50d01d42d932aefc316dce89e8ab5d2e"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "49cc23b354bed07ed55a3fbc9482109c"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "5f465c8e7b7408e891f52129af3681b7"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "0d111a94e48b33a6d32a4a7340b651ca"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "e9e7de3b178a54b6b222514b0f142db6"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "01a203074498defa17445ef450cb1886"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "063e0aee5cb716ac75658d3244ebe7dd"
  },
  {
    "url": "ja/index.html",
    "revision": "d05983917240cf1400a1d2c91e50b197"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "95e788ee53710d7205e664ba3569db7a"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "aa71d4b8f517d481744e68c910d42f11"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "2176b1e9ecd5ed357088b607d02565df"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "af229147cdc04a9fda8e7300443a4e84"
  },
  {
    "url": "ja/team/index.html",
    "revision": "77c1f9a796f3652a8715d35c2ab6e2e3"
  },
  {
    "url": "ko/404.html",
    "revision": "47819458f30b056776e6f54f35a4416f"
  },
  {
    "url": "ko/404/index.html",
    "revision": "25966d34f527fa64bada4dfaf65686f8"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "914cd107f35a2c9607ef41ddf251f77a"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "e1672ec51121bb90ea8fd11e41d3ca16"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "42ebae75d44ed063c1564e4bf650b9d1"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "177d1d2ced04bb10d0f8272809c8d913"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "c767c1e2ea35b3e5b116622bc14a48df"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "2f611415e02e55b3560dd476861a9455"
  },
  {
    "url": "ko/index.html",
    "revision": "976a46a104992b5281522eaf47b8c588"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "8be3ae536318fc20dee8bdb7ef3b6d86"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "b6fd5db9d144f265c0382164ca2f7c65"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "de0d5241f67d51b9d9f4cc8652fb7c95"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "0c5ef1739e92f50563461bfb04a7b863"
  },
  {
    "url": "ko/team/index.html",
    "revision": "ed7c9e5a17c51eebf6a03ab0221c2b0c"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "5f1b22977e49c0fda761a17c63eaa9b2"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "4732ba0a1e83cec7807398289d9d7ee9"
  },
  {
    "url": "team/index.html",
    "revision": "f86d93da9f8d22205dab359fbea7c26c"
  },
  {
    "url": "webpack-runtime-f6ab9bc0b4b9f592d847.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "278526d13358f7d0d81c2c11b34dc894"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "5ddac8f818ce96673cad736c51ed4121"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "a61983f34da5b87ae19c00a98078d905"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "16298aa5c6256d8e988d0da234b83fd3"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "f4c32bddb14c88ebc585bf6af71ac5f3"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "f753b9ffd5292ae798df9c5157a4a1f4"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "cdeaaaf12f9697d617b89a9574d15b11"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "6b406e64b91e291b9d12cbe9411c3725"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "099c6a37a6df1c74062d9947dfad5230"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "81f9053ba51541766d2a3e0a0cb0b2d6"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "e24077955de1d196c7d6843558818ad0"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "3dd222c55c8f4377f67341b241a98a4c"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-d488516ff4fb3a830829.js`))) {
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
