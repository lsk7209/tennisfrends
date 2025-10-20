"use client";

import { useEffect, useState } from "react";
import { supabase, NTRPResult } from "@/lib/supabaseClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LeaderboardPage() {
  const [rows, setRows] = useState<NTRPResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Supabase가 설정되어 있는지 확인
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co") {
          // 최근 7일 상위 50개 결과
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          
          const { data } = await supabase
            .from("ntrp_results")
            .select("created_at, score, level, character")
            .gte("created_at", sevenDaysAgo.toISOString())
            .order("score", { ascending: false })
            .limit(50);

          setRows(data || []);
        } else {
          // Supabase가 설정되지 않은 경우 빈 배열로 설정
          setRows([]);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankEmoji = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "1.5":
      case "2.5":
        return "bg-red-100 text-red-800";
      case "3.0":
      case "3.5":
        return "bg-yellow-100 text-yellow-800";
      case "4.0":
      case "4.5":
        return "bg-green-100 text-green-800";
      case "5.0+":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3]">
        <Header />
        <main className="max-w-4xl mx-auto p-6 pt-8">
          <div className="text-center py-12">
            <div className="text-[#64748B]">리더보드를 불러오는 중...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">🏆 최근 7일 Top Score</h1>
          <p className="text-[#64748B]">
            지난 7일간 가장 높은 점수를 기록한 사용자들을 확인해보세요.
          </p>
        </div>

        <Card className="p-6 shadow-lg">
          {rows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="p-3 text-center">순위</th>
                    <th className="p-3 text-left">날짜</th>
                    <th className="p-3 text-right">점수</th>
                    <th className="p-3 text-center">레벨</th>
                    <th className="p-3 text-center">캐릭터</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className={`border-t ${i < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}>
                      <td className="p-3 text-center font-bold">
                        <span className="text-lg">
                          {getRankEmoji(i)}
                        </span>
                      </td>
                      <td className="p-3">
                        {new Date(r.created_at!).toLocaleString('ko-KR')}
                      </td>
                      <td className="p-3 text-right font-bold text-[#0BA360]">
                        {r.score}점
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(r.level)}`}>
                          NTRP {r.level}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {r.character}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
                아직 데이터가 없습니다
              </h3>
              <p className="text-[#64748B] mb-6">
                지난 7일간의 테스트 결과가 없습니다. 첫 번째로 테스트해보세요!
              </p>
              <Link href="/test">
                <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white">
                  🎯 테스트 시작하기
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* 통계 정보 */}
        {rows.length > 0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#0BA360] mb-2">
                {rows.length}
              </div>
              <div className="text-[#64748B]">총 참여자</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#0BA360] mb-2">
                {rows[0]?.score || 0}
              </div>
              <div className="text-[#64748B]">최고 점수</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-[#0BA360] mb-2">
                {rows[rows.length - 1]?.score || 0}
              </div>
              <div className="text-[#64748B]">최저 점수</div>
            </Card>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/test">
              <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white">
                🎯 나도 테스트하기
              </Button>
            </Link>
            <Link href="/stats">
              <Button variant="outline">
                📊 전체 통계 보기
              </Button>
            </Link>
          </div>
        </div>
    </div>
  );
}
