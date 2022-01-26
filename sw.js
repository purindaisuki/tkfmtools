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
    "revision": "a97fd9d0e040a1d4087e48a9a0a0afca"
  },
  {
    "url": "404/index.html",
    "revision": "c3fdbfeaa1e682cb0bf382224ead2d1b"
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
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-a519aa82f6534f53b8cd.js"
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
    "revision": "ce4c1cf41405af0347ba3aa12c910c71"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "c8dc761cae9812f2e74597d35fb89dee"
  },
  {
    "url": "app-2297d1b0605a15da9b99.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "6081c81d9cda287516f2848ef33bfcfa"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "fdd8f80c98c3fd55b71f5058b0e45eac"
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
    "url": "component---src-pages-battle-index-tsx-0e9dfa690977f8880ecc.js"
  },
  {
    "url": "component---src-pages-characters-potential-js-c40cc195966ae3da39da.js"
  },
  {
    "url": "component---src-pages-enlist-filter-js-1ae5a2ff6fd873b01d97.js"
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
    "revision": "33b9a1e71052eca966f0c2a9f28dfbb2"
  },
  {
    "url": "en/404/index.html",
    "revision": "fd3f85f396a0bdf2d32a95452e34d938"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "1d055f3b13bebf23f187e31c9d698219"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "7b16e418d3c88859c8e64c5341139b5c"
  },
  {
    "url": "en/battle/index.html",
    "revision": "84230348fc75e941dca72c3115d5161c"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "a60c5cad246dea0059e4689296efd613"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "a5b79b02a7e7a9b7da6b4f9e9e17e09c"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "2646cd0fde80f4eed1a4ba8dc6ce8d37"
  },
  {
    "url": "en/index.html",
    "revision": "e35ca88a1a2f1d0cb6a1e51ebbe9341c"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "e790abc1b534d1f0b0cf84ff125938e6"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "bb8766ad4d2796e4335add65d0c7006b"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "d68ef652089eb5da6b37c00eb8968f1b"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "1777a881f2c5022fc1fe5d165f69dd43"
  },
  {
    "url": "en/team/index.html",
    "revision": "8929b7d611590a214ed8d4992db277c6"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "0c72b7def4caac224fc9566dd4546f09"
  },
  {
    "url": "enlist/index.html",
    "revision": "69bd7628126da744856df5150b751dde"
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
    "revision": "7a57da8c494dec0695c0ee453044daf8"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "e510b173a508d189d1ab3a5bf19175e6"
  },
  {
    "url": "items/drop/index.html",
    "revision": "1334059b16701e22a13d3ae3747fd072"
  },
  {
    "url": "ja/404.html",
    "revision": "ef3d341a5afe08106b0c8a2eed182a34"
  },
  {
    "url": "ja/404/index.html",
    "revision": "25517be66c9ebee599a41acb4e433e10"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "a9bbe0609858112a1918fedeb49b26d6"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "6d1aa5682b090132a518b1ce1d41feda"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "05ca826149571f7096e74db9814003dc"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "814d59b474198f338d961b796ed408d4"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "4150cc42eb921de79a32ea347dc94830"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "8054208d8a08e67b166e511d4480540c"
  },
  {
    "url": "ja/index.html",
    "revision": "559fe4b1e686a9155657821c3cb56da0"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "a2d0e7222db2f7aed5e0e56f2420a0e8"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "45284576485c7409333c33c495402dae"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "65c129b3f82614b096deb08de4999292"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "c529049bd903272de28556e692c1ed09"
  },
  {
    "url": "ja/team/index.html",
    "revision": "53681706160631de7f79cb727adc411f"
  },
  {
    "url": "ko/404.html",
    "revision": "029c7f35bcbc200d30867a7312aea685"
  },
  {
    "url": "ko/404/index.html",
    "revision": "e6a48297729f1d14c1974dfe299a9be3"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "0995ddac13fad0d25cdcebd10afc4c03"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "0b50bd2c49509e072a13a6318c6fcf8f"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "da0e7d4915c2fa9a0bc302b4818673ec"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "57921a90d79ccae2fda0685358b12b5e"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "97b5540906c979a77e08e353caa82c77"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "933eca3dc5a1788e1e7339064c2f13c3"
  },
  {
    "url": "ko/index.html",
    "revision": "533bf82ac35ca185d3b727fdbaf9fd7a"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "90a565de01c5fca7c90cb790a6b77bff"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "4e002bf6b6df4a9b370e9ab760f525e3"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "471c1d2e20fc7b83fa1132fa12b875c0"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "cbfe15606bf1142759002f04c4b850eb"
  },
  {
    "url": "ko/team/index.html",
    "revision": "8f493e128d76c16e730b36f1d27196f7"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "4346e646a5fa0be2103af09b898a4a78"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "8d63d06af011ce7c2f70db1c763770b4"
  },
  {
    "url": "team/index.html",
    "revision": "bbb5b05974860f5c37095bdf9453e456"
  },
  {
    "url": "webpack-runtime-0c8d7ce329b4b34a164e.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "bb6c86c72f6c8802cf5239e73bc854f6"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "bbc445360edbbeab7b73e72a45060ab0"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "0ac1db7e24497485c5bcfc58baec8817"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "fbf72c61bb2156eb791266655940feeb"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "713b383ca702a68705dcb901697f7b0b"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "424eb6044fd5961e6bbf7a48953816d8"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "180b9ce953635307fc68560c32546620"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "7a12e0f8b83aa286e4a60ee9ae9a9152"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "b4b6a2e7cd65d3ec34d9cea2839d4f39"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "c2b9e1ae2d7d3dd29905fd1ff9d88ed2"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "ba24aae4199762e9423db7c267a899a4"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "0e854cf600dd8a2f56542bcb5c3e2398"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-2297d1b0605a15da9b99.js`))) {
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
