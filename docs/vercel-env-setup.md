# Vercel 환경 변수 설정 가이드

## 📍 Vercel 환경 변수 설정 위치

### 1단계: Vercel 대시보드 접속
1. https://vercel.com/dashboard 접속
2. **tennisfrends** 프로젝트 클릭

### 2단계: Settings 메뉴 찾기
1. 프로젝트 페이지에서 **"Settings"** 탭 클릭
2. 왼쪽 사이드바에서 **"Environment Variables"** 클릭

### 3단계: 환경 변수 추가
1. **"Add New"** 버튼 클릭
2. 다음 변수들을 하나씩 추가:

#### 🔑 VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: Vercel API 토큰 (위에서 생성한 것과 동일)
- **Environment**: Production, Preview, Development 모두 선택

#### 🔑 GH_TOKEN
- **Name**: `GH_TOKEN`
- **Value**: GitHub Personal Access Token (아래에서 생성 방법 확인)

## 🎯 GitHub Personal Access Token 생성 방법

### 1단계: GitHub 설정 접속
1. https://github.com/settings 접속
2. 왼쪽 사이드바에서 **"Developer settings"** 클릭

### 2단계: Personal Access Token 생성
1. **"Personal access tokens"** → **"Tokens (classic)"** 클릭
2. **"Generate new token"** → **"Generate new token (classic)"** 클릭
3. 토큰 설정:
   - **Note**: "tennisfrends-vercel-integration"
   - **Expiration**: 90 days (또는 원하는 기간)
   - **Scopes**: 다음 권한 선택:
     - ✅ `repo` (전체 저장소 접근)
     - ✅ `workflow` (GitHub Actions 워크플로우 수정)
4. **"Generate token"** 클릭
5. 생성된 토큰 복사 (한 번만 표시됨!)

## ✅ 설정 완료 확인

### Vercel에서 확인
1. 프로젝트 → Settings → Environment Variables
2. 다음 변수들이 표시되는지 확인:
   - ✅ VERCEL_TOKEN
   - ✅ GITHUB_TOKEN

### GitHub에서 확인
1. Settings → Secrets and variables → Actions
2. 다음 시크릿들이 표시되는지 확인:
   - ✅ VERCEL_TOKEN
   - ✅ VERCEL_DEPLOY_HOOK

## 🚨 주의사항

### 토큰 보안
- 토큰은 절대 공개하지 마세요
- 토큰이 노출되면 즉시 재생성하세요
- 정기적으로 토큰을 갱신하세요

### 권한 확인
- VERCEL_TOKEN: Vercel API 접근 권한
- GITHUB_TOKEN: 저장소 및 워크플로우 접근 권한
- VERCEL_DEPLOY_HOOK: 배포 트리거 권한
