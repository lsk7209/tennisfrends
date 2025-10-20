import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const level = searchParams.get('level') || '3.5'
    const character = searchParams.get('character') || '올라운더'
    const score = searchParams.get('score') || ''

    // 레벨별 색상 매핑
    const getLevelColor = (level: string) => {
      switch (level) {
        case '1.5': return '#ef4444' // 빨강
        case '2.5': return '#f97316' // 주황
        case '3.0': return '#eab308' // 노랑
        case '3.5': return '#22c55e' // 초록
        case '4.0': return '#3b82f6' // 파랑
        case '4.5': return '#8b5cf6' // 보라
        case '5.0+': return '#ec4899' // 핑크
        default: return '#22c55e'
      }
    }

    const levelColor = getLevelColor(level)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${levelColor} 0%, ${levelColor}dd 100%)`,
            position: 'relative',
            fontFamily: 'Pretendard, system-ui, sans-serif',
          }}
        >
          {/* 배경 패턴 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(255,255,255,0.05) 0%, transparent 50%)
              `,
            }}
          />

          {/* 메인 콘텐츠 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'center',
              maxWidth: '1000px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* NTRP 레벨 */}
            <div
              style={{
                fontSize: '120px',
                fontWeight: '900',
                color: 'white',
                lineHeight: '1',
                marginBottom: '20px',
                textShadow: '0 8px 32px rgba(0,0,0,0.3)',
                textAlign: 'center',
              }}
            >
              NTRP {level}
            </div>

            {/* 점수 (있는 경우) */}
            {score && (
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '30px',
                  textShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                Score {score}
              </div>
            )}

            {/* 테니스 아이콘 */}
            <div
              style={{
                fontSize: '100px',
                marginBottom: '30px',
                filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.3))',
              }}
            >
              🎾
            </div>

            {/* 플레이 스타일 */}
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '30px',
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '40px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {character}
            </div>

            {/* 서브 타이틀 */}
            <div
              style={{
                fontSize: '28px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.9)',
                textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                letterSpacing: '0.5px',
              }}
            >
              테니스프렌즈 실력 테스트
            </div>
          </div>

          {/* 하단 브랜딩 */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '28px',
              fontWeight: '700',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              🎾
            </div>
            <span>테니스프렌즈</span>
          </div>

          {/* URL */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '40px',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '18px',
              fontWeight: '400',
            }}
          >
            tennisfriends.co.kr
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
