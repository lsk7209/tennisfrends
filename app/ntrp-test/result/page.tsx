"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { getNTRPLevel } from "@/lib/ntrpMath";

export default function NTRPTestResultPage() {
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
      setError("유효한 테스트 결과 데이터가 없습니다.");
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
            <Link href="/ntrp-test">
              <Button className="bg-[#0BA360] hover:bg-[#19C37D]">
                다시 테스트하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!score || !totalQuestions) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F3] p-6">
        <Card className="w-full max-w-md text-center">
          <CardTitle className="text-2xl text-red-500">데이터 없음</CardTitle>
          <CardDescription>결과를 표시할 데이터가 없습니다.</CardDescription>
          <CardContent>
            <Link href="/ntrp-test">
              <Button className="bg-[#0BA360] hover:bg-[#19C37D]">
                NTRP 테스트로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const ntrpResult = getNTRPLevel(score);
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 p-6">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            🎾 당신의 NTRP 레벨은?
          </h1>
          <p className="text-lg text-[#64748B]">
            15문항 테스트를 통해 정확한 테니스 실력을 분석했습니다.
          </p>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle 
              className="text-5xl font-extrabold"
              style={{ color: ntrpResult.color }}
            >
              {ntrpResult.level}
            </CardTitle>
            <CardDescription className="text-xl text-[#2364AA] mt-2">
              {ntrpResult.title}
            </CardDescription>
            <p className="text-lg text-[#64748B] mt-4">
              {ntrpResult.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 점수 정보 */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-[#0BA360]/10 rounded-lg">
                <div className="text-2xl font-bold text-[#0BA360]">{score}</div>
                <div className="text-sm text-[#64748B]">점수</div>
              </div>
              <div className="p-4 bg-[#2364AA]/10 rounded-lg">
                <div className="text-2xl font-bold text-[#2364AA]">{totalQuestions}</div>
                <div className="text-sm text-[#64748B]">총 문항</div>
              </div>
              <div className="p-4 bg-[#C7F000]/10 rounded-lg">
                <div className="text-2xl font-bold text-[#C7F000]">{percentage}%</div>
                <div className="text-sm text-[#64748B]">정답률</div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-wrap gap-3 justify-center pt-6">
              <Link href="/ntrp-test">
                <Button
                  variant="outline"
                  className="border-[#0BA360] text-[#0BA360] hover:bg-[#0BA360] hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  다시 테스트하기
                </Button>
              </Link>
              <Button
                className="bg-[#0BA360] hover:bg-[#19C37D]"
                onClick={() => {
                  const shareText = `제 NTRP 레벨은 ${ntrpResult.level} (${ntrpResult.title}) 입니다! 테니스프렌즈에서 확인해보세요: ${window.location.href}`;
                  navigator.clipboard.writeText(shareText);
                  alert("결과가 클립보드에 복사되었습니다!");
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                결과 공유하기
              </Button>
              <Link href="/utility">
                <Button variant="outline">
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
