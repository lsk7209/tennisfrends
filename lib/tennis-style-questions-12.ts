// 테니스 성향 7유형 진단 문제 뱅크 (12개 질문)
export interface StyleQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    score: {
      ABL?: number;
      CP?: number;
      SV?: number;
      AC?: number;
      CONS?: number;
      FSA?: number;
      TAC?: number;
    };
  }[];
}

export const STYLE_QUESTIONS: StyleQuestion[] = [
  {
    id: 1,
    question: "베이스라인 랠리에서 가장 선호하는 접근은?",
    options: [
      { label: "강한 스트로크로 먼저 압박해 위너를 노린다", score: { ABL: 3, FSA: 1 } },
      { label: "상대 실수를 유도하며 길게 버틴다", score: { CP: 2, CONS: 2 } },
      { label: "상황에 맞게 강약 조절해 전환 타이밍을 본다", score: { TAC: 2, AC: 2 } },
      { label: "각도와 스핀으로 코트를 넓혀 흔든다", score: { ABL: 1, TAC: 3 } },
      { label: "불필요한 리스크는 줄이고 안정적으로 넘긴다", score: { CONS: 3 } }
    ]
  },
  {
    id: 2,
    question: "서브에서 가장 자주 쓰는 전략은?",
    options: [
      { label: "첫 서브 강하게, 리턴 약점으로 일찍 끝낸다", score: { FSA: 3, ABL: 1 } },
      { label: "슬라이스/킥으로 리턴을 띄워 네트 진입", score: { SV: 3, TAC: 1 } },
      { label: "구속보다 코스와 패턴으로 포인트를 설계", score: { TAC: 3 } },
      { label: "상황 따라 강약/구질/코스 다양화", score: { AC: 3 } },
      { label: "더블폴트를 줄이는 안정적 루틴", score: { CONS: 3 } }
    ]
  },
  {
    id: 3,
    question: "상대의 강한 첫 서브에 대한 리턴은?",
    options: [
      { label: "짧게 블록 리턴 후 랠리에서 역습", score: { CP: 3 } },
      { label: "리턴부터 강하게 카운터 노린다", score: { ABL: 2, FSA: 1 } },
      { label: "리턴 깊게 넣고 네트로 붙어 압박", score: { SV: 3 } },
      { label: "리턴 코스 혼합으로 상대 패턴 깨기", score: { TAC: 2, AC: 1 } },
      { label: "안정적 컨택으로 인플레이 우선", score: { CONS: 3 } }
    ]
  },
  {
    id: 4,
    question: "네트 플레이에 대한 생각은?",
    options: [
      { label: "서브/리턴 후 곧바로 네트 진입해 마무리", score: { SV: 3 } },
      { label: "찬스 볼에서만 선택적으로 네트 진입", score: { AC: 3 } },
      { label: "강한 스트로크로 수비를 끌어낸 후 마무리", score: { ABL: 2, FSA: 1 } },
      { label: "네트는 불편, 베이스라인 선호", score: { CP: 1, CONS: 2 } },
      { label: "패턴에 따라 네트/베이스 적절 혼합", score: { TAC: 3 } }
    ]
  },
  {
    id: 5,
    question: "득점 기회에서 리스크 관리는?",
    options: [
      { label: "리스크가 있어도 한 방으로 끝낸다", score: { FSA: 3, ABL: 1 } },
      { label: "적당히 리스크를 감수해 주도권 확보", score: { ABL: 2, TAC: 1 } },
      { label: "리스크보다 실수 최소화가 우선", score: { CONS: 3 } },
      { label: "상대 성향에 맞춰 리스크 가변", score: { TAC: 3 } },
      { label: "긴 랠리에서 찬스가 커질 때까지 기다림", score: { CP: 2, CONS: 1 } }
    ]
  },
  {
    id: 6,
    question: "포핸드는 어떤 도구인가요?",
    options: [
      { label: "최대 무기, 강한 구속으로 압도", score: { ABL: 3 } },
      { label: "각과 깊이로 상대를 이동시켜 빈틈 창출", score: { TAC: 3 } },
      { label: "실수 줄이는 안정적 빌드업", score: { CONS: 3 } },
      { label: "초구에서 주도권을 잡는 스타터", score: { FSA: 2, ABL: 1 } },
      { label: "상황 따라 역할이 바뀌는 멀티툴", score: { AC: 3 } }
    ]
  },
  {
    id: 7,
    question: "상대가 네트로 붙을 때 당신의 대응은?",
    options: [
      { label: "패싱샷/로브로 카운터 준비 완료", score: { CP: 2, TAC: 1 } },
      { label: "빠르게 패싱샷 각도 만들기", score: { ABL: 2, FSA: 1 } },
      { label: "먼저 네트 선점해 실전 압박 대응", score: { SV: 3 } },
      { label: "로브/드롭 등 혼합으로 리듬 파괴", score: { TAC: 3 } },
      { label: "상황 따라 전위/후위 위치 전환", score: { AC: 3 } }
    ]
  },
  {
    id: 8,
    question: "세컨 서브는 어떻게 접근하나요?",
    options: [
      { label: "더블폴트 없는 안정 루틴", score: { CONS: 3 } },
      { label: "킥/슬라이스로 리턴 타점 흔들기", score: { TAC: 3 } },
      { label: "세컨도 적극적, 리턴 약점으로 전개", score: { FSA: 3 } },
      { label: "변화와 코스로 상황 대응", score: { AC: 3 } },
      { label: "세이프 코스로 인플레이 우선", score: { CP: 2 } }
    ]
  },
  {
    id: 9,
    question: "포인트를 어떻게 설계하나요?",
    options: [
      { label: "상대 패턴을 읽고 의도적으로 무너뜨림", score: { TAC: 3 } },
      { label: "상황 적응형으로 전환 주도", score: { AC: 3 } },
      { label: "실수 최소화 루틴으로 누적 우위", score: { CONS: 3 } },
      { label: "초구서브-3구 강공으로 단타 마무리", score: { FSA: 3 } },
      { label: "수비→역습 시나리오 반복", score: { CP: 3 } }
    ]
  },
  {
    id: 10,
    question: "가장 자신 있는 코트 표면은?",
    options: [
      { label: "하드 코트, 템포 빠른 환경", score: { FSA: 2, ABL: 1 } },
      { label: "클레이 코트, 랠리와 변주로 제어", score: { CP: 2, TAC: 1 } },
      { label: "잔디 코트, 서브와 네트 플레이", score: { SV: 3 } },
      { label: "표면 상관없이 적응 가능", score: { AC: 3 } },
      { label: "실수 적은 표면이 편하다", score: { CONS: 3 } }
    ]
  },
  {
    id: 11,
    question: "브레이크 포인트 등 승부처에서의 선택은?",
    options: [
      { label: "강한 서브/공격으로 주도권", score: { FSA: 3, ABL: 1 } },
      { label: "루틴 유지, 범실 최소화", score: { CONS: 3 } },
      { label: "상대 성향 역이용한 패턴 선택", score: { TAC: 3 } },
      { label: "길게 교환하며 실수 유도", score: { CP: 3 } },
      { label: "상황 적응형 선택", score: { AC: 3 } }
    ]
  },
  {
    id: 12,
    question: "스스로 정의하는 나의 경기 스타일은?",
    options: [
      { label: "상황 적응형 올라운더", score: { AC: 3 } },
      { label: "패턴 설계형 전술가", score: { TAC: 3 } },
      { label: "일관성·안정 중시", score: { CONS: 3 } },
      { label: "초반 주도권 장악형", score: { FSA: 2, ABL: 1 } },
      { label: "수비→역습형", score: { CP: 3 } }
    ]
  }
];

