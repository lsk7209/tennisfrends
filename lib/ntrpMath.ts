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
  const levelNum = parseFloat(level);
  
  // 레벨에 따른 기본 프로필 값 (0-100 스케일)
  const baseProfiles: { [key: string]: { [key: string]: number } } = {
    "1.5": { 파워: 20, 컨트롤: 30, 스핀: 25, 안정성: 35, 풋워크: 25, 멘탈: 30 },
    "2.5": { 파워: 30, 컨트롤: 45, 스핀: 35, 안정성: 50, 풋워크: 40, 멘탈: 40 },
    "3.0": { 파워: 45, 컨트롤: 60, 스핀: 50, 안정성: 65, 풋워크: 55, 멘탈: 50 },
    "3.5": { 파워: 60, 컨트롤: 75, 스핀: 65, 안정성: 80, 풋워크: 70, 멘탈: 65 },
    "4.0": { 파워: 75, 컨트롤: 85, 스핀: 80, 안정성: 90, 풋워크: 80, 멘탈: 75 },
    "4.5": { 파워: 85, 컨트롤: 90, 스핀: 85, 안정성: 95, 풋워크: 85, 멘탈: 85 },
    "5.0+": { 파워: 95, 컨트롤: 95, 스핀: 90, 안정성: 98, 풋워크: 90, 멘탈: 95 }
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