"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface TennisTypeResult {
  type: string
  title: string
  description: string
  characteristics: string[]
  strengths: string[]
  weaknesses: string[]
  recommendedTactics: string[]
  recommendedEquipment: {
    racket: string
    strings: string
    shoes: string
  }
  nextActions: {
    emoji: string
    action: string
    description: string
  }[]
}

const tennisTypes: Record<string, TennisTypeResult> = {
  "aggressive-baseliner": {
    type: "aggressive-baseliner",
    title: "어그레시브 베이스라이너",
    description: "강력한 그라운드 스트로크로 상대를 압박하는 공격적인 스타일입니다.",
    characteristics: ["강력한 포핸드", "일관성 있는 백핸드", "베이스라인 선호", "공격적 성향"],
    strengths: ["파워풀한 스트로크", "일관성 있는 플레이", "체력이 좋음", "정신력 강함"],
    weaknesses: ["네트 플레이 부족", "변화 부족", "수비적 플레이 어려움"],
    recommendedTactics: ["강력한 서브로 시작", "베이스라인에서 압박", "상대의 약한 백핸드 공략", "긴 랠리로 체력 소모"],
    recommendedEquipment: {
      racket: "헤드 사이즈 100-110인치, 무게 300-320g",
      strings: "폴리에스터 또는 하이브리드",
      shoes: "안정성과 내구성이 좋은 코트 슈즈"
    },
    nextActions: [
      { emoji: "💪", action: "파워 스윙 연습", description: "강력한 스윙으로 30회 연습" },
      { emoji: "🎯", action: "정확도 향상", description: "라인 맞추기 연습 20회" },
      { emoji: "🏃", action: "체력 강화", description: "지구력 향상 훈련 30분" }
    ]
  },
  "counter-puncher": {
    type: "counter-puncher",
    title: "카운터 펀처",
    description: "상대의 공격을 받아넘기며 기회를 노리는 수비적 스타일입니다.",
    characteristics: ["빠른 발 움직임", "정확한 리턴", "인내심", "전술적 사고"],
    strengths: ["빠른 발 움직임", "정확한 리턴", "인내심", "전술적 사고"],
    weaknesses: ["공격력 부족", "서브 약함", "네트 플레이 부족"],
    recommendedTactics: ["상대의 공격을 받아넘기기", "긴 랠리로 기회 노리기", "상대의 실수 유도", "체력 소모 전술"],
    recommendedEquipment: {
      racket: "헤드 사이즈 95-100인치, 무게 280-300g",
      strings: "멀티필라멘트 또는 하이브리드",
      shoes: "빠른 움직임을 위한 가벼운 슈즈"
    },
    nextActions: [
      { emoji: "🏃", action: "발 움직임 훈련", description: "사이드 스텝 50회 연습" },
      { emoji: "🎯", action: "정확한 리턴", description: "리턴 정확도 연습 25회" },
      { emoji: "🧠", action: "전술 학습", description: "상대 분석 및 대응 전술" }
    ]
  },
  "serve-and-volley": {
    type: "serve-and-volley",
    title: "서브 앤 발리",
    description: "강력한 서브 후 네트로 올라가 발리로 마무리하는 공격적 스타일입니다.",
    characteristics: ["강력한 서브", "빠른 네트 플레이", "발리 기술", "공격적 성향"],
    strengths: ["강력한 서브", "빠른 네트 플레이", "발리 기술", "공격적 성향"],
    weaknesses: ["베이스라인 플레이 부족", "긴 랠리 어려움", "체력 소모 빠름"],
    recommendedTactics: ["강력한 서브로 시작", "서브 후 즉시 네트로", "발리로 마무리", "상대의 패싱 샷 차단"],
    recommendedEquipment: {
      racket: "헤드 사이즈 90-95인치, 무게 320-340g",
      strings: "폴리에스터 또는 나일론",
      shoes: "빠른 움직임을 위한 가벼운 슈즈"
    },
    nextActions: [
      { emoji: "⚡", action: "서브 파워 향상", description: "강력한 서브 20회 연습" },
      { emoji: "🏃", action: "네트 플레이", description: "발리 연습 30회" },
      { emoji: "🎯", action: "정확한 발리", description: "발리 정확도 연습 25회" }
    ]
  },
  "all-court": {
    type: "all-court",
    title: "올코트 플레이어",
    description: "모든 영역에서 균형 잡힌 플레이를 하는 완전한 스타일입니다.",
    characteristics: ["균형 잡힌 기술", "다양한 전술", "적응력", "완전한 게임"],
    strengths: ["균형 잡힌 기술", "다양한 전술", "적응력", "완전한 게임"],
    weaknesses: ["특별한 강점 부족", "복잡한 전술", "높은 기술 요구"],
    recommendedTactics: ["상대에 따른 전술 변화", "모든 영역 활용", "상황별 최적 플레이", "유연한 대응"],
    recommendedEquipment: {
      racket: "헤드 사이즈 95-100인치, 무게 300-320g",
      strings: "하이브리드 또는 멀티필라멘트",
      shoes: "균형 잡힌 성능의 올라운드 슈즈"
    },
    nextActions: [
      { emoji: "🎯", action: "기술 균형", description: "모든 스트로크 20회씩 연습" },
      { emoji: "🧠", action: "전술 학습", description: "다양한 전술 패턴 학습" },
      { emoji: "🏃", action: "적응력 향상", description: "상황별 대응 연습" }
    ]
  },
  "defensive-baseliner": {
    type: "defensive-baseliner",
    title: "디펜시브 베이스라이너",
    description: "안정적인 베이스라인 플레이로 상대의 실수를 유도하는 수비적 스타일입니다.",
    characteristics: ["안정적인 스트로크", "인내심", "정확성", "수비적 성향"],
    strengths: ["안정적인 스트로크", "인내심", "정확성", "수비적 성향"],
    weaknesses: ["공격력 부족", "서브 약함", "네트 플레이 부족"],
    recommendedTactics: ["안정적인 스트로크", "긴 랠리로 기회 노리기", "상대의 실수 유도", "체력 소모 전술"],
    recommendedEquipment: {
      racket: "헤드 사이즈 100-110인치, 무게 280-300g",
      strings: "멀티필라멘트 또는 하이브리드",
      shoes: "안정성과 내구성이 좋은 슈즈"
    },
    nextActions: [
      { emoji: "🎯", action: "정확성 향상", description: "정확한 스트로크 30회 연습" },
      { emoji: "🏃", action: "지구력 강화", description: "긴 랠리 연습 20분" },
      { emoji: "🧠", action: "인내심 훈련", description: "긴 랠리로 상대 압박" }
    ]
  },
  "power-player": {
    type: "power-player",
    title: "파워 플레이어",
    description: "강력한 파워로 상대를 압도하는 공격적인 스타일입니다.",
    characteristics: ["강력한 파워", "공격적 성향", "빠른 마무리", "압도적 스타일"],
    strengths: ["강력한 파워", "공격적 성향", "빠른 마무리", "압도적 스타일"],
    weaknesses: ["정확도 부족", "체력 소모 빠름", "변화 부족"],
    recommendedTactics: ["강력한 서브로 시작", "빠른 마무리", "상대 압박", "파워로 압도"],
    recommendedEquipment: {
      racket: "헤드 사이즈 100-110인치, 무게 320-340g",
      strings: "폴리에스터 또는 하이브리드",
      shoes: "안정성과 파워 전달이 좋은 슈즈"
    },
    nextActions: [
      { emoji: "💪", action: "파워 훈련", description: "강력한 스윙 40회 연습" },
      { emoji: "🎯", action: "정확도 향상", description: "파워와 정확도 균형 연습" },
      { emoji: "⚡", action: "빠른 마무리", description: "마무리 샷 연습 25회" }
    ]
  },
  "finesse-player": {
    type: "finesse-player",
    title: "피네스 플레이어",
    description: "정교한 기술과 변화로 상대를 혼란시키는 전술적 스타일입니다.",
    characteristics: ["정교한 기술", "다양한 변화", "전술적 사고", "창의적 플레이"],
    strengths: ["정교한 기술", "다양한 변화", "전술적 사고", "창의적 플레이"],
    weaknesses: ["파워 부족", "체력 부족", "일관성 부족"],
    recommendedTactics: ["다양한 변화", "상대 혼란 유도", "창의적 플레이", "전술적 우위"],
    recommendedEquipment: {
      racket: "헤드 사이즈 95-100인치, 무게 280-300g",
      strings: "멀티필라멘트 또는 하이브리드",
      shoes: "빠른 움직임을 위한 가벼운 슈즈"
    },
    nextActions: [
      { emoji: "🎨", action: "기술 다양화", description: "다양한 스핀과 각도 연습" },
      { emoji: "🧠", action: "전술 학습", description: "창의적 전술 패턴 학습" },
      { emoji: "🎯", action: "정교한 컨트롤", description: "정밀한 컨트롤 연습 30회" }
    ]
  }
}

