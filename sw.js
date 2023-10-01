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
    "revision": "621a39334a683c29cd55253009fc30c7"
  },
  {
    "url": "404/index.html",
    "revision": "151cfd60e0537f3967ac17c7b0261b28"
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
    "revision": "87f69eeb6d8529d3a45689a3916a9dcd"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "2143661505670e5ade4927546e726a41"
  },
  {
    "url": "app-305901b67fb8074aa7c1.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "08edf1740b78da1741e8bf9658a9355e"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "5d4658fffecfb0d132c83a9a12b2508b"
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
    "url": "component---src-pages-analysis-result-js-6a96b98b5a51e2c3aaf9.js"
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
    "revision": "3b9c4ea0c802601685d689d802b1920c"
  },
  {
    "url": "en/404/index.html",
    "revision": "92d97f0324113ebe6c83e99e9bcf0da2"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "7472a762d7dc0f8188817918dde44bb9"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "b3fb01a4a38eed108eaa4b55366b29e0"
  },
  {
    "url": "en/battle/index.html",
    "revision": "fe9901622afc35647cdf38b7a3ce3486"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "ae621e5d1378a65e289c3472c0b1d9db"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "bfa0a396b86be68655b703582d6e78cf"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "154d3a6dd903bdc5d533e3406eb234a5"
  },
  {
    "url": "en/index.html",
    "revision": "78ce9c0e439d3a7351c847a2574ba9cd"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "8af310756a21e80e8bf6ad462dbcebf6"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "7f33fc2330616c7f0ff68c49500a57ca"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "0e32cb9106c864fd690c60f50487c909"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "516198696cc8aa3bb75ec49cbcb6ae9b"
  },
  {
    "url": "en/team/index.html",
    "revision": "da3eac4f3bdefbb32582472ec5854426"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "918fd6b093883ffc2ff85f3a1194073a"
  },
  {
    "url": "enlist/index.html",
    "revision": "536cc1bd96d15e522bd1fabe3c881eac"
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
    "revision": "4c7eff71c41c9abfa2ea7fce0335b2d4"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "1d031b2df97925803335b825bdd090fb"
  },
  {
    "url": "items/drop/index.html",
    "revision": "8a9dddb2aed4b99964a9d3b34e388800"
  },
  {
    "url": "ja/404.html",
    "revision": "dc44b60e67e332c8c601d24c2b56ef7c"
  },
  {
    "url": "ja/404/index.html",
    "revision": "6df07f114853326ea20a0600edbe6f3e"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "0ef5828e16e41bc7f28c40ddc773928d"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "6deae6d3a88d099651bbd97a027f0c5d"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "3495f6dedc6898fc432c639329a5692d"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "a0905f63fe0108210c2e66b82a03c784"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "d16ffc589af6e84c7902e6c43db5c162"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "6ffd8d6e41ceb2125c5d91f047cc5984"
  },
  {
    "url": "ja/index.html",
    "revision": "db454e6ef5006c8117709db7d023cee7"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "0f38ceeafcfc40516b0cf32bc9f9c94d"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "8206b9c47e390d40530be6b924bd00f3"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "d8dc614fbac9769331f10abe382913d9"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "9c1baf6f64f554385c95fed35be5119a"
  },
  {
    "url": "ja/team/index.html",
    "revision": "592e2c49ff5698f7ab295620b69bad0e"
  },
  {
    "url": "ko/404.html",
    "revision": "15be42fa4a9f9474b6661133e60e4316"
  },
  {
    "url": "ko/404/index.html",
    "revision": "5183b5f4220e48cf79fb3114773d2318"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "b7bf53dc4be5017eaa124e0382c441db"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "c21b9c9bf0f51ce1374f2378b7f65be5"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "df506a31a5a2223aed50aef0b6623349"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "0506b541c84ac9fdf29874b9eeaf22b3"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "a050f70e5734777a5e98e0707c650c18"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "8fdf33e2a59ff3a2512afc6fedda1550"
  },
  {
    "url": "ko/index.html",
    "revision": "973413281e4de0476d0bd665d320fb07"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "ace1dafd71df0e3c0ab70e19c2b54eb5"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "c8db97190f59ed0a8329a1cd8ec35317"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "a7e6b951252e21f19099152fc5de2b4d"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "4f78080d5606b51947dc792def1dc0e7"
  },
  {
    "url": "ko/team/index.html",
    "revision": "16172b0cc8d9922a74ba030cc0132fd7"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "86580696009e50e1fc067f8d4c699bb2"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "a9f7916cb749502455bdab0ed4f277fe"
  },
  {
    "url": "team/index.html",
    "revision": "09dac48ff35372d9adec8b9b759b4bdd"
  },
  {
    "url": "webpack-runtime-ed6128486e1e1f77a2bb.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "79753cd5d78291e0b3fdd607da553e02"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "dc4ffca0ee231353fea8e1c37888f643"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "83ea84d7e4b0d55791947843caced13f"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "3dc6279bde22cc1bc8e1afd5c9803b62"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "41f225d56782853ed4e58f62fdc4d8b3"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "f70260fa8ee6ceb280673a44d756aa07"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "7cf9231e12d55e383e52f72f653be26d"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "56d0e7f6a3ef58bd5325b803451644fe"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "b94647a3bf8b3ac6403940c1f6dc10c9"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "955e4ec976c174008ff034dd1fc2a2c7"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "6d49cf90372de2bc8a1af8f93e25a004"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "5a63df08b5c1c2b5b315d508fd6dbca3"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-305901b67fb8074aa7c1.js`))) {
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
