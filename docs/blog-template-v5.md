# 🎾 TennisFriends Blog Template v5.0

> **"사람이 사랑하고, 검색엔진이 신뢰하며, AI가 이해하는 완전한 콘텐츠 구조"**

---

## 0️⃣ 핵심 철학

> 1. **검색엔진은 구조로 이해하고, 사람은 이야기로 기억하며, AI는 패턴으로 학습한다.**
> 2. **전문성은 감정 없이 설득되지 않으며, 신뢰는 경험 없이 구축되지 않는다.**
> 3. **한 문단마다 하나의 '작은 약속'을 지키고, 한 섹션마다 하나의 '큰 가치'를 전달하라.**
> 4. **모바일 우선, 접근성 필수, 성능 최적화는 선택이 아닌 필수다.**

---

## 1️⃣ 콘텐츠 구조 가이드

| 섹션            | 목적             | 핵심 요소 |
| ------------- | -------------- | -------- |
| Hook        | 독자 관심 끌기  | 감정적 연결, 문제의식 제시 |
| Truth       | 문제 명확화   | 공감대 형성, 핵심 포인트 |
| Insight     | 전문가 해설   | 구체적 데이터, 실전 팁 |
| Application | 실전 적용    | 단계별 가이드, 실행 방법 |
| Connection  | 신뢰도 구축  | 코치 경험담, 감정적 연결 |
| FAQ         | 궁금증 해결 | 자주 묻는 질문과 답변 |
| Closing     | 마무리    | 핵심 메시지, 행동 유도 |

---

## 2️⃣ 문체 가이드

| 항목           | 원칙                   | 예시                                                 |
| ------------ | -------------------- | -------------------------------------------------- |
| **톤 앤 매너**   | 따뜻한 코치의 일상어          | "이건 연습보다 쉽습니다. 단, 꾸준해야 합니다."                       |
| **리듬감**      | 1~2문장 짧게 + 1문장 리듬 조절 | "라켓이 아니라 몸이 문제일 때가 많습니다. 코트에선 미세한 차이가 큰 결과를 만듭니다." |
| **감정 연결**    | 감정 단어로 문단 시작         | "처음엔 부끄러웠어요. 남들처럼 공이 안 맞았거든요."                     |
| **데이터 신뢰**   | 수치·비율 1~2회 삽입        | "285g과 300g의 차이는 타점 속도 0.2초입니다."                   |
| **공유 유도 문장** | '친구에게 알려주고 싶은' 어조    | "이건 꼭 같이 치는 친구에게 알려주세요."                           |
| **명확한 답변**    | 구조화된 정보 + 명확한 답변    | "라켓 무게는 어떻게 정하나요? 285~300g이 표준입니다."              |
| **접근성**      | 스크린 리더 친화적          | "이미지: 라켓 밸런스 측정 중인 테니스 선수"                        |

---

## 3️⃣ 최적화 가이드

| 요소                      | 처리 방식              | 예시                                    |
| ----------------------- | ------------------ | ------------------------------------- |
| **SEO**                 | 키워드 변형 6~8회 자연 분포  | "테니스 라켓 무게", "라켓 밸런스", "테니스 초보 추천"    |
| **질문-답변** | 명확한 질문–답변 구조 2개 포함 | "라켓 무게는 어떻게 정하나요?" "285~300g이 표준입니다." |
| **지역 언급**         | 지역 언급 문장 1회 이상     | "서울, 부산, 제주 등 기후에 따라 텐션 세팅이 다릅니다."    |
| **성능 최적화**     | 이미지 최적화 + 지연 로딩    | WebP 포맷, 75% 품질, lazy loading        |
| **모바일 최적화**          | 터치 친화적 + 반응형        | 16px 최소 터치 영역, 320px 최소 너비        |
| **접근성**        | 스크린 리더 + 키보드 네비게이션  | alt 텍스트, ARIA 라벨, 색상 대비 4.5:1    |
| **구조화 데이터**          | JSON-LD 스키마 마크업      | Article, FAQ, HowTo 스키마            |

---

## 4️⃣ 콘텐츠 템플릿

