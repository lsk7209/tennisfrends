import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { racket_id, profile_digest, timestamp } = body;

    if (!racket_id) {
      return NextResponse.json({ error: "racket_id is required" }, { status: 400 });
    }

    // If Supabase is configured, log the click
    if (supabase) {
      const { error } = await supabase
        .from("cta_clicks")
        .insert({
          racket_id,
          profile_digest: profile_digest || "",
          created_at: timestamp || new Date().toISOString()
        });

      if (error) {
        console.error("CTA 로깅 오류:", error);
        // Don't fail the request if logging fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CTA API 오류:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
