import { NextRequest, NextResponse } from 'next/server'
import { utilityService } from '@/lib/content'

// GET /api/content/utilities - 모든 유틸리티 가져오기
export async function GET() {
  try {
    const utilities = await utilityService.getAll()
    return NextResponse.json({ success: true, data: utilities })
  } catch (error) {
    console.error('Error fetching utilities:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch utilities' },
      { status: 500 }
    )
  }
}

// POST /api/content/utilities - 새 유틸리티 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const utility = await utilityService.create(body)
    return NextResponse.json({ success: true, data: utility })
  } catch (error) {
    console.error('Error creating utility:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create utility' },
      { status: 500 }
    )
  }
}
