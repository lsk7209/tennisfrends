export type Profile = {
  ntrp: number;                       // 2.5~5.0
  style: "attacker" | "counter" | "pusher" | "serve-volley" | "allround" | "baseliner" | "tactician";
  main_shot: "fh" | "bh" | "serve" | "volley" | "mix";
  spin_level: 1 | 2 | 3 | 4 | 5;              // 1낮음~5높음
  power_pref: 1 | 2 | 3 | 4 | 5;              // 파워 선호
  control_pref: 1 | 2 | 3 | 4 | 5;
  arm_health: "sensitive" | "normal";   // 팔꿈치/어깨 민감
  swing_speed: "slow" | "medium" | "fast";
  match_freq: "low" | "mid" | "high";
  weight_feel: "light" | "mid" | "heavy"  // 선호 무게감
};

type RSpec = {
  weight_strung: number;
  balance_mm: number;
  swingweight: number;
  headsize_in2: number;
  pattern: string;
  stiffness_ra: number;
};

export function scoreRacket(p: Profile, s: RSpec, tags: string[]) {
  let score = 0;

  // 난이도/헤드사이즈
  if (p.ntrp <= 3.0 && s.headsize_in2 >= 100) score += 8;
  if (p.ntrp >= 4.0 && s.headsize_in2 <= 100) score += 6;

  // 스핀 성향
  if (p.spin_level >= 4 && (tags.includes("spin") || s.pattern === "16x19" || s.pattern === "16x20")) score += 6;

  // 파워/컨트롤
  if (p.power_pref >= 4 && s.stiffness_ra >= 65) score += 5;
  if (p.control_pref >= 4 && (tags.includes("control") || s.stiffness_ra <= 63)) score += 6;

  // 팔/관절
  if (p.arm_health === "sensitive" && s.stiffness_ra <= 63) score += 6;
  if (p.arm_health === "sensitive" && s.stiffness_ra >= 67) score -= 4;

  // 스윙 속도와 무게·스윙웨이트
  if (p.swing_speed === "fast" && s.swingweight >= 320) score += 4;
  if (p.swing_speed === "slow" && s.swingweight <= 315) score += 4;

  // 스타일 태그 매칭
  if (p.style === "allround" && tags.includes("allround")) score += 4;
  if (p.style === "attacker" && (tags.includes("aggressive") || tags.includes("power"))) score += 4;
  if (p.style === "tactician" && tags.includes("control")) score += 4;

  // 사용 빈도 (내구성/안정 추구 가중치)
  if (p.match_freq === "high" && s.stiffness_ra >= 64) score += 2;

  // 무게감 선호
  if (p.weight_feel === "light" && s.weight_strung <= 300) score += 3;
  if (p.weight_feel === "heavy" && s.weight_strung >= 305) score += 3;

  return score;
}
