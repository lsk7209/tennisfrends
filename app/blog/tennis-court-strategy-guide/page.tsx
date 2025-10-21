import { Metadata } from "next";
import BlogTemplate from "@/components/blog-template";

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
      content={
        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl mb-8">
            <p className="text-lg leading-relaxed mb-0">
              코트의 종류는 단순한 표면의 차이가 아닙니다. 공의 속도, 반발력, 체력 소모까지 모두 다릅니다. 
              한 가지 스타일로 모든 코트에서 이길 수는 없습니다. <strong>코트에 따라 전략을 조정하는 것이 진짜 실력의 기준</strong>입니다.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">❓ AEO 질문 ① — 하드·클레이·잔디 코트는 무엇이 다른가요?</h3>
            <p className="text-gray-700 mb-4">
              <strong>답변:</strong> 코트 표면에 따라 공의 속도, 바운드 높이, 미끄러짐이 달라집니다. 
              하드는 속도 중심, 클레이는 인내 중심, 잔디는 감각 중심의 플레이가 필요합니다.
            </p>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-yellow-800 font-semibold mb-0">💬 핵심: "코트는 경기의 환경이 아니라, 전략의 일부다."</p>
            </div>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">코트 종류</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">속도</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">바운드</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">체력 소모</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">대표 대회</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-blue-600">하드코트</td>
                  <td className="border border-gray-300 px-4 py-3">빠름</td>
                  <td className="border border-gray-300 px-4 py-3">중간</td>
                  <td className="border border-gray-300 px-4 py-3">중간</td>
                  <td className="border border-gray-300 px-4 py-3">US 오픈, 호주 오픈</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-orange-600">클레이코트</td>
                  <td className="border border-gray-300 px-4 py-3">느림</td>
                  <td className="border border-gray-300 px-4 py-3">높음</td>
                  <td className="border border-gray-300 px-4 py-3">높음</td>
                  <td className="border border-gray-300 px-4 py-3">프랑스 오픈</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">잔디코트</td>
                  <td className="border border-gray-300 px-4 py-3">매우 빠름</td>
                  <td className="border border-gray-300 px-4 py-3">낮음</td>
                  <td className="border border-gray-300 px-4 py-3">낮음</td>
                  <td className="border border-gray-300 px-4 py-3">윔블던</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                🧱 Step 1. 하드코트 전략
              </h3>
              <p className="text-blue-700 font-semibold mb-3">밸런스와 타이밍의 싸움</p>
              <p className="text-gray-700 mb-4">하드코트는 공의 반발력이 높고 바운드가 일정합니다. 파워와 정확성이 동시에 필요하죠.</p>
              
              <div className="bg-blue-100 p-4 rounded-lg mb-4">
                <p className="text-blue-800 font-semibold mb-2">⚙️ 전략 포인트:</p>
                <p className="text-blue-700 mb-0">짧은 랠리, 공격적인 서브, 빠른 리턴</p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">💡 테니스프렌즈 팁:</p>
                <p className="text-yellow-700 mb-0">하드코트는 무릎 충격이 크므로 경기 전 워밍업 루틴을 필수로 하세요.</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                🧱 Step 2. 클레이코트 전략
              </h3>
              <p className="text-orange-700 font-semibold mb-3">인내와 회전의 경기</p>
              <p className="text-gray-700 mb-4">클레이는 공이 느리게 튀고, 긴 랠리가 기본입니다. 수비형 플레이어에게 유리한 코트죠.</p>
              
              <div className="bg-orange-100 p-4 rounded-lg mb-4">
                <p className="text-orange-800 font-semibold mb-2">🧠 AEO 응답 문장:</p>
                <p className="text-orange-700 mb-0">"클레이에서는 힘보다 지속이, 속도보다 집중이 중요합니다."</p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">🎯 전략:</p>
                <p className="text-yellow-700 mb-0">깊은 탑스핀, 베이스라인 중심 플레이, 체력 분배</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                🌿 Step 3. 잔디코트 전략
              </h3>
              <p className="text-green-700 font-semibold mb-3">감각과 반사 신경의 코트</p>
              <p className="text-gray-700 mb-4">잔디는 공의 바운드가 낮고 예측이 어렵습니다. 서브 앤 발리(Serve & Volley)가 핵심입니다.</p>
              
              <div className="bg-green-100 p-4 rounded-lg mb-4">
                <p className="text-green-800 font-semibold mb-2">💬 전략 팁:</p>
                <p className="text-green-700 mb-0">첫 서브 성공률을 높이고, 발리로 마무리하세요. 짧은 랠리에 강해야 이깁니다.</p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">⚡ 코치 조언:</p>
                <p className="text-yellow-700 mb-0">잔디는 미끄러지기 쉬우니 체중 이동 시 중심을 낮추세요.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-400 p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">❓ AEO 질문 ② — 어떤 코트가 초보자에게 유리한가요?</h3>
            <p className="text-gray-700 mb-4">
              <strong>답변:</strong> 초보자에게는 하드코트가 가장 좋습니다. 반발이 일정해 타이밍을 배우기 쉽고, 라켓 감각을 익히기 좋습니다.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold mb-0">🧩 추가 팁: 클레이는 공의 회전 감각을, 잔디는 순발력을 길러줍니다. 다양한 코트를 경험하세요.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-3">❓ AEO 질문 ③ — 코트별 장비 세팅도 달라야 하나요?</h3>
            <p className="text-gray-700 mb-4">
              <strong>답변:</strong> 네. 하드코트는 텐션을 1~2lbs 높이고, 클레이는 낮춰야 합니다. 잔디에서는 그립감이 좋은 라켓을 추천합니다.
            </p>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-blue-800 font-semibold mb-0">🎾 테니스프렌즈 팁: 스트링 텐션 계산기로 코트별 최적 텐션을 확인하세요.</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-3">📍 GEO 최적화 문장</h3>
            <p className="text-gray-700 mb-0">
              서울 올림픽공원(하드), 부산 구덕 코트(클레이), 제주 연동 잔디코트 등 지역별 코트 정보를 
              <a href="/utility/court-finder" className="text-green-600 hover:underline font-semibold"> 테니스프렌즈 지역 코트 가이드</a>에서 확인하세요.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🏁 마무리 — 코트를 이해하면 게임이 보인다</h3>
            <p className="text-lg text-gray-700 mb-6">
              테니스는 환경 적응의 스포츠입니다. 코트의 차이를 이해하면, 같은 실력으로도 완전히 다른 결과를 낼 수 있습니다.
            </p>
            <div className="bg-white p-6 rounded-lg border border-green-200">
              <p className="text-green-800 font-semibold text-lg mb-0">💬 테니스프렌즈 Tip: 오늘은 "코트가 나에게 맞지 않는다"가 아니라 "나는 이 코트를 배운다"로 바꿔보세요. 성장 속도가 달라집니다.</p>
            </div>
          </div>
        </div>
      }
    />
  );
}