import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: "ntrp-guide-2024",
    title: "NTRP 레벨 완벽 가이드: 1.5부터 5.0+까지",
    excerpt: "NTRP 시스템을 완전히 이해하고 자신의 실력을 정확히 측정하는 방법을 알아보세요. 각 레벨별 특징과 향상 방법을 상세히 설명합니다.",
    date: "2024-01-15",
    readTime: "8분",
    category: "실력 향상",
    tags: ["NTRP", "실력 측정", "가이드"],
    image: "🎾"
  },
  {
    id: "tennis-racket-selection",
    title: "초보자를 위한 테니스 라켓 선택 가이드",
    excerpt: "처음 테니스를 시작하는 분들을 위한 라켓 선택 기준과 추천 모델을 소개합니다. 헤드 크기, 무게, 밸런스 등 중요한 요소들을 쉽게 설명합니다.",
    date: "2024-01-12",
    readTime: "6분",
    category: "장비",
    tags: ["라켓", "초보자", "장비 선택"],
    image: "🏸"
  },
  {
    id: "tennis-strategy-basics",
    title: "테니스 전술의 기초: 포지셔닝과 샷 선택",
    excerpt: "테니스에서 승리하기 위한 기본 전술을 배워보세요. 코트 포지셔닝, 상황별 샷 선택, 상대 분석 방법까지 실전에 바로 적용할 수 있는 내용입니다.",
    date: "2024-01-10",
    readTime: "10분",
    category: "전술",
    tags: ["전술", "포지셔닝", "전략"],
    image: "🧠"
  }
];

export default function BlogPage() {
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
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-lg flex items-center justify-center text-2xl">
                    {post.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-[#64748B]">•</span>
                      <span className="text-sm text-[#64748B]">{post.readTime} 읽기</span>
                    </div>
                    <CardTitle className="text-xl mb-2">
                      <Link 
                        href={`/blog/${post.id}`}
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
                    {new Date(post.date).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
