import Link from 'next/link';
import { guideService } from '@/lib/content';

// 정적 데이터 (fallback용)
const staticGuides = [
  {
    id: '1',
    title: '테니스 기본 자세 완벽 가이드',
    slug: 'tennis-basic-stance-guide',
    description: '테니스의 기본이 되는 자세와 스탠스에 대한 상세한 가이드입니다. 올바른 자세는 부상 예방과 실력 향상의 기초가 됩니다.',
    category: 'training',
    difficulty: 'beginner' as const,
    tags: ['기본기', '자세', '초보자'],
    featured: true,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: '테니스 부상 예방 완벽 가이드',
    slug: 'tennis-injury-prevention-guide',
    description: '테니스에서 발생할 수 있는 부상의 종류와 예방법, 그리고 부상 시 대처 방법에 대한 종합적인 가이드입니다.',
    category: 'health',
    difficulty: 'intermediate' as const,
    tags: ['부상예방', '건강', '안전'],
    featured: true,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return { bg: '#D1FAE5', text: '#065F46', label: '초급' };
    case 'intermediate':
      return { bg: '#FEF3C7', text: '#92400E', label: '중급' };
    case 'advanced':
      return { bg: '#FEE2E2', text: '#991B1B', label: '고급' };
    default:
      return { bg: '#F3F4F6', text: '#374151', label: '일반' };
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'training':
      return '💪';
    case 'health':
      return '🛡️';
    case 'equipment':
      return '🏸';
    case 'rules':
      return '📚';
    default:
      return '📖';
  }
};

export default async function GuidesPage() {
  // 슈퍼베이스에서 가이드 데이터 가져오기
  let guides: typeof staticGuides = staticGuides;
  try {
    const fetchedGuides = await guideService.getAll();
    if (fetchedGuides && fetchedGuides.length > 0) {
      // Supabase 데이터를 정적 데이터 형식으로 변환
      guides = fetchedGuides.map(guide => {
        const guideData = guide as unknown as Record<string, unknown>;
        return {
          id: guide.id,
          title: guide.title,
          slug: guide.slug,
          description: (guideData.description as string) || (guideData.summary as string) || '',
          category: (guideData.category_id as string) || (guideData.category as string) || 'training',
          difficulty: (guideData.difficulty as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
          tags: (guideData.tags as string[]) || [],
          featured: true,
          views: (guideData.view_count as number) || (guideData.views as number) || 0,
          created_at: guide.created_at,
          updated_at: guide.updated_at
        };
      });
    }
  } catch (error) {
    console.error('Failed to fetch guides from Supabase:', error);
    // 에러 발생 시 정적 데이터 사용
  }

  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{color: 'var(--neutral-ink)'}}>
            테니스 가이드
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--neutral-sub)'}}>
            초급자부터 상급자까지, 모든 레벨의 테니스 플레이어를 위한 종합 가이드입니다.
          </p>
        </div>

        {/* 가이드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => {
            const difficultyStyle = getDifficultyColor(guide.difficulty);
            const categoryIcon = getCategoryIcon(guide.category);
            
            return (
              <article key={guide.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* 헤더 영역 */}
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center relative">
                  <div className="text-6xl">{categoryIcon}</div>
                  
                  {/* 난이도 배지 */}
                  <div 
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: difficultyStyle.bg,
                      color: difficultyStyle.text
                    }}
                  >
                    {difficultyStyle.label}
                  </div>
                </div>

                {/* 컨텐츠 영역 */}
                <div className="p-6">
                  {/* 카테고리 */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {guide.category}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h2 className="text-xl font-bold mb-3" style={{color: 'var(--neutral-ink)'}}>
                    <Link href={`/guides/${guide.slug}`} className="hover:text-blue-600 transition-colors">
                      {guide.title}
                    </Link>
                  </h2>

                  {/* 설명 */}
                  <p className="text-base mb-4 leading-relaxed" style={{color: 'var(--neutral-sub)'}}>
                    {guide.description}
                  </p>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* 액션 버튼 */}
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{backgroundColor: 'var(--primary-green)'}}
                  >
                    가이드 보기 →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* 더 많은 가이드 보기 */}
        <div className="text-center mt-16">
          <p className="text-lg mb-6" style={{color: 'var(--neutral-sub)'}}>
            더 많은 테니스 가이드가 필요하시다면
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/utility" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{backgroundColor: 'var(--primary-green)'}}
            >
              유틸리티 둘러보기 →
            </Link>
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: 'var(--primary-blue)',
                color: 'var(--primary-blue)',
                backgroundColor: 'white'
              }}
            >
              블로그 보기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
