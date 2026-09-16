self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open("checktrail-editor-v8").then((cache) =>
      cache.addAll(["./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./icon.svg"])
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== "checktrail-editor-v8").map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
