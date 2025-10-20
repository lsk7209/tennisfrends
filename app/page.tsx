"use client"

import type React from "react"

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col justify-start items-center">
      <div className="relative flex flex-col justify-start items-center w-full">
        {/* Main container */}
        <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 relative flex flex-col justify-start items-start min-h-screen">
          <div className="self-stretch pt-8 overflow-hidden flex flex-col justify-center items-center gap-8 relative z-10">

            {/* Hero Section */}
            <div className="pt-16 pb-8 flex flex-col justify-start items-center px-4 w-full relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-[#0BA360] rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-[#2364AA] rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-[#C7F000] rounded-full blur-xl"></div>
              </div>

              <div className="w-full max-w-5xl flex flex-col justify-center items-center gap-8 relative z-10">
                {/* Main Title with Icon */}
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl">🎾</span>
                  </div>
                  <div className="w-full text-center flex justify-center flex-col text-[#37322F] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-pretendard px-4">
                    <span className="bg-gradient-to-r from-[#0BA360] to-[#2364AA] bg-clip-text text-transparent">
                      5분만에
                    </span>
                    <br />
                    내 실력/장비/훈련의
                    <br />
                    <span className="text-[#0BA360]">다음 3가지 행동</span>을 알려주는
                    <br />
                    테니스 허브
                  </div>
                </div>

                <div className="w-full max-w-3xl text-center flex justify-center flex-col text-[rgba(55,50,47,0.85)] text-lg leading-relaxed font-pretendard px-4 font-medium">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[rgba(55,50,47,0.1)]">
                    NTRP 실력 분석부터 라켓 추천까지
                    <br className="hidden sm:block" />
                    테니스 데이터를 자동 수집·생성·배포하는 유틸리티 허브
                  </div>
                </div>
              </div>

              <div className="w-full max-w-md flex flex-col justify-center items-center gap-8 relative z-10 mt-8">
                <div className="flex flex-col items-center gap-4">
                  <a href="/utility/ntrp-analyzer" className="group h-14 px-10 py-4 relative bg-gradient-to-r from-[#0BA360] to-[#19C37D] shadow-lg overflow-hidden rounded-full flex justify-center items-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-3 text-white text-lg font-semibold leading-5 font-pretendard">
                      <span>🎯</span>
                      테니스 실력 분석하기
                    </div>
                  </a>
                  <p className="text-sm text-[rgba(55,50,47,0.6)] text-center">
                    무료로 시작하고 3단계만에 결과 확인
                  </p>
                </div>
                    </div>
                  </div>

            {/* Feature Cards */}
            <div className="w-full max-w-4xl px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-sm border border-[#E0DEDB] hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#0BA360] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🎾</span>
                  </div>
                  <h3 className="text-[#37322F] text-lg font-semibold mb-2">NTRP 실력 분석</h3>
                  <p className="text-[#605A57] text-sm leading-relaxed">
                    3단계 질문으로 정확한 테니스 실력 레벨을 측정하고 개선 방향을 제시합니다.
                  </p>
              </div>

                <div className="p-6 bg-white rounded-lg shadow-sm border border-[#E0DEDB] hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#2364AA] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🏆</span>
                  </div>
                  <h3 className="text-[#37322F] text-lg font-semibold mb-2">라켓 추천 시스템</h3>
                  <p className="text-[#605A57] text-sm leading-relaxed">
                    실력과 플레이 스타일에 맞는 최적의 라켓을 AI가 자동으로 추천해드립니다.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-sm border border-[#E0DEDB] hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#C7F000] rounded-full flex items-center justify-center mb-4">
                    <span className="text-[#37322F] text-xl">📊</span>
                  </div>
                  <h3 className="text-[#37322F] text-lg font-semibold mb-2">경기 기록 분석</h3>
                  <p className="text-[#605A57] text-sm leading-relaxed">
                    매치 데이터를 분석하여 강점과 약점을 파악하고 전략을 수립할 수 있습니다.
                  </p>
                    </div>
                  </div>
                </div>

            {/* CTA Section */}
            <div className="w-full max-w-4xl px-4 py-16 text-center">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E0DEDB]">
                <h2 className="text-[#37322F] text-2xl font-semibold mb-4">
                  지금 바로 테니스 실력을 분석해보세요
                </h2>
                <p className="text-[#605A57] text-base mb-6">
                  3단계 질문만으로 정확한 NTRP 레벨과 개선 방향을 확인할 수 있습니다.
                </p>
                <a href="/utility/ntrp-analyzer" className="inline-block h-12 px-8 py-3 bg-[#0BA360] text-white rounded-full hover:bg-[#19C37D] transition-colors font-medium">
                  무료로 분석하기
                </a>
              </div>
            </div>

              {/* Footer Section */}
            <Footer />
            </div>
          </div>
      </div>
    </div>
  )
}