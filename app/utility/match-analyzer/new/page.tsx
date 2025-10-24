import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function MatchAnalyzerNewPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/utility/match-analyzer">
              <Button variant="ghost" size="sm" className="text-[#2364AA] hover:bg-[#2364AA]/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">새 경기 기록 입력</h1>
              <p className="text-[#334155]">경기 데이터를 입력하여 분석을 시작하세요</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>경기 기록 입력</CardTitle>
            <CardDescription>
              경기 결과와 주요 지표를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">경기 기록 입력 기능</h3>
              <p className="text-gray-600 mb-6">
                경기 데이터 입력 폼이 여기에 구현됩니다.
              </p>
              <Button variant="outline">
                개발 중입니다
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}