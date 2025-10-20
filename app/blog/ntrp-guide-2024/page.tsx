import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NTRPGuidePage() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                블로그로 돌아가기
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">실력 향상</Badge>
            <span className="text-sm text-[#64748B]">•</span>
            <span className="text-sm text-[#64748B]">8분 읽기</span>
            <span className="text-sm text-[#64748B]">•</span>
            <span className="text-sm text-[#64748B]">2024년 1월 15일</span>
          </div>
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            NTRP 레벨 완벽 가이드: 1.5부터 5.0+까지
          </h1>
          <p className="text-xl text-[#334155] leading-relaxed">
            NTRP 시스템을 완전히 이해하고 자신의 실력을 정확히 측정하는 방법을 알아보세요. 
            각 레벨별 특징과 향상 방법을 상세히 설명합니다.
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <CardContent className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-4">NTRP란 무엇인가요?</h2>
                <p className="text-[#334155] leading-relaxed mb-6">
                  NTRP(National Tennis Rating Program)는 미국 테니스 협회(USTA)에서 개발한 
                  테니스 실력 평가 시스템입니다. 1.0부터 7.0까지 0.5 단위로 구분되며, 
                  각 레벨별로 명확한 기술적 기준이 제시되어 있습니다.
                </p>

                <h2 className="text-2xl font-bold text-[#0F172A] mb-4">각 레벨별 상세 분석</h2>
                
                <div className="space-y-6">
                  <Card className="border-l-4 border-l-[#0BA360]">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#0BA360]">NTRP 1.5 - 초보자</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#334155] mb-4">
                        기초적인 스트로크만 가능하며, 경기 경험이 거의 없는 단계입니다.
                      </p>
                      <ul className="list-disc list-inside text-[#334155] space-y-2">
                        <li>포핸드와 백핸드의 기본 동작 이해</li>
                        <li>서브를 넣는 것이 어려움</li>
                        <li>랠리를 지속하기 어려움</li>
                        <li>코트 포지셔닝에 대한 이해 부족</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-[#19C37D]">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#19C37D]">NTRP 2.5 - 기초자</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#334155] mb-4">
                        기본 랠리는 가능하나 기술 완성도와 실전 감각은 낮은 단계입니다.
                      </p>
                      <ul className="list-disc list-inside text-[#334155] space-y-2">
                        <li>느린 공으로 기본 랠리 가능</li>
                        <li>서브를 넣을 수 있지만 일관성 부족</li>
                        <li>방향 조절이 어려움</li>
                        <li>네트 플레이에 대한 두려움</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-[#2364AA]">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#2364AA]">NTRP 3.0 - 중급자</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#334155] mb-4">
                        중간 속도 스트로크에 일관성이 생기며, 단/복식 포지션 이해가 시작되는 단계입니다.
                      </p>
                      <ul className="list-disc list-inside text-[#334155] space-y-2">
                        <li>중간 속도에서 일관된 랠리 가능</li>
                        <li>서브의 일관성 향상</li>
                        <li>기본적인 방향 조절 가능</li>
                        <li>단식과 복식의 차이 이해</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-[#3D8BFF]">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#3D8BFF]">NTRP 3.5 - 중상급자</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#334155] mb-4">
                        방향 조절과 상황 대응 능력이 향상되며, 네트 플레이 도전이 가능한 단계입니다.
                      </p>
                      <ul className="list-disc list-inside text-[#334155] space-y-2">
                        <li>방향과 깊이 조절 능력 향상</li>
                        <li>네트 플레이 시도</li>
                        <li>상황에 따른 샷 선택</li>
                        <li>기본적인 전술 이해</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-[#C7F000]">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#C7F000]">NTRP 4.0 - 상급자</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#334155] mb-4">
                        전술적 경기 운영과 다양한 샷 전략이 가능한 단계입니다.
                      </p>
                      <ul className="list-disc list-inside text-[#334155] space-y-2">
                        <li>전술적 경기 운영</li>
                        <li>다양한 샷 전략 구사</li>
                        <li>상대의 약점 파악</li>
                        <li>압박과 방어의 균형</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-2xl font-bold text-[#0F172A] mb-4 mt-8">실력 향상을 위한 팁</h2>
                <div className="bg-[#F8FAFC] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-3">1. 정확한 자가 평가</h3>
                  <p className="text-[#334155] mb-4">
                    자신의 현재 실력을 객관적으로 평가하는 것이 가장 중요합니다. 
                    테니스프렌즈의 NTRP 분석기를 통해 정확한 레벨을 측정해보세요.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-3">2. 단계별 목표 설정</h3>
                  <p className="text-[#334155] mb-4">
                    한 번에 여러 기술을 향상시키려 하지 말고, 현재 레벨에서 다음 레벨로 
                    올라가기 위한 핵심 기술에 집중하세요.
                  </p>
                  
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-3">3. 꾸준한 연습</h3>
                  <p className="text-[#334155]">
                    주 2-3회의 정기적인 연습과 다양한 상대와의 경기 경험을 통해 
                    실전 감각을 기르는 것이 중요합니다.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-[#0BA360] to-[#19C37D] rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-2">지금 바로 NTRP 레벨을 측정해보세요!</h3>
                  <p className="mb-4 opacity-90">
                    15문항의 간단한 질문으로 정확한 NTRP 레벨과 개선 방향을 확인할 수 있습니다.
                  </p>
                  <Link href="/utility/ntrp-analyzer">
                    <Button className="bg-white text-[#0BA360] hover:bg-gray-100">
                      무료로 측정하기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">관련 태그</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">#NTRP</Badge>
                    <Badge variant="outline">#실력측정</Badge>
                    <Badge variant="outline">#가이드</Badge>
                    <Badge variant="outline">#테니스기초</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">다른 포스트</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/blog/tennis-racket-selection" className="block hover:text-[#0BA360] transition-colors">
                    <div className="text-sm font-medium">초보자를 위한 테니스 라켓 선택 가이드</div>
                    <div className="text-xs text-[#64748B]">6분 읽기</div>
                  </Link>
                  <Link href="/blog/tennis-strategy-basics" className="block hover:text-[#0BA360] transition-colors">
                    <div className="text-sm font-medium">테니스 전술의 기초: 포지셔닝과 샷 선택</div>
                    <div className="text-xs text-[#64748B]">10분 읽기</div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
