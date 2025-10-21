// 테니스 규칙 퀴즈 문제 뱅크
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number; // 0-based index
  explanation: string;
  category: string;
  difficulty: 1 | 2 | 3; // 1=쉬움, 2=보통, 3=어려움
}

export const QUIZ_BANK: QuizQuestion[] = [
  {
    id: "Q1",
    category: "Serve",
    difficulty: 1,
    question: "서브 토스를 잡고 다시 던졌다. 반칙인가?",
    options: [
      "반칙(더블 폴트)",
      "반칙 아님(재토스 가능)",
      "경고 후 1포인트 감점",
      "리시버 재량"
    ],
    correct: 1,
    explanation: "타격 시도가 없다면 토스를 잡아 재시도 가능. 폴트 아님."
  },
  {
    id: "Q2",
    category: "Footfault",
    difficulty: 1,
    question: "서브 시 베이스라인을 밟았다.",
    options: [
      "풋폴트",
      "문제없음",
      "경고",
      "서버 포인트"
    ],
    correct: 0,
    explanation: "베이스라인 혹은 연장선 접촉은 풋폴트."
  },
  {
    id: "Q3",
    category: "Scoring",
    difficulty: 1,
    question: "단식에서 바깥쪽 사이드라인(복식 라인)은",
    options: [
      "인",
      "아웃",
      "첫 세트만 인",
      "듀스코트만 인"
    ],
    correct: 1,
    explanation: "단식은 안쪽 사이드라인 사용. 바깥 라인은 아웃."
  },
  {
    id: "Q4",
    category: "Let/Net",
    difficulty: 1,
    question: "리턴한 공이 네트를 맞고 상대 코트로 넘어갔다.",
    options: [
      "인",
      "아웃",
      "렛",
      "두 번 바운스 필요"
    ],
    correct: 0,
    explanation: "넘어가서 인코트에 떨어지면 인."
  },
  {
    id: "Q5",
    category: "Doubles",
    difficulty: 2,
    question: "복식 리시버 파트너가 공을 맞혔다.",
    options: [
      "인플레이 계속",
      "아웃",
      "렛",
      "서버 포인트"
    ],
    correct: 3,
    explanation: "리시버가 치지 못하고 파트너가 맞히면 서버 포인트."
  },
  {
    id: "Q6",
    category: "Tiebreak",
    difficulty: 2,
    question: "타이브레이크에서 콜 방식은?",
    options: [
      "포인트 합계만",
      "서버 점수만",
      "서버-리시버 순서 강조",
      "게임 스코어와 함께"
    ],
    correct: 2,
    explanation: "서버-리시버 순서가 중요. 올바른 콜 관행을 따른다."
  },
  {
    id: "Q7",
    category: "Let/Net",
    difficulty: 2,
    question: "공이 네트포스트를 맞고 상대 코트로 들어갔다.",
    options: [
      "아웃",
      "인",
      "무조건 렛",
      "서버만 인"
    ],
    correct: 1,
    explanation: "네트포스트 등 구조물은 인플레이. 상대 코트로 넘어가면 인."
  },
  {
    id: "Q8",
    category: "Hindrance",
    difficulty: 2,
    question: "리시버가 준비되지 않았음을 손들어 표시했다.",
    options: [
      "서버 폴트",
      "렛(리플레이)",
      "리시버 포인트",
      "경고"
    ],
    correct: 1,
    explanation: "정당한 준비 불가 시 렛 가능. 반복 남용은 매너 이슈."
  },
  {
    id: "Q9",
    category: "BallInPlay",
    difficulty: 2,
    question: "코트 외벽(펜스 등)을 맞고 다시 코트로 들어온 볼",
    options: [
      "인",
      "아웃",
      "렛",
      "대회 규정 따름"
    ],
    correct: 1,
    explanation: "코트 경계 밖 오브젝트 접촉은 아웃."
  },
  {
    id: "Q10",
    category: "Serve",
    difficulty: 2,
    question: "더블스에서 리시빙 포지션 변경 가능 시점은?",
    options: [
      "세트 중 언제든",
      "게임 진행 중 언제든",
      "포인트 중에도 가능",
      "게임 교대 시 가능"
    ],
    correct: 3,
    explanation: "게임 교대 때 리시빙 포지션 변경 가능."
  },
  {
    id: "Q11",
    category: "Return",
    difficulty: 2,
    question: "스핀 서브가 크게 휘어 들어올 때 리시버의 올바른 대응은?",
    options: [
      "미리 움직여 라켓을 크게 휘두른다",
      "짧은 백스윙과 안정된 면으로 블록",
      "베이스라인 뒤로 멀리 물러난다",
      "포핸드만 활용한다"
    ],
    correct: 1,
    explanation: "리턴은 짧고 단단한 라켓면으로 블록이 안전."
  },
  {
    id: "Q12",
    category: "Hindrance",
    difficulty: 3,
    question: "상대가 샷 직후 크게 소리를 질러 집중을 방해했다.",
    options: [
      "인정",
      "실격",
      "방해(Hindrance)로 렛 또는 포인트 박탈",
      "재경기 요청만 가능"
    ],
    correct: 2,
    explanation: "고의적 방해는 기준에 따라 포인트 박탈 가능."
  },
  {
    id: "Q13",
    category: "Scoring",
    difficulty: 3,
    question: "'노-렛 서브' 규정이 적용되는 이벤트에서 넷터치 서브가 인코트에 들어왔다.",
    options: [
      "서버 포인트",
      "렉 선언 후 재서브",
      "리시버 선택",
      "대회별 규정에 따름"
    ],
    correct: 0,
    explanation: "노-렛이면 인코트에 들어온 넷터치 서브는 그대로 진행(서버 포인트)."
  },
  {
    id: "Q14",
    category: "BallInPlay",
    difficulty: 3,
    question: "라켓이 손에서 미끄러져 네트를 넘어 상대 코트에 들어갔다(볼은 인코트로 들어감).",
    options: [
      "인",
      "아웃",
      "방해로 포인트 상실",
      "렛"
    ],
    correct: 2,
    explanation: "장비가 상대 코트에 침범하면 방해로 포인트 상실."
  },
  {
    id: "Q15",
    category: "Footfault",
    difficulty: 2,
    question: "베이스라인의 연장선을 가로질러 옆으로 나가 있었다.",
    options: [
      "풋폴트 아님",
      "풋폴트",
      "경고",
      "상대 선택"
    ],
    correct: 1,
    explanation: "연장선 침범도 풋폴트."
  },
  {
    id: "Q16",
    category: "Tiebreak",
    difficulty: 3,
    question: "슈퍼 타이브레이크(매치 타이브레이크) 기본 포인트 수는?",
    options: [
      "7포인트 선승",
      "10포인트 선승(2점차)",
      "12포인트 선승",
      "대회 재량"
    ],
    correct: 1,
    explanation: "일반적으로 10포인트 선승, 2점차. 대회 룰 확인 필요."
  },
  {
    id: "Q17",
    category: "Doubles",
    difficulty: 2,
    question: "복식에서 네트 근처 파트너가 리턴 전에 손을 들며 플레이 방식을 신호했다.",
    options: [
      "규칙 위반",
      "허용(전술 신호)",
      "렛",
      "경고"
    ],
    correct: 1,
    explanation: "비언어적 전술 신호는 허용."
  },
  {
    id: "Q18",
    category: "Let/Net",
    difficulty: 2,
    question: "인플레이 중 공이 네트 스트랩을 스치고 들어갔다.",
    options: [
      "인",
      "아웃",
      "렛",
      "서버만 인"
    ],
    correct: 0,
    explanation: "인플레이 구조물 접촉 후 상대코트 진입이면 인."
  },
  {
    id: "Q19",
    category: "Serve",
    difficulty: 3,
    question: "서브 동작 중 공을 떨어뜨려 바닥에 바운드된 후 타격했다.",
    options: [
      "허용",
      "폴트",
      "렛",
      "재서브"
    ],
    correct: 0,
    explanation: "임팩트가 규정 위치에서 이뤄지면 허용."
  },
  {
    id: "Q20",
    category: "Hindrance",
    difficulty: 2,
    question: "옆 코트 공이 들어와 플레이를 중단했다.",
    options: [
      "계속 진행",
      "렛 선언 후 리플레이",
      "즉시 포인트 종료, 서버 포인트",
      "경고"
    ],
    correct: 1,
    explanation: "외부 방해는 렛으로 리플레이."
  },
  {
    id: "Q21",
    category: "Scoring",
    difficulty: 2,
    question: "게임 스코어 고지에서 서버/리시버가 혼동되었다.",
    options: [
      "즉시 포인트 무효",
      "심판만 정정 가능",
      "플레이어 합의로 정정",
      "그대로 진행"
    ],
    correct: 2,
    explanation: "합의로 정정 가능. 분쟁 시 감독 판단."
  },
  {
    id: "Q22",
    category: "Doubles",
    difficulty: 3,
    question: "복식에서 리시버가 의도적으로 공을 잡아 플레이를 중단했다.",
    options: [
      "리시빙 팀 포인트 상실",
      "렛",
      "서버 포인트",
      "경고"
    ],
    correct: 2,
    explanation: "인플레이 중 공을 잡으면 서버 포인트."
  },
  {
    id: "Q23",
    category: "Return",
    difficulty: 2,
    question: "리턴 시 베이스라인 바깥(코트 뒤쪽)에서 시작해도 되나요?",
    options: [
      "불가",
      "가능",
      "첫 서브만 가능",
      "복식만 가능"
    ],
    correct: 1,
    explanation: "위치 제한 없음. 다만 풋폴트/시간 지연 주의."
  },
  {
    id: "Q24",
    category: "BallInPlay",
    difficulty: 3,
    question: "라켓에 공이 두 번 맞은 듯 보였다(더블 히트 의심). 고의는 아님.",
    options: [
      "아웃",
      "렛",
      "허용",
      "경고"
    ],
    correct: 2,
    explanation: "비고의적 더블 히트는 허용."
  }
];

