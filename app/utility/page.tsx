import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const utilities = [
  {
    id: "ntrp-analyzer",
    title: "NTRP 실력 테스트 분석",
    description: "3단계 질문으로 정확한 테니스 실력 레벨을 측정하고 개선 방향을 제시합니다.",
    icon: "🎯",
    color: "bg-[#0BA360]",
    href: "/utility/ntrp-analyzer",
    features: ["정확한 실력 측정", "개선 방향 제시", "맞춤형 훈련 계획"]
  },
  {
    id: "tennis-type",
    title: "테니스 성향 7유형",
    description: "당신의 플레이 스타일을 분석하여 최적의 전술과 장비를 추천합니다.",
    icon: "🧩",
    color: "bg-[#2364AA]",
    href: "/utility/tennis-type",
    features: ["플레이 스타일 분석", "전술 추천", "장비 매칭"]
  },
  {
    id: "racket-recommender",
    title: "라켓 추천 시스템",
    description: "실력과 플레이 스타일에 맞는 최적의 라켓을 AI가 자동으로 추천해드립니다.",
    icon: "🎾",
    color: "bg-[#C7F000]",
    href: "/utility/racket-recommender",
    features: ["AI 기반 추천", "실력별 매칭", "상세 스펙 비교"]
  },
  {
    id: "match-analyzer",
    title: "경기 기록 분석",
    description: "매치 데이터를 분석하여 강점과 약점을 파악하고 전략을 수립할 수 있습니다.",
    icon: "📊",
    color: "bg-[#0BA360]",
    href: "/utility/match-analyzer",
    features: ["경기 데이터 분석", "강약점 파악", "전략 수립"]
  },
  {
    id: "string-tension",
    title: "스트링 텐션 계산",
    description: "라켓과 플레이 스타일에 맞는 최적의 스트링 텐션을 계산해드립니다.",
    icon: "⚡",
    color: "bg-[#2364AA]",
    href: "/utility/string-tension",
    features: ["최적 텐션 계산", "라켓별 맞춤", "성능 예측"]
  },
  {
    id: "rules-quiz",
    title: "규칙 퀴즈",
    description: "테니스 규칙을 재미있게 학습할 수 있는 4단계 난이도의 퀴즈입니다.",
    icon: "📚",
    color: "bg-[#C7F000]",
    href: "/utility/rules-quiz",
    features: ["4단계 난이도", "즉시 피드백", "규칙 마스터"]
  },
  {
    id: "injury-risk",
    title: "부상 리스크 체크",
    description: "현재 상태를 분석하여 부상 위험을 평가하고 예방 방법을 제시합니다.",
    icon: "🛡️",
    color: "bg-[#0BA360]",
    href: "/utility/injury-risk",
    features: ["부상 위험 평가", "예방 방법 제시", "안전한 훈련"]
  },
  {
    id: "court-finder",
    title: "코트 찾기",
    description: "국내 테니스 코트를 지역별로 검색하고 예약할 수 있는 서비스입니다.",
    icon: "🏟️",
    color: "bg-[#2364AA]",
    href: "/utility/court-finder",
    features: ["지역별 검색", "실시간 예약", "리뷰 및 평점"]
  }
]

export default function UtilityPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
              테니스 유틸리티 허브
            </h1>
            <p className="text-xl text-[#334155] max-w-3xl mx-auto">
              5분만에 내 실력/장비/훈련의 다음 3가지 행동을 알려주는 
              <br />
              테니스 데이터 자동화 플랫폼
            </p>
          </div>
        </div>
      </div>

      {/* Utilities Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {utilities.map((utility) => (
            <Card key={utility.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-lg ${utility.color} flex items-center justify-center text-white text-2xl`}>
                    {utility.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{utility.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {utility.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {utility.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Link href={utility.href}>
                    <Button className="w-full bg-[#0BA360] hover:bg-[#19C37D]">
                      시작하기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            곧 출시될 기능들
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📈</span>
                  랭킹 스냅샷 생성
                </CardTitle>
                <CardDescription>
                  운영자용 랭킹 데이터 분석 및 스냅샷 생성 도구
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  개인 리포트
                </CardTitle>
                <CardDescription>
                  종합적인 개인 성과 분석 및 맞춤형 리포트 제공
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
