"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const surveySchema = z.object({
  ntrp: z.enum(["2.5", "3.0", "3.5", "4.0", "4.5", "5.0+"]),
  style: z.enum(["attacker", "counter", "pusher", "serve-volley", "allround", "baseliner", "tactician"]),
  main_shot: z.enum(["fh", "bh", "serve", "volley", "mix"]),
  spin_level: z.enum(["1", "2", "3", "4", "5"]),
  power_pref: z.enum(["1", "2", "3", "4", "5"]),
  control_pref: z.enum(["1", "2", "3", "4", "5"]),
  arm_health: z.enum(["sensitive", "normal"]),
  swing_speed: z.enum(["slow", "medium", "fast"]),
  match_freq: z.enum(["low", "mid", "high"]),
  weight_feel: z.enum(["light", "mid", "heavy"])
});

const questions = [
  {
    id: "ntrp",
    question: "현재 NTRP 레벨은?",
    description: "테니스 실력 수준을 선택해주세요",
    options: [
      { value: "2.5", label: "2.5 - 기본 랠리 가능" },
      { value: "3.0", label: "3.0 - 중간 정도 안정적" },
      { value: "3.5", label: "3.5 - 방향 조절 가능" },
      { value: "4.0", label: "4.0 - 전술적 경기 운영" },
      { value: "4.5", label: "4.5 - 게임 주도력 우수" },
      { value: "5.0+", label: "5.0+ - 모든 기술 완성" }
    ]
  },
  {
    id: "style",
    question: "주요 플레이 스타일은?",
    description: "가장 많이 사용하는 플레이 방식을 선택해주세요",
    options: [
      { value: "attacker", label: "공격형 - 강한 스트로크로 압박" },
      { value: "counter", label: "수비형 - 안정적인 랠리" },
      { value: "pusher", label: "푸셔 - 꾸준한 공 넘기기" },
      { value: "serve-volley", label: "서브&발리 - 네트 플레이" },
      { value: "allround", label: "올라운더 - 다양한 샷 활용" },
      { value: "baseliner", label: "베이스라인 - 백코트 중심" },
      { value: "tactician", label: "전술형 - 상황별 전략" }
    ]
  },
  {
    id: "main_shot",
    question: "가장 자신 있는 샷은?",
    description: "주 무기로 사용하는 샷을 선택해주세요",
    options: [
      { value: "fh", label: "포핸드 스트로크" },
      { value: "bh", label: "백핸드 스트로크" },
      { value: "serve", label: "서브" },
      { value: "volley", label: "발리" },
      { value: "mix", label: "믹스 (상황별)" }
    ]
  },
  {
    id: "spin_level",
    question: "스핀 사용 빈도는?",
    description: "톱스핀을 얼마나 자주 사용하시나요?",
    options: [
      { value: "1", label: "1 - 거의 사용하지 않음" },
      { value: "2", label: "2 - 가끔 사용" },
      { value: "3", label: "3 - 보통 수준" },
      { value: "4", label: "4 - 자주 사용" },
      { value: "5", label: "5 - 거의 모든 샷에 사용" }
    ]
  },
  {
    id: "power_pref",
    question: "파워 선호도는?",
    description: "강한 파워를 얼마나 선호하시나요?",
    options: [
      { value: "1", label: "1 - 파워보다 안정성" },
      { value: "2", label: "2 - 약간의 파워" },
      { value: "3", label: "3 - 균형" },
      { value: "4", label: "4 - 파워 중시" },
      { value: "5", label: "5 - 최대 파워" }
    ]
  },
  {
    id: "control_pref",
    question: "컨트롤 선호도는?",
    description: "정확한 컨트롤을 얼마나 중시하시나요?",
    options: [
      { value: "1", label: "1 - 컨트롤보다 파워" },
      { value: "2", label: "2 - 약간의 컨트롤" },
      { value: "3", label: "3 - 균형" },
      { value: "4", label: "4 - 컨트롤 중시" },
      { value: "5", label: "5 - 최대 컨트롤" }
    ]
  },
  {
    id: "arm_health",
    question: "팔/관절 상태는?",
    description: "팔꿈치나 어깨 상태를 선택해주세요",
    options: [
      { value: "normal", label: "보통 - 특별한 문제 없음" },
      { value: "sensitive", label: "민감 - 가끔 통증이나 불편함" }
    ]
  },
  {
    id: "swing_speed",
    question: "스윙 속도는?",
    description: "일반적인 스윙 속도를 선택해주세요",
    options: [
      { value: "slow", label: "느림 - 여유로운 스윙" },
      { value: "medium", label: "중간 - 적당한 속도" },
      { value: "fast", label: "빠름 - 빠른 스윙" }
    ]
  },
  {
    id: "match_freq",
    question: "경기 빈도는?",
    description: "테니스 경기를 얼마나 자주 하시나요?",
    options: [
      { value: "low", label: "월 1회 이하" },
      { value: "mid", label: "주 1회" },
      { value: "high", label: "주 3회 이상" }
    ]
  },
  {
    id: "weight_feel",
    question: "선호하는 라켓 무게감은?",
    description: "어떤 무게감의 라켓을 선호하시나요?",
    options: [
      { value: "light", label: "가벼움 - 300g 이하" },
      { value: "mid", label: "중간 - 300-310g" },
      { value: "heavy", label: "무거움 - 310g 이상" }
    ]
  }
];

