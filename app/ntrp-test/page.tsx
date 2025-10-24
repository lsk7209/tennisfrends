import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "나의 테니스 실력은 몇 점? - NTRP 테스트",
  description: "NTRP 시스템으로 나의 실력을 재미있게 알아보세요."
};

export default function NTRPTestIntroPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 overflow-hidden">
      {/* Tennis court background pattern */}
      <div className="absolute inset-0 bg-[url('/images/tennis-court-pattern.svg')] bg-cover bg-center opacity-10 animate-fade-in"></div>

      <div className="relative z-10 text-center p-6 max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-xl animate-scale-in">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 animate-slide-up">
            🎾 나의 테니스 실력은 몇 점?
          </h1>
          <p className="text-lg md:text-xl text-[#64748B] mb-8 animate-slide-up delay-100">
            NTRP 시스템으로 나의 실력을 재미있게 알아보세요
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">📊</div>
              <CardTitle className="text-lg">15문항 자가진단</CardTitle>
              <CardDescription>
                포핸드, 백핸드, 서브, 발리 등 종합 평가
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🏆</div>
              <CardTitle className="text-lg">NTRP 레벨 산정</CardTitle>
              <CardDescription>
                1.5부터 5.0+까지 정확한 실력 측정
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🎯</div>
              <CardTitle className="text-lg">플레이 스타일 분석</CardTitle>
              <CardDescription>
                나만의 테니스 성향과 특징 파악
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA */}
        <div className="mb-8">
          <Link href="/ntrp-test/test">
            <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white text-xl px-12 py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in delay-200">
              테스트 시작하기 →
            </Button>
          </Link>
        </div>

        {/* NTRP Levels Info */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#0BA360]/10 to-[#2364AA]/10 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-[#0BA360]/20 text-[#0BA360]">
              NTRP 레벨 가이드
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            테니스 실력 측정의 표준
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            1.5 (초보)부터 5.0+ (고급)까지, 미국 테니스 협회가 개발한 
            공식 실력 측정 시스템으로 정확한 레벨을 확인할 수 있습니다.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-8 text-left">
          <h3 className="text-lg font-semibold mb-4">자주 묻는 질문</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <strong>Q: NTRP가 무엇인가요?</strong>
              <p className="text-gray-600 mt-1">미국 테니스 협회의 공식 실력 측정 시스템입니다.</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <strong>Q: 결과는 정확한가요?</strong>
              <p className="text-gray-600 mt-1">15문항의 종합적 평가로 높은 정확도를 제공합니다.</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <strong>Q: 결과를 공유할 수 있나요?</strong>
              <p className="text-gray-600 mt-1">네, SNS나 카톡으로 결과를 공유할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}