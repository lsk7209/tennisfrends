import { Metadata } from "next";
import BlogTemplate from "@/components/blog-template";

export const metadata: Metadata = {
  title: "혼자서 실력 올리는 테니스 훈련 루틴 | 테니스프렌즈 블로그",
  description: "코트 밖에서도 실력은 자랍니다. 벽치기, 하체 균형, 리듬 트레이닝 등 혼자서 할 수 있는 테니스 훈련 루틴 5가지를 정리했습니다.",
  keywords: ["테니스 혼자 연습", "테니스 홈트", "테니스 훈련 루틴", "벽치기 훈련", "테니스 연습 방법"],
  openGraph: {
    title: "혼자서 실력 올리는 테니스 훈련 루틴 | 테니스프렌즈 블로그",
    description: "코트 밖에서도 실력은 자랍니다. 벽치기, 하체 균형, 리듬 트레이닝 등 혼자서 할 수 있는 테니스 훈련 루틴 5가지를 정리했습니다.",
    type: "article",
    publishedTime: "2025-10-20T00:00:00.000Z",
    modifiedTime: "2025-10-20T00:00:00.000Z",
    authors: ["TennisFriends"],
    tags: ["테니스 혼자 연습", "테니스 홈트", "테니스 훈련 루틴", "벽치기 훈련", "테니스 연습 방법"],
  },
  twitter: {
    card: "summary_large_image",
    title: "혼자서 실력 올리는 테니스 훈련 루틴 | 테니스프렌즈 블로그",
    description: "코트 밖에서도 실력은 자랍니다. 벽치기, 하체 균형, 리듬 트레이닝 등 혼자서 할 수 있는 테니스 훈련 루틴 5가지를 정리했습니다.",
  },
  alternates: {
    canonical: "https://tennisfriends.kr/blog/solo-tennis-training-routine",
  },
};

