"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scoreRacket, type Profile } from "@/lib/rules";
import rackets from "@/data/rackets.json";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Share2, RotateCcw } from "lucide-react";

export default function RacketResultPage() {
  const searchParams = useSearchParams();
  const [rankedRackets, setRankedRackets] = useState<any[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const profileStr = searchParams.get("p");
    if (!profileStr) {
      setIsLoading(false);
      return;
    }

    try {
      const parsedProfile = JSON.parse(decodeURIComponent(profileStr));
      setProfile(parsedProfile);

      // Score and rank rackets
      const scored = rackets
        .map((r: any) => ({
          ...r,
          _score: scoreRacket(parsedProfile, r.spec, r.tags || [])
        }))
        .sort((a: any, b: any) => b._score - a._score)
        .slice(0, 5);

      setRankedRackets(scored);
    } catch (error) {
      console.error("프로필 파싱 오류:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  function whyRecommend(r: any, p: Profile) {
    const reasons: string[] = [];
    
    if (p.spin_level >= 4 && (r.tags?.includes("spin") || ["16x19", "16x20"].includes(r.spec.pattern))) {
      reasons.push("스핀 친화 설계");
    }
    if (p.control_pref >= 4 && (r.tags?.includes("control") || r.spec.stiffness_ra <= 63)) {
      reasons.push("컨트롤/감각 우선");
    }
    if (p.arm_health === "sensitive" && r.spec.stiffness_ra <= 63) {
      reasons.push("팔/관절 친화 강성");
    }
    if (p.power_pref >= 4 && r.spec.stiffness_ra >= 65) {
      reasons.push("파워 손실 최소화");
    }
    if (p.swing_speed === "fast" && r.spec.swingweight >= 320) {
      reasons.push("빠른 스윙과 궁합");
    }
    if (p.swing_speed === "slow" && r.spec.swingweight <= 315) {
      reasons.push("가벼운 스윙에 유리");
    }
    if (p.ntrp <= 3.0 && r.spec.headsize_in2 >= 100) {
      reasons.push("초급자 친화적 헤드사이즈");
    }
    if (p.ntrp >= 4.0 && r.spec.headsize_in2 <= 100) {
      reasons.push("고급자용 정밀한 헤드사이즈");
    }

    return reasons.slice(0, 3).join(" · ");
  }

  async function handleCtaClick(r: any) {
    try {
      // Log CTA click (optional)
      await fetch("/api/log/cta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          racket_id: r.id,
          profile_digest: profile ? `${profile.ntrp}-${profile.style}-${profile.spin_level}` : "",
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error("CTA 로깅 오류:", error);
    }
    
    window.open(r.cta.url, "_blank");
  }

  function copyResultLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("결과 링크가 복사되었습니다!");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">🎾</div>
          <div className="text-[#64748B]">라켓 분석 중...</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">❌</div>
          <div className="text-[#64748B] mb-4">프로필이 없습니다. 테스트부터 진행해주세요.</div>
          <Link href="/utility/racket-matchmaker/test">
            <Button className="bg-[#0BA360] hover:bg-[#19C37D]">
              테스트 시작하기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-6xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/utility/racket-matchmaker/test">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              다시 테스트
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">당신에게 맞는 라켓 Top 5</h1>
            <p className="text-[#64748B]">프로필 기반 자동 매칭 결과입니다</p>
          </div>
        </div>

        {/* Profile Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>당신의 프로필</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-[#64748B]">NTRP:</span>
                <span className="ml-2 font-medium">{profile.ntrp}</span>
              </div>
              <div>
                <span className="text-[#64748B]">스타일:</span>
                <span className="ml-2 font-medium">
                  {profile.style === "attacker" ? "공격형" :
                   profile.style === "counter" ? "수비형" :
                   profile.style === "pusher" ? "푸셔" :
                   profile.style === "serve-volley" ? "서브&발리" :
                   profile.style === "allround" ? "올라운더" :
                   profile.style === "baseliner" ? "베이스라인" :
                   "전술형"}
                </span>
              </div>
              <div>
                <span className="text-[#64748B]">스핀:</span>
                <span className="ml-2 font-medium">{profile.spin_level}/5</span>
              </div>
              <div>
                <span className="text-[#64748B]">팔 상태:</span>
                <span className="ml-2 font-medium">
                  {profile.arm_health === "sensitive" ? "민감" : "보통"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Rackets */}
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          {rankedRackets.map((r: any, index: number) => (
            <Card key={r.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-white rounded-lg border flex items-center justify-center">
                    <span className="text-2xl">🎾</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-[#0BA360]/20 text-[#0BA360]">
                        #{index + 1}
                      </Badge>
                      <span className="font-semibold text-lg">{r.brand} {r.model}</span>
                    </div>
                    
                    <div className="text-xs text-[#64748B] mb-2">
                      {r.spec.headsize_in2}in² · {r.spec.weight_strung}g · SW {r.spec.swingweight} · {r.spec.pattern} · RA {r.spec.stiffness_ra}
                    </div>
                    
                    <div className="text-sm text-[#0F172A] mb-3">
                      {whyRecommend(r, profile)}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-[#0BA360] hover:bg-[#19C37D]"
                        onClick={() => handleCtaClick(r)}
                      >
                        {r.cta.label}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(r.brand + " " + r.model)}`, "_blank")}
                      >
                        리뷰 검색
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Comparison Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>상세 비교표</CardTitle>
            <CardDescription>추천 라켓들의 스펙을 한눈에 비교해보세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">모델</th>
                    <th className="text-center py-3 px-2">헤드(in²)</th>
                    <th className="text-center py-3 px-2">무게(g)</th>
                    <th className="text-center py-3 px-2">밸런스(mm)</th>
                    <th className="text-center py-3 px-2">SW</th>
                    <th className="text-center py-3 px-2">패턴</th>
                    <th className="text-center py-3 px-2">RA</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedRackets.map((r: any, index: number) => (
                    <tr key={r.id} className="border-b">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                          <span className="font-medium">{r.brand} {r.model}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-2">{r.spec.headsize_in2}</td>
                      <td className="text-center py-3 px-2">{r.spec.weight_strung}</td>
                      <td className="text-center py-3 px-2">{r.spec.balance_mm}</td>
                      <td className="text-center py-3 px-2">{r.spec.swingweight}</td>
                      <td className="text-center py-3 px-2">{r.spec.pattern}</td>
                      <td className="text-center py-3 px-2">{r.spec.stiffness_ra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tips and Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>스트링/텐션 팁</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li>스핀 선호가 높다면 폴리/하이브리드, 권장 텐션 기준 -1~-2</li>
                <li>팔 민감: 멀티/소프트 폴리, 권장 텐션 +1~+2</li>
                <li>컨트롤 선호: 16x20/18x20 패턴 혹은 텐션 +1</li>
                <li>파워 선호: 폴리 스트링 + 텐션 -1~-2</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>다시 테스트</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#64748B] mb-4">
                스윙 속도나 컨디션이 달라졌다면 결과도 달라질 수 있어요.
              </p>
              <div className="flex gap-2">
                <Link href="/utility/racket-matchmaker/test">
                  <Button variant="outline" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    다시 테스트하기
                  </Button>
                </Link>
                <Button variant="outline" onClick={copyResultLink}>
                  <Share2 className="w-4 h-4 mr-2" />
                  결과 공유
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
