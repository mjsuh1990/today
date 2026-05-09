# 🚀 개발 시작 가이드

이 문서는 프로젝트를 GitHub에 올리고, Claude Code로 이어서 개발하는 방법을 안내합니다.

## 1️⃣ Git 초기화 & GitHub 업로드

### 1단계. 로컬 Git 저장소 만들기

이 폴더(`today-routine`)에서 터미널을 열고:

```bash
git init
git add .
git commit -m "feat: 오늘의 루틴 PWA 초기 버전"
```

### 2단계. GitHub에 새 레포 만들기

1. https://github.com/new 접속
2. Repository name: `today-routine` (또는 원하는 이름)
3. Description: "청량한 하루를 만드는 루틴 관리 PWA"
4. Public 또는 Private 선택
5. **README, .gitignore, License는 추가하지 마세요** (이미 있어요)
6. "Create repository" 클릭

### 3단계. 로컬과 GitHub 연결

GitHub가 알려주는 명령어 그대로 (또는 아래 참고):

```bash
git branch -M main
git remote add origin https://github.com/[YOUR_USERNAME]/today-routine.git
git push -u origin main
```

✅ 완료! 이제 GitHub에 코드가 올라가요.

## 2️⃣ GitHub Pages로 자동 배포

이 프로젝트엔 이미 GitHub Actions 워크플로우가 포함돼 있어요 (`.github/workflows/deploy.yml`). 한 번만 설정해주면 main 브랜치에 푸시할 때마다 자동 배포됩니다.

### 활성화 방법

1. GitHub 레포 → **Settings** 탭
2. 좌측 메뉴 → **Pages**
3. Source: **GitHub Actions** 선택
4. 잠시 기다리면 배포 시작

### 배포 URL

배포 완료 후 URL은 다음과 같아요:

```
https://[YOUR_USERNAME].github.io/today-routine/
```

이 URL을 폰 Chrome에서 열면 자동으로 PWA 설치 배너가 떠요.

## 3️⃣ Claude Code 설치 & 사용

Claude Code는 터미널에서 동작하는 AI 코딩 어시스턴트예요. 자연어로 명령하면 파일을 읽고, 수정하고, 커밋까지 할 수 있어요.

### 설치 (macOS / Linux)

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### 설치 (Windows PowerShell)

```powershell
irm https://claude.ai/install.ps1 | iex
```

### 설치 확인

새 터미널을 열고:

```bash
claude --version
```

> ⚠️ Claude Code는 Pro/Max 구독 또는 API 키가 필요해요. 무료 Claude.ai 계정으로는 사용 불가.
> 자세한 설치 방법: https://docs.claude.com/en/docs/claude-code/setup

### 인증

처음 실행하면 브라우저로 로그인하라고 안내해요:

```bash
claude
```

브라우저에서 로그인하면 끝.

## 4️⃣ Claude Code로 작업하기

### 프로젝트 진입

```bash
cd today-routine
claude
```

`CLAUDE.md` 파일이 있어서 Claude가 자동으로 프로젝트 구조를 이해해요.

### 자주 쓰는 명령

Claude Code 안에서:

```
/init           # CLAUDE.md 새로 생성/갱신 (이미 있으니 안 해도 됨)
/clear          # 대화 초기화
/cost           # 사용량 확인
/help           # 도움말
```

### 작업 예시

자연어로 시키면 됩니다:

```
"진행률 100% 달성 시 컨페티 효과 추가해줘"

"한국 공휴일 자동 인식 기능 추가해줘. 토/일이 아니어도 공휴일이면 휴일로 표시되게."

"주간 달성률 그래프를 새로 만들어줘. 캘린더 아이콘 옆에 📊 버튼으로 띄우면 좋겠어."

"코드 리뷰 좀 해줘. 더 깔끔하게 리팩토링할 부분 있어?"
```

Claude가 변경사항을 제안하면 diff 보여주고 승인 받은 후 적용합니다.

### 작업 후 커밋도 시키기

```
"방금 변경사항을 'feat: 공휴일 자동 인식 추가' 메시지로 커밋해줘"

"커밋하고 origin/main에 푸시까지 해줘"
```

## 5️⃣ 추천 워크플로우

```bash
# 1. 새 작업 시작
git checkout -b feat/holiday-detection

# 2. Claude Code 실행
claude

# 3. 자연어로 작업 지시
> "한국 공휴일 데이터를 추가하고 캘린더에 빨간색으로 표시되게 해줘"

# 4. 작업 완료 후 커밋
> "방금 변경사항을 커밋해줘"

# 5. 푸시 & PR
git push origin feat/holiday-detection
# GitHub에서 PR 만들고 머지
```

## 💡 팁

### Claude Code 효율 100% 활용법

1. **CLAUDE.md를 잘 관리**: 새 컨벤션이나 결정사항 생기면 CLAUDE.md에 추가. Claude가 항상 참고함.
2. **작은 단위로 명령**: 한 번에 너무 많이 시키지 말고 명확한 작업 단위로.
3. **작업 전 컨텍스트 제공**: "지금 캘린더 부분 작업할 거야. 그 영역 코드부터 봐줘" 같은 식으로 시작.
4. **diff 꼼꼼히 확인**: AI가 만든 코드도 항상 검토 후 승인.

### Claude.ai와의 차이

- **Claude.ai (이전 단계)**: 채팅으로 코드 받아서 복붙
- **Claude Code (지금부터)**: Claude가 직접 파일을 읽고 수정함

복붙 단계가 사라지고, Claude가 프로젝트 전체 맥락을 이해한 채 작업해요.

## 🐛 문제 해결

### `claude: command not found`

PATH 설정이 안 된 경우:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Service Worker가 등록 안 됨

- HTTPS 또는 localhost에서만 동작해요
- `file://` (브라우저에서 직접 파일 더블클릭)에선 안 됨
- `python3 -m http.server` 같은 로컬 서버 필요

### GitHub Pages 배포 실패

1. Settings → Pages에서 Source가 "GitHub Actions"인지 확인
2. Actions 탭에서 워크플로우 로그 확인
3. 권한 문제면 Settings → Actions → General → Workflow permissions에서 "Read and write permissions" 활성화

### PWA 설치 배너가 안 떠요

- 한 번 닫으면 localStorage에 기억돼요. 개발자 도구 → Application → Local Storage에서 `today_routine_install_dismissed` 삭제하면 다시 표시됨
- HTTPS여야 함 (localhost는 OK)

## 📚 더 읽을 거리

- [Claude Code 공식 문서](https://docs.claude.com/en/docs/claude-code)
- [GitHub Pages 가이드](https://docs.github.com/en/pages)
- [PWA 학습 자료](https://web.dev/progressive-web-apps/)
- [Pretendard 폰트](https://github.com/orioncactus/pretendard)
