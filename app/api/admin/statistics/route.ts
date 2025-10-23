import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // NTRP 테스트 통계
    const { data: ntrpResults, error: ntrpError } = await supabase
      .from('ntrp_results')
      .select('*');

    if (ntrpError) {
      console.error('NTRP 결과 조회 오류:', ntrpError);
    }

    // 테니스 성향 테스트 통계
    const { data: styleResults, error: styleError } = await supabase
      .from('tennis_style_results')
      .select('*');

    if (styleError) {
      console.error('테니스 성향 결과 조회 오류:', styleError);
    }

    // 규칙 퀴즈 통계
    const { data: quizResults, error: quizError } = await supabase
      .from('quiz_results')
      .select('*');

    if (quizError) {
      console.error('퀴즈 결과 조회 오류:', quizError);
    }

    // 부상 위험도 진단 통계
    const { data: injuryResults, error: injuryError } = await supabase
      .from('injury_risk_results')
      .select('*');

    if (injuryError) {
      console.error('부상 위험도 결과 조회 오류:', injuryError);
    }

    // 라켓 매칭 통계
    const { data: racketResults, error: racketError } = await supabase
      .from('racket_match_results')
      .select('*');

    if (racketError) {
      console.error('라켓 매칭 결과 조회 오류:', racketError);
    }

    // 통계 계산
    const statistics = {
      ntrp: {
        total: ntrpResults?.length || 0,
        averageLevel: ntrpResults?.length > 0 
          ? (ntrpResults.reduce((sum, result) => sum + (result.ntrp_level || 0), 0) / ntrpResults.length).toFixed(1)
          : 0,
        levelDistribution: ntrpResults?.reduce((acc, result) => {
          const level = result.ntrp_level || 0;
          const key = `${Math.floor(level)}.${Math.round((level % 1) * 2) * 0.5}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
        recentResults: ntrpResults?.slice(0, 10) || []
      },
      tennisStyle: {
        total: styleResults?.length || 0,
        styleDistribution: styleResults?.reduce((acc, result) => {
          const style = result.style_type || 'unknown';
          acc[style] = (acc[style] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
        recentResults: styleResults?.slice(0, 10) || []
      },
      quiz: {
        total: quizResults?.length || 0,
        averageScore: quizResults?.length > 0
          ? (quizResults.reduce((sum, result) => sum + (result.score || 0), 0) / quizResults.length).toFixed(1)
          : 0,
        scoreDistribution: quizResults?.reduce((acc, result) => {
          const score = result.score || 0;
          const key = `${score}점`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
        recentResults: quizResults?.slice(0, 10) || []
      },
      injuryRisk: {
        total: injuryResults?.length || 0,
        riskDistribution: injuryResults?.reduce((acc, result) => {
          const risk = result.risk_level || 'unknown';
          acc[risk] = (acc[risk] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {},
        recentResults: injuryResults?.slice(0, 10) || []
      },
      racketMatch: {
        total: racketResults?.length || 0,
        recentResults: racketResults?.slice(0, 10) || []
      },
      overall: {
        totalTests: (ntrpResults?.length || 0) + (styleResults?.length || 0) + 
                   (quizResults?.length || 0) + (injuryResults?.length || 0) + 
                   (racketResults?.length || 0),
        uniqueUsers: new Set([
          ...(ntrpResults?.map(r => r.user_id) || []),
          ...(styleResults?.map(r => r.user_id) || []),
          ...(quizResults?.map(r => r.user_id) || []),
          ...(injuryResults?.map(r => r.user_id) || []),
          ...(racketResults?.map(r => r.user_id) || [])
        ]).size
      }
    };

    return NextResponse.json({ statistics });
  } catch (error) {
    console.error('통계 조회 오류:', error);
    return NextResponse.json(
      { error: '통계를 가져오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
