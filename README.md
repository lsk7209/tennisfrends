# 테니스프렌즈 (TennisFriends)

> 5분만에 내 실력/장비/훈련의 다음 3가지 행동을 알려주는 테니스 허브

## 🎾 프로젝트 소개

테니스프렌즈는 이미지 없이 텍스트·모션·이모지 기반으로 테니스 데이터를 자동 수집하고 분석하는 스마트 허브입니다.

### 핵심 기능
- **NTRP 실력 분석**: 3단계 질문으로 정확한 실력 레벨 파악
- **테니스 성향 7유형**: 개인별 플레이 스타일 분석
- **라켓 추천기**: 실력과 성향에 맞는 최적의 라켓 추천
- **경기 기록 분석**: 승부 패턴과 개선 포인트 분석
- **스트링 텐션 계산**: 라켓별 권장 텐션 계산
- **규칙 퀴즈**: 4단계 난이도의 테니스 규칙 학습
- **부상 리스크 체크**: 부상 예방 및 복귀 계획 수립
- **코트 찾기**: 전국 테니스 코트 검색 및 예약

## 🚀 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel
- **Styling**: CSS Variables, Pretendard Font
- **Icons**: Emoji-based (이미지 미사용 원칙)

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary Green**: `#0BA360` (다크: `#19C37D`)
- **Primary Blue**: `#2364AA` (다크: `#3D8BFF`)
- **Accent Lime**: `#C7F000`
- **Neutral**: Ink `#0F172A` / Sub `#334155` / Border `#E2E8F0` / Surface `#F8FAFC`

### 타이포그래피
- **한글**: Pretendard Variable
- **영문/숫자**: Inter Variable (tabular-nums)

## 📱 주요 페이지

- `/` - 홈페이지 (히어로, 기능 카드, 후기, CTA)
- `/utility` - 유틸리티 허브
- `/utility/skill-analyzer` - NTRP 실력 분석
- `/utility/tennis-type` - 테니스 성향 분석
- `/utility/racket-recommender` - 라켓 추천
- `/utility/match-analyzer` - 경기 기록 분석
- `/gear` - 장비 백과
- `/blog` - 블로그/가이드

## 🛠️ 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📋 PRD 문서

프로젝트의 상세한 기획서는 [PRD.md](./PRD.md)에서 확인할 수 있습니다.

## 🎯 목표

- **D30 재방문율**: ≥ 42%
- **유틸리티 완료율**: ≥ 80%
- **자동생성 게시물**: ≥ 40건/주
- **브랜드 검색량**: 분기 +30%

## 📄 라이선스

MIT License

---

Made with ❤️ for tennis players