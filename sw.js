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
    "revision": "ddf16ccecaa22c2095322ea80f43072a"
  },
  {
    "url": "404/index.html",
    "revision": "0467de254aea1ade8d4431cecf653ea0"
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
    "revision": "0448fdabe24a36311a712b905b3c4707"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "9768fe320c1e177b1cfe97f4e0b5369e"
  },
  {
    "url": "app-6afe0d54e4bed382840a.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "bbcb6d0f4201903117b05880e30a6264"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "a022c6c6659315ced43ff7e46cbf0559"
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
    "revision": "1c19d2560a9eb5b9e071078024371fb5"
  },
  {
    "url": "en/404/index.html",
    "revision": "1b0f34c99dba8cde299628e8b51a98c2"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "c7c3b9086ea96ea2963752f62ade2620"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "bcab689a96bfc9a414b14408673d01ac"
  },
  {
    "url": "en/battle/index.html",
    "revision": "cccd1653dc57454a6e3d4656846416d7"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "82ef26c76d5c584875fabf3b5f7dc423"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "44053652aacd15a38738341f420f5ad6"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "ec5d40d6bf749a32f4f61e99099eb1f4"
  },
  {
    "url": "en/index.html",
    "revision": "6d84460bd75bb5e74a405ef5064d57ae"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "ff4785890d521e7fae7eae81c4bf8676"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "94c967bcb944848d6be9a1694dccf275"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "6d641e78db704269ac6920c5abe690d6"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "0ee68d0273ca0c094bc761ec0388e032"
  },
  {
    "url": "en/team/index.html",
    "revision": "4eb3ecbaf5b468ae76999df75844fc4a"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "1d10a90900d4c45ba36bc476cde07d2b"
  },
  {
    "url": "enlist/index.html",
    "revision": "bfe9c0e4570afba5b78fac6ca74d8453"
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
    "revision": "13d11e82087f08cadeaca15760abe94b"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "3552e5cf6963d5a0117667312c69d451"
  },
  {
    "url": "items/drop/index.html",
    "revision": "07126166b925dcb5fe3cc0a529b25923"
  },
  {
    "url": "ja/404.html",
    "revision": "d965aa97f03f5a83bfeaea9a4e65a48b"
  },
  {
    "url": "ja/404/index.html",
    "revision": "03350e5d15594247234bc69b82608596"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "cd5bc78c574aaad0a55bd1711c6118e1"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "93afcd27c4932f84e5cf01880a4fae7a"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "0fd8ae98ed2cb4d3fd56aed41af0617c"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "de3e007b1855bddffb44375b4f062799"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "48990af0982af4d038743dd7b903b26f"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "9b4ea393b1a6296a53801c5bab257dfe"
  },
  {
    "url": "ja/index.html",
    "revision": "f900ab1df638f401e5a3e5d0fd096501"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "ace1277c1c2dfc67b1a2d8fa7b8cff41"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "79217557aad370510d470ac7020ba84a"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "c9beeb664e3d6b755d34d12d27905b4b"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "766baecf8f9750c43e3740de5ebd1b53"
  },
  {
    "url": "ja/team/index.html",
    "revision": "0bd59936b7a011dc65359fad5337e90b"
  },
  {
    "url": "ko/404.html",
    "revision": "1444bff37c2bb234ffbf704c77c20a4b"
  },
  {
    "url": "ko/404/index.html",
    "revision": "95da608b1762920c821b682ee07e33cb"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "f630b77b6e2a788ee0b2b24882835978"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "f828f00ed2816461601ae453325ae32b"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "19df9e61888f0df19b696f25e03edd56"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "ca304283b57e19b19a3a9569692f6113"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "819a5de22b9e462ff96b013af85a718a"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "f5b17797197c68481b0f92f3ee669a65"
  },
  {
    "url": "ko/index.html",
    "revision": "8353018f36ce7af8bf683cc6dfdba61f"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "445dd7f53b8f3bab5c059ca5728f68fe"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "e0cf060e25deab6bd7bd6528f5a25cfa"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "79db0f0040d08116a2280f815f77a85c"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "af20fd46c666ecc408bc69dfbd6d3202"
  },
  {
    "url": "ko/team/index.html",
    "revision": "2bf90a6c445aae823d34c26aa7dbcef6"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "22718bb1fcdc82357287de4117dc1aa2"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "e99dc8286ba9fb519e4abc3ee5af2ca0"
  },
  {
    "url": "team/index.html",
    "revision": "fad6ed342a983e24d11b097d16c84d89"
  },
  {
    "url": "webpack-runtime-9dafe063fbb5c497464f.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "bb6c86c72f6c8802cf5239e73bc854f6"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "8a414bdae1c4c073e243b32ca44c2476"
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
    "revision": "beb28fa6d48d6402d1cbcf85dd26b34a"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "3e93fb1fc2e8c10469c948dfce180415"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-6afe0d54e4bed382840a.js`))) {
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
