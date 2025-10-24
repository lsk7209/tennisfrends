import { NextRequest, NextResponse } from "next/server";
import { parseCSV } from "@/lib/csv";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "파일이 제공되지 않았습니다." },
        { status: 400 }
      );
    }
    
    if (!file.name.endsWith(".csv")) {
      return NextResponse.json(
        { error: "CSV 파일만 업로드 가능합니다." },
        { status: 400 }
      );
    }
    
    const data = await parseCSV(file);
    
    // 데이터 검증
    const requiredFields = ["rank", "player_name", "country_code", "points"];
    const isValid = data.every(row => 
      requiredFields.every(field => row[field] !== undefined && row[field] !== "")
    );
    
    if (!isValid) {
      return NextResponse.json(
        { error: "CSV 파일 형식이 올바르지 않습니다. 필수 필드: rank, player_name, country_code, points" },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: data,
      count: data.length
    });
  } catch (error) {
    console.error("CSV 업로드 실패:", error);
    return NextResponse.json(
      { error: "CSV 파일 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