// 스타일 메타데이터
export const STYLE_META = {
  ABL: {
    name: "공격형 베이스라이너",
    color: "#E74C3C",
    summary: [
      "강한 구속과 깊이로 주도권을 잡는 타입",
      "짧은 볼에서 결정력 우수",
      "초반 압박으로 상대 시간을 빼앗음"
    ],
    strengths: ["포핸드 파워", "앵글 압박", "짧은 볼 마무리"],
    pitfalls: ["무리한 강공 시 범실 증가", "서브 안정성 기복"],
    training: [
      "리스크 관리 기준선 설정: 강공 7/10 이상일 때만",
      "서브 확률형 루틴 구축",
      "수비에서 공격 전환 패턴 3가지 고정"
    ],
    slogan: "압도하라, 흔들리기 전에 끝낸다."
  },
  CP: {
    name: "카운터펀처",
    color: "#2E86C1",
    summary: [
      "견고한 수비와 전환으로 실수 유도",
      "상대 템포를 이용한 역공",
      "긴 랠리에서도 집중 유지"
    ],
    strengths: ["커버리지", "수비→공격 전환", "멘탈 안정"],
    pitfalls: ["기회 창출 속도 저하", "수비 일변도 시 주도권 상실"],
    training: [
      "짧은 볼 선제 전환 훈련(2구 전진)",
      "패싱샷 코스 3개 자동화",
      "하이볼 백핸드 딥 컨트롤 강화"
    ],
    slogan: "흔들리지 말고, 기회를 기다려 역습하라."
  },
  SV: {
    name: "서브&발리어",
    color: "#27AE60",
    summary: [
      "초구 우위와 네트 접점에서 마무리",
      "리턴 유도 각 만들기",
      "복식에서 강력"
    ],
    strengths: ["첫 서브 효과", "발리 마무리", "네트 포지셔닝"],
    pitfalls: ["로브 대처", "첫 볼 미스 시 리스크"],
    training: [
      "세컨 서브 킥/슬라이스 심화",
      "퍼스트 발리 낮은 볼 처리",
      "로브 대비 백스텝-오버헤드 루틴"
    ],
    slogan: "앞으로 나가라, 코트를 줄여라."
  },
  AC: {
    name: "올라운더",
    color: "#F1C40F",
    summary: [
      "상황 적응형으로 전술 선택 폭이 넓음",
      "공격/수비 전환 능숙",
      "코트 표면 대응력 높음"
    ],
    strengths: ["균형감", "상황 판단", "전술 다양성"],
    pitfalls: ["결정력 애매", "정체성 약화 시 흔들림"],
    training: [
      "핵심 마무리 패턴 2개 고정",
      "상대별 프리게임 플랜 템플릿화",
      "네트·베이스 전환 트리거 명확화"
    ],
    slogan: "무기는 많되, 선택은 정확히."
  },
  CONS: {
    name: "일관성형",
    color: "#7F8C8D",
    summary: [
      "낮은 범실과 안정 루틴",
      "길게 가져가 실수 유도",
      "멘탈 기복이 적음"
    ],
    strengths: ["안정성", "실수 최소화", "랠리 지속력"],
    pitfalls: ["주도권 확보 지연", "결정력 부족"],
    training: [
      "결정 타이밍 시그널 훈련",
      "세컨볼 포지션-인 패턴",
      "드롭/슬라이스로 변주 추가"
    ],
    slogan: "흔들림 없이, 점수를 쌓는다."
  },
  FSA: {
    name: "퍼스트 스트라이커",
    color: "#8E44AD",
    summary: [
      "초구-3구에서 포인트 결정",
      "서브/리턴 공격 지향",
      "페이스를 끌어올림"
    ],
    strengths: ["첫 서브 위력", "리턴 강공", "단타 마무리"],
    pitfalls: ["정확도 하락 시 리스크 확대", "수비 전환 미흡"],
    training: [
      "첫 서브 확률 60%→65% 루틴",
      "3구 패턴 2개 자동화",
      "수비 전환 백핸드 슬라이스"
    ],
    slogan: "먼저 치고 나가라, 시간을 지배하라."
  },
  TAC: {
    name: "전술가",
    color: "#34495E",
    summary: [
      "패턴 설계와 코트 운영 능숙",
      "상대 약점 공략 최적화",
      "샷 선택의 명확한 의도"
    ],
    strengths: ["패턴 설계", "코스·구질 다양성", "상대 분석"],
    pitfalls: ["지나친 설계로 템포 저하", "결정력 부족 가능"],
    training: [
      "킬패턴 1개를 더 빠르게",
      "서브-리턴 코스 분포 숫자화",
      "상대별 게임플랜 카드 만들기"
    ],
    slogan: "읽고, 설계하고, 끝내라."
  }
};

