self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("checktrail-editor-v1").then((cache) =>
      cache.addAll(["./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./icon.svg"])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
