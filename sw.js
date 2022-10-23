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
    "revision": "d92181f3f0f575b8aa00d1b5962fbae2"
  },
  {
    "url": "404/index.html",
    "revision": "eec15aa195194f9765c3d4311e961f79"
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
    "revision": "77dab96fc0c82be539f31f541f1e05ce"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "dbc2d271f8802fad06d3c729178df593"
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
    "revision": "76301934c50674859a82033cffeac97b"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "c7257bba7ab3d73634d3d26e0878cea7"
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
    "revision": "fc00f1f54677961c28b137159a77a0a8"
  },
  {
    "url": "en/404/index.html",
    "revision": "52688f8ff86975a12d1cf880e844b69b"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "fcf8b7a6e4e607392ce794da666fbc79"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "3c99b025a045549e1d8f5d3d39e1d224"
  },
  {
    "url": "en/battle/index.html",
    "revision": "ec95fcfb6bbb9c9d9b56eb624ad1841e"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "ab0a3456e37d9df8a9fb760da763b821"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "a9d93486d59fb143bc91d6b36ec09521"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "998f478d025884d9b21529daa75cae31"
  },
  {
    "url": "en/index.html",
    "revision": "b4e330a437743552824f55dd34029da5"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "419d6d504ed48e89d1e9e63778a000ad"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "6312f957d8a79535581581a484e4f456"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "d1100186006fee375ff5d0f47d52a1d1"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "d54d993d92e56613a26329edd239b3db"
  },
  {
    "url": "en/team/index.html",
    "revision": "a40cc365a8ed48d85906cf2f304d084d"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "7ade34a423d532bd91c7c7d953b7f01c"
  },
  {
    "url": "enlist/index.html",
    "revision": "395ac4822dbf69c2d824d41f50e1cab3"
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
    "revision": "9636efaec92a2ccbd0e1220c3eab9afd"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "be0b6978a564850829fe41ba70c961b9"
  },
  {
    "url": "items/drop/index.html",
    "revision": "58ebc6548380e685993c8846861f80db"
  },
  {
    "url": "ja/404.html",
    "revision": "860a26d8bcd3ecb6702f2465ee43643e"
  },
  {
    "url": "ja/404/index.html",
    "revision": "273d49a295042cb1bad4d5d8750c89db"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "23fd7fca94cf753d3f8d0ef78fbb817f"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "35d4ee41c4c8d91a04fa9162b01135ed"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "18bd3276d49b434efcb5908c662677d9"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "3f8f2464b778a7d44ea9c4fe43229142"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "f30d5acd095540f9cde56a2102eadb1d"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "0a11e39de30f8ca7e2b4acab7b0e1e33"
  },
  {
    "url": "ja/index.html",
    "revision": "0481d89ba7fbf473339531679438c0dd"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "fa65e997dd7b71e9fc965ed73a141067"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "46bd0205da5422200bf824a2aedb9e7a"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "7305351ec352787fdf9fb2e16c32780b"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "c4f63d01d349563523d622ff942fab27"
  },
  {
    "url": "ja/team/index.html",
    "revision": "78127511feb8f3a39c83d49c0e99a908"
  },
  {
    "url": "ko/404.html",
    "revision": "f4654a4601ebabd2af62b4a1c56d7cf1"
  },
  {
    "url": "ko/404/index.html",
    "revision": "7bae8daf6b9957317d4c64704a7e55a4"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "a7af03e8004aaf8dde3ed7faf02cc48a"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "ddb4084830e527d2a46f589b61bc98ff"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "30f424766bba3a2d286cd373791bc96f"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "566a82721ac1b5fc821fee13964d6a82"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "14c9f555adaf77112c76eeb210f36643"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "aa25f9aea03fd095008fa961a1f9d9c0"
  },
  {
    "url": "ko/index.html",
    "revision": "1ea895c624d90cbd743c52982667f051"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "d869227d518a9fe61bf4ec35f9eb8994"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "b3beff3ff1404a12de3e781b22624cec"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "23e9bcc790e9df832f708ca40efd8a7d"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "5b47fa959fac432105855a5bc27184b8"
  },
  {
    "url": "ko/team/index.html",
    "revision": "950ef50cc798434954c313a2da6d53a6"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "86c664a629dd0d0a15bb69cd816b16bb"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "9ec80c7a452b2403dad5fbc29aa51da6"
  },
  {
    "url": "team/index.html",
    "revision": "9249f654a1d4000a329e0696139a7c0a"
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
    "revision": "6612ee07bb593398f8589119eb7e3d6d"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "fafcf9322bf4eec2a8a623904bbadaec"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "37ad36b806f00f0cdac373d976c265e0"
  },
  {
    "url": "page-data/en/page-data.json",
    "revision": "851f31a53c0c8840b23363b412f110a2"
  },
  {
    "url": "page-data/ja/page-data.json",
    "revision": "f02d9a18b2a485c94a41416b0b591b50"
  },
  {
    "url": "page-data/ko/page-data.json",
    "revision": "448dd7f580816da6a0b7b21dbdd276ef"
  },
  {
    "url": "page-data/enlist/filter/page-data.json",
    "revision": "631c4707527aaf93c6ac8e260d120f8f"
  },
  {
    "url": "page-data/sq/d/2549082989.json",
    "revision": "2b63f2f3dab25db3db6e38fce1036810"
  },
  {
    "url": "page-data/sq/d/3068648073.json",
    "revision": "0c8116b22642e0965b836b71bcda3430"
  },
  {
    "url": "page-data/en/enlist/filter/page-data.json",
    "revision": "1a88dd1d5b86542977006dc9233de1b6"
  },
  {
    "url": "page-data/ja/enlist/filter/page-data.json",
    "revision": "204a42e55e2c374a3954e97670621066"
  },
  {
    "url": "page-data/ko/enlist/filter/page-data.json",
    "revision": "316f21197ee87d73ad3180d0ca06201f"
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
  if (!resources || !(await caches.match(`/tkfmtools/app-a5a4cc8dc83e0af4a11e.js`))) {
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
