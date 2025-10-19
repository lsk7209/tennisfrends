import Link from 'next/link';

const features = [
  {
    tag: '실력 분석',
    title: 'NTRP 테스트, 내 테니스 실력은 몇 점?',
    description: '간단한 질문에 답하면 NTRP 실력 수준을 추정해드립니다.',
    buttonText: '실력 분석하기 →',
    href: '/utility/skill-analyzer',
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=200&fit=crop&crop=center',
  },
  {
    tag: '성향 분석',
    title: '나의 테니스 성향은?',
    description: '10문항만으로 당신의 플레이 스타일을 분석해드립니다.',
    buttonText: '성향 테스트 시작하기 →',
    href: '/utility/tennis-type',
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=200&fit=crop&crop=center',
  },
  {
    tag: '맞춤 추천',
    title: '라켓 선택, 이제는 맞춤으로',
    description: '성별, 체형, 경험을 기반으로 나에게 딱 맞는 라켓을 추천해드려요.',
    buttonText: '라켓 추천받기 →',
    href: '/utility/racket-recommender',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop&crop=center',
  },
];


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
            return (
              <div 
                key={feature.title} 
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 상단 이미지 섹션 */}
                <div className="relative h-48">
                  <img 
                    src={feature.imageUrl} 
                    alt={feature.title} 
                    className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* 태그 오버레이 */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-700">
                      {feature.tag}
                    </span>
                  </div>
                </div>

                {/* 하단 컨텐츠 섹션 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{color: 'var(--neutral-ink)'}}>
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-700 mb-6">
                    {feature.description}
                  </p>
                  
                  {/* 버튼 */}
                  <Link 
                    href={feature.href} 
                    className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--primary-green)',
                      color: 'white',
                      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)'
                    }}
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