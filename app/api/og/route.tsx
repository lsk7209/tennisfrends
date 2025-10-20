import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const title = searchParams.get('title') || '테니스프렌즈 블로그'
    const category = searchParams.get('category') || '테니스 가이드'
    const author = searchParams.get('author') || '테니스프렌즈'
    const date = searchParams.get('date') || new Date().toLocaleDateString('ko-KR')

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
            backgroundColor: '#F7F5F3',
            backgroundImage: 'linear-gradient(135deg, #0BA360 0%, #19C37D 100%)',
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
            {/* 카테고리 배지 */}
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '30px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              {category}
            </div>

            {/* 제목 */}
            <h1
              style={{
                fontSize: '56px',
                fontWeight: '800',
                color: 'white',
                lineHeight: '1.2',
                marginBottom: '30px',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                textAlign: 'center',
              }}
            >
              {title}
            </h1>

            {/* 테니스 아이콘 */}
            <div
              style={{
                fontSize: '80px',
                marginBottom: '30px',
                filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))',
              }}
            >
              🎾
            </div>

            {/* 메타 정보 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✍️</span>
                <span>{author}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>📅</span>
                <span>{date}</span>
              </div>
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
              gap: '12px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '24px',
              fontWeight: '700',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
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
              fontSize: '16px',
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
