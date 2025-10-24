"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Eye, Share2, Loader2 } from "lucide-react";

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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchBlogPost();
    }
  }, [params.slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/blog?slug=${params.slug}`);
      const result = await response.json();
      
      if (result.error) {
        console.error("API 에러:", result.error);
        setError(result.error);
        return;
      }

      if (result.data && result.data.length > 0) {
        setPost(result.data[0]);
      } else {
        setError('포스트를 찾을 수 없습니다');
      }
    } catch (err) {
      console.error('포스트 로딩 오류:', err);
      setError('포스트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // 마크다운을 HTML로 변환하는 고급 함수
  const markdownToHtml = (markdown: string) => {
    let html = markdown;
    
    // 이모지와 불필요한 문구 제거
    html = html
      .replace(/^🪶 Hook$/gm, '')
      .replace(/^🎯 Truth — .*$/gm, '')
      .replace(/^⚙️ Insight — .*$/gm, '')
      .replace(/^🧩 Application — .*$/gm, '')
      .replace(/^💬 Connection — .*$/gm, '')
      .replace(/^🧠 Q&A — .*$/gm, '')
      .replace(/^🔗 CTA Bridge — .*$/gm, '')
      .replace(/^🏁 Closing — .*$/gm, '')
      .replace(/^💡 핵심 포인트: .*$/gm, '')
      .replace(/^💬 코치의 조언: .*$/gm, '')
      .replace(/^📎 .*$/gm, '')
      .replace(/^@https:\/\/.*$/gm, '')
      .replace(/^#### ⚖️ \d+\. .*$/gm, (match) => {
        const number = match.match(/\d+/)?.[0] || '';
        const title = match.replace(/^#### ⚖️ \d+\. /, '');
        return `#### ${number}. ${title}`;
      })
      .replace(/^#### ⚙️ \d+\. .*$/gm, (match) => {
        const number = match.match(/\d+/)?.[0] || '';
        const title = match.replace(/^#### ⚙️ \d+\. /, '');
        return `#### ${number}. ${title}`;
      })
      .replace(/^#### 🧵 \d+\. .*$/gm, (match) => {
        const number = match.match(/\d+/)?.[0] || '';
        const title = match.replace(/^#### 🧵 \d+\. /, '');
        return `#### ${number}. ${title}`;
      })
      .replace(/^#### 🪶 \d+\. .*$/gm, (match) => {
        const number = match.match(/\d+/)?.[0] || '';
        const title = match.replace(/^#### 🪶 \d+\. /, '');
        return `#### ${number}. ${title}`;
      })
      .replace(/^#### 🗺️ \d+\. .*$/gm, (match) => {
        const number = match.match(/\d+/)?.[0] || '';
        const title = match.replace(/^#### 🗺️ \d+\. /, '');
        return `#### ${number}. ${title}`;
      });

    // 헤딩 변환
    html = html
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold text-gray-900 mb-3 mt-6">$1</h4>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6 mt-8">$1</h1>');

    // 볼드 텍스트
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
    
    // 이탤릭 텍스트
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');
    
    // 인용문
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-[#0BA360] pl-4 py-2 bg-[#0BA360]/5 my-4 italic text-gray-700">$1</blockquote>');
    
    // 링크
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#0BA360] hover:text-[#19C37D] underline font-medium">$1</a>');
    
    // 구분선
    html = html.replace(/^---$/gim, '<hr class="my-8 border-gray-200">');
    
    // 테이블 처리
    html = html.replace(/\|([^|]+)\|([^|]+)\|([^|]+)\|/g, (match, col1, col2, col3) => {
      if (col1.includes('구분') && col2.includes('잘못된 선택') && col3.includes('교정 방법')) {
        return ''; // 테이블 헤더 제거
      }
      return `<tr class="border-b border-gray-100"><td class="py-2 px-3 text-sm">${col1.trim()}</td><td class="py-2 px-3 text-sm">${col2.trim()}</td><td class="py-2 px-3 text-sm">${col3.trim()}</td></tr>`;
    });
    
    // 리스트 아이템
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700">• $1</li>');
    
    // 번호 리스트
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700">$1</li>');
    
    // 줄바꿈 처리
    html = html.replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">');
    html = html.replace(/\n/g, '<br>');
    
    // 리스트 래핑
    html = html.replace(/(<li.*<\/li>)/g, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>');
    
    // 문단 래핑
    html = `<p class="mb-4 text-gray-700 leading-relaxed">${html}</p>`;
    
    return html;
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${params.slug}` : '';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0BA360] mx-auto mb-4" />
          <p className="text-[#64748B]">포스트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">포스트를 찾을 수 없습니다</h1>
          <p className="text-[#64748B] mb-6">{error || '요청하신 블로그 포스트를 찾을 수 없습니다.'}</p>
          <Link href="/blog">
            <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              블로그로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
                    className="blog-content"
                    dangerouslySetInnerHTML={{ 
                      __html: markdownToHtml(post.content)
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