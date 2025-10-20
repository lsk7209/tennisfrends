import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: 블로그 포스트 목록 조회
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "published";
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

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
        read_time,
        image_emoji,
        status,
        featured,
        view_count,
        created_at,
        updated_at,
        published_at,
        seo_title,
        seo_description,
        seo_keywords
      `)
      .eq("status", status)
      .order("published_at", { ascending: false })
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

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching blog posts:", error);
      return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
