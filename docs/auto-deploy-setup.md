# 🚀 Vercel 배포 자동화 설정 가이드

## 📋 개요

이 가이드는 Vercel 배포 후 자동 검토 및 모니터링 시스템을 설정하는 방법을 설명합니다.

## 🔧 설정된 자동화 도구

### 1. 배포 모니터링 스크립트 (`scripts/deploy-monitor.js`)
- **기능**: 실시간 배포 상태 모니터링
- **사용법**:
  ```bash
  npm run deploy:monitor    # 지속적 모니터링
  npm run deploy:check      # 한 번만 상태 확인
  ```

### 2. 자동 배포 검토 스크립트 (`scripts/auto-deploy.js`)
- **기능**: 배포 후 자동 기능 테스트 및 성능 분석
- **사용법**:
  ```bash
  npm run deploy:auto       # 종합 검토 실행
  npm run deploy:test       # 기능 테스트만 실행
  npm run deploy:wait       # 배포 완료 대기
  ```

### 3. GitHub Actions 워크플로우 (`.github/workflows/deploy-monitor.yml`)
- **기능**: 자동 배포 모니터링 및 검토
- **트리거**: 
  - 코드 푸시 시
  - Pull Request 시
  - 매 5분마다 정기 확인
  - 수동 실행

## 🚀 자동화 프로세스

### 1단계: 배포 감지
- GitHub에 코드 푸시
- Vercel 자동 배포 시작
- GitHub Actions 워크플로우 트리거

### 2단계: 상태 모니터링
- 사이트 접속 가능 여부 확인
- 빌드 성공 여부 확인
- 최근 커밋 정보 분석

### 3단계: 기능 테스트
- 메인 페이지 접속 테스트
- NTRP 테스트 페이지 확인
- 유틸리티 페이지 확인
- 블로그 페이지 확인

### 4단계: 성능 분석
- 페이지 로드 시간 측정
- API 응답 시간 측정
- 번들 크기 분석

### 5단계: 자동 수정
- 오류 감지 시 자동 재배포
- 캐시 클리어
- 알림 전송

## 🔧 환경 변수 설정

### GitHub Actions 시크릿 설정
```bash
# GitHub 저장소 > Settings > Secrets and variables > Actions
GITHUB_TOKEN=your_github_token
DISCORD_WEBHOOK_URL=your_discord_webhook_url  # 선택사항
SLACK_WEBHOOK_URL=your_slack_webhook_url      # 선택사항
```

### 로컬 환경 변수
```bash
# .env.local 파일 생성
GITHUB_TOKEN=your_github_token
DISCORD_WEBHOOK_URL=your_discord_webhook_url
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

## 📊 모니터링 대시보드

### 실시간 상태 확인
```bash
# 현재 배포 상태 확인
npm run deploy:check

# 지속적 모니터링 시작
npm run deploy:monitor
```

### 배포 후 자동 검토
```bash
# 배포 완료 대기
npm run deploy:wait

# 기능 테스트 실행
npm run deploy:test

# 종합 검토 실행
npm run deploy:auto
```

## 🚨 알림 설정

### Discord 알림
1. Discord 서버에서 웹훅 생성
2. `DISCORD_WEBHOOK_URL` 환경 변수 설정
3. 배포 상태 변경 시 자동 알림

### Slack 알림
1. Slack 워크스페이스에서 웹훅 생성
2. `SLACK_WEBHOOK_URL` 환경 변수 설정
3. 배포 상태 변경 시 자동 알림

## 🔍 문제 해결

### 일반적인 문제들

#### 1. 사이트 접속 불가
```bash
# 상태 확인
npm run deploy:check

# 자동 수정 시도
npm run deploy:auto
```

#### 2. 빌드 실패
- GitHub Actions 로그 확인
- 의존성 문제 해결
- 코드 오류 수정

#### 3. 성능 문제
- 번들 크기 최적화
- 이미지 최적화
- 캐시 설정 확인

### 로그 확인
```bash
# GitHub Actions 로그
gh run list
gh run view [run-id]

# 로컬 로그
npm run deploy:monitor
```

## 📈 성능 최적화

### 자동 최적화 기능
- 번들 크기 모니터링
- 이미지 최적화 확인
- 캐시 효율성 분석
- 로드 시간 측정

### 권장사항
- 정기적인 의존성 업데이트
- 코드 품질 유지
- 성능 모니터링 지속
- 자동 테스트 확장

## 🎯 다음 단계

### 추가 자동화 가능 항목
1. **E2E 테스트**: Playwright를 통한 자동 테스트
2. **성능 모니터링**: Core Web Vitals 추적
3. **보안 스캔**: 자동 취약점 검사
4. **코드 품질**: ESLint, Prettier 자동 실행
5. **문서화**: 자동 API 문서 생성

### 고급 설정
- 다중 환경 배포 (staging, production)
- A/B 테스트 자동화
- 롤백 자동화
- 성능 회귀 감지

## 📞 지원

문제가 발생하면:
1. GitHub Issues에 문제 보고
2. 로그 파일 확인
3. 자동 수정 시도
4. 수동 개입 필요 시 알림

---

**🎾 테니스프렌즈 자동 배포 시스템이 완성되었습니다!**
