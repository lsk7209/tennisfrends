"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InjuryRiskPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/utility/injury-risk/intro');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0BA360]/10 via-white to-[#2364AA]/10 flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl mb-4">🏥</div>
        <div className="text-[#64748B]">부상 위험도 체크로 이동 중...</div>
      </div>
    </div>
  );
}
