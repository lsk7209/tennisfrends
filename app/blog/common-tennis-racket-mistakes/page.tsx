import { Metadata } from "next";
import BlogTemplate from "@/components/blog-template";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Lightbulb, Target, Users, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "테니스 라켓 선택 시 흔한 실수 7가지 | 테니스프렌즈 블로그",
  description: "라켓 무게, 헤드 크기, 밸런스 등 라켓 선택 시 자주 하는 실수들과 올바른 선택 방법. 초보자부터 중급자까지 실전 가이드.",
  keywords: ["테니스 라켓 선택", "라켓 실수", "테니스 장비", "라켓 무게", "라켓 헤드 크기"],
  openGraph: {
    title: "테니스 라켓 선택 시 흔한 실수 7가지 | 테니스프렌즈 블로그",
    description: "라켓 무게, 헤드 크기, 밸런스 등 라켓 선택 시 자주 하는 실수들과 올바른 선택 방법. 초보자부터 중급자까지 실전 가이드.",
    type: "article",
    publishedTime: "2025-01-13T00:00:00.000Z",
    modifiedTime: "2025-01-13T00:00:00.000Z",
    authors: ["TennisFriends"],
    tags: ["테니스 라켓 선택", "라켓 실수", "테니스 장비", "라켓 무게", "라켓 헤드 크기"],
  },
  twitter: {
    card: "summary_large_image",
    title: "테니스 라켓 선택 시 흔한 실수 7가지 | 테니스프렌즈 블로그",
    description: "라켓 무게, 헤드 크기, 밸런스 등 라켓 선택 시 자주 하는 실수들과 올바른 선택 방법. 초보자부터 중급자까지 실전 가이드.",
  },
  alternates: {
    canonical: "https://tennisfriends.kr/blog/common-tennis-racket-mistakes",
  },
};

