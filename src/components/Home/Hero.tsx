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
    <section className="py-20 text-white" style={{background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-blue) 100%)'}}>
      <div className="container-custom text-center">
        <div className="max-w-4xl mx-auto">
          {/* 시간대 인삿말 */}
          <p className="text-xl mb-4">
            {getTimeBasedGreeting()}
          </p>
          
          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            5분만에 내 테니스의
            <br />
            <span style={{color: 'var(--accent-lime)'}}>다음 3가지 행동</span>을 알려드려요
          </h1>
          
          {/* 서브헤드라인 */}
          <p className="text-xl mb-8 text-gray-100">
            이미지 없이 텍스트·모션·이모지 기반으로<br />
            테니스 데이터를 자동 수집하고 분석하는 스마트 허브
          </p>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/utility" className="btn bg-white px-8 py-4" style={{color: 'var(--primary-green)'}}>
              🎯 실력 분석 시작하기
            </Link>
            <Link href="/utility/tennis-type" className="btn border-2 border-white text-white px-8 py-4 hover:bg-white" style={{'--hover-color': 'var(--primary-green)'} as any}>
              🧩 테니스 성향 알아보기
            </Link>
          </div>
          
          {/* 미션 설명 */}
          <div className="mt-12 p-6 rounded-2xl" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)'}}>
            <p className="text-base text-gray-100">
              <strong>테니스프렌즈의 미션:</strong> 초급자부터 상급자까지, 
              누구나 쉽고 정확하게 자신의 테니스 실력과 개선 방향을 파악할 수 있도록 돕습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
