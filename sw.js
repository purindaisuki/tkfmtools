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
    "revision": "1963236a5c60bb78973f6ea0c9590c73"
  },
  {
    "url": "404/index.html",
    "revision": "b2db7fa588622a54b273da9c08d3f25a"
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
    "revision": "90d02bfbe78aec500e7b4f211e36c679"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "2e3bdd4bfa7742d581b16cbf821d6fd0"
  },
  {
    "url": "app-2cfde297e4abfe629027.js"
  },
  {
    "url": "app-34a34e096a08559201fb.js"
  },
  {
    "url": "app-6afe0d54e4bed382840a.js"
  },
  {
    "url": "app-6e2af9aa6a48e1b9d33c.js"
  },
  {
    "url": "app-827eabf6632a92dd31a6.js"
  },
  {
    "url": "app-a5a4cc8dc83e0af4a11e.js"
  },
  {
    "url": "app-dc3b935083c695bdc6ad.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "346944da272f343b358e39a675f358ba"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "8ae099abf1da629154732e286047c2c3"
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
    "url": "component---src-pages-analysis-result-js-916d7023de79d858f858.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-b9ada44f05604cb5bd05.js"
  },
  {
    "url": "component---src-pages-analysis-result-js-ee438119276526c446ba.js"
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
    "revision": "91a9b2684ed3fb70b0d52672ffc97c8e"
  },
  {
    "url": "en/404/index.html",
    "revision": "24192f7a43a357ebf28fb51e79a6b0fe"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "1eb603353711f73bc00ce7b5905278ea"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "a233375abd599899f6667a6f0d4662b8"
  },
  {
    "url": "en/battle/index.html",
    "revision": "d519208e119192d76aaa7c72eeecef5c"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "c6acbd1aba368b9377cd2a8e80be74d9"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "0a65108e62516d45346eee69c7ff6311"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "f22f7871414b5c8f133f69b5a09c8251"
  },
  {
    "url": "en/index.html",
    "revision": "97eb865eecd7338a0ac7a6f7aaffc04f"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "e86fbd1c222497b01a0aac2bdafe76c3"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "0c1bfecd72a6bf801b1f3c042a0ff839"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "01890766d1e6ae4476cc24ac5c31c4ed"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "456ee0e4ab0407a231c8f8864fd44a9d"
  },
  {
    "url": "en/team/index.html",
    "revision": "f8ced9d6c6383617fe94a32c1df0c0cf"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "c64b959dd72922fccc8ae60a8134d78c"
  },
  {
    "url": "enlist/index.html",
    "revision": "ff95a221888f5e11688dac775be130f7"
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
    "revision": "c6d963717676c4e1b477749657ea6788"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "3308c8080740289e2c520038ff64ca4d"
  },
  {
    "url": "items/drop/index.html",
    "revision": "c38df9a076c368cbdc714490e8fa6920"
  },
  {
    "url": "ja/404.html",
    "revision": "dee2e311f994334f6cdeb9fada8ee316"
  },
  {
    "url": "ja/404/index.html",
    "revision": "7f2850d15dd52be7f15a9385ae7e369e"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "fa4812c4ea6accc4b26009073d135f18"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "8b3c921419a62c4ca0938192d03f76f1"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "cd40b6e82d9eb294a0cad28563d5c44a"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "e3a3c483a4048810cbcdfc5f86e62d2c"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "21f4131a8190d3cad99ca5ece747cbcb"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "3f9eacb5e77efe793d18a6ea89a857cf"
  },
  {
    "url": "ja/index.html",
    "revision": "15f135f69211ee461bffb506d6de26c1"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "168db49c681db0afa461daa970644020"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "6565dad9be5f2a1c45079137b2105f07"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "b65faa0faba3371481c1a03ce17ebf7f"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "4c887663f0b98a2ec5cbd8193c59f68b"
  },
  {
    "url": "ja/team/index.html",
    "revision": "121fb731d9ff559fd01797eacbec5fa0"
  },
  {
    "url": "ko/404.html",
    "revision": "6e19e7ca71c6cc0d51c3959624511498"
  },
  {
    "url": "ko/404/index.html",
    "revision": "06bb7d3f791d664d1ea3bc9ef29ae134"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "00ff6cdba24ace35473df95be1d9b0a9"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "bd564fbb2012c5dc1ec4786dcc053087"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "f6613843886b4fbd53b33c3aa58ed669"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "8f621effa383de976fc5f7cbd8bece22"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "335a5fc968cc9b5db87da60dfbd706ab"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "f32214018d01ce92e80fd2e1beaab27d"
  },
  {
    "url": "ko/index.html",
    "revision": "2171bc443b0b50d048ddfe1a800dd0d4"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "dce662cd616a437c9493ee2599e20fb3"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "9eb4b3fd4a51b52aea50cc74f9173575"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "9182cfa4d7744017f158f055935b5d51"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "f945c3c55aafb2370771672dca1e23ba"
  },
  {
    "url": "ko/team/index.html",
    "revision": "47f10104c057d7dce788a1caeb9b7885"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "54ccc29aa64904f4280034c84b3bbf63"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "7cab94bfa2a024d685868c7913d4f1d0"
  },
  {
    "url": "team/index.html",
    "revision": "3cc5cd26aa7aa567fd3f9eb0b9c4c206"
  },
  {
    "url": "webpack-runtime-0386b7e2f09b674e3fdb.js"
  },
  {
    "url": "webpack-runtime-2c74060339181f1db120.js"
  },
  {
    "url": "webpack-runtime-2cb8c00d2b6c177a7ff0.js"
  },
  {
    "url": "webpack-runtime-8d448f94ec453575b3ed.js"
  },
  {
    "url": "webpack-runtime-9dafe063fbb5c497464f.js"
  },
  {
    "url": "webpack-runtime-d13d40d9ab19fca29263.js"
  },
  {
    "url": "webpack-runtime-e54935f4e484f984b8db.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "3e76806b5b20ab540661df0a00b14775"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "3f4a3d6a68ea4a36a8bff6a3f9f28982"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "912b9dee69696651d20557d06f555ef8"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "c87b02c3a64797d1de71dddc2b98e693"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "33771d198bcee1d1328c5479a81f6f47"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "66f1efa990e4fa470cc580230798b2c3"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "6e8d243a9ce09d9066e9709f822ac860"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "02623d81eb25966495c59dc85d5df4e2"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "5a64b0879e0bacdf553d92df58575c5c"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "024ad48d2764354f17599a0d448f05f0"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "b4a1d543ecf4fa4b512da637555b13d4"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "c59e272d12ddbb4250e5a2094b28765b"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-6e2af9aa6a48e1b9d33c.js`))) {
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