export default function CommonTennisRacketMistakesPage() {
  const content = (
    <div className="space-y-8">
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "테니스 라켓 선택 시 흔한 실수 7가지",
            "description": "라켓 무게, 헤드 크기, 밸런스 등 라켓 선택 시 자주 하는 실수들과 올바른 선택 방법. 초보자부터 중급자까지 실전 가이드.",
            "author": {
              "@type": "Organization",
              "name": "TennisFriends"
            },
            "publisher": {
              "@type": "Organization",
              "name": "TennisFriends",
              "logo": {
                "@type": "ImageObject",
                "url": "https://tennisfriends.kr/logo.png"
              }
            },
            "datePublished": "2025-01-13",
            "dateModified": "2025-01-13",
            "image": "https://tennisfriends.kr/images/blog/common-tennis-racket-mistakes-hero.webp"
          })
        }}
      />

      {/* 모바일 최적화 메타 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0BA360" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* Hook Section */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border-l-4 border-red-400">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          🎾 테니스 라켓 선택 시 흔한 실수 7가지
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          "가장 비싼 라켓이 최고다", "무거운 라켓이 파워가 세다" - 이런 생각 때문에 
          <strong className="text-red-600"> 부상과 실력 저하</strong>를 겪는 플레이어들이 많습니다.
        </p>
        <blockquote className="text-xl font-semibold text-gray-800 italic">
          "라켓은 손의 연장이지, 무기장이 아니다."
        </blockquote>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📋 목차</h2>
        <ul className="space-y-2">
          <li><a href="#people-miss" className="text-gray-600 hover:text-[#0BA360] transition-colors">🎯 사람들이 자주 놓치는 부분</a></li>
          <li><a href="#coach-analysis" className="text-gray-600 hover:text-[#0BA360] transition-colors">⚙️ 코치의 실전 분석</a></li>
          <li><a href="#practical-tips" className="text-gray-600 hover:text-[#0BA360] transition-colors">🧩 코트에서 바로 써먹는 법</a></li>
          <li><a href="#coach-story" className="text-gray-600 hover:text-[#0BA360] transition-colors">💬 코치의 이야기</a></li>
          <li><a href="#faq" className="text-gray-600 hover:text-[#0BA360] transition-colors">🧠 자주 묻는 질문</a></li>
          <li><a href="#related-content" className="text-gray-600 hover:text-[#0BA360] transition-colors">🔗 함께 보면 좋은 콘텐츠</a></li>
          <li><a href="#closing" className="text-gray-600 hover:text-[#0BA360] transition-colors">🏁 마무리</a></li>
        </ul>
      </div>

      {/* Truth Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg" id="people-miss">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎯 사람들이 자주 놓치는 부분
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          대부분의 플레이어들이 <strong>라켓 스펙보다 브랜드와 가격</strong>에 집중합니다. 
          하지만 실제로는 <strong>체형, 플레이 스타일, 실력 레벨</strong>에 맞는 라켓을 선택하는 것이 
          훨씬 더 중요합니다.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-semibold">
            💡 <strong>핵심 포인트:</strong> 라켓은 당신을 위한 도구이지, 당신이 라켓을 위한 도구가 아닙니다.
          </p>
        </div>
      </div>

      {/* Insight Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg" id="coach-analysis">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ⚙️ 코치의 실전 분석
        </h2>
        
        <div className="space-y-6">
          {/* 실수 1 */}
          <Card className="border-l-4 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                실수 1: 무게만 보고 선택하기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ 잘못된 선택</h4>
                  <p className="text-sm text-gray-600">"무거운 라켓이 파워가 세다" → 320g+ 헤비 라켓 선택</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ 올바른 선택</h4>
                  <p className="text-sm text-gray-600">체력과 스윙 스타일에 맞는 무게 (280-300g)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 실수 2 */}
          <Card className="border-l-4 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                실수 2: 헤드 크기 무시하기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ 잘못된 선택</h4>
                  <p className="text-sm text-gray-600">초보자가 95sq in 미드플러스 라켓 선택</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ 올바른 선택</h4>
                  <p className="text-sm text-gray-600">초보자는 100-110sq in 오버사이즈 라켓</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 실수 3 */}
          <Card className="border-l-4 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                실수 3: 밸런스 무시하기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ 잘못된 선택</h4>
                  <p className="text-sm text-gray-600">헤드 헤비 라켓으로 스윙 속도 저하</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ 올바른 선택</h4>
                  <p className="text-sm text-gray-600">헤드 라이트 또는 이븐 밸런스 라켓</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 실수 4 */}
          <Card className="border-l-4 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                실수 4: 스트링 패턴 무시하기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ 잘못된 선택</h4>
                  <p className="text-sm text-gray-600">초보자가 18x20 덴스 패턴 선택</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ 올바른 선택</h4>
                  <p className="text-sm text-gray-600">초보자는 16x19 오픈 패턴</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 실수 5 */}
          <Card className="border-l-4 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                실수 5: 가격만 보고 선택하기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ 잘못된 선택</h4>
                  <p className="text-sm text-gray-600">"비싼 라켓이 최고다" → 50만원+ 라켓 구매</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ 올바른 선택</h4>
                  <p className="text-sm text-gray-600">실력과 체형에 맞는 적정 가격대 라켓</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 실수 6 */}
          <Card className="border-l-4 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                실수 6: 그립 사이즈 무시하기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ 잘못된 선택</h4>
                  <p className="text-sm text-gray-600">손 크기와 상관없이 G3 사이즈만 선택</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ 올바른 선택</h4>
                  <p className="text-sm text-gray-600">손 크기에 맞는 적정 그립 사이즈</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 실수 7 */}
          <Card className="border-l-4 border-red-400">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                실수 7: 테스트 없이 구매하기
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">❌ 잘못된 선택</h4>
                  <p className="text-sm text-gray-600">온라인으로만 보고 바로 구매</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✅ 올바른 선택</h4>
                  <p className="text-sm text-gray-600">렌탈이나 데모로 실제 사용 후 구매</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">
            📎 <Link href="/utility/racket-matchmaker" className="text-green-600 hover:text-green-800 underline">
              라켓 매칭 도우미
            </Link>에서 나에게 맞는 라켓을 찾아보세요.
          </p>
        </div>
      </div>

      {/* Application Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg" id="practical-tips">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🧩 코트에서 바로 써먹는 법
        </h2>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">1단계: 체력과 실력 평가</h3>
            <p className="text-blue-700 text-sm">
              주 2회 이상 플레이 가능한지, NTRP 레벨은 어느 정도인지 먼저 파악하세요.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">2단계: 라켓 렌탈 테스트</h3>
            <p className="text-green-700 text-sm">
              최소 2-3개 라켓을 1주일씩 렌탈하여 실제 코트에서 테스트해보세요.
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">3단계: 스트링과 그립 조정</h3>
            <p className="text-purple-700 text-sm">
              라켓 선택 후 스트링 텐션과 그립 사이즈를 개인에 맞게 조정하세요.
            </p>
          </div>
        </div>

        <blockquote className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-yellow-800 font-medium">
            💬 <strong>코치의 조언:</strong> "완벽한 라켓은 없습니다. 당신에게 맞는 라켓을 찾는 것이 핵심입니다."
          </p>
        </blockquote>
      </div>

      {/* Connection Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg" id="coach-story">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          💬 코치의 이야기
        </h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 leading-relaxed mb-4">
            지난해 한 중급자 학생이 "프로 선수들이 쓰는 라켓이 최고"라며 350g 헤비 라켓을 구매했습니다. 
            하지만 3개월 후 손목 부상으로 병원을 찾게 되었죠.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            결국 280g 헤드 라이트 라켓으로 바꾸고 나서야 부상이 회복되었습니다. 
            <strong>프로와 아마추어의 체력 차이</strong>를 간과한 결과였습니다.
          </p>
          <blockquote className="text-lg font-semibold text-gray-800 italic">
            "라켓은 당신의 실력을 보완하는 도구이지, 실력을 대체하는 마법이 아닙니다."
          </blockquote>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg" id="faq">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🧠 자주 묻는 질문
        </h2>
        
        <div className="space-y-4">
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-800 cursor-pointer">
              <strong>Q. 라켓 무게는 얼마나 중요한가요?</strong>
            </summary>
            <p className="mt-2 text-gray-600">
              A. 매우 중요합니다. 너무 무거우면 부상 위험이 높아지고, 너무 가벼우면 파워가 부족합니다. 
              체력과 스윙 스타일에 맞는 무게를 선택하는 것이 핵심입니다.
            </p>
          </details>
          
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-800 cursor-pointer">
              <strong>Q. 초보자에게 추천하는 라켓 스펙은?</strong>
            </summary>
            <p className="mt-2 text-gray-600">
              A. 무게 280-300g, 헤드 크기 100-110sq in, 헤드 라이트 밸런스, 16x19 스트링 패턴을 추천합니다.
            </p>
          </details>
          
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-800 cursor-pointer">
              <strong>Q. 라켓 구매 전 반드시 해야 할 것은?</strong>
            </summary>
            <p className="mt-2 text-gray-600">
              A. 렌탈이나 데모를 통해 실제 코트에서 테스트해보는 것입니다. 
              최소 1주일 이상 사용해보고 결정하세요.
            </p>
          </details>
        </div>
      </div>

      {/* Related Content */}
      <div className="bg-white p-6 rounded-2xl shadow-lg" id="related-content">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 함께 보면 좋은 콘텐츠</h2>
        
        {/* 관련 유틸리티 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 관련 유틸리티</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/utility/racket-matchmaker.webp" 
                alt="라켓 매칭 도우미" 
                className="w-full h-32 object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <h4 className="font-semibold text-gray-800 mb-2">라켓 매칭 도우미</h4>
              <p className="text-gray-600 text-sm mb-4">10문항 설문으로 나에게 맞는 라켓을 찾아보세요</p>
              <Link href="/utility/racket-matchmaker">
                <Button className="w-full bg-[#0BA360] hover:bg-[#19C37D] text-white">
                  이동하기
                </Button>
              </Link>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/utility/string-tension.webp" 
                alt="스트링 텐션 계산기" 
                className="w-full h-32 object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <h4 className="font-semibold text-gray-800 mb-2">스트링 텐션 계산기</h4>
              <p className="text-gray-600 text-sm mb-4">라켓과 플레이 스타일에 맞는 최적의 텐션을 계산해드립니다</p>
              <Link href="/utility/string-tension">
                <Button className="w-full bg-[#0BA360] hover:bg-[#19C37D] text-white">
                  이동하기
                </Button>
              </Link>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/utility/ntrp-analyzer.webp" 
                alt="NTRP 자가 진단 테스트" 
                className="w-full h-32 object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <h4 className="font-semibold text-gray-800 mb-2">NTRP 자가 진단 테스트</h4>
              <p className="text-gray-600 text-sm mb-4">나의 실력 레벨을 확인하고 개선 방향을 제시합니다</p>
              <Link href="/utility/ntrp-analyzer">
                <Button className="w-full bg-[#0BA360] hover:bg-[#19C37D] text-white">
                  이동하기
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 관련 블로그 포스트 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 관련 블로그 포스트</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/blog/tennis-beginner-three-steps-hero.webp" 
                alt="테니스 초보자 3단계 성장 로드맵" 
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">테니스 초보자 3단계 성장 로드맵</h4>
                <p className="text-gray-600 text-sm mb-4">기본기부터 실전까지 체계적인 학습 방법과 실력 향상 팁</p>
                <Link href="/blog/tennis-beginner-three-steps">
                  <Button variant="outline" className="w-full">
                    읽어보기
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <img 
                src="/images/blog/tennis-grip-guide-hero.webp" 
                alt="내 손에 맞는 라켓 그립 찾는 법" 
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800 mb-2">내 손에 맞는 라켓 그립 찾는 법</h4>
                <p className="text-gray-600 text-sm mb-4">그립 두께·감각·소재별 특징을 통해 손에 딱 맞는 라켓 그립을 선택하는 법</p>
                <Link href="/blog/tennis-grip-guide">
                  <Button variant="outline" className="w-full">
                    읽어보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl" id="closing">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🏁 마무리</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          라켓 선택은 테니스 실력 향상의 첫 걸음입니다. 
          <strong>당신의 체형, 실력, 플레이 스타일</strong>에 맞는 라켓을 찾는 것이 
          가장 중요한 포인트입니다.
        </p>
        <blockquote className="text-xl font-semibold text-gray-800 italic">
          "완벽한 라켓은 없지만, 당신에게 완벽한 라켓은 있습니다."
        </blockquote>
      </div>

      {/* Share Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📤 친구에게 공유하기</h2>
        
        <div className="flex flex-col items-center space-y-4">
          <Button 
            onClick={() => {
              navigator.clipboard.writeText('https://tennisfriends.kr/blog/common-tennis-racket-mistakes');
              alert('공유 링크가 복사되었습니다 📎');
            }}
            className="bg-[#0BA360] hover:bg-[#19C37D] text-white gap-2"
            aria-label="링크 복사"
          >
            <Share2 className="w-4 h-4" />
            📎 공유하기
          </Button>
          
          <div className="flex gap-3">
            <a 
              href="https://twitter.com/intent/tweet?url=https://tennisfriends.kr/blog/common-tennis-racket-mistakes" 
              target="_blank" 
              rel="noopener"
              className="text-blue-500 hover:text-blue-700"
            >
              트위터 공유
            </a>
            <a 
              href="https://www.facebook.com/sharer/sharer.php?u=https://tennisfriends.kr/blog/common-tennis-racket-mistakes" 
              target="_blank" 
              rel="noopener"
              className="text-blue-600 hover:text-blue-800"
            >
              페이스북 공유
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <BlogTemplate
      title="테니스 라켓 선택 시 흔한 실수 7가지"
      description="라켓 무게, 헤드 크기, 밸런스 등 라켓 선택 시 자주 하는 실수들과 올바른 선택 방법. 초보자부터 중급자까지 실전 가이드."
      publishDate="2025-01-13"
      readTime="8"
      category="gear"
      tags={["테니스라켓", "라켓선택", "테니스장비", "라켓실수", "테니스팁"]}
      author="TennisFriends"
      socialShare={{
        url: "https://tennisfriends.kr/blog/common-tennis-racket-mistakes",
        title: "테니스 라켓 선택 시 흔한 실수 7가지",
        description: "라켓 무게, 헤드 크기, 밸런스 등 라켓 선택 시 자주 하는 실수들과 올바른 선택 방법. 초보자부터 중급자까지 실전 가이드."
      }}
      content={content}
      relatedPosts={[
        {
          title: "내 손에 맞는 라켓 그립 찾는 법",
          slug: "tennis-racket-grip-guide",
          excerpt: "그립 두께·감각·소재별 특징을 통해 손에 딱 맞는 라켓 그립을 선택하는 법. 손목 부상 방지와 스윙 안정성을 높이는 실전 가이드."
        },
        {
          title: "초보자를 위한 테니스 라켓 선택 가이드",
          slug: "tennis-racket-selection",
          excerpt: "테니스 초보자도 5분만에 자신에게 맞는 라켓을 선택할 수 있는 완벽한 가이드입니다."
        }
      ]}
    />
  );
}