export default function TennisTypeAnalyzer() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<TennisTypeResult | null>(null)

  const questions = [
    {
      id: "play-style",
      question: "어떤 플레이 스타일을 선호하나요?",
      options: [
        { value: 1, label: "강력한 파워로 압도하고 싶어요" },
        { value: 2, label: "정교한 기술로 상대를 혼란시키고 싶어요" },
        { value: 3, label: "안정적으로 상대의 실수를 유도하고 싶어요" },
        { value: 4, label: "빠른 마무리로 경기를 끝내고 싶어요" },
        { value: 5, label: "상대에 따라 전술을 바꾸고 싶어요" }
      ]
    },
    {
      id: "strength",
      question: "가장 자신 있는 기술은 무엇인가요?",
      options: [
        { value: 1, label: "강력한 포핸드 스트로크" },
        { value: 2, label: "정확한 서브" },
        { value: 3, label: "빠른 발 움직임" },
        { value: 4, label: "정교한 발리" },
        { value: 5, label: "다양한 스핀과 각도" }
      ]
    },
    {
      id: "court-position",
      question: "코트에서 가장 편한 위치는 어디인가요?",
      options: [
        { value: 1, label: "베이스라인에서 강력한 스트로크" },
        { value: 2, label: "네트 앞에서 빠른 발리" },
        { value: 3, label: "코트 중앙에서 전술적 플레이" },
        { value: 4, label: "상대에 따라 위치를 바꿔요" },
        { value: 5, label: "모든 위치에서 편해요" }
      ]
    }
  ]

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const calculateTennisType = () => {
    const values = Object.values(answers)
    const average = values.reduce((sum, val) => sum + val, 0) / values.length
    
    // 답변 패턴에 따른 타입 결정
    if (average >= 4.5) return "all-court"
    if (average >= 4.0) return "power-player"
    if (average >= 3.5) return "serve-and-volley"
    if (average >= 3.0) return "aggressive-baseliner"
    if (average >= 2.5) return "finesse-player"
    if (average >= 2.0) return "counter-puncher"
    return "defensive-baseliner"
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      const tennisType = calculateTennisType()
      setResult(tennisTypes[tennisType])
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
            <CardTitle className="text-2xl font-bold text-[#2364AA]">
              {result.title}
            </CardTitle>
            <CardDescription className="text-lg">
              {result.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 특성 */}
            <div>
              <h3 className="font-semibold text-[#2364AA] mb-3">🎯 플레이 특성</h3>
              <div className="flex flex-wrap gap-2">
                {result.characteristics.map((char, index) => (
                  <Badge key={index} variant="secondary" className="bg-[#2364AA]/10 text-[#2364AA]">
                    {char}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 강점과 약점 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#0BA360] mb-3">💪 강점</h3>
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
                <h3 className="font-semibold text-[#F59E0B] mb-3">⚠️ 약점</h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-orange-500">→</span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 추천 전술 */}
            <div>
              <h3 className="font-semibold text-[#2364AA] mb-3">🧠 추천 전술</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {result.recommendedTactics.map((tactic, index) => (
                  <div key={index} className="p-3 bg-[#2364AA]/5 rounded-lg border border-[#2364AA]/20">
                    <span className="text-[#2364AA] font-medium">{tactic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천 장비 */}
            <div>
              <h3 className="font-semibold text-[#2364AA] mb-3">🎾 추천 장비</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#F8FAFC] rounded-lg border">
                  <h4 className="font-medium text-[#0BA360] mb-2">라켓</h4>
                  <p className="text-sm text-[#334155]">{result.recommendedEquipment.racket}</p>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-lg border">
                  <h4 className="font-medium text-[#0BA360] mb-2">스트링</h4>
                  <p className="text-sm text-[#334155]">{result.recommendedEquipment.strings}</p>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-lg border">
                  <h4 className="font-medium text-[#0BA360] mb-2">신발</h4>
                  <p className="text-sm text-[#334155]">{result.recommendedEquipment.shoes}</p>
                </div>
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
                className="border-[#2364AA] text-[#2364AA] hover:bg-[#2364AA] hover:text-white"
              >
                다시 테스트하기
              </Button>
              <Button 
                className="bg-[#2364AA] hover:bg-[#3D8BFF]"
                onClick={() => {
                  const data = {
                    type: result.type,
                    title: result.title,
                    description: result.description,
                    characteristics: result.characteristics,
                    strengths: result.strengths,
                    weaknesses: result.weaknesses,
                    recommendedTactics: result.recommendedTactics,
                    recommendedEquipment: result.recommendedEquipment,
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
                className="border-[#0BA360] text-[#0BA360] hover:bg-[#0BA360] hover:text-white"
              >
                추천 장비 보기
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
            <Badge variant="outline" className="text-[#2364AA] border-[#2364AA]">
              테니스 성향 분석
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
                  ? 'border-[#2364AA] bg-[#2364AA]/10'
                  : 'border-gray-200 hover:border-[#2364AA]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-[#2364AA] bg-[#2364AA]'
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
              className="bg-[#2364AA] hover:bg-[#3D8BFF] disabled:opacity-50"
            >
              {currentStep === 3 ? '결과 보기' : '다음'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
