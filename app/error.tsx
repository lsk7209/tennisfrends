'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 에러를 로깅 서비스에 전송
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <CardTitle className="text-xl font-bold text-[#0F172A]">
            문제가 발생했습니다
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-[#64748B]">
            예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left">
              <summary className="cursor-pointer text-sm text-[#64748B] mb-2">
                개발자 정보 (클릭하여 확장)
              </summary>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full">
              다시 시도
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
