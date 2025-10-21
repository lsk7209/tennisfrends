"use client";

import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { levelBands, personas, drills, kpis, weeklyPlan, doubles, equipment, injuryRisks, commonMistakes } from "@/lib/ntrpResultConfig";
import { getNTRPLevel, mapScoreToLevelBand, mapLevelToBaseProfile, convertToRadarData } from "@/lib/ntrpMath";
import { toPng } from "html-to-image";
import { PDFDocument, rgb } from "pdf-lib";
import dayjs from "dayjs";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ResultCard from "@/components/ResultCard";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Copy, Target, Trophy, Users, Settings, AlertTriangle, Lightbulb } from "lucide-react";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Parse query parameters
  const score = parseInt(searchParams.get('score') || '45');
  const q13 = searchParams.get('q13') || '올라운더';
  
  // Compute results
  const levelObj = getNTRPLevel(score);
  const band = mapScoreToLevelBand(score);
  const persona = personas[q13 as keyof typeof personas] || personas["올라운더"];
  
  // Radar chart data
  const radarData = useMemo(() => {
    const profile = mapLevelToBaseProfile(band.level);
    return convertToRadarData(profile);
  }, [band.level]);

  // Export functions
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
      link.download = `ntrp-${band.level}-${dayjs().format('YYYY-MM-DD')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('PNG export failed:', error);
      alert('이미지 저장에 실패했습니다.');
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
      
      const img = await pdfDoc.embedPng(dataUrl);
      const imgDims = img.scale(0.8);
      
      page.drawImage(img, {
        x: (page.getWidth() - imgDims.width) / 2,
        y: page.getHeight() - imgDims.height - 50,
        width: imgDims.width,
        height: imgDims.height,
      });
      
      page.drawText(`테니스프렌즈 - NTRP ${band.level} 결과`, {
        x: 50,
        y: 30,
        size: 12,
        color: rgb(0, 0, 0),
      });
      
      page.drawText(dayjs().format('YYYY-MM-DD'), {
        x: page.getWidth() - 100,
        y: 30,
        size: 12,
        color: rgb(0, 0, 0),
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = `ntrp-${band.level}-${dayjs().format('YYYY-MM-DD')}.pdf`;
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF 저장에 실패했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  const copyShareLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;
    navigator.clipboard.writeText(url);
    alert("결과 링크가 복사되었습니다!");
  };

  const copyTension = () => {
    const tension = equipment[band.level as keyof typeof equipment]?.tension;
    if (tension) {
      navigator.clipboard.writeText(tension);
      alert(`스트링 텐션 "${tension}"이 복사되었습니다!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10">
      <div className="max-w-6xl mx-auto p-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            당신의 NTRP 레벨은 {band.level} 입니다
          </h1>
          <p className="text-xl text-[#64748B] mb-6">
            {band.title} · {levelObj.description}
          </p>
          <div className="flex justify-center gap-3 mb-8">
            <Badge 
              className="text-lg px-4 py-2 text-white"
              style={{ backgroundColor: band.color }}
            >
              NTRP {band.level}
            </Badge>
            <Badge 
              variant="secondary" 
              className="text-lg px-4 py-2"
              style={{ backgroundColor: persona.theme + "20", color: persona.theme }}
            >
              {persona.slogan}
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <Link href="/test">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                다시 테스트하기
              </Button>
            </Link>
            <Button 
              onClick={copyShareLink}
              className="flex items-center gap-2"
              style={{ backgroundColor: persona.theme }}
            >
              <Share2 className="w-4 h-4" />
              공유하기
            </Button>
            <Button 
              onClick={exportPNG}
              disabled={isExporting}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              PNG 저장
            </Button>
            <Button 
              onClick={exportPDF}
              disabled={isExporting}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              PDF 저장
            </Button>
          </div>
        </div>

        {/* Section 1: 핵심 요약 */}
        <section id="summary" className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: band.color }}>
                  <Target className="w-5 h-5" />
                  요약 3줄
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {band.summary.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#0BA360] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: band.color }}>
                  <Trophy className="w-5 h-5" />
                  목표 KPI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kpis[band.level as keyof typeof kpis]?.map((kpi, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{kpi.name}</span>
                        <span>{kpi.target}</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 2: 플레이 레이더 */}
        <section id="radar" className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center" style={{ color: band.color }}>
                플레이 스타일 레이더
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="key" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="현재 수준"
                      dataKey="value"
                      stroke={band.color}
                      fill={band.color}
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: 강점/약점 & 포커스 */}
        <section id="strengths-weaknesses" className="mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-600">💪 강점</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {band.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-orange-600">⚠️ 약점</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {band.weaknesses.map((weakness, index) => (
                    <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-600">🎯 집중 포인트</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {band.focus.map((focus, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {focus}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: 추천 드릴 */}
        <section id="drills" className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: band.color }}>
                <Lightbulb className="w-5 h-5" />
                추천 드릴 (Top 6)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drills[band.level as keyof typeof drills]?.map((drill, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">{drill.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">목표: {drill.goal}</p>
                    <p className="text-sm text-gray-500">시간: {drill.duration}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="flex items-center gap-2 mx-auto">
                  <Settings className="w-4 h-4" />
                  세션 자동 구성
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 5: 4주 마이크로사이클 */}
        <section id="weekly-plan" className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: band.color }}>
                <Target className="w-5 h-5" />
                4주 마이크로사이클
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {weeklyPlan[band.level as keyof typeof weeklyPlan]?.map((week, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Week {week.week}</h4>
                    <p className="text-sm text-gray-600 mb-3">{week.focus}</p>
                    <ul className="space-y-1">
                      {week.micro.map((item, i) => (
                        <li key={i} className="text-xs text-gray-500">• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 6: 더블스 전술 */}
        {doubles[band.level as keyof typeof doubles] && (
          <section id="doubles" className="mb-12">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: band.color }}>
                  <Users className="w-5 h-5" />
                  더블스 전술
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">역할: {doubles[band.level as keyof typeof doubles]?.role}</h4>
                  <ul className="space-y-2">
                    {doubles[band.level as keyof typeof doubles]?.patterns.map((pattern, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#0BA360] mt-1">•</span>
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>의사소통 팁:</strong> 파트너와 시그널을 미리 정하고, 
                    포지션 변경 시 명확한 소통을 하세요.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Section 7: 장비/세팅 가이드 */}
        <section id="equipment" className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: band.color }}>
                <Settings className="w-5 h-5" />
                장비/세팅 가이드
              </CardTitle>
            </CardHeader>
            <CardContent>
              {equipment[band.level as keyof typeof equipment] && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">추천 장비</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-600">라켓:</span>
                        <p className="font-medium">{equipment[band.level as keyof typeof equipment]?.frame}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">스트링:</span>
                        <p className="font-medium">{equipment[band.level as keyof typeof equipment]?.string}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">텐션:</span>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{equipment[band.level as keyof typeof equipment]?.tension}</p>
                          <Button size="sm" variant="outline" onClick={copyTension}>
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">추가 팁</h4>
                    <p className="text-sm text-gray-600">
                      {equipment[band.level as keyof typeof equipment]?.note}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Section 8: 부상 리스크 & 예방 */}
        <section id="injury-prevention" className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                부상 리스크 & 예방
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {injuryRisks[band.level as keyof typeof injuryRisks]?.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-red-600 mb-2">{risk.risk}</h4>
                    <p className="text-sm text-gray-600">{risk.tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 9: 자주 발생하는 실수 & 해결 */}
        <section id="common-mistakes" className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: band.color }}>
                <Lightbulb className="w-5 h-5" />
                자주 발생하는 실수 & 해결
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {commonMistakes[band.level as keyof typeof commonMistakes]?.map((mistake, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600 mb-2">{mistake.issue}</h4>
                    <p className="text-sm text-gray-600">{mistake.fix}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 10: 비교/공유 */}
        <section id="share" className="mb-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center" style={{ color: band.color }}>
                내 결과 카드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <ResultCard
                  ref={cardRef}
                  level={band.level}
                  title={band.title}
                  slogan={persona.slogan}
                  color={band.color}
                  score={score}
                  persona={q13}
                />
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  onClick={exportPNG}
                  disabled={isExporting}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PNG 저장
                </Button>
                <Button 
                  onClick={exportPDF}
                  disabled={isExporting}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PDF 저장
                </Button>
                <Button 
                  onClick={copyShareLink}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  링크 복사
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer CTA */}
        <section className="text-center">
          <div className="grid md:grid-cols-3 gap-4">
            <Link href={`/level/${band.level}`}>
              <Button className="w-full" style={{ backgroundColor: band.color }}>
                내 레벨 맞춤 훈련법 보기
              </Button>
            </Link>
            <Link href="/rankings">
              <Button variant="outline" className="w-full">
                랭킹 스냅샷
              </Button>
            </Link>
            <Link href="/string-tension">
              <Button variant="outline" className="w-full">
                스트링 텐션 계산기
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}