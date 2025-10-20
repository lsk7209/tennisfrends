"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home,
  Users,
  BarChart3,
  FileText,
  Settings,
  Shield,
  Activity,
  TrendingUp,
  Database,
  Globe,
  Mail,
  Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminTabs = [
  {
    id: "dashboard",
    label: "대시보드",
    href: "/admin",
    icon: Home,
    description: "전체 현황 및 요약"
  },
  {
    id: "users",
    label: "사용자 관리",
    href: "/admin/users",
    icon: Users,
    description: "NTRP 결과 및 사용자 데이터"
  },
  {
    id: "analytics",
    label: "분석 대시보드",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "상세 통계 및 트렌드"
  },
  {
    id: "content",
    label: "콘텐츠 관리",
    href: "/admin/content",
    icon: FileText,
    description: "블로그 및 유틸리티"
  },
  {
    id: "settings",
    label: "시스템 설정",
    href: "/admin/settings",
    icon: Settings,
    description: "환경 변수 및 설정"
  }
];

const quickStats = [
  {
    label: "총 사용자",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-blue-600"
  },
  {
    label: "테스트 완료",
    value: "5,678",
    change: "+8%",
    icon: Activity,
    color: "text-green-600"
  },
  {
    label: "평균 레벨",
    value: "3.2",
    change: "+0.1",
    icon: TrendingUp,
    color: "text-purple-600"
  },
  {
    label: "시스템 상태",
    value: "정상",
    change: "100%",
    icon: Shield,
    color: "text-green-600"
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getCurrentTab = () => {
    if (pathname === "/admin") return "dashboard";
    if (pathname.startsWith("/admin/users")) return "users";
    if (pathname.startsWith("/admin/analytics")) return "analytics";
    if (pathname.startsWith("/admin/content")) return "content";
    if (pathname.startsWith("/admin/settings")) return "settings";
    return "dashboard";
  };

  const currentTab = getCurrentTab();

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-[#0BA360] hover:text-[#19C37D] transition-colors">
                ← 사이트로 돌아가기
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#0BA360]" />
                  관리자 패널
                </h1>
                <p className="text-[#64748B] text-sm">테니스프렌즈 시스템 관리</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* 빠른 통계 */}
              <div className="hidden lg:flex items-center gap-4">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center gap-1 text-xs text-[#64748B]">
                      <stat.icon className="w-3 h-3" />
                      {stat.label}
                    </div>
                    <div className="font-semibold text-[#0F172A]">{stat.value}</div>
                    <div className={`text-xs ${stat.color}`}>{stat.change}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0BA360] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm text-[#64748B]">관리자</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* 사이드바 */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-[#E2E8F0] min-h-screen transition-all duration-300 sticky top-[73px] z-30`}>
          <div className="p-4">
            {/* 탭 메뉴 */}
            <nav className="space-y-2">
              {adminTabs.map((tab) => {
                const isActive = currentTab === tab.id;
                const Icon = tab.icon;
                
                return (
                  <Link key={tab.id} href={tab.href}>
                    <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#0BA360] text-white' 
                        : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                    }`}>
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{tab.label}</div>
                          <div className="text-xs opacity-75">{tab.description}</div>
                        </div>
                      )}
                      {isActive && !sidebarCollapsed && (
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                          활성
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* 사이드바 토글 버튼 */}
            <div className="mt-8 pt-4 border-t border-[#E2E8F0]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-full justify-start"
              >
                <div className="w-5 h-5 flex-shrink-0">
                  {sidebarCollapsed ? '→' : '←'}
                </div>
                {!sidebarCollapsed && <span className="ml-2">접기</span>}
              </Button>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1">
          {/* 탭 네비게이션 (모바일용) */}
          <div className="lg:hidden bg-white border-b border-[#E2E8F0] sticky top-[73px] z-20">
            <div className="px-4 py-2">
              <div className="flex overflow-x-auto gap-2">
                {adminTabs.map((tab) => {
                  const isActive = currentTab === tab.id;
                  const Icon = tab.icon;
                  
                  return (
                    <Link key={tab.id} href={tab.href}>
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        isActive 
                          ? 'bg-[#0BA360] text-white' 
                          : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0]'
                      }`}>
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 페이지 콘텐츠 */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
