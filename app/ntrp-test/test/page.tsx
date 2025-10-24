"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const questions = [
  {
    id: 1,
    question: "당신의 포핸드 스트로크는 어떤가요?",
    options: [
      "공을 넘기기만 한다",
      "방향 조절은 가능하나 깊이 조절은 어렵다",
      "중간 정도로 안정적이다",
      "강하게 위너를 만들 수 있다",
      "깊이·방향 모두 다양한 공을 구사한다"
    ]
  },
  {
    id: 2,
    question: "백핸드 스트로크는 어떠한가요?",
    options: [
      "백핸드가 매우 어렵다",
      "간단한 백핸드만 가능하다",
      "안정적인 백핸드가 가능하다",
      "강력한 백핸드 위너를 만들 수 있다",
      "양손/한손 모두 완벽하게 구사한다"
    ]
  },
  {
    id: 3,
    question: "서브의 정확도는 어떠한가요?",
    options: [
      "서브가 거의 들어가지 않는다",
      "1서브는 50% 정도 들어간다",
      "1서브는 70% 정도 들어간다",
      "1서브는 80% 이상 들어간다",
      "원하는 위치에 정확하게 넣을 수 있다"
    ]
  },
  {
    id: 4,
    question: "서브의 파워는 어떠한가요?",
    options: [
      "서브가 매우 약하다",
      "보통 속도의 서브가 가능하다",
      "적당한 파워의 서브가 가능하다",
      "강력한 서브를 구사할 수 있다",
      "프로 수준의 강력한 서브가 가능하다"
    ]
  },
  {
    id: 5,
    question: "발리 기술은 어떠한가요?",
    options: [
      "발리가 매우 어렵다",
      "간단한 발리만 가능하다",
      "기본적인 발리가 가능하다",
      "정확한 발리를 구사할 수 있다",
      "다양한 발리 기술을 완벽하게 구사한다"
    ]
  },
  {
    id: 6,
    question: "네트 플레이 능력은 어떠한가요?",
    options: [
      "네트에서 공을 받을 수 없다",
      "간단한 터치만 가능하다",
      "기본적인 네트 플레이가 가능하다",
      "정확한 네트 플레이를 구사한다",
      "전술적인 네트 플레이가 가능하다"
    ]
  },
  {
    id: 7,
    question: "스핀 샷 활용 능력은 어떠한가요?",
    options: [
      "스핀을 전혀 사용하지 않는다",
      "간단한 스핀만 사용한다",
      "적당한 스핀을 활용한다",
      "다양한 스핀을 구사한다",
      "고급 스핀 기술을 완벽하게 구사한다"
    ]
  },
  {
    id: 8,
    question: "경기 중 집중력은 어떠한가요?",
    options: [
      "집중력이 매우 짧다",
      "짧은 시간만 집중할 수 있다",
      "적당한 시간 집중할 수 있다",
      "오랫동안 집중할 수 있다",
      "경기 내내 완벽한 집중력을 유지한다"
    ]
  },
  {
    id: 9,
    question: "상대의 약점을 파악하는 능력은?",
    options: [
      "상대를 전혀 분석하지 않는다",
      "간단한 패턴만 파악한다",
      "기본적인 전술을 이해한다",
      "상대의 약점을 잘 활용한다",
      "전술적 분석이 매우 뛰어나다"
    ]
  },
  {
    id: 10,
    question: "스트로크의 일관성은 어떠한가요?",
    options: [
      "매우 불안정하다",
      "가끔 실수한다",
      "적당히 안정적이다",
      "대부분 안정적이다",
      "매우 일관성 있게 구사한다"
    ]
  },
  {
    id: 11,
    question: "체력과 지구력은 어떠한가요?",
    options: [
      "체력이 매우 부족하다",
      "짧은 시간만 견딜 수 있다",
      "적당한 체력을 가지고 있다",
      "오랫동안 경기할 수 있다",
      "매우 뛰어난 체력과 지구력을 가지고 있다"
    ]
  },
  {
    id: 12,
    question: "멘탈과 경기 운영 능력은?",
    options: [
      "압박에 쉽게 무너진다",
      "간단한 상황만 처리한다",
      "기본적인 멘탈을 유지한다",
      "어려운 상황도 잘 극복한다",
      "매우 강한 멘탈과 전술적 사고를 가지고 있다"
    ]
  },
  {
    id: 13,
    question: "당신의 플레이 스타일은?",
    options: [
      "공만 넘기는 성실형",
      "수비적 생존형",
      "빠른 공격형",
      "전술 분석형",
      "올라운더"
    ]
  },
  {
    id: 14,
    question: "경기 경험은 얼마나 되나요?",
    options: [
      "경기 경험이 거의 없다",
      "가끔 친구들과 경기한다",
      "정기적으로 경기한다",
      "자주 토너먼트에 참가한다",
      "정기적으로 대회에 참가한다"
    ]
  },
  {
    id: 15,
    question: "테니스 레슨 경험은?",
    options: [
      "레슨을 받아본 적이 없다",
      "가끔 레슨을 받는다",
      "정기적으로 레슨을 받는다",
      "자주 레슨을 받는다",
      "전문적인 코칭을 받고 있다"
    ]
  }
];

export default function NTRPTestPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // 마지막 질문
      setIsSubmitting(true);
      const totalScore = newAnswers.reduce((sum, answer) => sum + (answer + 1), 0);
      const character = questions[12].options[newAnswers[12] || 0]; // 13번째 질문의 답
      
      setTimeout(() => {
        router.push(`/ntrp-test/result?score=${totalScore}&q13=${encodeURIComponent(character)}`);
      }, 500);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">
                {currentQuestion + 1} / {questions.length}
              </Badge>
              <Progress value={progress} className="w-full" />
            </div>
            <CardTitle className="text-xl md:text-2xl">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4 hover:bg-[#0BA360]/10 hover:border-[#0BA360] transition-all duration-200"
                onClick={() => handleAnswer(index)}
                disabled={isSubmitting}
              >
                <span className="text-sm md:text-base leading-relaxed">
                  {option}
                </span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Progress indicator */}
        <div className="mt-4 text-center text-sm text-gray-500">
          {currentQuestion + 1}번째 질문 • 총 {questions.length}문항
        </div>
      </div>
    </div>
  );
}
