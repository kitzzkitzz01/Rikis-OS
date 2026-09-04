const CACHE_NAME = "rikis-os-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./study.html",
    "./subject.html",
    "./topic.html",
    "./assignments.html",
    "./exam.html",
    "./progress.html",
    "./code.html",
    "./projects.html",
    "./planner.html",
    "./her.html",
    "./manifest.json"
    ".icon.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
