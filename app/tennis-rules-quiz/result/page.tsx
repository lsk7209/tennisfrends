"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function TennisRulesQuizResultPage() {
  const searchParams = useSearchParams();
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scoreParam = searchParams.get("score");
    const totalParam = searchParams.get("total");

    if (scoreParam && totalParam) {
      try {
        setScore(parseInt(scoreParam));
        setTotalQuestions(parseInt(totalParam));
      } catch (e) {
        console.error("Failed to parse score or total questions:", e);
        setError("결과를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      setError("유효한 퀴즈 결과 데이터가 없습니다.");
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5F3]">
        <Progress value={50} className="w-1/2" />
        <p className="ml-4 text-[#64748B]">결과 분석 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F3] p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-red-500">오류 발생</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tennis-rules-quiz">
              <Button className="bg-[#2364AA] hover:bg-[#3D8BFF]">
                퀴즈 다시 풀기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const percentage = score !== null && totalQuestions !== null ? (score / totalQuestions) * 100 : 0;
  const message = score !== null && totalQuestions !== null
    ? `총 ${totalQuestions}문제 중 ${score}점 획득!`
    : "퀴즈 결과가 없습니다.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2364AA]/10 via-white to-[#0BA360]/10 p-6">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            📚 테니스 규칙 퀴즈 결과
          </h1>
          <p className="text-lg text-[#64748B]">
            당신의 테니스 규칙 이해도를 확인해보세요!
          </p>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-5xl font-extrabold text-[#2364AA]">
              {percentage.toFixed(0)}%
            </CardTitle>
            <CardDescription className="text-xl text-[#0BA360] mt-2">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 추가 피드백 */}
            <div>
              <h3 className="font-semibold text-[#0F172A] mb-3">💡 피드백</h3>
              <p className="text-[#334155]">
                {percentage >= 80
                  ? "훌륭합니다! 테니스 규칙에 대한 이해도가 매우 높으시네요. 실전에서도 규칙을 잘 활용하여 경기를 유리하게 이끌어갈 수 있을 것입니다."
                  : percentage >= 50
                  ? "좋은 시도였습니다! 몇 가지 규칙에서 보완이 필요해 보입니다. 자주 헷갈리는 규칙들을 다시 한번 확인해보세요."
                  : "규칙 학습이 더 필요해 보입니다. 기본적인 테니스 규칙부터 차근차근 다시 학습하는 것을 추천합니다."
                }
              </p>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-wrap gap-3 justify-center pt-6">
              <Link href="/tennis-rules-quiz">
                <Button
                  variant="outline"
                  className="border-[#0BA360] text-[#0BA360] hover:bg-[#0BA360] hover:text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  퀴즈 다시 풀기
                </Button>
              </Link>
              <Link href="/utility">
                <Button
                  className="bg-[#2364AA] hover:bg-[#3D8BFF]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  다른 유틸리티 보기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
