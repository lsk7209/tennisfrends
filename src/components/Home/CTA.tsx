import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-green to-primary-blue text-white">
      <div className="container-custom text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-h1 font-bold mb-6">
            지금 바로 시작해보세요!
          </h2>
          <p className="text-h3 mb-8 text-gray-100">
            5분만 투자하면 당신의 테니스 실력과 개선 방향을 정확히 파악할 수 있어요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/utility" className="btn bg-white text-primary-green hover:bg-gray-100 text-h3 px-8 py-4">
              🎾 무료로 실력 분석하기
            </Link>
            <Link href="/utility/tennis-type" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-green text-h3 px-8 py-4">
              🧩 테니스 성향 알아보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-sub font-bold mb-2">빠른 분석</h3>
              <p className="text-cap text-gray-200">3단계 질문으로 5분 내 완료</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-sub font-bold mb-2">정확한 결과</h3>
              <p className="text-cap text-gray-200">구체적인 개선 방향 제시</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-6">
              <div className="text-3xl mb-3">🆓</div>
              <h3 className="text-sub font-bold mb-2">완전 무료</h3>
              <p className="text-cap text-gray-200">회원가입 없이 바로 사용</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
