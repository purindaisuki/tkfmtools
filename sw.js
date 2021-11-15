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
    "url": "22ec39ca77b5fccfd95a7f58fe3365ed7d2e47c2-236a433ab5849ac8f55e.js"
  },
  {
    "url": "231-3c5899c83ba42812e0e3.js"
  },
  {
    "url": "3118b2d3-c730bced711a3554c4c5.js"
  },
  {
    "url": "378-35400102f16c673f0850.js"
  },
  {
    "url": "404.html",
    "revision": "102531adc18b447dd54bdfc735762caf"
  },
  {
    "url": "404/index.html",
    "revision": "e5b5e77dacc100191ef9fafba9836b45"
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
    "url": "5b07ef9de3fd5be419a029e59e005ef56e51ac05-5c7f435eed9afa9a705f.js"
  },
  {
    "url": "62cfa6c8ea9a82b932eac7cef5357b2ded11d3dc-e5f76b5cb57c2f367277.js"
  },
  {
    "url": "6892d4beacd404812a3bd648b8863859fd28f7c5-6fddc1fd62c8d4cd20e5.js"
  },
  {
    "url": "8786e3ffefa4bd5c02054e170499b91b29bc5453-c14257b78eb3f28a3dc2.js"
  },
  {
    "url": "96bdde5b39eebc18d317fdb0ab29c3402e8a4652-3b52f3f0a14ca7843cec.js"
  },
  {
    "url": "9a778021ae307e66ed44991bf422d7272a3bc1a7-78241abea3d1d590136b.js"
  },
  {
    "url": "ad7f724d-93696c5349596d469034.js"
  },
  {
    "url": "analysis/index.html",
    "revision": "acd695806b12f23d0180c0320a60281c"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "958071faa8b527990b52ae39aa3ed7e4"
  },
  {
    "url": "app-0f87e30e4b4a9e21cd2c.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-f2f889fb4f1db4769977.js"
  },
  {
    "url": "battle/index.html",
    "revision": "87e76b11df2e8b8c7c9400368b2bf1fd"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "e249551930f33c964c1d829b63df7c4b"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-a9e6fc658fb55feee5a2.js"
  },
  {
    "url": "component---src-pages-404-js-a5c959d87a53e968a9a1.js"
  },
  {
    "url": "component---src-pages-analysis-index-js-462a3f10d024a10c6bca.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-5c1261e6b61570c727f9.js"
  },
  {
    "url": "component---src-pages-battle-index-tsx-a0e7ebd52305fc971068.js"
  },
  {
    "url": "component---src-pages-characters-potential-js-02bbaa80be232d50c659.js"
  },
  {
    "url": "component---src-pages-enlist-filter-js-028bbf17a77f0188d6c4.js"
  },
  {
    "url": "component---src-pages-enlist-index-js-2cfa479b679bb8e3125c.js"
  },
  {
    "url": "component---src-pages-index-js-c992705fafbdc8a7079b.js"
  },
  {
    "url": "component---src-pages-items-drop-filter-js-b47698fad3a72c157a53.js"
  },
  {
    "url": "component---src-pages-items-drop-index-js-37c4a712f9835aa71064.js"
  },
  {
    "url": "component---src-pages-team-build-js-5cb5b68e8cdd1e26c591.js"
  },
  {
    "url": "component---src-pages-team-index-js-f4ae90980ec721fe7aae.js"
  },
  {
    "url": "dc6a8720040df98778fe970bf6c000a41750d3ae-b499fe8d2f065c712e99.js"
  },
  {
    "url": "en/404.html",
    "revision": "c136207bfaad841da5dc64f62ec569c8"
  },
  {
    "url": "en/404/index.html",
    "revision": "70cd3133439b8d10d5d44b3562f47672"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "4492709a0da6f70aa3b17fab6e957be2"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "b2fe5732be7e8c390df62889f791bdc8"
  },
  {
    "url": "en/battle/index.html",
    "revision": "63de0e789f40fc0275b44c109c060df0"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "9ab4694468196575efbcf3efc53210da"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "5f62cd37310025a83daaf715aa924779"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "e43028a39873b49648f68183b560a0ae"
  },
  {
    "url": "en/index.html",
    "revision": "4031ff05949f3804e0a9f59f315201dd"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "6e9d5132086be8fa38957738613793c8"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "d7bfc0368ff7d2cf22b702cd3b86eb2d"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "e1d1cbf67d6b122bbba3ace67a76835a"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "c47d2bcb8385d784b99da994c292f00e"
  },
  {
    "url": "en/team/index.html",
    "revision": "5d1e59fb357eaebc2db1ed23edbcb94c"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "5913fabbdf2f3ec52f63692c48c5ed92"
  },
  {
    "url": "enlist/index.html",
    "revision": "789f84d85ef4432877b0d375c58b52cd"
  },
  {
    "url": "f5f6e74e6367895a7f6eecb3efd0490eb7855011-38108303ca3322dd0046.js"
  },
  {
    "url": "fb5f3564c4e0330b430a46c02eb7cdb2bcb091fc-ccb3e55aaccf60431d80.js"
  },
  {
    "url": "framework-e0ebf440d434790df65a.js"
  },
  {
    "url": "idb-keyval-3.2.0-iife.min.js"
  },
  {
    "url": "index.html",
    "revision": "c05367b220cfe9c695b1a98289665dd3"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "1845424b47e4164ee5d19886e079b0a5"
  },
  {
    "url": "items/drop/index.html",
    "revision": "86ae3cec33818927cde06319563b8613"
  },
  {
    "url": "ja/404.html",
    "revision": "56c9bf15ebc92c35542793f86a9d9607"
  },
  {
    "url": "ja/404/index.html",
    "revision": "dffbbef59d049d02f6d5a88e38c39b9b"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "f7458ffa0463fb99a110271427ce851c"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "99f208a39bb0a1b9b8cb2b94def68e55"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "706deff747eab8a5cc562a9ad204c835"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "3dfc8ada9795a7b64d4d680062bc4f96"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "83909a2f5f00d11c4aa671ac74ea238c"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "194a6812000f62ef4aa9e6e7850d83c5"
  },
  {
    "url": "ja/index.html",
    "revision": "4de14dc880593b6e005111ea07338d47"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "031bbb7d4d206abc154782070caa1604"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "6d597164b89015769363057bc0e455e4"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "40f1138b8875a58a0a8518c596416b79"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "850a937cf6c316840fa93c11ffcbf741"
  },
  {
    "url": "ja/team/index.html",
    "revision": "b4d5e362344fad15e2d54d1dcb055498"
  },
  {
    "url": "ko/404.html",
    "revision": "65c717f2e8d7bc9c72aba10f64143b43"
  },
  {
    "url": "ko/404/index.html",
    "revision": "51f86c95808569befa4070b9ce346a82"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "f8165560094716268a20efd0a34c11aa"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "c663b3bfa5e2b07166e4399d67c464b2"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "7a2eabd17e5d03116e0f58478cf397ee"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "85cd6339b519da1f701380e586067028"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "35dfbde6fd4a881700fabc4fef160093"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "dd5375974b306f61eeb142c1123009de"
  },
  {
    "url": "ko/index.html",
    "revision": "c795762edc80d2e8b47b167e1df307ef"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "ead7abdd7559758fd22a8fd0bbaada41"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "cd0c94296d1f4933b573f69c806163c1"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "8f8f5ad7892cad7cb4b078cabcb4e4d6"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "ac2fe8305ce0d368f413a803f372d59e"
  },
  {
    "url": "ko/team/index.html",
    "revision": "1fbad2ef892d853708bcd4dad5310a98"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "6d23c9ee6922ad973a90e798ef44691f"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "73b456be330b1ef84524bd246e461d08"
  },
  {
    "url": "team/index.html",
    "revision": "1d053dfee156855620349af9605e7067"
  },
  {
    "url": "webpack-runtime-f7b6c01b67c7b233c8b8.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "98063f75252db4ee3424c49af0986738"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "906b26a3b151000bbdb74d6509238ab2"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "911dc4c2a3184642fce42f524d446875"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "f755132349963105605b81d284da21db"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "71d48a843a485e032ead5ae80ad99833"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "99093fc1caa66333e8d9542e273656ce"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "547f140f79015f3f568d468ad9126f55"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "c9a6066ce73149df14cce07b31929bf6"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "f599dccf15971dd6b69a8a3bd6a3078f"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "2a7032bde4fddd0cf83d3a35ffd62a55"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "126e922e7f60b9168d259e32e84cf80d"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "015ae676703920e3019a0de06f7a67e0"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-0f87e30e4b4a9e21cd2c.js`))) {
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
