import { Metadata } from "next";
import BlogTemplate from "@/components/blog-template";
import Link from "next/link";

export const metadata: Metadata = {
  title: "테니스 코트별 플레이 전략 (하드·클레이·잔디 비교) | 테니스프렌즈 블로그",
  description: "하드·클레이·잔디 코트의 특징과 전략을 완벽 비교. 각 코트별 공의 반응, 발리 타이밍, 경기 운영법까지 실전 중심으로 정리했습니다.",
  keywords: ["테니스 코트", "하드코트 전략", "클레이코트 경기", "잔디코트 플레이", "테니스 대회 코트"],
  openGraph: {
    title: "테니스 코트별 플레이 전략 (하드·클레이·잔디 비교) | 테니스프렌즈 블로그",
    description: "하드·클레이·잔디 코트의 특징과 전략을 완벽 비교. 각 코트별 공의 반응, 발리 타이밍, 경기 운영법까지 실전 중심으로 정리했습니다.",
    type: "article",
    publishedTime: "2025-10-20T00:00:00.000Z",
    modifiedTime: "2025-10-20T00:00:00.000Z",
    authors: ["TennisFriends"],
    tags: ["테니스 코트", "하드코트 전략", "클레이코트 경기", "잔디코트 플레이", "테니스 대회 코트"],
  },
  twitter: {
    card: "summary_large_image",
    title: "테니스 코트별 플레이 전략 (하드·클레이·잔디 비교) | 테니스프렌즈 블로그",
    description: "하드·클레이·잔디 코트의 특징과 전략을 완벽 비교. 각 코트별 공의 반응, 발리 타이밍, 경기 운영법까지 실전 중심으로 정리했습니다.",
  },
  alternates: {
    canonical: "https://tennisfriends.kr/blog/tennis-court-strategy-guide",
  },
};