```mdx
---
title: "{제목}"
summary: "{요약 — 130자 이내}"
tags: ["키워드1","키워드2","키워드3"]
slug: "{slug}"
category: "{gear|training|mindset|community}"
meta_title: "{SEO 제목}"
meta_description: "{SEO 설명문}"
created_at: "{YYYY-MM-DD}"
updated_at: "{YYYY-MM-DD}"
reading_time: "{X}분 읽기"
featured_image: "/images/blog/{slug}-hero.webp"
featured_image_alt: "{이미지 설명}"
author: "TennisFriends 코치팀"
author_bio: "테니스 전문가들이 전하는 실전 노하우"
canonical_url: "https://tennisfriends.kr/blog/{slug}"
og_image: "/images/blog/{slug}-og.webp"
twitter_card: "summary_large_image"
structured_data: true
---

## 🎾 {H1 제목}

{감정·공감·문제의식 3문장.}  
"{한 문장 명언처럼 인용}"

---

## 📋 목차
- [🎯 사람들이 자주 놓치는 부분](#-사람들이-자주-놓치는-부분)
- [⚙️ 코치의 실전 분석](#️-코치의-실전-분석)
- [🧩 코트에서 바로 써먹는 법](#-코트에서-바로-써먹는-법)
- [💬 코치의 이야기](#-코치의-이야기)
- [🧠 자주 묻는 질문](#-자주-묻는-질문)
- [🔗 함께 보면 좋은 콘텐츠](#-함께-보면-좋은-콘텐츠)
- [🏁 마무리](#-마무리)

---

## 🎯 사람들이 자주 놓치는 부분
{문제 원인 설명 + 일반적 오해 + 간단한 근거.}  
> 💡 **핵심 포인트:** {짧은 요약 1줄.}

---

## ⚙️ 코치의 실전 분석
{데이터, 팁, 비교표, 잘못된 습관, 교정법.}  

| 구분 | 잘못된 선택 | 교정 방법 |
|------|--------------|------------|
| 예시 | {값1} | {값2} |

📎 [관련 계산기/도구 링크](/utility/...)

---

## 🧩 코트에서 바로 써먹는 법
{루틴, 동작, 상황별 팁. 문장 중 키워드 자연 삽입.}

> 💬 **코치의 조언:** "{짧고 따뜻한 문장}"

---

## 💬 코치의 이야기
{개인 경험담 혹은 제자 사례 1개. 감정선 포함.}  
"{한 줄 인용으로 마무리}"

---

## 🧠 자주 묻는 질문

**Q. {질문1}**  
A. {답변1}

**Q. {질문2}**  
A. {답변2}

---

## 🔗 함께 보면 좋은 콘텐츠

### 📊 관련 유틸리티
<div class="utility-grid">
  <div class="utility-card">
    <img src="/images/utility/string-tension.webp" alt="스트링 텐션 계산기" loading="lazy">
    <h3>스트링 텐션 계산기</h3>
    <p>라켓과 플레이 스타일에 맞는 최적의 텐션을 계산해드립니다</p>
    <a href="/utility/string-tension" class="btn-primary">이동하기</a>
  </div>
  
  <div class="utility-card">
    <img src="/images/utility/ntrp-analyzer.webp" alt="NTRP 자가 진단 테스트" loading="lazy">
    <h3>NTRP 자가 진단 테스트</h3>
    <p>나의 실력 레벨을 확인하고 개선 방향을 제시합니다</p>
    <a href="/utility/ntrp-analyzer" class="btn-primary">이동하기</a>
  </div>
  
  <div class="utility-card">
    <img src="/images/utility/racket-matchmaker.webp" alt="라켓 매칭 도우미" loading="lazy">
    <h3>라켓 매칭 도우미</h3>
    <p>10문항 설문으로 나에게 맞는 라켓을 찾아보세요</p>
    <a href="/utility/racket-matchmaker" class="btn-primary">이동하기</a>
  </div>
</div>

### 📝 관련 블로그 포스트
<div class="blog-grid">
  <div class="blog-card">
    <img src="/images/blog/tennis-beginner-three-steps-hero.webp" alt="테니스 초보자 3단계 성장 로드맵" loading="lazy">
    <h3>테니스 초보자 3단계 성장 로드맵</h3>
    <p>기본기부터 실전까지 체계적인 학습 방법과 실력 향상 팁</p>
    <a href="/blog/tennis-beginner-three-steps" class="btn-secondary">읽어보기</a>
  </div>
  
  <div class="blog-card">
    <img src="/images/blog/common-tennis-racket-mistakes-hero.webp" alt="테니스 라켓 선택 시 흔한 실수 7가지" loading="lazy">
    <h3>테니스 라켓 선택 시 흔한 실수 7가지</h3>
    <p>라켓 무게, 헤드 크기, 밸런스 등 라켓 선택 시 자주 하는 실수들</p>
    <a href="/blog/common-tennis-racket-mistakes" class="btn-secondary">읽어보기</a>
  </div>
</div>

---

## 🏁 마무리
{짧은 감정 + 실용 조언 결합형 문단.}  
> "{감정적 인용 한 줄 — 기억에 남을 문장}"

---

## 📤 친구에게 공유하기
<button onclick="navigator.clipboard.writeText('https://tennisfriends.kr/blog/{slug}'); alert('공유 링크가 복사되었습니다 📎');">공유하기 📎</button>
```

