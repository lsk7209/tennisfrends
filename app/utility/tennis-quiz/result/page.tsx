"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, Target, Trophy, BookOpen, AlertTriangle, XCircle, CheckCircle } from "lucide-react";

// 등급 시스템
const getGrade = (score: number) => {
  if (score >= 10) return { name: "Rules Pro", color: "#0BA360", description: "테니스 규칙의 전문가" };
  if (score >= 7) return { name: "Match Ready", color: "#2364AA", description: "경기 준비 완료" };
  if (score >= 4) return { name: "Learning", color: "#C7F000", description: "규칙 학습 중" };
  return { name: "Beginner", color: "#F59E0B", description: "기초 규칙 학습 필요" };
};

// 카테고리별 색상
const CATEGORY_COLORS = {
  "Serve": "bg-emerald-100 text-emerald-800",
  "Return": "bg-sky-100 text-sky-800", 
  "Scoring": "bg-amber-100 text-amber-800",
  "Tiebreak": "bg-indigo-100 text-indigo-800",
  "Let/Net": "bg-teal-100 text-teal-800",
  "Footfault": "bg-rose-100 text-rose-800",
  "Doubles": "bg-violet-100 text-violet-800",
  "Hindrance": "bg-orange-100 text-orange-800",
  "BallInPlay": "bg-cyan-100 text-cyan-800"
};

