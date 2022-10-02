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
    "revision": "c59f92200fd9c1d37fd19a233e235b0f"
  },
  {
    "url": "404/index.html",
    "revision": "c8a95597e8e8045adad3268d456a5d74"
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
    "revision": "4a32354fd0f72b9b7ceced6f013110f5"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "70f279940f567cd42bcdc920396a2c3f"
  },
  {
    "url": "app-34a34e096a08559201fb.js"
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
    "revision": "9a2f4b082ff7c5ea16de74824987cdf1"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "ef45d24efb61a162d7109d7648b8c21c"
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
    "url": "component---src-pages-analysis-result-js-83af0955dc5a15243e30.js"
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
    "revision": "d39d8b8cccef488ccdade3e2061bd8d8"
  },
  {
    "url": "en/404/index.html",
    "revision": "fc669f14750071c46eab423ebf082132"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "92150a675c55869e3a14acb3e95cae28"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "1ad27549d301ae2c960a18a9f99b560f"
  },
  {
    "url": "en/battle/index.html",
    "revision": "ff42910f143bbb01aa6a8a77320b4488"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "f5ebdf2bcd02fd07ef85771ecb9836ae"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "3d66455139dfb3927c19fa74cd57879b"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "ecb69bf79a2b0f2cfe9aff17c0a4e783"
  },
  {
    "url": "en/index.html",
    "revision": "e898669af8ae6c25f80121d123fd5283"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "d0d948ea2eac2e9ca1fc4f0b38d1d73e"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "532fc548a5fa3127d6775aae6d8787e5"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "270513d3a8074a3f7cb2d52f81477688"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "e0e6667462961303fbd652b2f72ac667"
  },
  {
    "url": "en/team/index.html",
    "revision": "32712c76408cdfbeb96b4cad230d0fb4"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "9fe1537f5f27736f32899d252dd9f14f"
  },
  {
    "url": "enlist/index.html",
    "revision": "785d345270cd8d9b0595b4d3d051e8ae"
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
    "revision": "2e067d272367e0a0493d8e99dc9353e1"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "b2add1b6ecc90f8ef139787d6dcac22c"
  },
  {
    "url": "items/drop/index.html",
    "revision": "ded20bdc4a8dfb46bbf45b79c906606c"
  },
  {
    "url": "ja/404.html",
    "revision": "d04453af4bd20664bd4544c262b17b3e"
  },
  {
    "url": "ja/404/index.html",
    "revision": "d385d4d671d85bde45b1a2185e6aea3f"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "402deee1aea1d3d79d747369ef23367e"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "962b833638afe2f921d2e21c7e0a2755"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "54c6b67696fff014d89979dc05c66a1b"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "87b0421ed9bf0c04e0c0d918de2f067c"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "94c741f7c39e58832f9ecf33fde52f62"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "d35ebc8ab89017630ccb85abe2659d87"
  },
  {
    "url": "ja/index.html",
    "revision": "632363fb4c2e3c5d75b95b2eca417781"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "7fcab6bc41705ec0b58933ccfc76cb80"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "eb6b39a1cfa63ac44c764e4f561a0ac4"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "191d012b5fd7622014e685388f202a30"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "3a7c3149d116f1fd87121e4598673478"
  },
  {
    "url": "ja/team/index.html",
    "revision": "2351837ae312d4a4e2ddae3bca7de928"
  },
  {
    "url": "ko/404.html",
    "revision": "e5dd41cb170577205f1de46421bd396d"
  },
  {
    "url": "ko/404/index.html",
    "revision": "197d0eebe8d769320fd61891ab74c837"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "056f2dc83f4e3c140873a74fcd272f31"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "c37e099201faa188bff137dba67460e7"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "907b2dba004b5487a7f608a263c678d4"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "b3fa1406535555983643fb98daaf6c1c"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "48faf6ab2e83a9420abfab2f1971d3f0"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "2e3bf6e6644484a2726c20536ba226bc"
  },
  {
    "url": "ko/index.html",
    "revision": "16591d3f0a14ce814137b0adbff8b063"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "3154c1830e67df0f6abcdb0441590d9f"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "80bb0cf06c4a0e4b0fb0bb9bf8a19d07"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "12044d05d1bd9d1b1120309afceceec8"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "3ef66b92eb6d0a776c5fae993f7884ae"
  },
  {
    "url": "ko/team/index.html",
    "revision": "dfd41ae715a3e389b76159fd5cc2c04f"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "3f89e111e1706125106615fdd1798549"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "830a4c1c69252c825a8e1508fd3f1744"
  },
  {
    "url": "team/index.html",
    "revision": "be364c8248a74786700f801459d3a95f"
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
    "url": "webpack-runtime-e54935f4e484f984b8db.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "3f464e8bc4b4e91e7da4c522632491bd"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "ccdd2d58b6c3e09904ec2fb88044d159"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "970645b772abc8a067d8e846433d7c67"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "68f6ce06e8f955aafa13a15708a9510a"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "26a1a3120ebfb2318f2d814c3f6f53cc"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "48661711eaf630c0ed455dd756814c58"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "45e80c1441603553e0aa724206f84076"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "f68ed7edb3594bf7a8cf4fd10b2fb898"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "1b31477050069bbb31ed6bd97007fa75"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "e25bad0ce74ffc7b4e82d423943e9fec"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "e61749350aaa8932ee5a4b3070dc1e31"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "2d8ff0e9e747dc0f63c79d72dd3b61cc"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-34a34e096a08559201fb.js`))) {
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
