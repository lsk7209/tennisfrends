export function getNTRPLevel(score: number) {
  if (score <= 24) return { level: "1.5", desc: "기초적인 스트로크만 가능하며, 경기 경험이 거의 없음." };
  if (score <= 34) return { level: "2.5", desc: "기본 랠리는 가능하나 기술 완성도와 실전 감각은 낮음." };
  if (score <= 44) return { level: "3.0", desc: "중간 속도 스트로크에 일관성이 생기며, 단/복식 포지션 이해 시작." };
  if (score <= 54) return { level: "3.5", desc: "방향 조절과 상황 대응 능력이 향상, 네트 플레이 도전 가능." };
  if (score <= 64) return { level: "4.0", desc: "전술적 경기 운영과 다양한 샷 전략이 가능." };
  if (score <= 70) return { level: "4.5", desc: "게임 주도력, 파워/스핀 활용 능력 우수." };
  return { level: "5.0+", desc: "모든 기술과 전략을 완성한 고급 수준." };
}

export const charMap: Record<string, string> = {
  "공만 넘기는 성실형": "성실형 랠리",
  "수비적 생존형": "생존 수비",
  "빠른 공격형": "기회 포착 공격형",
  "전술 분석형": "두뇌파 분석가",
  "올라운더": "올라운더"
};

export const levelToNum = (lv: string) => {
  if (lv === "1.5") return 1.5;
  if (lv === "2.5") return 2.5;
  if (lv === "3.0") return 3.0;
  if (lv === "3.5") return 3.5;
  if (lv === "4.0") return 4.0;
  if (lv === "4.5") return 4.5;
  return 5.2; // 5.0+
};
