"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

interface MatchData {
  id: string;
  date: string;
  opponent: string;
  result: 'win' | 'loss';
  score: string;
  sets: number;
  gamesWon: number;
  gamesLost: number;
  firstServeIn: number;
  firstServeTotal: number;
  secondServeIn: number;
  secondServeTotal: number;
  aces: number;
  doubleFaults: number;
  winners: number;
  unforcedErrors: number;
  returnPointsWon: number;
  returnPointsTotal: number;
  breakPointsWon: number;
  breakPointsTotal: number;
  netPointsWon: number;
  netPointsTotal: number;
  court: string;
  surface: string;
}

interface AnalyticsData {
  totalMatches: number;
  winRate: number;
  totalSets: number;
  setsWon: number;
  averageGamesPerSet: number;
  firstServePercentage: number;
  secondServePercentage: number;
  aceRate: number;
  doubleFaultRate: number;
  winnerRate: number;
  unforcedErrorRate: number;
  returnPointPercentage: number;
  breakPointConversion: number;
  netPointPercentage: number;
  surfaceStats: {
    hard: { matches: number; winRate: number };
    clay: { matches: number; winRate: number };
    grass: { matches: number; winRate: number };
  };
  monthlyTrend: Array<{
    month: string;
    matches: number;
    winRate: number;
  }>;
  opponentStats: Array<{
    opponent: string;
    matches: number;
    winRate: number;
  }>;
}

