import { Metadata } from "next";
import BlogTemplate from "@/components/blog-template";
import Link from "next/link";

export const metadata: Metadata = {
  title: "혼자서 실력 올리는 테니스 훈련 루틴 | 테니스프렌즈 블로그",
  description: "코트 밖에서도 실력은 자랍니다. 벽치기, 하체 균형, 리듬 트레이닝 등 혼자서 할 수 있는 테니스 훈련 루틴 5가지를 정리했습니다.",
  keywords: ["테니스 혼자 연습", "테니스 홈트", "테니스 훈련 루틴", "벽치기 훈련", "테니스 연습 방법"],
  openGraph: {
    title: "혼자서 실력 올리는 테니스 훈련 루틴 | 테니스프렌즈 블로그",
    description: "코트 밖에서도 실력은 자랍니다. 벽치기, 하체 균형, 리듬 트레이닝 등 혼자서 할 수 있는 테니스 훈련 루틴 5가지를 정리했습니다.",
    type: "article",
    publishedTime: "2025-01-20T00:00:00.000Z",
    modifiedTime: "2025-01-20T00:00:00.000Z",
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
  const content = (
    <div className="space-y-8">
      {/* 도입부 */}
      <section id="introduction">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-8 rounded-xl border-l-4 border-[#0BA360] mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">🏋️ 코트 없이도 실력은 자랍니다</h2>
          <p className="text-[#64748B] leading-relaxed text-lg">
            테니스는 코트에 나가야만 실력이 오르는 스포츠일까요? 그렇지 않습니다. 
            <strong>집·공원·벽 앞에서도 충분히 성장할 수 있습니다.</strong> 
            프로 선수들도 오프시즌에는 홈트레이닝 루틴으로 감각을 유지합니다. 
            오늘은 혼자서 실력을 끌어올릴 수 있는 루틴 5가지를 소개합니다.
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
              혼자 훈련의 핵심 원칙과 효과
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              벽치기 - 공감각과 타이밍 완성
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              그림자 스윙 - 자세 교정 루틴
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              밸런스 훈련 - 스윙 안정성 향상
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              리듬 트레이닝과 코어 강화
            </li>
          </ol>
        </div>
      </section>

      {/* 본문 */}
      <section id="main-content">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">1. 혼자 훈련의 핵심 원칙과 효과</h2>
        
        <div className="bg-[#F8FAFC] p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">💡 혼자 훈련의 핵심 원칙</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">꾸준함</h4>
              <p className="text-sm text-[#64748B]">하루 10분이라도 루틴 유지</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">집중력</h4>
              <p className="text-sm text-[#64748B]">혼자만의 시간에 몰입</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📈</div>
              <h4 className="font-semibold text-[#0F172A] mb-2">기록</h4>
              <p className="text-sm text-[#64748B]">진행 상황과 개선점 기록</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <h3 className="text-xl font-bold text-yellow-800 mb-3">❓ 코트 없이도 테니스 실력이 향상될 수 있나요?</h3>
          <p className="text-gray-700 mb-4">
            <strong>답변:</strong> 네, 가능합니다. 벽치기, 리듬 트레이닝, 체중 이동 훈련 등은 
            코트가 없어도 실전 감각을 길러줍니다.
          </p>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-800 font-semibold mb-0">💬 핵심: "환경이 아니라 루틴이 실력을 만든다."</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">2. 벽치기 - 공감각과 타이밍 완성</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🏓 벽치기의 효과</h3>
            <p className="text-[#64748B] mb-4">
              벽치기는 가장 효과적인 개인 훈련입니다. 일정한 리듬으로 공을 주고받으며 타이밍을 익힐 수 있습니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>공 감각</strong>: 공과의 접촉 감각 향상</li>
              <li>• <strong>타이밍</strong>: 스윙 타이밍 정확도 향상</li>
              <li>• <strong>리듬</strong>: 일정한 스윙 리듬 형성</li>
              <li>• <strong>집중력</strong>: 혼자서도 높은 집중력 유지</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">⚙️ 벽치기 방법</h3>
            <p className="text-[#64748B] mb-4">
              최소 2m 거리에서 벽과 마주하고, 50회 이상 연속 랠리를 목표로 합니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>거리</strong>: 벽에서 2m 이상 떨어져서</li>
              <li>• <strong>목표</strong>: 50회 이상 연속 랠리</li>
              <li>• <strong>리듬</strong>: 일정한 속도로 스윙</li>
              <li>• <strong>호흡</strong>: 자연스러운 호흡 유지</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">💡 테니스프렌즈 벽치기 팁</h3>
          <p className="text-blue-700 mb-4">
            벽치기 중 리듬이 깨지면 스윙 속도보다 '호흡'을 먼저 조정하세요. 
            자연스러운 호흡이 일정한 리듬을 만들어줍니다.
          </p>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800 font-semibold mb-0">🎯 핵심: "벽치기는 혼자서도 할 수 있는 최고의 파트너다."</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">3. 그림자 스윙 - 자세 교정 루틴</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">👤 그림자 스윙의 효과</h3>
            <p className="text-[#64748B] mb-4">
              라켓 없이 공중에서 스윙 연습을 하면 자세의 흐름을 정확히 볼 수 있습니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>자세 교정</strong>: 스윙 자세의 흐름 확인</li>
              <li>• <strong>균형감</strong>: 체중 이동과 균형 연습</li>
              <li>• <strong>유연성</strong>: 관절과 근육의 유연성 향상</li>
              <li>• <strong>집중력</strong>: 스윙에만 집중할 수 있음</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🎯 그림자 스윙 포인트</h3>
            <p className="text-[#64748B] mb-4">
              어깨 회전–임팩트–팔로스루를 한 흐름으로 이어가기.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>어깨 회전</strong>: 자연스러운 어깨 회전</li>
              <li>• <strong>임팩트</strong>: 정확한 임팩트 포인트</li>
              <li>• <strong>팔로스루</strong>: 완전한 팔로스루 동작</li>
              <li>• <strong>균형</strong>: 스윙 중 균형 유지</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-green-800 mb-4">💡 테니스프렌즈 그림자 스윙 팁</h3>
          <p className="text-green-700 mb-4">
            거울 앞에서 영상을 찍고, 폼을 체크하면 효과가 두 배입니다. 
            자신의 스윙을 객관적으로 볼 수 있어 자세 교정에 큰 도움이 됩니다.
          </p>
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800 font-semibold mb-0">📷 핵심: "거울은 최고의 코치다. 자신의 움직임을 객관적으로 보라."</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">4. 밸런스 훈련 - 스윙 안정성 향상</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🧘 밸런스 훈련의 중요성</h3>
            <p className="text-[#64748B] mb-4">
              하체가 흔들리면 공의 정확도가 떨어집니다. 단순한 스쿼트보다 한 발 균형잡기 훈련이 효과적입니다.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>스윙 안정성</strong>: 흔들리지 않는 스윙</li>
              <li>• <strong>정확도</strong>: 공의 정확한 방향성</li>
              <li>• <strong>파워</strong>: 안정된 자세에서 나오는 파워</li>
              <li>• <strong>부상 예방</strong>: 균형감으로 부상 위험 감소</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">⚙️ 밸런스 훈련 루틴</h3>
            <p className="text-[#64748B] mb-4">
              한 발로 15초 버티기 → 좌우 교대 3세트 → 눈을 감고 10초 유지.
            </p>
            <ul className="space-y-2 text-[#64748B]">
              <li>• <strong>기본 자세</strong>: 한 발로 15초 버티기</li>
              <li>• <strong>교대 훈련</strong>: 좌우 교대 3세트</li>
              <li>• <strong>고급 훈련</strong>: 눈을 감고 10초 유지</li>
              <li>• <strong>점진적 증가</strong>: 시간을 점차 늘려가기</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">💡 테니스프렌즈 밸런스 훈련 팁</h3>
          <p className="text-purple-700 mb-4">
            중심근육과 코어의 협응력이 향상됩니다. 
            단순해 보이지만 테니스에서 가장 중요한 기초 체력입니다.
          </p>
          <div className="bg-purple-100 p-4 rounded-lg">
            <p className="text-purple-800 font-semibold mb-0">💪 핵심: "밸런스는 모든 스포츠의 기초다. 하체가 흔들리면 아무것도 할 수 없다."</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#0F172A] mb-6">5. 리듬 트레이닝과 코어 강화</h2>
        
        <div className="space-y-6">
          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🦶 리듬 트레이닝 - 발 리듬 + 호흡 조합</h3>
            <p className="text-[#64748B] mb-4">
              테니스 리듬은 손보다 발에서 나옵니다. 메트로놈이나 음악을 켜고 일정한 박자에 맞춰 스텝을 반복하세요.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">루틴 방법</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• '앞–뒤–좌–우' 리듬</li>
                  <li>• 8카운트에 맞춰 이동</li>
                  <li>• 메트로놈 활용</li>
                  <li>• 음악과 함께 연습</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0F172A] mb-2">효과</h4>
                <ul className="space-y-1 text-[#64748B] text-sm">
                  <li>• 리듬이 일정해짐</li>
                  <li>• 스윙이 부드러워짐</li>
                  <li>• 체력 향상</li>
                  <li>• 집중력 향상</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🧩 코어 트레이닝 - 복근과 허리 강화</h3>
            <p className="text-[#64748B] mb-4">
              라켓 파워는 팔이 아니라 코어에서 나옵니다. 복부 중심이 단단해야 방향성이 흔들리지 않습니다.
            </p>
            <div className="bg-[#F8FAFC] p-4 rounded-lg">
              <h4 className="font-semibold text-[#0F172A] mb-2">추천 루틴</h4>
              <p className="text-[#64748B] text-sm mb-0">
                플랭크 30초 → 사이드 플랭크 20초 → 슈퍼맨 10회 × 3세트
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-orange-800 mb-4">💡 테니스프렌즈 리듬 & 코어 팁</h3>
          <p className="text-orange-700 mb-4">
            "리듬은 스윙의 언어다. 리듬이 일정하면 기술이 자연스럽게 따라온다." 
            코어가 강해야 안정된 스윙이 가능합니다.
          </p>
          <div className="bg-orange-100 p-4 rounded-lg">
            <p className="text-orange-800 font-semibold mb-0">🎯 핵심: "리듬과 코어는 테니스의 두 기둥이다. 둘 다 잡으면 실력이 급상승한다."</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 border-l-4 border-gray-400 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">❓ 혼자 훈련할 때 가장 중요한 것은?</h3>
            <p className="text-gray-700 mb-4">
              <strong>답변:</strong> 꾸준함입니다. 하루 10분이라도 루틴을 유지하는 것이 핵심입니다. 
              루틴이 습관이 되면, 코트에서도 감각이 바로 돌아옵니다.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold mb-0">💬 보너스 팁: 연습 후 간단히 폼 영상을 리뷰하면 '실전 복귀 시간'을 절반으로 줄일 수 있습니다.</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3">❓ 어떤 환경에서 혼자 훈련하는 게 가장 좋나요?</h3>
            <p className="text-gray-700 mb-4">
              <strong>답변:</strong> 미끄럽지 않은 바닥, 주변 3m 이상 여유 공간이 있는 곳이 이상적입니다. 
              공원, 테니스장 외벽, 또는 실내 넓은 복도도 충분합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 결론 */}
      <section id="conclusion">
        <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">🏁 혼자 연습하는 시간, 결국 실전을 만든다</h2>
          <p className="text-[#64748B] leading-relaxed mb-4">
            혼자 훈련하는 시간은 조용하지만, 성장의 밀도가 가장 높은 시간입니다. 
            꾸준히 루틴을 기록하면 어느 날 당신의 스윙이 훨씬 자연스러워져 있을 겁니다.
          </p>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-[#0F172A] mb-2">💡 테니스프렌즈 Tip</h3>
            <p className="text-[#64748B] text-sm mb-0">
              루틴은 하루를 바꾸고, 루틴의 반복이 실력을 바꾼다.
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
                현재 실력을 정확히 측정하고 맞춤형 훈련 루틴을 받아보세요.
              </p>
            </div>
          </Link>
          <Link href="/utility/court-finder">
            <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">🎾 코트 찾기</h3>
              <p className="text-[#64748B] text-sm">
                지역별 공원과 체육시설 중 벽치기 가능한 공간을 찾아보세요.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );

  return (
    <BlogTemplate
      title="혼자서 실력 올리는 테니스 훈련 루틴 🏋️ (집에서도 가능한 루틴 5가지)"
      description="코트가 없어도 성장할 수 있습니다. 벽치기, 밸런스 훈련, 하체 강화 루틴 등 집에서도 실력을 끌어올릴 수 있는 실전 루틴 5가지를 소개합니다."
      publishDate="2025-01-20"
      readTime="6"
      category="training"
      tags={["테니스훈련", "혼자연습", "테니스홈트", "테니스루틴", "집에서테니스"]}
      author="TennisFriends"
      socialShare={{
        url: "https://tennisfriends.kr/blog/solo-tennis-training-routine",
        title: "혼자서 실력 올리는 테니스 훈련 루틴 (집에서도 가능한 루틴 5가지)",
        description: "코트가 없어도 성장할 수 있습니다. 벽치기, 밸런스 훈련, 하체 강화 루틴 등 집에서도 실력을 끌어올릴 수 있는 실전 루틴 5가지를 소개합니다."
      }}
      content={content}
      relatedPosts={[
        {
          title: "테니스 코트별 플레이 전략",
          slug: "tennis-court-strategy-guide",
          excerpt: "하드·클레이·잔디 코트의 특징과 전략을 완벽 비교. 각 코트별 공의 반응, 발리 타이밍, 경기 운영법까지 실전 중심으로 정리했습니다."
        },
        {
          title: "내 손에 맞는 라켓 그립 찾는 법",
          slug: "tennis-racket-grip-guide",
          excerpt: "그립 두께·감각·소재별 특징을 통해 손에 딱 맞는 라켓 그립을 선택하는 법. 손목 부상 방지와 스윙 안정성을 높이는 실전 가이드."
        }
      ]}
    />
  );
}