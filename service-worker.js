// Define the cache name
const CACHE_NAME = 'ukmp-v1';

// Define the files to be cached
const urlsToCache = [
    '/',
    '/index.html',
    '/index.js',
    '/index.min.js',
    '/prevent-xss.js',
    '/prevent-xss.min.js',
    '/secure.js',
    '/secure.min.js',
    '/app.js',
    '/app.min.js',
    '/about/index.html',
    '/about/about.js',
    '/about/about.min.js',
    '/logo/ukmp-logo-48x48.png',
    '/logo/ukmp-logo-72x72.png',
    '/logo/ukmp-logo-96x96.png',
    '/logo/ukmp-logo-144x144.png',
    '/logo/ukmp-logo-192x192.png',
    '/logo/ukmp-logo-512x512.png',
    '/logo/ukmp-logo-16x16.ico',
    '/logo/arunika.png',
    '/logo/arunika.webp',
    '/logo/ukmp-logo-48x48.webp',
    '/logo/ukmp-logo-72x72.webp',
    '/logo/ukmp-logo-96x96.webp',
    '/logo/ukmp-logo-144x144.webp',
    '/logo/ukmp-logo-192x192.webp',
    '/logo/ukmp-logo-512x512.webp',
    '/logo/180x180 Apple-Touch-Icon.webp',
    '/logo/152x152 Apple-Touch-Icon.webp',
    '/logo/120x120 Apple-Touch-Icon.webp',
    '/logo/76x76 Apple-Touch-Icon.webp',
    '/logo/60x60 Apple-Touch-Icon.webp',
    '/logo/180x180 Apple-Touch-Icon.png',
    '/logo/152x152 Apple-Touch-Icon.png',
    '/logo/120x120 Apple-Touch-Icon.png',
    '/logo/76x76 Apple-Touch-Icon.png',
    '/logo/60x60 Apple-Touch-Icon.png',
    '/logo/DD.jpg',
    '/logo/COMDEV.png',
    '/logo/PRD.jpg',
    '/logo/RED.jpg',
];

// Install the service worker and cache the files
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// Serve cached files if available, and cache new responses
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request).then(function (response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
});
