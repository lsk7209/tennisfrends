import Link from 'next/link';

const features = [
  {
    title: 'NTRP 테스트, 내 테니스 실력은 몇 점?',
    description: '간단한 질문에 답하면 국제 표준 NTRP 실력 수준을 정확하게 측정해드립니다.',
    icon: '🎯',
    href: '/utility/skill-analyzer',
    color: 'blue',
    tag: '실력 분석',
    buttonText: '실력 분석 시작하기 →'
  },
  {
    title: '나의 테니스 성향은?',
    description: '12문항으로 당신만의 독특한 플레이 스타일과 성향을 정밀 분석해드립니다.',
    icon: '🧩',
    href: '/utility/tennis-type',
    color: 'purple',
    tag: '성향 분석',
    buttonText: '성향 테스트 시작하기 →'
  },
  {
    title: '라켓 선택, 이제는 맞춤으로',
    description: '체형, 경험, 플레이 스타일을 종합 분석하여 당신에게 완벽한 라켓을 추천해드립니다.',
    icon: '🏸',
    href: '/utility/racket-recommender',
    color: 'orange',
    tag: '맞춤 추천',
    buttonText: '라켓 추천받기 →'
  },
];

const getColorStyles = (color: string) => {
  switch (color) {
    case 'blue':
      return {
        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
        tagBg: '#DBEAFE',
        tagText: '#1E40AF',
        buttonBg: '#3B82F6'
      };
    case 'purple':
      return {
        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        tagBg: '#EDE9FE',
        tagText: '#6D28D9',
        buttonBg: '#8B5CF6'
      };
    case 'orange':
      return {
        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        tagBg: '#FED7AA',
        tagText: '#C2410C',
        buttonBg: '#F97316'
      };
    default:
      return {
        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
        tagBg: '#DBEAFE',
        tagText: '#1E40AF',
        buttonBg: '#3B82F6'
      };
  }
};

export default function FeatureCards() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6" style={{color: 'var(--neutral-ink)'}}>
            나에게 맞는 테니스 솔루션을 선택하세요
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = getColorStyles(feature.color);
            return (
              <div key={feature.title} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* 상단 컬러 섹션 */}
                <div 
                  className="relative h-48 p-6 flex flex-col justify-between"
                  style={{ background: colors.background }}
                >
                  {/* 태그 */}
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: colors.tagBg,
                      color: colors.tagText
                    }}
                  >
                    {feature.tag}
                  </div>
                  
                  {/* 아이콘과 제목 */}
                  <div className="text-center">
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {feature.title.split(',')[0]}
                      </h3>
                      <p className="text-sm text-white/90">
                        {feature.title.split(',')[1]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 하단 컨텐츠 섹션 */}
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-4" style={{color: 'var(--neutral-ink)'}}>
                    {feature.title}
                  </h4>
                  <p className="text-base mb-6 leading-relaxed" style={{color: 'var(--neutral-sub)'}}>
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.buttonBg }}
                  >
                    {feature.buttonText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}