import { createClient } from "@supabase/supabase-js";

// 환경 변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase 클라이언트 생성 함수
function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl === "https://placeholder.supabase.co" || 
      supabaseAnonKey === "placeholder-key") {
    return null;
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn("Supabase client initialization failed:", error);
    return null;
  }
}

// 더미 클라이언트 생성 함수
function createDummyClient() {
  return {
    from: () => ({
      select: () => ({
        eq: () => ({ data: [], error: null }),
        gte: () => ({ data: [], error: null }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
        data: [],
        error: null
      }),
      insert: () => ({ data: [], error: null }),
      update: () => ({ data: [], error: null }),
      delete: () => ({ data: [], error: null })
    })
  };
}

// 클라이언트 생성 (빌드 시점에서는 더미 클라이언트 사용)
let supabase: any;
if (typeof window === 'undefined') {
  // 서버 사이드에서는 더미 클라이언트 사용
  supabase = createDummyClient();
} else {
  // 클라이언트 사이드에서는 실제 클라이언트 시도
  supabase = createSupabaseClient() || createDummyClient();
}

export { supabase };

// NTRP 결과 타입 정의
export interface NTRPResult {
  id?: string;
  device_id: string;
  score: number;
  level: string;
  character: string;
  created_at?: string;
}

// 통계 데이터 타입 정의
export interface StatsData {
  recent: NTRPResult[];
  mine: NTRPResult[];
  distribution: { bucket: string; count: number }[];
  trend: { date: string; avg: number }[];
  characters: { name: string; value: number }[];
}