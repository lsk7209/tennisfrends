import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "테니스프렌즈 - 5분만에 내 실력/장비/훈련의 다음 행동을 알려주는 테니스 허브",
  description: "이미지 없이 텍스트·모션·이모지 기반으로 테니스 데이터를 자동 수집하고, 유틸리티로 유입을 만들고 주간 리포트로 재방문을 만드는 테니스 허브입니다.",
  keywords: ["테니스", "NTRP", "라켓 추천", "테니스 분석", "테니스 유틸리티"],
  openGraph: {
    title: "테니스프렌즈 - 테니스 실력 분석 및 장비 추천",
    description: "5분만에 내 실력/장비/훈련의 다음 3가지 행동을 알려주는 테니스 허브",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}