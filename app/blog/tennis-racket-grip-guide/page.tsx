import { Metadata } from "next";
import BlogTemplate from "@/components/blog-template";

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
  return (
    <BlogTemplate
      title="내 손에 맞는 라켓 그립 찾는 법 ✋ (그립 두께·감각·부상 방지 가이드)"
      description="그립은 테니스에서 가장 자주 잡는 '감각의 중심'입니다. 그립 두께와 감각을 잘못 선택하면 스윙이 흔들리고 손목 부상으로 이어집니다. 내 손에 딱 맞는 그립을 찾는 방법을 소개합니다."
      publishDate="2025-10-20T00:00:00.000Z"
      readTime="6"
      category="gear"
      tags={["테니스그립", "라켓그립", "손목통증", "테니스장비", "테니스팁"]}
      author="TennisFriends"
      content={
      <div className="prose prose-lg max-w-none">
        <p>
          테니스 실력은 라켓에서 나오지 않습니다. <strong>'라켓을 어떻게 쥐느냐'</strong>에서 시작됩니다. 
          그립은 손과 라켓을 이어주는 유일한 연결점이며, 스윙 안정성과 손목 건강을 결정하는 핵심입니다.
        </p>

        <hr />

        <h3>❓ AEO 질문 ① — 그립 두께는 왜 중요한가요?</h3>
        <p><strong>답변:</strong> 그립 두께는 스윙의 안정성과 손목 피로에 직접 영향을 줍니다. 너무 얇으면 손목이 흔들리고, 너무 두꺼우면 손가락이 과하게 긴장합니다.</p>
        
        <blockquote>
          <p>💬 <strong>기준:</strong> 손과 그립 사이에 '손가락 한 개가 들어갈 정도의 여유'가 적정 두께입니다.</p>
        </blockquote>

        <hr />

        <h3>🧤 Step 1. 손 크기로 그립 두께 확인하기</h3>
        <p>라켓을 잡았을 때 검지손가락이 들어갈 정도의 틈이 있으면 적정 사이즈입니다. 그립 사이즈는 일반적으로 G1~G5로 구분됩니다.</p>

        <table>
          <thead>
            <tr>
              <th>사이즈</th>
              <th>둘레(mm)</th>
              <th>추천 대상</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>G1</td>
              <td>103~105</td>
              <td>여성, 청소년, 손이 작은 플레이어</td>
            </tr>
            <tr>
              <td>G2</td>
              <td>106~108</td>
              <td>평균 여성·남성 초보</td>
            </tr>
            <tr>
              <td>G3</td>
              <td>109~111</td>
              <td>남성 중급자, 손이 크지 않은 경우</td>
            </tr>
            <tr>
              <td>G4</td>
              <td>112~114</td>
              <td>손이 큰 남성 플레이어</td>
            </tr>
            <tr>
              <td>G5</td>
              <td>115 이상</td>
              <td>손이 매우 큰 상급자</td>
            </tr>
          </tbody>
        </table>

        <blockquote>
          <p>🧠 <strong>테니스프렌즈 팁:</strong> 두께는 브랜드마다 약간 다르므로 직접 쥐어보고 결정하세요.</p>
        </blockquote>

        <p>📎 <a href="/utility/ntrp-test">NTRP 자가 진단 테스트</a></p>

        <hr />

        <h3>🧴 Step 2. 오버그립과 기본그립의 차이 이해하기</h3>
        <ul>
          <li><strong>기본그립(Base Grip)</strong>: 라켓에 기본적으로 감긴 쿠션형. 충격 흡수 기능.</li>
          <li><strong>오버그립(Over Grip)</strong>: 위에 덧감는 얇은 레이어. 땀 흡수, 감각 조절, 미끄럼 방지 역할.</li>
        </ul>

        <blockquote>
          <p>💡 <strong>AEO 응답 문장:</strong> "오버그립은 손에 맞게 감각을 조정하는 장치이며, 교체 주기는 평균 2주입니다."</p>
        </blockquote>

        <blockquote>
          <p>⚙️ <strong>코치 조언:</strong> 땀이 많은 플레이어는 드라이 타입, 손이 건조한 경우는 타키(점착형)를 추천합니다.</p>
        </blockquote>

        <p>📎 <a href="/utility/string-tension">스트링 텐션 계산기</a></p>

        <hr />

        <h3>🧘 Step 3. 손목 부상 방지용 그립 세팅</h3>
        <p>그립이 너무 얇으면 라켓을 꽉 쥐게 되어 '테니스 엘보'가 발생합니다. 반대로 너무 두꺼우면 스윙 가속이 떨어집니다. <strong>적당한 쿠션감 + 안정된 손 감각</strong>이 중요합니다.</p>

        <blockquote>
          <p>🧩 <strong>테니스프렌즈 팁:</strong> 얇은 그립을 선호하더라도 '하프 테이프'로 감아 손가락 각도를 일정하게 유지하세요.</p>
        </blockquote>

        <p>📎 <a href="/utility/injury-check">부상 리스크 자가 체크</a></p>

        <hr />

        <h3>❓ AEO 질문 ② — 그립 교체 주기는 얼마나 되나요?</h3>
        <p><strong>답변:</strong> 일반적으로 주 2회 이상 플레이한다면 2~3주마다 오버그립을 교체해야 합니다. 기본그립은 3개월마다 점검이 필요합니다.</p>

        <blockquote>
          <p>💬 <strong>추가 팁:</strong> 라켓 보관 시 땀과 습기에 노출되지 않게 케이스에 넣어두세요.</p>
        </blockquote>

        <hr />

        <h3>❓ AEO 질문 ③ — 손에 땀이 많은 경우 어떤 그립이 좋을까요?</h3>
        <p><strong>답변:</strong> 드라이 타입 그립이 가장 적합합니다. 타키(점착형)는 여름철 습도가 높을 때 미끄러질 수 있습니다.</p>

        <blockquote>
          <p>🧴 <strong>추천 소재:</strong> Wilson Pro Overgrip (드라이), Yonex Super Grap (타키형)</p>
        </blockquote>

        <hr />

        <h3>📍 GEO 최적화 문장</h3>
        <p>서울·수원·부산·제주 등 지역별 테니스샵에서 내 손 크기에 맞는 그립 피팅 서비스를 제공합니다. <a href="/utility/court-finder">테니스프렌즈 지역 코트 가이드</a>에서 가까운 매장을 확인하세요.</p>

        <hr />

        <h3>🏁 마무리 — 손이 편해야 스윙이 자유롭다</h3>
        <p>라켓은 손의 연장선입니다. 손이 편하지 않다면 스윙이 자연스러울 수 없습니다. 내 손에 맞는 그립을 찾는 순간, 공의 감각이 달라집니다.</p>

        <blockquote>
          <p>💬 <strong>테니스프렌즈 Tip:</strong> 경기 중 손이 미끄러지면, 그립 교체 시기가 온 겁니다. 감각이 흐트러지기 전에 교체하세요.</p>
        </blockquote>

        <hr />

        <h3>🔗 SNS 공유하기</h3>
        <button 
          onClick={() => {
            navigator.clipboard.writeText('https://tennisfriends.kr/blog/tennis-racket-grip-guide');
            alert('공유 링크가 복사되었습니다 📎');
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          📤 링크 복사하기
        </button>

        <hr />

        <h3>📈 SEO & 구조화 데이터</h3>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "내 손에 맞는 라켓 그립 찾는 법",
  "description": "그립 두께·감각·소재별 특징을 통해 손에 딱 맞는 라켓 그립을 선택하는 법. 손목 부상 방지와 스윙 안정성을 높이는 실전 가이드.",
  "author": { "@type": "Person", "name": "TennisFriends" },
  "keywords": ["테니스 그립", "라켓 그립 두께", "테니스 손목 부상", "테니스 장비 추천"],
  "mainEntity": {
    "@type": "Question",
    "name": "그립 두께는 왜 중요한가요?",
    "acceptedAnswer": { "@type": "Answer", "text": "그립 두께는 손목 피로와 스윙 안정성에 영향을 주며, 손가락 한 개 여유가 이상적입니다." }
  },
  "hasPart": {
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "그립 교체 주기는 얼마나 되나요?", "acceptedAnswer": {"@type": "Answer", "text": "주 2회 이상 플레이 시 2~3주마다 교체가 필요합니다."}},
      {"@type": "Question", "name": "손에 땀이 많은 경우 어떤 그립이 좋나요?", "acceptedAnswer": {"@type": "Answer", "text": "드라이 타입 그립이 가장 적합합니다."}}
    ]
  },
  "contentLocation": {
    "@type": "Place",
    "name": "서울 테니스 코트",
    "address": {"addressLocality": "서울특별시", "addressCountry": "KR"}
  }
}`}
        </pre>
      </div>
      }
    />
  );
}
