export interface StyleProfile {
  id: number;
  name: string;
  subtitle: string;
  emoji: string;
  color: string;
  desc: string[];
  strengths: string[];
  weaknesses: string[];
  recommendedDrills: string[];
  bestPartners: string[];
  rivalTypes: string[];
  proExamples: string[];
  mentality: string;
  courtPreference: string;
  favoriteShots: string[];
  improvementTips: string[];
  gearTips: string[];
  quote: string;
  chartProfile: {
    power: number;
    control: number;
    spin: number;
    stability: number;
    netplay: number;
    mental: number;
  };
}

export const STYLE_PROFILES: Record<string, StyleProfile> = {
  "Strategist": {
    id: 1,
    name: "전략가형",
    subtitle: "경기를 설계하고 상대를 분석하는 두뇌형 플레이어",
    emoji: "🧠",
    color: "#6366F1", // Indigo
    desc: [
      "경기 전체를 설계하고, 상대의 패턴을 분석하여 허점을 노립니다.",
      "전술적 사고와 예측이 강점이며, 감정 기복이 적습니다.",
      "체계적인 플레이로 상대를 압박하며 포인트를 획득합니다."
    ],
    strengths: ["상대 분석력", "샷 선택의 유연성", "멘탈 안정성", "전술적 사고"],
    weaknesses: ["즉흥성 부족", "과도한 계산", "공격적 플레이 부족"],
    recommendedDrills: [
      "포인트 상황별 전술 시뮬레이션",
      "서브+리턴 패턴 훈련",
      "상대 움직임 예측 연습",
      "다양한 샷 조합 연습"
    ],
    bestPartners: ["공격가형", "올라운더형"],
    rivalTypes: ["감각형", "본능형"],
    proExamples: ["Novak Djokovic", "Daniil Medvedev"],
    mentality: "냉정하고 체계적, 실수를 데이터로 분석함",
    courtPreference: "하드코트",
    favoriteShots: ["디펜시브 슬라이스", "서브 리턴", "각도 샷"],
    improvementTips: [
      "상황에서 즉흥적인 결정 연습",
      "'완벽'보다 '적시'의 선택",
      "공격적 샷 연습으로 득점력 향상"
    ],
    gearTips: ["컨트롤형 라켓 + 중간 텐션 스트링"],
    quote: "승리는 예측이 아니라 실행으로 온다.",
    chartProfile: { power: 3, control: 5, spin: 3, stability: 4, netplay: 3, mental: 5 }
  },
  
  "Attacker": {
    id: 2,
    name: "공격가형",
    subtitle: "기회를 보면 바로 스윙하는 결단력 있는 플레이어",
    emoji: "⚡",
    color: "#EF4444", // Red
    desc: [
      "기회를 보면 바로 스윙! 빠른 템포의 랠리를 선호합니다.",
      "서브+1구 공격이 강점이며, 상대를 압박하는 플레이를 합니다.",
      "결단력 있는 샷으로 경기를 주도하는 스타일입니다."
    ],
    strengths: ["결단력", "초구 주도권", "공격적 샷", "빠른 템포"],
    weaknesses: ["실수 관리 부족", "수비 대응 약함", "체력 소모"],
    recommendedDrills: [
      "서브+1구 공격 훈련",
      "빠른 랠리 연습",
      "공격적 샷 정확도 향상",
      "수비 전환 연습"
    ],
    bestPartners: ["수비형", "올라운더형"],
    rivalTypes: ["전략가형", "수비형"],
    proExamples: ["Carlos Alcaraz", "Nick Kyrgios"],
    mentality: "공격이 최선의 수비, 기회를 놓치지 않음",
    courtPreference: "하드코트",
    favoriteShots: ["서브+1구", "포핸드 위너", "어프로치 샷"],
    improvementTips: [
      "리턴 시 속도 조절 훈련",
      "포지션 조정으로 안정성 향상",
      "수비적 플레이 연습"
    ],
    gearTips: ["파워형 라켓 + 낮은 텐션 스트링"],
    quote: "패배보다 망설임이 더 무섭다.",
    chartProfile: { power: 5, control: 3, spin: 4, stability: 2, netplay: 4, mental: 3 }
  },

  "Defender": {
    id: 3,
    name: "수비형",
    subtitle: "공을 놓치지 않는 끈기와 지구력의 소유자",
    emoji: "🛡️",
    color: "#10B981", // Green
    desc: [
      "공을 놓치지 않는 끈기형 플레이어입니다.",
      "상대 실수를 유도하며 안정적인 랠리로 게임을 이어갑니다.",
      "지구력과 집중력이 뛰어나 긴 랠리에서 우위를 점합니다."
    ],
    strengths: ["리턴 안정성", "피지컬 지구력", "집중력", "끈기"],
    weaknesses: ["득점력 부족", "소극적 플레이", "공격 전환 어려움"],
    recommendedDrills: [
      "긴 랠리 지속 연습",
      "수비적 샷 정확도 향상",
      "공격 전환 타이밍 연습",
      "체력 강화 훈련"
    ],
    bestPartners: ["공격가형", "파워 베이스라인형"],
    rivalTypes: ["공격가형", "네트러시형"],
    proExamples: ["Diego Schwartzman", "Simona Halep"],
    mentality: "끝까지 포기하지 않는 것이 내 무기",
    courtPreference: "클레이코트",
    favoriteShots: ["디펜시브 샷", "로브", "각도 리턴"],
    improvementTips: [
      "공격 전환 타이밍 학습",
      "상대 패턴 읽기",
      "득점 샷 개발"
    ],
    gearTips: ["컨트롤형 라켓 + 높은 텐션 스트링"],
    quote: "끝까지 포기하지 않는 게 내 무기다.",
    chartProfile: { power: 2, control: 5, spin: 4, stability: 5, netplay: 2, mental: 4 }
  },

  "All-Rounder": {
    id: 4,
    name: "올라운더형",
    subtitle: "모든 영역을 두루 커버하는 밸런스형 플레이어",
    emoji: "🌀",
    color: "#F59E0B", // Gold
    desc: [
      "모든 영역을 두루 커버하는 완성형 플레이어입니다.",
      "전후 좌우 밸런스가 뛰어나며, 파트너 플레이에 강점을 보입니다.",
      "상황에 맞는 적응력이 뛰어나 다양한 상대와 경기할 수 있습니다."
    ],
    strengths: ["적응력", "전략적 유연성", "밸런스", "파트너십"],
    weaknesses: ["특화 포인트 부족", "극한 상황 대응"],
    recommendedDrills: [
      "전체 코트 커버리지 연습",
      "다양한 샷 연습",
      "파트너와의 호흡 훈련",
      "상황별 전술 연습"
    ],
    bestPartners: ["전략가형", "공격가형"],
    rivalTypes: ["전문가형", "특화형"],
    proExamples: ["Roger Federer"],
    mentality: "완벽한 조화가 승리를 만든다",
    courtPreference: "잔디코트",
    favoriteShots: ["올라운드 샷", "다양한 샷 조합", "네트 플레이"],
    improvementTips: [
      "하나의 '필살샷' 개발",
      "체력 루틴 강화",
      "극한 상황 대응 연습"
    ],
    gearTips: ["밸런스형 라켓 + 중간 텐션 스트링"],
    quote: "완벽은 조화에서 온다.",
    chartProfile: { power: 4, control: 4, spin: 4, stability: 4, netplay: 4, mental: 4 }
  },

  "Power Baseline": {
    id: 5,
    name: "파워 베이스라인형",
    subtitle: "강한 스트로크로 상대를 밀어붙이는 파워형 플레이어",
    emoji: "💥",
    color: "#F97316", // Orange
    desc: [
      "강한 스트로크로 상대를 밀어붙이는 전형적인 공격형 베이스라이너입니다.",
      "파워와 스핀을 활용한 샷으로 상대를 압박합니다.",
      "베이스라인에서 강력한 샷으로 포인트를 획득합니다."
    ],
    strengths: ["파워", "포핸드 위너", "스핀", "베이스라인 지배력"],
    weaknesses: ["샷 선택 제한", "수비 불안정", "네트 플레이 부족"],
    recommendedDrills: [
      "파워 샷 정확도 향상",
      "각도 훈련",
      "디펜시브 풋워크 연습",
      "스핀 샷 연습"
    ],
    bestPartners: ["수비형", "네트러시형"],
    rivalTypes: ["수비형", "전략가형"],
    proExamples: ["Rafael Nadal", "Aryna Sabalenka"],
    mentality: "파워로 상대를 압도한다",
    courtPreference: "클레이코트",
    favoriteShots: ["포핸드 위너", "스핀 샷", "베이스라인 샷"],
    improvementTips: [
      "각도 훈련",
      "디펜시브 풋워크 연습",
      "샷 선택 다양화"
    ],
    gearTips: ["파워형 라켓 + 낮은 텐션 스트링"],
    quote: "공을 부숴서라도 이긴다.",
    chartProfile: { power: 5, control: 3, spin: 5, stability: 3, netplay: 2, mental: 3 }
  },

  "Net Charger": {
    id: 6,
    name: "네트러시형",
    subtitle: "네트를 장악하는 전진형 플레이어",
    emoji: "🕊️",
    color: "#06B6D4", // Cyan
    desc: [
      "네트를 장악하는 전진형 플레이어입니다.",
      "발리 감각과 포지션 감각이 탁월하며, 상대를 압박합니다.",
      "빠른 전진과 정확한 발리로 포인트를 마무리합니다."
    ],
    strengths: ["리듬감", "결정력", "발리 기술", "포지션 감각"],
    weaknesses: ["로브 대응", "베이스라인 긴 랠리", "수비적 플레이"],
    recommendedDrills: [
      "발리 정확도 향상",
      "어프로치 샷 연습",
      "로브 대응 연습",
      "네트 포지션 훈련"
    ],
    bestPartners: ["수비형", "올라운더형"],
    rivalTypes: ["파워 베이스라인형", "수비형"],
    proExamples: ["Stefan Edberg", "Taylor Townsend"],
    mentality: "앞으로 한 걸음이 승부를 바꾼다",
    courtPreference: "잔디코트",
    favoriteShots: ["발리", "어프로치 샷", "스매시"],
    improvementTips: [
      "하프발리 안정화",
      "베이스라인 리턴 연습",
      "로브 대응 연습"
    ],
    gearTips: ["컨트롤형 라켓 + 높은 텐션 스트링"],
    quote: "앞으로 한 걸음이 승부를 바꾼다.",
    chartProfile: { power: 3, control: 4, spin: 3, stability: 3, netplay: 5, mental: 4 }
  },

  "Instinct Player": {
    id: 7,
    name: "본능형",
    subtitle: "감으로 플레이하며 흐름을 타는 창의형 플레이어",
    emoji: "🔮",
    color: "#8B5CF6", // Violet
    desc: [
      "감으로 플레이하며 흐름을 타는 창의형 플레이어입니다.",
      "예측 불가한 전개로 상대를 혼란시키며, 창의적인 샷을 구사합니다.",
      "순간의 영감과 감각으로 경기를 이끌어갑니다."
    ],
    strengths: ["창의력", "예상 밖 플레이", "감각", "흐름 타기"],
    weaknesses: ["일관성 부족", "멘탈 기복", "체계적 플레이 부족"],
    recommendedDrills: [
      "창의적 샷 연습",
      "상황별 즉흥 플레이",
      "멘탈 안정화 훈련",
      "루틴화 연습"
    ],
    bestPartners: ["전략가형", "올라운더형"],
    rivalTypes: ["전략가형", "수비형"],
    proExamples: ["Gaël Monfils", "Ons Jabeur"],
    mentality: "느낌이 오면, 그걸 믿는다",
    courtPreference: "하드코트",
    favoriteShots: ["창의적 샷", "예상 밖 샷", "즉흥 샷"],
    improvementTips: [
      "루틴화된 경기 습관",
      "감정 조절",
      "일관성 있는 플레이 연습"
    ],
    gearTips: ["밸런스형 라켓 + 중간 텐션 스트링"],
    quote: "느낌이 오면, 그걸 믿는다.",
    chartProfile: { power: 4, control: 3, spin: 4, stability: 2, netplay: 4, mental: 2 }
  }
};

export const getStyleProfile = (typeId: number): StyleProfile | null => {
  const profile = Object.values(STYLE_PROFILES).find(p => p.id === typeId);
  return profile || null;
};

export const getStyleProfileByName = (name: string): StyleProfile | null => {
  return STYLE_PROFILES[name] || null;
};
