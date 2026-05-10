// 캐시 이름 — 업데이트할 때 버전 숫자 올리면 새 캐시 사용
const CACHE_NAME = 'today-routine-v12';

// 설치 시 캐시할 파일들 (앱 셸)
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './blueberry.png',
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css',
];

// 1) 설치: HTTP 캐시 우회하여 fresh로 가져옴
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        ASSETS.map(url =>
          cache.add(new Request(url, { cache: 'reload' }))
            .catch(err => console.warn(`캐시 실패: ${url}`, err))
        )
      )
    )
  );
  self.skipWaiting();
});

// 2) 활성화: 옛 캐시 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// 3) 요청 처리:
//   - HTML(navigate): network-first → 새 코드 즉시 반영, 오프라인 시 캐시 폴백
//   - 그 외(자산): cache-first → 빠른 로딩
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const isNavigate = event.request.mode === 'navigate';

  if (isNavigate) {
    event.respondWith(
      fetch(event.request).then(response => {
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        return response;
      }).catch(() => caches.match(event.request).then(c => c || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      });
    })
  );
});
