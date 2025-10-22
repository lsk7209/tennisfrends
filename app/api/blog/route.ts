import { NextRequest, NextResponse } from "next/server";
import { supabase, testSupabaseConnection } from "@/lib/supabaseClient";

// GET: 블로그 포스트 목록 조회
export async function GET(req: NextRequest) {
  try {
    console.log("🔍 블로그 API 호출 시작");
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    console.log("📊 쿼리 파라미터:", { category, tag, featured, slug, limit, offset });

    // Supabase 클라이언트 확인
    if (!supabase) {
      console.error("❌ Supabase 클라이언트가 없습니다");
      return NextResponse.json({ 
        data: [],
        error: "Supabase client not available" 
      });
    }

    // Supabase 연결 테스트
    const isConnected = await testSupabaseConnection();
    if (!isConnected) {
      console.warn("⚠️ Supabase 연결 실패, 빈 데이터 반환");
      return NextResponse.json({ 
        data: [],
        error: "Supabase connection failed" 
      });
    }

    let query = supabase
      .from("blog_posts")
      .select(`
        id,
        slug,
        title,
        excerpt,
        content,
        category,
        tags,
        created_at,
        updated_at
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq("category", category);
    }

    if (tag) {
      query = query.contains("tags", [tag]);
    }

    if (featured === "true") {
      query = query.eq("featured", true);
    }

    if (slug) {
      query = query.eq("slug", slug);
    }

    // published 상태 필터링 (기본적으로 published된 글만 조회)
    const status = searchParams.get("status");
    if (status === "published") {
      query = query.eq("published", true);
    } else if (status === "draft") {
      query = query.eq("published", false);
    } else {
      // 기본값: published된 글만 조회
      query = query.eq("published", true);
    }

    console.log("🔍 Supabase 쿼리 실행 중...");
    const { data, error } = await query;

    if (error) {
      console.error("❌ Supabase 쿼리 에러:", error);
      // 에러 발생 시 빈 배열 반환으로 앱 크래시 방지
      return NextResponse.json({ 
        data: [],
        error: "Failed to fetch blog posts", 
        details: error.message,
        code: error.code 
      });
    }

    console.log("✅ 쿼리 성공:", { dataCount: data?.length || 0 });
    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("❌ API 전체 에러:", error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// POST: 새 블로그 포스트 생성
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      slug,
      title,
      excerpt,
      content,
      category,
      tags,
      read_time,
      image_emoji,
      status = "draft",
      featured = false,
      seo_title,
      seo_description,
      seo_keywords
    } = body;

    // 필수 필드 검증
    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields: slug, title, content" },
        { status: 400 }
      );
    }

    // 슬러그 중복 확인
    const { data: existingPost } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        { error: "Post with this slug already exists" },
        { status: 409 }
      );
    }

    const postData = {
      slug,
      title,
      excerpt,
      content,
      category,
      tags: tags || [],
      read_time,
      image_emoji,
      status,
      featured,
      seo_title: seo_title || title,
      seo_description: seo_description || excerpt,
      seo_keywords: seo_keywords || [],
      published_at: status === "published" ? new Date().toISOString() : null
    };

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
