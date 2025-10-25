"use client";

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
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { levelBands, personas, drills, kpis, weeklyPlan, doubles, equipment, injuryRisks, commonMistakes } from "@/lib/ntrpResultConfig";
import { getNTRPLevel, mapScoreToLevelBand, mapLevelToBaseProfile, getPersonaFromQ13 } from "@/lib/ntrpMath";
import ResultCard from "@/components/ResultCard";

export default function NTRPResultClient() {
  const searchParams = useSearchParams();
  const [isSharing, setIsSharing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const score = parseInt(searchParams.get("score") || "45");
  const q13 = searchParams.get("q13") ? decodeURIComponent(searchParams.get("q13")!) : "올라운더";

  const result = useMemo(() => {
    const levelData = getNTRPLevel(score);
    const band = mapScoreToLevelBand(score);
    const baseProfile = mapLevelToBaseProfile(levelData.level);
    const persona = getPersonaFromQ13(q13);
    
    return {
      level: levelData.level,
      band,
      baseProfile,
      persona,
      score
    };
  }, [score, q13]);

  const { level, band, baseProfile, persona } = result;

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
      link.download = `ntrp-${result.level}-result.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('PNG 내보내기 실패:', error);
      alert('이미지 내보내기에 실패했습니다.');
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
      const page = pdfDoc.addPage([600, 400]);
      const image = await pdfDoc.embedPng(dataUrl);
      
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: 600,
        height: 400,
      });
      
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ntrp-${result.level}-result.pdf`;
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
    const tension = baseProfile.recommendedTension;
    navigator.clipboard.writeText(tension);
    alert(`스트링 텐션 "${tension}"이 복사되었습니다!`);
  };

  const radarData = [
    { skill: "서브", value: baseProfile.serve },
    { skill: "포핸드", value: baseProfile.forehand },
    { skill: "백핸드", value: baseProfile.backhand },
    { skill: "발리", value: baseProfile.volley },
    { skill: "오버헤드", value: baseProfile.overhead },
    { skill: "이동", value: baseProfile.movement },
    { skill: "멘탈", value: baseProfile.mental },
    { skill: "전술", value: baseProfile.tactics }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* 결과 카드 (공유용) */}
        <div className="hidden">
          <ResultCard
            ref={cardRef}
            level={result.level}
            title={persona.name}
            slogan={persona.slogan}
            color={band.color}
            score={score}
            character={q13}
          />
        </div>

        {/* 메인 결과 섹션 */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 rounded-full ${band.color} flex items-center justify-center text-white text-2xl font-bold`}>
                  {result.level}
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                NTRP {result.level} 레벨
              </CardTitle>
              <p className="text-xl text-gray-600 mb-4">{persona.slogan}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <span>점수: {score}점</span>
                <span>•</span>
                <span>플레이 스타일: {q13}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* 액션 버튼들 */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button 
                  onClick={shareResult} 
                  disabled={isSharing}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {isSharing ? '공유 중...' : '결과 공유'}
                </Button>
                <Button 
                  onClick={exportPNG} 
                  disabled={isExporting}
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PNG 저장
                </Button>
                <Button 
                  onClick={exportPDF} 
                  disabled={isExporting}
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF 저장
                </Button>
                <Link href="/ntrp-test">
                  <Button variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    다시 테스트
                  </Button>
                </Link>
              </div>

              {/* 상세 분석 탭 */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">개요</TabsTrigger>
                  <TabsTrigger value="skills">기술 분석</TabsTrigger>
                  <TabsTrigger value="training">훈련 계획</TabsTrigger>
                  <TabsTrigger value="equipment">장비 추천</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* 레벨 밴드 정보 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-600" />
                        레벨 밴드 정보
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">현재 밴드</h4>
                          <p className="text-gray-600">{band.summary.join(', ')}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">특징</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {band.strengths.map((strength, index) => (
                              <li key={index}>• {strength}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 플레이 스타일 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-blue-600" />
                        플레이 스타일: {persona.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{persona.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">강점</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {persona.strengths.map((strength, index) => (
                              <li key={index}>• {strength}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">개선점</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {persona.improvements.map((improvement, index) => (
                              <li key={index}>• {improvement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  {/* 기술 레이더 차트 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        기술 분석
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="skill" />
                            <PolarRadiusAxis angle={90} domain={[0, 10]} />
                            <Radar
                              name="기술 수준"
                              dataKey="value"
                              stroke="#22c55e"
                              fill="#22c55e"
                              fillOpacity={0.3}
                            />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 기술별 상세 분석 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(baseProfile).filter(([key]) => 
                      ['serve', 'forehand', 'backhand', 'volley', 'overhead', 'movement', 'mental', 'tactics'].includes(key)
                    ).map(([skill, value]) => {
                      const numValue = Number(value) || 0;
                      return (
                        <Card key={skill}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900 capitalize">
                                {skill === 'serve' ? '서브' :
                                 skill === 'forehand' ? '포핸드' :
                                 skill === 'backhand' ? '백핸드' :
                                 skill === 'volley' ? '발리' :
                                 skill === 'overhead' ? '오버헤드' :
                                 skill === 'movement' ? '이동' :
                                 skill === 'mental' ? '멘탈' :
                                 skill === 'tactics' ? '전술' : skill}
                              </h4>
                              <Badge variant="secondary">{numValue}/10</Badge>
                            </div>
                            <Progress value={numValue * 10} className="h-2" />
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="training" className="space-y-6">
                  {/* 주간 훈련 계획 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Dumbbell className="w-5 h-5 text-orange-600" />
                        주간 훈련 계획
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {(weeklyPlan[result.level as keyof typeof weeklyPlan] || weeklyPlan["3.0"]).map((week, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Week {week.week}</h4>
                            <p className="text-sm text-gray-600">{week.focus}</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {week.micro.map((drill, drillIndex) => (
                                <li key={drillIndex}>• {drill}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 드릴 추천 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>추천 드릴</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {(drills[result.level as keyof typeof drills] || drills["3.0"]).map((drill, index) => (
                          <AccordionItem key={index} value={`drill-${index}`}>
                            <AccordionTrigger className="text-left">
                              <div>
                                <div className="font-semibold">{drill.name}</div>
                                <div className="text-sm text-gray-500">{drill.goal}</div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3">
                                <p className="text-gray-600">{drill.goal}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span>시간: {drill.duration}</span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="equipment" className="space-y-6">
                  {/* 장비 추천 */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        추천 장비
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">라켓</h4>
                          <div className="space-y-2">
                            {equipment.racket.map((item, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                <div className="font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                                <div className="text-xs text-gray-500 mt-1">{item.specs}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">스트링</h4>
                          <div className="space-y-2">
                            {equipment.string.map((item, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                <div className="font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                                <div className="text-xs text-gray-500 mt-1">{item.specs}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 스트링 텐션 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>스트링 텐션</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">추천 텐션</div>
                          <div className="text-2xl font-bold text-green-600">{baseProfile.recommendedTension}</div>
                        </div>
                        <Button onClick={copyTension} variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-2" />
                          복사
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* 부상 예방 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    부상 예방 가이드
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">주의사항</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {injuryRisks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">예방 방법</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 충분한 워밍업과 쿨다운</li>
                        <li>• 정기적인 스트레칭</li>
                        <li>• 적절한 장비 사용</li>
                        <li>• 과도한 훈련 피하기</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 다른 유틸리티 추천 */}
              <Card>
                <CardHeader>
                  <CardTitle>더 알아보기</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/utility/injury-risk">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <h4 className="font-semibold text-gray-900">부상 위험도 체크</h4>
                          <p className="text-sm text-gray-600">개인화된 부상 예방 가이드</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href="/utility/tennis-type">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <h4 className="font-semibold text-gray-900">테니스 성향 분석</h4>
                          <p className="text-sm text-gray-600">플레이 스타일 진단</p>
                        </CardContent>
                      </Card>
                    </Link>
                    <Link href="/utility/racket-matchmaker">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <h4 className="font-semibold text-gray-900">라켓 매칭</h4>
                          <p className="text-sm text-gray-600">최적의 라켓 추천</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
