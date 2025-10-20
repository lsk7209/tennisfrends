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
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          order: (column: string, options?: any) => ({
            range: (start: number, end: number) => ({
              data: [],
              error: null
            }),
            data: [],
            error: null
          }),
          data: [],
          error: null
        }),
        contains: (column: string, value: any) => ({
          data: [],
          error: null
        }),
        data: [],
        error: null
      }),
      insert: (data: any) => ({ data: [], error: null }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: () => ({
            single: () => ({ data: null, error: null }),
            data: null,
            error: null
          }),
          data: null,
          error: null
        }),
        data: null,
        error: null
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          data: null,
          error: null
        }),
        data: null,
        error: null
      })
    })
  };
}

// 클라이언트 생성 - 실제 Supabase 클라이언트 사용
let supabase: any;
try {
  supabase = createSupabaseClient();
  if (!supabase) {
    console.warn("Supabase client not available, using dummy client");
    supabase = createDummyClient();
  }
} catch (error) {
  console.warn("Failed to create Supabase client:", error);
  supabase = createDummyClient();
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