// 점수 계산 함수
export function calculateStyleScore(answers: Record<number, number>): string {
  const totals = { ABL: 0, CP: 0, SV: 0, AC: 0, CONS: 0, FSA: 0, TAC: 0 };
  
  // 각 답변에 대해 점수 누적
  Object.entries(answers).forEach(([questionId, answerIndex]) => {
    const question = STYLE_QUESTIONS.find(q => q.id === parseInt(questionId));
    if (question && question.options[answerIndex]) {
      const scores = question.options[answerIndex].score;
      Object.entries(scores).forEach(([style, points]) => {
        if (points) {
          totals[style as keyof typeof totals] += points;
        }
      });
    }
  });
  
  // 최고 점수 찾기
  const maxScore = Math.max(...Object.values(totals));
  const topStyles = Object.entries(totals)
    .filter(([, score]) => score === maxScore)
    .map(([style]) => style);
  
  // 동점인 경우 타이브레이커 적용
  if (topStyles.length > 1) {
    return resolveTiebreaker(topStyles, answers);
  }
  
  return topStyles[0];
}

// 타이브레이커 해결 함수
function resolveTiebreaker(tiedStyles: string[], answers: Record<number, number>): string {
  const tiebreakerQuestions = [5, 9, 12]; // 12개 질문에 맞게 조정
  
  for (const questionId of tiebreakerQuestions) {
    const answerIndex = answers[questionId];
    if (answerIndex !== undefined) {
      const question = STYLE_QUESTIONS.find(q => q.id === questionId);
      if (question && question.options[answerIndex]) {
        const scores = question.options[answerIndex].score;
        const styleScores = tiedStyles.map(style => ({
          style,
          score: scores[style as keyof typeof scores] || 0
        }));
        
        const maxTieScore = Math.max(...styleScores.map(s => s.score));
        const winners = styleScores.filter(s => s.score === maxTieScore).map(s => s.style);
        
        if (winners.length === 1) {
          return winners[0];
        }
        if (winners.length < tiedStyles.length) {
          return resolveTiebreaker(winners, answers);
        }
      }
    }
  }
  
  // 모든 타이브레이커에서도 동점이면 AC 선택
  return 'AC';
}
