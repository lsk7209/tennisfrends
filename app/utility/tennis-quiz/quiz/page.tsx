"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pickRandomQuestions, CATEGORY_COLORS, type QuizQuestion } from "@/lib/tennis-quiz-bank-new";

interface Answer {
  questionId: string;
  selected: number;
  correct: boolean;
  category: string;
  difficulty: number;
}

export default function TennisQuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    // 랜덤 문제 선택
    const randomQuestions = pickRandomQuestions();
    setQuestions(randomQuestions);
    setStartTime(Date.now());
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return; // 이미 답변한 경우

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correct;
    
    const answer: Answer = {
      questionId: currentQuestion.id,
      selected: optionIndex,
      correct: isCorrect,
      category: currentQuestion.category,
      difficulty: currentQuestion.difficulty
    };

    setAnswers(prev => [...prev, answer]);

    // 0.5초 후 다음 질문으로 자동 진행 (해설 표시 없이)
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        // 마지막 질문인 경우 결과 페이지로 이동
        const timeSpent = Date.now() - startTime;
        const wrongCategories = answers
          .filter(a => !a.correct)
          .reduce((acc, a) => {
            acc[a.category] = (acc[a.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

        // 오답 문항들의 정보 수집
        const wrongAnswers = answers.filter(a => !a.correct).map(a => {
          const question = questions.find(q => q.id === a.questionId);
          return {
            questionId: a.questionId,
            question: question?.question || '',
            selected: a.selected,
            correct: question?.correct || 0,
            explanation: question?.explanation || '',
            category: a.category
          };
        });

        const params = new URLSearchParams({
          score: answers.filter(a => a.correct).length.toString(),
          total: questions.length.toString(),
          time: timeSpent.toString(),
          wrongCats: JSON.stringify(wrongCategories),
          wrongAnswers: JSON.stringify(wrongAnswers)
        });

        router.push(`/utility/tennis-quiz/result?${params.toString()}`);
      }
    }, 500);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0BA360] mx-auto mb-4"></div>
          <p className="text-[#64748B]">문제를 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/utility/tennis-quiz">
              <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">테니스 규칙 퀴즈</h1>
              <p className="text-[#334155]">실전 규칙 감각을 점검해보세요</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 pt-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#605A57]">진행률</span>
            <span className="text-sm text-[#605A57]">{currentIndex + 1} / {questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
            <Badge 
              className={`${CATEGORY_COLORS[currentQuestion.category as keyof typeof CATEGORY_COLORS] || 'bg-gray-100 text-gray-800'}`}
            >
              {currentQuestion.category}
            </Badge>
            <Badge variant="outline">
              난이도 {currentQuestion.difficulty}
            </Badge>
          </div>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === index;

                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedOption !== null}
                    className={`w-full h-auto p-4 text-left justify-start transition-all ${
                      isSelected
                        ? "bg-[#0BA360] text-white border-[#0BA360]"
                        : "hover:bg-[#0BA360]/10 hover:border-[#0BA360]/50"
                    }`}
                    variant="outline"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isSelected
                          ? "border-[#0BA360] bg-[#0BA360]"
                          : "border-[#E2E8F0]"
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium">{option}</span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전
          </Button>

          <div className="text-sm text-[#64748B] flex items-center">
            {currentIndex < questions.length - 1 ? (
              <span>다음 질문으로 자동 진행됩니다...</span>
            ) : (
              <span>결과 페이지로 이동합니다...</span>
            )}
          </div>

          <Button
            onClick={() => {
              if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedOption(null);
              }
            }}
            disabled={currentIndex >= questions.length - 1}
            className="bg-[#0BA360] hover:bg-[#19C37D]"
          >
            다음
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
