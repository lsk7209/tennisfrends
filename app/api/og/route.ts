import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level") || "3.5";
  const character = searchParams.get("character") || "올라운더";
  const score = searchParams.get("score") || "";

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#22c55e,#16a34a)",
          color: "#fff",
          fontFamily: "Pretendard, Noto Sans KR, Arial, sans-serif",
        },
      },
      React.createElement("div", { style: { fontSize: 64, fontWeight: 800 } }, `NTRP ${level}`),
      score && React.createElement("div", { style: { fontSize: 28, opacity: 0.9 } }, `Score ${score}`),
      React.createElement("div", { style: { marginTop: 12, fontSize: 40 } }, character),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 28,
            padding: "10px 18px",
            borderRadius: 9999,
            border: "2px solid rgba(255,255,255,.6)",
            fontSize: 22,
            letterSpacing: 0.3,
          },
        },
        "테니스프렌즈 실력 테스트"
      ),
      React.createElement(
        "div",
        { style: { position: "absolute", bottom: 28, fontSize: 20, opacity: 0.8 } },
        "tennisfriends · ntrp test"
      )
    ),
    { width: 1200, height: 630 }
  );
}
