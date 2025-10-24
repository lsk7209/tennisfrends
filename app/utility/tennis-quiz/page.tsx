"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Target, Share2, Clock, Trophy } from "lucide-react";

// 오늘의 TIP 랜덤 표시
const dailyTips = [
  {
    title: "풋폴트 방지",
    content: "서브 시 베이스라인과 연장선을 밟지 않도록 주의하세요. 토스와 동시에 발을 앞으로 내딛는 연습이 도움이 됩니다.",
    icon: "👟"
  },
  {
    title: "타이브레이크 콜",
    content: "타이브레이크에서는 서버-리시버 순서가 중요합니다. '서버 점수-리시버 점수' 순으로 콜하세요.",
    icon: "📢"
  },
  {
    title: "네트 터치",
    content: "인플레이 중 공이 네트를 맞고 상대 코트로 넘어가면 인입니다. 서브가 아닌 경우 계속 진행됩니다.",
    icon: "🏓"
  },
  {
    title: "복식 포지션",
    content: "복식에서 리시빙 포지션은 게임 교대 시에만 변경 가능합니다. 포인트 중에는 변경할 수 없습니다.",
    icon: "👥"
  },
  {
    title: "방해(Hindrance)",
    content: "상대가 샷을 준비하는 동안 의도적으로 소리를 내거나 움직이면 방해로 포인트를 잃을 수 있습니다.",
    icon: "⚠️"
  }
];

export default function TennisQuizIntroPage() {
  const [dailyTip, setDailyTip] = useState(dailyTips[0]);

  useEffect(() => {
    // 랜덤하게 오늘의 TIP 선택
    const randomIndex = Math.floor(Math.random() * dailyTips.length);
    setDailyTip(dailyTips[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-[#0F172A] mb-6">
            테니스 규칙, 얼마나 알까요?
          </h1>
          <p className="text-xl text-[#64748B] mb-8 max-w-2xl mx-auto">
            12문항 랜덤 퀴즈로 실전 규칙 감각을 점검하세요.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-[#0BA360] mx-auto mb-2" />
              <CardTitle className="text-lg">즉시 해설</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#64748B]">
                각 문항마다 정답과 상세한 해설을 즉시 확인할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="w-8 h-8 text-[#2364AA] mx-auto mb-2" />
              <CardTitle className="text-lg">약점 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#64748B]">
                카테고리별 오답을 분석하여 개인화된 학습 가이드를 제공합니다.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Share2 className="w-8 h-8 text-[#C7F000] mx-auto mb-2" />
              <CardTitle className="text-lg">결과 카드 공유</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#64748B]">
                점수와 등급이 포함된 결과 카드를 이미지로 저장하고 공유하세요.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/utility/tennis-quiz/quiz">
            <Button size="lg" className="bg-[#0BA360] hover:bg-[#19C37D] text-lg px-8 py-4">
              지금 시작하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/injury-risk/intro">
              <Button variant="outline" size="lg" className="border-[#2364AA] text-[#2364AA] hover:bg-[#2364AA] hover:text-white">
                부상 위험도 체크
              </Button>
            </Link>
            <Link href="/string-tension">
              <Button variant="outline" size="lg" className="border-[#C7F000] text-[#C7F000] hover:bg-[#C7F000] hover:text-black">
                스트링 텐션 계산기
              </Button>
            </Link>
            <Link href="/utility/ntrp-analyzer">
              <Button variant="outline" size="lg" className="border-[#0BA360] text-[#0BA360] hover:bg-[#0BA360] hover:text-white">
                NTRP 테스트
              </Button>
            </Link>
          </div>
        </div>

        {/* 오늘의 TIP */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-[#0BA360]" />
              오늘의 TIP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl mb-4">{dailyTip.icon}</div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                {dailyTip.title}
              </h3>
              <p className="text-[#64748B]">
                {dailyTip.content}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Info */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <Clock className="w-6 h-6 text-[#0BA360] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#0F172A]">소요 시간</p>
            <p className="text-xs text-[#64748B]">약 8-12분</p>
          </div>
          <div className="text-center">
            <BookOpen className="w-6 h-6 text-[#2364AA] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#0F172A]">문항 수</p>
            <p className="text-xs text-[#64748B]">12문항 랜덤</p>
          </div>
          <div className="text-center">
            <Target className="w-6 h-6 text-[#C7F000] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#0F172A]">난이도</p>
            <p className="text-xs text-[#64748B]">초급~고급</p>
          </div>
          <div className="text-center">
            <Share2 className="w-6 h-6 text-[#8B5CF6] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#0F172A]">결과 공유</p>
            <p className="text-xs text-[#64748B]">이미지/PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
}
