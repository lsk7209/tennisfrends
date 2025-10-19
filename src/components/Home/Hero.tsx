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
    <section className="relative py-20 md:py-32" style={{background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'}}>
      <div className="container-custom text-center">
        <div className="max-w-4xl mx-auto">
          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span style={{color: 'var(--neutral-ink)'}}>당신의 테니스,</span>
            <br />
            <span style={{color: 'var(--primary-green)'}}>분석해드립니다</span>
          </h1>
          
          {/* 서브헤드라인 */}
          <p className="text-xl mb-12" style={{color: 'var(--neutral-sub)'}}>
            성향 테스트부터 라켓 추천, 실력 분석까지.<br />
            한 번에, 무료로.
          </p>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/utility" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--primary-green)',
                color: 'white',
                boxShadow: '0 4px 14px 0 rgba(11, 163, 96, 0.3)'
              }}
            >
              지금 시작하기 →
            </Link>
            <Link 
              href="/utility" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: 'var(--primary-green)',
                color: 'var(--primary-green)',
                backgroundColor: 'white'
              }}
            >
              모든 테스트 보기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