---

## 5️⃣ 품질 기준

| 항목      | 기준                   | 설명         |
| ------- | -------------------- | ---------- |
| 길이      | 1,800~2,300자         | SEO 최적 범위  |
| H2/H3   | 5~7개                 | 구조화 데이터 일관 |
| 키워드 다양성 | 메인 3개 + LSI 5개       | 시맨틱 커버리지   |
| 질문-답변  | 질문형 ≥2               | FAQ 자동 인식  |
| 지역 언급  | 지역 언급 ≥1             | 로컬 검색 강화   |
| CTA     | 중간·하단 각 1개           | 클릭 유도      |
| 감성 문장   | 2~3회 등장              | 몰입도 상승     |
| 내부 링크   | 최소 3개                | 체류시간 향상    |
| 인용 문장   | 1개                   | 브랜드 일관성    |
| 성능 최적화 | LCP < 2.5s, FID < 100ms, CLS < 0.1 | 성능 최적화 |
| 접근성     | WCAG AA 준수           | 스크린 리더 지원 |
| 이미지 최적화 | WebP 포맷, 75% 품질, lazy loading | 로딩 속도 |
| 구조화 데이터 | JSON-LD 스키마 마크업      | 리치 스니펫 |
| 평균 점수   | **95점 이상 = 발행 승인** ✅ |            |

---

## 6️⃣ 전환 장치 예시

| 위치    | 문장 예시                                                               | 기능       |
| ----- | ------------------------------------------------------------------- | -------- |
| 본문 중간 | "지금 당신의 라켓 밸런스를 점검해보세요 👉 [라켓 밸런스 가이드](/blog/racket-balance-guide)" | 중간 클릭 유도 |
| 결말 전  | "이 글이 도움이 됐다면, 다음엔 스트링 텐션 감각편을 읽어보세요."                              | 세션 확장    |
| 하단 버튼 | "📎 친구에게 공유해보세요 — 좋은 팁은 함께 나누면 두 배로 기억됩니다."                         | 공유율 ↑    |
| 이미지 CTA | "이미지: 라켓 밸런스 측정 중인 테니스 선수" + 클릭 유도 텍스트 | 시각적 전환 |
| FAQ 섹션 | "자주 묻는 질문" + 아코디언 UI | 체류시간 ↑ |
| 관련 콘텐츠 | 카드형 관련 글 추천 | 세션 확장 |

---

## 7️⃣ AI 시스템 프롬프트

