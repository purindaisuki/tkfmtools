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
    "revision": "f6a1c884395a18911519c8314279ab02"
  },
  {
    "url": "404/index.html",
    "revision": "3d370ca9f69bb26f06128fdb2ec78481"
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
    "revision": "bb6beae7d674584fcc2091c70a575b6a"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "3eb21b9944ea279fecaa955b55bc2360"
  },
  {
    "url": "app-ac9734a877bc14745992.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "26e734ffefa2e777ed70f341517c6267"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "ffc248ea8943ebc5934f77c14c131459"
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
    "url": "component---src-pages-analysis-result-js-41c36c3643ba9369cb2d.js"
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
    "revision": "9077a355bdb7a09dc137c4fc7019852e"
  },
  {
    "url": "en/404/index.html",
    "revision": "7cc173df6bcbd0eae1b9f9feb2c6551e"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "04c6183983f79db1f9f0c903a392d95b"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "0abd7b5dfabe5315def56ae43e1f990c"
  },
  {
    "url": "en/battle/index.html",
    "revision": "1adedeacde380bbe672cacc85eaddfd7"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "ce1cbf42664d1e0b5b24d65325741eb4"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "551775b04f4e087bb509f60e6995a936"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "9e8fd360f305bd5593dad96ef987f72c"
  },
  {
    "url": "en/index.html",
    "revision": "a2be1622e121674b02e5c0f79efe4bee"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "7ecd8f3d61d83485bbd9905ba2ccaca9"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "709e4fe12ddddd8966847d0d7c929e61"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "b2af1431a9c9d65bbe0ade7ba49cd2be"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "b4839466ce78050f2291a905b4abb745"
  },
  {
    "url": "en/team/index.html",
    "revision": "d738f3d3c5eb5542f6cdefe3f7266be5"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "5201e650b9d19bfe89f2b5f5323b473e"
  },
  {
    "url": "enlist/index.html",
    "revision": "7d9d90ec88a7f0f3c67cd1afb34d368e"
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
    "revision": "4382c1fded307801f3437b49394a5828"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "4e5376f25d32c223e6fd6c2f528bf00e"
  },
  {
    "url": "items/drop/index.html",
    "revision": "5725d4722fe5335fd3391a023ecfb0e5"
  },
  {
    "url": "ja/404.html",
    "revision": "4db95af93151ac35953f85e7b52aa52c"
  },
  {
    "url": "ja/404/index.html",
    "revision": "0eb54e27551288c4977a6bbcde0f2574"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "7cdbcd820e9432ccd914e43a18421b68"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "de2f80544cc37f8d07aeb2a92336c930"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "22ecdb13ff56662d387796cbaf2cf15c"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "0c8e17d366120e0e7cb639b64f23d62a"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "d46efdd1ccf22f57c3c12d94637ed212"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "bf1472dc77025de591f7d576547028e5"
  },
  {
    "url": "ja/index.html",
    "revision": "c9f0ca7043a81ccd8beaca101329617a"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "b64bca36a95ea4daef279f759c30ea00"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "b0fa8541547267de45c7b8a27405b079"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "59b8d8544a78c01e8080fcf7512b6268"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "c6aaa3c834599e378332f8df82017c24"
  },
  {
    "url": "ja/team/index.html",
    "revision": "4be0fcc514a162d1c5aa16d1facdf7dd"
  },
  {
    "url": "ko/404.html",
    "revision": "28a2a8e19cae21a9b4f79b4d14d41f02"
  },
  {
    "url": "ko/404/index.html",
    "revision": "0ac12056beb24e305ad88782fc2e15e3"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "b6ae409fd81e72801d123af076dbbcbb"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "d9cb36ac13ab2d4a46247803a2b0937f"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "02f8dd194f96da7cd4d2c67eccd821e8"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "71e6f996547ca0c68404e34736e4a5f3"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "023f2758c12aa617df8c6d4b054eedb9"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "be906bf2a07e770ca87c640455361e00"
  },
  {
    "url": "ko/index.html",
    "revision": "441f6bd43057255acd25f6759d1d2108"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "bbec082aa560e7231653ad46e6ead25d"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "ff3a5cb34f57d36f758ac6c007b16bc8"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "7a57d1b6cd8dac20d8c746dc600ae78d"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "3d69c44a7bc97fcf10ea29f41ca4e237"
  },
  {
    "url": "ko/team/index.html",
    "revision": "a6635a6c39f66fba2c2aff78ab90efd1"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "1149c607827e7e77994a8e13ae5c58c0"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "cfb4db5ddf96e3623a0d41cea280a7aa"
  },
  {
    "url": "team/index.html",
    "revision": "84850dcc7d0e9b5ab4364471625f3bd1"
  },
  {
    "url": "webpack-runtime-fcdffc748dbe7aa8d038.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "1e33f96e944790ebd92b535b68753042"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "eb97e44a4192a1aedb27751dc0524505"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "4029695d2411289e75c5deef3c14530e"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "7300ede40b2a7b8bed3f9907b1533704"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "69d7bfae37de7dc3a78d03d4ede3e5dc"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "44f763331fbfefc1e37124d39aa3264d"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "96a96765a76297c871d5475c137047f1"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "b41c3d167973364c26f24afd2edd21f6"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "56c0af8c99cd56804a3ec655f3756212"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "4e93d35bc6418f2c4aa27fa81c570131"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "09cc84534197e59c3e5d5e44009e28f7"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "40abf1f1a40668008a8f062e92a97ba1"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-ac9734a877bc14745992.js`))) {
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
