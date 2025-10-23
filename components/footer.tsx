"use client"

import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[rgba(55,50,47,0.12)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#0BA360] rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🎾</span>
              </div>
              <div className="text-[#49423D] text-xl font-semibold font-pretendard">테니스프렌즈</div>
            </div>
            <p className="text-[rgba(73,66,61,0.80)] text-sm leading-relaxed mb-4">
              테니스 실력 향상을 위한 데이터 기반 플랫폼
            </p>
          </div>

          {/* 유틸리티 */}
          <div>
            <h3 className="text-[rgba(73,66,61,0.50)] text-sm font-medium mb-3">유틸리티</h3>
            <ul className="space-y-2">
              <li><Link href="/utility/ntrp-analyzer" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">NTRP 실력 분석</Link></li>
              <li><Link href="/utility/tennis-type" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">테니스 성향 분석</Link></li>
              <li><Link href="/utility" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">라켓 추천</Link></li>
              <li><Link href="/utility" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">경기 기록 분석</Link></li>
              <li><Link href="/utility" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">스트링 텐션 계산</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[rgba(55,50,47,0.12)] mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[rgba(73,66,61,0.60)] text-sm">
              © 2024 테니스프렌즈. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-[rgba(73,66,61,0.60)] text-sm hover:text-[#0BA360] transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="text-[rgba(73,66,61,0.60)] text-sm hover:text-[#0BA360] transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
