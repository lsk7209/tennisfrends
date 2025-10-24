import { Metadata } from "next";
import BlogTemplate from "@/components/blog-template";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Lightbulb, Users, Share2, Trophy, Clock, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "테니스 초보자 3단계 성장 로드맵 | 테니스프렌즈 블로그",
  description: "테니스 초보자가 중급자로 성장하는 3단계 로드맵. 기본기부터 실전까지 체계적인 학습 방법과 실력 향상 팁을 제공합니다.",
  keywords: ["테니스 초보자", "테니스 기본기", "테니스 학습법", "테니스 실력 향상", "테니스 로드맵"],
  openGraph: {
    title: "테니스 초보자 3단계 성장 로드맵 | 테니스프렌즈 블로그",
    description: "테니스 초보자가 중급자로 성장하는 3단계 로드맵. 기본기부터 실전까지 체계적인 학습 방법과 실력 향상 팁을 제공합니다.",
    type: "article",
    publishedTime: "2025-01-13T00:00:00.000Z",
    modifiedTime: "2025-01-13T00:00:00.000Z",
    authors: ["TennisFriends"],
    tags: ["테니스 초보자", "테니스 기본기", "테니스 학습법", "테니스 실력 향상", "테니스 로드맵"],
  },
  twitter: {
    card: "summary_large_image",
    title: "테니스 초보자 3단계 성장 로드맵 | 테니스프렌즈 블로그",
    description: "테니스 초보자가 중급자로 성장하는 3단계 로드맵. 기본기부터 실전까지 체계적인 학습 방법과 실력 향상 팁을 제공합니다.",
  },
  alternates: {
    canonical: "https://tennisfriends.kr/blog/tennis-beginner-three-steps",
  },
};