export default function TennisQuizResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const shareResult = async () => {
    setIsSharing(true);
    try {
      const url = window.location.href;
      const shareText = `🎾 테니스 규칙 퀴즈 결과 공유! 🎾\n\n${grade.name} 등급 (${score}/${total}점)\n\n${grade.description}\n\n나도 테니스 규칙을 얼마나 알고 있을까? 테니스프렌즈에서 확인해보세요!\n\n${url}`;
      
      if (navigator.share) {
        await navigator.share({
          title: '테니스 규칙 퀴즈 결과',
          text: shareText,
          url: url
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('결과 링크가 복사되었습니다! 친구들과 공유해보세요 🎾');
      }
    } catch (error) {
      console.error('공유 실패:', error);
      // Fallback to clipboard
      try {
        const fallbackText = `🎾 테니스 규칙 퀴즈 결과 공유! 🎾\n\n${grade.name} 등급 (${score}/${total}점)\n\n${grade.description}\n\n나도 테니스 규칙을 얼마나 알고 있을까? 테니스프렌즈에서 확인해보세요!\n\n${window.location.href}`;
        await navigator.clipboard.writeText(fallbackText);
        alert('결과 링크가 복사되었습니다! 친구들과 공유해보세요 🎾');
      } catch (clipboardError) {
        console.error('클립보드 복사 실패:', clipboardError);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '12');
  const timeSpent = parseInt(searchParams.get('time') || '0');
  const wrongCatsStr = searchParams.get('wrongCats') || '{}';
  const wrongAnswersStr = searchParams.get('wrongAnswers') || '[]';
  
  const wrongCategories = JSON.parse(wrongCatsStr);
  const wrongAnswers = JSON.parse(wrongAnswersStr);
  const grade = getGrade(score);
  const timeMinutes = Math.round(timeSpent / 60000 * 10) / 10;

  // 약점 영역 분석
  const topWeakAreas = Object.entries(wrongCategories)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([category]) => category);

  // 카테고리별 개선 가이드
  const improvementGuides = {
    "Serve": [
      "서브 토스는 위로 던져야 하며, 베이스라인 접촉은 풋폴트입니다.",
      "서브 시 발이 베이스라인이나 연장선을 밟지 않도록 주의하세요."
    ],
    "Return": [
      "리턴은 짧고 단단한 라켓면으로 블록하는 것이 안전합니다.",
      "두 번 바운드 후 타격은 아웃이므로 주의하세요."
    ],
    "Scoring": [
      "게임 스코어는 15-30-40 순서로 진행됩니다.",
      "듀스에서는 2점 차이로 승리해야 합니다."
    ],
    "Tiebreak": [
      "타이브레이크는 2포인트마다 서브 순서가 교대됩니다.",
      "서버-리시버 순서가 중요하므로 올바른 콜을 하세요."
    ],
    "Let/Net": [
      "인플레이 중 공이 네트를 맞고 상대 코트로 넘어가면 인입니다.",
      "서브가 네트를 맞고 넘어가면 렛으로 재서브합니다."
    ],
    "Footfault": [
      "베이스라인이나 연장선 접촉은 풋폴트입니다.",
      "서브 시 발 위치를 미리 확인하는 습관을 기르세요."
    ],
    "Doubles": [
      "복식에서 리시빙 포지션은 게임 교대 시에만 변경 가능합니다.",
      "서브 전 파트너의 공 접촉은 서버 폴트입니다."
    ],
    "Hindrance": [
      "상대가 샷을 준비하는 동안 의도적으로 소리를 내면 방해입니다.",
      "고의적 방해는 포인트 상실로 이어질 수 있습니다."
    ],
    "BallInPlay": [
      "라인 터치는 인이므로 정확한 판단이 중요합니다.",
      "비고의적 더블 히트는 허용됩니다."
    ]
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            🎾 테니스 규칙 퀴즈 결과
          </h1>
          <p className="text-xl text-gray-600">
            당신의 테니스 규칙 이해도를 종합적으로 분석했습니다
          </p>
        </div>

        {/* Main Result Card for Export */}
        <div ref={cardRef} className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
          
          <div className="text-center mb-6 relative z-10">
            <Badge 
              className="text-lg px-6 py-3 rounded-full mb-4 shadow-lg transform hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: grade.color, color: 'white' }}
            >
              🏆 {grade.name}
            </Badge>
            <h2 className="text-6xl font-extrabold mb-4" style={{ color: grade.color }}>
              {score} / {total}
            </h2>
            <p className="text-2xl font-semibold text-gray-800 mb-2">{grade.description}</p>
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <span className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span className="text-lg">소요 시간: {timeMinutes}분</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span className="text-lg">정답률: {Math.round((score / total) * 100)}%</span>
              </span>
            </div>
          </div>

          {/* 약점 영역 */}
          {topWeakAreas.length > 0 && (
            <div className="mb-6 relative z-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">🎯</span>
                주요 약점 영역
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {topWeakAreas.map((category) => (
                  <Badge 
                    key={category}
                    className={`${CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || 'bg-gray-100 text-gray-800'} px-4 py-2 text-sm font-medium shadow-sm`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-6 mb-8">
          <Link href="/tennis-quiz/quiz">
            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-sm px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              🔄 다시 풀기
            </Button>
          </Link>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200 shadow-lg px-6 py-3"
            onClick={shareResult}
            disabled={isSharing}
          >
            <Share2 className="w-4 h-4 mr-2" />
            {isSharing ? '공유 중...' : '📤 결과 공유하기'}
          </Button>
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="analysis" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📊 약점 분석
            </TabsTrigger>
            <TabsTrigger value="wrongAnswers" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              ❌ 오답 해설
            </TabsTrigger>
            <TabsTrigger value="improvement" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📚 개선 가이드
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis" className="mt-6">
            <Card className="shadow-lg border-gray-100">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  카테고리별 성과
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  각 영역별 정답률을 확인하고 약점을 파악하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(wrongCategories).length > 0 ? (
                    Object.entries(wrongCategories).map(([category, wrongCount]) => (
                      <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className={`${CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || 'bg-gray-100 text-gray-800'}`}>
                            {category}
                          </Badge>
                          <span className="text-sm text-[#64748B]">
                            {wrongCount as number}개 오답
                          </span>
                        </div>
                        <div className="text-sm font-medium text-red-600">
                          개선 필요
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="w-12 h-12 text-[#0BA360] mx-auto mb-4" />
                      <p className="text-lg font-semibold text-[#0F172A]">완벽한 성과!</p>
                      <p className="text-[#64748B]">모든 영역에서 완벽한 이해를 보여주셨습니다.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wrongAnswers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#0F172A] flex items-center">
                  <XCircle className="w-5 h-5 mr-2 text-red-500" />
                  오답 해설
                </CardTitle>
                <CardDescription className="text-[#64748B]">
                  틀린 문제들을 다시 확인하고 학습해보세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {wrongAnswers.length > 0 ? (
                    wrongAnswers.map((wrongAnswer: any, index: number) => (
                      <div key={wrongAnswer.questionId} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`${CATEGORY_COLORS[wrongAnswer.category as keyof typeof CATEGORY_COLORS] || 'bg-gray-100 text-gray-800'}`}>
                            {wrongAnswer.category}
                          </Badge>
                          <span className="text-sm text-[#64748B]">문제 {index + 1}</span>
                        </div>
                        
                        <h4 className="font-semibold text-[#0F172A] mb-3">
                          {wrongAnswer.question}
                        </h4>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">
                              내 답: {wrongAnswer.selected + 1}번
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              정답: {wrongAnswer.correct + 1}번
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <div className="text-blue-600 mt-1">💡</div>
                            <div>
                              <p className="text-sm font-medium text-blue-800 mb-1">해설</p>
                              <p className="text-sm text-blue-700">{wrongAnswer.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="w-12 h-12 text-[#0BA360] mx-auto mb-4" />
                      <p className="text-lg font-semibold text-[#0F172A]">완벽한 성과!</p>
                      <p className="text-[#64748B]">모든 문제를 정답으로 맞혔습니다.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="improvement" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#0F172A]">
                  <BookOpen className="inline-block w-5 h-5 mr-2 text-[#0BA360]" />
                  개선 가이드
                </CardTitle>
                <CardDescription className="text-[#64748B]">
                  약점 영역별 구체적인 학습 방향을 제시합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topWeakAreas.length > 0 ? (
                    topWeakAreas.map((category) => (
                      <div key={category} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                          <h3 className="font-semibold text-orange-800">{category} 영역</h3>
                        </div>
                        <ul className="space-y-2">
                          {improvementGuides[category as keyof typeof improvementGuides]?.map((guide, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-orange-700">
                              <span className="text-orange-600 mt-1">•</span>
                              <span>{guide}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="w-12 h-12 text-[#0BA360] mx-auto mb-4" />
                      <p className="text-lg font-semibold text-[#0F172A]">추가 학습 불필요</p>
                      <p className="text-[#64748B]">현재 수준에서 규칙 이해도가 충분합니다.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Utilities */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">다른 유틸리티도 체험해보세요</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/utility/ntrp-analyzer">
              <Button variant="outline" className="border-[#0BA360] text-[#0BA360] hover:bg-[#0BA360] hover:text-white">
                NTRP 실력 테스트
              </Button>
            </Link>
            <Link href="/utility/injury-risk">
              <Button variant="outline" className="border-[#2364AA] text-[#2364AA] hover:bg-[#2364AA] hover:text-white">
                부상 위험도 체크
              </Button>
            </Link>
            <Link href="/utility/string-tension">
              <Button variant="outline" className="border-[#C7F000] text-[#C7F000] hover:bg-[#C7F000] hover:text-black">
                스트링 텐션 계산기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
