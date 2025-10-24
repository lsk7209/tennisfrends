import { NextRequest, NextResponse } from "next/server";
import { fetchRankings } from "@/lib/adapters/rankings";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tour = searchParams.get("tour") as "ATP" | "WTA" || "ATP";
    
    const rankings = await fetchRankings(tour);
    
    return NextResponse.json(rankings, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });
  } catch (error) {
    console.error("랭킹 데이터 조회 실패:", error);
    return NextResponse.json(
      { error: "랭킹 데이터를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}