> 🧠 **System Prompt:**
>
> ```
> You are TennisFriends' editorial AI.  
> Write a human-centered, search-optimized, mobile-first tennis article.  
> 
> REQUIREMENTS:
> - Emotional storytelling with coach-like tone
> - Clear structure with 5-7 H2/H3 headings
> - Strong internal linking (minimum 3 links)
> - Target length: 1,800–2,200 words
> - Mobile-first design (2-line paragraphs, 16px touch targets)
> - Performance optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1)
> - Accessibility compliance (WCAG AA, alt text, ARIA labels)
> - SEO optimization (keywords, meta tags, structured data)
> - Q&A format, FAQ schema
> - Local context, regional keywords
> 
> OUTPUT: JSON with metadata and markdown content
> 
> QUALITY CHECKLIST:
> ✅ SEO: Main keywords 3x, LSI keywords 5x, natural distribution
> ✅ Q&A: Question-answer format, FAQ schema markup
> ✅ Local: Local context, regional mentions
> ✅ Mobile: Touch-friendly, responsive, fast loading
> ✅ Accessibility: Screen reader friendly, keyboard navigation
> ✅ Performance: WebP images, lazy loading, minimal CSS
> ✅ Engagement: Emotional hooks, coach stories, actionable tips
> ✅ Conversion: Internal links, CTAs, social sharing
> 
> TARGET SCORE: 95+ points for publication approval
> ```

---

## 8️⃣ 핵심 포인트 요약

| 측면      | 강점                        |
| ------- | ------------------------- |
| **SEO** | 구조적 키워드 분포 + H2 레벨링 완전 대응 |
| **Q&A** | 자연스러운 Q&A + 인용문 형식        |
| **지역** | 위치 기반 맥락 문장 자동 포함         |
| **UX**  | 모바일 최적 문단 리듬, 스크롤 체류 유도   |
| **브랜딩** | 코치 톤 + 인간적 결말 + 공유 유도     |
| **전환**  | CTA 2단계 설계 (도구 → 다음 글)    |
| **성능**  | Core Web Vitals 최적화      |
| **접근성** | WCAG AA 준수 + 스크린 리더 지원 |
| **구조화** | 구조화 데이터 + 명확한 답변        |

---

## 9️⃣ CSS 최적화 가이드

```css
/* 모바일 우선 반응형 디자인 */
.blog-container {
  max-width: 100%;
  padding: 1rem;
  line-height: 1.6;
}

/* 터치 친화적 버튼 */
.btn-primary {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
}

/* 반응형 테이블 */
.mobile-table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

/* 이미지 최적화 */
.blog-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

/* FAQ 아코디언 */
.faq-section details {
  margin: 1rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
}

/* 공유 버튼 */
.share-btn {
  background: #0BA360;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

/* 목차 스타일 */
.table-of-contents {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.table-of-contents ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.table-of-contents li {
  margin: 0.5rem 0;
}

.table-of-contents a {
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.table-of-contents a:hover {
  color: #0BA360;
}

/* 유틸리티 그리드 */
.utility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.utility-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.utility-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.utility-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.utility-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.utility-card p {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

/* 블로그 포스트 그리드 */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.blog-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.blog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.blog-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.blog-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1rem 1rem 0.5rem 1rem;
}

.blog-card p {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 1rem 1rem 1rem;
  line-height: 1.4;
}

/* 버튼 스타일 */
.btn-primary {
  background: #0BA360;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  transition: background-color 0.2s;
  margin: 0 1rem 1rem 1rem;
}

.btn-primary:hover {
  background: #19C37D;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  transition: background-color 0.2s;
  margin: 0 1rem 1rem 1rem;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

/* 모바일 최적화 */
@media (max-width: 768px) {
  .blog-container {
    padding: 0.5rem;
  }
  
  .related-content {
    grid-template-columns: 1fr;
  }
  
  .content-card {
    margin: 0.5rem 0;
  }
}
```

---

✅ **결론:**
이 포맷은 단순히 SEO가 아니라,

* 인간적 공감 + AI 친화적 구조,
* 질문-답변 형식 + 구조화 데이터,
* 지역 기반 검색 + 로컬 최적화,
* 모바일 우선 + 접근성 필수,
* Core Web Vitals + 성능 최적화,
* 그리고 **독자의 행동(클릭·공유·재방문)** 까지 설계된
  완성형 퍼포먼스 콘텐츠 템플릿입니다.

🎯 **목표:** 95점 이상 품질 점수로 검색 상위 노출 및 사용자 만족도 극대화
