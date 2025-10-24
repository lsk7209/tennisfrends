"use client";

import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { score?: string; q13?: string };
}): Promise<Metadata> {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const score = searchParams?.score || "";
  const q13 = searchParams?.q13 ? decodeURIComponent(searchParams.q13) : "";
  
  const level = (() => {
    const s = Number(score || 0);
    if (s <= 24) return "1.5";
    if (s <= 34) return "2.5";
    if (s <= 44) return "3.0";
    if (s <= 54) return "3.5";
    if (s <= 64) return "4.0";
    if (s <= 70) return "4.5";
    return "5.0+";
  })();

  const ogUrl = `${site}/api/og?level=${encodeURIComponent(level)}&character=${encodeURIComponent(
    q13 || "올라운더"
  )}${score ? `&score=${encodeURIComponent(score)}` : ""}`;

  const title = `NTRP ${level} · 내 테니스 레벨 진단`;
  const desc = `결과: NTRP ${level}${score ? ` (점수 ${score})` : ""}. 플레이 스타일: ${q13 || "올라운더"}.`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `NTRP ${level}` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogUrl],
    },
  };
}

import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Share2, RotateCcw, BarChart3, Download, Copy, Target, Dumbbell, Shield, AlertTriangle, Trophy } from "lucide-react";
import Link from "next/link";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { toPng } from "html-to-image";
import { PDFDocument, rgb } from "pdf-lib";
import dayjs from "dayjs";
import { levelBands, personas, drills, kpis, weeklyPlan, doubles, equipment, injuryRisks, commonMistakes } from "@/lib/ntrpResultConfig";
import { getNTRPLevel, mapScoreToLevelBand, mapLevelToBaseProfile, getPersonaFromQ13 } from "@/lib/ntrpMath";
import ResultCard from "@/components/ResultCard";

