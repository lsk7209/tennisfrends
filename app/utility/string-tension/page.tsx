"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface TensionFormData {
  brandModel: string;
  headSize: string;
  pattern: string;
  stringType: string;
  gauge: string;
  playStyle: string;
  powerPref: string;
  armHealth: string;
  ntrp: string;
  temp: string;
  hoursPerWeek: string;
}

export default function StringTensionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TensionFormData>({
    brandModel: "",
    headSize: "",
    pattern: "",
    stringType: "",
    gauge: "",
    playStyle: "",
    powerPref: "",
    armHealth: "",
    ntrp: "",
    temp: "",
    hoursPerWeek: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field: keyof TensionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const params = encodeURIComponent(JSON.stringify(formData));
    router.push(`/utility/string-tension/result?params=${params}`);
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.brandModel && formData.headSize && formData.pattern;
      case 2:
        return formData.stringType && formData.gauge;
      case 3:
        return formData.playStyle && formData.powerPref && formData.armHealth;
      case 4:
        return formData.ntrp && formData.temp && formData.hoursPerWeek;
      default:
        return false;
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10">
      <div className="max-w-4xl mx-auto p-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            🎾 최적의 스트링 텐션 계산기
          </h1>
          <p className="text-lg text-[#64748B] mb-6">
            라켓과 플레이 성향에 맞는 텐션을 10초 만에 찾아보세요
          </p>
          
          {/* Progress */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm text-[#64748B] mb-2">
              <span>진행률</span>
              <span>{currentStep}/{totalSteps}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Form Steps */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === 1 && "라켓 정보"}
              {currentStep === 2 && "스트링 정보"}
              {currentStep === 3 && "플레이 스타일"}
              {currentStep === 4 && "환경 & 수준"}
            </CardTitle>
            <CardDescription className="text-center">
              {currentStep === 1 && "사용하시는 라켓의 기본 정보를 입력해주세요"}
              {currentStep === 2 && "사용하시는 스트링의 종류와 게이지를 선택해주세요"}
              {currentStep === 3 && "당신의 플레이 스타일과 선호도를 알려주세요"}
              {currentStep === 4 && "마지막으로 환경과 실력 수준을 입력해주세요"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Racket Info */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">브랜드 & 모델</label>
                  <Input
                    placeholder="예: Wilson Pro Staff, Babolat Pure Drive"
                    value={formData.brandModel}
                    onChange={(e) => handleInputChange("brandModel", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">헤드 사이즈</label>
                  <Select value={formData.headSize} onValueChange={(value) => handleInputChange("headSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="헤드 사이즈 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90–95 sq in">90–95 sq in</SelectItem>
                      <SelectItem value="96–99">96–99</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="101–104">101–104</SelectItem>
                      <SelectItem value="105+">105+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-[#0F172A]">스트링 패턴</label>
                  <Select value={formData.pattern} onValueChange={(value) => handleInputChange("pattern", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="스트링 패턴 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16x19">16x19</SelectItem>
                      <SelectItem value="18x20">18x20</SelectItem>
                      <SelectItem value="기타">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: String Info */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">스트링 타입</label>
                  <Select value={formData.stringType} onValueChange={(value) => handleInputChange("stringType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="스트링 타입 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="폴리">폴리</SelectItem>
                      <SelectItem value="멀티">멀티</SelectItem>
                      <SelectItem value="내추럴 거트">내추럴 거트</SelectItem>
                      <SelectItem value="하이브리드(메인 폴리)">하이브리드(메인 폴리)</SelectItem>
                      <SelectItem value="하이브리드(메인 멀티/거트)">하이브리드(메인 멀티/거트)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">게이지</label>
                  <Select value={formData.gauge} onValueChange={(value) => handleInputChange("gauge", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="게이지 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16 (1.30)">16 (1.30)</SelectItem>
                      <SelectItem value="16L (1.28)">16L (1.28)</SelectItem>
                      <SelectItem value="17 (1.25)">17 (1.25)</SelectItem>
                      <SelectItem value="17L (1.23)">17L (1.23)</SelectItem>
                      <SelectItem value="18 (1.20)">18 (1.20)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Play Style */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">플레이 스타일</label>
                  <Select value={formData.playStyle} onValueChange={(value) => handleInputChange("playStyle", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="플레이 스타일 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="공격형(플랫)">공격형(플랫)</SelectItem>
                      <SelectItem value="톱스핀">톱스핀</SelectItem>
                      <SelectItem value="컨트롤 지향">컨트롤 지향</SelectItem>
                      <SelectItem value="서브&발리">서브&발리</SelectItem>
                      <SelectItem value="올라운더">올라운더</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">파워 선호도</label>
                  <Select value={formData.powerPref} onValueChange={(value) => handleInputChange("powerPref", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="파워 선호도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="파워↑">파워↑</SelectItem>
                      <SelectItem value="중간">중간</SelectItem>
                      <SelectItem value="컨트롤↑">컨트롤↑</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-[#0F172A]">팔 상태</label>
                  <Select value={formData.armHealth} onValueChange={(value) => handleInputChange("armHealth", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="팔 상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="이상 없음">이상 없음</SelectItem>
                      <SelectItem value="팔 민감(엘보)">팔 민감(엘보)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 4: Environment & Level */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">NTRP 수준</label>
                  <Select value={formData.ntrp} onValueChange={(value) => handleInputChange("ntrp", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="NTRP 수준 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5~2.5">1.5~2.5</SelectItem>
                      <SelectItem value="3.0">3.0</SelectItem>
                      <SelectItem value="3.5">3.5</SelectItem>
                      <SelectItem value="4.0">4.0</SelectItem>
                      <SelectItem value="4.5">4.5</SelectItem>
                      <SelectItem value="5.0+">5.0+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">주변 온도</label>
                  <Select value={formData.temp} onValueChange={(value) => handleInputChange("temp", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="주변 온도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<10°C">&lt;10°C</SelectItem>
                      <SelectItem value="10~20°C">10~20°C</SelectItem>
                      <SelectItem value="20~30°C">20~30°C</SelectItem>
                      <SelectItem value=">30°C">&gt;30°C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-[#0F172A]">주당 플레이 시간</label>
                  <Select value={formData.hoursPerWeek} onValueChange={(value) => handleInputChange("hoursPerWeek", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="주당 플레이 시간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1~2h">1~2h</SelectItem>
                      <SelectItem value="3~4h">3~4h</SelectItem>
                      <SelectItem value="5h+">5h+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                이전
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepComplete(currentStep)}
                >
                  다음
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepComplete(currentStep)}
                  className="bg-[#0BA360] hover:bg-[#19C37D]"
                >
                  결과 보기
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
