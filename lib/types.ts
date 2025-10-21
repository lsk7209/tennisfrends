// 공통 타입 정의
export interface NTRPLevel {
  level: string;
  title: string;
  description: string;
  color: string;
}

export interface LevelBand {
  band: [number, number];
  level: string;
  title: string;
  color: string;
  summary: string[];
  strengths: string[];
  weaknesses: string[];
  focus: string[];
}

export interface Persona {
  key: string;
  theme: string;
  slogan: string;
}

export interface Drill {
  name: string;
  goal: string;
  duration: string;
}

export interface KPI {
  name: string;
  target: string;
}

export interface WeeklyPlan {
  week: number;
  focus: string;
  micro: string[];
}

export interface DoublesStrategy {
  role: string;
  patterns: string[];
}

export interface Equipment {
  frame: string;
  string: string;
  tension: string;
  note: string;
}

export interface InjuryRisk {
  risk: string;
  tip: string;
}

export interface CommonMistake {
  issue: string;
  fix: string;
}

export interface RadarData {
  key: string;
  value: number;
}

export interface TensionFormData {
  brandModel: string;
  headSize: string;
  pattern: string;
  stringType: string;
  gauge: string;
  playStyle: string;
  powerPref: string;
  armHealth: string;
  ntrp: string;
  temp: string;
  hoursPerWeek: string;
}

export interface TensionResult {
  optimalTension: number;
  reasoning: string[];
  tips: string[];
  alternatives: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface TennisStyleQuestion {
  id: number;
  question: string;
  options: string[];
  scores: Record<string, number>[];
}

export interface StyleMeta {
  name: string;
  color: string;
  summary: string[];
  strengths: string[];
  pitfalls: string[];
  training: string[];
  slogan: string;
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  error?: string;
  details?: string;
  code?: string;
}

// 컴포넌트 Props 타입
export interface NTRPResultPageProps {
  backUrl?: string;
  showTotalQuestions?: boolean;
}

export interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
}

// 유틸리티 함수 타입
export type ScoreCalculator = (answers: Record<number, number>) => string;
export type LevelMapper = (score: number) => NTRPLevel;
export type BandMapper = (score: number) => LevelBand;
