'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Answer {
  question: string;
  value: string;
}

const questions = [
  {
    id: 1,
    question: '테니스를 시작한 지 얼마나 되었나요?',
    options: [
      { value: 'beginner', label: '6개월 미만 (초보자)', description: '기본 스트로크를 배우는 단계' },
      { value: 'novice', label: '6개월~2년 (초급자)', description: '기본 스트로크를 익히고 있는 단계' },
      { value: 'intermediate', label: '2~5년 (중급자)', description: '일정한 스트로크를 구사할 수 있는 단계' },
      { value: 'advanced', label: '5년 이상 (상급자)', description: '고급 기술을 구사할 수 있는 단계' },
    ],
  },
  {
    id: 2,
    question: '현재 가장 자신 있는 스트로크는 무엇인가요?',
    options: [
      { value: 'forehand', label: '포핸드 스트로크', description: '정확도와 파워가 일정한 수준' },
      { value: 'backhand', label: '백핸드 스트로크', description: '안정적인 백핸드 구사 가능' },
      { value: 'serve', label: '서브', description: '일정한 서브 구사 가능' },
      { value: 'volley', label: '발리', description: '네트 플레이에 자신 있음' },
    ],
  },
  {
    id: 3,
    question: '경기에서 가장 어려워하는 상황은 무엇인가요?',
    options: [
      { value: 'pressure', label: '압박 상황', description: '상대방의 강한 공격에 대응하기 어려움' },
      { value: 'consistency', label: '일관성 유지', description: '연속된 스트로크에서 실수 발생' },
      { value: 'strategy', label: '전략적 플레이', description: '상황에 맞는 샷 선택이 어려움' },
      { value: 'mental', label: '멘탈 관리', description: '긴장하거나 흥분하면 실력 저하' },
    ],
  },
];

const results = {
  '1.0-1.5': {
    level: 'NTRP 1.0-1.5',
    title: '테니스 입문자',
    summary: [
      '테니스를 막 시작한 단계로, 기본적인 스트로크를 배우고 있습니다.',
      '공을 넘기는 것에 집중하고, 기본 자세와 그립을 익히는 것이 중요합니다.',
      '규칙적인 연습과 기본기 다지기에 집중하세요.',
    ],
    actions: [
      '🎯 기본 스트로크 연습 (포핸드, 백핸드 각 20회씩)',
      '🧩 올바른 그립과 자세 익히기',
      '⏱️ 주 2-3회, 30분씩 기본기 연습',
    ],
    nextSteps: [
      { title: '테니스 성향 알아보기', href: '/utility/tennis-type' },
      { title: '라켓 추천받기', href: '/utility/racket-recommender' },
      { title: '규칙 퀴즈 풀기', href: '/utility/rules-quiz' },
    ],
  },
  '2.0-2.5': {
    level: 'NTRP 2.0-2.5',
    title: '초급자',
    summary: [
      '기본 스트로크를 익히고 있으며, 일정한 수준의 플레이가 가능합니다.',
      '정확도보다는 공을 넘기는 것에 집중하고, 기본 기술을 다지는 단계입니다.',
      '규칙적인 연습과 기본기 향상에 집중하세요.',
    ],
    actions: [
      '🎯 기본 스트로크 정확도 향상 (타겟 연습)',
      '🧩 서브와 리턴 연습',
      '⏱️ 주 3-4회, 45분씩 연습',
    ],
    nextSteps: [
      { title: '테니스 성향 알아보기', href: '/utility/tennis-type' },
      { title: '라켓 추천받기', href: '/utility/racket-recommender' },
      { title: '부상 예방 체크', href: '/utility/injury-risk' },
    ],
  },
  '3.0-3.5': {
    level: 'NTRP 3.0-3.5',
    title: '중급자',
    summary: [
      '일정한 수준의 스트로크를 구사할 수 있으며, 기본적인 전략을 이해하고 있습니다.',
      '정확도와 일관성을 높이는 것이 중요하며, 다양한 샷을 연습해야 합니다.',
      '경기 경험을 쌓고 전략적 사고를 기르는 단계입니다.',
    ],
    actions: [
      '🎯 다양한 샷 연습 (스핀, 드롭샷, 로브)',
      '🧩 경기 전략과 포지셔닝 연습',
      '⏱️ 주 4-5회, 1시간씩 연습',
    ],
    nextSteps: [
      { title: '경기 기록 분석', href: '/utility/match-analyzer' },
      { title: '라켓 추천받기', href: '/utility/racket-recommender' },
      { title: '스트링 텐션 계산', href: '/utility/string-tension' },
    ],
  },
  '4.0-4.5': {
    level: 'NTRP 4.0-4.5',
    title: '중상급자',
    summary: [
      '고급 기술을 구사할 수 있으며, 전략적 플레이가 가능합니다.',
      '일관성과 정확도를 높이고, 다양한 상황에 대응할 수 있는 기술을 연마해야 합니다.',
      '경기에서의 멘탈 관리와 전략적 사고가 중요한 단계입니다.',
    ],
    actions: [
      '🎯 고급 기술 연습 (서브 앤 발리, 어프로치 샷)',
      '🧩 경기 멘탈 관리와 집중력 향상',
      '⏱️ 주 5-6회, 1.5시간씩 연습',
    ],
    nextSteps: [
      { title: '경기 기록 분석', href: '/utility/match-analyzer' },
      { title: '스트링 텐션 계산', href: '/utility/string-tension' },
      { title: '부상 예방 체크', href: '/utility/injury-risk' },
    ],
  },
  '5.0+': {
    level: 'NTRP 5.0+',
    title: '상급자',
    summary: [
      '모든 기본 기술을 숙련되게 구사할 수 있으며, 고급 전략을 이해하고 있습니다.',
      '일관성, 정확도, 파워를 모두 갖춘 완성도 높은 플레이가 가능합니다.',
      '세부 기술의 완성도와 경기에서의 멘탈 관리가 중요한 단계입니다.',
    ],
    actions: [
      '🎯 세부 기술 완성도 향상 (각 샷의 정확도 극대화)',
      '🧩 경기 전략과 멘탈 관리 고도화',
      '⏱️ 주 6회 이상, 2시간씩 고강도 연습',
    ],
    nextSteps: [
      { title: '경기 기록 분석', href: '/utility/match-analyzer' },
      { title: '스트링 텐션 계산', href: '/utility/string-tension' },
      { title: '부상 예방 체크', href: '/utility/injury-risk' },
    ],
  },
};

