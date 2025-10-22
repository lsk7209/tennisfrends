# Vercel Deploy Hook 생성 가이드

## 📍 Deploy Hook 찾는 위치

### 1단계: Vercel 프로젝트 설정
1. https://vercel.com/dashboard 접속
2. **tennisfrends** 프로젝트 클릭
3. **"Settings"** 탭 클릭
4. 왼쪽 사이드바에서 **"Git"** 클릭

### 2단계: Deploy Hooks 섹션 확인
- **"Deploy Hooks"** 섹션이 보이는지 확인
- 만약 없다면 아래 단계를 따라 생성하세요

## 🔧 Deploy Hook 생성하기

### 1단계: Create Hook 클릭
1. **"Deploy Hooks"** 섹션에서 **"Create Hook"** 버튼 클릭

### 2단계: Hook 설정
1. **Name**: `auto-redeploy` (또는 원하는 이름)
2. **Git Branch**: `main` 선택
3. **Build Command**: (비워두거나 기본값 사용)
4. **Output Directory**: (비워두거나 기본값 사용)

### 3단계: Hook 생성
1. **"Create Hook"** 버튼 클릭
2. 생성된 **Hook URL** 복사 (이것이 `VERCEL_DEPLOY_HOOK` 값입니다)

## 📋 Hook URL 형태

생성된 Hook URL은 다음과 같은 형태입니다:
```
https://api.vercel.com/v1/integrations/deploy/[고유ID]
```

## ✅ 확인 방법

### GitHub Secrets에 추가
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. **"New repository secret"** 클릭
3. **Name**: `VERCEL_DEPLOY_HOOK`
4. **Value**: 위에서 복사한 Hook URL 붙여넣기
5. **"Add secret"** 클릭

## 🧪 테스트 방법

### 수동 테스트
```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/[YOUR_HOOK_URL]"
```

### 자동 테스트
- GitHub에 코드 푸시
- Vercel에서 자동 배포가 시작되는지 확인
- Deploy Hooks 섹션에서 "Last triggered" 시간 확인

## 🚨 문제 해결

### Deploy Hooks 섹션이 보이지 않는 경우
1. 프로젝트가 GitHub와 연결되어 있는지 확인
2. Vercel 프로젝트 설정에서 Git 연동 상태 확인
3. 프로젝트를 다시 연결해보기

### Hook이 작동하지 않는 경우
1. Hook URL이 올바른지 확인
2. GitHub Secrets에 올바르게 추가되었는지 확인
3. Hook 권한 설정 확인
