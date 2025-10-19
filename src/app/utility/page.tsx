import Link from 'next/link';

const utilities = [
  {
    id: 'skill-analyzer',
    title: 'NTRP 테스트, 내 테니스 실력은 몇 점?',
    description: '간단한 질문에 답하면 국제 표준 NTRP 실력 수준을 정확하게 측정해드립니다.',
    icon: '🎯',
    color: 'blue',
    tag: '실력 분석',
    href: '/utility/skill-analyzer',
    buttonText: '실력 분석 시작하기 →',
    time: '약 3분 (15문항)'
  },
  {
    id: 'tennis-type',
    title: '나의 테니스 성향은?',
    description: '12문항으로 당신만의 독특한 플레이 스타일과 성향을 정밀 분석해드립니다.',
    icon: '🧩',
    color: 'purple',
    tag: '성향 분석',
    href: '/utility/tennis-type',
    buttonText: '성향 테스트 시작하기 →',
    time: '약 5분 (12문항)'
  },
  {
    id: 'racket-recommender',
    title: '라켓 선택, 이제는 맞춤으로',
    description: '체형, 경험, 플레이 스타일을 종합 분석하여 당신에게 완벽한 라켓을 추천해드립니다.',
    icon: '🏸',
    color: 'orange',
    tag: '맞춤 추천',
    href: '/utility/racket-recommender',
    buttonText: '라켓 추천받기 →',
    time: '약 4분 (10문항)'
  },
  {
    id: 'match-analyzer',
    title: '경기 기록 분석',
    description: '경기 데이터를 입력하면 승부 패턴과 개선 포인트를 분석해드려요',
    icon: '📊',
    color: 'green',
    tag: '데이터 분석',
    href: '/utility/match-analyzer',
    buttonText: '경기 분석하기 →',
    time: '약 2분 (5문항)'
  },
  {
    id: 'string-tension',
    title: '스트링 텐션 계산',
    description: '라켓과 스트링에 맞는 최적의 텐션을 계산해드려요',
    icon: '🎾',
    color: 'teal',
    tag: '장비 최적화',
    href: '/utility/string-tension',
    buttonText: '텐션 계산하기 →',
    time: '약 1분 (3문항)'
  },
  {
    id: 'rules-quiz',
    title: '규칙 퀴즈',
    description: '테니스 규칙을 재미있게 배우고 실력을 확인해보세요',
    icon: '📚',
    color: 'indigo',
    tag: '규칙 학습',
    href: '/utility/rules-quiz',
    buttonText: '퀴즈 시작하기 →',
    time: '약 5분 (20문항)'
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
    case 'green':
      return {
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        tagBg: '#D1FAE5',
        tagText: '#065F46',
        buttonBg: '#10B981'
      };
    case 'teal':
      return {
        background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
        tagBg: '#CCFBF1',
        tagText: '#134E4A',
        buttonBg: '#14B8A6'
      };
    case 'indigo':
      return {
        background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        tagBg: '#E0E7FF',
        tagText: '#3730A3',
        buttonBg: '#6366F1'
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

export default function UtilityPage() {
  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{color: 'var(--neutral-ink)'}}>
            나에게 맞는 테니스 솔루션을 선택하세요
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--neutral-sub)'}}>
            각 유틸리티는 간단한 질문으로 시작하여 구체적인 결과와 다음 행동을 제시합니다.
            모든 테스트는 무료로 제공됩니다.
          </p>
        </div>

        {/* 유틸리티 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {utilities.map((utility) => {
            const colors = getColorStyles(utility.color);
            return (
              <div key={utility.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
                    {utility.tag}
                  </div>
                  
                  {/* 아이콘과 제목 */}
                  <div className="text-center">
                    <div className="text-6xl mb-4">{utility.icon}</div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {utility.title.split(',')[0]}
                      </h3>
                      <p className="text-sm text-white/90">
                        {utility.title.split(',')[1]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 하단 컨텐츠 섹션 */}
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-4" style={{color: 'var(--neutral-ink)'}}>
                    {utility.title}
                  </h4>
                  <p className="text-base mb-4 leading-relaxed" style={{color: 'var(--neutral-sub)'}}>
                    {utility.description}
                  </p>
                  
                  {/* 소요 시간 */}
                  <div className="mb-6">
                    <span className="text-sm px-3 py-1 rounded-full" style={{backgroundColor: 'var(--neutral-200)', color: 'var(--neutral-600)'}}>
                      소요 시간: {utility.time}
                    </span>
                  </div>
                  
                  <Link
                    href={utility.href}
                    className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: colors.buttonBg }}
                  >
                    {utility.buttonText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 사용 가이드 */}
        <div className="bg-gray-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--neutral-ink)'}}>
            어떻게 사용하나요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6" style={{background: 'var(--primary-green)'}}>
                1
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: 'var(--neutral-ink)'}}>질문 답하기</h3>
              <p className="text-base leading-relaxed" style={{color: 'var(--neutral-sub)'}}>
                간단한 질문에 답해주세요. 각 질문은 당신의 실력과 성향을 파악하기 위한 것입니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6" style={{background: 'var(--primary-blue)'}}>
                2
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: 'var(--neutral-ink)'}}>결과 확인</h3>
              <p className="text-base leading-relaxed" style={{color: 'var(--neutral-sub)'}}>
                AI가 분석한 결과를 확인하세요. 요약 3문장과 다음 행동 3가지를 제시합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6" style={{background: 'var(--accent-lime)', color: 'var(--neutral-ink)'}}>
                3
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: 'var(--neutral-ink)'}}>실행하기</h3>
              <p className="text-base leading-relaxed" style={{color: 'var(--neutral-sub)'}}>
                제안받은 행동을 실행하고, 결과를 공유하거나 다른 유틸리티를 사용해보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}