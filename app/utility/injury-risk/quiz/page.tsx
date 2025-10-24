"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Question {
  id: number;
  cat: string;
  body: string;
  scale: string;
  map: number[];
  affects: string[];
}

interface Answer {
  id: number;
  score: number;
  cat: string;
  selected: number;
}

const QUESTIONS: Question[] = [
  // 플레이 강도/빈도
  { 
    id: 1, 
    cat: "강도", 
    body: "주당 테니스(코트) 총 시간은?", 
    scale: "1: 1h 이하 / 2: 1~2h / 3: 3~4h / 4: 5~6h / 5: 7h 이상", 
    map: [1, 2, 3, 4, 5], 
    affects: ["어깨", "무릎", "허리"] 
  },
  { 
    id: 2, 
    cat: "연속일", 
    body: "연속으로 며칠 플레이하나요?", 
    scale: "1: 이틀에 한 번 이하 / 2: 이틀 연속 / 3: 3일 / 4: 4일 / 5: 5일 이상", 
    map: [1, 2, 3, 4, 5], 
    affects: ["팔", "어깨", "무릎"] 
  },
  { 
    id: 3, 
    cat: "스윙강도", 
    body: "최대 스윙(풀스윙) 비중은?", 
    scale: "1: 드묾 / 2: 가끔 / 3: 보통 / 4: 자주 / 5: 대부분", 
    map: [1, 2, 3, 4, 5], 
    affects: ["팔", "어깨", "허리"] 
  },

  // 준비/회복
  { 
    id: 4, 
    cat: "워밍업", 
    body: "경기 전 동적 워밍업(8~10분)을 하시나요?", 
    scale: "1: 항상 / 2: 자주 / 3: 절반정도 / 4: 드묾 / 5: 전혀 안 함", 
    map: [-2, -1, 0, 2, 3], 
    affects: ["전체"] 
  },
  { 
    id: 5, 
    cat: "쿨다운", 
    body: "경기 후 정적 스트레칭(5~8분)을 하시나요?", 
    scale: "1: 항상 / 2: 자주 / 3: 가끔 / 4: 드묾 / 5: 전혀 안 함", 
    map: [-2, -1, 0, 2, 3], 
    affects: ["전체"] 
  },
  { 
    id: 6, 
    cat: "수면", 
    body: "평균 수면 시간은?", 
    scale: "1: 8h 이상 / 2: 7~8h / 3: 6~7h / 4: 5~6h / 5: 5h 미만", 
    map: [-2, -1, 0, 2, 3], 
    affects: ["회복"] 
  },

  // 장비/세팅
  { 
    id: 7, 
    cat: "스트링", 
    body: "주 스트링 타입/텐션은 팔에 부담이 적은 편인가요?", 
    scale: "1: 멀티/낮은텐션 / 2: 하이브리드 / 3: 중간 / 4: 폴리·높은텐션 / 5: 매우 빡빡", 
    map: [-1, 0, 1, 2, 3], 
    affects: ["팔", "어깨"] 
  },
  { 
    id: 8, 
    cat: "라켓", 
    body: "라켓 경도/무게/밸런스가 과도하게 하드한 편인가요?", 
    scale: "1: 부드러움 / 2: 다소 부드러움 / 3: 보통 / 4: 다소 하드 / 5: 매우 하드", 
    map: [-1, 0, 1, 2, 3], 
    affects: ["팔", "어깨", "허리"] 
  },

  // 표면/풋워크
  { 
    id: 9, 
    cat: "코트표면", 
    body: "주 사용 코트는?", 
    scale: "1: 클레이 / 2: 인도어 카펫 / 3: 하드(탄성 양호) / 4: 하드(탄성 낮음) / 5: 거친 하드", 
    map: [-1, 0, 1, 2, 3], 
    affects: ["무릎", "발목", "종아리"] 
  },
  { 
    id: 10, 
    cat: "급정지", 
    body: "급정지·컷 동작 빈도는?", 
    scale: "1: 드묾 / 2: 가끔 / 3: 보통 / 4: 자주 / 5: 매우 잦음", 
    map: [1, 2, 3, 4, 5], 
    affects: ["무릎", "발목"] 
  },

  // 통증 이력
  { 
    id: 11, 
    cat: "팔통증", 
    body: "최근 1개월 내 팔꿈치/전완 통증이 있었나요?", 
    scale: "1: 전혀 / 2: 가끔 / 3: 주 1회 / 4: 주 2~3회 / 5: 거의 항상", 
    map: [0, 1, 2, 3, 4], 
    affects: ["팔"] 
  },
  { 
    id: 12, 
    cat: "무릎통증", 
    body: "최근 1개월 내 무릎 통증이 있었나요?", 
    scale: "1: 전혀 / 2: 가끔 / 3: 주 1회 / 4: 주 2~3회 / 5: 거의 항상", 
    map: [0, 1, 2, 3, 4], 
    affects: ["무릎"] 
  },

  // 훈련 구성
  { 
    id: 13, 
    cat: "드릴비율", 
    body: "드릴:매치 비율은?", 
    scale: "1: 드릴 위주(7:3) / 2: 드릴 약간 우세 / 3: 반반 / 4: 매치 약간 우세 / 5: 매치 위주(7:3)", 
    map: [-2, -1, 0, 1, 2], 
    affects: ["기초체력", "기술"] 
  },
  { 
    id: 14, 
    cat: "크로스트레이닝", 
    body: "보강운동(러닝/근력/유연성)을 병행하나요?", 
    scale: "1: 주 3회 이상 / 2: 주 2회 / 3: 주 1회 / 4: 월 1~2회 / 5: 전혀 안 함", 
    map: [-2, -1, 0, 1, 2], 
    affects: ["전체"] 
  },

  // 회복일
  { 
    id: 15, 
    cat: "회복일", 
    body: "주당 완전 휴식일은?", 
    scale: "1: 2일 이상 / 2: 2일 / 3: 1일 / 4: 0~1일 / 5: 0일", 
    map: [-2, -1, 1, 2, 3], 
    affects: ["전체"] 
  },
];

