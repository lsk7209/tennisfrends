# GitHub Secrets 설정 가이드

## 📍 GitHub Secrets 설정 위치

### 1단계: GitHub 저장소 접속
1. https://github.com/lsk7209/tennisfrends 접속
2. 저장소 페이지에서 **"Settings"** 탭 클릭

### 2단계: Secrets 메뉴 찾기
1. 왼쪽 사이드바에서 **"Secrets and variables"** 클릭
2. **"Actions"** 선택

### 3단계: 새 Secret 추가
1. **"New repository secret"** 버튼 클릭
2. 다음 시크릿들을 하나씩 추가:

#### 🔑 VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: Vercel API 토큰 (아래에서 생성 방법 확인)

#### 🔑 VERCEL_DEPLOY_HOOK  
- **Name**: `VERCEL_DEPLOY_HOOK`
- **Value**: Vercel 배포 훅 URL (아래에서 생성 방법 확인)

## 🎯 Vercel API 토큰 생성 방법

### 1단계: Vercel 대시보드 접속
1. https://vercel.com/dashboard 접속
2. 로그인 후 우측 상단 프로필 클릭

### 2단계: API 토큰 생성
1. **"Settings"** 클릭
2. **"Tokens"** 탭 선택
3. **"Create Token"** 버튼 클릭
4. 토큰 이름 입력 (예: "tennisfrends-auto-redeploy")
5. **"Create"** 클릭
6. 생성된 토큰 복사 (한 번만 표시됨!)

## 🎯 Vercel 배포 훅 생성 방법

### 1단계: Vercel 프로젝트 설정
1. https://vercel.com/dashboard 접속
2. tennisfrends 프로젝트 클릭
3. **"Settings"** 탭 클릭

### 2단계: 배포 훅 생성
1. **"Git"** 섹션에서 **"Deploy Hooks"** 클릭
2. **"Create Hook"** 버튼 클릭
3. 훅 이름 입력 (예: "auto-redeploy")
4. 브랜치 선택: **"main"**
5. **"Create Hook"** 클릭
6. 생성된 훅 URL 복사

## ✅ 설정 완료 확인

### GitHub에서 확인
1. Settings → Secrets and variables → Actions
2. 다음 시크릿들이 표시되는지 확인:
   - ✅ VERCEL_TOKEN
   - ✅ VERCEL_DEPLOY_HOOK

### Vercel에서 확인
1. 프로젝트 → Settings → Environment Variables
2. 다음 변수들이 표시되는지 확인:
   - ✅ VERCEL_TOKEN
   - ✅ GITHUB_TOKEN
