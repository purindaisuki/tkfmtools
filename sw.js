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
    "url": "22ec39ca77b5fccfd95a7f58fe3365ed7d2e47c2-d57c5af8f8e9d0bf21da.js"
  },
  {
    "url": "231-3c5899c83ba42812e0e3.js"
  },
  {
    "url": "3118b2d3-c730bced711a3554c4c5.js"
  },
  {
    "url": "34eaa9ba7885c2be72f0b944f1ae4ca14dd9ffdc-33c6936a889cffc2e5c9.js"
  },
  {
    "url": "378-35400102f16c673f0850.js"
  },
  {
    "url": "404.html",
    "revision": "ca267d740fba37b1f33ff0dcc6077fac"
  },
  {
    "url": "404/index.html",
    "revision": "c9fe6a5e8286f821c87ee84ea4ad4ef7"
  },
  {
    "url": "4accbfb9ca4c22805f8a5a27dbe87689390fd05d-ac08c6a491053e341c5d.js"
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
    "url": "62cfa6c8ea9a82b932eac7cef5357b2ded11d3dc-7ed02312a351f98858cb.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-9cb7dde7f88859605d8a.js"
  },
  {
    "url": "8786e3ffefa4bd5c02054e170499b91b29bc5453-68c76017eb817df51dd8.js"
  },
  {
    "url": "90286198ea1aced77f746b1f45675ef1436cc742-8420d5e2aaf8e530655b.js"
  },
  {
    "url": "96bdde5b39eebc18d317fdb0ab29c3402e8a4652-de81c8976b66520bd3bb.js"
  },
  {
    "url": "9a778021ae307e66ed44991bf422d7272a3bc1a7-78241abea3d1d590136b.js"
  },
  {
    "url": "ad7f724d-93696c5349596d469034.js"
  },
  {
    "url": "analysis/index.html",
    "revision": "a34a7fc0eb9a4ef99c9108d2dc19c7a7"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "9c5b36bf7174085f345dddb7797100e4"
  },
  {
    "url": "app-1ba41b4e1efc5110ac38.js"
  },
  {
    "url": "app-378404b65914afcd85d1.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-f2f889fb4f1db4769977.js"
  },
  {
    "url": "battle/index.html",
    "revision": "5d7f8b31fa9f8f5285123f43fed458bb"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "323f3657da9d8e50c47336def5c8b353"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-a9e6fc658fb55feee5a2.js"
  },
  {
    "url": "component---src-pages-404-js-31f3717e0d6c87090aec.js"
  },
  {
    "url": "component---src-pages-analysis-index-js-0894c12687fb23986906.js"
  },
  {
    "url": "component---src-pages-analysis-index-js-0ea79510748fdf9edeca.js"
  },
  {
    "url": "component---src-pages-analysis-index-js-e98646b58c90e7a109f7.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-184e5af3e2a6f85954d1.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-349b08eea0893d9ddd78.js"
  },
  {
    "url": "component---src-pages-battle-index-tsx-334ec234cd08552c5458.js"
  },
  {
    "url": "component---src-pages-characters-potential-js-20d1be2e175e1802e539.js"
  },
  {
    "url": "component---src-pages-enlist-filter-js-75868e8a47d2d77fe1f3.js"
  },
  {
    "url": "component---src-pages-enlist-index-js-d74b06d6c23a1ac22273.js"
  },
  {
    "url": "component---src-pages-index-js-68438968eb6d407ded79.js"
  },
  {
    "url": "component---src-pages-items-drop-filter-js-e03d385ecb9e3baeae0f.js"
  },
  {
    "url": "component---src-pages-items-drop-index-js-0afb09fe49f7cd3162db.js"
  },
  {
    "url": "component---src-pages-team-build-js-c1875c160034bef23de2.js"
  },
  {
    "url": "component---src-pages-team-index-js-51a0c62eac6690ab6828.js"
  },
  {
    "url": "dc6a8720040df98778fe970bf6c000a41750d3ae-b499fe8d2f065c712e99.js"
  },
  {
    "url": "de10f4ae648e51141fd55db96f343b235217f6b2-9d403d7a9bd76df86a50.js"
  },
  {
    "url": "en/404.html",
    "revision": "1b36470fb36ffa6c68f720cbea01dc6b"
  },
  {
    "url": "en/404/index.html",
    "revision": "dd88fdbf5e16a1f9692983184aea0931"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "c5ee662adf0c46b7f0f875a5ecea38c2"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "8ea82e79999368fcce253b8a3dcd41eb"
  },
  {
    "url": "en/battle/index.html",
    "revision": "438d6102184e9dc6e276c9582690f143"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "7c835e8645bf2e846e6d2608d74ca478"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "18658887221262d433282b1fd3a30ba1"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "7f090ca807edf0d85b8671837f6b79ae"
  },
  {
    "url": "en/index.html",
    "revision": "3434368e273cfe9695e7700676dd76ce"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "0968ba61cee0e02f312cb737af634906"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "077cf42f15e5fb0f9fc87de6938a9f3a"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "1585d27bf892512981baabe46de1b615"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "d3004d73c25e0510120237374c836f6c"
  },
  {
    "url": "en/team/index.html",
    "revision": "fa337016fe121c92e4109b557f92a473"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "50046e9ebab17eece15caf58abdf5c6c"
  },
  {
    "url": "enlist/index.html",
    "revision": "1a007a90dbd0c0a19c6a49e39bd57545"
  },
  {
    "url": "f5f6e74e6367895a7f6eecb3efd0490eb7855011-d3a3322081d51e0a6a3d.js"
  },
  {
    "url": "framework-e0ebf440d434790df65a.js"
  },
  {
    "url": "idb-keyval-3.2.0-iife.min.js"
  },
  {
    "url": "index.html",
    "revision": "bc4a2c8a6a96faf78c57d6c32bcc586a"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "6efa222c3094599457c1217f3eeafb57"
  },
  {
    "url": "items/drop/index.html",
    "revision": "5cc72f7743999fa555fdde9399d117dc"
  },
  {
    "url": "ja/404.html",
    "revision": "fb5267725bf25818e116bd0b72c5b487"
  },
  {
    "url": "ja/404/index.html",
    "revision": "b2303e3a5970df928122235d357354f8"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "4eaa829008a8ae47bee0f0fd0ed660ae"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "fba9b102b2928b5bf8e4fd6707f3cf34"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "f8bf5fd32edcc168f0e6ac18ac401d24"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "15d55570ba14e55dcead1f0c2e88c85f"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "fb958799db8e43489edd674b1a328608"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "eec31dde6c9467421fa246c7a96aa4f0"
  },
  {
    "url": "ja/index.html",
    "revision": "43eb920954d54c01f2fd686c77c00315"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "3d669024af14ddc5f76c0f95c02da63d"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "f0d0743005d40b789191023be815416d"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "6e970bc73d7b68ee9063b6e8e7e50934"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "1de7e7d621ade022c7def3ace099bdf8"
  },
  {
    "url": "ja/team/index.html",
    "revision": "fb46307cbf93d29d352c200116f398e9"
  },
  {
    "url": "ko/404.html",
    "revision": "3e4b934dcfe697134803f24136513297"
  },
  {
    "url": "ko/404/index.html",
    "revision": "6412a73acdcdff87a223772bc07dcfea"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "57d8b987c5d71b1d446a407e44fa877d"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "41f7852a13074d0dedd8b4c46383da0e"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "ca42c293afe3c85456c0270c2ea217db"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "8fd9867a3568c24b4e441fa825ba7dc2"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "157afd6c5db3caf7b441f4e0d529ed02"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "0a875a1c4082a4ca3cf1f55845a31316"
  },
  {
    "url": "ko/index.html",
    "revision": "d39b4b1504c6332abd70f552aee4eab2"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "07857164aba5538812525ee2c91a4127"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "d3feecd413d5935ea503c19160349618"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "90a1448915c12c7485fd2c3d79c20684"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "70d0e6ef77eeeb93289121c04712a0af"
  },
  {
    "url": "ko/team/index.html",
    "revision": "7ae59cbdbaee388196eacae644a9cc0b"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "cc2776bd21a136dc84352f7599b42c11"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "6de671156c92f5394d2bdf86dc6b1daa"
  },
  {
    "url": "team/index.html",
    "revision": "e1f6c3317e30663f792d0fe1129d06e1"
  },
  {
    "url": "webpack-runtime-3e96b30db8616ed62fa9.js"
  },
  {
    "url": "webpack-runtime-47223a8b0eb22620791b.js"
  },
  {
    "url": "webpack-runtime-8ad4a82e7bce252fd7dc.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "40c3fe7901bba1fb03330b1ac9c34ca9"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "93364766543c519d5d4e0b9b754afdff"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "33a66b56fb9b4d4812574e5320311c4d"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "dc7c1a64a3ca5f2308953f98e61951b0"
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
    "revision": "ede37f63c3b26e9a5bdc4946cfdaa995"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "004471d1ee1a0919e89833bd5ca9f136"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "d1b0244ca5152e96e54e1ead8134cadc"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-378404b65914afcd85d1.js`))) {
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
