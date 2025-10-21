"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const [idx, setIdx] = useState(0);
  const [ans, setAns] = useState<number[]>(Array(questions.length).fill(0));
  const router = useRouter();

  const onChoose = (v: number) => {
    const nxt = [...ans];
    nxt[idx] = v;
    setAns(nxt);
    
    // 자동으로 다음 질문으로 넘어가기
    if (idx < questions.length - 1) {
      setTimeout(() => {
        setIdx(idx + 1);
      }, 500); // 0.5초 후 자동 진행
    } else {
      // 마지막 질문인 경우 결과 페이지로 이동
      setTimeout(() => {
        const total = nxt.reduce((a, b) => a + b, 0);
        router.push(`/test/result?score=${total}&total=${questions.length}`);
      }, 500);
    }
  };

  const progress = Math.round(((idx + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      
      <div className="max-w-2xl mx-auto p-6 pt-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#605A57]">진행률</span>
            <span className="text-sm text-[#605A57]">{idx + 1} / {questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <Card className="p-8">
          <h2 className="text-xl font-semibold mb-6 text-[#37322F]">
            {questions[idx].question}
          </h2>
          <div className="grid gap-3">
            {questions[idx].options.map((opt, i) => (
              <Button 
                key={i} 
                onClick={() => onChoose(i + 1)}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:bg-[#0BA360] hover:text-white hover:border-[#0BA360] transition-colors"
              >
                <span className="mr-3 w-6 h-6 bg-[#F7F5F3] text-[#37322F] rounded-full flex items-center justify-center text-sm font-medium">
                  {i + 1}
                </span>
                {opt}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
