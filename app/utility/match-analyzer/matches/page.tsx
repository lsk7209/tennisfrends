"use client";

import { useEffect, useMemo, useState } from "react";
import { parseCSV, serializeCSV } from "@/lib/csv";
import { getDeviceId } from "@/lib/device";
import { calcKPIs } from "@/lib/kpi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Filter, Calendar } from "lucide-react";
import Link from "next/link";

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
      // Load from localStorage for demo
      const local = localStorage.getItem("matches");
      setRows(local ? JSON.parse(local) : []);
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
      if (filter.indoor !== "all" && String(r.indoor) !== filter.indoor) return false;
      
      // Result filter
      if (filter.result !== "all" && r.result !== filter.result) return false;
      
      // Opponent level filter
      if (filter.opp !== "all" && r.opponent_level !== filter.opp) return false;
      
      return true;
    });
  }, [rows, filter]);

  const kpi = calcKPIs(viewRows);

  async function onUploadCSV(file: File) {
    const parsed = await parseCSV(file);
    const device = getDeviceId();
    const normalized = parsed.map((r: any) => ({
      ...r,
      id: crypto.randomUUID(),
      device_id: device,
      played_at: r.played_at ? new Date(r.played_at).toISOString() : new Date().toISOString(),
      indoor: String(r.indoor).toLowerCase() === "true" || r.indoor === "1"
    }));
    
    const merged = [...normalized, ...rows];
    setRows(merged);
    localStorage.setItem("matches", JSON.stringify(merged));
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
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">경기 기록</h1>
            <p className="text-[#64748B]">총 {viewRows.length}경기 • 승률 {kpi.winRate}%</p>
          </div>
          <div className="flex gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={e => e.target.files && onUploadCSV(e.target.files[0])}
                className="hidden"
              />
              <Button variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                CSV 업로드
              </Button>
            </label>
            <Button onClick={exportCSV} className="gap-2">
              <Download className="w-4 h-4" />
              CSV 내보내기
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                필터
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">기간</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="date"
                    value={filter.from}
                    onChange={e => setFilter({ ...filter, from: e.target.value })}
                    placeholder="시작일"
                  />
                  <Input
                    type="date"
                    value={filter.to}
                    onChange={e => setFilter({ ...filter, to: e.target.value })}
                    placeholder="종료일"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">코트면</label>
                <Select value={filter.surface} onValueChange={value => setFilter({ ...filter, surface: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="hard">하드</SelectItem>
                    <SelectItem value="clay">클레이</SelectItem>
                    <SelectItem value="grass">잔디</SelectItem>
                    <SelectItem value="carpet">카펫</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">실내/실외</label>
                <Select value={filter.indoor} onValueChange={value => setFilter({ ...filter, indoor: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="true">실내</SelectItem>
                    <SelectItem value="false">실외</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">결과</label>
                <Select value={filter.result} onValueChange={value => setFilter({ ...filter, result: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="win">승리</SelectItem>
                    <SelectItem value="loss">패배</SelectItem>
                    <SelectItem value="retired">기권</SelectItem>
                    <SelectItem value="walkover">부전승</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">상대 레벨</label>
                <Select value={filter.opp} onValueChange={value => setFilter({ ...filter, opp: value })}>
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

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
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
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">날짜</th>
                        <th className="text-left">상대</th>
                        <th className="text-center">결과</th>
                        <th className="text-center">스코어</th>
                        <th className="text-center">면</th>
                        <th className="text-center">실내</th>
                        <th className="text-right">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewRows.map(r => (
                        <tr key={r.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">{new Date(r.played_at).toLocaleDateString()}</td>
                          <td>{r.opponent_name || "-"}</td>
                          <td className="text-center">
                            <Badge variant={r.result === "win" ? "default" : "secondary"}>
                              {r.result === "win" ? "승" : r.result === "loss" ? "패" : r.result}
                            </Badge>
                          </td>
                          <td className="text-center">{r.scoreline || "-"}</td>
                          <td className="text-center">{r.court_surface}</td>
                          <td className="text-center">{r.indoor ? "실내" : "실외"}</td>
                          <td className="text-right">
                            <Link href={`/utility/match-analyzer/matches/${r.id}`}>
                              <Button variant="ghost" size="sm">상세</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                      {viewRows.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-gray-500">
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

function KpiCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-gray-500 mb-1">{title}</div>
        <div className="text-lg font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}