export default function NTRPResultPage() {
  const searchParams = useSearchParams();
  const [isSharing, setIsSharing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const score = parseInt(searchParams.get("score") || "45");
  const q13 = searchParams.get("q13") ? decodeURIComponent(searchParams.get("q13")!) : "올라운더";

  // 계산된 데이터
  const result = getNTRPLevel(score);
  const band = mapScoreToLevelBand(score);
  const persona = getPersonaFromQ13(q13);
  const radarData = mapLevelToBaseProfile(band.level);
  
  // 레이더 차트 데이터 변환
  const radarChartData = Object.entries(radarData).map(([key, value]) => ({
    subject: key,
    A: value,
    fullMark: 100
  }));

  // KPI 데이터
  const currentKpis = kpis[band.level as keyof typeof kpis] || [];
  const currentDrills = drills[band.level as keyof typeof drills] || [];
  const currentWeeklyPlan = weeklyPlan[band.level as keyof typeof weeklyPlan] || [];
  const currentDoubles = doubles[band.level as keyof typeof doubles];
  const currentEquipment = equipment[band.level as keyof typeof equipment];
  const currentInjuryRisks = injuryRisks[band.level as keyof typeof injuryRisks] || [];
  const currentMistakes = commonMistakes[band.level as keyof typeof commonMistakes] || [];

  function copyShareLink() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;
    navigator.clipboard.writeText(url);
    alert("결과 링크가 복사되었습니다!");
  }

  const shareResult = async () => {
    setIsSharing(true);
    try {
      const url = window.location.href;
      const shareText = `🎾 NTRP 테스트 결과 공유! 🎾\n\n나의 테니스 레벨: NTRP ${result.level}\n플레이 스타일: ${persona.slogan}\n점수: ${score}점\n\n나도 테니스 실력이 얼마나 될까? 테니스프렌즈에서 확인해보세요!\n\n${url}`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'NTRP 테스트 결과',
          text: shareText,
          url: url
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('결과 링크가 복사되었습니다! 친구들과 공유해보세요 🎾');
      }
    } catch (error) {
      console.error('공유 실패:', error);
      try {
        const fallbackText = `🎾 NTRP 테스트 결과 공유! 🎾\n\n나의 테니스 레벨: NTRP ${result.level}\n플레이 스타일: ${persona.slogan}\n점수: ${score}점\n\n나도 테니스 실력이 얼마나 될까? 테니스프렌즈에서 확인해보세요!\n\n${window.location.href}`;
        await navigator.clipboard.writeText(fallbackText);
        alert('결과 링크가 복사되었습니다! 친구들과 공유해보세요 🎾');
      } catch (clipboardError) {
        console.error('클립보드 복사 실패:', clipboardError);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const exportPNG = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      
      const link = document.createElement('a');
      link.download = `ntrp-result-${band.level}-${dayjs().format('YYYY-MM-DD')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('PNG 내보내기 실패:', error);
      alert('PNG 내보내기에 실패했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportPDF = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4 size
      
      const image = await pdfDoc.embedPng(dataUrl);
      const { width, height } = image.scale(0.8);
      
      page.drawImage(image, {
        x: (595 - width) / 2,
        y: (842 - height) / 2,
        width,
        height,
      });
      
      // Footer
      page.drawText(`테니스프렌즈 NTRP 테스트 결과 - ${dayjs().format('YYYY-MM-DD')}`, {
        x: 50,
        y: 50,
        size: 10,
        color: rgb(0.5, 0.5, 0.5),
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = `ntrp-result-${band.level}-${dayjs().format('YYYY-MM-DD')}.pdf`;
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF 내보내기 실패:', error);
      alert('PDF 내보내기에 실패했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  const copyTension = () => {
    if (currentEquipment) {
      navigator.clipboard.writeText(currentEquipment.tension);
      alert(`텐션 값 "${currentEquipment.tension}"이 복사되었습니다!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
            🎾 당신의 NTRP 레벨은 {result.level} 입니다
          </h1>
          <p className="text-lg text-[#64748B] mb-4">{band.title} • {result.desc}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge className="text-lg px-4 py-2" style={{ backgroundColor: band.color, color: 'white' }}>
              NTRP {result.level}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2" style={{ borderColor: persona.theme, color: persona.theme }}>
              {persona.slogan}
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={shareResult}
              disabled={isSharing}
              className="bg-[#0BA360] hover:bg-[#19C37D] text-white gap-2"
            >
              <Share2 className="w-4 h-4" />
              {isSharing ? "공유 중..." : "결과 공유하기"}
            </Button>
            
            <Button
              onClick={exportPNG}
              disabled={isExporting}
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              PNG 저장
            </Button>
            
            <Button
              onClick={exportPDF}
              disabled={isExporting}
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              PDF 저장
            </Button>
            
            <Link href="/ntrp-test/test">
              <Button variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                다시 테스트하기
              </Button>
            </Link>
          </div>
        </div>

        {/* Section 1: 핵심 요약 */}
        <section id="summary" className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                요약 3줄
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {band.summary.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: band.color }} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                목표 KPI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentKpis.map((kpi, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{kpi.name}</span>
                      <span className="text-gray-500">{kpi.target}</span>
                    </div>
                    <Progress value={Math.random() * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: 플레이 레이더 */}
        <section id="radar" className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">플레이 레이더</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarChartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="현재 레벨"
                  dataKey="A"
                  stroke={band.color}
                  fill={band.color}
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Section 3: 강점/약점 & 포커스 */}
        <section id="strengths-weaknesses" className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">강점</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {band.strengths.map((strength, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-green-100 text-green-800">
                    {strength}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">약점</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {band.weaknesses.map((weakness, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-red-100 text-red-800">
                    {weakness}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">이번 달 집중 포인트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {band.focus.map((focus, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-blue-100 text-blue-800">
                    {focus}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: 추천 드릴 */}
        <section id="drills" className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            추천 드릴 (Top 6)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {currentDrills.map((drill, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{drill.name}</h3>
                  <Badge variant="outline">{drill.duration}</Badge>
                </div>
                <p className="text-sm text-gray-600">{drill.goal}</p>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" className="gap-2">
              <Target className="w-4 h-4" />
              세션 자동 구성
            </Button>
          </div>
        </section>

        {/* Section 5: 4주 마이크로사이클 */}
        <section id="weekly-plan" className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">4주 마이크로사이클</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {currentWeeklyPlan.map((week, index) => (
              <Card key={index} className="p-4">
                <div className="text-center mb-3">
                  <Badge className="mb-2" style={{ backgroundColor: band.color, color: 'white' }}>
                    Week {week.week}
                  </Badge>
                  <h3 className="font-semibold text-sm">{week.focus}</h3>
                </div>
                <div className="space-y-1">
                  {week.micro.map((item, microIndex) => (
                    <div key={microIndex} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 6: 더블스 전술 */}
        {currentDoubles && (
          <section id="doubles" className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">더블스 전술</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">역할: {currentDoubles.role}</h3>
                <div className="space-y-2">
                  {currentDoubles.patterns.map((pattern, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {pattern}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">의사소통 팁</h4>
                <p className="text-sm text-blue-700">
                  파트너와의 시그널 교환, 포지션 조정, 상대 분석을 통한 전술적 협력이 중요합니다.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section 7: 장비/세팅 가이드 */}
        {currentEquipment && (
          <section id="equipment" className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">장비/세팅 가이드</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">프레임</h3>
                  <p className="text-sm text-gray-600">{currentEquipment.frame}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">스트링</h3>
                  <p className="text-sm text-gray-600">{currentEquipment.string}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">텐션</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">{currentEquipment.tension}</p>
                    <Button size="sm" variant="outline" onClick={copyTension} className="gap-1">
                      <Copy className="w-3 h-3" />
                      복사
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">추가 팁</h4>
                <p className="text-sm text-gray-600">{currentEquipment.note}</p>
              </div>
            </div>
          </section>
        )}

        {/* Section 8: 부상 리스크 & 예방 */}
        <section id="injury-risks" className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            부상 리스크 & 예방
          </h2>
          <div className="space-y-4">
            {currentInjuryRisks.map((risk, index) => (
              <Card key={index} className="p-4 border-l-4 border-red-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800">{risk.risk}</h3>
                    <p className="text-sm text-gray-600 mt-1">{risk.tip}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 9: 자주 발생하는 실수 & 해결 */}
        <section id="mistakes" className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">자주 발생하는 실수 & 해결</h2>
          <div className="space-y-4">
            {currentMistakes.map((mistake, index) => (
              <Card key={index} className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-red-600 mb-2">❌ {mistake.issue}</h3>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-600 mb-2">✅ {mistake.fix}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" className="gap-2">
              <Target className="w-4 h-4" />
              미니 루틴 추천
            </Button>
          </div>
        </section>

        {/* Section 10: 비교/공유 */}
        <section id="share" className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">내 결과 카드</h2>
          <div className="flex flex-col items-center space-y-4">
            <ResultCard
              ref={cardRef}
              level={result.level}
              title={band.title}
              slogan={persona.slogan}
              color={band.color}
              score={score}
              character={q13}
            />
            <div className="flex gap-3">
              <Button onClick={exportPNG} disabled={isExporting} className="gap-2">
                <Download className="w-4 h-4" />
                PNG 저장
              </Button>
              <Button onClick={exportPDF} disabled={isExporting} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                PDF 저장
              </Button>
              <Button onClick={copyShareLink} variant="outline" className="gap-2">
                <Copy className="w-4 h-4" />
                링크 복사
              </Button>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-gradient-to-r from-[#0BA360]/10 to-[#2364AA]/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-center mb-4">다음 단계</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href={`/level/${result.level}`}>
              <Button className="w-full bg-[#0BA360] hover:bg-[#19C37D] text-white gap-2">
                <Trophy className="w-4 h-4" />
                내 레벨 맞춤 훈련법 보기
              </Button>
            </Link>
            <Link href="/rankings">
              <Button variant="outline" className="w-full gap-2">
                <BarChart3 className="w-4 h-4" />
                랭킹 스냅샷
              </Button>
            </Link>
            <Link href="/utility/string-tension">
              <Button variant="outline" className="w-full gap-2">
                <Target className="w-4 h-4" />
                스트링 텐션 계산기
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}