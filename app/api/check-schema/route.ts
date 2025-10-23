import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    console.log("🔍 스키마 확인 API 호출");
    
    // 간단한 쿼리로 실제 컬럼 확인
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, status")
      .limit(1);
    
    if (error) {
      console.error("❌ 스키마 에러:", error);
      return NextResponse.json({ 
        error: "Schema error", 
        details: error.message,
        code: error.code
      });
    }
    
    console.log("✅ 스키마 확인 성공");
    return NextResponse.json({ 
      success: true,
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
