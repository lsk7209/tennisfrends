"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface NTRPResult {
  level: number
  title: string
  description: string
  strengths: string[]
  improvements: string[]
  nextActions: {
    emoji: string
    action: string
    description: string
  }[]
}

const ntrpResults: Record<number, NTRPResult> = {
  1.0: {
    level: 1.0,
    title: "NTRP 1.0 - 테니스 입문자",
    description: "테니스의 기본기를 배우고 있는 단계입니다. 정확한 스윙과 기본 자세를 익히는 것이 중요합니다.",
    strengths: ["테니스에 대한 열정", "기본기를 배우려는 의지"],
    improvements: ["기본 스윙 자세", "공과의 거리감", "그립 잡는 방법"],
    nextActions: [
      { emoji: "🎯", action: "기본 그립 연습", description: "이스턴 그립으로 10분간 연습" },
      { emoji: "🏃", action: "발 움직임 훈련", description: "사이드 스텝 20회 반복" },
      { emoji: "🎾", action: "벽치기 연습", description: "하루 15분 벽치기로 감각 익히기" }
    ]
  },
  1.5: {
    level: 1.5,
    title: "NTRP 1.5 - 초보자",
    description: "기본 스윙을 익히고 있는 단계입니다. 일관성 있는 스윙을 만드는 것이 목표입니다.",
    strengths: ["기본 그립 이해", "간단한 스윙 가능"],
    improvements: ["스윙 일관성", "공의 방향 제어", "발 움직임"],
    nextActions: [
      { emoji: "🎯", action: "스윙 연습", description: "미러 앞에서 스윙 자세 확인" },
      { emoji: "🏃", action: "발 움직임", description: "전후좌우 이동 연습 10분" },
      { emoji: "🎾", action: "벽치기", description: "일정한 리듬으로 20회 연속" }
    ]
  },
  2.0: {
    level: 2.0,
    title: "NTRP 2.0 - 초급자",
    description: "기본적인 라켓 스킬을 갖추고 있는 단계입니다. 공의 방향과 깊이를 조절할 수 있습니다.",
    strengths: ["기본 스윙 완성", "공의 방향 제어 가능"],
    improvements: ["스핀 기술", "발리 기술", "서브 기본기"],
    nextActions: [
      { emoji: "🎯", action: "스핀 연습", description: "탑스핀 스윙 30회 연습" },
      { emoji: "🏃", action: "발리 연습", description: "네트 앞에서 발리 20회" },
      { emoji: "🎾", action: "서브 연습", description: "기본 서브 동작 15회" }
    ]
  },
  2.5: {
    level: 2.5,
    title: "NTRP 2.5 - 초급자+",
    description: "기본 기술을 익히고 있는 단계입니다. 간단한 경기를 할 수 있는 수준입니다.",
    strengths: ["기본 기술 완성", "간단한 경기 가능"],
    improvements: ["전술적 사고", "서브 정확도", "발리 안정성"],
    nextActions: [
      { emoji: "🎯", action: "서브 정확도", description: "서비스 박스 맞추기 20회" },
      { emoji: "🏃", action: "발리 안정성", description: "발리 연속 30회 도전" },
      { emoji: "🎾", action: "전술 연습", description: "코트 활용 전략 학습" }
    ]
  },
  3.0: {
    level: 3.0,
    title: "NTRP 3.0 - 중급자",
    description: "안정적인 기본기를 갖춘 단계입니다. 다양한 스트로크를 구사할 수 있습니다.",
    strengths: ["안정적인 기본기", "다양한 스트로크", "기본 전술 이해"],
    improvements: ["파워 향상", "스핀 활용", "네트 플레이"],
    nextActions: [
      { emoji: "🎯", action: "파워 스윙", description: "강한 스윙으로 25회 연습" },
      { emoji: "🏃", action: "스핀 활용", description: "탑스핀으로 깊이 조절" },
      { emoji: "🎾", action: "네트 플레이", description: "어프로치 샷 연습" }
    ]
  },
  3.5: {
    level: 3.5,
    title: "NTRP 3.5 - 중급자+",
    description: "리듬은 좋고, 마무리가 약한 단계입니다. 일관성 있는 플레이가 가능합니다.",
    strengths: ["좋은 리듬감", "일관성 있는 플레이", "기본 전술 활용"],
    improvements: ["마무리 샷", "정확한 토스", "그립 압력 조절"],
    nextActions: [
      { emoji: "🎯", action: "정확한 토스", description: "토스 높이 일정하게 연습" },
      { emoji: "🏃", action: "그립 압력", description: "그립 압력 70%로 조절" },
      { emoji: "🎾", action: "마무리 샷", description: "10분 루틴(쉐도잉 20회)" }
    ]
  },
  4.0: {
    level: 4.0,
    title: "NTRP 4.0 - 중상급자",
    description: "안정적인 기술과 전술을 갖춘 단계입니다. 다양한 상황에 대응할 수 있습니다.",
    strengths: ["안정적인 기술", "전술적 사고", "다양한 상황 대응"],
    improvements: ["고급 기술", "심리적 안정성", "체력 관리"],
    nextActions: [
      { emoji: "🎯", action: "고급 기술", description: "드롭샷, 로브 연습" },
      { emoji: "🏃", action: "체력 관리", description: "지구력 향상 훈련" },
      { emoji: "🎾", action: "심리 훈련", description: "집중력 향상 연습" }
    ]
  },
  4.5: {
    level: 4.5,
    title: "NTRP 4.5 - 상급자",
    description: "고급 기술과 전술을 구사할 수 있는 단계입니다. 경기에서 우위를 점할 수 있습니다.",
    strengths: ["고급 기술", "전술적 우위", "경기 경험"],
    improvements: ["정밀한 컨트롤", "파워와 스핀", "네트 플레이"],
    nextActions: [
      { emoji: "🎯", action: "정밀 컨트롤", description: "라인 맞추기 연습" },
      { emoji: "🏃", action: "파워 스핀", description: "강한 스핀 샷 연습" },
      { emoji: "🎾", action: "네트 플레이", description: "어그레시브 네트 플레이" }
    ]
  },
  5.0: {
    level: 5.0,
    title: "NTRP 5.0 - 고급자",
    description: "완성된 기술과 전술을 갖춘 단계입니다. 대회에서 좋은 성과를 낼 수 있습니다.",
    strengths: ["완성된 기술", "고급 전술", "대회 경험"],
    improvements: ["세밀한 조절", "심리적 강인함", "체력 최적화"],
    nextActions: [
      { emoji: "🎯", action: "세밀한 조절", description: "정확도 95% 이상 목표" },
      { emoji: "🏃", action: "심리 강화", description: "압박 상황 훈련" },
      { emoji: "🎾", action: "체력 최적화", description: "경기 체력 향상" }
    ]
  }
}

