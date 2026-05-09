# 🌊 오늘의 루틴

청량한 하루를 만드는 루틴 관리 PWA. 평일/휴일/휴가에 맞춰 오늘의 루틴을 가꿔보세요.

![preview](icon-192.png)

## ✨ 주요 기능

- **평일·휴일·휴가 모드**: 그날의 컨텍스트에 맞는 루틴만 표시
- **시간대별 분류**: 아침/회사·낮/저녁
- **이모지 체크**: 12개 기본 이모지 + 사용자 추가 가능
- **형광펜 강조**: 중요한 루틴 시각적으로 표시
- **달성률 캘린더**: 날짜별 달성률을 한눈에
- **연속 달성 기록**: 100% 달성한 날 streak 카운트
- **하루 회고**: 매일 한 줄로 돌아보기
- **백업/복원**: JSON 파일 내보내기, 공유 링크로 다른 기기 이동
- **PWA 지원**: 홈 화면에 설치, 오프라인 동작
- **한국시간(KST) 기준**: 해외에서도 한국 기준으로 날짜 계산

## 🚀 빠르게 시작하기

### 그냥 써보고 싶다면

`index.html`을 브라우저에서 열기. (단, Service Worker는 동작 안 함)

### 로컬 개발

```bash
# Python (이미 설치돼있을 가능성 높음)
python3 -m http.server 8000

# 또는 Node.js
npx serve

# 브라우저에서 http://localhost:8000
```

### 배포 (가장 빠른 방법)

1. **Netlify Drop** (30초): https://app.netlify.com/drop 에 폴더 통째로 드래그
2. **GitHub Pages**: 이 레포에 GitHub Actions 자동 배포 워크플로우 포함됨 (`.github/workflows/deploy.yml`). main 브랜치에 푸시하면 자동 배포

## 📱 폰에 설치하기

### 안드로이드 (Chrome)

1. 배포된 URL 열기
2. 상단 "홈 화면에 추가하기" 배너 → 설치
3. 또는 ⋮ 메뉴 → "앱 설치"

### iOS (Safari ⚠️ Chrome 안 됨)

1. Safari로 URL 열기
2. 하단 공유 버튼 ⬆️
3. "홈 화면에 추가"

## 🎨 디자인 컨셉

청량한 바다 빛 시안 + 햇살처럼 떨어지는 노란 체크. 글래스모피즘으로 부드러운 깊이감.

- **메인**: `#00b4d8` (시안)
- **강조**: `#0077b6` (코발트)
- **킬러**: `#ffd95c` (햇살 노랑)
- **폰트**: Pretendard

## 🛠️ 기술 스택

의도적으로 미니멀하게:

- Vanilla HTML/CSS/JS (빌드 도구 없음)
- 단일 파일 구조 (`index.html` 하나에 모든 코드)
- localStorage로 데이터 저장
- Service Worker로 오프라인 지원
- Web Manifest로 PWA 설치 지원

빌드 단계 없음. `git pull` 후 바로 정적 호스팅에 올리면 끝.

## 📂 프로젝트 구조

```
today-routine/
├── index.html              # 메인 앱 (모든 코드)
├── manifest.json           # PWA 메타데이터
├── sw.js                   # Service Worker
├── icon.svg                # 원본 아이콘
├── icon-192.png            # PWA 아이콘
├── icon-512.png
├── icon-maskable-512.png
├── apple-touch-icon.png    # iOS 아이콘
├── README.md               # 이 파일
├── GETTING_STARTED.md      # 개발 시작 가이드
├── CLAUDE.md               # Claude Code용 컨텍스트
├── LICENSE                 # MIT
└── .github/workflows/
    └── deploy.yml          # GitHub Pages 자동 배포
```

## 🤖 Claude Code로 이어서 개발하기

이 프로젝트는 Claude Code와의 페어 프로그래밍에 최적화되어 있어요.

```bash
cd today-routine
claude
```

`CLAUDE.md`에 프로젝트 컨텍스트가 다 들어있어서 Claude가 바로 작업을 이해해요. 자세한 건 [GETTING_STARTED.md](./GETTING_STARTED.md) 참고.

## 📋 향후 개선 아이디어

- [ ] 한국 공휴일 자동 인식
- [ ] 푸시 알림 (Service Worker)
- [ ] 주간/월간 통계 그래프
- [ ] 드래그로 순서 변경
- [ ] 다크 모드
- [ ] Supabase 연동 (자동 클라우드 동기화)
- [ ] Play Store 등록 (PWABuilder 활용)

## 📄 라이선스

MIT License - 자유롭게 사용하세요.
