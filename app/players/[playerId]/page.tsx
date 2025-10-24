"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowLeft, TrendingUp, Calendar, Trophy, Target } from "lucide-react";
import Link from "next/link";
import { flagUrl } from "@/lib/flags";
import { n0, dYMD } from "@/lib/format";

interface PlayerData {
  tour: "ATP" | "WTA";
  rank: number;
  player_id: string;
  player_name: string;
  country_code: string;
  age: number | null;
  points: number;
  tournaments: number | null;
  movement: number | null;
  protected: boolean | null;
  as_of: string;
}

interface RankingHistory {
  date: string;
  rank: number;
  points: number;
}

export default function PlayerDetailPage() {
  const params = useParams();
  const playerId = params.playerId as string;
  
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [rankingHistory, setRankingHistory] = useState<RankingHistory[]>([]);
  const [pointsHistory, setPointsHistory] = useState<RankingHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayerData();
  }, [playerId]);

  const loadPlayerData = async () => {
    setLoading(true);
    try {
      // 실제 구현에서는 API에서 선수 데이터를 가져와야 함
      // 여기서는 임시 데이터 사용
      const mockData: PlayerData = {
        tour: "ATP",
        rank: 1,
        player_id: playerId,
        player_name: "Jannik Sinner",
        country_code: "ITA",
        age: 24,
        points: 11280,
        tournaments: 20,
        movement: 0,
        protected: false,
        as_of: "2025-01-15"
      };
      
      setPlayerData(mockData);
      
      // 랭킹 히스토리 임시 데이터
      const mockRankingHistory: RankingHistory[] = [
        { date: "2024-01-15", rank: 4, points: 8900 },
        { date: "2024-02-15", rank: 3, points: 9200 },
        { date: "2024-03-15", rank: 2, points: 9800 },
        { date: "2024-04-15", rank: 1, points: 10200 },
        { date: "2024-05-15", rank: 1, points: 10800 },
        { date: "2025-01-15", rank: 1, points: 11280 }
      ];
      
      setRankingHistory(mockRankingHistory);
      setPointsHistory(mockRankingHistory);
    } catch (error) {
      console.error("선수 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0BA360] mx-auto"></div>
          <p className="mt-2 text-gray-600">선수 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">선수를 찾을 수 없습니다</h1>
          <Link href="/rankings">
            <Button>랭킹으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/rankings">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              랭킹으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* Player Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {playerData.rank}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#0F172A]">{playerData.player_name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <img 
                      src={flagUrl(playerData.country_code)} 
                      alt={playerData.country_code}
                      className="w-6 h-4 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span className="text-gray-600">{playerData.country_code}</span>
                    {playerData.age && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{playerData.age}세</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#0BA360]">
                  {n0(playerData.points)} pts
                </div>
                <div className="text-sm text-gray-600">
                  {playerData.tour} 랭킹 #{playerData.rank}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#0BA360]">{playerData.rank}</div>
                <div className="text-sm text-gray-600">현재 순위</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#0BA360]">{n0(playerData.points)}</div>
                <div className="text-sm text-gray-600">포인트</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#0BA360]">{playerData.tournaments || 0}</div>
                <div className="text-sm text-gray-600">대회 수</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#0BA360]">
                  {playerData.movement ? (playerData.movement > 0 ? `+${playerData.movement}` : playerData.movement) : "0"}
                </div>
                <div className="text-sm text-gray-600">순위 변동</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <Tabs defaultValue="ranking" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ranking">랭킹 추이</TabsTrigger>
            <TabsTrigger value="points">포인트 추이</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ranking">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  랭킹 추이 (최근 6개월)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rankingHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis 
                        domain={['dataMin - 1', 'dataMax + 1']}
                        reversed
                      />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('ko-KR')}
                        formatter={(value) => [`${value}위`, '순위']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rank" 
                        stroke="#0BA360" 
                        strokeWidth={3}
                        dot={{ fill: '#0BA360', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="points">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  포인트 추이 (최근 6개월)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pointsHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('ko-KR')}
                        formatter={(value) => [n0(Number(value)), '포인트']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="points" 
                        stroke="#2364AA" 
                        strokeWidth={3}
                        dot={{ fill: '#2364AA', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              최근 경기 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-green-800">Australian Open 2025</div>
                    <div className="text-sm text-green-600">Final • 6-3, 6-2, 6-1</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">승리</Badge>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-green-800">ATP Masters 1000</div>
                    <div className="text-sm text-green-600">Semi • 7-5, 6-3</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">승리</Badge>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-red-800">ATP 500</div>
                    <div className="text-sm text-red-600">Quarter • 4-6, 6-4, 3-6</div>
                  </div>
                  <Badge className="bg-red-100 text-red-800">패배</Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline" className="gap-2">
                <Target className="w-4 h-4" />
                더 많은 경기 결과 보기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-[#0BA360]/10 to-[#2364AA]/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">다른 선수와 비교해보세요</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/compare">
                <Button className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  선수 비교하기
                </Button>
              </Link>
              <Link href="/rankings">
                <Button variant="outline" className="gap-2">
                  전체 랭킹 보기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
