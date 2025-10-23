import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    console.log("🔍 테스트 블로그 API 호출");
    
    // Supabase 연결 테스트
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, published")
      .limit(5);
    
    if (error) {
      console.error("❌ Supabase 에러:", error);
      return NextResponse.json({ 
        error: "Database error", 
        details: error.message 
      });
    }
    
    console.log("✅ 데이터 조회 성공:", data?.length || 0, "개");
    return NextResponse.json({ 
      success: true, 
      count: data?.length || 0,
      data: data || []
    });
  } catch (error) {
    console.error("❌ API 에러:", error);
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
