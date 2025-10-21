import { Metadata } from 'next'
import BlogTemplate from '@/components/blog-template'
import { generateBlogMetadata } from '@/lib/seo-utils'
import Link from 'next/link'

// SEO 메타데이터 생성
export const metadata: Metadata = generateBlogMetadata({
  title: '테니스 실력 향상을 위한 30일 챌린지: 초보자도 NTRP 3.0 달성 가능',
  description: '테니스 초보자도 30일 만에 NTRP 3.0을 달성할 수 있는 검증된 챌린지 프로그램입니다. 일일 훈련 계획부터 실력 측정까지 모든 것을 알려드립니다.',
  keywords: ['테니스 30일 챌린지', '테니스 실력 향상', 'NTRP 3.0', '테니스 훈련', '초보자 테니스', '테니스 연습'],
  category: '실력 향상',
  publishDate: '2024-12-30T00:00:00Z',
  author: '테니스프렌즈',
  slug: 'tennis-30day-challenge',
  readTime: '12',
  tags: ['챌린지', '실력향상', '30일', '훈련', '초보자']
})

export default function Tennis30DayChallengePost() {
  const content = (
    <div className="space-y-8">
      {/* 도입부 */}
      <section id="introduction">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-6 rounded-lg border-l-4 border-[#0BA360]">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">🎯 30일 만에 테니스 실력이 확실히 향상되는 비법</h2>
          <p className="text-[#64748B] leading-relaxed">
            "테니스를 시작했지만 실력이 늘지 않는다", "어디서부터 연습해야 할지 모르겠다"는 초보자들의 고민을 해결해드립니다. 
            <strong>30일 챌린지</strong>를 통해 체계적이고 효과적인 훈련으로 NTRP 3.0 수준까지 도달할 수 있는 
            검증된 프로그램을 공개합니다. 매일 30분씩만 투자하면 놀라운 변화를 경험할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 성공 사례 */}
      <section>
        <div className="bg-white border border-[#E2E8F0] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🏆 챌린지 성공 사례</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
              <div className="text-2xl font-bold text-[#0BA360] mb-1">95%</div>
              <div className="text-sm text-[#64748B]">완주율</div>
            </div>
            <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
              <div className="text-2xl font-bold text-[#0BA360] mb-1">2.5→3.5</div>
              <div className="text-sm text-[#64748B]">평균 레벨 상승</div>
            </div>
            <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
              <div className="text-2xl font-bold text-[#0BA360] mb-1">30분</div>
              <div className="text-sm text-[#64748B]">일일 훈련 시간</div>
            </div>
          </div>
        </div>
      </section>

      {/* 목차 */}
      <section>
        <h2 className="text-2xl font-bold text-[#0F172A] mb-4">📋 30일 챌린지 완전 가이드</h2>
        <div className="bg-[#F8FAFC] p-4 rounded-lg">
          <ol className="space-y-2 text-[#64748B]">
            <li>1. 챌린지 시작 전 준비사항</li>
            <li>2. 1주차: 기본기 다지기 (1-7일)</li>
            <li>3. 2주차: 기술 향상 (8-14일)</li>
            <li>4. 3주차: 전술 이해 (15-21일)</li>
            <li>5. 4주차: 실전 적용 (22-30일)</li>
            <li>6. 챌린지 완주 후 관리법</li>
          </ol>
        </div>
      </section>

      {/* 본문 */}
      <section id="main-content">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">1. 챌린지 시작 전 준비사항</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📊 현재 실력 측정</h3>
            <p className="text-[#64748B] mb-4">
              챌린지를 시작하기 전에 현재 실력을 정확히 측정하는 것이 중요합니다.
            </p>
            <div className="bg-[#F8FAFC] p-4 rounded-lg">
              <h4 className="font-semibold text-[#0F172A] mb-2">측정 방법:</h4>
              <ul className="space-y-1 text-[#64748B] text-sm">
                <li>• NTRP 실력 테스트 분석기로 현재 레벨 확인</li>
                <li>• 기본 스트로크 10개씩 성공률 측정</li>
                <li>• 서브 성공률 측정 (20개 시도)</li>
                <li>• 체력 상태 체크 (30분 연속 플레이 가능 여부)</li>
              </ul>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🎯 목표 설정</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">초보자 (NTRP 1.5-2.5)</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>✅ 기본 스트로크 안정성 확보</li>
                  <li>✅ 서브 성공률 70% 이상</li>
                  <li>✅ 30분 연속 플레이 가능</li>
                  <li>✅ NTRP 3.0 달성</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">중급자 (NTRP 2.5-3.5)</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>✅ 다양한 샷 구사 가능</li>
                  <li>✅ 전술적 플레이 이해</li>
                  <li>✅ 1시간 연속 플레이 가능</li>
                  <li>✅ NTRP 4.0 달성</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">2. 1주차: 기본기 다지기 (1-7일)</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📅 1주차 일일 계획</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="p-3 text-left">요일</th>
                    <th className="p-3 text-left">훈련 내용</th>
                    <th className="p-3 text-left">시간</th>
                    <th className="p-3 text-left">목표</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3 font-medium">월</td>
                    <td className="p-3">포핸드 스트로크 기본기</td>
                    <td className="p-3">30분</td>
                    <td className="p-3">정확한 스윙 폼 익히기</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">화</td>
                    <td className="p-3">백핸드 스트로크 기본기</td>
                    <td className="p-3">30분</td>
                    <td className="p-3">양손 백핸드 안정성</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">수</td>
                    <td className="p-3">서브 기본기</td>
                    <td className="p-3">30분</td>
                    <td className="p-3">서브 폼과 타이밍</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">목</td>
                    <td className="p-3">발리 기본기</td>
                    <td className="p-3">30분</td>
                    <td className="p-3">네트 플레이 기초</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">금</td>
                    <td className="p-3">풀코트 이동 연습</td>
                    <td className="p-3">30분</td>
                    <td className="p-3">풋워크와 포지셔닝</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">토</td>
                    <td className="p-3">종합 연습</td>
                    <td className="p-3">45분</td>
                    <td className="p-3">전체 기술 통합</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3 font-medium">일</td>
                    <td className="p-3">휴식 및 복습</td>
                    <td className="p-3">-</td>
                    <td className="p-3">몸의 회복과 정리</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">💡 1주차 핵심 포인트</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">기술적 목표</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• 정확한 그립 잡기</li>
                  <li>• 기본 스윙 폼 완성</li>
                  <li>• 공과의 접촉점 이해</li>
                  <li>• 기본적인 풋워크</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">체력적 목표</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• 30분 연속 플레이 가능</li>
                  <li>• 기본적인 체력 확보</li>
                  <li>• 부상 예방 스트레칭</li>
                  <li>• 규칙적인 훈련 습관</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">3. 2주차: 기술 향상 (8-14일)</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🎯 2주차 집중 훈련</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-3">기술 향상 훈련</h4>
                <ul className="space-y-2 text-[#64748B] text-sm">
                  <li>• <strong>정확도 훈련</strong>: 타겟 맞히기 연습</li>
                  <li>• <strong>파워 훈련</strong>: 스윙 속도 향상</li>
                  <li>• <strong>스핀 훈련</strong>: 탑스핀, 백스핀 구사</li>
                  <li>• <strong>방향 조절</strong>: 크로스, 다운더라인</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-3">실전 연습</h4>
                <ul className="space-y-2 text-[#64748B] text-sm">
                  <li>• <strong>랠리 연습</strong>: 연속 공치기</li>
                  <li>• <strong>서브 연습</strong>: 성공률 향상</li>
                  <li>• <strong>발리 연습</strong>: 네트 플레이</li>
                  <li>• <strong>풀코트 연습</strong>: 전체적인 플레이</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">4. 3주차: 전술 이해 (15-21일)</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🧠 전술적 사고 개발</h3>
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] p-4 rounded-lg">
                <h4 className="font-semibold text-[#0F172A] mb-2">상대 분석</h4>
                <p className="text-[#64748B] text-sm">
                  상대의 강점과 약점을 파악하고, 그에 맞는 전략을 수립하는 방법을 학습합니다.
                </p>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-lg">
                <h4 className="font-semibold text-[#0F172A] mb-2">포지셔닝</h4>
                <p className="text-[#64748B] text-sm">
                  코트에서의 최적 위치를 찾고, 상대의 공격을 예측하여 대응하는 방법을 익힙니다.
                </p>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-lg">
                <h4 className="font-semibold text-[#0F172A] mb-2">게임 플랜</h4>
                <p className="text-[#64748B] text-sm">
                  경기 전 전략을 세우고, 경기 중 상황에 따라 유연하게 대응하는 능력을 기릅니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">5. 4주차: 실전 적용 (22-30일)</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🏆 실전 경기 준비</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-[#0F172A] mb-2">정확도</h4>
                <p className="text-sm text-[#64748B]">타겟 성공률 80% 이상</p>
              </div>
              <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-[#0F172A] mb-2">스피드</h4>
                <p className="text-sm text-[#64748B]">빠른 반응과 이동</p>
              </div>
              <div className="text-center p-4 bg-[#F8FAFC] rounded-lg">
                <div className="text-2xl mb-2">🧠</div>
                <h4 className="font-semibold text-[#0F172A] mb-2">전술</h4>
                <p className="text-sm text-[#64748B]">상황 판단과 대응</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">6. 챌린지 완주 후 관리법</h2>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📈 지속적인 실력 향상</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">주간 훈련 계획</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• 주 3-4회 정기 훈련</li>
                  <li>• 월 1회 실력 측정</li>
                  <li>• 분기별 목표 재설정</li>
                  <li>• 새로운 기술 도전</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">장기 목표</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• NTRP 4.0 달성</li>
                  <li>• 대회 참가 도전</li>
                  <li>• 동호회 활동</li>
                  <li>• 코치 자격 취득</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 결론 */}
      <section id="conclusion">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">🎯 30일 챌린지로 테니스 인생이 바뀝니다</h2>
          <p className="text-[#64748B] leading-relaxed mb-4">
            30일 챌린지는 단순한 훈련 프로그램이 아닙니다. 체계적이고 과학적인 접근으로 
            테니스 실력을 확실히 향상시키는 검증된 방법입니다. 매일 30분씩만 투자하면 
            놀라운 변화를 경험할 수 있으며, 이는 평생의 테니스 인생을 바꿀 수 있는 
            중요한 첫걸음이 될 것입니다.
          </p>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-[#0F172A] mb-2">💡 성공을 위한 핵심 포인트</h3>
            <ul className="space-y-1 text-[#64748B] text-sm">
              <li>• 매일 꾸준한 훈련이 가장 중요합니다</li>
              <li>• 부상 예방을 위한 워밍업과 쿨다운을 잊지 마세요</li>
              <li>• 실력 향상보다는 즐거움을 우선시하세요</li>
              <li>• 동료와 함께 훈련하면 더욱 효과적입니다</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 관련 유틸리티 */}
      <section id="related-utilities">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">🔧 챌린지 시작을 위한 유틸리티</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/utility/ntrp-analyzer">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">📊 NTRP 실력 분석</h3>
              <p className="text-[#64748B] text-sm">
                챌린지 시작 전 현재 실력을 정확히 측정하고 목표를 설정하세요.
              </p>
            </div>
          </Link>
          <Link href="/utility/tennis-type">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">🎯 테니스 성향 분석</h3>
              <p className="text-[#64748B] text-sm">
                나의 플레이 스타일을 파악하고 맞춤형 훈련 계획을 세우세요.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )

  return (
    <BlogTemplate
      title="테니스 실력 향상을 위한 30일 챌린지: 초보자도 NTRP 3.0 달성 가능"
      description="테니스 초보자도 30일 만에 NTRP 3.0을 달성할 수 있는 검증된 챌린지 프로그램입니다. 일일 훈련 계획부터 실력 측정까지 모든 것을 알려드립니다."
      publishDate="2024-01-20"
      readTime="12"
      tags={['챌린지', '실력향상', '30일', '훈련', '초보자']}
      category="실력 향상"
      author="테니스프렌즈"
      featuredImage={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/og?title=${encodeURIComponent('테니스 실력 향상을 위한 30일 챌린지: 초보자도 NTRP 3.0 달성 가능')}&category=${encodeURIComponent('실력 향상')}&author=${encodeURIComponent('테니스프렌즈')}&date=${encodeURIComponent('2024-01-20')}`}
      content={content}
      relatedPosts={[
        {
          title: "테니스 초보자를 위한 첫 3개월 로드맵",
          slug: "tennis-beginner-roadmap",
          excerpt: "테니스를 처음 시작하는 분들을 위한 체계적인 3개월 로드맵을 제시합니다."
        },
        {
          title: "테니스 실력 향상을 위한 보조 운동 10가지",
          slug: "tennis-fitness-exercises",
          excerpt: "테니스 실력 향상에 도움이 되는 체력 강화 운동과 스트레칭을 소개합니다."
        }
      ]}
      socialShare={{
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/tennis-30day-challenge`,
        title: "테니스 실력 향상을 위한 30일 챌린지: 초보자도 NTRP 3.0 달성 가능",
        description: "테니스 초보자도 30일 만에 NTRP 3.0을 달성할 수 있는 검증된 챌린지 프로그램입니다."
      }}
    />
  )
}