export default function RacketTestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof surveySchema>>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      ntrp: "3.0",
      style: "allround",
      main_shot: "fh",
      spin_level: "3",
      power_pref: "3",
      control_pref: "3",
      arm_health: "normal",
      swing_speed: "medium",
      match_freq: "mid",
      weight_feel: "mid"
    }
  });

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  function nextStep() {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function onSubmit(values: z.infer<typeof surveySchema>) {
    setIsSubmitting(true);
    try {
      // Convert string values to appropriate types
      const profile = {
        ntrp: parseFloat(values.ntrp),
        style: values.style,
        main_shot: values.main_shot,
        spin_level: parseInt(values.spin_level) as 1 | 2 | 3 | 4 | 5,
        power_pref: parseInt(values.power_pref) as 1 | 2 | 3 | 4 | 5,
        control_pref: parseInt(values.control_pref) as 1 | 2 | 3 | 4 | 5,
        arm_health: values.arm_health,
        swing_speed: values.swing_speed,
        match_freq: values.match_freq,
        weight_feel: values.weight_feel
      };

      const profileStr = encodeURIComponent(JSON.stringify(profile));
      router.push(`/racket-matchmaker/result?p=${profileStr}`);
    } catch (error) {
      console.error("설문 제출 오류:", error);
      alert("설문 제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <div className="max-w-4xl mx-auto p-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/racket-matchmaker">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">라켓 매칭 설문</h1>
            <p className="text-[#64748B]">10문항으로 당신에게 맞는 라켓을 찾아보세요</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#0F172A]">
              {currentStep + 1} / {questions.length}
            </span>
            <span className="text-sm text-[#64748B]">
              {Math.round(progress)}% 완료
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Question Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {currentQuestion.question}
                </CardTitle>
                <CardDescription>
                  {currentQuestion.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name={currentQuestion.id as keyof z.infer<typeof surveySchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-3">
                          {currentQuestion.options.map((option) => (
                            <div
                              key={option.value}
                              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                field.value === option.value
                                  ? "border-[#0BA360] bg-[#0BA360]/5"
                                  : "border-[#E2E8F0] hover:border-[#0BA360]/50"
                              }`}
                              onClick={() => field.onChange(option.value)}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 ${
                                  field.value === option.value
                                    ? "border-[#0BA360] bg-[#0BA360]"
                                    : "border-[#E2E8F0]"
                                }`}>
                                  {field.value === option.value && (
                                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                                  )}
                                </div>
                                <span className="text-sm font-medium">{option.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                이전
              </Button>

              {currentStep === questions.length - 1 ? (
                <Button
                  type="submit"
                  className="bg-[#0BA360] hover:bg-[#19C37D]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "분석 중..." : "결과 보기"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#0BA360] hover:bg-[#19C37D]"
                >
                  다음
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
