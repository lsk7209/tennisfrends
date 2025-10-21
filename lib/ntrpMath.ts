import { levelBands } from './ntrpResultConfig';
import { NTRPLevel, LevelBand, RadarData } from './types';

export function getNTRPLevel(score: number): NTRPLevel {
  const band = levelBands.find(b => score >= b.band[0] && score <= b.band[1]);
  
  if (!band) {
    // Fallback for scores outside range
    if (score < 15) {
      const fallbackBand = levelBands[0];
      return {
        level: fallbackBand.level,
        title: fallbackBand.title,
        description: fallbackBand.summary[0],
        color: fallbackBand.color
      };
    }
    if (score > 75) {
      const fallbackBand = levelBands[levelBands.length - 1];
      return {
        level: fallbackBand.level,
        title: fallbackBand.title,
        description: fallbackBand.summary[0],
        color: fallbackBand.color
      };
    }
  }
  
  const selectedBand = band || levelBands[0];
  
  return {
    level: selectedBand.level,
    title: selectedBand.title,
    description: selectedBand.summary[0],
    color: selectedBand.color
  };
}

export function mapScoreToLevelBand(score: number): LevelBand {
  return levelBands.find(b => score >= b.band[0] && score <= b.band[1]) || levelBands[0];
}

export function mapLevelToBaseProfile(level: string) {
  const levelNum = parseFloat(level);
  
  // Base profiles for radar chart
  const profiles = {
    "1.5": { power: 20, control: 30, spin: 25, stability: 35, footwork: 25, mental: 40 },
    "2.5": { power: 30, control: 45, spin: 35, stability: 50, footwork: 40, mental: 50 },
    "3.0": { power: 40, control: 60, spin: 45, stability: 65, footwork: 55, mental: 60 },
    "3.5": { power: 50, control: 70, spin: 55, stability: 75, footwork: 65, mental: 70 },
    "4.0": { power: 60, control: 80, spin: 65, stability: 85, footwork: 75, mental: 80 },
    "4.5": { power: 70, control: 85, spin: 75, stability: 90, footwork: 80, mental: 85 },
    "5.0+": { power: 80, control: 90, spin: 85, stability: 95, footwork: 85, mental: 90 }
  };
  
  return profiles[level as keyof typeof profiles] || profiles["3.0"];
}

// 레이더 차트용 데이터 변환 함수
export function convertToRadarData(profile: Record<string, number>): RadarData[] {
  return [
    { key: "파워", value: profile.power },
    { key: "컨트롤", value: profile.control },
    { key: "스핀", value: profile.spin },
    { key: "안정성", value: profile.stability },
    { key: "풋워크", value: profile.footwork },
    { key: "멘탈", value: profile.mental }
  ];
}
