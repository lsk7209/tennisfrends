import { levelBands } from "./ntrpResultConfig";

export function getNTRPLevel(score: number) {
  if (score <= 24) return { level: "1.5", desc: "기초적인 스트로크만 가능하며, 경기 경험이 거의 없음." };
  if (score <= 34) return { level: "2.5", desc: "기본 랠리는 가능하나 기술 완성도와 실전 감각은 낮음." };
  if (score <= 44) return { level: "3.0", desc: "중간 속도 스트로크에 일관성이 생기며, 단/복식 포지션 이해 시작." };
  if (score <= 54) return { level: "3.5", desc: "방향 조절과 상황 대응 능력이 향상, 네트 플레이 도전 가능." };
  if (score <= 64) return { level: "4.0", desc: "전술적 경기 운영과 다양한 샷 전략이 가능." };
  if (score <= 70) return { level: "4.5", desc: "게임 주도력, 파워/스핀 활용 능력 우수." };
  return { level: "5.0+", desc: "모든 기술과 전략을 완성한 고급 수준." };
}

export function mapScoreToLevelBand(score: number) {
  return levelBands.find(band => score >= band.band[0] && score <= band.band[1]) || levelBands[levelBands.length - 1];
}

export function mapLevelToBaseProfile(level: string) {
  // 레벨에 따른 기본 프로필 값 (0-10 스케일)
  const baseProfiles: { [key: string]: any } = {
    "1.5": { 
      serve: 2, forehand: 2, backhand: 1, volley: 1, overhead: 1, 
      movement: 2, mental: 2, tactics: 1,
      recommendedTension: "45-50 lbs"
    },
    "2.5": { 
      serve: 3, forehand: 3, backhand: 2, volley: 2, overhead: 2, 
      movement: 3, mental: 3, tactics: 2,
      recommendedTension: "50-55 lbs"
    },
    "3.0": { 
      serve: 4, forehand: 4, backhand: 3, volley: 3, overhead: 3, 
      movement: 4, mental: 4, tactics: 3,
      recommendedTension: "52-57 lbs"
    },
    "3.5": { 
      serve: 5, forehand: 5, backhand: 4, volley: 4, overhead: 4, 
      movement: 5, mental: 5, tactics: 4,
      recommendedTension: "54-59 lbs"
    },
    "4.0": { 
      serve: 6, forehand: 6, backhand: 5, volley: 5, overhead: 5, 
      movement: 6, mental: 6, tactics: 5,
      recommendedTension: "56-61 lbs"
    },
    "4.5": { 
      serve: 7, forehand: 7, backhand: 6, volley: 6, overhead: 6, 
      movement: 7, mental: 7, tactics: 6,
      recommendedTension: "58-63 lbs"
    },
    "5.0+": { 
      serve: 8, forehand: 8, backhand: 7, volley: 7, overhead: 7, 
      movement: 8, mental: 8, tactics: 7,
      recommendedTension: "60-65 lbs"
    }
  };

  return baseProfiles[level] || baseProfiles["3.0"];
}

export function getPersonaFromQ13(q13: string) {
  const personas: { [key: string]: { key: string; theme: string; slogan: string } } = {
    "공만 넘기는 성실형": { key: "rallyer", theme: "#1b5e20", slogan: "끝까지 넘기고 또 넘긴다" },
    "수비적 생존형": { key: "defender", theme: "#33691e", slogan: "하나라도 더 받는다" },
    "빠른 공격형": { key: "attacker", theme: "#bf360c", slogan: "기회를 보면 꽂는다" },
    "전술 분석형": { key: "analyst", theme: "#0d47a1", slogan: "읽고, 유도하고, 마무리" },
    "올라운더": { key: "allround", theme: "#6d4c41", slogan: "어디서든 해답을 찾는다" }
  };

  return personas[q13] || personas["올라운더"];
}