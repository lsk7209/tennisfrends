"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { levelBands, personas, drills, kpis, weeklyPlan, doubles, equipment, injuryRisks, commonMistakes } from "@/lib/ntrpResultConfig";
import { getNTRPLevel, mapScoreToLevelBand, mapLevelToBaseProfile } from "@/lib/ntrpMath";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ResultCardNew from "@/components/ResultCardNew";
import Link from "next/link";
import { ArrowLeft, Share2, Target, Trophy, Users, Settings, AlertTriangle, Lightbulb } from "lucide-react";

interface NTRPResultPageProps {
  backUrl?: string;
  showTotalQuestions?: boolean;
}

export default function NTRPResultPage({ 
  backUrl = "/ntrp-test", 
  showTotalQuestions = false 
}: NTRPResultPageProps) {
  const searchParams = useSearchParams();
  const [isSharing, setIsSharing] = useState(false);

  // Parse query parameters
  const score = parseInt(searchParams.get('score') || '45');
  const totalQuestions = parseInt(searchParams.get('total') || '15');
  const q13 = searchParams.get('q13') || '올라운더';
  
  // Compute results
  const levelObj = getNTRPLevel(score);
  const band = mapScoreToLevelBand(score);
  const persona = personas[q13 as keyof typeof personas] || personas["올라운더"];
  
  // Radar chart data
  const radarData = useMemo(() => {
    const profile = mapLevelToBaseProfile(band.level);
    return [
      { skill: "서브", value: profile.serve },
      { skill: "포핸드", value: profile.forehand },
      { skill: "백핸드", value: profile.backhand },
      { skill: "발리", value: profile.volley },
      { skill: "오버헤드", value: profile.overhead },
      { skill: "이동", value: profile.movement },
      { skill: "멘탈", value: profile.mental },
      { skill: "전술", value: profile.tactics }
    ];
  }, [band.level]);

  // 공유 함수
  const shareResult = async () => {
    setIsSharing(true);
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({
          title: 'NTRP 실력 분석 결과',
          text: `NTRP ${band.level} 레벨로 분석되었습니다!`,
          url: url
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('결과 링크가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      console.error('공유 실패:', error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('결과 링크가 클립보드에 복사되었습니다!');
      } catch (clipboardError) {
        console.error('클립보드 복사 실패:', clipboardError);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`나의 NTRP 레벨은 ${band.level} (${band.title})입니다! 테니스프렌즈에서 확인해보세요.`);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      kakao: `https://story.kakao.com/share?url=${url}`,
    };
    
    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href={backUrl}>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                🎾 NTRP 실력 분석 리포트
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                당신의 테니스 실력을 종합적으로 분석했습니다
                {showTotalQuestions && (
                  <span className="ml-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    {score}/{totalQuestions}점
                  </span>
                )}
              </p>
            </div>
          </div>
          
          {/* Export Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={shareResult}
              disabled={isSharing}
              className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isSharing ? '공유 중...' : '📤 결과 공유하기'}
            </Button>
          </div>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div 
              className="inline-block px-8 py-6 rounded-3xl text-white font-bold text-3xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: band.color }}
            >
              🏆 NTRP {band.level} - {band.title}
            </div>
            <p className="text-xl text-gray-700 mb-4 leading-relaxed">{levelObj.desc}</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-medium">
                💪 {persona.key}
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium">
                🎯 {persona.slogan}
              </Badge>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <ResultCardNew
              icon={<Target className="w-6 h-6" />}
              title="주요 강점"
              items={band.strengths}
              color={band.color}
            />
            <ResultCardNew
              icon={<AlertTriangle className="w-6 h-6" />}
              title="개선 포인트"
              items={band.weaknesses}
              color="#F59E0B"
            />
            <ResultCardNew
              icon={<Lightbulb className="w-6 h-6" />}
              title="집중 영역"
              items={band.focus}
              color="#8B5CF6"
            />
          </div>

          {/* Radar Chart */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4 text-center">기술 프로필</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis 
                    dataKey="key" 
                    tick={{ fontSize: 12, fill: '#64748B' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: '#94A3B8' }}
                  />
                  <Radar
                    name="기술 수준"
                    dataKey="value"
                    stroke={band.color}
                    fill={band.color}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="training" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="training">훈련 계획</TabsTrigger>
            <TabsTrigger value="doubles">복식 전략</TabsTrigger>
            <TabsTrigger value="equipment">장비 추천</TabsTrigger>
            <TabsTrigger value="kpis">목표 지표</TabsTrigger>
            <TabsTrigger value="injury">부상 예방</TabsTrigger>
            <TabsTrigger value="mistakes">흔한 실수</TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  주간 훈련 계획
                </CardTitle>
                <CardDescription>
                  {band.level} 레벨에 맞는 체계적인 훈련 프로그램
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {weeklyPlan[band.level as keyof typeof weeklyPlan]?.map((week, index) => (
                    <div key={index} className="border border-[#E2E8F0] rounded-lg p-4">
                      <h4 className="font-semibold text-[#0F172A] mb-2">Week {week.week}: {week.focus}</h4>
                      <ul className="space-y-1 text-sm text-[#64748B]">
                        {week.micro.map((item, microIndex) => (
                          <li key={microIndex} className="flex items-start gap-2">
                            <span className="text-[#0BA360] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  추천 드릴
                </CardTitle>
                <CardDescription>
                  레벨별 맞춤 훈련 드릴과 목표
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {drills[band.level as keyof typeof drills]?.map((drill, index) => (
                    <div key={index} className="border border-[#E2E8F0] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-[#0F172A]">{drill.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {drill.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#64748B]">{drill.goal}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doubles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  복식 전략
                </CardTitle>
                <CardDescription>
                  {band.level} 레벨에서 효과적인 복식 플레이 방법
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-2">주요 역할: {doubles[band.level as keyof typeof doubles]?.role}</h4>
                    <ul className="space-y-2">
                      {doubles[band.level as keyof typeof doubles]?.patterns.map((pattern, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#0BA360] mt-1">•</span>
                          <span className="text-[#334155]">{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  장비 추천
                </CardTitle>
                <CardDescription>
                  {band.level} 레벨에 최적화된 라켓과 스트링 설정
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#0F172A] mb-2">라켓 프레임</h4>
                      <p className="text-[#64748B]">{equipment[band.level as keyof typeof equipment]?.frame}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] mb-2">스트링 타입</h4>
                      <p className="text-[#64748B]">{equipment[band.level as keyof typeof equipment]?.string}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0F172A] mb-2">텐션</h4>
                      <p className="text-[#64748B]">{equipment[band.level as keyof typeof equipment]?.tension}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0F172A] mb-2">추가 팁</h4>
                    <p className="text-[#64748B]">{equipment[band.level as keyof typeof equipment]?.note}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kpis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  목표 지표
                </CardTitle>
                <CardDescription>
                  {band.level} 레벨에서 달성해야 할 핵심 지표들
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {kpis[band.level as keyof typeof kpis]?.map((kpi, index) => (
                    <div key={index} className="border border-[#E2E8F0] rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-[#0F172A] mb-1">{kpi.name}</h4>
                      <Badge variant="secondary" className="bg-[#0BA360]/20 text-[#0BA360]">
                        {kpi.target}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="injury" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  부상 예방
                </CardTitle>
                <CardDescription>
                  레벨별 주요 부상 위험과 예방 방법
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {injuryRisks[band.level as keyof typeof injuryRisks]?.map((risk, index) => (
                    <div key={index} className="border border-[#E2E8F0] rounded-lg p-4">
                      <h4 className="font-semibold text-[#0F172A] mb-2">{risk.risk}</h4>
                      <p className="text-[#64748B]">{risk.tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mistakes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  흔한 실수와 해결책
                </CardTitle>
                <CardDescription>
                  {band.level} 레벨에서 자주 발생하는 실수와 개선 방법
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonMistakes[band.level as keyof typeof commonMistakes]?.map((mistake, index) => (
                    <div key={index} className="border border-[#E2E8F0] rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">문제: {mistake.issue}</h4>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0BA360] mb-2">해결책: {mistake.fix}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Social Share */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              결과 공유하기
            </CardTitle>
            <CardDescription>
              친구들과 결과를 공유해보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={() => shareToSocial('twitter')}
                className="border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white"
              >
                트위터
              </Button>
              <Button
                variant="outline"
                onClick={() => shareToSocial('facebook')}
                className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
              >
                페이스북
              </Button>
              <Button
                variant="outline"
                onClick={() => shareToSocial('kakao')}
                className="border-[#FEE500] text-[#FEE500] hover:bg-[#FEE500] hover:text-black"
              >
                카카오스토리
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
