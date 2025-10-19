import { NextRequest, NextResponse } from 'next/server'
import { utilityService } from '@/lib/content'

// GET /api/content/utilities/[id] - 특정 유틸리티 가져오기
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const utility = await utilityService.getById(params.id)
    if (!utility) {
      return NextResponse.json(
        { success: false, error: 'Utility not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: utility })
  } catch (error) {
    console.error('Error fetching utility:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch utility' },
      { status: 500 }
    )
  }
}

// PUT /api/content/utilities/[id] - 유틸리티 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const utility = await utilityService.update(params.id, body)
    return NextResponse.json({ success: true, data: utility })
  } catch (error) {
    console.error('Error updating utility:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update utility' },
      { status: 500 }
    )
  }
}

// DELETE /api/content/utilities/[id] - 유틸리티 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await utilityService.delete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting utility:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete utility' },
      { status: 500 }
    )
  }
}
