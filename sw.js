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
    "revision": "fae3b470a43bacf9709392b3dab17cb1"
  },
  {
    "url": "404/index.html",
    "revision": "4fdbbb78311b50cf57bfdddfacdbe973"
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
    "revision": "bdda9fb63529141eff1af4675d41a646"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "43ecf710b9a0419162a21c377fab6ff6"
  },
  {
    "url": "app-a870818565bdfe6b859c.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "d926e4b97ec8c663fcf506bc6fc96399"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "b9596f69f3e29bac3937be9670d98a29"
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
    "revision": "88033a1f51a2c682e4b52180719e569a"
  },
  {
    "url": "en/404/index.html",
    "revision": "3bc6daf59072b69779e5086f4129c924"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "58dc8f23d191e72cd87a53d530e62181"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "155e0b38a7681c4cf732ba24133d4c02"
  },
  {
    "url": "en/battle/index.html",
    "revision": "ffef9c89035df59b2fd25be78f49f3b0"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "aa488b1b4919b8abb97ea11b81e29679"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "dcdd44ba6631854f325a337664c521ed"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "b4b88f69b35396f25a2a1fa2a9854c79"
  },
  {
    "url": "en/index.html",
    "revision": "7a02b8038608c4a5c824780f6d84d73c"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "0ebab96d5d404b51b89aa1864092b6a9"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "2587e9b408e94c470b57d42e849ac700"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "c730bcb1c7c242376ce12110e49c5214"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "28be0f59b4739adfa28bfb2d188e48cf"
  },
  {
    "url": "en/team/index.html",
    "revision": "5bb6593315f9cf7b5a2c4e2aaca6972e"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "0b1860748e743864961b1dad03406975"
  },
  {
    "url": "enlist/index.html",
    "revision": "54473a3aec3aba93868d0269a051324f"
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
    "revision": "76db14c1e770f8694a26b4b77b2e8d52"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "0a798d92a5a2ab43c617cdcba5ab8432"
  },
  {
    "url": "items/drop/index.html",
    "revision": "5391eb6f92cf1481fe9956b9b5b492f5"
  },
  {
    "url": "ja/404.html",
    "revision": "5b3087c957dfae7cfdf88f3a988b37d3"
  },
  {
    "url": "ja/404/index.html",
    "revision": "98574d525050421c3b2eade50a6ca4c5"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "c4893707a5a28fcc62a467357d9f35fa"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "78814a7b62e5b51041af4235015fa19b"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "a68e9136f29db569ca9a836dcc1da2e4"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "893ad95990a8aebeb0773f61dfd533ef"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "df5739380237ffabaffc836bfc68c987"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "9480753ed3cb252f123261a5465f591f"
  },
  {
    "url": "ja/index.html",
    "revision": "9aa5ac84a462269cb478e2357e83db9c"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "3d2814990d47869078848e4d3a405e40"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "1bd41100b32b275684999aea683c34b4"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "5c8adfcf16274799971f0fdaf54288b1"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "cdde2214ffabf44483f8d2bcda880e24"
  },
  {
    "url": "ja/team/index.html",
    "revision": "ae960d5f4924aabe7a675e23b80997a9"
  },
  {
    "url": "ko/404.html",
    "revision": "287b9362d36740e0ce4059d3bacb9249"
  },
  {
    "url": "ko/404/index.html",
    "revision": "be842bb808dfefc1bf0ed807728102e6"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "334d4b0d47b81e56b1dbd0c26ac3a969"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "44ba7d8fbfc990e11ed56f00e5e09853"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "ef83254daed6f9b3d15c3be71e769e00"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "70f6d61287d8172edbefaba37c00efb7"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "776d4a26b8f2e6ebb2e9bac78f5cbd99"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "6f76c70b9eb7774a71b53931f6beb85b"
  },
  {
    "url": "ko/index.html",
    "revision": "46256e5ba4a7cf8ed26b4f9c7b61e920"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "6b49fc645bab956bfef248b0f625e9b5"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "007a93612d31f868dcf8b8339a863a85"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "307a616b5da0347c6335d89688e10aab"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "1a938a76ed9885013787422485742ef6"
  },
  {
    "url": "ko/team/index.html",
    "revision": "6b965fa4332515fc2077c980a08a2bae"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "5bbb6673d803cbeb4ff0de28959f0515"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "0410f034b3717c364feefbb29af26507"
  },
  {
    "url": "team/index.html",
    "revision": "7e3f201fe82e173a3c6983a656fcc435"
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
    "revision": "2636c34b4092fa28aa72df6299386572"
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
    "revision": "2756cb43b66b2eb50be87371f856d01c"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "a0b69dab6593a74a287aee1b18438cea"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-a870818565bdfe6b859c.js`))) {
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
