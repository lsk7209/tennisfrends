"use client";

import { useEffect, useState } from "react";
import { supabase, NTRPResult } from "@/lib/supabaseClient";
import { getDeviceId } from "@/lib/device";
import { levelToNum } from "@/lib/ntrp";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface StatsData {
  recent: NTRPResult[];
  mine: NTRPResult[];
  distribution: { bucket: string; count: number }[];
  trend: { date: string; avg: number }[];
  characters: { name: string; value: number }[];
}

const COLORS = ["#0BA360", "#2364AA", "#C7F000", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"];

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData>({
    recent: [],
    mine: [],
    distribution: [],
    trend: [],
    characters: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Supabase가 설정되어 있는지 확인
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co") {
          // 최근 10개 전역 기록
          const { data: recentData } = await supabase
            .from("ntrp_results")
            .select("created_at, score, level, character")
            .order("created_at", { ascending: false })
            .limit(10);

          // 내 기기 히스토리
          const device = getDeviceId();
          const { data: myData } = await supabase
            .from("ntrp_results")
            .select("created_at, score, level, character")
            .eq("device_id", device)
            .order("created_at", { ascending: false })
            .limit(10);

          // 최근 100개 데이터로 통계 계산
          const { data: allData } = await supabase
            .from("ntrp_results")
            .select("score, level, character, created_at")
            .order("created_at", { ascending: false })
            .limit(100);

          // 분포 계산 (15-25, 26-35, 36-45, 46-55, 56-65, 66-75)
          const buckets = [
            { bucket: "15-25", count: 0 },
            { bucket: "26-35", count: 0 },
            { bucket: "36-45", count: 0 },
            { bucket: "46-55", count: 0 },
            { bucket: "56-65", count: 0 },
            { bucket: "66-75", count: 0 }
          ];

          const charMapCount: Record<string, number> = {};
          const trendMap: Record<string, number[]> = {};

          (allData || []).forEach((row: any) => {
            const s = row.score;
            if (s <= 25) buckets[0].count++;
            else if (s <= 35) buckets[1].count++;
            else if (s <= 45) buckets[2].count++;
            else if (s <= 55) buckets[3].count++;
            else if (s <= 65) buckets[4].count++;
            else buckets[5].count++;

            const k = row.character || "기타";
            charMapCount[k] = (charMapCount[k] || 0) + 1;

            const d = new Date(row.created_at).toISOString().slice(0, 10);
            const num = levelToNum(row.level);
            if (!trendMap[d]) trendMap[d] = [];
            trendMap[d].push(num);
          });

          // 트렌드 데이터 생성
          const trendData = Object.entries(trendMap)
            .sort(([a], [b]) => a > b ? 1 : -1)
            .map(([date, arr]) => {
              const avg = arr.reduce((x, y) => x + y, 0) / arr.length;
              return { date, avg: parseFloat(avg.toFixed(2)) };
            });

          setStats({
            recent: recentData || [],
            mine: myData || [],
            distribution: buckets,
            trend: trendData,
            characters: Object.entries(charMapCount).map(([name, value]) => ({ name, value }))
          });
        } else {
          // Supabase가 설정되지 않은 경우 빈 데이터로 설정
          setStats({
            recent: [],
            mine: [],
            distribution: [
              { bucket: "15-25", count: 0 },
              { bucket: "26-35", count: 0 },
              { bucket: "36-45", count: 0 },
              { bucket: "46-55", count: 0 },
              { bucket: "56-65", count: 0 },
              { bucket: "66-75", count: 0 }
            ],
            trend: [],
            characters: []
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3]">
        <main className="max-w-6xl mx-auto p-6 pt-8">
          <div className="text-center py-12">
            <div className="text-[#64748B]">통계를 불러오는 중...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      
      <main className="max-w-6xl mx-auto p-6 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">📊 NTRP 통계 & 히스토리</h1>
          <p className="text-[#64748B]">
            전체 사용자 통계와 나의 테니스 실력 변화를 확인해보세요.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">📈 개요</TabsTrigger>
            <TabsTrigger value="recent">🌍 최근 10개 (전체)</TabsTrigger>
            <TabsTrigger value="mine">👤 내 히스토리</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* 점수 분포 차트 */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                  📊 점수 분포 (최근 100명)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.distribution}>
                      <XAxis 
                        dataKey="bucket" 
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="#0BA360"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* 일자별 평균 레벨 추세 */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                  📈 일자별 평균 레벨 (최근 100명)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.trend}>
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                      />
                      <YAxis 
                        domain={[1.5, 5.3]}
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#E2E8F0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="avg" 
                        stroke="#0BA360" 
                        strokeWidth={3}
                        dot={{ fill: '#0BA360', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* 캐릭터 비율 */}
              <Card className="p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                  🎭 플레이 스타일 분포
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.characters}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {stats.characters.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                🌍 최근 10개 결과 (전체 사용자)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <th className="p-3 text-left">날짜</th>
                      <th className="p-3 text-right">점수</th>
                      <th className="p-3 text-center">레벨</th>
                      <th className="p-3 text-center">캐릭터</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent.map((r, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3">
                          {new Date(r.created_at!).toLocaleString('ko-KR')}
                        </td>
                        <td className="p-3 text-right font-medium">{r.score}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-1 bg-[#0BA360]/10 text-[#0BA360] rounded-full text-xs font-medium">
                            {r.level}
                          </span>
                        </td>
                        <td className="p-3 text-center">{r.character}</td>
                      </tr>
                    ))}
                    {!stats.recent.length && (
                      <tr>
                        <td className="p-3 text-center text-[#64748B]" colSpan={4}>
                          데이터가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mine" className="mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                👤 내 히스토리 (이 기기)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <th className="p-3 text-left">날짜</th>
                      <th className="p-3 text-right">점수</th>
                      <th className="p-3 text-center">레벨</th>
                      <th className="p-3 text-center">캐릭터</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.mine.map((r, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3">
                          {new Date(r.created_at!).toLocaleString('ko-KR')}
                        </td>
                        <td className="p-3 text-right font-medium">{r.score}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-1 bg-[#0BA360]/10 text-[#0BA360] rounded-full text-xs font-medium">
                            {r.level}
                          </span>
                        </td>
                        <td className="p-3 text-center">{r.character}</td>
                      </tr>
                    ))}
                    {!stats.mine.length && (
                      <tr>
                        <td className="p-3 text-center text-[#64748B]" colSpan={4}>
                          이 기기에서의 기록이 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 액션 버튼 */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/test">
              <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white">
                🎯 새로 테스트하기
              </Button>
            </a>
            <a href="/leaderboard">
              <Button variant="outline">
                🏆 리더보드 보기
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
