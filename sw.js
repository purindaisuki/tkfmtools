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
    "revision": "4bf147113b07b62393cb66933aa1ca8d"
  },
  {
    "url": "404/index.html",
    "revision": "4cc50edc616d75506148bc065459e3ee"
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
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-48e5924cfbed0188b8d8.js"
  },
  {
    "url": "846-d18894cfacc48a966efb.js"
  },
  {
    "url": "8786e3ffefa4bd5c02054e170499b91b29bc5453-37776c6d811451265fa2.js"
  },
  {
    "url": "90286198ea1aced77f746b1f45675ef1436cc742-7d350b9fe66416665d3d.js"
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
    "revision": "9d4524731be3a09c9546e8817f1819c1"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "5cc0692d910152764a98eb649f3a9d7e"
  },
  {
    "url": "app-8a212bcf61f088f35db6.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "3c459cabda08cae514b67dc4f4cee343"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "c8bde7f50c2945c1f23bb6e19e46ad2e"
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
    "url": "component---src-pages-index-js-7ee1a6908cb0503de88b.js"
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
    "revision": "7c2e16d3de1442cbe192b50bf9744669"
  },
  {
    "url": "en/404/index.html",
    "revision": "7f9aa778d450470aeb120be81cbd0857"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "d71166ee149d57448c6d0d4591b71f2b"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "1ce149583e1e5eb0703964dc570f7c52"
  },
  {
    "url": "en/battle/index.html",
    "revision": "4b3a48ca8e523f905e686136ca0370ca"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "da465bc579896def3aae68556737fdcd"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "5589dad7f15a9146bc2547054877477d"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "6544092422631190786a0b53d540d8f8"
  },
  {
    "url": "en/index.html",
    "revision": "2fea34fb19d90acd3d3b39e3624ff245"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "951379ada89ea17cbf0255d29c52f166"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "7366afbd6f9d02f920b456016adad306"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "55abeadf14eb00e4913faeee8f9c3172"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "5adf2badb379e89273cc5a6cd66a7c16"
  },
  {
    "url": "en/team/index.html",
    "revision": "5b28a701b49977e27252f141b06f7008"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "87e1591d99058a623af65fe112f07721"
  },
  {
    "url": "enlist/index.html",
    "revision": "e49593f205912b8b44efe77599415554"
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
    "revision": "52d4530970b21683cb2a06ed65678d08"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "a34c3e691c8e9ac6a04200fcc21cb3a9"
  },
  {
    "url": "items/drop/index.html",
    "revision": "b8fd0241d2284045b0e4d68be784313b"
  },
  {
    "url": "ja/404.html",
    "revision": "067ffe7ffae693b726ad99266274078a"
  },
  {
    "url": "ja/404/index.html",
    "revision": "f5a23e2c4bb84ce61ce0d539777c0f68"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "81cabbccf653d25b721cb612bfa9bcc7"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "d9dec7f2321e815de25a65405ea45b33"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "6eb89951fc2c413f3917fc532e699309"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "2affc337e7f81b267b07ef7712c8f5b7"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "ffd892454436e1636897d7514ad3f56b"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "9aec8fed2ee313e3a6fbacd950f5b5d2"
  },
  {
    "url": "ja/index.html",
    "revision": "861aac77e33088debb1c7e5150ffca64"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "7780a1256bfd76a1cb3046410f762bef"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "2f9137c53fa0a282b4c55a5540895814"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "0ca69097fb5cc16c0ca354c4ee3ad9a1"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "f466b882d58f025fad3b18cd8ed8d43f"
  },
  {
    "url": "ja/team/index.html",
    "revision": "146dac5cadfd5a61601a8d483eac22f7"
  },
  {
    "url": "ko/404.html",
    "revision": "4071800dbb390ca60ec7ee51b23b287d"
  },
  {
    "url": "ko/404/index.html",
    "revision": "fbb851ecb485fa082ac35fd326017dc6"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "bc52de963ad6a19221ea2c1bf51471ff"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "d9d0f43aaa9f996891f4de5a0c6188f5"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "277589f8735aefee266fb171c68a823c"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "147683cb9049a38eb09be797d14f267e"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "f81397770287da00c2875f5146c6c088"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "259cb9d9839b1bb9e9e8e2569b02837d"
  },
  {
    "url": "ko/index.html",
    "revision": "d8a28a564221d0b66723e081f462ef66"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "8ec335c9f835526264e384aa53e1449e"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "a702ce4dbf1f017a2a560f0d628caf52"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "6b12205bbbf25da086bee817277c3045"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "2abd996fa93272818a9fa9b6f4aacd11"
  },
  {
    "url": "ko/team/index.html",
    "revision": "f4a67958dc5136df215298c97a8cb348"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "d5f41efcc380182e177657ba59e28fb5"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "491d6cbdf1d55d5d74c055321e669c9b"
  },
  {
    "url": "team/index.html",
    "revision": "768aa607fcfea75b2c80380fbf721d45"
  },
  {
    "url": "webpack-runtime-d077c4692b238faa4857.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "bb6c86c72f6c8802cf5239e73bc854f6"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "27a4910238c7c1ed0648563b74df0901"
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
    "revision": "3f5ebfb22b2724df61bfc2989025dbcd"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "d5ac1a5c16d8230e855826e0b1f61710"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-8a212bcf61f088f35db6.js`))) {
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