export default function SkillAnalyzer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<{
    level: string;
    title: string;
    summary: string[];
    actions: string[];
    nextSteps: { title: string; href: string }[];
  } | null>(null);

  const handleAnswer = (questionId: number, value: string) => {
    const newAnswer = { question: `question_${questionId}`, value };
    const updatedAnswers = answers.filter(a => a.question !== `question_${questionId}`);
    updatedAnswers.push(newAnswer);
    setAnswers(updatedAnswers);

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // 결과 계산
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (answers: Answer[]) => {
    // 간단한 점수 계산 로직 (실제로는 더 복잡한 알고리즘 사용)
    let score = 0;
    
    answers.forEach(answer => {
      switch (answer.value) {
        case 'beginner':
          score += 1;
          break;
        case 'novice':
          score += 2;
          break;
        case 'intermediate':
          score += 3;
          break;
        case 'advanced':
          score += 4;
          break;
        case 'forehand':
        case 'backhand':
          score += 1;
          break;
        case 'serve':
          score += 2;
          break;
        case 'volley':
          score += 3;
          break;
        case 'pressure':
          score += 1;
          break;
        case 'consistency':
          score += 2;
          break;
        case 'strategy':
          score += 3;
          break;
        case 'mental':
          score += 2;
          break;
      }
    });

    // 점수에 따른 레벨 결정
    let level;
    if (score <= 3) level = '1.0-1.5';
    else if (score <= 5) level = '2.0-2.5';
    else if (score <= 7) level = '3.0-3.5';
    else if (score <= 9) level = '4.0-4.5';
    else level = '5.0+';

    setResult(results[level as keyof typeof results] || null);
  };

  const reset = () => {
    setCurrentStep(1);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {/* 결과 헤더 */}
            <div className="text-center mb-8">
              <h1 className="text-h1 font-bold text-neutral-ink mb-4">
                분석 결과
              </h1>
              <div className="badge-lime text-h3 px-6 py-3">
                {result.level}
              </div>
            </div>

            {/* 결과 카드 */}
            <div className="card mb-8">
              <div className="card-header">
                <h2 className="text-h2 font-bold text-neutral-ink mb-4">
                  {result.title}
                </h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  {result.summary.map((sentence: string, index: number) => (
                    <p key={index} className="text-body text-neutral-sub">
                      {sentence}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* 다음 행동 */}
            <div className="card mb-8">
              <div className="card-header">
                <h3 className="text-h3 font-bold text-neutral-ink mb-4">
                  다음 3가지 행동
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {result.actions.map((action: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-h3">{action.split(' ')[0]}</span>
                      <span className="text-body text-neutral-sub">
                        {action.split(' ').slice(1).join(' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 관련 추천 */}
            <div className="card mb-8">
              <div className="card-header">
                <h3 className="text-h3 font-bold text-neutral-ink mb-4">
                  추천 도구
                </h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.nextSteps.map((step: { title: string; href: string }, index: number) => (
                    <Link
                      key={index}
                      href={step.href}
                      className="btn-secondary text-center"
                    >
                      {step.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={reset} className="btn-secondary">
                다시 분석하기
              </button>
              <button 
                onClick={() => {
                  const resultText = `${result.level} - ${result.title}\n\n요약:\n${result.summary.join('\n')}\n\n다음 행동:\n${result.actions.join('\n')}`;
                  navigator.clipboard.writeText(resultText);
                  alert('결과가 클립보드에 복사되었습니다!');
                }}
                className="btn-primary"
              >
                결과 복사하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 섹션 */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6" style={{backgroundColor: '#DBEAFE', color: '#1E40AF'}}>
              NTRP 테스트
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{color: 'var(--neutral-ink)'}}>
              나의 테니스 실력은 몇 점?
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{color: 'var(--neutral-sub)'}}>
              전 세계에서 쓰는 테니스 등급 시스템 &apos;NTRP&apos;로 당신의 실력을 진단해보세요.
            </p>
            
            {/* 정보 박스 */}
            <div className="bg-gray-100 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{backgroundColor: 'var(--primary-green)'}}>
                  i
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold mb-2" style={{color: 'var(--neutral-ink)'}}>NTRP란?</h3>
                  <p className="text-base leading-relaxed" style={{color: 'var(--neutral-sub)'}}>
                    National Tennis Rating Program의 약자로, 미국테니스협회(USTA)에서 개발한 테니스 실력 등급 시스템입니다. 
                    1.5부터 7.0까지의 척도로 테니스 선수의 기술 수준을 평가합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 스테퍼 */}
          <div className="stepper mb-12">
            {questions.map((_, index) => (
              <div key={index} className="stepper-step">
                <div
                  className={`stepper-number ${
                    index + 1 < currentStep
                      ? 'stepper-number-completed'
                      : index + 1 === currentStep
                      ? 'stepper-number-active'
                      : 'stepper-number-inactive'
                  }`}
                >
                  {index + 1}
                </div>
                {index < questions.length - 1 && (
                  <div className="w-16 h-0.5 bg-neutral-border mx-2"></div>
                )}
              </div>
            ))}
          </div>

          {/* 질문 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--neutral-ink)'}}>
                {questions[currentStep - 1].question}
              </h2>
            </div>
            <div className="space-y-4 mb-8">
              {questions[currentStep - 1].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(questions[currentStep - 1].id, option.value)}
                  className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="text-lg font-semibold mb-2" style={{color: 'var(--neutral-ink)'}}>
                    {option.label}
                  </div>
                  <div className="text-base" style={{color: 'var(--neutral-sub)'}}>
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
            
            {/* 진행률 및 버튼 */}
            <div className="flex justify-between items-center">
              <div className="text-sm" style={{color: 'var(--neutral-sub)'}}>
                {currentStep} / {questions.length} 단계
              </div>
              <button
                onClick={goToNextStep}
                className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: answers.some(a => a.question === `question_${currentStep}`) ? 'var(--primary-green)' : '#9CA3AF',
                  cursor: answers.some(a => a.question === `question_${currentStep}`) ? 'pointer' : 'not-allowed'
                }}
                disabled={!answers.some(a => a.question === `question_${currentStep}`)}
              >
                {currentStep < questions.length ? '다음 →' : '결과 보기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
