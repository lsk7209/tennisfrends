"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Target, Zap } from "lucide-react";
import Link from "next/link";

// NTRP 테스트 질문들
const NTRP_QUESTIONS = [
  {
    id: 1,
    question: "서브를 할 때의 성공률은?",
    options: [
      { text: "10% 미만", score: 1.5 },
      { text: "10-30%", score: 2.0 },
      { text: "30-50%", score: 2.5 },
      { text: "50-70%", score: 3.0 },
      { text: "70% 이상", score: 3.5 }
    ]
  },
  {
    id: 2,
    question: "포핸드 스트로크의 정확도는?",
    options: [
      { text: "거의 맞지 않음", score: 1.5 },
      { text: "가끔 맞음", score: 2.0 },
      { text: "50% 정도", score: 2.5 },
      { text: "대부분 맞음", score: 3.0 },
      { text: "거의 항상 맞음", score: 3.5 }
    ]
  },
  {
    id: 3,
    question: "백핸드 스트로크의 정확도는?",
    options: [
      { text: "거의 맞지 않음", score: 1.5 },
      { text: "가끔 맞음", score: 2.0 },
      { text: "50% 정도", score: 2.5 },
      { text: "대부분 맞음", score: 3.0 },
      { text: "거의 항상 맞음", score: 3.5 }
    ]
  },
  {
    id: 4,
    question: "발리의 성공률은?",
    options: [
      { text: "거의 못함", score: 1.5 },
      { text: "가끔 성공", score: 2.0 },
      { text: "50% 정도", score: 2.5 },
      { text: "대부분 성공", score: 3.0 },
      { text: "거의 항상 성공", score: 3.5 }
    ]
  },
  {
    id: 5,
    question: "스매시의 성공률은?",
    options: [
      { text: "거의 못함", score: 1.5 },
      { text: "가끔 성공", score: 2.0 },
      { text: "50% 정도", score: 2.5 },
      { text: "대부분 성공", score: 3.0 },
      { text: "거의 항상 성공", score: 3.5 }
    ]
  },
  {
    id: 6,
    question: "테니스를 시작한 지 얼마나 되었나요?",
    options: [
      { text: "6개월 미만", score: 1.5 },
      { text: "6개월-1년", score: 2.0 },
      { text: "1-2년", score: 2.5 },
      { text: "2-3년", score: 3.0 },
      { text: "3년 이상", score: 3.5 }
    ]
  },
  {
    id: 7,
    question: "주당 테니스 연습 시간은?",
    options: [
      { text: "1시간 미만", score: 1.5 },
      { text: "1-2시간", score: 2.0 },
      { text: "2-3시간", score: 2.5 },
      { text: "3-5시간", score: 3.0 },
      { text: "5시간 이상", score: 3.5 }
    ]
  },
  {
    id: 8,
    question: "경기에서의 승률은?",
    options: [
      { text: "거의 지지 않음", score: 1.5 },
      { text: "가끔 이김", score: 2.0 },
      { text: "50% 정도", score: 2.5 },
      { text: "대부분 이김", score: 3.0 },
      { text: "거의 항상 이김", score: 3.5 }
    ]
  },
  {
    id: 9,
    question: "다양한 샷의 구사 능력은?",
    options: [
      { text: "기본 샷만 가능", score: 1.5 },
      { text: "몇 가지 샷 가능", score: 2.0 },
      { text: "다양한 샷 시도", score: 2.5 },
      { text: "대부분의 샷 구사", score: 3.0 },
      { text: "모든 샷 자유자재", score: 3.5 }
    ]
  },
  {
    id: 10,
    question: "체력과 지구력은?",
    options: [
      { text: "매우 부족", score: 1.5 },
      { text: "부족한 편", score: 2.0 },
      { text: "보통", score: 2.5 },
      { text: "양호", score: 3.0 },
      { text: "매우 좋음", score: 3.5 }
    ]
  },
  {
    id: 11,
    question: "전략적 사고 능력은?",
    options: [
      { text: "전략 없이 치기만 함", score: 1.5 },
      { text: "가끔 전략적 사고", score: 2.0 },
      { text: "기본적인 전략 이해", score: 2.5 },
      { text: "상당한 전략적 사고", score: 3.0 },
      { text: "매우 전략적", score: 3.5 }
    ]
  },
  {
    id: 12,
    question: "심리적 안정성은?",
    options: [
      { text: "매우 불안정", score: 1.5 },
      { text: "불안정한 편", score: 2.0 },
      { text: "보통", score: 2.5 },
      { text: "안정적", score: 3.0 },
      { text: "매우 안정적", score: 3.5 }
    ]
  },
  {
    id: 13,
    question: "다른 선수와의 실력 차이는?",
    options: [
      { text: "대부분에게 밀림", score: 1.5 },
      { text: "가끔 이김", score: 2.0 },
      { text: "비슷한 수준", score: 2.5 },
      { text: "대부분 이김", score: 3.0 },
      { text: "거의 항상 이김", score: 3.5 }
    ]
  },
  {
    id: 14,
    question: "기술의 일관성은?",
    options: [
      { text: "매우 불안정", score: 1.5 },
      { text: "불안정한 편", score: 2.0 },
      { text: "보통", score: 2.5 },
      { text: "안정적", score: 3.0 },
      { text: "매우 안정적", score: 3.5 }
    ]
  },
  {
    id: 15,
    question: "전체적인 자신감은?",
    options: [
      { text: "매우 부족", score: 1.5 },
      { text: "부족한 편", score: 2.0 },
      { text: "보통", score: 2.5 },
      { text: "자신 있음", score: 3.0 },
      { text: "매우 자신 있음", score: 3.5 }
    ]
  }
];

