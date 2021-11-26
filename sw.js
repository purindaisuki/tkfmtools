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
    "url": "22ec39ca77b5fccfd95a7f58fe3365ed7d2e47c2-64cd4d900428f7e198b1.js"
  },
  {
    "url": "231-3c5899c83ba42812e0e3.js"
  },
  {
    "url": "3118b2d3-ea35752cd5f2f76b9215.js"
  },
  {
    "url": "34eaa9ba7885c2be72f0b944f1ae4ca14dd9ffdc-1e1819c717fb9f545281.js"
  },
  {
    "url": "378-35400102f16c673f0850.js"
  },
  {
    "url": "404.html",
    "revision": "24134ec196eab402cfe3c1f6c4c5268a"
  },
  {
    "url": "404/index.html",
    "revision": "84de96b1456e9df3911746dd15fcc849"
  },
  {
    "url": "4accbfb9ca4c22805f8a5a27dbe87689390fd05d-ebb4b0c450bd75d32a4b.js"
  },
  {
    "url": "503-35bcb21e8465bb1843de.js"
  },
  {
    "url": "537-9163d86b023910e7375b.js"
  },
  {
    "url": "589-6f6e20cdc243a70d48bc.js"
  },
  {
    "url": "62cfa6c8ea9a82b932eac7cef5357b2ded11d3dc-3672d760f8077a9eb996.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-446f008f61d7b2ed50e8.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-62c0615098f4e9fd7fd3.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-74faf055d0eb082bca5c.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-a0ba34e2d71b786612d6.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-a7e9c4f9c780628c5c97.js"
  },
  {
    "url": "8786e3ffefa4bd5c02054e170499b91b29bc5453-af5b6354be70d5987cc5.js"
  },
  {
    "url": "90286198ea1aced77f746b1f45675ef1436cc742-7d350b9fe66416665d3d.js"
  },
  {
    "url": "96bdde5b39eebc18d317fdb0ab29c3402e8a4652-b4d9a6e789cc119bbbb0.js"
  },
  {
    "url": "9a778021ae307e66ed44991bf422d7272a3bc1a7-78241abea3d1d590136b.js"
  },
  {
    "url": "ad7f724d-b5dea33b412feafe301e.js"
  },
  {
    "url": "analysis/index.html",
    "revision": "fb3757da98edc442ded37e987e9a5053"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "9f530b70749b1967369044d348f3a344"
  },
  {
    "url": "app-a4f0770352030c95a8fd.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-f2f889fb4f1db4769977.js"
  },
  {
    "url": "battle/index.html",
    "revision": "571e117586088f976ed635a16002dca1"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "a2748db4fe4cf5c32bc141bb2e6b5903"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-a9e6fc658fb55feee5a2.js"
  },
  {
    "url": "component---src-pages-404-js-7e9f74038aadcdc0df79.js"
  },
  {
    "url": "component---src-pages-analysis-index-js-d2490fffd52d80e9982b.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-aa7fed594210bbd18ce2.js"
  },
  {
    "url": "component---src-pages-battle-index-tsx-4b654028a75be8e434e1.js"
  },
  {
    "url": "component---src-pages-characters-potential-js-8f9cf4a18e58ec9e70ae.js"
  },
  {
    "url": "component---src-pages-enlist-filter-js-55093875c66e5b25a34c.js"
  },
  {
    "url": "component---src-pages-enlist-index-js-fe898e0e31c45cf9f326.js"
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
    "url": "component---src-pages-team-build-js-fd8e9427f59548f088cb.js"
  },
  {
    "url": "component---src-pages-team-index-js-eb0a6e729868bac7901e.js"
  },
  {
    "url": "dc6a8720040df98778fe970bf6c000a41750d3ae-b499fe8d2f065c712e99.js"
  },
  {
    "url": "de10f4ae648e51141fd55db96f343b235217f6b2-befa3040c27fc99bd601.js"
  },
  {
    "url": "en/404.html",
    "revision": "b847343d2acdca644bcea1de25231be5"
  },
  {
    "url": "en/404/index.html",
    "revision": "a4c5bc73620d3a2196133e029cb93baa"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "bd052d31cdc51e4542fedbc2545b1af6"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "af1afeebaa61d840807a864ab211b485"
  },
  {
    "url": "en/battle/index.html",
    "revision": "f7d280ae4f3ec515899dad5746fec7fc"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "6e889e32ff6796a2bfdb13ed1f3142bf"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "b1e55ac37ce4088f4de51304478f64e4"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "19dd33c1cf3bed90416f76b9c3d3b908"
  },
  {
    "url": "en/index.html",
    "revision": "9931be8b17a02c2da83b9620bb9f8976"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "288f5a1858c64727b014d155d75f9d1c"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "2e6c88d891d8d2d3e498d086203be108"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "a81c99f388b3cbfbbd497d9dbf9ef852"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "58464d36d6a0282b6231790ce99a9e14"
  },
  {
    "url": "en/team/index.html",
    "revision": "c61f31db636249f0ac2c46888b5aa97f"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "c17a16ef4e4350d82cf7e91617b2a9e4"
  },
  {
    "url": "enlist/index.html",
    "revision": "dd756dc02e3c978fc1b44158baa8be00"
  },
  {
    "url": "f5f6e74e6367895a7f6eecb3efd0490eb7855011-bb590cc58865ce88f1d1.js"
  },
  {
    "url": "framework-68515dcc1456ec0b486c.js"
  },
  {
    "url": "idb-keyval-3.2.0-iife.min.js"
  },
  {
    "url": "index.html",
    "revision": "961c33ccfa6c17896a20edb26ea1b1b1"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "a08c9fbd949d73fcf45c6ac9b5825ee6"
  },
  {
    "url": "items/drop/index.html",
    "revision": "436850d856771178b6f155daa0b42710"
  },
  {
    "url": "ja/404.html",
    "revision": "40f42abe7de3ed277a05853365e60118"
  },
  {
    "url": "ja/404/index.html",
    "revision": "00b6cb74409145c8cb38801fb8182b65"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "b8d8cd17e6c233ed6dd0e92ac800620c"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "408d9e9e7626c33f7edbf44d509f8e25"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "babebd6d8fb16ab868df4393f3a09686"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "a1236eabff04150208ca47e86b844205"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "244219919934b37325f5a912e8454943"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "0d766b869e4a70d5466a8fdb7cc565a5"
  },
  {
    "url": "ja/index.html",
    "revision": "824ad28f25e328fd7c3b91a8deaadfe8"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "fa6afca1a64b74fe3219315ba16bed77"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "0dcef943ac7203a731d03cecafbf92f8"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "521903e719042c5d1b354bdf18de4593"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "df871d96790a7bb8c45f1912f04bd43b"
  },
  {
    "url": "ja/team/index.html",
    "revision": "f4c42bc9280080f766cee1085b59f470"
  },
  {
    "url": "ko/404.html",
    "revision": "09de2dd223a187b08baff89fb91bd292"
  },
  {
    "url": "ko/404/index.html",
    "revision": "0c671ed7afc8dab2d5bc9cc49c83fad5"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "e3880ed07fb98fbdd56f1e9249616d6b"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "6fe6e8cd60bfa7ee9cccb8013ac931e1"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "95ba343437b54c325132efa4eeee4bdc"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "c9c449f1f0fa30d4660f356be1eb1479"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "fd8da19d54b299475c956db41b0e8ebd"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "d593aa312492c2b6fa275c09107fa190"
  },
  {
    "url": "ko/index.html",
    "revision": "b542f8aa12bebc415d40edc6e456b179"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "7325f1e201041b02586ed83e6a38241e"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "5639df09518ebadd2ab601f097500bf9"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "38a788dfd6ce5befcdb57fc0933f5199"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "8488bd5aed3f5936be01c7612c02d393"
  },
  {
    "url": "ko/team/index.html",
    "revision": "c10b7108463413b6dec9d9855b5f3985"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "c834b5536ae376b9d655ad37b995f518"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "60d33172ac0b83ed2da05ce9a8f7f501"
  },
  {
    "url": "team/index.html",
    "revision": "fed362ec4bd0f80a9bfed63391953a04"
  },
  {
    "url": "webpack-runtime-28896f51146cfa4ced81.js"
  },
  {
    "url": "webpack-runtime-72ae66d56173c259c6ea.js"
  },
  {
    "url": "webpack-runtime-8ad16e2161b7c7b171b3.js"
  },
  {
    "url": "webpack-runtime-8b6cc752943113dd2341.js"
  },
  {
    "url": "webpack-runtime-a9da36c05c82c54879ac.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "40c3fe7901bba1fb03330b1ac9c34ca9"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "286d0ca557b92b757b2e781769f7ba81"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "33a66b56fb9b4d4812574e5320311c4d"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "bdad11a3b0c2a885036fdecb45df70a4"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "44279e468860532e433733575274e992"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "7e1e634e010158c979cec11be4fffcdb"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "2e2d65ec3d3cee2a898a813ecae5b8f4"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "e161a60a6e0074e3e68c2e181c6acf1d"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "210967888bbee669d82ce16f47d403af"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "947ae7fa8f2880d6a65c4441c60dd27c"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "63cbc1492eb4d246294d2957197184ca"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "c0422318e1beac2073188408f18d1548"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-a4f0770352030c95a8fd.js`))) {
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
