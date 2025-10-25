import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseClient";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('블로그 포스트 조회 오류:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('블로그 포스트 조회 실패:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
              테니스프렌즈 블로그
            </h1>
            <p className="text-xl text-[#334155] max-w-2xl mx-auto">
              테니스 실력 향상을 위한 유용한 정보와 팁을 공유합니다
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">아직 게시된 블로그 포스트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-lg flex items-center justify-center text-2xl">
                      🎾
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-[#64748B]">•</span>
                        <span className="text-sm text-[#64748B]">테니스 가이드</span>
                      </div>
                      <CardTitle className="text-xl mb-2">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="hover:text-[#0BA360] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {post.excerpt}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-[#64748B]">
                      {new Date(post.created_at).toISOString().split('T')[0]} • 5분 읽기
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#0BA360] to-[#19C37D] text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">새로운 포스트 알림 받기</h3>
              <p className="text-white/90 mb-6">
                테니스 실력 향상에 도움이 되는 최신 정보를 이메일로 받아보세요
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="이메일 주소를 입력하세요"
                  className="flex-1 px-4 py-2 rounded-lg text-[#0F172A] placeholder-[#64748B]"
                />
                <button className="px-6 py-2 bg-white text-[#0BA360] rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  구독하기
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  );
}
