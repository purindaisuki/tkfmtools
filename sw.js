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
    "revision": "d870926d59c4454f1ca35b46642fd14c"
  },
  {
    "url": "404/index.html",
    "revision": "cba9c6fd3122868520db303b0b57d8e0"
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
    "revision": "cf2db5e679a7c73890bf5d065b68cf50"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "2b2c52ea179ca24239df8214fbba6ed0"
  },
  {
    "url": "app-c4f60f48f5dd76c68e0b.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "74be680e8704b294c6e596faf94ccf97"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "5ecee86b8df9b15fdc20ae03949f4208"
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
    "revision": "990fe1f50420491ed82d0e447dd6d727"
  },
  {
    "url": "en/404/index.html",
    "revision": "ebb9f12cca4910632b7feb8bc9eabe87"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "65f6b30545fc0345dd7491ee30f4be6e"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "e445ae9dbee5bf97ba779273e797e1e9"
  },
  {
    "url": "en/battle/index.html",
    "revision": "8d5432121a7e91186d9b1c54286ffdf9"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "ed42cb22620cf9ef3dee845c23352ebe"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "64309410e3648fee099b96e3810c7fae"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "2baee0473a5ac2625765f40c17569c98"
  },
  {
    "url": "en/index.html",
    "revision": "cdd6b49eda356f820f727fb54ac2d0f5"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "134d4b565d9f3afc1d8f573921345d07"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "fd41aa8434cb7fc9e592ad0cf7a15087"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "10964d4ca63a25f6ca02b94d9d60edcb"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "3ec4c0468b7f53d84f4cf2e54a317d11"
  },
  {
    "url": "en/team/index.html",
    "revision": "7f2caa07a68558b85955a954c471d10f"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "6b4d27b93c92fc051c42ee1b3b013f4c"
  },
  {
    "url": "enlist/index.html",
    "revision": "e5ac2f81217600a3dbf7adfd465666f1"
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
    "revision": "d3a4d737ea0ecad942d1c2afb8749e9b"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "ab3f1e928c77a6a58e9701dd5e4c3bc3"
  },
  {
    "url": "items/drop/index.html",
    "revision": "a986dcaf9a55f51c3ffee88abd953b7a"
  },
  {
    "url": "ja/404.html",
    "revision": "5af632798a0bf6f06c9209980ce20254"
  },
  {
    "url": "ja/404/index.html",
    "revision": "86e9c131bf2589ffed71f6de9ceb5020"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "384f73c8d16704c52a997be12b7556cb"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "4e63071e00933edbd1c373926228ee36"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "bc7e0f58fa2af8a8be37a6b58e9bb25c"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "7417bc5fb7af6052394df77fbecd463e"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "89a955e304b3ec64a46f09349496ba8c"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "67748a37a6e32c1cde6f4bd48bd09cd4"
  },
  {
    "url": "ja/index.html",
    "revision": "3847ba8c67bb77f19b3eb9df883935b6"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "463122ab511b1899105d1b7202b21c07"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "3c231f48ccd8197a80d7ccaa398c32c8"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "7b908b5bdc051eb0797ed0e7a73e192e"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "af318230b8a255ee77469fa1964a8d95"
  },
  {
    "url": "ja/team/index.html",
    "revision": "e9d174ead24ad62df034949965f9fdb5"
  },
  {
    "url": "ko/404.html",
    "revision": "d5a4427d36600de92f2d4a3d4ff294eb"
  },
  {
    "url": "ko/404/index.html",
    "revision": "147320e6cbd013857f855116465fecf2"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "2b27853f8da17737aeeebf3728045c05"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "57869d0d7a624025cfe439bd3d9b02af"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "830cbfe6a5a55b864e4273946ff5e65a"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "202d28eaae4453ab464a4663948e0fa6"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "7813cba219a1482467cc8956a937a228"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "7806fb50f926d0efd9f27531a28572b6"
  },
  {
    "url": "ko/index.html",
    "revision": "cb4cabae4528f3ade85dfe796a1ec0a4"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "eec824b2062ccbd0c607bc44c3c2f14d"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "9581735fddbef8ac2b4aeaa33b75416a"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "29b46a4e53939e244ea09ea85e9e536d"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "bdf87c71aa5bfdf0e64f9dae8f78c088"
  },
  {
    "url": "ko/team/index.html",
    "revision": "17edaec86da20a76ec773bca4367423c"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "a45467eec3f3129e6b5de8ea8aae2530"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "d35cf489c49c2da7f99a46c11eb36861"
  },
  {
    "url": "team/index.html",
    "revision": "dbdd6ef06cb7b5acca71bda2e3fe4ebd"
  },
  {
    "url": "webpack-runtime-38e2c5e081ab56171eb5.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "bb6c86c72f6c8802cf5239e73bc854f6"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "200a3306857f5b295f6e1b014cbbf84e"
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
    "revision": "9d1f290749fdead8c1f52a86b701c244"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "a8c09103eda206e777fc84bb56afee76"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-c4f60f48f5dd76c68e0b.js`))) {
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
