import { createClient } from "@supabase/supabase-js";

// 환경 변수 확인 (Vercel 환경 변수 우선, 없으면 하드코딩된 값 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zbccwmtesxalzzgralrz.supabase.co';
// RLS 정책 우회를 위해 Service Role Key 사용
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiY2N3bXRlc3hhbHp6Z3JhbHJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg1NzM1MiwiZXhwIjoyMDc2NDMzMzUyfQ.nPRqka27bSKoCNFGnn7cagynn7Fq44W5Nfr7FNrjic4';

console.log("🔍 Supabase 환경 변수 확인:");
console.log("URL:", supabaseUrl ? "설정됨" : "없음");
console.log("Key:", supabaseKey ? "설정됨" : "없음");

// Supabase 클라이언트 생성 함수
function createSupabaseClient() {
  if (!supabaseUrl || !supabaseKey || 
      supabaseUrl === "https://placeholder.supabase.co" || 
      supabaseKey === "placeholder-key") {
    console.warn("⚠️ Supabase 환경 변수가 설정되지 않았습니다");
    return null;
  }

  try {
    const client = createClient(supabaseUrl, supabaseKey);
    console.log("✅ Supabase 클라이언트 생성 성공 (Service Role Key 사용)");
    return client;
  } catch (error) {
    console.warn("❌ Supabase client initialization failed:", error);
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

// Supabase 연결 테스트 함수
export async function testSupabaseConnection() {
  try {
    if (!supabase) return false;
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error("Supabase 연결 테스트 실패:", error);
      return false;
    }
    
    console.log("✅ Supabase 연결 테스트 성공");
    return true;
  } catch (error) {
    console.error("Supabase 연결 테스트 에러:", error);
    return false;
  }
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