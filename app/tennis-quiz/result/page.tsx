"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, Download, Copy, Target, Trophy, BookOpen, AlertTriangle } from "lucide-react";
import { toPng } from "html-to-image";
import { PDFDocument, rgb } from "pdf-lib";
import dayjs from "dayjs";

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
  const [isExporting, setIsExporting] = useState(false);

  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '12');
  const timeSpent = parseInt(searchParams.get('time') || '0');
  const wrongCatsStr = searchParams.get('wrongCats') || '{}';
  
  const wrongCategories = JSON.parse(wrongCatsStr);
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

  // 공유 이미지 생성
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
      link.download = `tennis-quiz-result-${dayjs().format('YYYY-MM-DD')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('PNG export failed:', error);
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  // PDF 생성
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
      const page = pdfDoc.addPage();
      
      const pngImage = await pdfDoc.embedPng(dataUrl);
      const { width, height } = pngImage.scaleToFit(page.getWidth() - 50, page.getHeight() - 50);
      
      page.drawImage(pngImage, {
        x: page.getWidth() / 2 - width / 2,
        y: page.getHeight() / 2 - height / 2,
        width,
        height,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `tennis-quiz-result-${dayjs().format('YYYY-MM-DD')}.pdf`;
      link.click();
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF 저장에 실패했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  // 링크 복사
  const copyShareLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;
    navigator.clipboard.writeText(url);
    alert("결과 링크가 클립보드에 복사되었습니다!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 p-6">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            ✨ 퀴즈 결과
          </h1>
          <p className="text-lg text-[#64748B]">
            테니스 규칙 이해도를 분석했습니다.
          </p>
        </div>

        {/* Main Result Card for Export */}
        <div ref={cardRef} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <Badge 
              className="text-sm px-4 py-2 rounded-full mb-3"
              style={{ backgroundColor: grade.color, color: 'white' }}
            >
              {grade.name}
            </Badge>
            <h2 className="text-5xl font-extrabold mb-2" style={{ color: grade.color }}>
              {score} / {total}
            </h2>
            <p className="text-2xl font-semibold text-[#0F172A]">{grade.description}</p>
            <p className="text-md text-[#64748B] mt-2">소요 시간: {timeMinutes}분</p>
          </div>

          {/* 약점 영역 */}
          {topWeakAreas.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3 text-center">주요 약점 영역</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {topWeakAreas.map((category) => (
                  <Badge 
                    key={category}
                    className={`${CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center pt-6 mb-8">
          <Link href="/tennis-quiz/quiz">
            <Button
              variant="outline"
              className="border-[#2364AA] text-[#2364AA] hover:bg-[#2364AA] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              다시 풀기
            </Button>
          </Link>
          <Button
            className="bg-[#0BA360] hover:bg-[#19C37D]"
            onClick={copyShareLink}
          >
            <Copy className="w-4 h-4 mr-2" />
            결과 링크 복사
          </Button>
          <Button
            className="bg-[#F59E0B] hover:bg-[#D97706]"
            onClick={exportPNG}
            disabled={isExporting}
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'PNG 내보내는 중...' : 'PNG로 저장'}
          </Button>
          <Button
            className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
            onClick={exportPDF}
            disabled={isExporting}
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'PDF 내보내는 중...' : 'PDF로 저장'}
          </Button>
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analysis">약점 분석</TabsTrigger>
            <TabsTrigger value="improvement">개선 가이드</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analysis" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#0F172A]">
                  <Target className="inline-block w-5 h-5 mr-2 text-[#0BA360]" />
                  카테고리별 성과
                </CardTitle>
                <CardDescription className="text-[#64748B]">
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
            <Link href="/injury-risk/intro">
              <Button variant="outline" className="border-[#2364AA] text-[#2364AA] hover:bg-[#2364AA] hover:text-white">
                부상 위험도 체크
              </Button>
            </Link>
            <Link href="/string-tension">
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
