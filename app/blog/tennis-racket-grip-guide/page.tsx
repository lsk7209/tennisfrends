import { Metadata } from "next";
import BlogTemplate from "@/components/blog-template";
import Link from "next/link";

export const metadata: Metadata = {
  title: "내 손에 맞는 라켓 그립 찾는 법 | 테니스프렌즈 블로그",
  description: "그립 두께·감각·소재별 특징을 통해 손에 딱 맞는 라켓 그립을 선택하는 법. 손목 부상 방지와 스윙 안정성을 높이는 실전 가이드.",
  keywords: ["테니스 그립", "라켓 그립 두께", "테니스 손목 부상", "테니스 장비 추천"],
  openGraph: {
    title: "내 손에 맞는 라켓 그립 찾는 법 | 테니스프렌즈 블로그",
    description: "그립 두께·감각·소재별 특징을 통해 손에 딱 맞는 라켓 그립을 선택하는 법. 손목 부상 방지와 스윙 안정성을 높이는 실전 가이드.",
    type: "article",
    publishedTime: "2025-10-20T00:00:00.000Z",
    modifiedTime: "2025-10-20T00:00:00.000Z",
    authors: ["TennisFriends"],
    tags: ["테니스 그립", "라켓 그립 두께", "테니스 손목 부상", "테니스 장비 추천"],
  },
  twitter: {
    card: "summary_large_image",
    title: "내 손에 맞는 라켓 그립 찾는 법 | 테니스프렌즈 블로그",
    description: "그립 두께·감각·소재별 특징을 통해 손에 딱 맞는 라켓 그립을 선택하는 법. 손목 부상 방지와 스윙 안정성을 높이는 실전 가이드.",
  },
  alternates: {
    canonical: "https://tennisfriends.kr/blog/tennis-racket-grip-guide",
  },
};

