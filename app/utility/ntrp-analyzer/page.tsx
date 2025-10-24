import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NTRPAnalyzerPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/utility">
              <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                유틸리티로 돌아가기
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">NTRP 실력 테스트 분석기</h1>
              <p className="text-[#334155]">15문항으로 정확한 테니스 실력 레벨을 측정하고 통계를 확인하세요</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-white text-3xl">🎾</span>
          </div>
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">NTRP 실력 테스트 분석기</h2>
          <p className="text-xl text-[#334155] max-w-2xl mx-auto leading-relaxed">
            15가지 질문을 통해 당신의 테니스 실력을 정확하게 분석하고 NTRP 레벨을 측정합니다.
            <br />
            <span className="text-[#0BA360] font-semibold">결과는 자동으로 저장되어 통계와 히스토리를 확인할 수 있습니다.</span>
          </p>
        </div>

        {/* 기능 소개 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">정확한 분석</h3>
            <p className="text-[#64748B] text-sm">
              15문항의 체계적인 질문으로 NTRP 1.5부터 5.0+까지 정확한 레벨 측정
            </p>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl mb-4">💾</div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">자동 저장</h3>
            <p className="text-[#64748B] text-sm">
              결과가 자동으로 저장되어 실력 변화 추이와 히스토리를 확인 가능
            </p>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-lg font-semibold text-[#0F172A] mb-2">통계 분석</h3>
            <p className="text-[#64748B] text-sm">
              전체 사용자 통계, 리더보드, 플레이 스타일 분포 등 다양한 분석 제공
            </p>
          </Card>
        </div>

        {/* 테스트 시작 */}
        <Card className="p-8 text-center bg-gradient-to-b from-[#0BA360]/10 to-white">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
            지금 바로 테니스 실력을 분석해보세요
          </h3>
          <p className="text-[#64748B] mb-6 leading-relaxed">
            15문항 질문으로 정확한 NTRP 레벨과 개선 방향을 확인할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/utility/ntrp-analyzer/test">
              <Button size="lg" className="bg-[#0BA360] hover:bg-[#19C37D] text-white text-lg px-8 py-4 rounded-full shadow-lg">
                🎯 무료로 분석하기
              </Button>
            </Link>
            <Link href="/stats">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-full">
                📊 통계 보기
              </Button>
            </Link>
          </div>
        </Card>

        {/* 추가 정보 */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🔍 NTRP 시스템이란?</h3>
            <p className="text-[#64748B] leading-relaxed mb-4">
              NTRP(National Tennis Rating Program)는 미국 테니스 협회에서 개발한 
              표준화된 테니스 실력 평가 시스템입니다. 1.5부터 7.0까지 세분화된 
              레벨로 정확한 실력 측정이 가능합니다.
            </p>
            <ul className="space-y-2 text-[#64748B] text-sm">
              <li>• 1.5-2.5: 초보자 레벨</li>
              <li>• 3.0-3.5: 중급자 레벨</li>
              <li>• 4.0-4.5: 상급자 레벨</li>
              <li>• 5.0+: 고급자/전문가 레벨</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📋 테스트 과정</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span className="text-[#64748B]">15가지 질문에 솔직하게 답변</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="text-[#64748B]">NTRP 레벨과 플레이 스타일 분석</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="text-[#64748B]">결과 저장 및 통계 확인</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
