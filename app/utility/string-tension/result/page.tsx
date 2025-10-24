"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

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

interface TensionResult {
  mainTension: number;
  crossTension: number;
  recommendation: string;
  explanation: string;
  tips: string[];
  alternatives: string[];
}

export default function StringTensionResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState<TensionFormData | null>(null);
  const [result, setResult] = useState<TensionResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = searchParams.get('params');
    if (params) {
      try {
        const decoded = JSON.parse(decodeURIComponent(params));
        setFormData(decoded);
        calculateTension(decoded);
      } catch (error) {
        console.error('Error parsing params:', error);
        router.push('/utility/string-tension');
      }
    } else {
      router.push('/utility/string-tension');
    }
  }, [searchParams, router]);

  const calculateTension = (data: TensionFormData) => {
    // 기본 텐션 계산 로직
    let baseTension = 50; // 기본값
    
    // NTRP 수준에 따른 조정
    const ntrpAdjustments = {
      "1.5~2.5": -5,
      "3.0": -2,
      "3.5": 0,
      "4.0": 2,
      "4.5": 4,
      "5.0+": 6
    };
    baseTension += ntrpAdjustments[data.ntrp as keyof typeof ntrpAdjustments] || 0;

    // 플레이 스타일에 따른 조정
    const styleAdjustments = {
      "공격형(플랫)": 3,
      "톱스핀": -2,
      "컨트롤 지향": 4,
      "서브&발리": 1,
      "올라운더": 0
    };
    baseTension += styleAdjustments[data.playStyle as keyof typeof styleAdjustments] || 0;

    // 파워 선호도에 따른 조정
    const powerAdjustments = {
      "파워↑": -3,
      "중간": 0,
      "컨트롤↑": 3
    };
    baseTension += powerAdjustments[data.powerPref as keyof typeof powerAdjustments] || 0;

    // 팔 상태에 따른 조정
    if (data.armHealth === "팔 민감(엘보)") {
      baseTension -= 5;
    }

    // 온도에 따른 조정
    const tempAdjustments = {
      "<10°C": 2,
      "10~20°C": 0,
      "20~30°C": -1,
      ">30°C": -2
    };
    baseTension += tempAdjustments[data.temp as keyof typeof tempAdjustments] || 0;

    // 헤드 사이즈에 따른 조정
    if (data.headSize === "90–95 sq in") baseTension += 2;
    else if (data.headSize === "105+") baseTension -= 2;

    // 스트링 타입에 따른 조정
    const stringAdjustments = {
      "폴리": 0,
      "멀티": -2,
      "내추럴 거트": -3,
      "하이브리드(메인 폴리)": 1,
      "하이브리드(메인 멀티/거트)": -1
    };
    baseTension += stringAdjustments[data.stringType as keyof typeof stringAdjustments] || 0;

    // 최종 텐션 범위 설정
    const mainTension = Math.max(35, Math.min(65, Math.round(baseTension)));
    const crossTension = mainTension - 2; // 크로스는 메인보다 2lbs 낮게

    // 추천사항 생성
    const recommendation = generateRecommendation(data, mainTension);
    const explanation = generateExplanation(data, mainTension);
    const tips = generateTips(data);
    const alternatives = generateAlternatives(data, mainTension);

    setResult({
      mainTension,
      crossTension,
      recommendation,
      explanation,
      tips,
      alternatives
    });
    setLoading(false);
  };

  const generateRecommendation = (data: TensionFormData, tension: number): string => {
    if (tension <= 45) return "낮은 텐션으로 부드러운 느낌과 파워를 제공합니다.";
    if (tension <= 50) return "중간 텐션으로 균형잡힌 컨트롤과 파워를 제공합니다.";
    if (tension <= 55) return "높은 텐션으로 정확한 컨트롤과 스핀을 제공합니다.";
    return "매우 높은 텐션으로 최고의 컨트롤을 제공합니다.";
  };

  const generateExplanation = (data: TensionFormData, tension: number): string => {
    let explanation = `당신의 ${data.brandModel} 라켓에 ${data.stringType} 스트링을 사용하여 `;
    explanation += `${tension}lbs의 텐션을 추천합니다. `;
    
    if (data.playStyle === "공격형(플랫)") {
      explanation += "공격적인 플레이에 적합한 높은 텐션으로 정확한 컨트롤을 제공합니다.";
    } else if (data.playStyle === "톱스핀") {
      explanation += "톱스핀 플레이에 적합한 중간 텐션으로 스핀과 컨트롤의 균형을 제공합니다.";
    } else if (data.playStyle === "컨트롤 지향") {
      explanation += "컨트롤 지향 플레이에 적합한 높은 텐션으로 정확성을 제공합니다.";
    } else {
      explanation += "올라운더 플레이에 적합한 균형잡힌 텐션을 제공합니다.";
    }
    
    return explanation;
  };

  const generateTips = (data: TensionFormData): string[] => {
    const tips = [];
    
    if (data.armHealth === "팔 민감(엘보)") {
      tips.push("팔 건강을 위해 낮은 텐션과 부드러운 스트링을 사용하세요.");
    }
    
    if (data.temp === "<10°C" || data.temp === ">30°C") {
      tips.push("극한 온도에서는 텐션 변화를 고려하여 조정하세요.");
    }
    
    if (data.hoursPerWeek === "5h+") {
      tips.push("높은 사용량으로 인한 텐션 손실을 고려하여 정기적인 점검이 필요합니다.");
    }
    
    tips.push("텐션은 개인 취향이므로 실제 사용해보고 조정하세요.");
    tips.push("스트링은 사용 후 10-15시간마다 교체하는 것을 권장합니다.");
    
    return tips;
  };

  const generateAlternatives = (data: TensionFormData, tension: number): string[] => {
    const alternatives = [];
    
    if (tension > 50) {
      alternatives.push(`${tension - 2}lbs: 더 부드러운 느낌을 원한다면`);
      alternatives.push(`${tension - 4}lbs: 팔 건강을 고려한다면`);
    } else {
      alternatives.push(`${tension + 2}lbs: 더 정확한 컨트롤을 원한다면`);
      alternatives.push(`${tension + 4}lbs: 공격적인 플레이를 원한다면`);
    }
    
    return alternatives;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0BA360] mx-auto mb-4"></div>
          <p className="text-lg text-[#64748B]">텐션을 계산하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!formData || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-4">오류가 발생했습니다</h1>
          <Button onClick={() => router.push('/utility/string-tension')} className="bg-[#0BA360] hover:bg-[#19C37D]">
            다시 시작하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10">
      <div className="max-w-4xl mx-auto p-6 pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            🎾 최적의 스트링 텐션 결과
          </h1>
          <p className="text-lg text-[#64748B] mb-6">
            당신의 라켓과 플레이 스타일에 맞는 텐션을 찾았습니다
          </p>
        </div>

        {/* Main Result Card */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-[#0F172A]">
              추천 텐션
            </CardTitle>
            <CardDescription>
              {formData.brandModel} + {formData.stringType}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Main Tension */}
              <div className="text-center">
                <div className="text-6xl font-bold text-[#0BA360] mb-2">
                  {result.mainTension}
                </div>
                <div className="text-lg text-[#64748B] mb-4">메인 텐션 (lbs)</div>
                <Badge variant="outline" className="text-sm">
                  {result.recommendation}
                </Badge>
              </div>

              {/* Cross Tension */}
              <div className="text-center">
                <div className="text-6xl font-bold text-[#2364AA] mb-2">
                  {result.crossTension}
                </div>
                <div className="text-lg text-[#64748B] mb-4">크로스 텐션 (lbs)</div>
                <Badge variant="outline" className="text-sm">
                  크로스는 메인보다 2lbs 낮게
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Explanation */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">추천 이유</h3>
              <p className="text-[#64748B] leading-relaxed">
                {result.explanation}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tips and Alternatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Tips */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-[#0F172A]">💡 텐션 팁</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-[#64748B] flex items-start">
                    <span className="text-[#0BA360] mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Alternatives */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-[#0F172A]">🔄 대안 텐션</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.alternatives.map((alt, index) => (
                  <li key={index} className="text-sm text-[#64748B] flex items-start">
                    <span className="text-[#2364AA] mr-2">•</span>
                    {alt}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigator.clipboard.writeText(`${result.mainTension}/${result.crossTension}lbs`)}
            className="bg-[#0BA360] hover:bg-[#19C37D]"
          >
            📋 텐션 복사하기
          </Button>
          <Button
            onClick={() => router.push('/utility/string-tension')}
            variant="outline"
          >
            🔄 다시 계산하기
          </Button>
          <Button
            onClick={() => router.push('/utility')}
            variant="outline"
          >
            🛠️ 다른 도구 보기
          </Button>
        </div>
      </div>
    </div>
  );
}
