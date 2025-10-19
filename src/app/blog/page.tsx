import Link from 'next/link';
import { blogService } from '@/lib/content';

// 정적 데이터 (fallback용)
const staticBlogPosts = [
  {
    id: '1',
    title: '테니스 초보자를 위한 첫 번째 라켓 선택 가이드',
    slug: 'tennis-beginner-racket-guide',
    excerpt: '테니스를 시작하는 초보자들이 첫 번째 라켓을 선택할 때 고려해야 할 요소들과 추천 라켓을 소개합니다.',
    author: '테니스프렌즈',
    published: true,
    featured: true,
    tags: ['초보자', '라켓', '가이드'],
    category: 'equipment',
    reading_time: 8,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'NTRP 등급 시스템 완벽 가이드',
    slug: 'ntrp-rating-system-guide',
    excerpt: 'NTRP 등급 시스템에 대한 상세한 설명과 각 등급별 특징, 그리고 실력 향상을 위한 방법을 알아보세요.',
    author: '테니스프렌즈',
    published: true,
    featured: true,
    tags: ['NTRP', '실력', '가이드'],
    category: 'skill-analysis',
    reading_time: 6,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export default async function BlogPage() {
  // 슈퍼베이스에서 블로그 데이터 가져오기
  let blogPosts: typeof staticBlogPosts = staticBlogPosts;
  try {
    const fetchedPosts = await blogService.getAll(true);
    if (fetchedPosts && fetchedPosts.length > 0) {
      // Supabase 데이터를 정적 데이터 형식으로 변환
      blogPosts = fetchedPosts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: (post as any).excerpt || (post as any).summary || '',
        author: '테니스프렌즈',
        published: post.is_published || true,
        featured: true,
        tags: post.tags || [],
        category: post.category_id || 'equipment',
        reading_time: 8,
        views: post.view_count || 0,
        created_at: post.created_at,
        updated_at: post.updated_at
      }));
    }
  } catch (error) {
    console.error('Failed to fetch blog posts from Supabase:', error);
    // 에러 발생 시 정적 데이터 사용
  }

  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{color: 'var(--neutral-ink)'}}>
            테니스 블로그
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{color: 'var(--neutral-sub)'}}>
            테니스 실력 향상과 관련된 유용한 정보와 팁을 공유합니다.
          </p>
        </div>

        {/* 블로그 포스트 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* 이미지 영역 (추후 추가) */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-6xl">📝</div>
              </div>

              {/* 컨텐츠 영역 */}
              <div className="p-6">
                {/* 카테고리 태그 */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                </div>

                {/* 제목 */}
                <h2 className="text-xl font-bold mb-3" style={{color: 'var(--neutral-ink)'}}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h2>

                {/* 요약 */}
                <p className="text-base mb-4 leading-relaxed" style={{color: 'var(--neutral-sub)'}}>
                  {post.excerpt}
                </p>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 메타 정보 */}
                <div className="flex items-center justify-between text-sm" style={{color: 'var(--neutral-sub)'}}>
                  <span>{post.author}</span>
                  <span>{post.reading_time}분 읽기</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 더 많은 포스트 보기 */}
        <div className="text-center mt-16">
          <p className="text-lg mb-6" style={{color: 'var(--neutral-sub)'}}>
            더 많은 테니스 정보가 궁금하시다면
          </p>
          <Link 
            href="/utility" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{backgroundColor: 'var(--primary-green)'}}
          >
            유틸리티 둘러보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
