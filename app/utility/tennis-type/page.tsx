import TennisTypeAnalyzer from "@/components/utility/tennis-type-analyzer"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TennisTypePage() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/utility">
              <Button variant="ghost" size="sm" className="text-[#2364AA] hover:bg-[#2364AA]/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                유틸리티로 돌아가기
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">테니스 성향 7유형</h1>
              <p className="text-[#334155]">당신의 플레이 스타일을 분석하여 최적의 전술과 장비를 추천합니다</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <TennisTypeAnalyzer />
      </div>

      {/* Footer Info */}
      <div className="bg-white border-t border-[#E2E8F0] py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold text-[#0F172A] mb-2">테니스 성향 7유형이란?</h3>
          <p className="text-[#334155] max-w-2xl mx-auto">
            테니스 플레이어의 성향을 7가지 유형으로 분류하여 각 유형별 특성, 강약점, 
            추천 전술과 장비를 제시하는 분석 시스템입니다. 당신의 플레이 스타일에 
            맞는 최적의 전략을 찾아보세요.
          </p>
        </div>
      </div>
    </div>
  )
}
