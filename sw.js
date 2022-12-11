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
    "revision": "12309be71ddf34b8437b10209e7c49cc"
  },
  {
    "url": "404/index.html",
    "revision": "c4e4155c1c67c6653e024fa689e4eda1"
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
    "revision": "a12162d89a4e1ce0a00659ee70c60c6d"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "83d695a3fe1377ec1e8ae5ff00f2e8b7"
  },
  {
    "url": "app-1ecdd58deae1b6b68f68.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "0dcf3a85031054470b3bb4e471d8fb7b"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "aa54e07a25a49bd2bfeab7b73dcf9092"
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
    "url": "component---src-pages-analysis-result-js-7b8fbf96089b427151a1.js"
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
    "revision": "9691afea7d6dc833733b5db5c497e4d8"
  },
  {
    "url": "en/404/index.html",
    "revision": "ad25a6ac597dd55d83bf1d0973a656c9"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "cbf544c01e24d340294425006762e10e"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "2d987911e9371567d46ee24e8ddb8e72"
  },
  {
    "url": "en/battle/index.html",
    "revision": "42969dfd670cdc2e3fc6c29ee1192429"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "f35eb07f8cf3bbf5b587c384fd537025"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "e56b61de6b51389e1d848f4c952f7816"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "e7fcf26710a95ac4bd9c6561364d0519"
  },
  {
    "url": "en/index.html",
    "revision": "e571858f77899969f1126ada3da20a3b"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "cd41058836d30e4aa0732c34bca1b28c"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "c01b996b0a2334caa1eb1c26116e9251"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "2891c272202d5d20c4be2e0a236e6202"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "1d08701d141f8c120c11d1374de52dfe"
  },
  {
    "url": "en/team/index.html",
    "revision": "3d85cbe4d6da169362b74a03270faaa3"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "c1bad3b2b49f0ce5c34d3e2c2d03299f"
  },
  {
    "url": "enlist/index.html",
    "revision": "3b563602bf554ac3c62536d9484ce4cd"
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
    "revision": "d3054273fe723aa9a21ad1a7878d0847"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "2def6b09cd150adf2cfdc7230855a13c"
  },
  {
    "url": "items/drop/index.html",
    "revision": "dd6feba0c8ca2cde350f82d2eb705798"
  },
  {
    "url": "ja/404.html",
    "revision": "f5d1fb5a38f55e68d1a180907ed86579"
  },
  {
    "url": "ja/404/index.html",
    "revision": "9df252be05dae631d72e2c825ad535a2"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "e915da9fbec61d16438edd7b3c99a776"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "f7ad4d9d3842622ae010f98b340a3462"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "1d0c0e01e3d97686a7c2802d924cb9aa"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "e5432681f61f7077e393bd058e903ae0"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "7a11123aba78fc32d673a9d455c949dc"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "266f32b7dd2cc0d320cd101d8a7a37ca"
  },
  {
    "url": "ja/index.html",
    "revision": "24feca4208ff315ab80e26fd9721e48e"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "e57084547d33c9a317399c5a3ac2ca7d"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "fe26d9ecb1efc61f771aef037760f286"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "eb668db2f8c3a846da8ad77865f86549"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "61baab18792c76987ea963ecd904b2aa"
  },
  {
    "url": "ja/team/index.html",
    "revision": "f70d4dcfa20e844dcd44b689277def44"
  },
  {
    "url": "ko/404.html",
    "revision": "ede0c63f330538643f22e0a4ee691485"
  },
  {
    "url": "ko/404/index.html",
    "revision": "d1938f0aa8bb0cd01bd2462cb1b7ccca"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "2542711ee873c8b82e6ac8f37db1c8fe"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "9be84ceb5d28ad7e9f4437174d678109"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "a3111304a961ceeda710f4e9fd7d66c6"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "3004389de7c95f0663da4895225b1d41"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "a98e6e16373608f2951c0a0789fef615"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "e83881c254f8b4fae3801555581cba9e"
  },
  {
    "url": "ko/index.html",
    "revision": "268e5ad8349159dd78ae2cccb4909b45"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "d81f6f27ee81f62edd3f384c80820eea"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "222d58d9a8ed8c5ea9a679e36683eaba"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "5a5d978527b3f90d548b64f42a1e39ad"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "c697575cf8b639ae938f7ff555c60ddd"
  },
  {
    "url": "ko/team/index.html",
    "revision": "6469208ea1ed71ec739020915aa69f55"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "3e744e6cec32eb0b557b1dbc36ecf603"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "5083ee06a6873ee5bd430b5d8dccb704"
  },
  {
    "url": "team/index.html",
    "revision": "2662d20f7857dd171df8746fafa59081"
  },
  {
    "url": "webpack-runtime-90ba3a255c5c602867c4.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "18e1ee7c71d295e6362fd349c8cc3a88"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "0caa4fd088eac652db4a72e62fe61715"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "114214621488d5910a26631f3391d8ac"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "f22558ade18a5692e7113079aa392b24"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "3403aacddd2d4bc431f47034ab79d6fd"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "b6938cc55a3fe2a093a58d73983c6eca"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "7b6762de24761f93a13ec6a8b2dd93a7"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "5fa54222ae94042130826cc27bde08e9"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "d6e479f94aa7b2651124ce729a00bed0"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "066361a49103b45dceb452a1cc4aa987"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "fb60921a25bcb03dd7cd4055b0faeffb"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "196988bb11a2bb3d093f278356989aa4"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-1ecdd58deae1b6b68f68.js`))) {
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
