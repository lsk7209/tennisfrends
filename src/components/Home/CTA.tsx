import Link from 'next/link';

export default function CTA() {
  return (
    <section 
      className="text-center py-20 relative overflow-hidden"
      style={{background: 'linear-gradient(135deg, var(--primary-green) 0%, var(--primary-blue) 100%)'}}
    >
      {/* 배경 아이콘 */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/50 rounded-full"></div>
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          지금 바로 시작해보세요
        </h2>
        <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
          무료로 제공되는 모든 테스트와 분석 도구를 활용해<br />
          더 나은 테니스 플레이어가 되어보세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/utility" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 bg-white"
            style={{color: 'var(--primary-green)'}}
          >
            모든 테스트 보기 →
          </Link>
          <Link 
            href="/utility/skill-analyzer" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white text-white transition-all duration-300 hover:scale-105"
          >
            실력 테스트 시작
          </Link>
        </div>
      </div>
    </section>
  );
}