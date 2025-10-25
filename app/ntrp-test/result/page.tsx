import type { Metadata } from "next";
import NTRPResultClient from "./client";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { score?: string; q13?: string };
}): Promise<Metadata> {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const score = searchParams?.score || "";
  const q13 = searchParams?.q13 ? decodeURIComponent(searchParams.q13) : "";
  
  const level = (() => {
    const s = Number(score || 0);
    if (s <= 24) return "1.5";
    if (s <= 34) return "2.5";
    if (s <= 44) return "3.0";
    if (s <= 54) return "3.5";
    if (s <= 64) return "4.0";
    if (s <= 70) return "4.5";
    return "5.0+";
  })();

  const ogUrl = `${site}/api/og?level=${encodeURIComponent(level)}&character=${encodeURIComponent(
    q13 || "올라운더"
  )}${score ? `&score=${encodeURIComponent(score)}` : ""}`;

  const title = `NTRP ${level} · 내 테니스 레벨 진단`;
  const desc = `결과: NTRP ${level}${score ? ` (점수 ${score})` : ""}. 플레이 스타일: ${q13 || "올라운더"}.`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `NTRP ${level}` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogUrl],
    },
  };
}

export default function NTRPResultPage() {
  return <NTRPResultClient />;
}