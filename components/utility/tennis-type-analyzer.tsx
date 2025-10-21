"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { STYLE_QUESTIONS, STYLE_META, calculateStyleScore } from "@/lib/tennis-style-questions"

export default function TennisTypeAnalyzer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<string | null>(null)
  const router = useRouter()

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    // 자동으로 다음 질문으로 넘어가기 (마지막 질문이 아닌 경우)
    if (currentStep < STYLE_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 500) // 0.5초 후 자동 진행
    } else {
      // 마지막 질문인 경우 결과 계산
      setTimeout(() => {
        calculateResult()
      }, 500)
    }
  }

  const calculateResult = () => {
    const resultType = calculateStyleScore(answers)
    setResult(resultType)
  }

  const handleSubmit = () => {
    calculateResult()
  }

  if (result) {
    const styleInfo = STYLE_META[result as keyof typeof STYLE_META]
    
    return (
      <div className="max-w-4xl mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">당신의 플레이 스타일</CardTitle>
            <div 
              className="inline-block px-6 py-3 rounded-full text-white font-bold text-lg"
              style={{ backgroundColor: styleInfo.color }}
            >
              {styleInfo.name}
            </div>
            <p className="text-xl mt-4 font-medium" style={{ color: styleInfo.color }}>
              "{styleInfo.slogan}"
            </p>
          </CardHeader>
          <CardContent className="text-left">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 요약 */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: styleInfo.color }}>
                  스타일 요약
                </h3>
                <ul className="space-y-2">
                  {styleInfo.summary.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#0BA360] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 강점 */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: styleInfo.color }}>
                  주요 강점
                </h3>
                <div className="flex flex-wrap gap-2">
                  {styleInfo.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 주의사항 */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: styleInfo.color }}>
                  주의사항
                </h3>
                <ul className="space-y-2">
                  {styleInfo.pitfalls.map((pitfall, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">⚠️</span>
                      <span>{pitfall}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 추천 훈련 */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: styleInfo.color }}>
                  추천 훈련
                </h3>
                <ul className="space-y-2">
                  {styleInfo.training.map((training, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#0BA360] mt-1">💡</span>
                      <span>{training}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center space-x-4">
              <Button 
                onClick={() => {
                  setResult(null)
                  setCurrentStep(0)
                  setAnswers({})
                }}
                variant="outline"
              >
                다시 테스트하기
              </Button>
              <Button 
                onClick={() => router.push('/utility')}
                className="bg-[#0BA360] hover:bg-[#19C37D]"
              >
                다른 유틸리티 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep >= STYLE_QUESTIONS.length) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">테스트 완료</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6">모든 질문에 답변해주셔서 감사합니다.</p>
            <Button 
              onClick={handleSubmit}
              className="bg-[#0BA360] hover:bg-[#19C37D]"
            >
              결과 확인하기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = STYLE_QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / STYLE_QUESTIONS.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#605A57]">진행률</span>
          <span className="text-sm text-[#605A57]">{currentStep + 1} / {STYLE_QUESTIONS.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, index)}
                variant="outline"
                className="w-full h-auto p-4 text-left justify-start hover:bg-[#0BA360] hover:text-white hover:border-[#0BA360] transition-colors"
              >
                <span className="mr-3 w-6 h-6 bg-[#F7F5F3] text-[#37322F] rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}