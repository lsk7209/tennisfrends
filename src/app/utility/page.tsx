import Link from 'next/link';
import Image from 'next/image';
import { utilityService } from '@/lib/content';

// 정적 데이터 (fallback용) - 이미지 기반 디자인
const staticUtilities = [
  {
    id: 'skill-analyzer',
    title: 'NTRP 테스트, 내 테니스 실력은 몇 점?',
    description: '간단한 질문에 답하면 NTRP 실력 수준을 추정해드립니다.',
    buttonText: '실력 분석하기 →',
    href: '/utility/skill-analyzer',
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=200&fit=crop&crop=center',
    tag: '실력 분석',
    time: '3분 소요 (15문항)',
  },
  {
    id: 'tennis-type',
    title: '나의 테니스 성향은?',
    description: '10문항만으로 당신의 플레이 스타일을 분석해드립니다.',
    buttonText: '성향 테스트 시작하기 →',
    href: '/utility/tennis-type',
    imageUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=200&fit=crop&crop=center',
    tag: '성향 분석',
    time: '5분 소요 (10문항)',
  },
  {
    id: 'racket-recommender',
    title: '라켓 선택, 이제는 맞춤으로',
    description: '성별, 체형, 경험을 기반으로 나에게 딱 맞는 라켓을 추천해드려요.',
    buttonText: '라켓 추천받기 →',
    href: '/utility/racket-recommender',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop&crop=center',
    tag: '맞춤 추천',
    time: '2분 소요 (8문항)',
  },
  {
    id: 'match-analyzer',
    title: '경기 기록 분석',
    description: '경기 데이터를 입력하면 승부 패턴과 개선 포인트를 분석해드려요.',
    buttonText: '분석 시작하기 →',
    href: '/utility/match-analyzer',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop&crop=center',
    tag: '데이터 분석',
    time: '5분 소요 (경기당)',
  },
  {
    id: 'string-tension',
    title: '스트링 텐션 계산',
    description: '라켓과 스트링에 맞는 최적의 텐션을 계산하고 추천받으세요.',
    buttonText: '계산 시작하기 →',
    href: '/utility/string-tension',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop&crop=center',
    tag: '장비 최적화',
    time: '1분 소요',
  },
  {
    id: 'rules-quiz',
    title: '테니스 규칙 퀴즈',
    description: '테니스 규칙을 퀴즈로 풀어보며 학습하고 실력을 확인해보세요.',
    buttonText: '퀴즈 시작하기 →',
    href: '/utility/rules-quiz',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop&crop=center',
    tag: '규칙 학습',
    time: '3분 소요 (10문항)',
  },
];

export default async function UtilityPage() {
  // 슈퍼베이스에서 유틸리티 데이터 가져오기
  let utilities = staticUtilities;
  try {
    const fetchedUtilities = await utilityService.getAll();
    if (fetchedUtilities && fetchedUtilities.length > 0) {
      // Merge fetched data with static data, prioritizing fetched data
      utilities = staticUtilities.map(staticUtil => {
        const fetchedUtil = fetchedUtilities.find(fu => fu.id === staticUtil.id);
        return fetchedUtil ? {
          ...staticUtil,
          title: fetchedUtil.title || staticUtil.title,
          description: fetchedUtil.description || staticUtil.description,
          buttonText: fetchedUtil.buttonText || staticUtil.buttonText,
          href: fetchedUtil.href || staticUtil.href,
          imageUrl: fetchedUtil.image_url || staticUtil.imageUrl, // Supabase의 image_url 필드 사용
        } : staticUtil;
      });
    }
  } catch (error) {
    console.error('Failed to fetch utilities from Supabase:', error);
    // 에러 발생 시 정적 데이터 사용
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold" style={{color: 'var(--neutral-ink)'}}>
            나에게 맞는 테니스 솔루션을 선택하세요
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {utilities.map((utility) => {
            return (
              <div key={utility.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* 상단 이미지 섹션 */}
                <div className="relative h-48">
                  <Image 
                    src={utility.imageUrl} 
                    alt={utility.title} 
                    fill
                    className="object-cover rounded-t-2xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* 태그 오버레이 */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-700">
                      {utility.tag}
                    </span>
                  </div>
                </div>

                {/* 하단 컨텐츠 섹션 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{color: 'var(--neutral-ink)'}}>
                    {utility.title}
                  </h3>
                  <p className="text-base text-gray-700 mb-4">
                    {utility.description}
                  </p>
                  
                  {/* 시간 정보 */}
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {utility.time}
                  </div>
                  
                  {/* 버튼 */}
                  <Link 
                    href={utility.href} 
                    className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: 'var(--primary-green)',
                      color: 'white',
                      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)'
                    }}
                  >
                    {utility.buttonText}
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