"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/lib/supabaseClient";
import { getDeviceId } from "@/lib/device";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const matchSchema = z.object({
  played_at: z.string().min(1, "경기 날짜를 선택해주세요"),
  location: z.string().optional(),
  court_surface: z.enum(["hard", "clay", "grass", "carpet", "other"]).default("hard"),
  indoor: z.boolean().default(false),
  opponent_name: z.string().optional(),
  opponent_level: z.enum(["beginner", "intermediate", "advanced", "pro", "unknown"]).default("unknown"),
  format: z.enum(["singles", "doubles"]).default("singles"),
  result: z.enum(["win", "loss", "retired", "walkover"]),
  scoreline: z.string().optional(),
  total_games_for: z.number().min(0).default(0),
  total_games_against: z.number().min(0).default(0),
  winners: z.number().min(0).default(0),
  unforced_errors: z.number().min(0).default(0),
  double_faults: z.number().min(0).default(0),
  aces: z.number().min(0).default(0),
  first_serve_in: z.number().min(0).default(0),
  first_serve_total: z.number().min(0).default(0),
  first_serve_points_won: z.number().min(0).default(0),
  second_serve_points_won: z.number().min(0).default(0),
  return_points_won: z.number().min(0).default(0),
  break_points_won: z.number().min(0).default(0),
  break_points_total: z.number().min(0).default(0),
  avg_rally_length: z.number().min(0).default(0),
  max_rally_length: z.number().min(0).default(0),
  notes: z.string().optional()
});

export default function NewMatchPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof matchSchema>>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      played_at: new Date().toISOString().split('T')[0],
      court_surface: "hard",
      indoor: false,
      opponent_level: "unknown",
      format: "singles",
      total_games_for: 0,
      total_games_against: 0,
      winners: 0,
      unforced_errors: 0,
      double_faults: 0,
      aces: 0,
      first_serve_in: 0,
      first_serve_total: 0,
      first_serve_points_won: 0,
      second_serve_points_won: 0,
      return_points_won: 0,
      break_points_won: 0,
      break_points_total: 0,
      avg_rally_length: 0,
      max_rally_length: 0
    }
  });

  async function onSubmit(values: z.infer<typeof matchSchema>) {
    setIsSubmitting(true);
    try {
      const deviceId = getDeviceId();
      const matchData = {
        ...values,
        id: crypto.randomUUID(),
        device_id: deviceId,
        played_at: new Date(values.played_at).toISOString(),
        created_at: new Date().toISOString()
      };

      if (supabase) {
        const { data, error } = await supabase
          .from("matches")
          .insert([matchData])
          .select()
          .single();
        
        if (error) throw error;
        router.push(`/match-analyzer/matches/${data.id}`);
      } else {
        // Local storage fallback
        const existingMatches = JSON.parse(localStorage.getItem("matches") || "[]");
        const updatedMatches = [matchData, ...existingMatches];
        localStorage.setItem("matches", JSON.stringify(updatedMatches));
        router.push(`/match-analyzer/matches/${matchData.id}`);
      }
    } catch (error) {
      console.error("경기 기록 저장 오류:", error);
      alert("경기 기록 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/match-analyzer/matches">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">새 경기 기록</h1>
            <p className="text-[#64748B]">경기 데이터를 입력하여 분석해보세요</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>경기의 기본적인 정보를 입력해주세요</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="played_at"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>경기 날짜 *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>장소</FormLabel>
                      <FormControl>
                        <Input placeholder="예: 서울 테니스장" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="court_surface"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>코트 면</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hard">하드</SelectItem>
                          <SelectItem value="clay">클레이</SelectItem>
                          <SelectItem value="grass">그래스</SelectItem>
                          <SelectItem value="carpet">카펫</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="indoor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>실내/실외</FormLabel>
                      <Select onValueChange={(value) => field.onChange(value === "true")} defaultValue={field.value ? "true" : "false"}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="false">실외</SelectItem>
                          <SelectItem value="true">실내</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Opponent Info */}
            <Card>
              <CardHeader>
                <CardTitle>상대 정보</CardTitle>
                <CardDescription>상대방과 경기 형식에 대한 정보</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="opponent_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상대 이름</FormLabel>
                      <FormControl>
                        <Input placeholder="상대방 이름 (선택사항)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="opponent_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상대 레벨</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">초급</SelectItem>
                          <SelectItem value="intermediate">중급</SelectItem>
                          <SelectItem value="advanced">고급</SelectItem>
                          <SelectItem value="pro">프로</SelectItem>
                          <SelectItem value="unknown">미상</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>경기 형식</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="singles">단식</SelectItem>
                          <SelectItem value="doubles">복식</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>경기 결과 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="win">승리</SelectItem>
                          <SelectItem value="loss">패배</SelectItem>
                          <SelectItem value="retired">기권</SelectItem>
                          <SelectItem value="walkover">불참</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Score Info */}
            <Card>
              <CardHeader>
                <CardTitle>스코어 정보</CardTitle>
                <CardDescription>경기 스코어와 게임 수</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="scoreline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>스코어라인</FormLabel>
                      <FormControl>
                        <Input placeholder="예: 6-4 3-6 10-8" {...field} />
                      </FormControl>
                      <FormDescription>세트별 스코어를 입력해주세요</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_games_for"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>내가 이긴 게임 수</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_games_against"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상대가 이긴 게임 수</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle>성과 통계</CardTitle>
                <CardDescription>경기 중의 주요 통계 (선택사항)</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="winners"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>위너</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unforced_errors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>자발적 실수</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aces"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>에이스</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="double_faults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>더블 폴트</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="first_serve_in"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1서브 인</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="first_serve_total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1서브 총 시도</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>메모</CardTitle>
                <CardDescription>경기에 대한 추가적인 메모나 코멘트</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="경기에 대한 메모를 입력해주세요..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Link href="/match-analyzer/matches">
                <Button variant="outline" type="button">
                  취소
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="bg-[#0BA360] hover:bg-[#19C37D]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "저장 중..." : "경기 기록 저장"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
