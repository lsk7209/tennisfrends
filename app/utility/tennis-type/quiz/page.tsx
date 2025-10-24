"use client";

import TennisTypeAnalyzer from "@/components/utility/tennis-type-analyzer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TennisTypeQuizPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/utility/tennis-type">
              <Button variant="ghost" size="sm" className="text-[#2364AA] hover:bg-[#2364AA]/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                돌아가기
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">테니스 성향 7유형 테스트</h1>
              <p className="text-[#334155]">12문항으로 당신의 플레이 스타일을 분석합니다</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <TennisTypeAnalyzer />
      </div>
    </div>
  );
}
