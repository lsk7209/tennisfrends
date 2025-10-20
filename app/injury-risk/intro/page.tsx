import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InjuryRiskIntroPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F7F5F3] overflow-hidden">
      {/* Tennis court background pattern */}
      <div className="absolute inset-0 bg-[url('/images/tennis-court-pattern.svg')] bg-cover bg-center opacity-10 animate-fade-in"></div>

      <div className="relative z-10 text-center p-6 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-xl animate-scale-in">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 animate-slide-up">
            🏥 부상 위험도 체크
          </h1>
          <p className="text-lg md:text-xl text-[#64748B] mb-8 animate-slide-up delay-100">
            플레이 습관·강도·회복 루틴을 바탕으로 지금 상태를 진단합니다
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">⏱️</div>
              <CardTitle className="text-lg">15문항 / 2~3분</CardTitle>
              <CardDescription>
                간단한 질문으로 빠른 진단
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">📋</div>
              <CardTitle className="text-lg">개인화 체크리스트</CardTitle>
              <CardDescription>
                맞춤형 개선 방안 제시
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🎯</div>
              <CardTitle className="text-lg">훈련·장비 추천</CardTitle>
              <CardDescription>
                부상 예방을 위한 실용적 가이드
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA */}
        <div className="mb-8">
          <Link href="/injury-risk/quiz">
            <Button className="bg-[#2364AA] hover:bg-[#3D8BFF] text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in delay-200">
              시작하기 →
            </Button>
          </Link>
        </div>

        {/* Secondary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/string-tension">
            <Button variant="outline" className="w-full sm:w-auto">
              🎾 스트링 텐션 계산기
            </Button>
          </Link>
          <Link href="/utility/ntrp-analyzer">
            <Button variant="outline" className="w-full sm:w-auto">
              📊 NTRP 실력 테스트
            </Button>
          </Link>
          <Link href="/test">
            <Button variant="outline" className="w-full sm:w-auto">
              🏆 규칙 퀴즈
            </Button>
          </Link>
        </div>

        {/* Today's Tip */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#0BA360]/10 to-[#2364AA]/10 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-[#0BA360]/20 text-[#0BA360]">
              오늘의 TIP
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            풋폴트 예방법
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            서브 시 베이스라인과 그 연장선을 밟지 않도록 주의하세요. 
            토스 후 발 위치를 의식적으로 확인하는 습관을 기르면 풋폴트를 크게 줄일 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
