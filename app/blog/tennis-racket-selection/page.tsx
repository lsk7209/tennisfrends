import { Metadata } from 'next'
import BlogTemplate from '@/components/blog-template'
import { generateBlogMetadata } from '@/lib/seo-utils'
import Link from 'next/link'

// SEO 메타데이터 생성
export const metadata: Metadata = generateBlogMetadata({
  title: '초보자를 위한 테니스 라켓 선택 완벽 가이드 2024',
  description: '테니스 초보자도 5분만에 자신에게 맞는 라켓을 선택할 수 있는 완벽한 가이드입니다. 헤드 크기, 무게, 밸런스부터 브랜드별 추천까지 모든 것을 알려드립니다.',
  keywords: ['테니스 라켓', '초보자', '라켓 선택', '테니스 장비', '라켓 추천', '테니스 기초'],
  category: '장비 & 기어',
  publishDate: '2025-01-06',
  author: '테니스프렌즈',
  slug: 'tennis-racket-selection',
  readTime: '8',
  tags: ['라켓', '초보자', '장비', '가이드', '추천']
})

export default function TennisRacketSelectionPost() {
  const content = (
    <div className="space-y-8">
      {/* 도입부 */}
      <section id="introduction">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-8 rounded-xl border-l-4 border-[#0BA360] mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">🎾 테니스 라켓 선택이 실력 향상의 첫걸음</h2>
          <p className="text-[#64748B] leading-relaxed text-lg">
            테니스를 시작하려는 초보자들이 가장 먼저 고민하는 것이 바로 <strong>라켓 선택</strong>입니다. 
            잘못된 라켓 선택은 실력 향상을 방해할 뿐만 아니라 부상의 원인이 되기도 합니다. 
            이 가이드에서는 초보자도 쉽게 이해할 수 있도록 테니스 라켓 선택의 모든 것을 알려드립니다.
          </p>
        </div>
      </section>

      {/* 목차 */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">📋 목차</h2>
        <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
          <ol className="space-y-3 text-[#64748B] text-lg">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              테니스 라켓의 기본 구조 이해하기
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              초보자를 위한 라켓 스펙 선택 가이드
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              브랜드별 특징과 추천 모델
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              라켓 구매 시 주의사항
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              초보자 맞춤형 라켓 추천 TOP 5
            </li>
          </ol>
        </div>
      </section>

      {/* 본문 */}
      <section id="main-content">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">1. 테니스 라켓의 기본 구조 이해하기</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🏸 라켓 헤드 (Head)</h3>
            <p className="text-[#64748B] mb-4">
              라켓의 가장 중요한 부분으로, 공과 접촉하는 면적을 결정합니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>헤드 크기</strong>: 95-110 sq.in (제곱인치)</li>
              <li>• <strong>초보자 추천</strong>: 100-110 sq.in</li>
              <li>• <strong>이유</strong>: 스윙 미스 시에도 공을 맞출 확률이 높음</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">⚖️ 라켓 무게 (Weight)</h3>
            <p className="text-[#64748B] mb-4">
              라켓의 무게는 파워와 컨트롤에 직접적인 영향을 미칩니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>초보자 추천</strong>: 260-280g</li>
              <li>• <strong>여성 초보자</strong>: 250-270g</li>
              <li>• <strong>남성 초보자</strong>: 270-290g</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#F8FAFC] p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">💡 초보자를 위한 라켓 선택 핵심 원칙</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">안정성 우선</h4>
              <p className="text-sm text-[#64748B]">파워보다는 컨트롤과 안정성을 중시</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">부상 예방</h4>
              <p className="text-sm text-[#64748B]">무거운 라켓은 부상 위험 증가</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">성장 고려</h4>
              <p className="text-sm text-[#64748B]">실력 향상에 맞춰 업그레이드 가능</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">2. 초보자를 위한 라켓 스펙 선택 가이드</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📏 헤드 크기별 특징</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="p-3 text-left">헤드 크기</th>
                    <th className="p-3 text-left">특징</th>
                    <th className="p-3 text-left">추천 대상</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3 font-medium">95-98 sq.in</td>
                    <td className="p-3">정확한 컨트롤, 높은 기술 요구</td>
                    <td className="p-3">고급자</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">100-105 sq.in</td>
                    <td className="p-3">균형잡힌 파워와 컨트롤</td>
                    <td className="p-3">중급자</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">107-110 sq.in</td>
                    <td className="p-3">넓은 스윙존, 쉬운 플레이</td>
                    <td className="p-3">초보자</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">⚖️ 무게별 특징</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">가벼운 라켓 (250-270g)</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>✅ 빠른 스윙 속도</li>
                  <li>✅ 부상 위험 낮음</li>
                  <li>❌ 파워 부족</li>
                  <li>❌ 진동 전달 많음</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">무거운 라켓 (280-300g)</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>✅ 강한 파워</li>
                  <li>✅ 안정적인 플레이</li>
                  <li>❌ 느린 스윙 속도</li>
                  <li>❌ 부상 위험 높음</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">3. 브랜드별 특징과 추천 모델</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🏆 Wilson</h3>
            <p className="text-[#64748B] mb-4">
              세계적인 테니스 브랜드로, 다양한 레벨의 플레이어를 위한 라켓을 제공합니다.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">초보자 추천:</span>
                <span className="text-sm text-[#0BA360]">Wilson Clash 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">가격대:</span>
                <span className="text-sm">15-25만원</span>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🎯 Babolat</h3>
            <p className="text-[#64748B] mb-4">
              프랑스 브랜드로, 파워와 스핀에 특화된 라켓으로 유명합니다.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">초보자 추천:</span>
                <span className="text-sm text-[#0BA360]">Babolat Pure Drive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">가격대:</span>
                <span className="text-sm">18-28만원</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">4. 초보자 맞춤형 라켓 추천 TOP 5</h2>
        
        <div className="space-y-4">
          {[
            {
              rank: 1,
              name: "Wilson Clash 100",
              price: "22만원",
              features: ["부드러운 플레이", "부상 예방", "컨트롤 우수"],
              rating: 4.8
            },
            {
              rank: 2,
              name: "Babolat Pure Drive",
              price: "25만원",
              features: ["강한 파워", "스핀 효과", "안정성"],
              rating: 4.7
            },
            {
              rank: 3,
              name: "Head Speed MP",
              price: "20만원",
              features: ["균형잡힌 성능", "다양한 레벨", "가성비"],
              rating: 4.6
            },
            {
              rank: 4,
              name: "Yonex EZONE 100",
              price: "23만원",
              features: ["넓은 스윙존", "편안한 그립", "내구성"],
              rating: 4.5
            },
            {
              rank: 5,
              name: "Prince Textreme Warrior",
              price: "18만원",
              features: ["경량화", "부드러운 플레이", "가격 대비 성능"],
              rating: 4.4
            }
          ].map((racket) => (
            <div key={racket.rank} className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#0BA360] text-white rounded-full flex items-center justify-center font-bold">
                    {racket.rank}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">{racket.name}</h3>
                    <p className="text-[#0BA360] font-medium">{racket.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium">{racket.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {racket.features.map((feature, index) => (
                  <span key={index} className="px-3 py-1 bg-[#0BA360]/10 text-[#0BA360] text-sm rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 결론 */}
      <section id="conclusion">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">🎯 올바른 라켓 선택으로 테니스 실력 향상하기</h2>
          <p className="text-[#64748B] leading-relaxed mb-4">
            테니스 라켓 선택은 단순히 브랜드나 가격만 고려하는 것이 아닙니다. 
            자신의 체력, 플레이 스타일, 그리고 실력 레벨을 종합적으로 고려해야 합니다. 
            초보자라면 안정성과 컨트롤을 우선시하는 라켓을 선택하여 부상 없이 즐겁게 테니스를 시작하세요.
          </p>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-[#0F172A] mb-2">💡 기억하세요!</h3>
            <ul className="space-y-1 text-[#64748B] text-sm">
              <li>• 라켓은 직접 써보고 구매하는 것이 가장 좋습니다</li>
              <li>• 초보자라면 렌탈을 통해 다양한 라켓을 경험해보세요</li>
              <li>• 실력이 향상되면 라켓도 함께 업그레이드하세요</li>
              <li>• 라켓보다 중요한 것은 꾸준한 연습입니다</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 관련 유틸리티 */}
      <section id="related-utilities">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">🔧 관련 유틸리티</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/utility/racket-recommender">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">🎾 라켓 추천 시스템</h3>
              <p className="text-[#64748B] text-sm">
                나의 체격과 플레이 스타일에 맞는 최적의 라켓을 추천받으세요.
              </p>
            </div>
          </Link>
          <Link href="/utility/ntrp-analyzer">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">📊 NTRP 실력 분석</h3>
              <p className="text-[#64748B] text-sm">
                현재 실력을 정확히 측정하고 맞춤형 라켓 추천을 받으세요.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )

  return (
    <BlogTemplate
      title="초보자를 위한 테니스 라켓 선택 완벽 가이드 2024"
      description="테니스 초보자도 5분만에 자신에게 맞는 라켓을 선택할 수 있는 완벽한 가이드입니다. 헤드 크기, 무게, 밸런스부터 브랜드별 추천까지 모든 것을 알려드립니다."
      publishDate="2025-01-06"
      readTime="8"
      tags={['라켓', '초보자', '장비', '가이드', '추천']}
      category="장비 & 기어"
      author="테니스프렌즈"
      featuredImage={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/og?title=${encodeURIComponent('초보자를 위한 테니스 라켓 선택 완벽 가이드 2024')}&category=${encodeURIComponent('장비 & 기어')}&author=${encodeURIComponent('테니스프렌즈')}&date=${encodeURIComponent('2024-01-15')}`}
      content={content}
      relatedPosts={[
        {
          title: "테니스 스트링 종류별 특징과 선택 가이드",
          slug: "tennis-string-guide",
          excerpt: "테니스 스트링의 종류와 특징을 알아보고 자신에게 맞는 스트링을 선택하는 방법을 알려드립니다."
        },
        {
          title: "테니스 신발 선택 가이드: 코트 타입별 추천",
          slug: "tennis-shoes-guide",
          excerpt: "테니스 신발의 중요성과 코트 타입별 추천 신발을 소개합니다."
        }
      ]}
      socialShare={{
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/tennis-racket-selection`,
        title: "초보자를 위한 테니스 라켓 선택 완벽 가이드 2024",
        description: "테니스 초보자도 5분만에 자신에게 맞는 라켓을 선택할 수 있는 완벽한 가이드입니다."
      }}
    />
  )
}
