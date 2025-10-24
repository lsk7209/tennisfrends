"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Search, TrendingUp, Users, BarChart3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { flagUrl } from "@/lib/flags";
import { n0 } from "@/lib/format";

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

interface ComparisonData {
  player: PlayerData;
  rankingHistory: { date: string; rank: number }[];
  pointsHistory: { date: string; points: number }[];
}

export default function ComparePage() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/rankings?tour=ATP");
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("선수 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerSelect = (playerId: string, index: number) => {
    const newSelected = [...selectedPlayers];
    newSelected[index] = playerId;
    setSelectedPlayers(newSelected);
  };

  const loadComparisonData = async () => {
    if (selectedPlayers.filter(Boolean).length < 2) {
      alert("최소 2명의 선수를 선택해주세요.");
      return;
    }

    setLoading(true);
    try {
      // 실제 구현에서는 API에서 비교 데이터를 가져와야 함
      // 여기서는 임시 데이터 사용
      const mockData: ComparisonData[] = selectedPlayers
        .filter(Boolean)
        .map((playerId, index) => {
          const player = players.find(p => p.player_id === playerId);
          if (!player) return null;
          
          return {
            player,
            rankingHistory: [
              { date: "2024-01-15", rank: 4 + index },
              { date: "2024-02-15", rank: 3 + index },
              { date: "2024-03-15", rank: 2 + index },
              { date: "2024-04-15", rank: 1 + index },
              { date: "2024-05-15", rank: 1 + index },
              { date: "2025-01-15", rank: 1 + index }
            ],
            pointsHistory: [
              { date: "2024-01-15", points: 8900 - (index * 500) },
              { date: "2024-02-15", points: 9200 - (index * 500) },
              { date: "2024-03-15", points: 9800 - (index * 500) },
              { date: "2024-04-15", points: 10200 - (index * 500) },
              { date: "2024-05-15", points: 10800 - (index * 500) },
              { date: "2025-01-15", points: 11280 - (index * 500) }
            ]
          };
        })
        .filter(Boolean) as ComparisonData[];
      
      setComparisonData(mockData);
    } catch (error) {
      console.error("비교 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlayers = players.filter(player =>
    player.player_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getChartData = () => {
    if (comparisonData.length === 0) return [];
    
    const dates = comparisonData[0].rankingHistory.map(h => h.date);
    return dates.map(date => {
      const dataPoint: any = { date };
      comparisonData.forEach((data, index) => {
        const rankingPoint = data.rankingHistory.find(h => h.date === date);
        const pointsPoint = data.pointsHistory.find(h => h.date === date);
        dataPoint[`${data.player.player_name}_rank`] = rankingPoint?.rank;
        dataPoint[`${data.player.player_name}_points`] = pointsPoint?.points;
      });
      return dataPoint;
    });
  };

  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/rankings">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              랭킹으로 돌아가기
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">선수 비교</h1>
            <p className="text-gray-600">최대 3명의 선수를 선택하여 비교하세요</p>
          </div>
        </div>

        {/* Player Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              선수 선택
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="선수 이름 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">선수 {index + 1}</label>
                  <Select 
                    value={selectedPlayers[index] || ""} 
                    onValueChange={(value) => handlePlayerSelect(value, index)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="선수 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredPlayers.map((player) => (
                        <SelectItem key={player.player_id} value={player.player_id}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">#{player.rank}</span>
                            <span>{player.player_name}</span>
                            <span className="text-sm text-gray-500">({player.country_code})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={loadComparisonData}
                disabled={loading || selectedPlayers.filter(Boolean).length < 2}
                className="gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                {loading ? "비교 중..." : "비교하기"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Results */}
        {comparisonData.length > 0 && (
          <>
            {/* Player Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {comparisonData.map((data, index) => (
                <Card key={data.player.player_id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-full flex items-center justify-center text-white text-lg font-bold">
                        {data.player.rank}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{data.player.player_name}</h3>
                        <div className="flex items-center gap-2">
                          <img 
                            src={flagUrl(data.player.country_code)} 
                            alt={data.player.country_code}
                            className="w-4 h-3 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <span className="text-sm text-gray-600">{data.player.country_code}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">포인트</span>
                        <span className="font-semibold">{n0(data.player.points)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">나이</span>
                        <span className="font-semibold">{data.player.age || "-"}세</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">대회</span>
                        <span className="font-semibold">{data.player.tournaments || "-"}회</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">변동</span>
                        <span className="font-semibold">
                          {data.player.movement ? (data.player.movement > 0 ? `+${data.player.movement}` : data.player.movement) : "0"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Ranking Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  랭킹 비교 (최근 6개월)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
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
                      />
                      <Legend />
                      {comparisonData.map((data, index) => {
                        const colors = ["#0BA360", "#2364AA", "#DC2626"];
                        return (
                          <Line
                            key={data.player.player_id}
                            type="monotone"
                            dataKey={`${data.player.player_name}_rank`}
                            stroke={colors[index]}
                            strokeWidth={3}
                            dot={{ fill: colors[index], strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                            name={data.player.player_name}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Points Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  포인트 비교 (최근 6개월)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
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
                      <Legend />
                      {comparisonData.map((data, index) => {
                        const colors = ["#0BA360", "#2364AA", "#DC2626"];
                        return (
                          <Line
                            key={data.player.player_id}
                            type="monotone"
                            dataKey={`${data.player.player_name}_points`}
                            stroke={colors[index]}
                            strokeWidth={3}
                            dot={{ fill: colors[index], strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                            name={data.player.player_name}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* CTA */}
        <Card className="bg-gradient-to-r from-[#0BA360]/10 to-[#2364AA]/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">더 많은 분석이 필요하신가요?</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/rankings">
                <Button className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  전체 랭킹 보기
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
