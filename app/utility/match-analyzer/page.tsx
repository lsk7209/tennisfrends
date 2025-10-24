import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MatchAnalyzerIntroPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F7F5F3] overflow-hidden">
      {/* Tennis court background pattern */}
      <div className="absolute inset-0 bg-[url('/images/tennis-court-pattern.svg')] bg-cover bg-center opacity-10 animate-fade-in"></div>

      <div className="relative z-10 text-center p-6 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-xl animate-scale-in">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 animate-slide-up">
            📊 경기 기록 분석기
          </h1>
          <p className="text-lg md:text-xl text-[#64748B] mb-8 animate-slide-up delay-100">
            데이터로 찾는 승리 패턴
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">📝</div>
              <CardTitle className="text-lg">경기 데이터 입력</CardTitle>
              <CardDescription>
                단건 입력 또는 CSV 업로드로 간편하게
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">📈</div>
              <CardTitle className="text-lg">실시간 통계 분석</CardTitle>
              <CardDescription>
                승률, 서브/리턴 지표, UE/위너 비율 등
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">📋</div>
              <CardTitle className="text-lg">개인화 리포트</CardTitle>
              <CardDescription>
                상세 분석과 개선 방향 제시
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/match-analyzer/new">
              <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in delay-200">
                새 기록 입력 →
              </Button>
            </Link>
            <Link href="/match-analyzer/matches">
              <Button variant="outline" className="text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in delay-300">
                CSV 업로드
              </Button>
            </Link>
            <Link href="/match-analyzer/analytics">
              <Button variant="outline" className="text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in delay-400">
                누적 분석
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#0BA360]/10 to-[#2364AA]/10 rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-[#0BA360]/20 text-[#0BA360]">
              주요 기능
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
            핵심 KPI 분석
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            승률, 게임득실, 서브/리턴 지표, UE/위너 비율, 랠리 길이 분포, 
            코트/상대별 성과를 종합적으로 분석하여 승리 패턴을 찾아드립니다.
          </p>
        </div>
      </div>
    </div>
  );
}
