"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface Answer {
  id: number;
  score: number;
  cat: string;
  selected: number;
}

interface RiskLevel {
  level: string;
  color: string;
  desc: string;
}

interface Trigger {
  tag: string;
  tip: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export default function InjuryRiskResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>({ level: "Low", color: "emerald", desc: "" });
  const [totalScore, setTotalScore] = useState(0);
  const [areaScores, setAreaScores] = useState<Record<string, number>>({});
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = searchParams.get('answers');
    if (params) {
      try {
        const parsedAnswers: Answer[] = JSON.parse(decodeURIComponent(params));
        setAnswers(parsedAnswers);
        calculateResults(parsedAnswers);
      } catch (error) {
        console.error('Failed to parse answers:', error);
        router.push('/injury-risk');
      }
    } else {
      router.push('/injury-risk');
    }
  }, [searchParams, router]);

  const calculateResults = (answers: Answer[]) => {
    // 총점 계산
    const total = answers.reduce((sum, answer) => sum + answer.score, 0);
    setTotalScore(total);

    // 위험도 등급 계산
    const level = getRiskLevel(total);
    setRiskLevel(level);

    // 부위별 점수 계산
    const areas = ["팔", "어깨", "허리", "고관절", "무릎", "종아리", "발목"];
    const areaScores: Record<string, number> = {};
    
    areas.forEach(area => {
      areaScores[area] = 0;
    });

    answers.forEach(answer => {
      // 각 답변의 영향을 받는 부위들에 점수 추가
      const affectedAreas = getAffectedAreas(answer.id);
      affectedAreas.forEach(area => {
        if (areaScores[area] !== undefined) {
          areaScores[area] += Math.max(0, answer.score);
        }
      });
    });

    // 0-100 스케일로 정규화
    Object.keys(areaScores).forEach(area => {
      areaScores[area] = Math.min(100, Math.max(0, (areaScores[area] / 3) * 20));
    });

    setAreaScores(areaScores);

    // 트리거 경고 계산
    const triggerWarnings = calculateTriggers(answers);
    setTriggers(triggerWarnings);

    // 체크리스트 생성
    const checklistItems = generateChecklist(answers);
    setChecklist(checklistItems);

    setLoading(false);
  };

  const getRiskLevel = (total: number): RiskLevel => {
    if (total <= 35) {
      return {
        level: "Low",
        color: "emerald",
        desc: "안정적입니다. 현재 루틴을 유지하며 점진적으로 강도를 올려보세요."
      };
    } else if (total <= 55) {
      return {
        level: "Medium",
        color: "amber",
        desc: "부상 위험이 증가 중. 체크리스트를 따라 2주간 보정하세요."
      };
    } else {
      return {
        level: "High",
        color: "rose",
        desc: "고위험 상태. 훈련 강도 조절 및 장비/회복 루틴 개선이 필요합니다."
      };
    }
  };

  const getAffectedAreas = (questionId: number): string[] => {
    const areaMap: Record<number, string[]> = {
      1: ["어깨", "무릎", "허리"],
      2: ["팔", "어깨", "무릎"],
      3: ["팔", "어깨", "허리"],
      4: ["전체"],
      5: ["전체"],
      6: ["회복"],
      7: ["팔", "어깨"],
      8: ["팔", "어깨", "허리"],
      9: ["무릎", "발목", "종아리"],
      10: ["무릎", "발목"],
      11: ["팔"],
      12: ["무릎"],
      13: ["기초체력", "기술"],
      14: ["전체"],
      15: ["전체"]
    };
    return areaMap[questionId] || [];
  };

  const calculateTriggers = (answers: Answer[]): Trigger[] => {
    const triggers: Trigger[] = [];
    const answerMap = Object.fromEntries(answers.map(a => [a.id, a]));

    // 팔꿈치(엘보) 고위험 체크
    const elbowHigh = (answerMap[11]?.score >= 3) && 
                     (answerMap[7]?.score >= 2) && 
                     (answerMap[3]?.score >= 4);
    if (elbowHigh) {
      triggers.push({
        tag: "엘보 고위험",
        tip: "텐션 -2~-3 lbs, 멀티/하이브리드 고려. 서브·포핸드 볼륨 20% 감량(2주)."
      });
    }

    // 무릎 고위험 체크
    const kneeHigh = (answerMap[9]?.score >= 3) && 
                     (answerMap[10]?.score >= 4) && 
                     (answerMap[12]?.score >= 3);
    if (kneeHigh) {
      triggers.push({
        tag: "무릎 고위험",
        tip: "코트/신발 쿠셔닝 강화, 방향전환 드릴 대신 저충격 풋워크 2주."
      });
    }

    // 회복 부족 체크
    const recoveryLow = (answerMap[6]?.score >= 2) && 
                        ((answerMap[4]?.score >= 2) || (answerMap[5]?.score >= 2)) && 
                        (answerMap[15]?.score >= 2);
    if (recoveryLow) {
      triggers.push({
        tag: "회복 부족",
        tip: "수면 7h+, 동적 8~10분/정적 5~8분 루틴 고정, 주1~2회 OFF."
      });
    }

    return triggers;
  };

  const generateChecklist = (answers: Answer[]): ChecklistItem[] => {
    const checklist: ChecklistItem[] = [];
    const answerMap = Object.fromEntries(answers.map(a => [a.id, a]));

    // 워밍업 점수 높음
    if (answerMap[4]?.score >= 2) {
      checklist.push({
        id: "warmup",
        text: "경기 전 8~10분 동적 스트레칭(러닝·레그스윙·암서클)",
        checked: false
      });
    }

    // 쿨다운 점수 높음
    if (answerMap[5]?.score >= 2) {
      checklist.push({
        id: "cooldown",
        text: "종아리·햄스트링·둔근 정적 스트레칭 5~8분",
        checked: false
      });
    }

    // 수면 점수 높음
    if (answerMap[6]?.score >= 2) {
      checklist.push({
        id: "sleep",
        text: "취침 루틴 고정(스마트폰 오프, 23:30 lights out)",
        checked: false
      });
    }

    // 스트링 점수 높음
    if (answerMap[7]?.score >= 2) {
      checklist.push({
        id: "string",
        text: "텐션 -2 lbs / 멀티 or 하이브리드 전환 테스트",
        checked: false
      });
    }

    // 코트표면/급정지 높음
    if (answerMap[9]?.score >= 3 || answerMap[10]?.score >= 4) {
      checklist.push({
        id: "footwork",
        text: "풋워크 드릴→저충격 변형, 방향전환 강도 20% 감량",
        checked: false
      });
    }

    return checklist;
  };

  const handleChecklistChange = (id: string, checked: boolean) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked } : item
    ));
  };

  const generateShareImage = () => {
    // Canvas를 사용한 공유 이미지 생성 로직
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // 배경 그라디언트
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, '#0BA360');
    gradient.addColorStop(1, '#2364AA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // 텍스트 추가
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Pretendard';
    ctx.fillText('🏥 테니스 부상 위험도 체크', 100, 150);
    
    ctx.font = 'bold 36px Pretendard';
    ctx.fillText(`위험도: ${riskLevel.level}`, 100, 250);
    ctx.fillText(`총점: ${totalScore}점`, 100, 320);
    
    ctx.font = '24px Pretendard';
    ctx.fillText(riskLevel.desc, 100, 400);
    
    if (triggers.length > 0) {
      ctx.fillText('⚠️ 주의사항:', 100, 500);
      triggers.slice(0, 2).forEach((trigger, index) => {
        ctx.fillText(`• ${trigger.tag}: ${trigger.tip}`, 100, 550 + index * 50);
      });
    }
    
    ctx.font = '20px Pretendard';
    ctx.fillText('Tennis Utils | tennisutils.kr', 100, 1000);

    // 이미지 다운로드
    const link = document.createElement('a');
    link.download = 'tennis-injury-risk-result.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">🏥</div>
          <div className="text-[#64748B]">결과를 분석하고 있습니다...</div>
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
            🏥 부상 위험도 진단 결과
          </h1>
        </div>

        {/* Risk Level Card */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Badge 
                className={`text-white px-6 py-2 text-lg ${
                  riskLevel.color === 'emerald' ? 'bg-emerald-500' :
                  riskLevel.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                }`}
              >
                위험도: {riskLevel.level}
              </Badge>
            </div>
            <CardTitle className="text-2xl mb-2">
              총점: {totalScore}점
            </CardTitle>
            <CardDescription className="text-lg">
              {riskLevel.desc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-[#64748B] mb-2">
                <span>위험도</span>
                <span>{totalScore}/75</span>
              </div>
              <Progress 
                value={(totalScore / 75) * 100} 
                className="h-3"
              />
            </div>
          </CardContent>
        </Card>

        {/* Area Scores Radar */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>부위별 위험도</CardTitle>
            <CardDescription>
              각 부위별 위험 점수 (높을수록 위험)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(areaScores).map(([area, score]) => (
                <div key={area} className="text-center">
                  <div className="text-sm text-[#64748B] mb-2">{area}</div>
                  <div className="text-2xl font-bold mb-2">{Math.round(score)}</div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Triggers */}
        {triggers.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">⚠️ 주의사항</h3>
            <div className="space-y-4">
              {triggers.map((trigger, index) => (
                <Alert key={index} className="border-amber-500 bg-amber-50">
                  <AlertDescription>
                    <div className="font-semibold text-amber-800 mb-2">{trigger.tag}</div>
                    <div className="text-amber-700">{trigger.tip}</div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Checklist */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>즉시 수정 체크리스트</CardTitle>
            <CardDescription>
              개인화된 개선 사항들을 체크해보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={(checked) => handleChecklistChange(item.id, checked as boolean)}
                  />
                  <label 
                    htmlFor={item.id}
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    {item.text}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>추천 도구</CardTitle>
            <CardDescription>
              부상 예방을 위한 추가 도구들을 활용해보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/string-tension">
                <Button variant="outline" className="w-full h-auto p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎾</div>
                    <div className="font-semibold">스트링 텐션 계산기</div>
                    <div className="text-sm text-[#64748B]">팔에 부담 적은 텐션 찾기</div>
                  </div>
                </Button>
              </Link>
              <Link href="/utility/ntrp-analyzer">
                <Button variant="outline" className="w-full h-auto p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-semibold">NTRP 실력 테스트</div>
                    <div className="text-sm text-[#64748B]">실력에 맞는 훈련 강도</div>
                  </div>
                </Button>
              </Link>
              <Link href="/utility">
                <Button variant="outline" className="w-full h-auto p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏃‍♂️</div>
                    <div className="font-semibold">드릴 라이브러리</div>
                    <div className="text-sm text-[#64748B]">저충격 훈련 방법</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={generateShareImage}
            className="bg-[#0BA360] hover:bg-[#19C37D] text-white"
          >
            📸 결과 이미지 저장
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/injury-risk/intro')}
          >
            🔄 다시 체크하기
          </Button>
        </div>
      </div>
    </div>
  );
}
