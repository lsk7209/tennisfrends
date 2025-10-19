import Link from 'next/link';

const features = [
  {
    icon: '🎯',
    title: 'NTRP 실력 분석',
    description: '3단계 질문으로 정확한 실력 레벨을 파악하고 개선점을 찾아보세요',
    href: '/utility/skill-analyzer',
    color: 'bg-primary-green',
  },
  {
    icon: '🧩',
    title: '테니스 성향 7유형',
    description: '나만의 플레이 스타일을 발견하고 최적화된 훈련법을 제안받으세요',
    href: '/utility/tennis-type',
    color: 'bg-primary-blue',
  },
  {
    icon: '🏆',
    title: '라켓 추천기',
    description: '실력과 성향에 맞는 최적의 라켓을 추천받고 구매까지 연결해드려요',
    href: '/utility/racket-recommender',
    color: 'bg-accent-lime text-neutral-ink',
  },
  {
    icon: '📊',
    title: '경기 기록 분석',
    description: '경기 데이터를 입력하면 승부 패턴과 개선 포인트를 분석해드려요',
    href: '/utility/match-analyzer',
    color: 'bg-status-info',
  },
];

export default function FeatureCards() {
  return (
    <section className="py-20 bg-neutral-surface">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-h1 font-bold text-neutral-ink mb-4">
            테니스프렌즈의 핵심 기능
          </h2>
          <p className="text-body text-neutral-sub max-w-2xl mx-auto">
            각 유틸리티는 3단계 입력으로 간단하게 시작하고, 
            구체적인 결과와 다음 행동 3가지를 제시합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="card hover:shadow-lg transition-all duration-300 group"
            >
              <div className="card-header">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-h3 font-bold text-neutral-ink mb-2">
                  {feature.title}
                </h3>
              </div>
              <div className="card-body">
                <p className="text-sub text-neutral-sub">
                  {feature.description}
                </p>
              </div>
              <div className="card-footer">
                <span className="text-sub text-primary-blue font-medium group-hover:text-primary-blue-dark">
                  시작하기 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 추가 기능들 */}
        <div className="mt-12 text-center">
          <p className="text-sub text-neutral-sub mb-6">
            더 많은 유틸리티가 준비되어 있어요
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              '스트링 텐션 계산',
              '규칙 퀴즈',
              '부상 리스크 체크',
              '코트 찾기',
            ].map((item) => (
              <span
                key={item}
                className="badge-blue"
              >
                {item}
              </span>
            ))}
          </div>
          <Link href="/utility" className="btn-secondary mt-6">
            모든 유틸리티 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
