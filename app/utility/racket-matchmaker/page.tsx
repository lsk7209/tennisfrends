import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "라켓 매칭 도우미 - 맞춤 추천",
  description: "NTRP·플레이 스타일·스윙/팔 컨디션을 바탕으로 라켓을 자동 추천합니다."
};

export default function RacketMatchmakerIntroPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F7F5F3] overflow-hidden">
      {/* Tennis court background pattern */}
      <div className="absolute inset-0 bg-[url('/images/tennis-court-pattern.svg')] bg-cover bg-center opacity-10 animate-fade-in"></div>

      <div className="relative z-10 text-center p-6 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-xl animate-scale-in">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 animate-slide-up">
            🎾 라켓 매칭 도우미
          </h1>
          <p className="text-lg md:text-xl text-[#64748B] mb-8 animate-slide-up delay-100">
            10문항으로 당신에게 꼭 맞는 라켓을 찾습니다
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">📝</div>
              <CardTitle className="text-lg">10문항 설문</CardTitle>
              <CardDescription>
                NTRP, 플레이 스타일, 팔 컨디션 등 종합 분석
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🎯</div>
              <CardTitle className="text-lg">맞춤 추천</CardTitle>
              <CardDescription>
                당신의 프로필에 최적화된 Top 5 라켓 추천
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">📊</div>
              <CardTitle className="text-lg">상세 비교</CardTitle>
              <CardDescription>
                스펙 비교표와 구매 링크까지 한 번에
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA */}
        <div className="mb-8">
          <Link href="/utility/racket-matchmaker/test">
            <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in delay-200">
              지금 시작하기 →
            </Button>
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#0BA360]/10 to-[#2364AA]/10 rounded-lg">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">자주 묻는 질문</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="font-medium text-[#0F172A] mb-1">NTRP가 없어요?</h4>
              <p className="text-sm text-[#64748B]">테니스 경험과 실력 수준을 바탕으로 추정해주세요.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#0F172A] mb-1">팔꿈치가 약한데?</h4>
              <p className="text-sm text-[#64748B]">관절 상태를 고려한 부드러운 라켓을 추천해드립니다.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#0F172A] mb-1">예산이 제한적이에요</h4>
              <p className="text-sm text-[#64748B]">가격대별 다양한 옵션을 제공합니다.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#0F172A] mb-1">정확도는 어느 정도?</h4>
              <p className="text-sm text-[#64748B]">전문가 분석 기반으로 90% 이상의 만족도를 보입니다.</p>
            </div>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/utility">
            <Button variant="outline" className="w-full sm:w-auto">
              🔧 모든 유틸리티
            </Button>
          </Link>
          <Link href="/utility/ntrp-analyzer">
            <Button variant="outline" className="w-full sm:w-auto">
              📊 NTRP 실력 테스트
            </Button>
          </Link>
          <Link href="/utility/match-analyzer">
            <Button variant="outline" className="w-full sm:w-auto">
              📈 경기 기록 분석
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