export default function TennisCourtStrategyGuidePage() {
  const content = (
    <div className="space-y-8">
      {/* 도입부 */}
      <section id="introduction">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-8 rounded-xl border-l-4 border-[#0BA360] mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">🎾 코트가 달라지면 게임이 달라집니다</h2>
          <p className="text-[#64748B] leading-relaxed text-lg">
            코트의 종류는 단순한 표면의 차이가 아닙니다. 공의 속도, 반발력, 체력 소모까지 모두 다릅니다. 
            한 가지 스타일로 모든 코트에서 이길 수는 없습니다. <strong>코트에 따라 전략을 조정하는 것이 진짜 실력의 기준</strong>입니다.
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
              코트별 기본 특징 이해하기
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              하드코트 전략 - 밸런스와 타이밍
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              클레이코트 전략 - 인내와 회전
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              잔디코트 전략 - 감각과 반사신경
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              초보자를 위한 코트 선택 가이드
            </li>
          </ol>
        </div>
      </section>

      {/* 본문 */}
      <section id="main-content">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">1. 코트별 기본 특징 이해하기</h2>
        
        <div className="bg-[#F8FAFC] p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">💡 코트별 전략의 핵심 원칙</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">속도 적응</h4>
              <p className="text-sm text-[#64748B]">코트별 공의 속도에 맞춘 플레이</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">체력 관리</h4>
              <p className="text-sm text-[#64748B]">코트별 체력 소모량 고려</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">기술 조정</h4>
              <p className="text-sm text-[#64748B]">코트에 맞는 기술 선택</p>
            </div>
          </div>
        </div>

        <div className="border border-[#E2E8F0] rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📊 코트별 특징 비교</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="p-3 text-left">코트 종류</th>
                  <th className="p-3 text-left">속도</th>
                  <th className="p-3 text-left">바운드</th>
                  <th className="p-3 text-left">체력 소모</th>
                  <th className="p-3 text-left">대표 대회</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-medium text-blue-600">하드코트</td>
                  <td className="p-3">빠름</td>
                  <td className="p-3">중간</td>
                  <td className="p-3">중간</td>
                  <td className="p-3">US 오픈, 호주 오픈</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium text-orange-600">클레이코트</td>
                  <td className="p-3">느림</td>
                  <td className="p-3">높음</td>
                  <td className="p-3">높음</td>
                  <td className="p-3">프랑스 오픈</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium text-green-600">잔디코트</td>
                  <td className="p-3">매우 빠름</td>
                  <td className="p-3">낮음</td>
                  <td className="p-3">낮음</td>
                  <td className="p-3">윔블던</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">2. 하드코트 전략 - 밸런스와 타이밍</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🧱 하드코트의 특징</h3>
            <p className="text-[#64748B] mb-4">
              하드코트는 공의 반발력이 높고 바운드가 일정합니다. 파워와 정확성이 동시에 필요하죠.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>속도</strong>: 빠른 공의 움직임</li>
              <li>• <strong>바운드</strong>: 일정하고 예측 가능</li>
              <li>• <strong>체력</strong>: 중간 수준의 소모</li>
              <li>• <strong>부상</strong>: 무릎 충격 주의</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">⚙️ 하드코트 전략</h3>
            <p className="text-[#64748B] mb-4">
              짧은 랠리와 공격적인 플레이가 핵심입니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>서브</strong>: 공격적인 첫 서브</li>
              <li>• <strong>리턴</strong>: 빠른 리턴으로 압박</li>
              <li>• <strong>랠리</strong>: 짧고 강력한 랠리</li>
              <li>• <strong>포지션</strong>: 베이스라인 중심</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">💡 테니스프렌즈 하드코트 팁</h3>
          <p className="text-blue-700 mb-4">
            하드코트는 무릎 충격이 크므로 경기 전 워밍업 루틴을 필수로 하세요. 
            특히 무릎과 발목 관절을 충분히 준비하는 것이 중요합니다.
          </p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800 font-semibold mb-0">🎯 핵심: "하드코트에서는 타이밍이 생명이다. 빠른 판단과 정확한 실행이 승부를 좌우한다."</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">3. 클레이코트 전략 - 인내와 회전</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🧱 클레이코트의 특징</h3>
            <p className="text-[#64748B] mb-4">
              클레이는 공이 느리게 튀고, 긴 랠리가 기본입니다. 수비형 플레이어에게 유리한 코트죠.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>속도</strong>: 느린 공의 움직임</li>
              <li>• <strong>바운드</strong>: 높고 불규칙적</li>
              <li>• <strong>체력</strong>: 높은 체력 소모</li>
              <li>• <strong>스핀</strong>: 회전 효과 극대화</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">⚙️ 클레이코트 전략</h3>
            <p className="text-[#64748B] mb-4">
              인내심과 지속력이 필요한 코트입니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>탑스핀</strong>: 깊은 탑스핀 활용</li>
              <li>• <strong>포지션</strong>: 베이스라인 중심</li>
              <li>• <strong>체력</strong>: 체력 분배 중요</li>
              <li>• <strong>심리</strong>: 인내심과 집중력</li>
            </ul>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-orange-800 mb-4">💡 테니스프렌즈 클레이코트 팁</h3>
          <p className="text-orange-700 mb-4">
            "클레이에서는 힘보다 지속이, 속도보다 집중이 중요합니다." 
            긴 랠리를 준비하고 체력을 분배하는 것이 핵심입니다.
          </p>
          <div className="bg-orange-100 p-4 rounded-lg">
            <p className="text-orange-800 font-semibold mb-0">🎯 핵심: "클레이는 마라톤이다. 끝까지 버티는 자가 승리한다."</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">4. 잔디코트 전략 - 감각과 반사신경</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🌿 잔디코트의 특징</h3>
            <p className="text-[#64748B] mb-4">
              잔디는 공의 바운드가 낮고 예측이 어렵습니다. 서브 앤 발리가 핵심입니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>속도</strong>: 매우 빠른 공</li>
              <li>• <strong>바운드</strong>: 낮고 불규칙적</li>
              <li>• <strong>체력</strong>: 낮은 체력 소모</li>
              <li>• <strong>기술</strong>: 서브 앤 발리</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">⚙️ 잔디코트 전략</h3>
            <p className="text-[#64748B] mb-4">
              빠른 판단과 순발력이 필요한 코트입니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>서브</strong>: 높은 첫 서브 성공률</li>
              <li>• <strong>발리</strong>: 발리로 마무리</li>
              <li>• <strong>랠리</strong>: 짧고 빠른 랠리</li>
              <li>• <strong>포지션</strong>: 네트 근처</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-green-800 mb-4">💡 테니스프렌즈 잔디코트 팁</h3>
          <p className="text-green-700 mb-4">
            잔디는 미끄러지기 쉬우니 체중 이동 시 중심을 낮추세요. 
            첫 서브 성공률을 높이고, 발리로 마무리하는 것이 핵심입니다.
          </p>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800 font-semibold mb-0">🎯 핵심: "잔디는 스프린트다. 빠른 판단과 실행이 승부를 좌우한다."</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">5. 초보자를 위한 코트 선택 가이드</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">❓ 어떤 코트가 초보자에게 유리한가요?</h3>
            <p className="text-[#64748B] mb-4">
              <strong>답변:</strong> 초보자에게는 하드코트가 가장 좋습니다. 반발이 일정해 타이밍을 배우기 쉽고, 라켓 감각을 익히기 좋습니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">하드코트 추천 이유</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>✅ 일정한 바운드</li>
                  <li>✅ 타이밍 배우기 쉬움</li>
                  <li>✅ 라켓 감각 익히기 좋음</li>
                  <li>✅ 접근성 좋음</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">다른 코트의 장점</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• 클레이: 회전 감각 개발</li>
                  <li>• 잔디: 순발력 향상</li>
                  <li>• 다양한 경험 추천</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">❓ 코트별 장비 세팅도 달라야 하나요?</h3>
            <p className="text-[#64748B] mb-4">
              <strong>답변:</strong> 네. 하드코트는 텐션을 1~2lbs 높이고, 클레이는 낮춰야 합니다. 잔디에서는 그립감이 좋은 라켓을 추천합니다.
            </p>
            <div className="bg-[#F8FAFC] p-4 rounded-lg">
              <h4 className="font-semibold text-[#0F172A] mb-2">🎾 테니스프렌즈 팁</h4>
              <p className="text-[#64748B] text-sm mb-0">
                스트링 텐션 계산기로 코트별 최적 텐션을 확인하세요. 
                <Link href="/utility/string-tension" className="text-[#0BA360] hover:underline font-medium">스트링 텐션 계산기</Link>에서 
                자신에게 맞는 설정을 찾아보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 결론 */}
      <section id="conclusion">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">🏁 코트를 이해하면 게임이 보인다</h2>
          <p className="text-[#64748B] leading-relaxed mb-4">
            테니스는 환경 적응의 스포츠입니다. 코트의 차이를 이해하면, 같은 실력으로도 완전히 다른 결과를 낼 수 있습니다. 
            각 코트의 특성을 파악하고 그에 맞는 전략을 세우는 것이 진정한 실력 향상의 열쇠입니다.
          </p>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-[#0F172A] mb-2">💡 테니스프렌즈 Tip</h3>
            <p className="text-[#64748B] text-sm mb-0">
              오늘은 "코트가 나에게 맞지 않는다"가 아니라 "나는 이 코트를 배운다"로 바꿔보세요. 
              성장 속도가 달라집니다.
            </p>
          </div>
        </div>
      </section>

      {/* 관련 유틸리티 */}
      <section id="related-utilities">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">🔧 관련 유틸리티</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/utility/court-finder">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">🎾 코트 찾기</h3>
              <p className="text-[#64748B] text-sm">
                지역별 테니스 코트 정보를 확인하고 최적의 코트를 찾아보세요.
              </p>
            </div>
          </Link>
          <Link href="/utility/ntrp-analyzer">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">📊 NTRP 실력 분석</h3>
              <p className="text-[#64748B] text-sm">
                현재 실력을 정확히 측정하고 코트별 맞춤 전략을 받아보세요.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );

  return (
    <BlogTemplate
      title="테니스 코트별 플레이 전략 🎾 (하드·클레이·잔디 완벽 비교 가이드)"
      description="코트가 달라지면 게임이 달라집니다. 하드·클레이·잔디 코트의 속도, 반응, 전략 차이를 이해하면 경기력은 한 단계 높아집니다."
      publishDate="2025-10-20T00:00:00.000Z"
      readTime="7"
      category="strategy"
      tags={["테니스코트", "하드코트", "클레이코트", "잔디코트", "테니스전략"]}
      author="TennisFriends"
      socialShare={{
        url: "https://tennisfriends.kr/blog/tennis-court-strategy-guide",
        title: "테니스 코트별 플레이 전략 (하드·클레이·잔디 완벽 비교 가이드)",
        description: "코트가 달라지면 게임이 달라집니다. 하드·클레이·잔디 코트의 속도, 반응, 전략 차이를 이해하면 경기력은 한 단계 높아집니다."
      }}
      content={content}
      relatedPosts={[
        {
          title: "혼자서 실력 올리는 테니스 훈련 루틴",
          slug: "solo-tennis-training-routine",
          excerpt: "코트 없이도 실력을 높이는 혼자 훈련 루틴 5가지. 벽치기, 리듬, 밸런스, 코어 트레이닝 등 실전 루틴 정리."
        },
        {
          title: "초보자를 위한 테니스 라켓 선택 가이드",
          slug: "tennis-racket-selection",
          excerpt: "테니스 초보자도 5분만에 자신에게 맞는 라켓을 선택할 수 있는 완벽한 가이드입니다."
        }
      ]}
    />
  );
}