export default function InjuryRiskQuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showMotivation, setShowMotivation] = useState(false);

  const handleAnswer = (questionId: number, selectedIndex: number) => {
    const question = QUESTIONS.find(q => q.id === questionId);
    if (!question) return;

    const score = question.map[selectedIndex];
    const newAnswer: Answer = {
      id: questionId,
      score,
      cat: question.cat,
      selected: selectedIndex + 1
    };

    const updatedAnswers = answers.filter(a => a.id !== questionId);
    updatedAnswers.push(newAnswer);
    setAnswers(updatedAnswers);

    // 8번째 문항에서 동기부여 메시지 표시
    if (currentQuestion === 7 && !showMotivation) {
      setShowMotivation(true);
      setTimeout(() => setShowMotivation(false), 5000);
    }

    // 다음 문항으로 이동
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 마지막 문항 완료 시 결과 페이지로 이동
      const params = encodeURIComponent(JSON.stringify(updatedAnswers));
      router.push(`/injury-risk/result?answers=${params}`);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const currentQ = QUESTIONS[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10">
      <div className="max-w-3xl mx-auto p-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            🏥 부상 위험도 체크
          </h1>
          <p className="text-lg text-[#64748B] mb-6">
            플레이 습관·강도·회복 루틴을 바탕으로 지금 상태를 진단합니다
          </p>
          
          {/* Progress */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm text-[#64748B] mb-2">
              <span>진행률</span>
              <span>{currentQuestion + 1}/{QUESTIONS.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Motivation Alert */}
        {showMotivation && (
          <Alert className="mb-6 border-[#0BA360] bg-[#0BA360]/10">
            <AlertDescription className="text-[#0BA360]">
              💪 절반 이상 완료! 남은 문항을 완료하면 개인화된 체크리스트를 받을 수 있습니다.
            </AlertDescription>
          </Alert>
        )}

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="text-[#0BA360] border-[#0BA360]">
                {currentQ.cat}
              </Badge>
              <span className="text-sm text-[#64748B]">
                문항 {currentQuestion + 1} / {QUESTIONS.length}
              </span>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQ.body}
            </CardTitle>
            <CardDescription className="text-sm text-[#64748B] mt-2">
              {currentQ.scale}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {[1, 2, 3, 4, 5].map((option, index) => {
                const scaleParts = currentQ.scale.split(' / ');
                const optionText = scaleParts[index] || `${option}`;
                
                return (
                  <Button
                    key={option}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 text-left hover:bg-[#0BA360]/10 hover:border-[#0BA360]"
                    onClick={() => handleAnswer(currentQ.id, index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 border-[#64748B] flex items-center justify-center text-sm font-medium">
                        {option}
                      </div>
                      <span className="text-sm">{optionText}</span>
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={currentQuestion === 0}
              >
                이전
              </Button>
              
              <div className="text-sm text-[#64748B]">
                {answers.length} / {QUESTIONS.length} 완료
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#64748B]">
            💡 정확한 진단을 위해 솔직하게 답변해주세요
          </p>
        </div>
      </div>
    </div>
  );
}
