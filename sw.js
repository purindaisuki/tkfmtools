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
    "revision": "12ccbe53dbc545098526bcd673973450"
  },
  {
    "url": "404/index.html",
    "revision": "b1f0c63645f68373bcc3aa9e1236c91a"
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
    "revision": "d5b013c1ec40ce9290262580cdb2ebd4"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "444e9483a523d4b778c2b92c0b884386"
  },
  {
    "url": "app-6afe0d54e4bed382840a.js"
  },
  {
    "url": "app-827eabf6632a92dd31a6.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "6bcf6f1a516a12c9c71dc94d5dab2ab3"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "fc7eb5e6a483d8ad651e3357f837fbd6"
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
    "revision": "c825cfcc41a42fe84ddd66d1e674bb80"
  },
  {
    "url": "en/404/index.html",
    "revision": "d07cf7f537d39185e5b0bbba97631f0e"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "49d76f609b6239aa026a9ba658f42c7b"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "25abd23b6968c3bbae066633efb6beaf"
  },
  {
    "url": "en/battle/index.html",
    "revision": "1475b66a59f9989b7f17df064ca0c743"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "c5d0b9605377ffb2d8ba88d33bef08dc"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "d705eababcf7afcecc6b77597dddffdb"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "de99012756fda3e0053d1f01da25d56a"
  },
  {
    "url": "en/index.html",
    "revision": "d8655049bd08edfdab571d33b3ac531f"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "a7d25f1f2aca9b125e5a07b84f61b2d0"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "7d82d5cc1d00378aa07802cdf53aec9a"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "09b0e44813726c121dad490b9bab5026"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "7a27da6d653a4eccfdd9e88b686c9db2"
  },
  {
    "url": "en/team/index.html",
    "revision": "a27ba5f15c45b817f44875ce1be1de47"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "f1ff56a8a8d1477e1677312d139d49de"
  },
  {
    "url": "enlist/index.html",
    "revision": "416e44d91f104a748777435d43122f8f"
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
    "revision": "4d91704f5bf0979786cad244b1fee96e"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "a9c9cb0eb8ecd3a796770aaee091e51a"
  },
  {
    "url": "items/drop/index.html",
    "revision": "82cd8501c18c73bfce9d505681500b7d"
  },
  {
    "url": "ja/404.html",
    "revision": "036f90d8ae26f8aa66e084feb56ad54f"
  },
  {
    "url": "ja/404/index.html",
    "revision": "3dd4096638ac1f8ad4fbba069998fbe2"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "5dbab32625946daa025cc511724b8a7c"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "c3107c3475968582566726a8cd8ff1b4"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "bbe4c2b849b660a4fc58feb5ecbc10c4"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "9fde5d2bbef001442cdcadc71539a492"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "58a9077bebf86dfc2374029d877ff5b0"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "9c792f6da225b828873a0791b4cc8f94"
  },
  {
    "url": "ja/index.html",
    "revision": "4705dd40430a9536f85f01c6e52e3c5e"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "dfd66cb239f18c09b4c7ed370d141299"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "b835fc9c999fbcb985fe8118cbb3969e"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "c913047b926b9c6ecef8cfce8d4414a6"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "b644f276c82cb645552432e98f735676"
  },
  {
    "url": "ja/team/index.html",
    "revision": "6c43d214154ac7125ebb1c0dad59a46a"
  },
  {
    "url": "ko/404.html",
    "revision": "6d36327160011479fc19a58f3097b5f1"
  },
  {
    "url": "ko/404/index.html",
    "revision": "f205179c8383ebbc2d1355d493a68d0c"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "9c3febaca130787e72685faaead48d03"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "3e2bb6d135ca06e6c71b5ed13dea16c1"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "8d73382faddbb2542611a5f444052a99"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "004062d7b845502d57ccad143de87589"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "e0072099c86298f3d1a6ef745d46e2b2"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "e517569d098f08611bf8acdc23d86406"
  },
  {
    "url": "ko/index.html",
    "revision": "7118f97c06b18208f09ebfb7722f97cb"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "3bd6d1f1cc8b59ae4faae10b19ca892d"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "c83993c064fcfe8e98c075409107f6f3"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "db6b784d4b9e0cf10e202bec078a2766"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "4b25230c475b406a5e2071f6836ba75d"
  },
  {
    "url": "ko/team/index.html",
    "revision": "c45c83c2a23c6847927ed2c4ccc128ec"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "107c1c04b08abeed6aa0256157f10dfd"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "64d60bc6e28ba9ffee598b7884fca3e3"
  },
  {
    "url": "team/index.html",
    "revision": "81f55f6987ecaec4eb571fa2fa5e64c0"
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
    "revision": "cf4fd9f7017640c01b9df5d54644533a"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-827eabf6632a92dd31a6.js`))) {
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
