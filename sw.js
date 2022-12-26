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
    "revision": "393b9d0eb62f41efc56284a2fc5274b3"
  },
  {
    "url": "404/index.html",
    "revision": "48a329a68472eff431b00aa99479cec1"
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
    "revision": "231a57480f36aaa1868907645ba37578"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "43f431b046b0d5ff22579ce93e677774"
  },
  {
    "url": "app-3fde17abb476d71e9da0.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "f00e1e3ec897b31b7f1f5c999203db3f"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "8ac07c1ad37b652bc30cac185ef28863"
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
    "url": "component---src-pages-analysis-result-js-0dc501ed798017220d2b.js"
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
    "revision": "b11674dbe60d0365b520bf1847c3ab20"
  },
  {
    "url": "en/404/index.html",
    "revision": "27c87451218ae1b0ab8029473d8bd931"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "cef5a68058d2518671a7d2dba3bfdd97"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "259eb87f4211f15e445f492ba7dbb688"
  },
  {
    "url": "en/battle/index.html",
    "revision": "9bc02277504eb0d8f3bc6fbd976a2960"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "c17bd790ed45d4963f34fb37f19456bc"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "9d2f342b932984b0418752d83be20aeb"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "0b9f1e16df011798e213f80bede821cf"
  },
  {
    "url": "en/index.html",
    "revision": "eb97fa4403747626960047cab21d2e15"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "67b56cc9bb3d1580b4b6ea305d26ec96"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "41c92e4032f910a9859032d3470bd97e"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "b49b9e4341de7d57831c5072caf2fcf5"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "74eb2c98fa12651cc6136f9b210c2bf3"
  },
  {
    "url": "en/team/index.html",
    "revision": "a31c8ed77d5949fc6680e4dadb1a1738"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "d09cb645645f48cef82879fee94ebee6"
  },
  {
    "url": "enlist/index.html",
    "revision": "d0d1c7035b53e53e8defdaff795cd8a2"
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
    "revision": "9da578a266d0ff3fa60e65f03aa86444"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "f98a294dc79a0ae8de2c85b78be736b0"
  },
  {
    "url": "items/drop/index.html",
    "revision": "8f75eebb8e5f38d682c716bdacad9088"
  },
  {
    "url": "ja/404.html",
    "revision": "0f12e70e7009020813838df5a271015e"
  },
  {
    "url": "ja/404/index.html",
    "revision": "6f995b34a85cb4043da64d4eaecc4d3c"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "0bc555d6c03571b5a3b839f0a10303ad"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "30d284ff90911afd418dadae46bbfdcb"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "981135abf6d318e0c72ea95b26d9ec3f"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "1016b9d09f563d1f3fcd5dad0894135a"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "41f2afbb161c95127eb890e9e66520de"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "2d56aec018f9dbe442027ecdda2bebf1"
  },
  {
    "url": "ja/index.html",
    "revision": "05399b78849b32e74d16b7c12b9d4670"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "4b1183e23809a1f6edbd9d0bb03a6e47"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "838bf102b7b3d3bd0c38d5ec7440e1cd"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "f1dd0f087f573ed0f468f1135113cefe"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "d732bfd01220117f8864b76f801d2620"
  },
  {
    "url": "ja/team/index.html",
    "revision": "988880232a76738402a764c2653655b7"
  },
  {
    "url": "ko/404.html",
    "revision": "ac5f073ad2902548940131714284a293"
  },
  {
    "url": "ko/404/index.html",
    "revision": "03e4a1c55c55c4183d5ffac24544b1be"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "45851121d99c731dd2deeb0949dc0497"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "d682ba8495727f1553fbd874efbc38bf"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "f72d0e982b98b55ca33567ea1b06f4b3"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "b3f8ad776f2be559f3b5a351bc62698b"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "2036d806f6d087aa70c87c21501b791f"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "0825a80658dc14d71e0dd19d564f8427"
  },
  {
    "url": "ko/index.html",
    "revision": "47683350ef1c7d3832c9af491a69b858"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "83aa8ce3bbbb1884f67456768c8a2882"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "fb4e356466237ce9f3bf2dd06a6f6add"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "ae97e694f8e2c17e314345bcf219100a"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "d9f05f55573211eb009eb39345cdbbb6"
  },
  {
    "url": "ko/team/index.html",
    "revision": "97c2846e8517a3fbe86f769f2d86f8be"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "7f4fc35abe88bcd93229bc3b988f17ad"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "4744e2e7e2893d25395ebdd34153abbe"
  },
  {
    "url": "team/index.html",
    "revision": "717e5944b30dd2378250acbe6fc1ab11"
  },
  {
    "url": "webpack-runtime-21d02950d640043ed7b7.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "ac6295189776bf5abc0d1da91401d1b2"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "313f6b6dc3882f030086619f3f001dfb"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "f15a323c802a6c8bb8845d47acece4d5"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "c736a94e7ca4af74d5b829ecc508421a"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "b2b6edfc11bf2a2d61b5d8feb84eb55c"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "985ba74bcb7ba747172693819cfacf11"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "f483aaad38b745139d19fbe01d733a76"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "062726cfbdbedb95c70fdbae43237798"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "b86cd0a97946da19110c1a9ed0da7ded"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "a5a2ae0e93db3f4fe0b11d37f7f7bcc3"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "5601888ace43f6e02455c986cf0b38e2"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "6ba85d19b3508e368c55542bfd58fee9"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-3fde17abb476d71e9da0.js`))) {
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
