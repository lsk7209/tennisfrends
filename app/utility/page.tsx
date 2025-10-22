"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const utilities = [
  {
    id: "ntrp-analyzer",
    title: "NTRP 실력 테스트 분석",
    description: "15문항으로 정확한 테니스 실력 레벨을 측정하고 개선 방향을 제시합니다.",
    icon: "🎯",
    color: "bg-[#0BA360]",
    href: "/utility/ntrp-analyzer",
    features: ["정확한 실력 측정", "개선 방향 제시", "맞춤형 훈련 계획"],
    status: "active",
    priority: 1
  },
  {
    id: "injury-risk",
    title: "부상 위험도 체크",
    description: "15문항으로 부상 위험을 진단하고 개인화된 체크리스트를 제공합니다.",
    icon: "🏥",
    color: "bg-[#2364AA]",
    href: "/injury-risk/intro",
    features: ["부상 위험 평가", "개인화 체크리스트", "예방 방법 제시"],
    status: "active",
    priority: 2
  },
  {
    id: "string-tension",
    title: "스트링 텐션 계산기",
    description: "라켓과 플레이 스타일에 맞는 최적의 스트링 텐션을 계산해드립니다.",
    icon: "⚡",
    color: "bg-[#C7F000]",
    href: "/string-tension",
    features: ["최적 텐션 계산", "라켓별 맞춤", "성능 예측"],
    status: "active",
    priority: 3
  },
  {
    id: "tennis-type",
    title: "테니스 성향 7유형",
    description: "당신의 플레이 스타일을 분석하여 최적의 전술과 장비를 추천합니다.",
    icon: "🧩",
    color: "bg-[#0BA360]",
    href: "/utility/tennis-type",
    features: ["플레이 스타일 분석", "전술 추천", "장비 매칭"],
    status: "active",
    priority: 4
  },
  {
    id: "rules-quiz",
    title: "테니스 규칙 퀴즈",
    description: "12문항 랜덤 퀴즈로 실전 규칙 감각을 점검하고 약점을 분석합니다.",
    icon: "📚",
    color: "bg-[#2364AA]",
    href: "/tennis-quiz",
    features: ["12문항 랜덤", "즉시 해설", "약점 분석"],
    status: "active",
    priority: 5
  },
  {
    id: "match-analyzer",
    title: "경기 기록 분석기",
    description: "경기 데이터를 입력하여 승률, 서브/리턴 지표, UE/위너 비율 등을 분석합니다.",
    icon: "📊",
    color: "bg-[#C7F000]",
    href: "/match-analyzer",
    features: ["데이터 입력", "통계 분석", "개인화 리포트"],
    status: "active",
    priority: 6
  },
  {
    id: "racket-matchmaker",
    title: "라켓 매칭 도우미",
    description: "10문항 설문으로 플레이어 프로파일을 생성하고 최적의 라켓을 추천합니다.",
    icon: "🎾",
    color: "bg-[#2364AA]",
    href: "/racket-matchmaker",
    features: ["10문항 설문", "맞춤 추천", "상세 비교"],
    status: "active",
    priority: 7
  },
  {
    id: "court-finder",
    title: "코트 찾기",
    description: "국내 테니스 코트를 지역별로 검색하고 예약할 수 있는 서비스입니다.",
    icon: "🏟️",
    color: "bg-[#2364AA]",
    href: "/utility/court-finder",
    features: ["지역별 검색", "실시간 예약", "리뷰 및 평점"],
    status: "coming-soon",
    priority: 8
  },
  {
    id: "training-planner",
    title: "훈련 계획 수립",
    description: "개인 실력과 목표에 맞는 맞춤형 훈련 계획을 자동으로 생성해드립니다.",
    icon: "📅",
    color: "bg-[#C7F000]",
    href: "/utility/training-planner",
    features: ["맞춤형 계획", "진도 추적", "목표 설정"],
    status: "coming-soon",
    priority: 9
  },
  {
    id: "nutrition-guide",
    title: "테니스 영양 가이드",
    description: "테니스 선수를 위한 맞춤형 영양 계획과 보충제 추천을 제공합니다.",
    icon: "🥗",
    color: "bg-[#0BA360]",
    href: "/utility/nutrition-guide",
    features: ["맞춤형 영양", "보충제 추천", "식단 계획"],
    status: "coming-soon",
    priority: 10
  },
  {
    id: "mental-training",
    title: "멘탈 트레이닝",
    description: "경기 중 집중력과 멘탈 강화를 위한 다양한 훈련 프로그램을 제공합니다.",
    icon: "🧠",
    color: "bg-[#2364AA]",
    href: "/utility/mental-training",
    features: ["집중력 향상", "멘탈 강화", "경기 심리"],
    status: "coming-soon",
    priority: 11
  },
  {
    id: "equipment-tracker",
    title: "장비 관리",
    description: "라켓, 스트링, 신발 등 테니스 장비의 사용 기간과 성능을 추적합니다.",
    icon: "🔧",
    color: "bg-[#C7F000]",
    href: "/utility/equipment-tracker",
    features: ["사용 기간 추적", "성능 모니터링", "교체 알림"],
    status: "coming-soon",
    priority: 12
  },
  {
    id: "weather-analyzer",
    title: "날씨별 플레이 분석",
    description: "날씨 조건에 따른 플레이 스타일 조정과 장비 선택을 도와드립니다.",
    icon: "🌤️",
    color: "bg-[#0BA360]",
    href: "/utility/weather-analyzer",
    features: ["날씨별 전략", "장비 조정", "플레이 팁"],
    status: "coming-soon",
    priority: 13
  },
  {
    id: "tournament-planner",
    title: "대회 일정 관리",
    description: "국내외 테니스 대회 일정을 확인하고 참가 계획을 세울 수 있습니다.",
    icon: "🏆",
    color: "bg-[#2364AA]",
    href: "/utility/tournament-planner",
    features: ["대회 일정", "참가 계획", "랭킹 추적"],
    status: "coming-soon",
    priority: 14
  },
  {
    id: "video-analysis",
    title: "동영상 분석",
    description: "테니스 동영상을 업로드하여 스윙 폼과 기술을 AI가 분석해드립니다.",
    icon: "🎥",
    color: "bg-[#C7F000]",
    href: "/utility/video-analysis",
    features: ["AI 스윙 분석", "폼 교정", "기술 개선"],
    status: "coming-soon",
    priority: 15
  }
]

