"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Upload, Download, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";
import { flagUrl } from "@/lib/flags";
import { n0, dYMD } from "@/lib/format";

interface RankingRow {
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

export default function RankingsPage() {
  const [rankings, setRankings] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTour, setActiveTour] = useState<"ATP" | "WTA">("ATP");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    loadRankings(activeTour);
  }, [activeTour]);

  useEffect(() => {
    // 국가 목록 추출
    const uniqueCountries = Array.from(
      new Set(rankings.map(r => r.country_code))
    ).sort();
    setCountries(uniqueCountries);
  }, [rankings]);

  const loadRankings = async (tour: "ATP" | "WTA") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/rankings?tour=${tour}`);
      const data = await response.json();
      setRankings(data);
    } catch (error) {
      console.error("랭킹 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch("/api/upload/csv", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        setRankings(result.data);
        alert(`CSV 파일이 성공적으로 업로드되었습니다. (${result.count}개 레코드)`);
      } else {
        alert(`업로드 실패: ${result.error}`);
      }
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      alert("파일 업로드 중 오류가 발생했습니다.");
    }
  };

  const exportCSV = () => {
    const csvContent = [
      ["Rank", "Player", "Country", "Age", "Points", "Tournaments", "Movement", "As of"],
      ...filteredRankings.map(r => [
        r.rank,
        r.player_name,
        r.country_code,
        r.age || "",
        r.points,
        r.tournaments || "",
        r.movement || "",
        r.as_of
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeTour.toLowerCase()}-rankings-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredRankings = rankings.filter(ranking => {
    const matchesSearch = ranking.player_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = !countryFilter || ranking.country_code === countryFilter;
    return matchesSearch && matchesCountry;
  });

  const getMovementIcon = (movement: number | null) => {
    if (movement === null) return <Minus className="w-4 h-4 text-gray-400" />;
    if (movement > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (movement < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getMovementText = (movement: number | null) => {
    if (movement === null) return "NEW";
    if (movement > 0) return `+${movement}`;
    if (movement < 0) return `${movement}`;
    return "0";
  };

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-2">
            🏆 테니스 랭킹 스냅샷
          </h1>
          <p className="text-lg text-[#64748B]">ATP/WTA 랭킹을 실시간으로 확인하고 분석하세요</p>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>랭킹 필터 및 도구</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="선수 이름 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="국가 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">모든 국가</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Button onClick={exportCSV} variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  CSV 내보내기
                </Button>
                
                <label className="cursor-pointer">
                  <Button variant="outline" className="gap-2" asChild>
                    <span>
                      <Upload className="w-4 h-4" />
                      CSV 업로드
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rankings Table */}
        <Card>
          <CardHeader>
            <Tabs value={activeTour} onValueChange={(value) => setActiveTour(value as "ATP" | "WTA")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ATP">ATP 랭킹</TabsTrigger>
                <TabsTrigger value="WTA">WTA 랭킹</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0BA360] mx-auto"></div>
                <p className="mt-2 text-gray-600">랭킹 데이터를 불러오는 중...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>순위</TableHead>
                      <TableHead>선수</TableHead>
                      <TableHead>국가</TableHead>
                      <TableHead>나이</TableHead>
                      <TableHead>포인트</TableHead>
                      <TableHead>대회</TableHead>
                      <TableHead>변동</TableHead>
                      <TableHead>기준일</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRankings.map((ranking) => (
                      <TableRow key={`${ranking.tour}-${ranking.rank}`}>
                        <TableCell className="font-semibold">
                          {ranking.rank}
                        </TableCell>
                        <TableCell>
                          <Link 
                            href={`/players/${ranking.player_id}`}
                            className="font-medium hover:text-[#0BA360] transition-colors"
                          >
                            {ranking.player_name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img 
                              src={flagUrl(ranking.country_code)} 
                              alt={ranking.country_code}
                              className="w-6 h-4 object-cover rounded"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <span className="text-sm">{ranking.country_code}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {ranking.age ? `${ranking.age}세` : "-"}
                        </TableCell>
                        <TableCell className="font-mono">
                          {n0(ranking.points)}
                        </TableCell>
                        <TableCell>
                          {ranking.tournaments || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getMovementIcon(ranking.movement)}
                            <span className="text-sm">
                              {getMovementText(ranking.movement)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {dYMD(ranking.as_of)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#0BA360]">
                {filteredRankings.length}
              </div>
              <div className="text-sm text-gray-600">표시된 선수</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#0BA360]">
                {countries.length}
              </div>
              <div className="text-sm text-gray-600">국가 수</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#0BA360]">
                {activeTour}
              </div>
              <div className="text-sm text-gray-600">현재 투어</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-[#0BA360]/10 to-[#2364AA]/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">더 많은 분석이 필요하신가요?</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/compare">
                <Button className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  선수 비교하기
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
