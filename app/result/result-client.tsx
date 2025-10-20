"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase, NTRPResult } from "@/lib/supabaseClient";
import { getDeviceId } from "@/lib/device";
import { getNTRPLevel, charMap } from "@/lib/ntrp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ResultPageClient() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") || 0);
  const q13 = decodeURIComponent(searchParams.get("q13") || "");
  
  const { level, desc } = getNTRPLevel(score);
  const character = charMap[q13] || "올라운더";
  const [recent, setRecent] = useState<NTRPResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const device_id = getDeviceId();
    
    const saveAndFetchResults = async () => {
      try {
        // Supabase가 설정되어 있는지 확인
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co") {
          // 결과 저장
          await supabase.from("ntrp_results").insert({
            device_id,
            score,
            level,
            character,
          });

          // 최근 3개 결과 가져오기
          const { data } = await supabase
            .from("ntrp_results")
            .select("created_at, score, level, character")
            .eq("device_id", device_id)
            .order("created_at", { ascending: false })
            .limit(3);

          setRecent(data || []);
        } else {
          // Supabase가 설정되지 않은 경우 로컬 스토리지에 저장
          const localResults = JSON.parse(localStorage.getItem('ntrp_results') || '[]');
          const newResult = {
            created_at: new Date().toISOString(),
            score,
            level,
            character,
          };
          localResults.unshift(newResult);
          localStorage.setItem('ntrp_results', JSON.stringify(localResults.slice(0, 3)));
          setRecent(localResults.slice(0, 3));
        }
      } catch (error) {
        console.error("Error saving/fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    saveAndFetchResults();
  }, [score, level, character]);

  const copyShareLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;
    navigator.clipboard.writeText(url);
    alert("결과 링크가 복사되었습니다!");
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

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <Header />
      
      <main className="max-w-4xl mx-auto p-6 pt-8">
        {/* 결과 카드 */}
        <Card className="p-8 text-center bg-gradient-to-b from-[#0BA360]/10 to-white shadow-lg mb-8">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0BA360] to-[#19C37D] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-3xl">🎾</span>
            </div>
            <h1 className="text-4xl font-bold text-[#0F172A] mb-2">
              당신의 NTRP 레벨은
            </h1>
            <div className="text-6xl font-black text-[#0BA360] mb-4">
              {level}
            </div>
          </div>
          
          <p className="text-lg text-[#64748B] mb-6 leading-relaxed max-w-2xl mx-auto">
            {desc}
          </p>
          
          <div className="flex justify-center gap-3 mb-8">
            <Badge className={`${getLevelColor(level)} text-lg px-4 py-2`}>
              NTRP {level}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {getCharacterEmoji(character)} {character}
            </Badge>
          </div>

          {/* 액션 버튼들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link href="/test">
              <Button className="w-full bg-[#0BA360] hover:bg-[#19C37D] text-white">
                🔄 다시 테스트하기
              </Button>
            </Link>
            <Button variant="outline" onClick={copyShareLink} className="w-full">
              📤 결과 공유하기
            </Button>
            <Link href="/stats">
              <Button variant="outline" className="w-full">
                📊 통계 보기
              </Button>
            </Link>
          </div>
        </Card>

        {/* 상세 분석 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">📈 점수 분석</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#64748B]">총 점수</span>
                <span className="font-semibold text-[#0F172A]">{score}점</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">NTRP 레벨</span>
                <span className="font-semibold text-[#0BA360]">{level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">플레이 스타일</span>
                <span className="font-semibold text-[#0F172A]">{character}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🎯 다음 목표</h3>
            <div className="space-y-3">
              {level === "1.5" && (
                <p className="text-[#64748B]">기본 스트로크 연습을 통해 2.5 레벨을 목표로 하세요.</p>
              )}
              {level === "2.5" && (
                <p className="text-[#64748B]">일관성 있는 랠리를 통해 3.0 레벨을 목표로 하세요.</p>
              )}
              {level === "3.0" && (
                <p className="text-[#64748B]">방향 조절과 네트 플레이로 3.5 레벨을 목표로 하세요.</p>
              )}
              {level === "3.5" && (
                <p className="text-[#64748B]">전술적 경기 운영으로 4.0 레벨을 목표로 하세요.</p>
              )}
              {level === "4.0" && (
                <p className="text-[#64748B]">파워와 스핀 활용으로 4.5 레벨을 목표로 하세요.</p>
              )}
              {level === "4.5" && (
                <p className="text-[#64748B]">모든 기술을 완성하여 5.0+ 레벨을 목표로 하세요.</p>
              )}
              {level === "5.0+" && (
                <p className="text-[#64748B]">이미 최고 수준입니다! 대회 참가를 고려해보세요.</p>
              )}
            </div>
          </Card>
        </div>

        {/* 최근 결과 히스토리 */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">
            📋 내 최근 결과 (이 기기)
          </h3>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-[#64748B]">결과를 저장하고 있습니다...</div>
            </div>
          ) : (
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
                  {recent.map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">
                        {new Date(r.created_at!).toLocaleString('ko-KR')}
                      </td>
                      <td className="p-3 text-right font-medium">{r.score}</td>
                      <td className="p-3 text-center">
                        <Badge className={getLevelColor(r.level)}>
                          {r.level}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        {getCharacterEmoji(r.character)} {r.character}
                      </td>
                    </tr>
                  ))}
                  {!recent.length && (
                    <tr>
                      <td className="p-3 text-center text-[#64748B]" colSpan={4}>
                        저장된 기록이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* 관련 유틸리티 */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#0F172A] mb-4">🔧 관련 유틸리티</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/utility/tennis-type">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-2">
                  🎯 테니스 성향 분석
                </h4>
                <p className="text-[#64748B] text-sm">
                  나의 플레이 스타일을 더 자세히 분석하고 맞춤형 훈련 계획을 세우세요.
                </p>
              </Card>
            </Link>
            <Link href="/utility/racket-recommender">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="text-lg font-semibold text-[#0F172A] mb-2">
                  🎾 라켓 추천
                </h4>
                <p className="text-[#64748B] text-sm">
                  나의 실력과 플레이 스타일에 맞는 최적의 라켓을 추천받으세요.
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
