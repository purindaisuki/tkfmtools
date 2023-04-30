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
    "revision": "f03c9319e55ab461105c999c677a7fc4"
  },
  {
    "url": "404/index.html",
    "revision": "c4ceafe581fd65097c747d99c6400efc"
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
    "revision": "4cdb27f6b476b939914edb64e6253773"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "83ce785964e6cc9851775098b476b1b9"
  },
  {
    "url": "app-b1cf6d0a1945d5678ed7.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-17536fea7541e7ffada5.js"
  },
  {
    "url": "battle/index.html",
    "revision": "5d41e21fcae150f5d79bd2a7cf3d60c3"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "de9f230047354f8e61077d88fa352119"
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
    "url": "component---src-pages-analysis-result-js-274caafdb6dfda2b0125.js"
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
    "revision": "ee422b37d263d9edd78ef305748e9a90"
  },
  {
    "url": "en/404/index.html",
    "revision": "aa2dfdc11264b292f0db9b3da726043e"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "f5ac32028be18a429599810d56eff6c6"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "60de6160cdb3f1120416dba38c042bce"
  },
  {
    "url": "en/battle/index.html",
    "revision": "39bd9e3fcac98d0a98bbe7fc1206f012"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "9fcad09e1095d6e1ac73195832d20cca"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "e0be12e1ba9293bad5019b5524359e63"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "8735fbf59e6cd57e7b8c2590a0a2c5c5"
  },
  {
    "url": "en/index.html",
    "revision": "45527bb2146ed3c92cc443f8d5e9891a"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "5388e723c1454084754c1ac37530f387"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "e60f8130187d0eaba7d72c8c7964a8ba"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "2b3fa4b93e6681d29e37e4a49d0c61de"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "123be05daa0df1368ff570a3fac57855"
  },
  {
    "url": "en/team/index.html",
    "revision": "8bbfc33e6f292efe80ac29cd77bd2331"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "85c9ad6d6eea2d53c2b35ffb9130510f"
  },
  {
    "url": "enlist/index.html",
    "revision": "46ea6ed7e39c0f6f952982d65d47af34"
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
    "revision": "d0f8b114d38fe6e541c3e2b161e02d16"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "2ef117930db780bcf8f7eab51c262dd0"
  },
  {
    "url": "items/drop/index.html",
    "revision": "5ecd7f97fe4ec4c4ddcac557c6eccd3b"
  },
  {
    "url": "ja/404.html",
    "revision": "e9d7ab9ac88ee1869cb67eba875dcdf5"
  },
  {
    "url": "ja/404/index.html",
    "revision": "8a84ead97955753b17bcef819a73f539"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "28e3b6dd6fc93a1baac513b5a34e1ec2"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "b043a9713d9889e58278b3a48d595f46"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "adc7e74ef5146d092c390f290c139097"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "034114fecc55db8e19d074e53fda0517"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "0b514aaf1c62601c52ad0db28f3091ad"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "39bc4ff31402fafb8eafffa94b24fd98"
  },
  {
    "url": "ja/index.html",
    "revision": "586c8b3057a3a3717d3a850ea2ceea6d"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "50902a7394337fcec42748a7d541fe40"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "67bbb16ae316bb841faa6e099d9f85b6"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "32f2817bda71e94f28ae8cf880c942f8"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "c11df9f359e207deb1dce8c3e3549582"
  },
  {
    "url": "ja/team/index.html",
    "revision": "bb3c156f8299a8a07ef44de92c15a082"
  },
  {
    "url": "ko/404.html",
    "revision": "e23951dde2151bc88ed23ce050f8bcf7"
  },
  {
    "url": "ko/404/index.html",
    "revision": "a970dbf4db7d9ba8a7583167840b9b22"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "354a47f85635d8e7aa1583abecf7866f"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "83884abffffd523cd4025bdc54fe8232"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "6b5cd6fa3b3f014c9bf1d7083cd39223"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "2299ada1470469938d6e6bf8bc6db300"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "087fb134eabb969b1273dedda307fe4d"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "a3a74fd5ad04a0f7adfa7984daf4f25a"
  },
  {
    "url": "ko/index.html",
    "revision": "7d990a7a5277a34522f925c19e0a9acd"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "72245adc008029a7a666e34b5ba95a9b"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "23b31106c5ec5df3167e8064034c0121"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "24fe76dc95101ef09f70cd72661e9804"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "edba5eb440a35fff1b96370349931700"
  },
  {
    "url": "ko/team/index.html",
    "revision": "822e9baba7db1e534e9349df32e8c52d"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "edf5d73a5fbb239cef1db11742876da1"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "341e0ef650a81466f0cea6c2f393bc69"
  },
  {
    "url": "team/index.html",
    "revision": "6c68175b0879e7baf1f2a7517d371737"
  },
  {
    "url": "webpack-runtime-0b490fe3f58ab0169dd5.js"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "f2f7d3923d3ec9dc657ac794a2108002"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "bc87b61ab1b0270d7138f61a2fcb4f2b"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "e311efb41c3f5d733d043493ae5959f0"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "c2b3244c1de09056f5d50352d7b192c5"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "77f7c797216d2098d707ea43e78260ab"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "3927a4302d2c1ed6bda4725a6aede95e"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "5dd89dc0e2bdd52672009b9d10f13e50"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "a77d0211c02e944241753ee957cd03ea"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "688d99bf665d684fc9757e74d176f5ce"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "1c845a0f86eb0c781c1c1d897704fc3f"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "7cf1539b07857767b9937f83d92a09c9"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "c4ac87df1fd02a5983bf2d6ec04f54ea"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-b1cf6d0a1945d5678ed7.js`))) {
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
