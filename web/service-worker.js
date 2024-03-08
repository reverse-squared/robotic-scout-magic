let cacheName = 'rsm';
let appShellFiles = [
    '0c6bfc668a72935760178f91327aed3a.eot',
    '111.js',
    '172.js',
    '1a575a4138e5f366474f0e7c5bd614a5.woff',
    '1d5619cd804367cefe6da2d79289218a.svg',
    '234.js',
    '243.js',
    '272.js',
    '289.js',
    '289.js.LICENSE.txt',
    '378.js',
    '378.js.LICENSE.txt',
    '37bc7099f6f1ba80236164f22e905837.svg',
    '397.js',
    '397.js.LICENSE.txt',
    '422.js',
    '513aa607d398efaccc559916c3431403.ttf',
    '567.js',
    '574.js',
    '592643a83b8541edc52063d84c468700.eot',
    '62.js',
    '766913e6c0088ab8c9f73e18b4127bc4.ttf',
    '773.js',
    '776.js',
    '867.js',
    '979.js',
    '979.js.LICENSE.txt',
    'b0e2db3b634d1bc3928e127458d993d8.eot',
    'b91d376b8d7646d671cd820950d5f7f1.woff2',
    'b9625119ce4300f0ef890a8f3234c773.ttf',
    'c5d109be8edd3de0f60eb472bd9ef691.svg',
    'd1d7e3b4c219fde0f7376c6facfd7149.woff',
    'd745348d289b149026921f197929a893.woff',
    'd824df7eb2e268626a2dd9a6a741ac4e.woff2',
    'ed311c7a0ade9a75bb3ebf5a7670f31d.woff2',
    'favicon.ico',
    'index.html',
    'main.js',
    'pwaicon.png',
    'workbox-b4c2a21b.js'
]

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        });
    );
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        });
    );
});
