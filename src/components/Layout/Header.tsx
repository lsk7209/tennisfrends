'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: '홈', href: '/' },
    { name: '유틸리티', href: '/utility' },
    { name: '장비 백과', href: '/gear' },
    { name: '블로그', href: '/blog' },
    { name: '소개', href: '/about' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50" style={{borderBottom: '1px solid var(--neutral-border)'}}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎾</span>
            <span className="text-xl font-bold" style={{color: 'var(--neutral-ink)'}}>테니스프렌즈</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm transition-colors"
                style={{color: 'var(--neutral-sub)'}}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/utility" className="btn-primary">
              실력 분석하기
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-border py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sub text-neutral-sub hover:text-neutral-ink transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/utility"
                className="btn-primary w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                실력 분석하기
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