export default function MatchAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'all' | '3months' | '6months' | '1year'>('all');

  useEffect(() => {
    // 시뮬레이션 데이터 생성 (실제로는 API에서 가져올 데이터)
    generateMockData();
  }, [timeRange]);

  const generateMockData = () => {
    setLoading(true);
    
    // 시뮬레이션 데이터 생성
    const mockData: AnalyticsData = {
      totalMatches: 24,
      winRate: 66.7,
      totalSets: 48,
      setsWon: 32,
      averageGamesPerSet: 6.2,
      firstServePercentage: 68.5,
      secondServePercentage: 89.2,
      aceRate: 8.3,
      doubleFaultRate: 4.1,
      winnerRate: 12.7,
      unforcedErrorRate: 15.2,
      returnPointPercentage: 42.3,
      breakPointConversion: 58.8,
      netPointPercentage: 71.4,
      surfaceStats: {
        hard: { matches: 16, winRate: 68.8 },
        clay: { matches: 6, winRate: 66.7 },
        grass: { matches: 2, winRate: 50.0 }
      },
      monthlyTrend: [
        { month: '1월', matches: 3, winRate: 66.7 },
        { month: '2월', matches: 4, winRate: 75.0 },
        { month: '3월', matches: 5, winRate: 60.0 },
        { month: '4월', matches: 6, winRate: 66.7 },
        { month: '5월', matches: 4, winRate: 75.0 },
        { month: '6월', matches: 2, winRate: 50.0 }
      ],
      opponentStats: [
        { opponent: '김테니스', matches: 4, winRate: 75.0 },
        { opponent: '이랠리', matches: 3, winRate: 66.7 },
        { opponent: '박서브', matches: 3, winRate: 33.3 },
        { opponent: '최발리', matches: 2, winRate: 100.0 },
        { opponent: '정올라운더', matches: 2, winRate: 50.0 }
      ]
    };

    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0BA360] mx-auto mb-4"></div>
          <p className="text-lg text-[#64748B]">분석 데이터를 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-4">분석 데이터가 없습니다</h1>
          <p className="text-[#64748B] mb-6">경기 기록을 먼저 입력해주세요</p>
          <Button onClick={() => window.location.href = '/match-analyzer/new'} className="bg-[#0BA360] hover:bg-[#19C37D]">
            경기 기록 입력하기
          </Button>
        </div>
      </div>
    );
  }

  const COLORS = ['#0BA360', '#2364AA', '#C7F000', '#F59E0B', '#EF4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10">
      <div className="max-w-7xl mx-auto p-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            📊 경기 기록 누적 분석
          </h1>
          <p className="text-lg text-[#64748B] mb-6">
            데이터로 찾는 승리 패턴과 개선점
          </p>
          
          {/* Time Range Selector */}
          <div className="flex justify-center gap-2 mb-6">
            {[
              { value: 'all', label: '전체' },
              { value: '1year', label: '1년' },
              { value: '6months', label: '6개월' },
              { value: '3months', label: '3개월' }
            ].map((range) => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range.value as any)}
                className={timeRange === range.value ? 'bg-[#0BA360] hover:bg-[#19C37D]' : ''}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">총 경기 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{analyticsData.totalMatches}</div>
              <p className="text-xs text-[#64748B]">경기</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">승률</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0BA360]">{analyticsData.winRate}%</div>
              <Progress value={analyticsData.winRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">세트 승률</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2364AA]">
                {Math.round((analyticsData.setsWon / analyticsData.totalSets) * 100)}%
              </div>
              <p className="text-xs text-[#64748B]">{analyticsData.setsWon}/{analyticsData.totalSets} 세트</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">평균 게임/세트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#C7F000]">{analyticsData.averageGamesPerSet}</div>
              <p className="text-xs text-[#64748B]">게임</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="serve">서브 분석</TabsTrigger>
            <TabsTrigger value="return">리턴 분석</TabsTrigger>
            <TabsTrigger value="trends">트렌드</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Surface Performance */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">코트별 성과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analyticsData.surfaceStats).map(([surface, stats]) => (
                      <div key={surface} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {surface === 'hard' ? '하드' : surface === 'clay' ? '클레이' : '잔디'}
                          </Badge>
                          <span className="text-sm">{stats.matches}경기</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#0BA360]">{stats.winRate}%</div>
                          <Progress value={stats.winRate} className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trend Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">월별 승률 트렌드</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={analyticsData.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="winRate" stroke="#0BA360" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="serve" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[#64748B]">퍼스트 서브 인률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0BA360]">{analyticsData.firstServePercentage}%</div>
                  <Progress value={analyticsData.firstServePercentage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[#64748B]">세컨드 서브 인률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#2364AA]">{analyticsData.secondServePercentage}%</div>
                  <Progress value={analyticsData.secondServePercentage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[#64748B]">에이스 비율</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#C7F000]">{analyticsData.aceRate}%</div>
                  <p className="text-xs text-[#64748B]">서브당</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[#64748B]">더블폴트 비율</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#F59E0B]">{analyticsData.doubleFaultRate}%</div>
                  <p className="text-xs text-[#64748B]">서브당</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="return" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[#64748B]">리턴 포인트 성공률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#0BA360]">{analyticsData.returnPointPercentage}%</div>
                  <Progress value={analyticsData.returnPointPercentage} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[#64748B]">브레이크 포인트 성공률</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#2364AA]">{analyticsData.breakPointConversion}%</div>
                  <Progress value={analyticsData.breakPointConversion} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[#64748B]">위너 비율</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#C7F000]">{analyticsData.winnerRate}%</div>
                  <p className="text-xs text-[#64748B]">샷당</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-[#64748B]">UE 비율</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#F59E0B]">{analyticsData.unforcedErrorRate}%</div>
                  <p className="text-xs text-[#64748B]">샷당</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Opponent Performance */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">상대별 성과</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.opponentStats.map((opponent, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                        <div>
                          <div className="font-medium">{opponent.opponent}</div>
                          <div className="text-sm text-[#64748B]">{opponent.matches}경기</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#0BA360]">{opponent.winRate}%</div>
                          <Progress value={opponent.winRate} className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Matches Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">월별 경기 수</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={analyticsData.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="matches" fill="#0BA360" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            onClick={() => window.location.href = '/match-analyzer/new'}
            className="bg-[#0BA360] hover:bg-[#19C37D]"
          >
            📝 새 경기 기록 입력
          </Button>
          <Button
            onClick={() => window.location.href = '/match-analyzer/matches'}
            variant="outline"
          >
            📊 전체 경기 보기
          </Button>
          <Button
            onClick={() => {
              const data = `경기 기록 분석 결과\n\n총 경기: ${analyticsData.totalMatches}경기\n승률: ${analyticsData.winRate}%\n세트 승률: ${Math.round((analyticsData.setsWon / analyticsData.totalSets) * 100)}%\n\n서브 분석:\n퍼스트 서브: ${analyticsData.firstServePercentage}%\n세컨드 서브: ${analyticsData.secondServePercentage}%\n에이스: ${analyticsData.aceRate}%\n더블폴트: ${analyticsData.doubleFaultRate}%\n\n리턴 분석:\n리턴 성공률: ${analyticsData.returnPointPercentage}%\n브레이크 성공률: ${analyticsData.breakPointConversion}%\n위너: ${analyticsData.winnerRate}%\nUE: ${analyticsData.unforcedErrorRate}%`;
              navigator.clipboard.writeText(data);
            }}
            variant="outline"
          >
            📋 분석 결과 복사
          </Button>
        </div>
      </div>
    </div>
  );
}