export default function NTRPAnalyzer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<NTRPResult | null>(null)

  const questions = [
    {
      id: "serve",
      question: "서브의 정확도는 어느 정도인가요?",
      options: [
        { value: 1, label: "서브를 아직 배우고 있어요" },
        { value: 2, label: "가끔 서비스 박스에 들어가요" },
        { value: 3, label: "대부분 서비스 박스에 들어가요" },
        { value: 4, label: "원하는 위치에 정확히 넣을 수 있어요" },
        { value: 5, label: "파워와 스핀을 자유자재로 구사해요" }
      ]
    },
    {
      id: "forehand",
      question: "포핸드 스트로크는 어느 정도인가요?",
      options: [
        { value: 1, label: "기본 스윙을 배우고 있어요" },
        { value: 2, label: "간단한 포핸드가 가능해요" },
        { value: 3, label: "안정적인 포핸드를 구사해요" },
        { value: 4, label: "파워와 스핀을 넣을 수 있어요" },
        { value: 5, label: "다양한 포핸드 기술을 구사해요" }
      ]
    },
    {
      id: "backhand",
      question: "백핸드 스트로크는 어느 정도인가요?",
      options: [
        { value: 1, label: "백핸드를 아직 배우고 있어요" },
        { value: 2, label: "기본 백핸드가 가능해요" },
        { value: 3, label: "안정적인 백핸드를 구사해요" },
        { value: 4, label: "원핸드/투핸드 모두 가능해요" },
        { value: 5, label: "고급 백핸드 기술을 구사해요" }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const calculateNTRP = () => {
    const values = Object.values(answers)
    const average = values.reduce((sum, val) => sum + val, 0) / values.length
    
    // NTRP 레벨 매핑 (1-5 스케일을 1.0-5.0 NTRP로 변환)
    const ntrpLevel = Math.round(average * 2) / 2
    const roundedLevel = Math.min(Math.max(ntrpLevel, 1.0), 5.0)
    
    return roundedLevel
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      const ntrpLevel = calculateNTRP()
      setResult(ntrpResults[ntrpLevel])
    }
  }

  const handleRestart = () => {
    setCurrentStep(1)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#0BA360]">
              {result.title}
            </CardTitle>
            <CardDescription className="text-lg">
              {result.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 강점과 개선점 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#2364AA] mb-3">💪 강점</h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#2364AA] mb-3">🎯 개선점</h3>
                <ul className="space-y-2">
                  {result.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-orange-500">→</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 다음 행동 3가지 */}
            <div className="bg-[#F8FAFC] p-6 rounded-lg">
              <h3 className="font-semibold text-[#2364AA] mb-4">🚀 다음 3가지 행동</h3>
              <div className="space-y-4">
                {result.nextActions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-2xl">{action.emoji}</span>
                    <div>
                      <h4 className="font-medium text-[#0BA360]">{action.action}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={handleRestart}
                variant="outline"
                className="border-[#0BA360] text-[#0BA360] hover:bg-[#0BA360] hover:text-white"
              >
                다시 테스트하기
              </Button>
              <Button 
                className="bg-[#0BA360] hover:bg-[#19C37D]"
                onClick={() => {
                  const data = {
                    ntrp: result.level,
                    title: result.title,
                    description: result.description,
                    strengths: result.strengths,
                    improvements: result.improvements,
                    nextActions: result.nextActions,
                    timestamp: new Date().toISOString()
                  }
                  navigator.clipboard.writeText(JSON.stringify(data, null, 2))
                }}
              >
                결과 복사하기
              </Button>
              <Button 
                variant="outline"
                className="border-[#2364AA] text-[#2364AA] hover:bg-[#2364AA] hover:text-white"
              >
                라켓 추천 받기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentStep - 1]
  const isAnswered = answers[currentQuestion.id] !== undefined

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-[#0BA360] border-[#0BA360]">
              NTRP 실력 분석
            </Badge>
            <span className="text-sm text-gray-500">
              {currentStep} / 3
            </span>
          </div>
          <Progress value={(currentStep / 3) * 100} className="mb-4" />
          <CardTitle className="text-xl">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                answers[currentQuestion.id] === option.value
                  ? 'border-[#0BA360] bg-[#0BA360]/10'
                  : 'border-gray-200 hover:border-[#0BA360]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-[#0BA360] bg-[#0BA360]'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion.id] === option.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            </button>
          ))}
          
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleNext}
              disabled={!isAnswered}
              className="bg-[#0BA360] hover:bg-[#19C37D] disabled:opacity-50"
            >
              {currentStep === 3 ? '결과 보기' : '다음'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
