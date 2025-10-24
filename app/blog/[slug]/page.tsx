import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Eye, Share2 } from "lucide-react";
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

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Supabase 클라이언트 확인
    if (!supabase) {
      console.error('Supabase client not available');
      return null;
    }

    // 타임아웃 설정으로 무한 대기 방지
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Supabase query timeout')), 10000);
    });

    const queryPromise = supabase
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        excerpt,
        content,
        category,
        tags,
        created_at,
        updated_at
      `)
      .eq('slug', slug)
      .single();

    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

    if (error) {
      console.error('Supabase query error:', error);
      return null;
    }

    if (!data) {
      console.error('No data returned from Supabase');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.slug);
    
    if (!post) {
      return {
        title: '포스트를 찾을 수 없습니다',
        description: '요청하신 블로그 포스트를 찾을 수 없습니다.',
      };
    }

    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.tags?.join(', '),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        authors: ['테니스프렌즈'],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '포스트를 찾을 수 없습니다',
      description: '요청하신 블로그 포스트를 찾을 수 없습니다.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.slug);

    if (!post) {
      console.error('Blog post not found for slug:', params.slug);
      notFound();
    }

    return renderBlogPost(post);
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    notFound();
  }
}

function renderBlogPost(post: BlogPost) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareUrl = `${process.env.NODE_ENV === 'production' ? 'https://tennisfrends.vercel.app' : 'http://localhost:3003'}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                블로그로 돌아가기
              </Button>
            </Link>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-lg flex items-center justify-center text-2xl">
              🎾
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
                <span className="text-sm text-[#64748B]">•</span>
                <span className="text-sm text-[#64748B] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  5분 읽기
                </span>
                <span className="text-sm text-[#64748B]">•</span>
                <span className="text-sm text-[#64748B] flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  0회 조회
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[#0F172A] mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-[#334155] leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content.replace(/\n/g, '<br>') 
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">태그</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-sm">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">공유하기</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      alert('링크가 클립보드에 복사되었습니다!');
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    링크 복사
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`;
                      window.open(twitterUrl, '_blank');
                    }}
                  >
                    트위터
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                      window.open(facebookUrl, '_blank');
                    }}
                  >
                    페이스북
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">포스트 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Calendar className="w-4 h-4" />
                  <span>게시일: {formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Clock className="w-4 h-4" />
                  <span>읽기 시간: 5분</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Eye className="w-4 h-4" />
                  <span>조회수: 0회</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-[#64748B] mb-2">카테고리</p>
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}