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
    "revision": "93fb0c6ec103b0779bdb807868e6e123"
  },
  {
    "url": "404/index.html",
    "revision": "25f33ddee4cf2f092099b4f9a0df0ffd"
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
    "revision": "011c93ed5ac4993c2fca3aae7547b937"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "84453b51f6e7ef0d27e4570775fa4c21"
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
    "revision": "8f826949a7267c8a6ba7c0ca3be15ff5"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "479ae3c33e2e88c5629365fdc8a0a782"
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
    "url": "component---src-pages-analysis-result-js-87aab3a128b671d7b42e.js"
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
    "revision": "818428d22738f0a55e5d1ec841c2baf4"
  },
  {
    "url": "en/404/index.html",
    "revision": "ef459c466ea4a5f5443552bb0bd2517f"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "da8acbb22eee98605ee68c2f67d6f0f5"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "6efcb7f767982188f0fe57c6dd4841e3"
  },
  {
    "url": "en/battle/index.html",
    "revision": "594577e264bc81b3b2f1b7a451ea5350"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "a6375e429dba422842e443cba7db3b0e"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "e48c85acbb9581b12744746baec063b0"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "34d1934625a4831804fef36efa5833f0"
  },
  {
    "url": "en/index.html",
    "revision": "87467b87054d3d4e6c94b4f813e00f48"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "6b9625c8379625835693f63a26fa494f"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "36a090878cba052f296a34e9462407ec"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "2628ca62fffd0d4126144020f0b8b5ec"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "fc3600eda83a543c23dcfed324b54971"
  },
  {
    "url": "en/team/index.html",
    "revision": "e589ba1cb5a01fdf34b809f3a7eed01e"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "078c334dc00e106df612d697356e40b0"
  },
  {
    "url": "enlist/index.html",
    "revision": "1b9e972f120a20ba02cfa6f6fc9e08d4"
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
    "revision": "e0f2a86ecb82cde4fb335f8f33023007"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "ba80967cbdc0362b3cb28bd0d46fbe82"
  },
  {
    "url": "items/drop/index.html",
    "revision": "834588bc37ebf8d77939d4cdcd2232ff"
  },
  {
    "url": "ja/404.html",
    "revision": "6dd627a6107563f00e8d11b616c6300b"
  },
  {
    "url": "ja/404/index.html",
    "revision": "becafd1c57b4439e6258b7e75e24d47a"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "2f127e38cdc32ae27817d85503998a5f"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "4d68e28274db1c9f03eb353a610e38a6"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "09ebd5afac3b71d0ac5ae9112045423b"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "2f1bb093999a67d8e9f87a3c65f50c2c"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "e8a327b4486ec522b13aef7e47b282a1"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "6646ceb427eed6a2f32da469c7cd61fe"
  },
  {
    "url": "ja/index.html",
    "revision": "a7f70cfad8da288040bf2684781cb958"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "e88a664eca2d2a2f1d0bb619220a8f01"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "8f43c491a16da083650781671d86fc8a"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "46eb723d84cc13303992dab69724cc3b"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "7367392304cd6c2bac736c543fb42adf"
  },
  {
    "url": "ja/team/index.html",
    "revision": "35ed6a29bbd694d4af78a0ffd101bcd1"
  },
  {
    "url": "ko/404.html",
    "revision": "dec60d582e61ad5a41e6701a9543cccb"
  },
  {
    "url": "ko/404/index.html",
    "revision": "22b74a3ef3213a43bb4615e4f0cd031f"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "b5420724a3ba3e16518a09a470cad453"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "2f45b756ed3b834733d575fef5136149"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "bb41ae0a938d25ce4cec997cea437c06"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "c8d6f1102bd484f7f47b62013e17c9ce"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "5d770650e3365ef9fd0120a16cc284c2"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "0c648d00173b3747e1f5deac621477b1"
  },
  {
    "url": "ko/index.html",
    "revision": "e0b9a155f01d1bc5654270206c40b852"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "167e9f823deb53f221803694413878bc"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "0ed09135b9b4b0e30ccd594b78cbcc57"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "2d496e7983a130170447c5d8e09f5ff3"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "4136ebb2f87d2af598da597487e21cb3"
  },
  {
    "url": "ko/team/index.html",
    "revision": "97fdd7c9cb917ec999d7d8851f0aef07"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "fdae698192888ed57dce1888762a8cf1"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "ea1c86e022d8a79d39c3d9dc48d13e44"
  },
  {
    "url": "team/index.html",
    "revision": "48d7aa0b567dea4e92a2788c0d64a4c3"
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
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "69771f089bc927eb6e8243f7e33b018c"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "6e2824116b57391f9379ec70d09d1e47"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "8faf4a9efc0d9b84dae2880faea8ac71"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "bac33aa87913092b1257e1670c1c893e"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "fee6195e94cff5c9ffe4d542146eb71a"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "44ed7182a1ba68544092d10903ac5961"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "51ecce058794c6ec91fccd1da3e65ac3"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "c1008e67cb91401446675d9dff74823e"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "a7aa881c5d1b22964fd5024b04424f5f"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "410fc173bbe06fcc977596aa510b1536"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "eb7ffcbd7095d10ba8d761c0035c0dd0"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "86f07940cbb3b5f289b7168d4e6d347a"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-dc3b935083c695bdc6ad.js`))) {
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
