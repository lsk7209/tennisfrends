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
    <section className="py-24 md:py-32" style={{backgroundColor: 'var(--neutral-50)'}}>
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="text-responsive-lg font-black mb-6" style={{color: 'var(--neutral-ink)'}}>
            테니스프렌즈의 핵심 기능
          </h2>
          <p className="text-responsive max-w-3xl mx-auto" style={{color: 'var(--neutral-600)'}}>
            각 유틸리티는 3단계 입력으로 간단하게 시작하고, 
            구체적인 결과와 다음 행동 3가지를 제시합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="card card-interactive group animate-fade-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="card-header">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg"
                  style={{
                    background: feature.color.includes('lime') 
                      ? 'linear-gradient(135deg, var(--accent-lime) 0%, var(--accent-lime-dark) 100%)'
                      : feature.color.includes('green')
                      ? 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%)'
                      : feature.color.includes('blue')
                      ? 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-dark) 100%)'
                      : 'linear-gradient(135deg, var(--status-info) 0%, var(--primary-blue) 100%)'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{color: 'var(--neutral-ink)'}}>
                  {feature.title}
                </h3>
              </div>
              <div className="card-body">
                <p className="text-base leading-relaxed" style={{color: 'var(--neutral-600)'}}>
                  {feature.description}
                </p>
              </div>
              <div className="card-footer">
                <span className="inline-flex items-center text-base font-semibold group-hover:translate-x-2 transition-transform" style={{color: 'var(--primary-blue)'}}>
                  시작하기 
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 추가 기능들 */}
        <div className="mt-20 text-center">
          <p className="text-lg mb-8" style={{color: 'var(--neutral-600)'}}>
            더 많은 유틸리티가 준비되어 있어요
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              '스트링 텐션 계산',
              '규칙 퀴즈',
              '부상 리스크 체크',
              '코트 찾기',
            ].map((item, index) => (
              <span
                key={item}
                className="badge badge-green hover-lift"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {item}
              </span>
            ))}
          </div>
          <Link href="/utility" className="btn btn-secondary btn-lg">
            모든 유틸리티 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
