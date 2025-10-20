import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-yellow-600 text-2xl">🔍</span>
          </div>
          <CardTitle className="text-xl font-bold text-[#0F172A]">
            페이지를 찾을 수 없습니다
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-[#64748B]">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/">
              <Button className="w-full">
                홈으로 돌아가기
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" className="w-full">
                블로그 보기
              </Button>
            </Link>
            <Link href="/utility">
              <Button variant="outline" className="w-full">
                유틸리티 보기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
