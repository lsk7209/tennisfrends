"use client";

import { forwardRef } from "react";

interface ResultCardProps {
  level: string;
  title: string;
  slogan: string;
  color: string;
  score: number;
  character: string;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  ({ level, title, slogan, color, score, character }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        style={{ backgroundColor: color + "10" }}
      >
        {/* Header */}
        <div className="p-6 text-center" style={{ backgroundColor: color + "20" }}>
          <div className="text-4xl font-bold mb-2" style={{ color }}>
            NTRP {level}
          </div>
          <div className="text-xl font-semibold text-gray-800 mb-1">{title}</div>
          <div className="text-sm text-gray-600 mb-3">{character}</div>
          <div className="text-lg font-medium" style={{ color }}>
            {slogan}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-800">점수: {score}점</div>
            <div className="text-sm text-gray-600 mt-1">15문항 종합 평가</div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>초급</span>
              <span>고급</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-1000"
                style={{
                  backgroundColor: color,
                  width: `${Math.min(100, (score / 75) * 100)}%`
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            테니스프렌즈 NTRP 테스트
          </div>
        </div>
      </div>
    );
  }
);

ResultCard.displayName = "ResultCard";

export default ResultCard;