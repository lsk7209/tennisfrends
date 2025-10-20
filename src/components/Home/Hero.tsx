'use client';

import Link from 'next/link';

export default function Hero() {

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* 모던 배경 그라데이션 */}
      <div className="absolute inset-0" style={{background: 'var(--gradient-hero)'}}></div>
      
      {/* 애니메이션 배경 요소들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse" style={{background: 'var(--gradient-secondary)'}}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s', background: 'var(--gradient-accent)'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s', background: 'var(--gradient-primary)'}}></div>
      </div>
      
      <div className="container-custom text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* 메인 헤드라인 */}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="text-white drop-shadow-lg">당신의 테니스,</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              분석해드립니다
            </span>
          </h1>
          
          {/* 서브헤드라인 */}
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
            성향 테스트부터 라켓 추천, 실력 분석까지.<br />
            <span className="font-semibold">한 번에, 무료로.</span>
          </p>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/utility" 
              className="btn btn-primary text-lg px-10 py-5 shadow-2xl"
            >
              🚀 지금 시작하기 →
            </Link>
            <Link 
              href="/utility" 
              className="inline-flex items-center justify-center px-10 py-5 rounded-2xl font-semibold text-lg border-2 border-white/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              모든 테스트 보기
            </Link>
          </div>
          
          {/* 통계 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">3분</div>
              <div className="text-white/80">평균 분석 시간</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80">무료 서비스</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">7가지</div>
              <div className="text-white/80">분석 도구</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