export default function TennisRacketGripGuidePage() {
  const content = (
    <div className="space-y-8">
      {/* 도입부 */}
      <section id="introduction">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-8 rounded-xl border-l-4 border-[#0BA360] mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">✋ 그립은 테니스의 감각 중심</h2>
          <p className="text-[#64748B] leading-relaxed text-lg">
            테니스 실력은 라켓에서 나오지 않습니다. <strong>'라켓을 어떻게 쥐느냐'</strong>에서 시작됩니다. 
            그립은 손과 라켓을 이어주는 유일한 연결점이며, 스윙 안정성과 손목 건강을 결정하는 핵심입니다.
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
              그립 두께의 중요성과 선택 기준
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              손 크기별 그립 사이즈 가이드
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              오버그립과 기본그립의 차이점
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              손목 부상 방지를 위한 그립 세팅
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              그립 관리와 교체 주기
            </li>
          </ol>
        </div>
      </section>

      {/* 본문 */}
      <section id="main-content">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">1. 그립 두께의 중요성과 선택 기준</h2>
        
        <div className="bg-[#F8FAFC] p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">💡 그립 두께의 핵심 원칙</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">안정성</h4>
              <p className="text-sm text-[#64748B]">적정 두께로 스윙 안정성 확보</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">부상 예방</h4>
              <p className="text-sm text-[#64748B]">손목 피로와 부상 위험 감소</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">감각 향상</h4>
              <p className="text-sm text-[#64748B]">정확한 공 감각과 컨트롤</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h3 className="text-xl font-bold text-yellow-800 mb-3">❓ 그립 두께는 왜 중요한가요?</h3>
          <p className="text-gray-700 mb-4">
            <strong>답변:</strong> 그립 두께는 스윙의 안정성과 손목 피로에 직접 영향을 줍니다. 
            너무 얇으면 손목이 흔들리고, 너무 두꺼우면 손가락이 과하게 긴장합니다.
          </p>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-800 font-semibold mb-0">💬 기준: 손과 그립 사이에 '손가락 한 개가 들어갈 정도의 여유'가 적정 두께입니다.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">2. 손 크기별 그립 사이즈 가이드</h2>
        
        <div className="border border-[#E2E8F0] rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📏 그립 사이즈별 특징</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="p-3 text-left">사이즈</th>
                  <th className="p-3 text-left">둘레(mm)</th>
                  <th className="p-3 text-left">추천 대상</th>
                  <th className="p-3 text-left">특징</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-medium text-blue-600">G1</td>
                  <td className="p-3">103~105</td>
                  <td className="p-3">여성, 청소년</td>
                  <td className="p-3">손이 작은 플레이어</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium text-green-600">G2</td>
                  <td className="p-3">106~108</td>
                  <td className="p-3">평균 여성·남성 초보</td>
                  <td className="p-3">가장 일반적인 사이즈</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium text-orange-600">G3</td>
                  <td className="p-3">109~111</td>
                  <td className="p-3">남성 중급자</td>
                  <td className="p-3">손이 크지 않은 경우</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium text-purple-600">G4</td>
                  <td className="p-3">112~114</td>
                  <td className="p-3">손이 큰 남성</td>
                  <td className="p-3">큰 손의 플레이어</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium text-red-600">G5</td>
                  <td className="p-3">115 이상</td>
                  <td className="p-3">손이 매우 큰 상급자</td>
                  <td className="p-3">특별히 큰 손</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">💡 테니스프렌즈 그립 선택 팁</h3>
          <p className="text-blue-700 mb-4">
            두께는 브랜드마다 약간 다르므로 직접 쥐어보고 결정하세요. 
            라켓을 잡았을 때 검지손가락이 들어갈 정도의 틈이 있으면 적정 사이즈입니다.
          </p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800 font-semibold mb-0">🧠 핵심: "그립은 손의 연장선이다. 편안함이 최우선이다."</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">3. 오버그립과 기본그립의 차이점</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🧤 기본그립 (Base Grip)</h3>
            <p className="text-[#64748B] mb-4">
              라켓에 기본적으로 감긴 쿠션형 그립으로, 충격 흡수 기능을 담당합니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>기능</strong>: 충격 흡수, 기본 쿠션</li>
              <li>• <strong>두께</strong>: 1.5~2.0mm</li>
              <li>• <strong>교체</strong>: 3개월마다 점검</li>
              <li>• <strong>소재</strong>: 쿠션 폼, 가죽</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🧴 오버그립 (Over Grip)</h3>
            <p className="text-[#64748B] mb-4">
              위에 덧감는 얇은 레이어로, 땀 흡수와 감각 조절 역할을 합니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>기능</strong>: 땀 흡수, 미끄럼 방지</li>
              <li>• <strong>두께</strong>: 0.6~0.8mm</li>
              <li>• <strong>교체</strong>: 2~3주마다 교체</li>
              <li>• <strong>소재</strong>: 드라이, 타키</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-green-800 mb-4">💡 오버그립 선택 가이드</h3>
          <p className="text-green-700 mb-4">
            "오버그립은 손에 맞게 감각을 조정하는 장치이며, 교체 주기는 평균 2주입니다."
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">💧 드라이 타입</h4>
              <p className="text-green-700 text-sm mb-0">땀이 많은 플레이어에게 적합</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🤏 타키(점착형)</h4>
              <p className="text-green-700 text-sm mb-0">손이 건조한 경우 추천</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">4. 손목 부상 방지를 위한 그립 세팅</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">⚠️ 그립과 손목 부상의 관계</h3>
            <p className="text-[#64748B] mb-4">
              그립이 너무 얇으면 라켓을 꽉 쥐게 되어 '테니스 엘보'가 발생합니다. 
              반대로 너무 두꺼우면 스윙 가속이 떨어집니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">너무 얇은 그립</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>❌ 손목 피로 증가</li>
                  <li>❌ 테니스 엘보 위험</li>
                  <li>❌ 스윙 불안정</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">너무 두꺼운 그립</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>❌ 스윙 속도 저하</li>
                  <li>❌ 손가락 긴장</li>
                  <li>❌ 감각 저하</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-orange-800 mb-4">💡 테니스프렌즈 부상 예방 팁</h3>
            <p className="text-orange-700 mb-4">
              얇은 그립을 선호하더라도 '하프 테이프'로 감아 손가락 각도를 일정하게 유지하세요.
            </p>
            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-orange-800 font-semibold mb-0">🧩 핵심: "적당한 쿠션감 + 안정된 손 감각"이 이상적인 그립입니다.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">5. 그립 관리와 교체 주기</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">❓ 그립 교체 주기는 얼마나 되나요?</h3>
            <p className="text-[#64748B] mb-4">
              <strong>답변:</strong> 일반적으로 주 2회 이상 플레이한다면 2~3주마다 오버그립을 교체해야 합니다. 
              기본그립은 3개월마다 점검이 필요합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">오버그립 교체 신호</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• 손이 미끄러짐</li>
                  <li>• 그립감 저하</li>
                  <li>• 색상 변화</li>
                  <li>• 표면 거칠어짐</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">기본그립 교체 신호</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• 쿠션감 저하</li>
                  <li>• 찢어짐 현상</li>
                  <li>• 냄새 발생</li>
                  <li>• 변형 발생</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">❓ 손에 땀이 많은 경우 어떤 그립이 좋을까요?</h3>
            <p className="text-[#64748B] mb-4">
              <strong>답변:</strong> 드라이 타입 그립이 가장 적합합니다. 
              타키(점착형)는 여름철 습도가 높을 때 미끄러질 수 있습니다.
            </p>
            <div className="bg-[#F8FAFC] p-4 rounded-lg">
              <h4 className="font-semibold text-[#0F172A] mb-2">🧴 추천 소재</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-[#0F172A] mb-1">드라이 타입</p>
                  <p className="text-sm text-[#64748B]">Wilson Pro Overgrip, Yonex Super Grap</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0F172A] mb-1">타키 타입</p>
                  <p className="text-sm text-[#64748B]">손이 건조한 경우에만 사용</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 결론 */}
      <section id="conclusion">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">🏁 손이 편해야 스윙이 자유롭다</h2>
          <p className="text-[#64748B] leading-relaxed mb-4">
            라켓은 손의 연장선입니다. 손이 편하지 않다면 스윙이 자연스러울 수 없습니다. 
            내 손에 맞는 그립을 찾는 순간, 공의 감각이 달라집니다.
          </p>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-[#0F172A] mb-2">💡 테니스프렌즈 Tip</h3>
            <p className="text-[#64748B] text-sm mb-0">
              경기 중 손이 미끄러지면, 그립 교체 시기가 온 겁니다. 
              감각이 흐트러지기 전에 교체하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 관련 유틸리티 */}
      <section id="related-utilities">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">🔧 관련 유틸리티</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/utility/ntrp-analyzer">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">📊 NTRP 자가 진단 테스트</h3>
              <p className="text-[#64748B] text-sm">
                현재 실력을 정확히 측정하고 맞춤형 그립 추천을 받아보세요.
              </p>
            </div>
          </Link>
          <Link href="/utility/string-tension">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">🎾 스트링 텐션 계산기</h3>
              <p className="text-[#64748B] text-sm">
                그립과 함께 라켓 세팅을 최적화하여 완벽한 장비를 구성하세요.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );

  return (
    <BlogTemplate
      title="내 손에 맞는 라켓 그립 찾는 법 ✋ (그립 두께·감각·부상 방지 가이드)"
      description="그립은 테니스에서 가장 자주 잡는 '감각의 중심'입니다. 그립 두께와 감각을 잘못 선택하면 스윙이 흔들리고 손목 부상으로 이어집니다. 내 손에 딱 맞는 그립을 찾는 방법을 소개합니다."
      publishDate="2025-10-20T00:00:00.000Z"
      readTime="6"
      category="gear"
      tags={["테니스그립", "라켓그립", "손목통증", "테니스장비", "테니스팁"]}
      author="TennisFriends"
      socialShare={{
        url: "https://tennisfriends.kr/blog/tennis-racket-grip-guide",
        title: "내 손에 맞는 라켓 그립 찾는 법 (그립 두께·감각·부상 방지 가이드)",
        description: "그립은 테니스에서 가장 자주 잡는 '감각의 중심'입니다. 그립 두께와 감각을 잘못 선택하면 스윙이 흔들리고 손목 부상으로 이어집니다."
      }}
      content={content}
      relatedPosts={[
        {
          title: "초보자를 위한 테니스 라켓 선택 가이드",
          slug: "tennis-racket-selection",
          excerpt: "테니스 초보자도 5분만에 자신에게 맞는 라켓을 선택할 수 있는 완벽한 가이드입니다."
        },
        {
          title: "테니스 코트별 플레이 전략",
          slug: "tennis-court-strategy-guide",
          excerpt: "하드·클레이·잔디 코트의 특징과 전략을 완벽 비교. 각 코트별 공의 반응, 발리 타이밍, 경기 운영법까지 실전 중심으로 정리했습니다."
        }
      ]}
    />
  );
}