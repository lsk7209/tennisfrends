'use client';

import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: '김테니스',
    level: 'NTRP 3.5',
    content: '정말 정확해요! 제가 생각했던 것보다 낮은 레벨이었는데, 추천받은 연습법으로 2개월 만에 실력이 늘었어요.',
    rating: 5,
  },
  {
    id: 2,
    name: '이라켓',
    level: 'NTRP 4.0',
    content: '라켓 추천이 완벽했어요. 기존에 쓰던 라켓보다 훨씬 편하고 파워도 좋아졌습니다.',
    rating: 5,
  },
  {
    id: 3,
    name: '박성향',
    level: 'NTRP 2.5',
    content: '테니스 성향 분석으로 제가 어떤 스타일인지 알게 되었어요. 이제 연습 방향이 명확해졌습니다.',
    rating: 5,
  },
  {
    id: 4,
    name: '최분석',
    level: 'NTRP 3.0',
    content: '경기 기록 분석 기능이 대단해요. 승부 패턴을 알려주니까 다음 경기 전략을 세우기 쉬워졌어요.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const testimonial = testimonials[currentTestimonial];
    let index = 0;
    setDisplayText('');

    const typeWriter = () => {
      if (index < testimonial.content.length) {
        setDisplayText(testimonial.content.slice(0, index + 1));
        index++;
        setTimeout(typeWriter, 50);
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, [currentTestimonial]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-h1 font-bold text-neutral-ink mb-4">
            테니스프렌즈를 사용하는 분들의 이야기
          </h2>
          <p className="text-body text-neutral-sub max-w-2xl mx-auto">
            실제 사용자들이 경험한 변화와 만족도를 확인해보세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card text-center">
            <div className="card-body">
              {/* 별점 */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-yellow-400">⭐</span>
                ))}
              </div>

              {/* 후기 내용 */}
              <blockquote className="text-h3 text-neutral-ink mb-8 min-h-[120px] flex items-center justify-center">
                <p className="leading-relaxed">
                  "{displayText}
                  <span className="animate-pulse">|</span>"
                </p>
              </blockquote>

              {/* 사용자 정보 */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center text-white font-bold">
                  {current.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sub font-medium text-neutral-ink">{current.name}</p>
                  <p className="text-cap text-neutral-sub">{current.level}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? 'bg-primary-green'
                    : 'bg-neutral-border'
                }`}
                aria-label={`후기 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>

        {/* 통계 */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-h1 font-bold text-primary-green mb-2">1,200+</div>
            <div className="text-sub text-neutral-sub">분석 완료</div>
          </div>
          <div>
            <div className="text-h1 font-bold text-primary-blue mb-2">95%</div>
            <div className="text-sub text-neutral-sub">만족도</div>
          </div>
          <div>
            <div className="text-h1 font-bold text-accent-lime mb-2">4.8/5</div>
            <div className="text-sub text-neutral-sub">평균 평점</div>
          </div>
        </div>
      </div>
    </section>
  );
}
