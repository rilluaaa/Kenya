const CACHE = "care-home-v2";
const BASE = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const scopedPath = (path) => `${BASE}${path}`;
const CORE = [
  "/",
  "/choose-mode/",
  "/scenarios/",
  "/scenarios/amina-birth-plan/",
  "/quick-tools/",
  "/quick-tools/birth-plan/",
  "/quick-tools/learning-cards/",
  "/guided-visit/",
  "/results/",
  "/about-safety/",
  "/offline.html",
  "/manifest.webmanifest",
].map(scopedPath);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(async () => (await caches.match(event.request)) || (event.request.mode === "navigate" ? caches.match(scopedPath("/offline.html")) : Response.error())));
});
