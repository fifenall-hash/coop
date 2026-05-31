const CACHE_NAME = 'chess-coord-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './sw.js'
];

// 설치 시 파일 캐싱(저장)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 네트워크 요청 가로채기 (오프라인 지원)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});