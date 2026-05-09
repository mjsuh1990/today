# 오늘의 루틴 - 프로젝트 컨텍스트

이 파일은 Claude Code가 프로젝트 컨텍스트를 빠르게 파악하기 위한 가이드입니다.
바이브코딩으로 만들고 있는 PWA 루틴 관리 앱입니다.

## 프로젝트 개요

개인 루틴/투두 관리 PWA. 청량한 블루+옐로우 톤의 디자인.

**핵심 컨셉**
- 평일/휴일/휴가 모드별 루틴 관리
- 시간대별 분류 (평일: 아침/회사/저녁, 휴일: 아침/낮/저녁, 휴가: 아침/낮/저녁)
- 이모지 체크 + 형광펜 강조
- 캘린더로 날짜별 달성률 확인
- 한국시간(KST) 기준 동작
- localStorage 저장 + JSON 백업/복원/공유링크
- PWA로 홈 화면 설치 가능

## 기술 스택 (의도적으로 미니멀)

- **Vanilla HTML/CSS/JS** — 빌드 도구, 프레임워크 없음
- **단일 파일 구조** — `index.html` 안에 모든 코드 (CSS, JS 포함)
- **Pretendard 폰트** (CDN)
- **Service Worker** — 오프라인 지원
- **Web Manifest** — PWA 설치

빌드/번들링/패키지 매니저 없음. `index.html`을 열거나 정적 호스팅에 올리면 끝.

## 파일 구조

```
today-routine/
├── index.html              # 모든 앱 코드 (HTML/CSS/JS 통합)
├── manifest.json           # PWA 메타데이터
├── sw.js                   # Service Worker (오프라인 캐싱)
├── icon.svg                # 원본 아이콘 (수정 시 PNG 재생성 필요)
├── icon-192.png            # PWA 아이콘
├── icon-512.png            # PWA 아이콘 (대형)
├── icon-maskable-512.png   # Adaptive 아이콘
├── apple-touch-icon.png    # iOS 아이콘
├── README.md               # 사용자용 안내
├── GETTING_STARTED.md      # 개발 시작 가이드
├── CLAUDE.md               # 이 파일
└── .github/workflows/
    └── deploy.yml          # GitHub Pages 자동 배포
```

## 코드 구조 (index.html 내부)

`index.html`은 길지만 명확히 섹션이 나뉘어 있습니다:

1. **`<head>`**: PWA 메타태그, 폰트, 아이콘
2. **`<style>`**:
   - CSS 변수 (`:root`) — 컬러 팔레트의 단일 진실 소스
   - 배경 그라데이션 (body::before, body::after)
   - 컴포넌트별 스타일 (헤더, 진행률 카드, 루틴 항목, 모달, 캘린더, 설정 등)
3. **`<body>`**: 시멘틱 HTML 구조
4. **`<script>`**:
   - 한국시간 헬퍼 (getKSTDate, formatDateKST 등)
   - 상태 관리 (state, loadState, saveState)
   - 렌더링 함수 (render, renderContent, renderProgress 등)
   - 이벤트 핸들러
   - 캘린더, 모달, 설정 모달 로직
   - 백업/복원/공유링크
   - PWA 설치 프롬프트

## 컬러 팔레트 (CSS 변수)

청량한 시안/터쿼이즈 + 노란 포인트.

```css
--ink: #0a3a5c          /* 메인 텍스트 (깊은 코발트) */
--primary: #00b4d8      /* 메인 컬러 (시안) */
--primary-deep: #0077b6 /* 깊은 코발트 */
--cyan: #00d4e6         /* 밝은 시안 */
--accent-yellow: #ffd95c /* 킬러 컬러 (햇살 노랑) */
```

배경: 청량한 바다 톤 그라데이션 + 떠다니는 광원 애니메이션.

## 데이터 모델 (localStorage)

