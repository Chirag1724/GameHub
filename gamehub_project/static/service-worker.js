const CACHE_NAME = "gamehub-cache-v1";

const OFFLINE_URL = "/offline/";

const ASSETS_TO_CACHE = [
  "/",
  "/offline/",
  "/static/style.css",
  "/static/main.js",
  "/static/script1.js",
];

// Install – cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate – clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch – network first, fallback to cache
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const cloned = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, cloned);
        });
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((res) => {
          return res || caches.match(OFFLINE_URL);
        })
      )
  );
});
