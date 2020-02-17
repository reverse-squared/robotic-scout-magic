let cacheName = 'rsm';
let appShellFiles = [
    '0.rsm.js',
    '067595ad77ecc0db9c81c8905a7eef32.woff2',
    '0724bb8b89ab6b8b9b7df917b17be0b7.svg',
    '1.rsm.js',
    '10.rsm.js',
    '11.rsm.js',
    '12.rsm.js',
    '13.rsm.js',
    '14.rsm.js',
    '15.rsm.js',
    '16.rsm.js',
    '17.rsm.js',
    '3.rsm.js',
    '3351f435b3c9037fd88aeb04dc1e43bc.eot',
    '4.rsm.js',
    '4165c2688309cbfb1b877caf8f75afb5.woff2',
    '5.rsm.js',
    '55eb2a60e8181f0e68b558c991973bf0.woff2',
    '57dcda6f368ea90179f75cbdae96c263.eot',
    '5d0861781aeef6c82fda3a3076954a1b.svg',
    '6.rsm.js',
    '7.rsm.js',
    '73cf49a2232c06c920b7a34e36bfb58c.woff',
    '75f38a159982b6bd1704891332d95fa7.ttf',
    '8.rsm.js',
    '89e02bae13c9131c7468b1e729339ac1.eot',
    '9.rsm.js',
    '9d67fa1429375bd2a899a17eb77d0342.svg',
    '9ec698d1a597bff5df337094b71ddaaf.ttf',
    'a0e3ac82940c1998c5977fd4bc1f5ef6.ttf',
    'b564da88bbf0c4aa446fa19653713cd1.woff',
    'cdfec5cf5e9840889790bcf2c4042583.woff',
    'index.html',
    'rsm.js'
]

self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        });
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        });
    );
});