"use client";

import { useEffect, useMemo, useState } from "react";
import { parseCSV, serializeCSV } from "@/lib/csv";
import { supabase } from "@/lib/supabaseClient";
import { getDeviceId } from "@/lib/device";
import { calcKPIs } from "@/lib/kpi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Upload, Download, Filter } from "lucide-react";

function KpiCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-[#64748B] mb-1">{title}</div>
        <div className="text-lg font-semibold text-[#0F172A]">{value}</div>
      </CardContent>
    </Card>
  );
}

export default function MatchListPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [filter, setFilter] = useState({
    from: "",
    to: "",
    surface: "all",
    indoor: "all",
    result: "all",
    opp: "all"
  });

  useEffect(() => {
    (async () => {
      // Load from Supabase if configured, else from localStorage for demo
      if (supabase) {
        const device = getDeviceId();
        const { data } = await supabase
          .from("matches")
          .select("*")
          .eq("device_id", device)
          .order("played_at", { ascending: false })
          .limit(500);
        setRows(data || []);
      } else {
        const local = localStorage.getItem("matches");
        setRows(local ? JSON.parse(local) : []);
      }
    })();
  }, []);

  const viewRows = useMemo(() => {
    return rows.filter(r => {
      // Date filter
      if (filter.from && new Date(r.played_at) < new Date(filter.from)) return false;
      if (filter.to && new Date(r.played_at) > new Date(filter.to)) return false;
      
      // Surface filter
      if (filter.surface !== "all" && r.court_surface !== filter.surface) return false;
      
      // Indoor filter
      if (filter.indoor !== "all") {
        const isIndoor = filter.indoor === "indoor";
        if (r.indoor !== isIndoor) return false;
      }
      
      // Result filter
      if (filter.result !== "all" && r.result !== filter.result) return false;
      
      // Opponent level filter
      if (filter.opp !== "all" && r.opponent_level !== filter.opp) return false;
      
      return true;
    });
  }, [rows, filter]);

  const kpi = calcKPIs(viewRows);

  async function onUploadCSV(file: File) {
    try {
      const parsed = await parseCSV(file);
      const device = getDeviceId();
      const normalized = parsed.map((r: any) => ({
        ...r,
        id: crypto.randomUUID(),
        device_id: device,
        played_at: r.played_at ? new Date(r.played_at).toISOString() : new Date().toISOString(),
        indoor: String(r.indoor).toLowerCase() === "true" || r.indoor === "1",
        total_games_for: parseInt(r.total_games_for) || 0,
        total_games_against: parseInt(r.total_games_against) || 0,
        winners: parseInt(r.winners) || 0,
        unforced_errors: parseInt(r.unforced_errors) || 0,
        double_faults: parseInt(r.double_faults) || 0,
        aces: parseInt(r.aces) || 0,
        first_serve_in: parseInt(r.first_serve_in) || 0,
        first_serve_total: parseInt(r.first_serve_total) || 0,
        first_serve_points_won: parseInt(r.first_serve_points_won) || 0,
        second_serve_points_won: parseInt(r.second_serve_points_won) || 0,
        return_points_won: parseInt(r.return_points_won) || 0,
        break_points_won: parseInt(r.break_points_won) || 0,
        break_points_total: parseInt(r.break_points_total) || 0,
        avg_rally_length: parseFloat(r.avg_rally_length) || 0,
        max_rally_length: parseInt(r.max_rally_length) || 0
      }));

      if (supabase) {
        await supabase.from("matches").insert(normalized);
        const { data } = await supabase
          .from("matches")
          .select("*")
          .eq("device_id", device)
          .order("played_at", { ascending: false })
          .limit(500);
        setRows(data || []);
      } else {
        const merged = [...normalized, ...rows];
        setRows(merged);
        localStorage.setItem("matches", JSON.stringify(merged));
      }
      
      alert(`${normalized.length}개의 경기 기록이 추가되었습니다.`);
    } catch (error) {
      console.error("CSV 업로드 오류:", error);
      alert("CSV 파일 업로드 중 오류가 발생했습니다.");
    }
  }

  function exportCSV() {
    const csv = serializeCSV(viewRows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "matches_export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-6xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">경기 기록</h1>
            <p className="text-[#64748B]">총 {viewRows.length}개의 경기 기록</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Input
                type="file"
                accept=".csv"
                onChange={e => e.target.files && onUploadCSV(e.target.files[0])}
                className="hidden"
                id="csv-upload"
              />
              <Button variant="outline" onClick={() => document.getElementById('csv-upload')?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                CSV 업로드
              </Button>
            </div>
            <Button onClick={exportCSV} disabled={viewRows.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              CSV 내보내기
            </Button>
            <Link href="/match-analyzer/new">
              <Button className="bg-[#0BA360] hover:bg-[#19C37D]">
                새 기록 입력
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  필터
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">기간</label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      value={filter.from}
                      onChange={e => setFilter(prev => ({ ...prev, from: e.target.value }))}
                      placeholder="시작일"
                    />
                    <Input
                      type="date"
                      value={filter.to}
                      onChange={e => setFilter(prev => ({ ...prev, to: e.target.value }))}
                      placeholder="종료일"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">코트 면</label>
                  <Select value={filter.surface} onValueChange={value => setFilter(prev => ({ ...prev, surface: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="hard">하드</SelectItem>
                      <SelectItem value="clay">클레이</SelectItem>
                      <SelectItem value="grass">그래스</SelectItem>
                      <SelectItem value="carpet">카펫</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">실내/실외</label>
                  <Select value={filter.indoor} onValueChange={value => setFilter(prev => ({ ...prev, indoor: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="indoor">실내</SelectItem>
                      <SelectItem value="outdoor">실외</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">결과</label>
                  <Select value={filter.result} onValueChange={value => setFilter(prev => ({ ...prev, result: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="win">승리</SelectItem>
                      <SelectItem value="loss">패배</SelectItem>
                      <SelectItem value="retired">기권</SelectItem>
                      <SelectItem value="walkover">불참</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">상대 레벨</label>
                  <Select value={filter.opp} onValueChange={value => setFilter(prev => ({ ...prev, opp: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="beginner">초급</SelectItem>
                      <SelectItem value="intermediate">중급</SelectItem>
                      <SelectItem value="advanced">고급</SelectItem>
                      <SelectItem value="pro">프로</SelectItem>
                      <SelectItem value="unknown">미상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-6">
            {/* KPI Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <KpiCard title="승률" value={`${kpi.winRate}%`} />
              <KpiCard title="게임득실" value={`${kpi.gameDiff}`} />
              <KpiCard title="1서브 인" value={`${kpi.fsInRate}%`} />
              <KpiCard title="브레이크 변환" value={`${kpi.bpRate}%`} />
              <KpiCard title="W/UE" value={`${kpi.wueRatio}`} />
            </div>

            {/* Matches Table */}
            <Card>
              <CardHeader>
                <CardTitle>경기 목록</CardTitle>
                <CardDescription>
                  필터링된 {viewRows.length}개의 경기 기록
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">날짜</th>
                        <th className="text-left py-3 px-2">상대</th>
                        <th className="text-center py-3 px-2">결과</th>
                        <th className="text-center py-3 px-2">스코어</th>
                        <th className="text-center py-3 px-2">면</th>
                        <th className="text-center py-3 px-2">실내</th>
                        <th className="text-right py-3 px-2">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewRows.map(r => (
                        <tr key={r.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2">
                            {new Date(r.played_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2">
                            {r.opponent_name || "-"}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Badge 
                              variant={r.result === "win" ? "default" : "secondary"}
                              className={r.result === "win" ? "bg-[#0BA360]" : ""}
                            >
                              {r.result === "win" ? "승" : r.result === "loss" ? "패" : r.result}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-center">
                            {r.scoreline || "-"}
                          </td>
                          <td className="py-3 px-2 text-center">
                            {r.court_surface}
                          </td>
                          <td className="py-3 px-2 text-center">
                            {r.indoor ? "실내" : "실외"}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Link href={`/match-analyzer/matches/${r.id}`}>
                              <Button variant="outline" size="sm">
                                상세
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                      {viewRows.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-[#64748B]">
                            데이터가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