export default function UtilityPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<'active' | 'coming-soon'>('active')
  const itemsPerPage = 9

  // 활성 유틸리티와 곧 출시될 유틸리티 분리 및 정렬
  const activeUtilities = utilities
    .filter(util => util.status === "active")
    .sort((a, b) => (a.priority || 999) - (b.priority || 999))
  
  const comingSoonUtilities = utilities
    .filter(util => util.status === "coming-soon")
    .sort((a, b) => (a.priority || 999) - (b.priority || 999))
  
  // 현재 탭에 따른 유틸리티 선택
  const currentUtilities = activeTab === 'active' ? activeUtilities : comingSoonUtilities
  
  // 페이지네이션 계산
  const totalPages = Math.ceil(currentUtilities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUtilities = currentUtilities.slice(startIndex, endIndex)

  // 탭 변경 시 페이지 리셋
  const handleTabChange = (tab: 'active' | 'coming-soon') => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

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

      {/* Utilities Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleTabChange('active')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'active'
                  ? 'bg-[#0BA360] text-white'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              사용 가능한 유틸리티 ({activeUtilities.length})
            </button>
            <button
              onClick={() => handleTabChange('coming-soon')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'coming-soon'
                  ? 'bg-[#0BA360] text-white'
                  : 'bg-white text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              곧 출시될 기능 ({comingSoonUtilities.length})
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-2">
                {activeTab === 'active' ? '사용 가능한 유틸리티' : '곧 출시될 기능들'}
              </h2>
              <p className="text-[#64748B]">
                {activeTab === 'active' 
                  ? `현재 사용할 수 있는 ${activeUtilities.length}개의 유틸리티`
                  : `개발 중인 ${comingSoonUtilities.length}개의 유틸리티`
                }
              </p>
            </div>
            
            {/* Page Info */}
            <div className="text-sm text-[#64748B]">
              {totalPages > 1 && (
                <span>
                  {startIndex + 1}-{Math.min(endIndex, currentUtilities.length)} / {currentUtilities.length}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedUtilities.map((utility) => (
            <Card key={utility.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              <CardHeader className="flex-shrink-0">
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
              <CardContent className="flex flex-col flex-grow">
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap gap-1">
                    {utility.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
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


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 p-0 ${
                    page === currentPage 
                      ? 'bg-[#0BA360] hover:bg-[#19C37D] text-white' 
                      : 'hover:bg-[#F8FAFC]'
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
