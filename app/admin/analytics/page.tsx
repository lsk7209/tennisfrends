"use client";

import { useState, useEffect } from "react";
import { supabase, NTRPResult } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Download
} from "lucide-react";
import Link from "next/link";
import { levelToNum } from "@/lib/ntrp";

const COLORS = ["#0BA360", "#2364AA", "#C7F000", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"];

export default function AnalyticsPage() {
  const [data, setData] = useState<NTRPResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("7"); // 7, 30, 90, 365

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co") {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));
        
        const { data: analyticsData, error } = await supabase
          .from("ntrp_results")
          .select("*")
          .gte("created_at", daysAgo.toISOString())
          .order("created_at", { ascending: false });

        if (error) throw error;
        setData(analyticsData || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 일별 테스트 수 계산
  const getDailyTestCounts = () => {
    const dailyCounts: Record<string, number> = {};
    
    data.forEach(item => {
      const date = new Date(item.created_at!).toISOString().split('T')[0];
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    return Object.entries(dailyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        count,
        fullDate: date
      }));
  };

  // 레벨별 분포 계산
  const getLevelDistribution = () => {
    const levelCounts: Record<string, number> = {};
    
    data.forEach(item => {
      levelCounts[item.level] = (levelCounts[item.level] || 0) + 1;
    });

    return Object.entries(levelCounts).map(([level, count]) => ({
      level,
      count,
      percentage: ((count / data.length) * 100).toFixed(1)
    }));
  };

  // 캐릭터별 분포 계산
  const getCharacterDistribution = () => {
    const charCounts: Record<string, number> = {};
    
    data.forEach(item => {
      charCounts[item.character] = (charCounts[item.character] || 0) + 1;
    });

    return Object.entries(charCounts).map(([character, count]) => ({
      character,
      count,
      percentage: ((count / data.length) * 100).toFixed(1)
    }));
  };

  // 시간대별 테스트 분포
  const getHourlyDistribution = () => {
    const hourlyCounts: Record<number, number> = {};
    
    data.forEach(item => {
      const hour = new Date(item.created_at!).getHours();
      hourlyCounts[hour] = (hourlyCounts[hour] || 0) + 1;
    });

    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}시`,
      count: hourlyCounts[i] || 0
    }));
  };

  // 평균 점수 추이
  const getAverageScoreTrend = () => {
    const dailyScores: Record<string, number[]> = {};
    
    data.forEach(item => {
      const date = new Date(item.created_at!).toISOString().split('T')[0];
      if (!dailyScores[date]) dailyScores[date] = [];
      dailyScores[date].push(item.score);
    });

    return Object.entries(dailyScores)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, scores]) => ({
        date: new Date(date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
        averageScore: (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1),
        fullDate: date
      }));
  };

  // 통계 요약
  const getSummaryStats = () => {
    const totalTests = data.length;
    const uniqueUsers = new Set(data.map(item => item.device_id)).size;
    const averageScore = totalTests > 0 ? (data.reduce((sum, item) => sum + item.score, 0) / totalTests).toFixed(1) : "0";
    const averageLevel = totalTests > 0 ? (data.reduce((sum, item) => sum + levelToNum(item.level), 0) / totalTests).toFixed(1) : "0";

    return { totalTests, uniqueUsers, averageScore, averageLevel };
  };

  const summaryStats = getSummaryStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#64748B]">분석 데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  관리자 대시보드
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A] flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-[#0BA360]" />
                  분석 대시보드
                </h1>
                <p className="text-[#64748B] mt-1">상세한 사용자 행동 및 성과 분석</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-[#E2E8F0] rounded-md bg-white"
              >
                <option value="7">최근 7일</option>
                <option value="30">최근 30일</option>
                <option value="90">최근 90일</option>
                <option value="365">최근 1년</option>
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                리포트 다운로드
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 요약 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">총 테스트 수</CardTitle>
              <Users className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{summaryStats.totalTests}</div>
              <p className="text-xs text-[#64748B]">최근 {dateRange}일</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">고유 사용자</CardTitle>
              <Users className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{summaryStats.uniqueUsers}</div>
              <p className="text-xs text-[#64748B]">활성 사용자</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">평균 점수</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{summaryStats.averageScore}</div>
              <p className="text-xs text-[#64748B]">점수 평균</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">평균 레벨</CardTitle>
              <BarChart3 className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{summaryStats.averageLevel}</div>
              <p className="text-xs text-[#64748B]">NTRP 평균</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="trends">트렌드</TabsTrigger>
            <TabsTrigger value="distribution">분포</TabsTrigger>
            <TabsTrigger value="behavior">사용자 행동</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 일별 테스트 수 */}
              <Card>
                <CardHeader>
                  <CardTitle>일별 테스트 수</CardTitle>
                  <CardDescription>최근 {dateRange}일간의 테스트 완료 수</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getDailyTestCounts()}>
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="count" stroke="#0BA360" fill="#0BA360" fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 레벨별 분포 */}
              <Card>
                <CardHeader>
                  <CardTitle>NTRP 레벨 분포</CardTitle>
                  <CardDescription>사용자들의 NTRP 레벨 분포</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getLevelDistribution()}>
                        <XAxis dataKey="level" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#0BA360" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 평균 점수 추이 */}
              <Card>
                <CardHeader>
                  <CardTitle>평균 점수 추이</CardTitle>
                  <CardDescription>일별 평균 NTRP 점수 변화</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getAverageScoreTrend()}>
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 75]} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="averageScore" stroke="#0BA360" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 시간대별 테스트 분포 */}
              <Card>
                <CardHeader>
                  <CardTitle>시간대별 테스트 분포</CardTitle>
                  <CardDescription>24시간 중 테스트가 가장 많이 이루어진 시간대</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getHourlyDistribution()}>
                        <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#2364AA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 캐릭터별 분포 */}
              <Card>
                <CardHeader>
                  <CardTitle>플레이 스타일 분포</CardTitle>
                  <CardDescription>사용자들의 테니스 플레이 스타일 분포</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getCharacterDistribution()}
                          dataKey="count"
                          nameKey="character"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={({ character, percentage }) => `${character} (${percentage}%)`}
                        >
                          {getCharacterDistribution().map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 점수 분포 히스토그램 */}
              <Card>
                <CardHeader>
                  <CardTitle>점수 분포</CardTitle>
                  <CardDescription>NTRP 테스트 점수의 분포</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { range: "15-25", count: data.filter(d => d.score >= 15 && d.score <= 25).length },
                        { range: "26-35", count: data.filter(d => d.score >= 26 && d.score <= 35).length },
                        { range: "36-45", count: data.filter(d => d.score >= 36 && d.score <= 45).length },
                        { range: "46-55", count: data.filter(d => d.score >= 46 && d.score <= 55).length },
                        { range: "56-65", count: data.filter(d => d.score >= 56 && d.score <= 65).length },
                        { range: "66-75", count: data.filter(d => d.score >= 66 && d.score <= 75).length },
                      ]}>
                        <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#C7F000" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 사용자 재방문 분석 */}
              <Card>
                <CardHeader>
                  <CardTitle>사용자 재방문 분석</CardTitle>
                  <CardDescription>같은 사용자의 테스트 재참여 패턴</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(() => {
                      const userTestCounts = data.reduce((acc, item) => {
                        acc[item.device_id] = (acc[item.device_id] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>);

                      const singleTest = Object.values(userTestCounts).filter(count => count === 1).length;
                      const multipleTests = Object.values(userTestCounts).filter(count => count > 1).length;

                      return (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-[#64748B]">1회 테스트</span>
                            <span className="font-semibold">{singleTest}명</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#64748B]">재방문 사용자</span>
                            <span className="font-semibold">{multipleTests}명</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#0BA360] h-2 rounded-full" 
                              style={{ width: `${(multipleTests / (singleTest + multipleTests)) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-[#64748B]">
                            재방문율: {((multipleTests / (singleTest + multipleTests)) * 100).toFixed(1)}%
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* 인기 시간대 분석 */}
              <Card>
                <CardHeader>
                  <CardTitle>인기 시간대 분석</CardTitle>
                  <CardDescription>테스트가 가장 활발한 시간대</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getHourlyDistribution()
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 5)
                      .map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-[#64748B]">{item.hour}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#0BA360] h-2 rounded-full" 
                                style={{ width: `${(item.count / Math.max(...getHourlyDistribution().map(h => h.count))) * 100}%` }}
                              ></div>
                            </div>
                            <span className="font-semibold text-sm">{item.count}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
