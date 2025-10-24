"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, TrendingUp, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NTRPResultPage() {
  const searchParams = useSearchParams();
  const level = parseFloat(searchParams.get('level') || '2.5');
  const description = searchParams.get('description') || '중급자';
  const answers = JSON.parse(searchParams.get('answers') || '{}');

  const getLevelInfo = (ntrpLevel: number) => {
    if (ntrpLevel <= 2.0) {
      return {
        color: "bg-red-100 text-red-800",
        icon: "🌱",
        title: "초보자",
        description: "기본기 연습이 필요한 단계",
        tips: ["기본 자세 연습", "라켓 그립 익히기", "간단한 스트로크 연습"]
      };
    } else if (ntrpLevel <= 2.5) {
      return {
        color: "bg-orange-100 text-orange-800",
        icon: "🌿",
        title: "초급자",
        description: "기본기를 다지는 단계",
        tips: ["서브 연습", "포핸드/백핸드 정확도 향상", "발리 기본기"]
      };
    } else if (ntrpLevel <= 3.0) {
      return {
        color: "bg-yellow-100 text-yellow-800",
        icon: "🌳",
        title: "초중급자",
        description: "기술을 발전시키는 단계",
        tips: ["다양한 샷 연습", "전략적 사고", "체력 향상"]
      };
    } else if (ntrpLevel <= 3.5) {
      return {
        color: "bg-blue-100 text-blue-800",
        icon: "🏆",
        title: "중급자",
        description: "안정적인 플레이가 가능한 단계",
        tips: ["고급 기술 연습", "경기 전략", "심리적 안정성"]
      };
    } else if (ntrpLevel <= 4.0) {
      return {
        color: "bg-green-100 text-green-800",
        icon: "🥇",
        title: "중상급자",
        description: "고급 기술을 구사할 수 있는 단계",
        tips: ["전문적 훈련", "경기 분석", "체력 관리"]
      };
    } else if (ntrpLevel <= 4.5) {
      return {
        color: "bg-purple-100 text-purple-800",
        icon: "👑",
        title: "상급자",
        description: "전문가 수준의 기술을 보유한 단계",
        tips: ["전문가급 훈련", "심리적 강화", "경기 전략 고도화"]
      };
    } else {
      return {
        color: "bg-indigo-100 text-indigo-800",
        icon: "🏅",
        title: "고급자",
        description: "최고 수준의 테니스 실력",
        tips: ["최고 수준 유지", "지속적 발전", "멘토링"]
      };
    }
  };

  const levelInfo = getLevelInfo(level);
  const progress = ((level - 1.5) / 3.5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/utility/ntrp-analyzer">
            <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">NTRP 실력 분석 결과</h1>
            <p className="text-[#64748B]">당신의 테니스 실력 레벨을 분석했습니다</p>
          </div>
        </div>

        {/* Main Result Card */}
        <Card className="shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0BA360]/5 to-[#19C37D]/5"></div>
          <CardHeader className="text-center pb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <CardTitle className="text-4xl font-bold text-[#0F172A] mb-4">
              NTRP {level}
            </CardTitle>
            <Badge className={`text-lg px-6 py-3 rounded-full mb-4 shadow-lg ${levelInfo.color}`}>
              {levelInfo.icon} {levelInfo.title}
            </Badge>
            <p className="text-xl text-[#64748B] mb-6">
              {levelInfo.description}
            </p>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#64748B]">실력 레벨</span>
                <span className="text-sm text-[#64748B]">{level}/5.0</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Level Description */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0F172A] flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#0BA360]" />
                  현재 수준
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  {levelInfo.description}로, 기본적인 테니스 기술을 구사할 수 있는 수준입니다.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#0F172A] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#0BA360]" />
                  개선 방향
                </h3>
                <ul className="space-y-2">
                  {levelInfo.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-[#64748B]">
                      <span className="text-[#0BA360] mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/utility/ntrp-analyzer/test">
                <Button variant="outline" className="border-[#0BA360] text-[#0BA360] hover:bg-[#0BA360] hover:text-white px-6 py-3">
                  다시 테스트하기
                </Button>
              </Link>
              <Button 
                onClick={() => {
                  const shareUrl = `${window.location.origin}/utility/ntrp-analyzer/result?level=${level}&description=${description}`;
                  navigator.clipboard.writeText(shareUrl);
                  alert('결과 링크가 복사되었습니다!');
                }}
                className="bg-[#0BA360] hover:bg-[#19C37D] text-white px-6 py-3"
              >
                결과 공유하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Utilities */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">다른 유틸리티도 체험해보세요</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/utility/injury-risk">
                <Button variant="outline" className="w-full h-auto p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏥</div>
                    <div className="font-semibold">부상 위험도 체크</div>
                    <div className="text-sm text-[#64748B]">안전한 테니스 플레이</div>
                  </div>
                </Button>
              </Link>
              <Link href="/utility/string-tension">
                <Button variant="outline" className="w-full h-auto p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="font-semibold">스트링 텐션 계산기</div>
                    <div className="text-sm text-[#64748B]">최적의 장비 설정</div>
                  </div>
                </Button>
              </Link>
              <Link href="/utility/tennis-type">
                <Button variant="outline" className="w-full h-auto p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🧩</div>
                    <div className="font-semibold">테니스 성향 분석</div>
                    <div className="text-sm text-[#64748B]">플레이 스타일 파악</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