```js
// key: 'today_routine_data_v1'
{
  routines: [
    { id, name, emoji, time, modes: ['weekday', 'weekend', 'vacation'], 
      color, type: 'routine' | 'todo' }
  ],
  completions: { 'YYYY-MM-DD': { [routineId]: true } },
  reflection: { 'YYYY-MM-DD': '회고 텍스트' },
  streak: 0,
  lastCompleteDate: 'YYYY-MM-DD' | null,
  customEmojis: [],         // 사용자가 추가한 이모지
  dailyMode: { 'YYYY-MM-DD': 'weekday' | 'weekend' | 'vacation' },
}
```

**중요한 마이그레이션 규칙**: 옛 형식의 `mode: 'both'` 필드를 발견하면 자동으로
`modes: ['weekday', 'weekend']` 배열로 변환합니다 (loadState에서 처리).

## 개발 워크플로우

### 로컬 실행

```bash
# Service Worker가 동작하려면 HTTPS 또는 localhost가 필요해요
python3 -m http.server 8000
# 또는
npx serve
```

브라우저에서 http://localhost:8000 열기.

### PWA 동작 확인

Chrome DevTools → Application 탭:
- Manifest: 아이콘/색상이 잘 잡혔는지
- Service Workers: 등록됐는지
- Storage → Local Storage: 데이터 확인

### 캐시 갱신

`sw.js`의 `CACHE_NAME` 버전을 올리면 사용자에게 새 캐시가 배포됩니다.

```js
const CACHE_NAME = 'today-routine-v1';  // → v2로 업
```

## 코딩 컨벤션

- **단일 파일 유지**: 컴포넌트 분리하지 말 것 (의도적인 단순함)
- **외부 라이브러리 추가 지양**: 꼭 필요할 때만, 그것도 CDN으로
- **CSS 변수 우선**: 색상/간격은 변수로 관리
- **한국어 텍스트**: UI 텍스트는 한국어
- **이모지 활용**: 마이크로한 친근함을 위해
- **접근성**: 색맹 사용자도 구분 가능하게 (단순 색만이 아니라 형태/위치 활용)

## 자주 하는 작업

### 새 기능 추가 시 체크리스트

1. `state` 데이터 모델 변경이 필요한가? → `loadState`의 기본값과 마이그레이션 추가
2. UI 요소 추가 → HTML 마크업 + CSS (CSS 변수 활용) + JS 핸들러
3. 백업/복원 영향? → `importData`, `loadFromUrlIfPresent`도 새 필드 보존
4. PWA 캐시? → 새 정적 파일 추가 시 `sw.js`의 ASSETS 배열에 추가

### CSS 변경 시

- 컬러 변경: `:root` CSS 변수만 수정
- 청량한 분위기 유지: 흰색 카드 + 시안 배경 + 노란 포인트의 균형
- 글래스모피즘은 핵심 (backdrop-filter)

### 아이콘 변경 시

`icon.svg`를 수정한 후 PNG 재생성:

```bash
python3 -c "
import cairosvg
for size in [192, 512]:
    cairosvg.svg2png(url='icon.svg', write_to=f'icon-{size}.png', 
                     output_width=size, output_height=size)
cairosvg.svg2png(url='icon.svg', write_to='icon-maskable-512.png', 
                 output_width=512, output_height=512)
cairosvg.svg2png(url='icon.svg', write_to='apple-touch-icon.png', 
                 output_width=180, output_height=180)
"
```

## 알려진 한계 / 향후 개선 아이디어

- **공휴일 인식 안 됨**: 토/일만 휴일로 인식. 한국 공휴일 자동 인식 필요
- **여러 디바이스 자동 동기화 안 됨**: 수동 백업/공유링크만 지원. Supabase 등 연동 가능
- **푸시 알림 없음**: Service Worker로 추가 가능
- **드래그로 순서 바꾸기 없음**: SortableJS 등 도입 가능
- **주간/월간 통계 그래프 없음**: 캘린더만 있음

## Git 컨벤션 제안

- `feat:` 새 기능
- `fix:` 버그 수정
- `style:` 디자인/CSS
- `refactor:` 리팩토링
- `docs:` 문서
- `chore:` 잡일

예: `feat: 휴가 모드 추가`, `style: 진행률 카드 그림자 개선`
