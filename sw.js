// 캐시 이름 — 업데이트할 때 버전 숫자 올리면 새 캐시 사용
const CACHE_NAME = 'today-routine-v4';

// 설치 시 캐시할 파일들 (앱 셸)
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  // 외부 폰트 (Pretendard)
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css',
];

// 1) 설치: 캐시에 자산 미리 저장
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 핵심 파일은 실패 시 설치 자체 실패하지 않도록 개별 처리
      return Promise.all(
        ASSETS.map(url => 
          cache.add(url).catch(err => console.warn(`캐시 실패: ${url}`, err))
        )
      );
    })
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
    )
  );
  self.clients.claim();
});

// 3) 요청 처리: 캐시 우선, 실패 시 네트워크 (폰트 등 외부 리소스도 캐시에 저장)
self.addEventListener('fetch', event => {
  // GET 요청만 처리
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      
      return fetch(event.request).then(response => {
        // 응답이 정상이고 같은 출처면 캐시에 저장
        if (response && response.status === 200 && response.type === 'basic') {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, cloned);
          });
        }
        return response;
      }).catch(() => {
        // 오프라인이고 캐시도 없으면: HTML 요청은 index.html로 폴백
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
