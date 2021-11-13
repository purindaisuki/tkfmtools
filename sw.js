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
    "revision": "ca339be76a4c4b7ebd0c430ae11fe084"
  },
  {
    "url": "404/index.html",
    "revision": "2e97ce2a223adb4d942c78910dcd7e7a"
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
    "revision": "47d4734858179899d261f117de755500"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "fb34fb38d27f518cf2c77e41ee464aec"
  },
  {
    "url": "app-c8b1322e51ff7c4dd5a2.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-f2f889fb4f1db4769977.js"
  },
  {
    "url": "battle/index.html",
    "revision": "591dc003a82d37457f097db620351e60"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "0f3a84f18946172d6373051a246e42ad"
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
    "revision": "653e33daacc2f26cee7a0a9c40fea444"
  },
  {
    "url": "en/404/index.html",
    "revision": "321056dcab8f1479340a8a9d38916509"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "5f54098c074b495761ff41bbbc5cbdfa"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "d0b59ae33c5ce8eb55224e1d0025bf45"
  },
  {
    "url": "en/battle/index.html",
    "revision": "0fc56078e5e62acd8342c8a356873e7d"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "0176763d9b753af29dd1ae6cbaf06d25"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "603b058363c393abc17ffea074556ce0"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "e4d8dc319554a52f0b6138d8f4a1b555"
  },
  {
    "url": "en/index.html",
    "revision": "376e1334166ec3294eade2219b80b65d"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "80a1babc81d2bfa525ae5d538f8b4763"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "669e9812b6bf7ea83ca71fde6605a30a"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "6b3d16ff1cd8fbb34865ec1921368aec"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "62ba423642901c49b33cdece1c6a4b98"
  },
  {
    "url": "en/team/index.html",
    "revision": "bd234f74f4d228f7789d37ed2619287e"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "59065bef1d5f0a4a9f233991bd88ab80"
  },
  {
    "url": "enlist/index.html",
    "revision": "e6ec3f4adab4fea52a0b69d6dc45447b"
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
    "revision": "f3bc66a0cdf883b2f9a19f154b842381"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "602365847c2ab510f9c40a24e2465403"
  },
  {
    "url": "items/drop/index.html",
    "revision": "c0281c666d27c017f69dcdef60a52d64"
  },
  {
    "url": "ja/404.html",
    "revision": "7d774df077ef747073477792d24c263c"
  },
  {
    "url": "ja/404/index.html",
    "revision": "0b652932d8602d2a1672e7d377569255"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "bd1fa8b76c6250c50e252eb0c75f799e"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "8bd45c640106fd3b2c2e178ac4466d85"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "ffec8b30847ae130761b2ec393533567"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "eb1da7dd4dc72d2da58fdc468f6fab49"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "03003dcdd80869bfd5c443c2f2741590"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "df9edce482d8a2074e6c9d03b1f6f8d6"
  },
  {
    "url": "ja/index.html",
    "revision": "8aea47397f40fefe7346ba748f5a0978"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "4969ee4c7565e85cbb589a342755479c"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "739d8abd7ad5ba730e761bb84ede4cdc"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "a0e44c9ff19691d680c8f2765f082d0a"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "842777198fdb8ce6b228a933d7c42f94"
  },
  {
    "url": "ja/team/index.html",
    "revision": "2262d8f9514927fe58f7cababf6c8332"
  },
  {
    "url": "ko/404.html",
    "revision": "50a3dc3f714575302f5f8cf94be5edbf"
  },
  {
    "url": "ko/404/index.html",
    "revision": "4dee7aecea8ef351673588192a83567b"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "e87b8872486403e19a30305fb82100b2"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "1777b3a57b9ee55ca91caaa059cd4669"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "27f5a85fc5dbe6ef552de45320999099"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "d69e23b04d23eeb4520b0fd2eb240668"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "37c44dbe69d608e49ea68de4c6dbeb14"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "7a617ba625048ae511088dc8f12e9164"
  },
  {
    "url": "ko/index.html",
    "revision": "ef46a1d03769775cbe871864eb862880"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "6205c0fb0d9025fe6fabfbb03d7dbdf0"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "1be62d8b9137d06b1a9bd484897b1e2f"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "67b52478603be3c112721d442ec498e7"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "f674b6377606de6030ed34bf72a5017a"
  },
  {
    "url": "ko/team/index.html",
    "revision": "f6ed513c0ebcac7a053f922614aee54a"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "70c53ab256653c20560d1d71e8f8a8ca"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "741ddbec9573f49c64d8a9d9b995d3a6"
  },
  {
    "url": "team/index.html",
    "revision": "4ee59afb0efe6a8e4294044fa292c040"
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
    "revision": "530eb46e20423e3d84abf328d9fe5212"
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
    "revision": "f81225d6ac88037f296a722d637b4fdd"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "11fec2007e82e225cb3ae90302d55af7"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-c8b1322e51ff7c4dd5a2.js`))) {
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
