"use client"

import React from "react"

export default function Header() {
  return (
    <div className="w-full h-16 flex justify-center items-center z-20 px-6 bg-[#F7F5F3] border-b border-[rgba(55,50,47,0.12)]">
      <div className="w-full max-w-6xl h-12 py-2 px-4 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
        <div className="flex justify-center items-center">
          <a href="/" className="flex justify-start items-center hover:opacity-80 transition-opacity">
            <div className="flex flex-col justify-center text-[#2F3037] text-lg font-medium leading-5 font-pretendard">
              테니스프렌즈
            </div>
          </a>
        </div>
        <div className="h-8 flex justify-start items-start gap-3">
          <a href="/blog" className="px-4 py-2 text-[#37322F] hover:text-[#0BA360] transition-colors text-sm font-medium font-pretendard">
            블로그
          </a>
          <a href="/utility" className="px-4 py-2 text-[#37322F] hover:text-[#0BA360] transition-colors text-sm font-medium font-pretendard">
            유틸리티
          </a>
          <a href="/admin" className="px-4 py-2 text-[#37322F] hover:text-[#0BA360] transition-colors text-sm font-medium font-pretendard">
            관리자
          </a>
          <a href="/test" className="px-4 py-2 bg-[#0BA360] text-white rounded-full hover:bg-[#19C37D] transition-colors text-sm font-medium font-pretendard">
            NTRP 실력 테스트
          </a>
          <a href="/injury-risk" className="px-4 py-2 bg-[#2364AA] text-white rounded-full hover:bg-[#3D8BFF] transition-colors text-sm font-medium font-pretendard">
            부상 체크
          </a>
        </div>
      </div>
    </div>
  )
}