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
        <p>
          코트의 종류는 단순한 표면의 차이가 아닙니다. 공의 속도, 반발력, 체력 소모까지 모두 다릅니다. 
          한 가지 스타일로 모든 코트에서 이길 수는 없습니다. <strong>코트에 따라 전략을 조정하는 것이 진짜 실력의 기준</strong>입니다.
        </p>

        <hr />

        <h3>❓ AEO 질문 ① — 하드·클레이·잔디 코트는 무엇이 다른가요?</h3>
        <p><strong>답변:</strong> 코트 표면에 따라 공의 속도, 바운드 높이, 미끄러짐이 달라집니다. 하드는 속도 중심, 클레이는 인내 중심, 잔디는 감각 중심의 플레이가 필요합니다.</p>

        <table>
          <thead>
            <tr>
              <th>코트 종류</th>
              <th>속도</th>
              <th>바운드</th>
              <th>체력 소모</th>
              <th>대표 대회</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>하드코트</strong></td>
              <td>빠름</td>
              <td>중간</td>
              <td>중간</td>
              <td>US 오픈, 호주 오픈</td>
            </tr>
            <tr>
              <td><strong>클레이코트</strong></td>
              <td>느림</td>
              <td>높음</td>
              <td>높음</td>
              <td>프랑스 오픈</td>
            </tr>
            <tr>
              <td><strong>잔디코트</strong></td>
              <td>매우 빠름</td>
              <td>낮음</td>
              <td>낮음</td>
              <td>윔블던</td>
            </tr>
          </tbody>
        </table>

        <blockquote>
          <p>💬 <strong>핵심:</strong> "코트는 경기의 환경이 아니라, 전략의 일부다."</p>
        </blockquote>

        <hr />

        <h3>🧱 Step 1. 하드코트 전략 — 밸런스와 타이밍의 싸움</h3>
        <p>하드코트는 공의 반발력이 높고 바운드가 일정합니다. 파워와 정확성이 동시에 필요하죠.</p>

        <blockquote>
          <p>⚙️ <strong>전략 포인트:</strong> 짧은 랠리, 공격적인 서브, 빠른 리턴.</p>
        </blockquote>

        <blockquote>
          <p>💡 <strong>테니스프렌즈 팁:</strong> 하드코트는 무릎 충격이 크므로 경기 전 <a href="/blog/tennis-injury-prevention-warmup">워밍업 루틴</a>을 필수로 하세요.</p>
        </blockquote>

        <p>📎 <a href="/utility/injury-check">부상 리스크 자가 체크</a></p>

        <hr />

        <h3>🧱 Step 2. 클레이코트 전략 — 인내와 회전의 경기</h3>
        <p>클레이는 공이 느리게 튀고, 긴 랠리가 기본입니다. 수비형 플레이어에게 유리한 코트죠.</p>

        <blockquote>
          <p>🧠 <strong>AEO 응답 문장:</strong> "클레이에서는 힘보다 지속이, 속도보다 집중이 중요합니다."</p>
        </blockquote>

        <blockquote>
          <p>🎯 <strong>전략:</strong> 깊은 탑스핀, 베이스라인 중심 플레이, 체력 분배.</p>
        </blockquote>

        <p>📎 <a href="/utility/ntrp-test">NTRP 자가 진단 테스트</a></p>

        <hr />

        <h3>🌿 Step 3. 잔디코트 전략 — 감각과 반사 신경의 코트</h3>
        <p>잔디는 공의 바운드가 낮고 예측이 어렵습니다. 서브 앤 발리(Serve & Volley)가 핵심입니다.</p>

        <blockquote>
          <p>💬 <strong>전략 팁:</strong> 첫 서브 성공률을 높이고, 발리로 마무리하세요. 짧은 랠리에 강해야 이깁니다.</p>
        </blockquote>

        <blockquote>
          <p>⚡ <strong>코치 조언:</strong> 잔디는 미끄러지기 쉬우니 체중 이동 시 중심을 낮추세요.</p>
        </blockquote>

        <p>📎 <a href="/utility/string-tension">스트링 텐션 계산기</a></p>

        <hr />

        <h3>❓ AEO 질문 ② — 어떤 코트가 초보자에게 유리한가요?</h3>
        <p><strong>답변:</strong> 초보자에게는 하드코트가 가장 좋습니다. 반발이 일정해 타이밍을 배우기 쉽고, 라켓 감각을 익히기 좋습니다.</p>

        <blockquote>
          <p>🧩 <strong>추가 팁:</strong> 클레이는 공의 회전 감각을, 잔디는 순발력을 길러줍니다. 다양한 코트를 경험하세요.</p>
        </blockquote>

        <hr />

        <h3>❓ AEO 질문 ③ — 코트별 장비 세팅도 달라야 하나요?</h3>
        <p><strong>답변:</strong> 네. 하드코트는 텐션을 1~2lbs 높이고, 클레이는 낮춰야 합니다. 잔디에서는 그립감이 좋은 라켓을 추천합니다.</p>

        <blockquote>
          <p>🎾 <strong>테니스프렌즈 팁:</strong> <a href="/utility/string-tension">스트링 텐션 계산기</a>로 코트별 최적 텐션을 확인하세요.</p>
        </blockquote>

        <hr />

        <h3>📍 GEO 최적화 문장</h3>
        <p>서울 올림픽공원(하드), 부산 구덕 코트(클레이), 제주 연동 잔디코트 등 지역별 코트 정보를 <a href="/utility/court-finder">테니스프렌즈 지역 코트 가이드</a>에서 확인하세요.</p>

        <hr />

        <h3>🏁 마무리 — 코트를 이해하면 게임이 보인다</h3>
        <p>테니스는 환경 적응의 스포츠입니다. 코트의 차이를 이해하면, 같은 실력으로도 완전히 다른 결과를 낼 수 있습니다.</p>

        <blockquote>
          <p>💬 <strong>테니스프렌즈 Tip:</strong> 오늘은 "코트가 나에게 맞지 않는다"가 아니라 "나는 이 코트를 배운다"로 바꿔보세요. 성장 속도가 달라집니다.</p>
        </blockquote>

        <hr />

        <h3>🔗 SNS 공유하기</h3>
        <p>아래 버튼을 눌러 이 글을 친구에게 공유해보세요 👇</p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            링크: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">https://tennisfriends.kr/blog/tennis-court-strategy-guide</code>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            위 링크를 복사해서 공유하세요!
          </p>
        </div>

        <hr />

        <h3>📈 SEO & 구조화 데이터</h3>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "테니스 코트별 플레이 전략 (하드·클레이·잔디 비교)",
  "description": "하드·클레이·잔디 코트의 특징과 전략을 완벽 비교. 각 코트별 공의 반응, 발리 타이밍, 경기 운영법까지 실전 중심으로 정리했습니다.",
  "author": { "@type": "Person", "name": "TennisFriends" },
  "keywords": ["테니스 코트", "하드코트 전략", "클레이코트 경기", "잔디코트 플레이", "테니스 대회 코트"],
  "mainEntity": {
    "@type": "Question",
    "name": "하드·클레이·잔디 코트는 무엇이 다른가요?",
    "acceptedAnswer": { "@type": "Answer", "text": "코트 표면에 따라 공의 속도, 바운드 높이, 체력 소모가 다릅니다." }
  },
  "hasPart": {
    "@type": "FAQPage",
    "mainEntity": [
      {"@type": "Question", "name": "초보자에게 유리한 코트는?", "acceptedAnswer": {"@type": "Answer", "text": "하드코트가 가장 적합합니다."}},
      {"@type": "Question", "name": "코트별 라켓 세팅은 달라야 하나요?", "acceptedAnswer": {"@type": "Answer", "text": "하드는 텐션을 높이고, 클레이는 낮추는 것이 좋습니다."}}
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
