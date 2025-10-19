import Link from 'next/link';

const utilities = [
  {
    id: 'skill-analyzer',
    title: 'NTRP 실력 분석',
    description: '3단계 질문으로 정확한 실력 레벨을 파악하고 개선점을 찾아보세요',
    icon: '🎯',
    color: 'bg-primary-green',
    href: '/utility/skill-analyzer',
    features: ['정확한 NTRP 레벨 측정', '개인별 강점/약점 분석', '구체적인 연습법 제안'],
  },
  {
    id: 'tennis-type',
    title: '테니스 성향 7유형',
    description: '나만의 플레이 스타일을 발견하고 최적화된 훈련법을 제안받으세요',
    icon: '🧩',
    color: 'bg-primary-blue',
    href: '/utility/tennis-type',
    features: ['7가지 성향 분류', '성향별 전략 가이드', '맞춤형 훈련 계획'],
  },
  {
    id: 'racket-recommender',
    title: '라켓 추천기',
    description: '실력과 성향에 맞는 최적의 라켓을 추천받고 구매까지 연결해드려요',
    icon: '🏆',
    color: 'bg-accent-lime text-neutral-ink',
    href: '/utility/racket-recommender',
    features: ['개인 맞춤 라켓 추천', '상세 스펙 비교', '제휴 쇼핑몰 연결'],
  },
  {
    id: 'match-analyzer',
    title: '경기 기록 분석',
    description: '경기 데이터를 입력하면 승부 패턴과 개선 포인트를 분석해드려요',
    icon: '📊',
    color: 'bg-status-info',
    href: '/utility/match-analyzer',
    features: ['경기 패턴 분석', '승부 포인트 파악', '전략 개선 제안'],
  },
  {
    id: 'string-tension',
    title: '스트링 텐션 계산',
    description: '라켓과 스트링에 맞는 최적의 텐션을 계산해드려요',
    icon: '🎾',
    color: 'bg-status-warning',
    href: '/utility/string-tension',
    features: ['라켓별 권장 텐션', '스트링 타입별 가이드', '텐션 조절 팁'],
  },
  {
    id: 'rules-quiz',
    title: '규칙 퀴즈',
    description: '테니스 규칙을 재미있게 배우고 실력을 확인해보세요',
    icon: '📚',
    color: 'bg-status-success',
    href: '/utility/rules-quiz',
    features: ['4단계 난이도', '실시간 피드백', '규칙 상세 설명'],
  },
  {
    id: 'injury-risk',
    title: '부상 리스크 체크',
    description: '현재 상태를 점검하고 부상 예방법을 알아보세요',
    icon: '🛡️',
    color: 'bg-status-danger',
    href: '/utility/injury-risk',
    features: ['부상 위험도 평가', '예방 운동 가이드', '복귀 계획 수립'],
  },
  {
    id: 'court-finder',
    title: '코트 찾기',
    description: '전국 테니스 코트를 쉽게 찾고 예약할 수 있어요',
    icon: '🏟️',
    color: 'bg-primary-green',
    href: '/utility/court-finder',
    features: ['지역별 코트 검색', '실시간 예약 현황', '코트 리뷰 및 평점'],
  },
];

export default function UtilityPage() {
  return (
    <div className="py-20">
      <div className="container-custom">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-h1 font-bold text-neutral-ink mb-4">
            테니스프렌즈 유틸리티
          </h1>
          <p className="text-body text-neutral-sub max-w-2xl mx-auto">
            5분만 투자하면 당신의 테니스 실력과 개선 방향을 정확히 파악할 수 있습니다.
            모든 유틸리티는 3단계 입력으로 간단하게 시작하고, 구체적인 결과를 제공합니다.
          </p>
        </div>

        {/* 유틸리티 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {utilities.map((utility) => (
            <Link
              key={utility.id}
              href={utility.href}
              className="card hover:shadow-lg transition-all duration-300 group"
            >
              <div className="card-header">
                <div className={`w-16 h-16 ${utility.color} rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {utility.icon}
                </div>
                <h3 className="text-h3 font-bold text-neutral-ink mb-2">
                  {utility.title}
                </h3>
                <p className="text-sub text-neutral-sub">
                  {utility.description}
                </p>
              </div>
              <div className="card-body">
                <ul className="space-y-2">
                  {utility.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-cap text-neutral-sub">
                      <span className="w-1.5 h-1.5 bg-primary-green rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <span className="text-sub text-primary-blue font-medium group-hover:text-primary-blue-dark">
                  시작하기 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 사용 가이드 */}
        <div className="bg-neutral-surface rounded-card p-8">
          <h2 className="text-h2 font-bold text-neutral-ink mb-6 text-center">
            어떻게 사용하나요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center text-white text-h3 font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-h3 font-bold text-neutral-ink mb-2">질문 답하기</h3>
              <p className="text-sub text-neutral-sub">
                3단계의 간단한 질문에 답해주세요. 각 질문은 당신의 실력과 성향을 파악하기 위한 것입니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-white text-h3 font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-h3 font-bold text-neutral-ink mb-2">결과 확인</h3>
              <p className="text-sub text-neutral-sub">
                AI가 분석한 결과를 확인하세요. 요약 3문장과 다음 행동 3가지를 제시합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-lime rounded-full flex items-center justify-center text-neutral-ink text-h3 font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-h3 font-bold text-neutral-ink mb-2">실행하기</h3>
              <p className="text-sub text-neutral-sub">
                제안받은 행동을 실행하고, 결과를 공유하거나 다른 유틸리티를 사용해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