export default function NTRPTestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
    
    if (currentQuestion < NTRP_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
      }, 500);
    }
  };

  const calculateNTRP = () => {
    const scores = Object.values(answers);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    
    if (averageScore < 2.0) return { level: 1.5, description: "초보자" };
    if (averageScore < 2.5) return { level: 2.0, description: "초급자" };
    if (averageScore < 3.0) return { level: 2.5, description: "초중급자" };
    if (averageScore < 3.5) return { level: 3.0, description: "중급자" };
    if (averageScore < 4.0) return { level: 3.5, description: "중상급자" };
    if (averageScore < 4.5) return { level: 4.0, description: "상급자" };
    if (averageScore < 5.0) return { level: 4.5, description: "고급자" };
    return { level: 5.0, description: "전문가" };
  };

  const handleSubmit = () => {
    const ntrpResult = calculateNTRP();
    const params = new URLSearchParams({
      level: ntrpResult.level.toString(),
      description: ntrpResult.description,
      answers: JSON.stringify(answers)
    });
    router.push(`/utility/ntrp-analyzer/result?${params.toString()}`);
  };

  if (isCompleted) {
    const ntrpResult = calculateNTRP();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center shadow-2xl">
            <CardHeader className="pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-[#0F172A] mb-4">
                테스트 완료! 🎾
              </CardTitle>
              <p className="text-lg text-[#64748B] mb-6">
                당신의 NTRP 레벨을 분석했습니다
              </p>
              <div className="inline-block px-8 py-4 bg-gradient-to-r from-[#0BA360] to-[#19C37D] text-white rounded-full text-2xl font-bold shadow-lg">
                NTRP {ntrpResult.level} - {ntrpResult.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-[#64748B]">
                  <Target className="w-5 h-5" />
                  <span>15문항 완료</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#64748B]">
                  <Zap className="w-5 h-5" />
                  <span>정확한 분석 완료</span>
                </div>
              </div>
              <Button 
                onClick={handleSubmit}
                size="lg"
                className="bg-[#0BA360] hover:bg-[#19C37D] text-white px-8 py-4 text-lg rounded-full shadow-lg"
              >
                상세 결과 보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = NTRP_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / NTRP_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/utility/ntrp-analyzer">
            <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">NTRP 실력 테스트</h1>
            <p className="text-[#64748B]">15문항으로 정확한 실력 레벨을 측정합니다</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#64748B]">진행률</span>
            <span className="text-sm text-[#64748B]">{currentQuestion + 1} / {NTRP_QUESTIONS.length}</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(currentQ.id, option.score)}
                  variant="outline"
                  className="w-full h-auto p-4 text-left justify-start hover:bg-[#0BA360] hover:text-white hover:border-[#0BA360] transition-colors"
                >
                  <span className="mr-3 w-6 h-6 bg-[#F7F5F3] text-[#37322F] rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  {option.text}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
