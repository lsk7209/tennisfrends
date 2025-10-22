// 테니스 규칙 퀴즈 문제 뱅크 (40+ 문항)
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
  },
  {
    id: "Q25",
    category: "Serve",
    difficulty: 1,
    question: "서브 시 공이 네트를 맞고 상대 코트로 넘어갔다.",
    options: [
      "렛(재서브)",
      "서버 포인트",
      "아웃",
      "상대 선택"
    ],
    correct: 0,
    explanation: "서브가 네트를 맞고 넘어가면 렛으로 재서브."
  },
  {
    id: "Q26",
    category: "Scoring",
    difficulty: 1,
    question: "15-30에서 다음 포인트를 이기면 스코어는?",
    options: [
      "15-40",
      "30-30",
      "30-40",
      "40-30"
    ],
    correct: 1,
    explanation: "15-30에서 서버가 이기면 30-30."
  },
  {
    id: "Q27",
    category: "Tiebreak",
    difficulty: 1,
    question: "타이브레이크에서 서브 순서는?",
    options: [
      "서버만 계속",
      "2포인트마다 교대",
      "1포인트마다 교대",
      "자유롭게"
    ],
    correct: 1,
    explanation: "타이브레이크는 2포인트마다 서브 순서 교대."
  },
  {
    id: "Q28",
    category: "Let/Net",
    difficulty: 1,
    question: "인플레이 중 공이 네트를 맞고 상대 코트로 넘어갔다.",
    options: [
      "인",
      "아웃",
      "렛",
      "서버 포인트"
    ],
    correct: 0,
    explanation: "인플레이 중 네트 터치 후 상대 코트 진입은 인."
  },
  {
    id: "Q29",
    category: "Footfault",
    difficulty: 1,
    question: "서브 시 발이 베이스라인을 밟았다.",
    options: [
      "풋폴트",
      "허용",
      "경고",
      "서버 포인트"
    ],
    correct: 0,
    explanation: "베이스라인 접촉은 풋폴트."
  },
  {
    id: "Q30",
    category: "Doubles",
    difficulty: 1,
    question: "복식에서 서버의 파트너가 서브 전에 공을 건드렸다.",
    options: [
      "서버 포인트",
      "서버 폴트",
      "렛",
      "경고"
    ],
    correct: 1,
    explanation: "서브 전 파트너의 공 접촉은 서버 폴트."
  },
  {
    id: "Q31",
    category: "Return",
    difficulty: 2,
    question: "리턴 시 공이 두 번 바운드된 후 쳤다.",
    options: [
      "인",
      "아웃",
      "렛",
      "서버 포인트"
    ],
    correct: 1,
    explanation: "두 번 바운드 후 타격은 아웃."
  },
  {
    id: "Q32",
    category: "Hindrance",
    difficulty: 2,
    question: "상대가 샷을 준비하는 동안 의도적으로 소리를 냈다.",
    options: [
      "허용",
      "방해로 포인트 상실",
      "경고",
      "렛"
    ],
    correct: 1,
    explanation: "고의적 방해는 포인트 상실."
  },
  {
    id: "Q33",
    category: "Scoring",
    difficulty: 2,
    question: "듀스에서 3-3이 되었다. 다음 포인트를 이기면?",
    options: [
      "4-3",
      "어드밴티지",
      "듀스",
      "게임 종료"
    ],
    correct: 1,
    explanation: "듀스에서 이기면 어드밴티지."
  },
  {
    id: "Q34",
    category: "Serve",
    difficulty: 2,
    question: "서브 시 공을 위로 던지지 않고 바로 치려고 했다.",
    options: [
      "허용",
      "폴트",
      "경고",
      "렛"
    ],
    correct: 1,
    explanation: "서브는 반드시 위로 던져야 함."
  },
  {
    id: "Q35",
    category: "BallInPlay",
    difficulty: 2,
    question: "공이 코트 라인을 정확히 맞췄다.",
    options: [
      "인",
      "아웃",
      "렛",
      "재경기"
    ],
    correct: 0,
    explanation: "라인 터치는 인."
  },
  {
    id: "Q36",
    category: "Tiebreak",
    difficulty: 2,
    question: "타이브레이크에서 6-6이 되었다. 승리하려면?",
    options: [
      "7점",
      "8점",
      "2점 차이",
      "10점"
    ],
    correct: 2,
    explanation: "타이브레이크는 2점 차이로 승리."
  },
  {
    id: "Q37",
    category: "Doubles",
    difficulty: 2,
    question: "복식에서 서버가 서브 후 네트로 갔다.",
    options: [
      "허용",
      "폴트",
      "경고",
      "렛"
    ],
    correct: 0,
    explanation: "서브 후 네트 진입은 허용."
  },
  {
    id: "Q38",
    category: "Hindrance",
    difficulty: 3,
    question: "상대가 샷을 치기 전에 '아웃'이라고 외쳤다.",
    options: [
      "허용",
      "방해로 포인트 상실",
      "경고",
      "렛"
    ],
    correct: 1,
    explanation: "상대 샷 전 판정 외침은 방해."
  },
  {
    id: "Q39",
    category: "Scoring",
    difficulty: 3,
    question: "세트 타이브레이크에서 9-9이 되었다. 승리하려면?",
    options: [
      "10점",
      "11점",
      "2점 차이",
      "12점"
    ],
    correct: 2,
    explanation: "세트 타이브레이크도 2점 차이로 승리."
  },
  {
    id: "Q40",
    category: "Serve",
    difficulty: 3,
    question: "서브 시 공이 라켓에 두 번 맞았다(더블 히트).",
    options: [
      "허용",
      "폴트",
      "렛",
      "재서브"
    ],
    correct: 1,
    explanation: "서브 더블 히트는 폴트."
  }
];

