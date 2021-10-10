this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("salesSheetV1").then((cache) => {
      return cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/bundle.js",
        "/static/js/vendors~main.chunk.js",
        "/index.html",
        "/",
      ]);
    })
  );
});

this.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      }
    })
  );
});