export default function TennisBeginnerThreeStepsPage() {
  const content = (
    <div className="space-y-8">
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "테니스 초보자 3단계 성장 로드맵",
            "description": "테니스 초보자가 중급자로 성장하는 3단계 로드맵. 기본기부터 실전까지 체계적인 학습 방법과 실력 향상 팁을 제공합니다.",
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
            "image": "https://tennisfriends.kr/images/blog/tennis-beginner-three-steps-hero.webp"
          })
        }}
      />

      {/* 모바일 최적화 메타 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0BA360" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* Hook Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border-l-4 border-green-400">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          🎾 테니스 초보자 3단계 성장 로드맵
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          "어디서부터 시작해야 할지 모르겠다", "기본기가 부족해서 막막하다" - 
          이런 고민으로 <strong className="text-green-600">테니스를 포기하는 초보자들이 많습니다</strong>.
        </p>
        <blockquote className="text-xl font-semibold text-gray-800 italic">
          "테니스는 3단계로 배우면 된다. 기본기 → 응용기 → 실전기."
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
          대부분의 초보자들이 <strong>복잡한 기술부터 배우려고 합니다</strong>. 
          하지만 실제로는 <strong>기본 자세와 감각</strong>을 먼저 익히는 것이 
          훨씬 더 중요하고 효과적입니다.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-semibold">
            💡 <strong>핵심 포인트:</strong> 완벽한 기본기가 완성되면, 모든 고급 기술이 자연스럽게 따라옵니다.
          </p>
        </div>
      </div>

      {/* Insight Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ⚙️ 코치의 실전 분석
        </h2>
        
        <div className="space-y-8">
          {/* 1단계 */}
          <Card className="border-l-4 border-green-400">
            <CardHeader>
              <CardTitle className="text-green-600 flex items-center gap-2">
                <Target className="w-6 h-6" />
                1단계: 기본기 완성 (3-6개월)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">🎯 목표</h3>
                  <p className="text-green-700 text-sm">안정적인 기본 자세와 공 감각 익히기</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">포핸드 스트로크</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 기본 그립 (이스턴 그립)</li>
                      <li>• 준비 자세와 백스윙</li>
                      <li>• 임팩트와 팔로스루</li>
                      <li>• 발 움직임과 체중 이동</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">백핸드 스트로크</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 양손 백핸드 기본</li>
                      <li>• 그립 변경 연습</li>
                      <li>• 스윙 궤도 익히기</li>
                      <li>• 발 위치와 밸런스</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">📈 성장 지표</h4>
                  <p className="text-yellow-700 text-sm">
                    • 10회 연속 랠리 가능<br/>
                    • 기본 자세로 공을 정확히 맞출 수 있음<br/>
                    • 간단한 서브와 리턴 가능
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2단계 */}
          <Card className="border-l-4 border-blue-400">
            <CardHeader>
              <CardTitle className="text-blue-600 flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                2단계: 응용기 습득 (6-12개월)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">🎯 목표</h3>
                  <p className="text-blue-700 text-sm">다양한 샷과 전술적 사고 익히기</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">서브 기술</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 서브 토스 연습</li>
                      <li>• 1st 서브와 2nd 서브</li>
                      <li>• 서브 코스 연습</li>
                      <li>• 서브 후 네트 진입</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">발리와 오버헤드</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 포핸드/백핸드 발리</li>
                      <li>• 하프 발리</li>
                      <li>• 오버헤드 스매시</li>
                      <li>• 네트 플레이</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">📈 성장 지표</h4>
                  <p className="text-purple-700 text-sm">
                    • 다양한 샷으로 랠리 가능<br/>
                    • 서브와 리턴으로 게임 진행<br/>
                    • 간단한 전술적 사고 가능
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3단계 */}
          <Card className="border-l-4 border-purple-400">
            <CardHeader>
              <CardTitle className="text-purple-600 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                3단계: 실전 완성 (12-18개월)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">🎯 목표</h3>
                  <p className="text-purple-700 text-sm">실전 경기에서 안정적인 플레이 가능</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">고급 기술</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 스핀 샷 (탑스핀, 슬라이스)</li>
                      <li>• 드롭 샷과 로브</li>
                      <li>• 패싱 샷</li>
                      <li>• 어프로치 샷</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">전술과 멘탈</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 상대 분석과 대응</li>
                      <li>• 포지셔닝</li>
                      <li>• 경기 운영</li>
                      <li>• 멘탈 관리</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">📈 성장 지표</h4>
                  <p className="text-orange-700 text-sm">
                    • 정식 경기 참여 가능<br/>
                    • 다양한 상대와 경기<br/>
                    • 개인 스타일 정립
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">
            📎 <Link href="/utility/ntrp-analyzer" className="text-green-600 hover:text-green-800 underline">
              NTRP 실력 분석
            </Link>에서 현재 실력 레벨을 확인해보세요.
          </p>
        </div>
      </div>

      {/* Application Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🧩 코트에서 바로 써먹는 법
        </h2>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">주간 훈련 계획</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700">월/수/금 (기본기)</h4>
                <p className="text-blue-600">포핸드, 백핸드 기본 연습</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700">화/목 (응용기)</h4>
                <p className="text-blue-600">서브, 발리, 다양한 샷</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700">토/일 (실전)</h4>
                <p className="text-blue-600">경기 연습, 상대와 랠리</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">일일 루틴 (30분)</h3>
            <div className="space-y-2 text-sm text-green-700">
              <p>• 워밍업 (5분): 가벼운 스트레칭과 그림자 스윙</p>
              <p>• 기본기 연습 (15분): 포핸드, 백핸드 반복 연습</p>
              <p>• 응용기 연습 (10분): 서브, 발리, 특정 샷 연습</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">월간 목표 설정</h3>
            <div className="space-y-2 text-sm text-purple-700">
              <p>• 1개월: 기본 자세 완성</p>
              <p>• 3개월: 안정적인 랠리 가능</p>
              <p>• 6개월: 간단한 경기 참여</p>
              <p>• 12개월: 중급자 수준 달성</p>
            </div>
          </div>
        </div>

        <blockquote className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-yellow-800 font-medium">
            💬 <strong>코치의 조언:</strong> "꾸준함이 완벽함보다 낫습니다. 하루 30분이라도 매일 연습하세요."
          </p>
        </blockquote>
      </div>

      {/* Connection Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          💬 코치의 이야기
        </h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-700 leading-relaxed mb-4">
            지난해 40대 직장인 김씨가 "테니스를 배우고 싶지만 시간이 없다"며 고민하고 있었습니다. 
            저는 "하루 30분, 주 3회만 해도 충분하다"고 말씀드렸죠.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            김씨는 1단계부터 차근차근 시작해서 6개월 만에 중급자 수준에 도달했습니다. 
            <strong>체계적인 단계별 학습</strong>이 핵심이었습니다.
          </p>
          <blockquote className="text-lg font-semibold text-gray-800 italic">
            "테니스는 마라톤이지 스프린트가 아닙니다. 꾸준함이 승부입니다."
          </blockquote>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🧠 자주 묻는 질문
        </h2>
        
        <div className="space-y-4">
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-800 cursor-pointer">
              <strong>Q. 3단계를 모두 완료하는데 얼마나 걸리나요?</strong>
            </summary>
            <p className="mt-2 text-gray-600">
              A. 개인차가 있지만, 주 3회 이상 꾸준히 연습한다면 12-18개월 정도면 중급자 수준에 도달할 수 있습니다.
            </p>
          </details>
          
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-800 cursor-pointer">
              <strong>Q. 혼자서도 연습할 수 있나요?</strong>
            </summary>
            <p className="mt-2 text-gray-600">
              A. 기본기 연습은 혼자서도 가능합니다. 벽치기, 그림자 스윙, 체력 훈련 등으로 기본기를 다질 수 있어요.
            </p>
          </details>
          
          <details className="border border-gray-200 rounded-lg p-4">
            <summary className="font-semibold text-gray-800 cursor-pointer">
              <strong>Q. 각 단계를 건너뛸 수 있나요?</strong>
            </summary>
            <p className="mt-2 text-gray-600">
              A. 권장하지 않습니다. 기본기가 탄탄해야 고급 기술이 자연스럽게 따라옵니다. 
              단계별로 차근차근 익히는 것이 가장 효율적입니다.
            </p>
          </details>
        </div>
      </div>

      {/* Related Content */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 함께 보면 좋은 콘텐츠</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <img 
              src="/images/utility/ntrp-analyzer.webp" 
              alt="NTRP 실력 분석" 
              className="w-full h-32 object-cover rounded mb-3"
              loading="lazy"
            />
            <h3 className="font-semibold text-gray-800 mb-2">NTRP 실력 분석</h3>
            <p className="text-gray-600 text-sm mb-3">현재 실력 레벨을 정확히 측정하고 개선 방향을 제시합니다</p>
            <Link href="/utility/ntrp-analyzer">
              <Button className="w-full bg-[#0BA360] hover:bg-[#19C37D] text-white">
                이동하기
              </Button>
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <img 
              src="/images/utility/tennis-type.webp" 
              alt="테니스 성향 분석" 
              className="w-full h-32 object-cover rounded mb-3"
              loading="lazy"
            />
            <h3 className="font-semibold text-gray-800 mb-2">테니스 성향 분석</h3>
            <p className="text-gray-600 text-sm mb-3">나의 플레이 스타일을 분석하여 최적의 전술을 추천합니다</p>
            <Link href="/utility/tennis-type">
              <Button className="w-full bg-[#0BA360] hover:bg-[#19C37D] text-white">
                이동하기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Closing Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🏁 마무리</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          테니스는 단계별로 배우면 누구나 즐길 수 있는 스포츠입니다. 
          <strong>기본기 → 응용기 → 실전기</strong> 순서로 차근차근 익혀가면 
          어느새 중급자 수준에 도달해 있을 것입니다.
        </p>
        <blockquote className="text-xl font-semibold text-gray-800 italic">
          "테니스의 시작은 언제나 기본기다. 완벽한 기본기가 완벽한 테니스를 만든다."
        </blockquote>
      </div>

      {/* Share Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">친구에게 공유하기</h2>
        
        <div className="flex flex-col items-center space-y-4">
          <Button 
            onClick={() => {
              navigator.clipboard.writeText('https://tennisfriends.kr/blog/tennis-beginner-three-steps');
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
              href="https://twitter.com/intent/tweet?url=https://tennisfriends.kr/blog/tennis-beginner-three-steps" 
              target="_blank" 
              rel="noopener"
              className="text-blue-500 hover:text-blue-700"
            >
              트위터 공유
            </a>
            <a 
              href="https://www.facebook.com/sharer/sharer.php?u=https://tennisfriends.kr/blog/tennis-beginner-three-steps" 
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
      title="테니스 초보자 3단계 성장 로드맵"
      description="테니스 초보자가 중급자로 성장하는 3단계 로드맵. 기본기부터 실전까지 체계적인 학습 방법과 실력 향상 팁을 제공합니다."
      publishDate="2025-01-13"
      readTime="10"
      category="training"
      tags={["테니스초보자", "테니스기본기", "테니스학습법", "테니스실력향상", "테니스로드맵"]}
      author="TennisFriends"
      socialShare={{
        url: "https://tennisfriends.kr/blog/tennis-beginner-three-steps",
        title: "테니스 초보자 3단계 성장 로드맵",
        description: "테니스 초보자가 중급자로 성장하는 3단계 로드맵. 기본기부터 실전까지 체계적인 학습 방법과 실력 향상 팁을 제공합니다."
      }}
      content={content}
      relatedPosts={[
        {
          title: "혼자서 실력 올리는 테니스 훈련 루틴",
          slug: "solo-tennis-training-routine",
          excerpt: "집·공원·벽 앞에서도 충분히 성장할 수 있는 혼자서 실력을 끌어올릴 수 있는 루틴 5가지를 소개합니다."
        },
        {
          title: "테니스 라켓 선택 시 흔한 실수 7가지",
          slug: "common-tennis-racket-mistakes",
          excerpt: "라켓 무게, 헤드 크기, 밸런스 등 라켓 선택 시 자주 하는 실수들과 올바른 선택 방법을 알려드립니다."
        }
      ]}
    />
  );
}
