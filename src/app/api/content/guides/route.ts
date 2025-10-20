import { NextRequest, NextResponse } from 'next/server'
import { guideService } from '@/lib/content'

// GET /api/content/guides - 모든 가이드 가져오기
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty') as 'beginner' | 'intermediate' | 'advanced' | null
    const featured = searchParams.get('featured') === 'true'
    const limit = parseInt(searchParams.get('limit') || '0')

    let guides

    if (featured) {
      guides = await guideService.getFeatured(limit || 5)
    } else if (category) {
      guides = await guideService.getByCategory(category)
    } else if (difficulty) {
      guides = await guideService.getByDifficulty(difficulty)
    } else {
      guides = await guideService.getAll()
    }

    return NextResponse.json({ success: true, data: guides })
  } catch (error) {
    console.error('Error fetching guides:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guides' },
      { status: 500 }
    )
  }
}

// POST /api/content/guides - 새 가이드 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const guide = await guideService.create(body)
    return NextResponse.json({ success: true, data: guide })
  } catch (error) {
    console.error('Error creating guide:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create guide' },
      { status: 500 }
    )
  }
}
