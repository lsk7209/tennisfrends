# 블로그 템플릿 구조 가이드

## 개요
참고 블로그: [테니스 라켓 선택 가이드](https://tennisfrends.vercel.app/blog/tennis-racket-selection)의 구조를 분석하여 최적화된 블로그 템플릿을 개발합니다.

## 핵심 구조 요소

### 1. 도입부 (Introduction)
```tsx
<section id="introduction">
  <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-8 rounded-xl border-l-4 border-[#0BA360] mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">🎾 제목</h2>
    <p className="text-[#64748B] leading-relaxed text-lg">
      도입부 설명 텍스트
    </p>
  </div>
</section>
```

### 2. 목차 (Table of Contents)
```tsx
<section>
  <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">📋 목차</h2>
  <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
    <ol className="space-y-3 text-[#64748B] text-lg">
      <li className="flex items-center gap-3">
        <span className="w-6 h-6 bg-[#0BA360] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
        목차 항목 1
      </li>
      // ... 더 많은 목차 항목
    </ol>
  </div>
</section>
```

### 3. 본문 섹션 (Main Content)
```tsx
<section id="main-content">
  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">섹션 제목</h2>
  
  {/* 그리드 레이아웃 */}
  <div className="grid md:grid-cols-2 gap-6 mb-8">
    <div>
      <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🏸 서브 제목</h3>
      <p className="text-[#64748B] mb-4">설명 텍스트</p>
      <ul className="space-y-2 text-[#64748B]">
        <li>• <strong>항목</strong>: 설명</li>
      </ul>
    </div>
  </div>

  {/* 정보 박스 */}
  <div className="bg-[#F8FAFC] p-6 rounded-lg mb-8">
    <h3 className="text-xl font-semibold text-[#0F172A] mb-4">💡 핵심 원칙</h3>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="text-center">
        <div className="text-3xl mb-2">🎯</div>
        <h4 className="font-semibold text-[#0F172A] mb-2">제목</h4>
        <p className="text-sm text-[#64748B]">설명</p>
      </div>
    </div>
  </div>

  {/* 테이블 */}
  <div className="border border-[#E2E8F0] rounded-lg p-6">
    <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📏 비교 테이블</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F8FAFC]">
            <th className="p-3 text-left">항목</th>
            <th className="p-3 text-left">특징</th>
            <th className="p-3 text-left">추천 대상</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3 font-medium">항목 1</td>
            <td className="p-3">특징 설명</td>
            <td className="p-3">추천 대상</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

### 4. 결론 (Conclusion)
```tsx
<section id="conclusion">
  <div className="bg-gradient-to-r from-[#0BA360]/10 to-[#19C37D]/10 p-6 rounded-lg">
    <h2 className="text-2xl font-bold text-[#0F172A] mb-4">🎯 결론 제목</h2>
    <p className="text-[#64748B] leading-relaxed mb-4">
      결론 내용
    </p>
    <div className="bg-white p-4 rounded-lg">
      <h3 className="font-semibold text-[#0F172A] mb-2">💡 기억하세요!</h3>
      <ul className="space-y-1 text-[#64748B] text-sm">
        <li>• 핵심 포인트 1</li>
        <li>• 핵심 포인트 2</li>
      </ul>
    </div>
  </div>
</section>
```

### 5. 관련 유틸리티 (Related Utilities)
```tsx
<section id="related-utilities">
  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">🔧 관련 유틸리티</h2>
  <div className="grid md:grid-cols-2 gap-4">
    <Link href="/utility/example">
      <div className="border border-[#E2E8F0] rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-2">🎾 유틸리티 제목</h3>
        <p className="text-[#64748B] text-sm">
          유틸리티 설명
        </p>
      </div>
    </Link>
  </div>
</section>
```

## 디자인 원칙

### 색상 팔레트
- **주 색상**: `#0BA360` (테니스프렌즈 그린)
- **보조 색상**: `#19C37D` (라이트 그린)
- **텍스트**: `#0F172A` (다크), `#64748B` (그레이)
- **배경**: `#F8FAFC` (라이트 그레이)

### 레이아웃 원칙
1. **그라데이션 도입부**: 핵심 메시지를 강조
2. **번호가 있는 목차**: 체계적인 정보 구조
3. **그리드 레이아웃**: 정보의 시각적 구분
4. **아이콘 활용**: 직관적인 정보 전달
5. **호버 효과**: 인터랙티브한 사용자 경험

### 반응형 디자인
- **모바일**: 1열 그리드
- **태블릿**: 2열 그리드
- **데스크톱**: 3열 그리드

## 적용 예시
이 구조를 테니스 코트 전략 가이드에 적용하여 더욱 체계적이고 읽기 쉬운 블로그 포스트를 만들 수 있습니다.
