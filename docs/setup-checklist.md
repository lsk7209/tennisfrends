# 자동 재배포 설정 체크리스트

## ✅ GitHub Secrets 설정 (완료해야 할 항목)

### 1. GitHub 저장소 접속
- [ ] https://github.com/lsk7209/tennisfrends 접속
- [ ] Settings → Secrets and variables → Actions 클릭

### 2. VERCEL_TOKEN 추가
- [ ] "New repository secret" 클릭
- [ ] Name: `VERCEL_TOKEN`
- [ ] Value: Vercel API 토큰 입력
- [ ] "Add secret" 클릭

### 3. VERCEL_DEPLOY_HOOK 추가
- [ ] "New repository secret" 클릭  
- [ ] Name: `VERCEL_DEPLOY_HOOK`
- [ ] Value: Vercel 배포 훅 URL 입력
- [ ] "Add secret" 클릭

## ✅ Vercel 환경 변수 설정 (완료해야 할 항목)

### 1. Vercel 대시보드 접속
- [ ] https://vercel.com/dashboard 접속
- [ ] tennisfrends 프로젝트 클릭
- [ ] Settings → Environment Variables 클릭

### 2. VERCEL_TOKEN 추가
- [ ] "Add New" 클릭
- [ ] Name: `VERCEL_TOKEN`
- [ ] Value: Vercel API 토큰 입력
- [ ] Environment: Production, Preview, Development 모두 선택
- [ ] "Save" 클릭

### 3. GH_TOKEN 추가
- [ ] "Add New" 클릭
- [ ] Name: `GH_TOKEN`
- [ ] Value: GitHub Personal Access Token 입력
- [ ] Environment: Production, Preview, Development 모두 선택
- [ ] "Save" 클릭

## 🔧 토큰 생성 가이드

### Vercel API 토큰 생성
1. [ ] https://vercel.com/account/tokens 접속
2. [ ] "Create Token" 클릭
3. [ ] 토큰 이름 입력: "tennisfrends-auto-redeploy"
4. [ ] "Create" 클릭
5. [ ] 생성된 토큰 복사

### GitHub Personal Access Token 생성
1. [ ] https://github.com/settings/tokens 접속
2. [ ] "Generate new token (classic)" 클릭
3. [ ] Note: "tennisfrends-vercel-integration"
4. [ ] Scopes: `repo`, `workflow` 선택
5. [ ] "Generate token" 클릭
6. [ ] 생성된 토큰 복사

### Vercel 배포 훅 생성
1. [ ] Vercel 프로젝트 → Settings → Git
2. [ ] "Deploy Hooks" 클릭
3. [ ] "Create Hook" 클릭
4. [ ] Name: "auto-redeploy"
5. [ ] Branch: "main" 선택
6. [ ] "Create Hook" 클릭
7. [ ] 생성된 훅 URL 복사

## 🧪 테스트 방법

### 1. 수동 재배포 테스트
```bash
npm run redeploy
```

### 2. 빌드 확인 테스트
```bash
npm run build:check
```

### 3. GitHub Actions 테스트
- [ ] 코드를 수정하여 의도적으로 빌드 에러 발생
- [ ] GitHub에 푸시
- [ ] Actions 탭에서 워크플로우 실행 확인
- [ ] 자동 재배포가 실행되는지 확인

## 🎯 완료 확인

### GitHub에서 확인
- [ ] Settings → Secrets and variables → Actions
- [ ] VERCEL_TOKEN 표시됨
- [ ] VERCEL_DEPLOY_HOOK 표시됨

### Vercel에서 확인  
- [ ] Settings → Environment Variables
- [ ] VERCEL_TOKEN 표시됨
- [ ] GH_TOKEN 표시됨

### 자동 재배포 테스트
- [ ] 빌드 에러 발생 시 자동 재배포 실행됨
- [ ] Vercel 대시보드에서 새로운 배포 확인됨
