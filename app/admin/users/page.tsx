"use client";

import { useState, useEffect } from "react";
import { supabase, NTRPResult } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye,
  ArrowLeft,
  Users,
  Activity,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

export default function UserManagementPage() {
  const [users, setUsers] = useState<NTRPResult[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<NTRPResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCharacter, setSelectedCharacter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, selectedLevel, selectedCharacter]);

  const fetchUsers = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co") {
        const { data, error } = await supabase
          .from("ntrp_results")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(1000);

        if (error) throw error;
        setUsers(data || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    // 검색어 필터
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.device_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 레벨 필터
    if (selectedLevel !== "all") {
      filtered = filtered.filter(user => user.level === selectedLevel);
    }

    // 캐릭터 필터
    if (selectedCharacter !== "all") {
      filtered = filtered.filter(user => user.character === selectedCharacter);
    }

    setFilteredUsers(filtered);
  };

  const deleteUser = async (id: string) => {
    if (!confirm("정말로 이 사용자 데이터를 삭제하시겠습니까?")) return;

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co") {
        const { error } = await supabase
          .from("ntrp_results")
          .delete()
          .eq("id", id);

        if (error) throw error;
        
        setUsers(users.filter(user => user.id !== id));
        alert("사용자 데이터가 삭제되었습니다.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const exportData = () => {
    const csvContent = [
      ["ID", "Device ID", "Score", "Level", "Character", "Created At"],
      ...filteredUsers.map(user => [
        user.id,
        user.device_id,
        user.score,
        user.level,
        user.character,
        new Date(user.created_at!).toLocaleString('ko-KR')
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ntrp_users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  const getCharacterEmoji = (character: string) => {
    switch (character) {
      case "성실형 랠리":
        return "🎯";
      case "생존 수비":
        return "🛡️";
      case "기회 포착 공격형":
        return "⚡";
      case "두뇌파 분석가":
        return "🧠";
      case "올라운더":
        return "🌟";
      default:
        return "🎾";
    }
  };

  // 통계 계산
  const totalUsers = users.length;
  const uniqueDevices = new Set(users.map(u => u.device_id)).size;
  const averageScore = users.length > 0 ? (users.reduce((sum, u) => sum + u.score, 0) / users.length).toFixed(1) : "0";
  const levelDistribution = users.reduce((acc, user) => {
    acc[user.level] = (acc[user.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#64748B]">사용자 데이터를 불러오는 중...</div>
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
                  <Users className="w-8 h-8 text-[#0BA360]" />
                  사용자 관리
                </h1>
                <p className="text-[#64748B] mt-1">NTRP 테스트 결과 및 사용자 데이터 관리</p>
              </div>
            </div>
            <Button onClick={exportData} className="bg-[#0BA360] hover:bg-[#19C37D] text-white">
              <Download className="w-4 h-4 mr-2" />
              데이터 내보내기
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">총 테스트 수</CardTitle>
              <Activity className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">고유 사용자</CardTitle>
              <Users className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{uniqueDevices}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">평균 점수</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{averageScore}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">필터된 결과</CardTitle>
              <Filter className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{filteredUsers.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* 필터 및 검색 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>필터 및 검색</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#64748B]" />
                <Input
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-[#E2E8F0] rounded-md bg-white"
              >
                <option value="all">모든 레벨</option>
                <option value="1.5">1.5</option>
                <option value="2.5">2.5</option>
                <option value="3.0">3.0</option>
                <option value="3.5">3.5</option>
                <option value="4.0">4.0</option>
                <option value="4.5">4.5</option>
                <option value="5.0+">5.0+</option>
              </select>
              <select
                value={selectedCharacter}
                onChange={(e) => setSelectedCharacter(e.target.value)}
                className="px-3 py-2 border border-[#E2E8F0] rounded-md bg-white"
              >
                <option value="all">모든 캐릭터</option>
                <option value="성실형 랠리">성실형 랠리</option>
                <option value="생존 수비">생존 수비</option>
                <option value="기회 포착 공격형">기회 포착 공격형</option>
                <option value="두뇌파 분석가">두뇌파 분석가</option>
                <option value="올라운더">올라운더</option>
              </select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedLevel("all");
                  setSelectedCharacter("all");
                }}
              >
                필터 초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 사용자 목록 */}
        <Card>
          <CardHeader>
            <CardTitle>사용자 목록</CardTitle>
            <CardDescription>
              총 {filteredUsers.length}개의 결과가 표시됩니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Device ID</th>
                    <th className="p-3 text-right">점수</th>
                    <th className="p-3 text-center">레벨</th>
                    <th className="p-3 text-center">캐릭터</th>
                    <th className="p-3 text-left">생성일</th>
                    <th className="p-3 text-center">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className="border-t">
                      <td className="p-3 font-mono text-xs">{user.id?.slice(0, 8)}...</td>
                      <td className="p-3 font-mono text-xs">{user.device_id.slice(0, 8)}...</td>
                      <td className="p-3 text-right font-medium">{user.score}</td>
                      <td className="p-3 text-center">
                        <Badge className={getLevelColor(user.level)}>
                          {user.level}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <span className="flex items-center justify-center gap-1">
                          {getCharacterEmoji(user.character)} {user.character}
                        </span>
                      </td>
                      <td className="p-3">
                        {new Date(user.created_at!).toLocaleString('ko-KR')}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // 상세 보기 기능 (추후 구현)
                              alert(`사용자 상세 정보: ${user.device_id}`);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteUser(user.id!)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td className="p-8 text-center text-[#64748B]" colSpan={7}>
                        조건에 맞는 사용자가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
