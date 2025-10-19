'use client';

import Link from 'next/link';

export default function Hero() {
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return '새벽 테니스는 어떠세요? 🌙';
    if (hour < 12) return '좋은 아침입니다! ☀️';
    if (hour < 18) return '오후 테니스 준비되셨나요? 🎾';
    return '저녁 테니스 어떠세요? 🌅';
  };

  return (
    <section className="relative py-24 md:py-32 text-white overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0" style={{background: 'var(--gradient-hero)'}}></div>
      
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-white animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 rounded-full bg-white animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container-custom text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* 시간대 인삿말 */}
          <p className="text-lg md:text-xl mb-6 animate-fade-up text-white/90">
            {getTimeBasedGreeting()}
          </p>
          
          {/* 메인 헤드라인 */}
          <h1 className="text-responsive-xl font-black mb-8 animate-fade-up leading-tight">
            5분만에 내 테니스의
            <br />
            <span className="text-gradient bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              다음 3가지 행동
            </span>을 알려드려요
          </h1>
          
          {/* 서브헤드라인 */}
          <p className="text-responsive mb-12 text-white/80 max-w-3xl mx-auto animate-fade-up">
            이미지 없이 텍스트·모션·이모지 기반으로<br />
            테니스 데이터를 자동 수집하고 분석하는 스마트 허브
          </p>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-up">
            <Link href="/utility" className="btn btn-primary btn-lg text-lg px-8 py-4 shadow-xl">
              🎯 실력 분석 시작하기
            </Link>
            <Link href="/utility/tennis-type" className="btn btn-secondary btn-lg text-lg px-8 py-4">
              🧩 테니스 성향 알아보기
            </Link>
          </div>
          
          {/* 미션 설명 */}
          <div className="glass rounded-3xl p-8 md:p-12 animate-fade-up">
            <p className="text-lg text-white/90 leading-relaxed">
              <strong className="text-white">테니스프렌즈의 미션:</strong> 초급자부터 상급자까지, 
              누구나 쉽고 정확하게 자신의 테니스 실력과 개선 방향을 파악할 수 있도록 돕습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
