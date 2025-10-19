import Link from 'next/link';

const features = [
  {
    tag: '실력 분석',
    title: 'NTRP 레벨 측정',
    subtitle: '정확한 실력 진단',
    description: '간단한 질문에 답하면 국제 표준 NTRP 실력 수준을 정확하게 측정해드립니다.',
    buttonText: '실력 분석 시작하기 →',
    href: '/utility/skill-analyzer',
    color: 'blue',
    icon: '🎯',
  },
  {
    tag: '성향 분석',
    title: '플레이 스타일',
    subtitle: '7가지 성향 분석',
    description: '12문항으로 당신만의 독특한 플레이 스타일과 성향을 정밀 분석해드립니다.',
    buttonText: '성향 테스트 시작하기 →',
    href: '/utility/tennis-type',
    color: 'purple',
    icon: '🤔',
  },
  {
    tag: '맞춤 추천',
    title: '라켓 추천',
    subtitle: '개인 맞춤형',
    description: '체형, 경험, 플레이 스타일을 종합 분석하여 당신에게 완벽한 라켓을 추천해드립니다.',
    buttonText: '라켓 추천받기 →',
    href: '/utility/racket-recommender',
    color: 'orange',
    icon: '🏸',
  },
];

// Helper function to get color styles based on the color name
const getColorStyles = (colorName: string) => {
  switch (colorName) {
    case 'blue':
      return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        tagBg: 'rgba(102, 126, 234, 0.1)',
        tagColor: '#667eea',
        overlayColor: '#667eea',
        buttonColor: '#667eea',
      };
    case 'purple':
      return {
        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        tagBg: 'rgba(168, 237, 234, 0.2)',
        tagColor: '#a8edea',
        overlayColor: '#a8edea',
        buttonColor: '#a8edea',
      };
    case 'orange':
      return {
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        tagBg: 'rgba(255, 236, 210, 0.3)',
        tagColor: '#fcb69f',
        overlayColor: '#fcb69f',
        buttonColor: '#fcb69f',
      };
    default:
      return {
        background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-blue) 100%)',
        tagBg: 'var(--neutral-border)',
        tagColor: 'var(--neutral-sub)',
        overlayColor: 'var(--neutral-ink)',
        buttonColor: 'var(--primary-blue)',
      };
  }
};

export default function FeatureCards() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{color: 'var(--neutral-ink)'}}>
            나에게 맞는 테니스 솔루션을
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              선택하세요
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI 기반 분석으로 당신만의 맞춤형 테니스 솔루션을 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = getColorStyles(feature.color);
            return (
              <div 
                key={feature.title} 
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 상단 컬러 섹션 */}
                <div 
                  className="relative h-56 p-8 flex flex-col justify-between overflow-hidden"
                  style={{ background: colors.background }}
                >
                  {/* 배경 패턴 */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2),transparent_50%)]"></div>
                  </div>
                  
                  <div 
                    className="absolute inset-0 flex items-center justify-center text-9xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ color: colors.overlayColor }}
                  >
                    {feature.icon}
                  </div>
                  
                  <div 
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold relative z-10 backdrop-blur-sm border border-white/30"
                    style={{ backgroundColor: colors.tagBg, color: colors.tagColor }}
                  >
                    {feature.tag}
                  </div>
                  
                  <div 
                    className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg group-hover:bg-white transition-colors duration-300"
                    style={{ color: colors.overlayColor }}
                  >
                    <h3 className="text-2xl font-black mb-2">{feature.title}</h3>
                    <p className="text-base font-medium">{feature.subtitle}</p>
                  </div>
                </div>

                {/* 하단 컨텐츠 섹션 */}
                <div className="p-8">
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  <Link 
                    href={feature.href} 
                    className="group/btn inline-flex items-center justify-center w-full px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 relative overflow-hidden"
                    style={{
                      background: colors.buttonColor,
                      color: 'white',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }}
                  >
                    <span className="relative z-10">{feature.buttonText}</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
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