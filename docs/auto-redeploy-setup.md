# 자동 재배포 시스템 설정 가이드

## 🔧 환경 변수 설정

### GitHub Secrets 설정
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. 다음 시크릿 추가:
   - `VERCEL_TOKEN`: Vercel API 토큰
   - `VERCEL_DEPLOY_HOOK`: Vercel 배포 훅 URL

### Vercel 환경 변수 설정
1. Vercel 대시보드 → 프로젝트 → Settings → Environment Variables
2. 다음 변수 추가:
   - `VERCEL_TOKEN`: Vercel API 토큰
   - `GITHUB_TOKEN`: GitHub API 토큰

## 🚀 사용 방법

### 1. 수동 재배포
```bash
npm run redeploy
```

### 2. 빌드 확인 후 재배포
```bash
npm run build:check
```

### 3. GitHub Actions 자동 재배포
- GitHub에 푸시할 때마다 자동으로 빌드 상태 확인
- 빌드 실패 시 자동으로 재배포 시도

## 📊 모니터링

### Vercel 대시보드에서 확인
- Deployments 탭에서 배포 상태 확인
- Functions 탭에서 웹훅 로그 확인

### GitHub Actions에서 확인
- Actions 탭에서 워크플로우 실행 상태 확인
- 실패한 워크플로우의 로그 확인

## 🔄 자동 재배포 플로우

1. **GitHub 푸시** → Vercel 빌드 시작
2. **빌드 실패 감지** → GitHub Actions 트리거
3. **로컬 빌드 테스트** → 성공 시 재배포
4. **Vercel API 호출** → 새로운 배포 시작
5. **배포 완료** → 알림 전송

## 🛠️ 문제 해결

### 자주 발생하는 문제
1. **Vercel 토큰 만료**: 토큰 재생성 후 환경 변수 업데이트
2. **GitHub 토큰 권한**: 저장소 접근 권한 확인
3. **빌드 캐시 문제**: Vercel에서 캐시 삭제 후 재배포

### 로그 확인 방법
```bash
# Vercel 로그 확인
npx vercel logs

# GitHub Actions 로그 확인
gh run list
gh run view <run-id>
```
