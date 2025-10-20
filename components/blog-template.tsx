"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

interface BlogTemplateProps {
  title: string
  description: string
  publishDate: string
  readTime: string
  tags: string[]
  category: string
  author: string
  featuredImage?: string
  content: React.ReactNode
  relatedPosts?: Array<{
    title: string
    slug: string
    excerpt: string
  }>
  socialShare?: {
    url: string
    title: string
    description: string
  }
}

export default function BlogTemplate({
  title,
  description,
  publishDate,
  readTime,
  tags,
  category,
  author,
  featuredImage,
  content,
  relatedPosts = [],
  socialShare
}: BlogTemplateProps) {
  
  const handleShare = (platform: string) => {
    if (!socialShare) return
    
    const { url, title, description } = socialShare
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description)
    
    let shareUrl = ''
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'kakao':
        shareUrl = `https://story.kakao.com/share?url=${encodedUrl}`
        break
      case 'naver':
        shareUrl = `https://share.naver.com/web/shareView?url=${encodedUrl}&title=${encodedTitle}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('링크가 복사되었습니다!')
        return
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <nav className="mb-8 text-sm text-[#64748B]">
          <Link href="/" className="hover:text-[#0BA360] transition-colors">홈</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-[#0BA360] transition-colors">블로그</Link>
          <span className="mx-2">/</span>
          <span className="text-[#0F172A] font-medium">{category}</span>
        </nav>

        {/* 메인 콘텐츠 */}
        <article className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          {/* 헤더 섹션 */}
          <CardHeader className="pb-8 px-8 pt-8">
            <div className="space-y-6">
              {/* 카테고리 & 태그 */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#0BA360] text-white">{category}</Badge>
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[#0BA360] border-[#0BA360]">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* 제목 */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight font-pretendard tracking-tight">
                {title}
              </h1>

              {/* 설명 */}
              <p className="text-lg md:text-xl text-[#64748B] leading-relaxed font-pretendard max-w-3xl">
                {description}
              </p>

              {/* 메타 정보 */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#64748B] pt-2">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{readTime}분 읽기</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✍️</span>
                  <span>{author}</span>
                </div>
              </div>

              {/* 소셜 공유 */}
              {socialShare && (
                <div className="flex items-center gap-4 pt-6 border-t border-[#E2E8F0]">
                  <span className="text-sm font-medium text-[#0F172A]">공유하기:</span>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('facebook')}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      className="text-blue-400 border-blue-400 hover:bg-blue-50"
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('kakao')}
                      className="text-yellow-500 border-yellow-500 hover:bg-yellow-50"
                    >
                      카카오
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('naver')}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      네이버
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('copy')}
                      className="text-gray-600 border-gray-600 hover:bg-gray-50"
                    >
                      링크 복사
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>

          {/* 대표 이미지 */}
          {featuredImage && (
            <div className="px-8 pb-8">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-sm"
                loading="lazy"
                onError={(e) => {
                  // 이미지 로딩 실패 시 기본 이미지로 대체
                  const target = e.target as HTMLImageElement;
                  console.log('Image failed to load, retrying with fallback URL');
                  target.src = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}&author=${encodeURIComponent(author)}&date=${encodeURIComponent(publishDate)}`;
                }}
                onLoad={() => {
                  console.log('Image loaded successfully');
                }}
              />
            </div>
          )}

          {/* 목차 (자동 생성) */}
          <div className="px-8 pb-8">
            <Card className="bg-[#F8FAFC] border-[#E2E8F0] rounded-xl">
              <CardHeader className="pb-4 px-6 pt-6">
                <CardTitle className="text-lg font-semibold text-[#0F172A] flex items-center gap-2">
                  📋 목차
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <nav className="space-y-3 text-sm">
                  <a href="#introduction" className="block text-[#0BA360] hover:underline hover:text-[#19C37D] transition-colors font-medium">
                    1. 도입부
                  </a>
                  <a href="#main-content" className="block text-[#0BA360] hover:underline hover:text-[#19C37D] transition-colors font-medium">
                    2. 본문
                  </a>
                  <a href="#conclusion" className="block text-[#0BA360] hover:underline hover:text-[#19C37D] transition-colors font-medium">
                    3. 결론
                  </a>
                  <a href="#related-utilities" className="block text-[#0BA360] hover:underline hover:text-[#19C37D] transition-colors font-medium">
                    4. 관련 유틸리티
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* 본문 콘텐츠 */}
          <CardContent className="px-8 pb-12">
            <div className="prose prose-lg max-w-none font-pretendard prose-headings:text-[#0F172A] prose-headings:font-bold prose-p:text-[#334155] prose-p:leading-relaxed prose-p:mb-6 prose-strong:text-[#0F172A] prose-strong:font-semibold prose-ul:text-[#334155] prose-ol:text-[#334155] prose-li:mb-2 prose-blockquote:border-l-[#0BA360] prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[#64748B] prose-a:text-[#0BA360] prose-a:no-underline hover:prose-a:underline prose-code:bg-[#F8FAFC] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm">
              {content}
            </div>
          </CardContent>
        </article>

        {/* CTA 섹션 */}
        <Card className="mt-12 bg-gradient-to-r from-[#0BA360] to-[#19C37D] text-white border-0 rounded-xl shadow-lg">
          <CardContent className="p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">테니스 실력이 궁금하다면?</h3>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
              NTRP 실력 테스트 분석기로 정확한 레벨을 확인하고 맞춤형 가이드를 받아보세요!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/utility/ntrp-analyzer">
                <Button size="lg" className="bg-white text-[#0BA360] hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-md">
                  🎯 실력 분석하기
                </Button>
              </Link>
              <Link href="/utility">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold rounded-full">
                  🔧 모든 유틸리티 보기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 관련 글 */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8 text-center">관련 글</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl border-[#E2E8F0]">
                    <CardContent className="p-8">
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-3 hover:text-[#0BA360] transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-[#64748B] text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 댓글 섹션 (향후 구현) */}
        <Card className="mt-16 rounded-xl border-[#E2E8F0]">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-xl font-semibold text-[#0F172A] flex items-center gap-2">
              💬 댓글
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="text-center py-12 text-[#64748B]">
              <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💭</span>
              </div>
              <p className="text-lg mb-2">댓글 기능은 곧 추가될 예정입니다.</p>
              <p className="text-sm">
                문의사항이 있으시면 <a href="/contact" className="text-[#0BA360] hover:underline font-medium">문의하기</a>를 이용해주세요.
              </p>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}
