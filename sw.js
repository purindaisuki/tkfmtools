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
    "revision": "96636816fc8ab793675f394c95908058"
  },
  {
    "url": "404/index.html",
    "revision": "1764981a7f5db0c709b9ac7b02f7317b"
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
    "revision": "1cd3cb537f5e7c9cc163dcc7c974154f"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "1978265ee013e9aba48e55594ea1c02a"
  },
  {
    "url": "app-0f87e30e4b4a9e21cd2c.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-f2f889fb4f1db4769977.js"
  },
  {
    "url": "battle/index.html",
    "revision": "c6de1067e71771c4ebf6992fbd267b34"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "1c539921e61650bb2abea3a2052a6383"
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
    "url": "component---src-pages-team-build-js-ae8550e3f5d4d533f8f0.js"
  },
  {
    "url": "component---src-pages-team-index-js-df63c43eb33bb5fddbae.js"
  },
  {
    "url": "dc6a8720040df98778fe970bf6c000a41750d3ae-b499fe8d2f065c712e99.js"
  },
  {
    "url": "en/404.html",
    "revision": "2761be2d48c0f1a04ecb25e65bd47f81"
  },
  {
    "url": "en/404/index.html",
    "revision": "cd60494a91d808b6e096725e00987d59"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "5bf3326c8d749e9049da86d6b6c8489e"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "19ad00b650206c533d84860a102eb2e5"
  },
  {
    "url": "en/battle/index.html",
    "revision": "80d0618d584360008872ec3507436eb0"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "109fb55fbf88c74ae8177902389fb5c6"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "e6e207d0ff45f0af20ff19c210e12162"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "5396e844a446b9db23f4ba2a352e1c8d"
  },
  {
    "url": "en/index.html",
    "revision": "6e28c7662c2d491537d0eecd4db79a68"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "f1320e7c68b23e29b2184781de7b9761"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "abc91e357eaaebff7bfd204d666fdaa1"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "79d11d55482b16deb4710f3287187aa6"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "10140c3d3edaac1cffe43663647a866a"
  },
  {
    "url": "en/team/index.html",
    "revision": "696786d10a5d418ba2371caa8b95d0e8"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "310a35a4b47faebfe325ca88ce93ef0b"
  },
  {
    "url": "enlist/index.html",
    "revision": "2fa8c5d6216d2c8e527f6b89d32675e5"
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
    "revision": "028b64cfddeec9ea50cb2cf05daa0e60"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "8a2e41c438068e9e1e558900a6da3a32"
  },
  {
    "url": "items/drop/index.html",
    "revision": "c997f9d27879dd7c894e0f16a14bd9ea"
  },
  {
    "url": "ja/404.html",
    "revision": "4e231dfac45f7c1d15f624e3c4421034"
  },
  {
    "url": "ja/404/index.html",
    "revision": "8127083df65b898c431454d4a3dff2c0"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "f9aa7f2a86aa53d4388bb8b27eeab0e6"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "6afa5674fbda5518d581fdc43b7bc169"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "2dda50505ff22d2b31c92816ac5bde72"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "9c445165e3f34e0f1810833ff87b0a2a"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "f415662fe3a7af042c455b2a1c6e6424"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "9f1951a1d03cb26b4e4856d99b027d31"
  },
  {
    "url": "ja/index.html",
    "revision": "3e58980db8c93d40fd253d92e8a614d5"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "69540d1baf41f0c460b78e1fa60df099"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "8e41a8f7311f82c94f8d9fb8e6bdfc4d"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "15884f5442f64a6210aca5f571c9cfe7"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "0fecf58f3beb7ea86f28e38c7e49cdac"
  },
  {
    "url": "ja/team/index.html",
    "revision": "18839b9a8212ae11daab9f6819c745fd"
  },
  {
    "url": "ko/404.html",
    "revision": "85ed9356626e8b86efecb238048d37b6"
  },
  {
    "url": "ko/404/index.html",
    "revision": "36931ad041fe57c0880ef35abbf72461"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "b93fc37538ae5ab4058a8b4c8f93fb19"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "d61b33633820fcecce71567685959282"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "a292194786227eaee718f682efdc2bef"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "1f8f0abf13132ca4c9cf990a3a7140a0"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "3728d6aa4c911aab26b297b095372b61"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "a24069a087763d2194cac9a02ed51628"
  },
  {
    "url": "ko/index.html",
    "revision": "88adcd4ed4c66f46945a36a3965c5221"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "76f35ef72692a3c8c1e7f638df5928a5"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "fad360835d1cc7c2f7b7c42fdff70146"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "ac886a78eeaa9c145e24d0fae4619f65"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "339b1a757420f3c6fdf7c7964c3e8670"
  },
  {
    "url": "ko/team/index.html",
    "revision": "5b259e1b9663b56055fa30f909ffe7a1"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "05a1b6c176fdea5dd6f0d7fda96ede31"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "bed6014f081e6a1f93a9a1f64d518f09"
  },
  {
    "url": "team/index.html",
    "revision": "37a0135d78782b2fd2dd54743d810e57"
  },
  {
    "url": "webpack-runtime-6ddaaabc484d4e9e56f6.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "2c44a5b14cbc4992a3e75718fa83e7d3"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "78da6b15760ebb99ec4b0db6fa6ad669"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "790f14787014955d9e65b526db60a79b"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "c209c8a987e5d0e3c784d5152f5602ac"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "c02d424dcd219c91a88d02207df3c559"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "b7fddede93f2d1b9302c85e841e945d7"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "a81cdb8c313986ec47c78f48c76b9830"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "a87b2ce58ad5eb005aeebd41b166bf70"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "6fc881a8cc930eb03e6f1f746f5f0596"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "f0adb1e3442b8af159ee3a4870c544f6"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "892efd6185cda7373051fd223610c432"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "b639a0fa1cf12bc6b37d645f61b85314"
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