// 카테고리별 색상 매핑
export const CATEGORY_COLORS = {
  "Serve": "bg-emerald-100 text-emerald-800",
  "Return": "bg-sky-100 text-sky-800", 
  "Scoring": "bg-amber-100 text-amber-800",
  "Tiebreak": "bg-indigo-100 text-indigo-800",
  "Let/Net": "bg-teal-100 text-teal-800",
  "Footfault": "bg-rose-100 text-rose-800",
  "Doubles": "bg-violet-100 text-violet-800",
  "Hindrance": "bg-orange-100 text-orange-800",
  "BallInPlay": "bg-cyan-100 text-cyan-800"
};

// 12문항 랜덤 선택 함수
export function pickRandomQuestions(): QuizQuestion[] {
  const categories = ["Serve", "Return", "Scoring", "Tiebreak", "Let/Net", "Footfault", "Doubles", "Hindrance", "BallInPlay"];
  const selected: QuizQuestion[] = [];
  const usedIds = new Set<string>();
  
  // 각 카테고리에서 최소 1문항씩 선택
  categories.forEach(category => {
    const categoryQuestions = QUIZ_BANK.filter(q => q.category === category && !usedIds.has(q.id));
    if (categoryQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
      const question = categoryQuestions[randomIndex];
      selected.push(question);
      usedIds.add(question.id);
    }
  });
  
  // 남은 슬롯을 난이도 균형 맞춰 채우기
  const remaining = 12 - selected.length;
  const availableQuestions = QUIZ_BANK.filter(q => !usedIds.has(q.id));
  
  // 난이도별 분포 계산
  const difficultyCount = { 1: 0, 2: 0, 3: 0 };
  selected.forEach(q => difficultyCount[q.difficulty]++);
  
  for (let i = 0; i < remaining; i++) {
    // 난이도 균형 맞춰 선택 (쉬움:보통:어려움 = 4:4:4 또는 5:4:3)
    let targetDifficulty: 1 | 2 | 3;
    if (difficultyCount[1] < 4) targetDifficulty = 1;
    else if (difficultyCount[2] < 4) targetDifficulty = 2;
    else if (difficultyCount[3] < 4) targetDifficulty = 3;
    else targetDifficulty = Math.floor(Math.random() * 3) + 1 as 1 | 2 | 3;
    
    const candidates = availableQuestions.filter(q => q.difficulty === targetDifficulty);
    if (candidates.length > 0) {
      const randomIndex = Math.floor(Math.random() * candidates.length);
      const question = candidates[randomIndex];
      selected.push(question);
      usedIds.add(question.id);
      difficultyCount[question.difficulty]++;
    }
  }
  
  return selected;
}
