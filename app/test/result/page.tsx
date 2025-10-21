"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  level: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export default function TestResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const score = parseInt(searchParams.get('score') || '0');
    const totalQuestions = parseInt(searchParams.get('total') || '12');
    
    if (score === 0) {
      router.push('/test');
      return;
    }

    calculateResult(score, totalQuestions);
  }, [searchParams, router]);

  const calculateResult = (score: number, totalQuestions: number) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let level: string;
    let description: string;
    let strengths: string[];
    let weaknesses: string[];
    let recommendations: string[];

    if (percentage >= 90) {
      level = "테니스 규칙 마스터";
      description = "테니스 규칙에 대한 완벽한 이해를 가지고 있습니다. 실전에서도 규칙을 정확히 적용할 수 있습니다.";
      strengths = ["규칙 완벽 이해", "실전 적용 능력", "심판 역할 가능"];
      weaknesses = ["규칙 변화 추적 필요"];
      recommendations = ["최신 규칙 업데이트 확인", "심판 자격증 취득 고려", "후배 지도 역할"];
    } else if (percentage >= 80) {
      level = "테니스 규칙 전문가";
      description = "테니스 규칙을 매우 잘 알고 있으며, 대부분의 상황에서 올바른 판단을 할 수 있습니다.";
      strengths = ["규칙 정확한 이해", "실전 경험 풍부", "상황 판단 능력"];
      weaknesses = ["세부 규칙 보완 필요"];
      recommendations = ["복잡한 상황 규칙 학습", "심판 교육 참여", "규칙 변화 모니터링"];
    } else if (percentage >= 70) {
      level = "테니스 규칙 숙련자";
      description = "기본적인 테니스 규칙을 잘 알고 있으며, 일반적인 상황에서 올바른 판단을 할 수 있습니다.";
      strengths = ["기본 규칙 숙지", "일반적 상황 대응", "학습 의지"];
      weaknesses = ["복잡한 상황 규칙", "세부 규칙 이해"];
      recommendations = ["복잡한 규칙 학습", "실전 경험 쌓기", "규칙 관련 자료 학습"];
    } else if (percentage >= 60) {
      level = "테니스 규칙 학습자";
      description = "기본적인 테니스 규칙을 알고 있지만, 더 많은 학습이 필요합니다.";
      strengths = ["기본 규칙 인지", "학습 의지", "개선 가능성"];
      weaknesses = ["규칙 이해 부족", "실전 적용 어려움"];
      recommendations = ["기본 규칙 집중 학습", "실전 경험 쌓기", "규칙 관련 자료 학습"];
    } else {
      level = "테니스 규칙 초보자";
      description = "테니스 규칙에 대한 이해가 부족합니다. 체계적인 학습이 필요합니다.";
      strengths = ["학습 의지", "개선 가능성"];
      weaknesses = ["규칙 이해 부족", "실전 적용 어려움"];
      recommendations = ["기본 규칙부터 학습", "실전 경험 쌓기", "규칙 관련 자료 학습"];
    }

    setResult({
      score,
      totalQuestions,
      percentage,
      level,
      description,
      strengths,
      weaknesses,
      recommendations
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0BA360] mx-auto mb-4"></div>
          <p className="text-lg text-[#64748B]">결과를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-4">오류가 발생했습니다</h1>
          <Button onClick={() => router.push('/test')} className="bg-[#0BA360] hover:bg-[#19C37D]">
            다시 테스트하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10">
      <div className="max-w-4xl mx-auto p-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            📚 테니스 규칙 퀴즈 결과
          </h1>
          <p className="text-lg text-[#64748B] mb-6">
            당신의 테니스 규칙 이해도를 분석했습니다
          </p>
        </div>

        {/* Score Card */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#0F172A]">
              {result.level}
            </CardTitle>
            <CardDescription className="text-lg">
              {result.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Score */}
              <div className="text-center">
                <div className="text-4xl font-bold text-[#0BA360] mb-2">
                  {result.score}
                </div>
                <div className="text-sm text-[#64748B]">정답 수</div>
              </div>

              {/* Total */}
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2364AA] mb-2">
                  {result.totalQuestions}
                </div>
                <div className="text-sm text-[#64748B]">총 문항</div>
              </div>

              {/* Percentage */}
              <div className="text-center">
                <div className="text-4xl font-bold text-[#C7F000] mb-2">
                  {result.percentage}%
                </div>
                <div className="text-sm text-[#64748B]">정답률</div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>정답률</span>
                <span>{result.percentage}%</span>
              </div>
              <Progress value={result.percentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-[#0BA360]">💪 강점</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-[#F59E0B]">⚠️ 개선점</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-orange-500">→</span>
                    <span className="text-sm">{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-[#2364AA]">🎯 추천 학습 방향</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="p-3 bg-[#2364AA]/5 rounded-lg border border-[#2364AA]/20">
                  <span className="text-[#2364AA] font-medium">{recommendation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/test')}
            className="bg-[#0BA360] hover:bg-[#19C37D]"
          >
            🔄 다시 테스트하기
          </Button>
          <Button
            onClick={() => router.push('/utility')}
            variant="outline"
          >
            🛠️ 다른 도구 보기
          </Button>
          <Button
            onClick={() => {
              const resultText = `테니스 규칙 퀴즈 결과\n\n점수: ${result.score}/${result.totalQuestions} (${result.percentage}%)\n레벨: ${result.level}\n\n강점:\n${result.strengths.map(s => `• ${s}`).join('\n')}\n\n개선점:\n${result.weaknesses.map(w => `• ${w}`).join('\n')}\n\n추천 학습:\n${result.recommendations.map(r => `• ${r}`).join('\n')}`;
              navigator.clipboard.writeText(resultText);
            }}
            variant="outline"
          >
            📋 결과 복사하기
          </Button>
        </div>
      </div>
    </div>
  );
}
