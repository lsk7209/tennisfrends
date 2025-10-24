"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Share2, Target, Trophy, Users, Settings, AlertTriangle, Lightbulb, Star, Zap, Shield, Globe, Flame, Bird, Sparkles } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { STYLE_PROFILES, getStyleProfile, type StyleProfile } from "@/lib/styleProfiles";

const styleIcons = {
  "Strategist": Target,
  "Attacker": Zap,
  "Defender": Shield,
  "All-Rounder": Globe,
  "Power Baseline": Flame,
  "Net Charger": Bird,
  "Instinct Player": Sparkles
};

export default function TennisTypeResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSharing, setIsSharing] = useState(false);
  const [currentTip, setCurrentTip] = useState("");

  const typeId = parseInt(searchParams.get('type') || '1');
  const profile = getStyleProfile(typeId);

  useEffect(() => {
    if (profile) {
      const tips = [
        `오늘 연습 목표: ${profile.recommendedDrills[0]}`,
        `당신은 ${profile.mentality} 스타일입니다.`,
        `${profile.courtPreference}에서 더욱 빛나는 플레이어입니다.`,
        `"${profile.quote}" - ${profile.name}의 마인드셋`,
        `${profile.bestPartners.join(', ')}와 함께하면 완벽한 조합입니다.`
      ];
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(tips[randomIndex]);
    }
  }, [profile]);

  const shareResult = async () => {
    if (!profile) return;
    
    setIsSharing(true);
    try {
      const url = window.location.href;
      const shareText = `🧩 테니스 성향 7유형 분석 결과 공유! 🧩\n\n나의 테니스 성향은 ${profile.emoji} ${profile.name}입니다!\n\n${profile.subtitle}\n\n나도 어떤 테니스 성향일까? 테니스프렌즈에서 확인해보세요!\n\n${url}`;
      
      if (navigator.share) {
        await navigator.share({
          title: '테니스 성향 분석 결과',
          text: shareText,
          url: url
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('결과 링크가 복사되었습니다! 친구들과 공유해보세요 🧩');
      }
    } catch (error) {
      console.error('공유 실패:', error);
      try {
        const fallbackText = `🧩 테니스 성향 7유형 분석 결과 공유! 🧩\n\n나의 테니스 성향은 ${profile.emoji} ${profile.name}입니다!\n\n${profile.subtitle}\n\n나도 어떤 테니스 성향일까? 테니스프렌즈에서 확인해보세요!\n\n${window.location.href}`;
        await navigator.clipboard.writeText(fallbackText);
        alert('결과 링크가 복사되었습니다! 친구들과 공유해보세요 🧩');
      } catch (clipboardError) {
        console.error('클립보드 복사 실패:', clipboardError);
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-red-500">오류 발생</CardTitle>
            <CardDescription>유효하지 않은 성향 유형입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/utility/tennis-type">
              <Button className="bg-[#2364AA] hover:bg-[#3D8BFF]">
                다시 테스트하기
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const StyleIcon = styleIcons[profile.name as keyof typeof styleIcons] || Target;

  // Radar chart data
  const radarData = [
    { subject: '파워', A: profile.chartProfile.power, fullMark: 5 },
    { subject: '컨트롤', A: profile.chartProfile.control, fullMark: 5 },
    { subject: '스핀', A: profile.chartProfile.spin, fullMark: 5 },
    { subject: '안정성', A: profile.chartProfile.stability, fullMark: 5 },
    { subject: '네트플레이', A: profile.chartProfile.netplay, fullMark: 5 },
    { subject: '멘탈', A: profile.chartProfile.mental, fullMark: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10">
      {/* Header Hero */}
      <div 
        className="relative py-16 px-6 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${profile.color} 0%, ${profile.color}CC 100%)` 
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">{profile.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            당신의 테니스 플레이 스타일은<br />
            <span className="text-yellow-300">{profile.name}</span>입니다!
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {profile.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/utility/tennis-type">
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                다시 테스트하기
              </Button>
            </Link>
            <Button
              onClick={shareResult}
              disabled={isSharing}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isSharing ? '공유 중...' : '결과 공유하기'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 -mt-8">
        {/* Section 1 - 핵심 인사이트 */}
        <Card className="mb-8 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              <StyleIcon className="w-6 h-6" style={{ color: profile.color }} />
              핵심 인사이트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* 3줄 요약 */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: profile.color }}>
                  스타일 특징
                </h3>
                <ul className="space-y-3">
                  {profile.desc.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-lg">{profile.emoji}</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Radar Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: profile.color }}>
                  능력치 분석
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#E2E8F0" />
                      <PolarAngleAxis dataKey="subject" stroke="#64748B" />
                      <PolarRadiusAxis angle={90} domain={[0, 5]} stroke="#E2E8F0" />
                      <Radar 
                        name="능력치" 
                        dataKey="A" 
                        stroke={profile.color} 
                        fill={profile.color} 
                        fillOpacity={0.3} 
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Badge chips */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Badge className="px-4 py-2 text-sm" style={{ backgroundColor: profile.color, color: 'white' }}>
                {profile.mentality}
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                {profile.courtPreference} 선호
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm italic">
                "{profile.quote}"
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 - 플레이 특징 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">플레이 특징</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* 강점 */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-600 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  주요 강점
                </h3>
                <div className="space-y-2">
                  {profile.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <Star className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 약점 */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-orange-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  개선 포인트
                </h3>
                <div className="space-y-2">
                  {profile.weaknesses.map((weakness, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-700">{weakness}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3 - 추천 루틴 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center flex items-center justify-center gap-2">
              <Target className="w-5 h-5" style={{ color: profile.color }} />
              추천 훈련 루틴
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {profile.recommendedDrills.map((drill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{drill}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  const randomDrills = profile.recommendedDrills
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3);
                  alert(`오늘의 60분 훈련세트:\n${randomDrills.map((drill, i) => `${i+1}. ${drill}`).join('\n')}`);
                }}
              >
                🎯 훈련세트 60분 구성
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 4 - 유사 프로 선수 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">유사 프로 선수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {profile.proExamples.map((player, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                    🎾
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{player}</h4>
                    <p className="text-sm text-gray-600">프로 테니스 선수</p>
                    <p className="text-xs text-gray-500">{profile.name} 스타일의 대표 선수</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 5 - 이상적 파트너 & 라이벌 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">파트너 & 라이벌 분석</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* 이상적 파트너 */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-600 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  이상적 파트너
                </h3>
                <div className="space-y-2">
                  {profile.bestPartners.map((partner, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2 bg-green-50 text-green-700 border-green-200">
                      {partner}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  이 유형들과 함께하면 완벽한 조합을 만들 수 있습니다.
                </p>
              </div>

              {/* 라이벌 */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  주의할 라이벌
                </h3>
                <div className="space-y-2">
                  {profile.rivalTypes.map((rival, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2 bg-red-50 text-red-700 border-red-200">
                      {rival}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  이 유형들은 당신을 압박할 수 있으니 수비를 단단히 하세요.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 6 - 장비 추천 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center flex items-center justify-center gap-2">
              <Settings className="w-5 h-5" style={{ color: profile.color }} />
              장비 추천
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="inline-block p-4 bg-gray-50 rounded-lg">
                <p className="text-lg font-medium text-gray-700">{profile.gearTips[0]}</p>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(profile.gearTips[0]);
                    alert('장비 정보가 클립보드에 복사되었습니다!');
                  }}
                >
                  📋 내 세팅으로 저장
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 7 - 발전 로드맵 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">발전 로드맵</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* 즉시 개선 */}
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-3">즉시 개선</h4>
                <p className="text-sm text-gray-700">{profile.improvementTips[0]}</p>
                <Badge className="mt-2 bg-green-500">이번 주 적용</Badge>
              </div>

              {/* 단기 목표 */}
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-3">단기 목표</h4>
                <p className="text-sm text-gray-700">{profile.improvementTips[1]}</p>
                <Badge className="mt-2 bg-blue-500">1개월 목표</Badge>
              </div>

              {/* 장기 성장 */}
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-3">장기 성장</h4>
                <p className="text-sm text-gray-700">{profile.improvementTips[2]}</p>
                <Badge className="mt-2 bg-purple-500">장기 목표</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 8 - 명언 & 피드백 */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <blockquote className="text-2xl font-medium italic text-gray-700 mb-6">
                "{profile.quote}"
              </blockquote>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <p className="text-lg font-medium text-gray-800">{currentTip}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">다른 유틸리티도 체험해보세요</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/utility/ntrp-analyzer">
              <Button variant="outline" className="border-[#0BA360] text-[#0BA360] hover:bg-[#0BA360] hover:text-white">
                NTRP 실력 테스트
              </Button>
            </Link>
            <Link href="/utility/tennis-quiz">
              <Button variant="outline" className="border-[#2364AA] text-[#2364AA] hover:bg-[#2364AA] hover:text-white">
                테니스 규칙 퀴즈
              </Button>
            </Link>
            <Link href="/utility/injury-risk">
              <Button variant="outline" className="border-[#C7F000] text-[#C7F000] hover:bg-[#C7F000] hover:text-black">
                부상 위험도 체크
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