// 카테고리별 색상 매핑
export const CATEGORY_COLORS = {
  "Serve": "emerald",
  "Return": "sky", 
  "Scoring": "amber",
  "Tiebreak": "indigo",
  "Let/Net": "teal",
  "Footfault": "rose",
  "Doubles": "violet",
  "Hindrance": "orange",
  "BallInPlay": "cyan"
} as const;

// 문제 선택 로직
export function selectQuizQuestions(bank: QuizQuestion[] = QUIZ_BANK): QuizQuestion[] {
  // 카테고리별 최소 1문항 보장
  const categories = [...new Set(bank.map(q => q.category))];
  const selected: QuizQuestion[] = [];
  const used = new Set<string>();
  
  // 각 카테고리에서 최소 1문항씩 선택
  for (const category of categories) {
    const categoryQuestions = bank.filter(q => q.category === category && !used.has(q.id));
    if (categoryQuestions.length > 0) {
      const random = Math.floor(Math.random() * categoryQuestions.length);
      selected.push(categoryQuestions[random]);
      used.add(categoryQuestions[random].id);
    }
  }
  
  // 남은 슬롯을 난이도 균형을 맞춰 채우기
  const remaining = 12 - selected.length;
  const available = bank.filter(q => !used.has(q.id));
  
  // 난이도별 분포 계산
  const difficultyCount = { 1: 0, 2: 0, 3: 0 };
  selected.forEach(q => difficultyCount[q.difficulty]++);
  
  // 남은 문항들을 난이도 균형을 맞춰 선택
  for (let i = 0; i < remaining && available.length > 0; i++) {
    // 난이도별 가중치 계산 (균형을 맞추기 위해)
    const weights = available.map(q => {
      const currentCount = difficultyCount[q.difficulty];
      const targetCount = Math.ceil(12 / 3); // 각 난이도당 목표 개수
      return targetCount - currentCount + 1; // 부족한 난이도에 가중치
    });
    
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = Math.random() * totalWeight;
    
    for (let j = 0; j < available.length; j++) {
      random -= weights[j];
      if (random <= 0) {
        selected.push(available[j]);
        used.add(available[j].id);
        difficultyCount[available[j].difficulty]++;
        available.splice(j, 1);
        break;
      }
    }
  }
  
  return selected.slice(0, 12);
}

// 점수 계산
export function calculateScore(answers: { questionId: string; answer: number; correct: boolean; category: string }[]) {
  const correct = answers.filter(a => a.correct).length;
  const total = answers.length;
  const score = Math.round((correct / total) * 100);
  
  // 등급 결정
  let grade = "Beginner";
  if (score >= 90) grade = "Rules Pro";
  else if (score >= 70) grade = "Match Ready";
  else if (score >= 40) grade = "Learning";
  
  // 카테고리별 오답 분석
  const wrongByCategory: Record<string, number> = {};
  answers.forEach(a => {
    if (!a.correct) {
      wrongByCategory[a.category] = (wrongByCategory[a.category] || 0) + 1;
    }
  });
  
  // 약점 영역 (오답이 많은 순)
  const weakAreas = Object.entries(wrongByCategory)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category);
  
  return {
    score,
    correct,
    total,
    grade,
    weakAreas,
    wrongByCategory
  };
}
