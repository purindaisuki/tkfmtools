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
    "revision": "12c73e5d56b007fe6aa6266e534103f4"
  },
  {
    "url": "404/index.html",
    "revision": "64ff731e24b9b72ce8e59a3d203183c2"
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
    "revision": "9f01f4978139265c5b6dd0c2fe68349d"
  },
  {
    "url": "analysis/result/index.html",
    "revision": "7ca50b695324fb8c06c318ee7096421d"
  },
  {
    "url": "app-a4f0770352030c95a8fd.js"
  },
  {
    "url": "ba84465c50cd65a883382dd9f0696c08a8091814-f2f889fb4f1db4769977.js"
  },
  {
    "url": "battle/index.html",
    "revision": "be950d59e985eda8d87f9801f7a28916"
  },
  {
    "url": "bee240a3-17ac05865318dfb29d84.js"
  },
  {
    "url": "characters/potential/index.html",
    "revision": "b39ccda9ffe8db9c41b35f60f5a3bb34"
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
    "revision": "247559696840da286c69309351c2ad2c"
  },
  {
    "url": "en/404/index.html",
    "revision": "850801ffe35220ec846f7c9df70e929f"
  },
  {
    "url": "en/analysis/index.html",
    "revision": "581527174471ca6e9aba0a265d955ffe"
  },
  {
    "url": "en/analysis/result/index.html",
    "revision": "0cf205c0441ee211f4f66fdab5f55dad"
  },
  {
    "url": "en/battle/index.html",
    "revision": "fc16333a2ab9a4f54ed238341841b24d"
  },
  {
    "url": "en/characters/potential/index.html",
    "revision": "fb3f64be57f3f28a0dfe105837a7ab63"
  },
  {
    "url": "en/enlist/filter/index.html",
    "revision": "2536ce264c4e812f1678aabf90b6758e"
  },
  {
    "url": "en/enlist/index.html",
    "revision": "6a7de2fb3b46cefae0a05953b6ac99f1"
  },
  {
    "url": "en/index.html",
    "revision": "672b5e1c784333c9ffec3e760dd1eed8"
  },
  {
    "url": "en/items/drop/filter/index.html",
    "revision": "30a75009ee5e67b2d267c6c818c52543"
  },
  {
    "url": "en/items/drop/index.html",
    "revision": "1dc51b9df99069a4037a0b6d75cde405"
  },
  {
    "url": "en/offline-plugin-app-shell-fallback/index.html",
    "revision": "d2c7400909cf5172fec46909c268ca9a"
  },
  {
    "url": "en/team/build/index.html",
    "revision": "73fc116b8d86e388f612bfa66e9fa7c3"
  },
  {
    "url": "en/team/index.html",
    "revision": "3e7c162a6598d30d7ab000f0990495d0"
  },
  {
    "url": "enlist/filter/index.html",
    "revision": "6012dd4812c95937615c5a73dbc0f081"
  },
  {
    "url": "enlist/index.html",
    "revision": "13f87c521c1d5f71c7c3b6ea4ed9297c"
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
    "revision": "4fbfe21ce6a30be92b6fc05377549682"
  },
  {
    "url": "items/drop/filter/index.html",
    "revision": "82c6f4f7ef54a5d88dd787419c1f9e56"
  },
  {
    "url": "items/drop/index.html",
    "revision": "46506dc4784e35ae59bb88e72d270b75"
  },
  {
    "url": "ja/404.html",
    "revision": "f7eae667d6b4ef5ac7acaef86087b8ae"
  },
  {
    "url": "ja/404/index.html",
    "revision": "ba4843bbb9f8e901c10e7a1317a03ff9"
  },
  {
    "url": "ja/analysis/index.html",
    "revision": "56d0edf8a13729cad31d7d639700830e"
  },
  {
    "url": "ja/analysis/result/index.html",
    "revision": "5b58013adbacd3347949b66c40d53edc"
  },
  {
    "url": "ja/battle/index.html",
    "revision": "5949c086e277a12a41e20c65defcb647"
  },
  {
    "url": "ja/characters/potential/index.html",
    "revision": "4a33777b53cf15439cb71de53459ec06"
  },
  {
    "url": "ja/enlist/filter/index.html",
    "revision": "febc382d1c4cce844065c9ce5890b1ae"
  },
  {
    "url": "ja/enlist/index.html",
    "revision": "c7115127ccf3fda34daeb6531b7bf335"
  },
  {
    "url": "ja/index.html",
    "revision": "7bce40123881b4d2a83e8928ae792c00"
  },
  {
    "url": "ja/items/drop/filter/index.html",
    "revision": "921f46fe33f01d0dc011ebd473b627ad"
  },
  {
    "url": "ja/items/drop/index.html",
    "revision": "65c5a9b8b0e0b3827828be4f64be611a"
  },
  {
    "url": "ja/offline-plugin-app-shell-fallback/index.html",
    "revision": "299711988ceed6591087bd72095b0710"
  },
  {
    "url": "ja/team/build/index.html",
    "revision": "de07a3e2f427dd6e99fd441e0d91b0e5"
  },
  {
    "url": "ja/team/index.html",
    "revision": "c6acb108823ee40711fe307d0909bf52"
  },
  {
    "url": "ko/404.html",
    "revision": "6ab44212333fc6a3aaf07d2bcb835c71"
  },
  {
    "url": "ko/404/index.html",
    "revision": "670af44f40da68b5e21259ccc22bed6f"
  },
  {
    "url": "ko/analysis/index.html",
    "revision": "517211c1739f190b1680cecb33193b14"
  },
  {
    "url": "ko/analysis/result/index.html",
    "revision": "62b76c7a2776f276501961f441e4303a"
  },
  {
    "url": "ko/battle/index.html",
    "revision": "421fcae8c7eae36c996bde0f1bc0bdac"
  },
  {
    "url": "ko/characters/potential/index.html",
    "revision": "37b8512e88e65aba40d42dfba5680a8c"
  },
  {
    "url": "ko/enlist/filter/index.html",
    "revision": "5b4c54c566572125a3ac13e287c2fd8a"
  },
  {
    "url": "ko/enlist/index.html",
    "revision": "9cff7a78d3dda17c83ee61f8a28c08af"
  },
  {
    "url": "ko/index.html",
    "revision": "a65e4951ff30f8fa545f07d5ba8a7f80"
  },
  {
    "url": "ko/items/drop/filter/index.html",
    "revision": "1adae7445dca41d0e958eaaadbbca7ca"
  },
  {
    "url": "ko/items/drop/index.html",
    "revision": "0c7c4eb26c75c542fcf5f5f3e8bdc267"
  },
  {
    "url": "ko/offline-plugin-app-shell-fallback/index.html",
    "revision": "5e1fff462867350a16353fb97dbe509c"
  },
  {
    "url": "ko/team/build/index.html",
    "revision": "bbdaf3e5eaf28b70c90a62b8fd6a95b9"
  },
  {
    "url": "ko/team/index.html",
    "revision": "9283a667f39edf9d34f0e6f8552ffc5b"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "88a52d341db8ed855cda2cb71a66ed77"
  },
  {
    "url": "polyfill-a48428891306ffe63524.js"
  },
  {
    "url": "styles.b0b1b9e2c8a2e72b9a36.css"
  },
  {
    "url": "team/build/index.html",
    "revision": "2bc07e841fdbdbbff4a52d0b7f360ae8"
  },
  {
    "url": "team/index.html",
    "revision": "ba93abfa95547e76d4447d5b38d41a0c"
  },
  {
    "url": "webpack-runtime-28896f51146cfa4ced81.js"
  },
  {
    "url": "webpack-runtime-72ae66d56173c259c6ea.js"
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
    "revision": "fa720ba4c8efd71c3836705c3778243d"
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
