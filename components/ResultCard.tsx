"use client";

import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResultCardProps } from "@/lib/types";

interface LegacyResultCardProps {
  level: string;
  title: string;
  slogan: string;
  color: string;
  score?: number;
  persona?: string;
}

const ResultCard = forwardRef<HTMLDivElement, LegacyResultCardProps>(
  ({ level, title, slogan, color, score, persona }, ref) => {
    return (
      <div ref={ref} className="w-full max-w-md mx-auto">
        <Card 
          className="relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            borderColor: color + "40"
          }}
        >
          <CardContent className="p-8 text-center">
            {/* 헤더 */}
            <div className="mb-6">
              <div 
                className="inline-block px-4 py-2 rounded-full text-white font-bold text-lg mb-3"
                style={{ backgroundColor: color }}
              >
                NTRP {level}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {title}
              </h2>
              <p className="text-lg text-gray-600 italic">
                "{slogan}"
              </p>
            </div>

            {/* 점수 정보 */}
            {score && (
              <div className="mb-6">
                <div className="text-3xl font-bold mb-1" style={{ color }}>
                  {score}점
                </div>
                <div className="text-sm text-gray-500">
                  테니스 실력 점수
                </div>
              </div>
            )}

            {/* 성향 정보 */}
            {persona && (
              <div className="mb-6">
                <Badge 
                  variant="secondary" 
                  className="text-sm px-3 py-1"
                  style={{ backgroundColor: color + "20", color }}
                >
                  {persona}
                </Badge>
              </div>
            )}

            {/* 푸터 */}
            <div className="text-center text-sm text-gray-500">
              <div className="mb-2">테니스프렌즈</div>
              <div>tennisfrends.vercel.app</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

ResultCard.displayName = "ResultCard";

export default ResultCard;
