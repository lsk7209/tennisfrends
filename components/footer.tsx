"use client"

import React from "react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[rgba(55,50,47,0.12)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#0BA360] rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🎾</span>
              </div>
              <div className="text-[#49423D] text-xl font-semibold font-pretendard">테니스프렌즈</div>
            </div>
            <p className="text-[rgba(73,66,61,0.80)] text-sm leading-relaxed mb-4">
              테니스 실력 향상을 위한 데이터 기반 플랫폼
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-[#F7F5F3] rounded-full flex items-center justify-center hover:bg-[#0BA360] hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#F7F5F3] rounded-full flex items-center justify-center hover:bg-[#0BA360] hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#F7F5F3] rounded-full flex items-center justify-center hover:bg-[#0BA360] hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.374-12-12-12z"/>
                </svg>
              </a>
            </div>
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

          {/* 회사 */}
          <div>
            <h3 className="text-[rgba(73,66,61,0.50)] text-sm font-medium mb-3">회사</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">소개</Link></li>
              <li><Link href="/team" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">팀</Link></li>
              <li><Link href="/careers" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">채용</Link></li>
              <li><Link href="/brand" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">브랜드</Link></li>
              <li><Link href="/contact" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">문의</Link></li>
            </ul>
          </div>

          {/* 리소스 */}
          <div>
            <h3 className="text-[rgba(73,66,61,0.50)] text-sm font-medium mb-3">리소스</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">이용약관</Link></li>
              <li><Link href="/privacy" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/guide" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">사용 가이드</Link></li>
              <li><Link href="/community" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">커뮤니티</Link></li>
              <li><Link href="/support" className="text-[#49423D] text-sm hover:text-[#0BA360] transition-colors">지원</Link></li>
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
