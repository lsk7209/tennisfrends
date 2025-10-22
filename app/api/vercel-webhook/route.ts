import { NextRequest, NextResponse } from 'next/server';

/**
 * Vercel 빌드 실패 시 자동 재배포를 위한 웹훅
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Vercel 빌드 실패 이벤트 확인
    if (body.type === 'deployment.error') {
      console.log('🚨 Vercel 빌드 실패 감지:', body.deployment);
      
      // 자동 재배포 로직
      const redeployResult = await triggerRedeploy();
      
      if (redeployResult.success) {
        console.log('✅ 자동 재배포 성공');
        return NextResponse.json({ 
          success: true, 
          message: '자동 재배포가 시작되었습니다.' 
        });
      } else {
        console.error('❌ 자동 재배포 실패:', redeployResult.error);
        return NextResponse.json({ 
          success: false, 
          error: redeployResult.error 
        }, { status: 500 });
      }
    }
    
    return NextResponse.json({ message: '웹훅 처리 완료' });
    
  } catch (error) {
    console.error('웹훅 처리 에러:', error);
    return NextResponse.json({ 
      error: '웹훅 처리 실패' 
    }, { status: 500 });
  }
}

/**
 * 재배포 트리거 함수
 */
async function triggerRedeploy() {
  try {
    // Vercel API를 통한 재배포
    const response = await fetch('https://api.vercel.com/v1/integrations/deploy', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'tennisfrends',
        gitSource: {
          type: 'github',
          repo: 'lsk7209/tennisfrends',
          ref: 'main'
        }
      })
    });
    
    if (response.ok) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: `API 요청 실패: ${response.status}` 
      };
    }
    
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
