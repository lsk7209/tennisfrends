import { NextRequest, NextResponse } from "next/server";
import atpData from "@/data/seed/atp_top50.json";
import wtaData from "@/data/seed/wta_top50.json";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tour = searchParams.get("tour") as "ATP" | "WTA" || "ATP";
    
    const data = tour === "WTA" ? wtaData : atpData;
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800'
      }
    });
  } catch (error) {
    console.error("시드 데이터 조회 실패:", error);
    return NextResponse.json(
      { error: "시드 데이터를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
}
