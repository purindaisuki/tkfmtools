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
    "revision": "fdd8914c192419807e2a3fac3df55e8f"
  },
  {
    "url": "404/index.html",
    "revision": "69e32bfcdf9331c43d020d006c0cb2fc"
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
    "revision": "dae594c7b4be89177fe436058285e345"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "a3029f4af0ede90856252ff070a3d175"
  },
  {
    "url": "app-332005589e2b25f62a2e.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "6601ef2bb71065b6e699859311c5aed6"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "9b22b7f6ef5cded65854d0874bf2061c"
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
    "revision": "d612d26f8b768fc70ff0a5cf184df391"
  },
  {
    "url": "en/404/index.html",
    "revision": "946ed49030e0bf23190ffe2639992f44"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "e756f18efdaadadcb2ec1cf85e4efb24"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "82722aa2e2513ce9b69832d9429056a5"
  },
  {
    "url": "en/battle/index.html",
    "revision": "0de11c7ad4793bd2c0ed89db90c79549"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "96b1234a1ee67fc955f04eb472f3c774"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "d5cc10683227f67042422680ff73185a"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "487a9dfe750ae4bb6049af300e085e82"
  },
  {
    "url": "en/index.html",
    "revision": "6ef84a4f74ecbfc1a3fda1aa763b40b6"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "739cfab481b9e4ed014f18f90b7000b7"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "0489c34dcd7df3531de881c297aad86e"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "27b848d672736746b43b57633f635631"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "2e25cfdb53da9452397d2909e4fe78b9"
  },
  {
    "url": "en/team/index.html",
    "revision": "a06f787627b9b210da4281440075f0e8"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "ac588012eec66244ae58b52632e249a5"
  },
  {
    "url": "enlist/index.html",
    "revision": "e3f1b9ad887c2ddb19fb2df89b077ed3"
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
    "revision": "db13fef9aaedfc413bd10c6a8d838eec"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "38b2f08548e9c70952af0c8a99ff42b5"
  },
  {
    "url": "items/drop/index.html",
    "revision": "c78d24ef48b597398379b2bbdc7ffe3b"
  },
  {
    "url": "ja/404.html",
    "revision": "bb0d21043c65982d2f573df73519ff7f"
  },
  {
    "url": "ja/404/index.html",
    "revision": "7d69a593d28758dc173b2579670a7ce3"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "66ce59cfb6c3109fdbf380f026b5534b"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "dffa2e7a233f584a84b5822babdeff99"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "103905dc60c00c74dadc9bf6fdf0f866"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "194ebbdfb7be861fa9d4ef3f6aafec8e"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "351d5c17b8fd5aebff58471d08790a6e"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "61765247cab400844566da5a4a52ba7b"
  },
  {
    "url": "ja/index.html",
    "revision": "2acce37797bf2d6be0d0ccdd44dcee1c"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "157a65ddf1e23bf730718540c6724b5a"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "cea4710fef31853226041f63d2d068cd"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "4565c07019f5e9ebf1c3b3bc0d242f29"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "b7277ffb344c51c885571430afb71103"
  },
  {
    "url": "ja/team/index.html",
    "revision": "6030bf22f0f530859cce24051366ac89"
  },
  {
    "url": "ko/404.html",
    "revision": "d3d7cfaa57b6d68046a90bc5a2d127ac"
  },
  {
    "url": "ko/404/index.html",
    "revision": "371519340ac970fa068e85c160826a1c"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "1180135503236fe9fa67130cb553c6b0"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "36c0d164e2d0c4f8ca985191d3dafc25"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "711fa0e1edf5f430495f582531de9424"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "567ce94e603e0c7d98e7a50e87e08d6d"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "6eda663e0dfdba97106be3a5c97fa1ee"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "4e6643e3fa961c6f5dc3c1dc82856c80"
  },
  {
    "url": "ko/index.html",
    "revision": "5154d4e76f2b444e08652c6b280c3915"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "f974b191603beef20ff5442af3252bb2"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "3857bf6f68965f1e32201813cbc56db0"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "46da9bdf300e0bff83f8c49a27161908"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "3515dc73157f9dd7cd3db55c8b8cfd59"
  },
  {
    "url": "ko/team/index.html",
    "revision": "bec2ef95b05fa907918ab52bd0fd8e30"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "91fbb48fd837b7fc3f1df0e901fd78ef"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "3ffe3bb40ee01cd07033cabc188087f4"
  },
  {
    "url": "team/index.html",
    "revision": "6f7662d8fb60c7d080c17738a1ca33d1"
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
    "revision": "4ae9951312e310f06c0182faab74b114"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-332005589e2b25f62a2e.js`))) {
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