export default function SoloTennisTrainingRoutinePage() {
  return (
    <BlogTemplate
      title="혼자서 실력 올리는 테니스 훈련 루틴 🏋️ (집에서도 가능한 루틴 5가지)"
      description="코트가 없어도 성장할 수 있습니다. 벽치기, 밸런스 훈련, 하체 강화 루틴 등 집에서도 실력을 끌어올릴 수 있는 실전 루틴 5가지를 소개합니다."
      publishDate="2025-10-20T00:00:00.000Z"
      readTime="6"
      category="training"
      tags={["테니스훈련", "혼자연습", "테니스홈트", "테니스루틴", "집에서테니스"]}
      author="TennisFriends"
      socialShare={{
        url: "https://tennisfriends.kr/blog/solo-tennis-training-routine",
        title: "혼자서 실력 올리는 테니스 훈련 루틴 (집에서도 가능한 루틴 5가지)",
        description: "코트가 없어도 성장할 수 있습니다. 벽치기, 밸런스 훈련, 하체 강화 루틴 등 집에서도 실력을 끌어올릴 수 있는 실전 루틴 5가지를 소개합니다."
      }}
      content={
        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8">
            <p className="text-lg leading-relaxed mb-0">
              테니스는 코트에 나가야만 실력이 오르는 스포츠일까요? 그렇지 않습니다. 
              <strong>집·공원·벽 앞에서도 충분히 성장할 수 있습니다.</strong> 
              프로 선수들도 오프시즌에는 홈트레이닝 루틴으로 감각을 유지합니다. 
              오늘은 혼자서 실력을 끌어올릴 수 있는 루틴 5가지를 소개합니다.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">❓ AEO 질문 ① — 코트 없이도 테니스 실력이 향상될 수 있나요?</h3>
            <p className="text-gray-700 mb-4">
              <strong>답변:</strong> 네, 가능합니다. 벽치기, 리듬 트레이닝, 체중 이동 훈련 등은 코트가 없어도 실전 감각을 길러줍니다.
            </p>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-yellow-800 font-semibold mb-0">💬 핵심: "환경이 아니라 루틴이 실력을 만든다."</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                1️⃣ 벽치기
              </h3>
              <p className="text-blue-700 font-semibold mb-3">공감각과 타이밍 완성</p>
              <p className="text-gray-700 mb-4">벽치기는 가장 효과적인 개인 훈련입니다. 일정한 리듬으로 공을 주고받으며 타이밍을 익힐 수 있습니다.</p>
              
              <div className="bg-blue-100 p-4 rounded-lg mb-4">
                <p className="text-blue-800 font-semibold mb-2">⚙️ 방법:</p>
                <p className="text-blue-700 mb-0">최소 2m 거리에서 벽과 마주하고, 50회 이상 연속 랠리를 목표로 합니다.</p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">💡 Tip:</p>
                <p className="text-yellow-700 mb-0">벽치기 중 리듬이 깨지면 스윙 속도보다 '호흡'을 먼저 조정하세요.</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                2️⃣ 그림자 스윙
              </h3>
              <p className="text-green-700 font-semibold mb-3">자세 교정 루틴</p>
              <p className="text-gray-700 mb-4">라켓 없이 공중에서 스윙 연습을 하면 자세의 흐름을 정확히 볼 수 있습니다.</p>
              
              <div className="bg-green-100 p-4 rounded-lg mb-4">
                <p className="text-green-800 font-semibold mb-2">🎯 포인트:</p>
                <p className="text-green-700 mb-0">어깨 회전–임팩트–팔로스루를 한 흐름으로 이어가기.</p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">📷 테니스프렌즈 팁:</p>
                <p className="text-yellow-700 mb-0">거울 앞에서 영상을 찍고, 폼을 체크하면 효과가 두 배입니다.</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                3️⃣ 밸런스 훈련
              </h3>
              <p className="text-purple-700 font-semibold mb-3">스윙 안정성 향상</p>
              <p className="text-gray-700 mb-4">하체가 흔들리면 공의 정확도가 떨어집니다. 단순한 스쿼트보다 한 발 균형잡기 훈련이 효과적입니다.</p>
              
              <div className="bg-purple-100 p-4 rounded-lg mb-4">
                <p className="text-purple-800 font-semibold mb-2">🧘 루틴:</p>
                <p className="text-purple-700 mb-0">한 발로 15초 버티기 → 좌우 교대 3세트 → 눈을 감고 10초 유지.</p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">💪 효과:</p>
                <p className="text-yellow-700 mb-0">중심근육과 코어의 협응력이 향상됩니다.</p>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                4️⃣ 리듬 트레이닝
              </h3>
              <p className="text-orange-700 font-semibold mb-3">발 리듬 + 호흡 조합</p>
              <p className="text-gray-700 mb-4">테니스 리듬은 손보다 발에서 나옵니다. 메트로놈이나 음악을 켜고 일정한 박자에 맞춰 스텝을 반복하세요.</p>
              
              <div className="bg-orange-100 p-4 rounded-lg mb-4">
                <p className="text-orange-800 font-semibold mb-2">🦶 루틴:</p>
                <p className="text-orange-700 mb-0">'앞–뒤–좌–우' 리듬을 8카운트에 맞춰 이동. 리듬이 일정해지면 스윙이 부드러워집니다.</p>
              </div>
              
              <div className="bg-yellow-100 p-4 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">💬 AEO 응답 문장:</p>
                <p className="text-yellow-700 mb-0">"리듬은 스윙의 언어다. 리듬이 일정하면 기술이 자연스럽게 따라온다."</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 md:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                5️⃣ 코어 트레이닝
              </h3>
              <p className="text-red-700 font-semibold mb-3">복근과 허리 강화</p>
              <p className="text-gray-700 mb-4">라켓 파워는 팔이 아니라 코어에서 나옵니다. 복부 중심이 단단해야 방향성이 흔들리지 않습니다.</p>
              
              <div className="bg-red-100 p-4 rounded-lg">
                <p className="text-red-800 font-semibold mb-2">🧩 추천 루틴:</p>
                <p className="text-red-700 mb-0">플랭크 30초 → 사이드 플랭크 20초 → 슈퍼맨 10회 × 3세트.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 border-l-4 border-gray-400 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">❓ AEO 질문 ② — 혼자 훈련할 때 가장 중요한 것은?</h3>
              <p className="text-gray-700 mb-4">
                <strong>답변:</strong> 꾸준함입니다. 하루 10분이라도 루틴을 유지하는 것이 핵심입니다. 루틴이 습관이 되면, 코트에서도 감각이 바로 돌아옵니다.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800 font-semibold mb-0">💬 보너스 팁: 연습 후 간단히 폼 영상을 리뷰하면 '실전 복귀 시간'을 절반으로 줄일 수 있습니다.</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-3">❓ AEO 질문 ③ — 어떤 환경에서 혼자 훈련하는 게 가장 좋나요?</h3>
              <p className="text-gray-700 mb-4">
                <strong>답변:</strong> 미끄럽지 않은 바닥, 주변 3m 이상 여유 공간이 있는 곳이 이상적입니다. 공원, 테니스장 외벽, 또는 실내 넓은 복도도 충분합니다.
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-green-800 mb-3">📍 GEO 최적화 문장</h3>
            <p className="text-gray-700 mb-0">
              서울·부산·대전 등 지역별 공원과 체육시설 중 벽치기 가능한 공간은 
              <a href="/utility/court-finder" className="text-green-600 hover:underline font-semibold"> 테니스프렌즈 지역 코트 가이드</a>에서 확인하세요.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🏁 마무리 — 혼자 연습하는 시간, 결국 실전을 만든다</h3>
            <p className="text-lg text-gray-700 mb-6">
              혼자 훈련하는 시간은 조용하지만, 성장의 밀도가 가장 높은 시간입니다. 꾸준히 루틴을 기록하면 어느 날 당신의 스윙이 훨씬 자연스러워져 있을 겁니다.
            </p>
            <div className="bg-white p-6 rounded-lg border border-green-200">
              <p className="text-green-800 font-semibold text-lg mb-0">💬 테니스프렌즈 Tip: 루틴은 하루를 바꾸고, 루틴의 반복이 실력을 바꾼다.</p>
            </div>
          </div>
        </div>
      }
    />
  );
}