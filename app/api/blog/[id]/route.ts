import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// GET: 특정 블로그 포스트 조회
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
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
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Error fetching blog post:", error);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // 조회수 증가 (published 상태일 때만)
    if (data.status === "published") {
      await supabase
        .from("blog_posts")
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq("id", params.id);
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT: 블로그 포스트 업데이트
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
      status,
      featured,
      seo_title,
      seo_description,
      seo_keywords
    } = body;

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (slug !== undefined) updateData.slug = slug;
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;
    if (read_time !== undefined) updateData.read_time = read_time;
    if (image_emoji !== undefined) updateData.image_emoji = image_emoji;
    if (status !== undefined) {
      updateData.status = status;
      if (status === "published" && !body.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }
    if (featured !== undefined) updateData.featured = featured;
    if (seo_title !== undefined) updateData.seo_title = seo_title;
    if (seo_description !== undefined) updateData.seo_description = seo_description;
    if (seo_keywords !== undefined) updateData.seo_keywords = seo_keywords;

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE: 블로그 포스트 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Error deleting blog post:", error);
      return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
