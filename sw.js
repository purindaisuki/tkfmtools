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
    "revision": "0d24ac65d3ed17f2e94f3d0c4326dfbb"
  },
  {
    "url": "404/index.html",
    "revision": "e442a48ea476a87bbe82ad61e3ce771d"
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
    "revision": "15792aec3369ed5c788529438ae19ff6"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "ba1d6ed9e1ca7a9e4217a9a2b4f4e8b0"
  },
  {
    "url": "app-d5ed6e6396e17a353ad2.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "2939802ed3ad75d07ba86b0bf80206d1"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "5d1d66f353a9557a2ccce5ac1beece1b"
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
    "url": "component---src-pages-analysis-result-js-68829997a047d1c780e3.js"
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
    "revision": "6a49cc22090729fb12a50fa97813d853"
  },
  {
    "url": "en/404/index.html",
    "revision": "dbe520438b5d1e278c59025f3d36b969"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "931acfc1869bc4c6b4d88198ce80f3a1"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "fbf9770fa33b92ea7282fda747563abc"
  },
  {
    "url": "en/battle/index.html",
    "revision": "14cec9c11748bfd72e543b3ec305ce8f"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "f17cacbae51774e3205881d37f3a1389"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "ebc4ab71a98a69cb39231d89da7fcd3b"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "8ee351e270746ba021d04f0a2fb17c03"
  },
  {
    "url": "en/index.html",
    "revision": "222d4de683c3bd425ec5f47c4bfee39c"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "2b81ad09094cee8aadbc549faefdc8c6"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "cbb518e298c3abc3641a2c8259944ed2"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "a322cf18d53656215fd7330ea7f5844a"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "b3a7fd8f004e1f670e390ada8f17a299"
  },
  {
    "url": "en/team/index.html",
    "revision": "261b002235148c1ff787d6cf7c1f7945"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "95a53010a3cb3f6cf737f1dc1ca1d43e"
  },
  {
    "url": "enlist/index.html",
    "revision": "ddd536e5eb3798ecd555004c15bc80b0"
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
    "revision": "a2d0537aefb5cbbda208e323dbe4518b"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "b779d56afafbf3933293a824b75d3144"
  },
  {
    "url": "items/drop/index.html",
    "revision": "766b2195e88c586b8ad0bc6c9d03a216"
  },
  {
    "url": "ja/404.html",
    "revision": "0ad5b0cdb5c1240fa102c3eeb473602b"
  },
  {
    "url": "ja/404/index.html",
    "revision": "b5a891e303295c8be5b85df528a34567"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "95abd0a1ba7da1dfeb7d35539a7d930a"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "9b8ac30ef6120fcd4f70deeec0be5ddd"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "352cad7885ac2af0fa0143f25627cc54"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "60254f56a00f35e40996d13a69fd02b3"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "02f6691ab2823e5665fcd822a36254b1"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "e5ff37692a37d374bce7fc3f73272101"
  },
  {
    "url": "ja/index.html",
    "revision": "ac4b279cedb0c3d665c58a0a56c9c3bb"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "9909b6a3a926e15d6b7d04a0c7ba404e"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "435736704d882edd750baff304baa85d"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "4b7cf297464f6c39488936b45820b741"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "091958d9277906b6338a43a83d2f3f94"
  },
  {
    "url": "ja/team/index.html",
    "revision": "23dfdce855e7a8781af49dd0c6fe5836"
  },
  {
    "url": "ko/404.html",
    "revision": "114ff4fb532d5713e91f983c314a666b"
  },
  {
    "url": "ko/404/index.html",
    "revision": "804dde51c18727c53a69bbdd57fbba59"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "c22ad3abe2be7b26631c2e39b5855077"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "b1d4cb33531237e13bf856edf381b1da"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "1977e105567d65ff9a796790180397e6"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "b2bf39467669c62cdff2951c79ed7fa2"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "c9343c39893eb2e91e56d29b77f9a28d"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "87e7ca2b58184d5ed75e5e5624851edd"
  },
  {
    "url": "ko/index.html",
    "revision": "37d356211502656ea96e78eddb8d7b1b"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "1cb9c5759fa237d795cfdf161395a50c"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "f9e8505120c485efa2bb8526b6b62ce8"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "8e2f10acd24325fbdb643d42b8365e58"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "9884d7b1060b53b42a4ab4530d8fc0ec"
  },
  {
    "url": "ko/team/index.html",
    "revision": "407bc06ea6c584897ba21c8dafa23d76"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "a82e8c3324069f8fb43bb40486593531"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "90ac2371398f4e2d12f7e2cb81db4aef"
  },
  {
    "url": "team/index.html",
    "revision": "31e4f4cc979a134045a2f601abe5f89e"
  },
  {
    "url": "webpack-runtime-c4b17cf516a12ae6e850.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "274aaa6f8d64280198ee1a9baa3a9df1"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "1acbe7dbacc037cc8b2fc9e861db60ba"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "d19183fcfa8bbe87b611b3811c7e5475"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "1b5abeb67153c129acc5b29879cb064e"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "3916680a001fdae1a5bae06704275adf"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "7fb7336e9afa5f445af0dfdc506edd33"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "34e6c7dc71205fd214a8a011980d2f3a"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "8493910fa917dc04bfd377d2bdef2174"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "dc53524101fa2edc375cf0732c1c6be1"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "4e310adaa1ff17f7cc93cfff230213dc"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "f505c162d11f27335e8f5d2e254221d1"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "26b427cca3b14f075cbac70f7e24b51c"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-d5ed6e6396e17a353ad2.js`))) {
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
