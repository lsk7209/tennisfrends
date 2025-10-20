import { NextRequest, NextResponse } from 'next/server'
import { blogService } from '@/lib/content'

// GET /api/content/blog - 모든 블로그 포스트 가져오기
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published') !== 'false'
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '0')

    let posts

    if (featured) {
      posts = await blogService.getFeatured(limit || 5)
    } else if (category) {
      posts = await blogService.getByCategory(category)
    } else if (tag) {
      posts = await blogService.getByTag(tag)
    } else {
      posts = await blogService.getAll(published)
    }

    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/content/blog - 새 블로그 포스트 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const post = await blogService.create(body)
    return NextResponse.json({ success: true, data: post })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
