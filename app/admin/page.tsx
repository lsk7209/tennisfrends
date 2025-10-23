"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  Database, 
  TrendingUp,
  Activity,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Loader2
} from "lucide-react";

interface Statistics {
  ntrp: {
    total: number;
    averageLevel: string;
    levelDistribution: Record<string, number>;
  };
  tennisStyle: {
    total: number;
    styleDistribution: Record<string, number>;
  };
  quiz: {
    total: number;
    averageScore: string;
    scoreDistribution: Record<string, number>;
  };
  injuryRisk: {
    total: number;
    riskDistribution: Record<string, number>;
  };
  racketMatch: {
    total: number;
  };
  overall: {
    totalTests: number;
    uniqueUsers: number;
  };
}

export default function AdminDashboard() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/api/admin/statistics');
        if (response.ok) {
          const data = await response.json();
          setStatistics(data.statistics);
        } else {
          console.error('통계 데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('통계 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const stats = statistics ? [
    {
      title: "총 사용자 수",
      value: statistics.overall.uniqueUsers.toLocaleString(),
      change: "실시간",
      changeType: "positive" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "총 테스트 완료",
      value: statistics.overall.totalTests.toLocaleString(),
      change: "실시간",
      changeType: "positive" as const,
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "평균 NTRP 레벨",
      value: statistics.ntrp.averageLevel,
      change: `${statistics.ntrp.total}명`,
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "규칙 퀴즈 평균",
      value: `${statistics.quiz.averageScore}점`,
      change: `${statistics.quiz.total}회`,
      changeType: "positive" as const,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ] : [];

  const quickActions = [
    {
      title: "사용자 관리",
      description: "NTRP 결과 조회, 사용자 통계 관리",
      href: "/admin/users",
      icon: Users,
      color: "bg-blue-500",
      stats: "1,234명",
    },
    {
      title: "분석 대시보드",
      description: "상세 통계, 차트, 트렌드 분석",
      href: "/admin/analytics",
      icon: BarChart3,
      color: "bg-green-500",
      stats: "5,678건",
    },
    {
      title: "콘텐츠 관리",
      description: "블로그 포스트, 유틸리티 관리",
      href: "/admin/content",
      icon: FileText,
      color: "bg-purple-500",
      stats: "12개",
    },
    {
      title: "시스템 설정",
      description: "환경 변수, 데이터베이스 설정",
      href: "/admin/settings",
      icon: Settings,
      color: "bg-orange-500",
      stats: "정상",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "test_completed",
      message: "새로운 NTRP 테스트 완료 (레벨: 4.0)",
      time: "2분 전",
      user: "익명 사용자",
      icon: Activity,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "blog_view",
      message: "블로그 포스트 'NTRP 가이드' 조회",
      time: "5분 전",
      user: "익명 사용자",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "test_completed",
      message: "새로운 NTRP 테스트 완료 (레벨: 3.5)",
      time: "8분 전",
      user: "익명 사용자",
      icon: Activity,
      color: "text-green-600",
    },
    {
      id: 4,
      type: "system",
      message: "시스템 백업 완료",
      time: "1시간 전",
      user: "시스템",
      icon: Database,
      color: "text-purple-600",
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "데이터베이스 연결이 불안정합니다",
      time: "10분 전",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      id: 2,
      type: "info",
      message: "새로운 사용자 등록이 증가하고 있습니다",
      time: "30분 전",
      icon: CheckCircle,
      color: "text-blue-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#0BA360] mx-auto mb-4" />
          <p className="text-[#64748B]">관리자 대시보드를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-[#64748B]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0F172A]">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change} 지난 주 대비
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 빠른 작업 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>빠른 작업</CardTitle>
              <CardDescription>
                자주 사용하는 관리 기능에 빠르게 접근하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                            <action.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#0F172A]">{action.title}</h3>
                            <p className="text-sm text-[#64748B]">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 최근 활동 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
              <CardDescription>
                시스템에서 발생한 최근 활동을 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#0BA360] rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#0F172A]">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#64748B]">{activity.user}</span>
                        <span className="text-xs text-[#64748B]">•</span>
                        <span className="text-xs text-[#64748B]">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 시스템 상태 */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>시스템 상태</CardTitle>
            <CardDescription>
              현재 시스템의 상태를 모니터링하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-[#0F172A]">데이터베이스</p>
                  <p className="text-sm text-[#64748B]">정상 작동</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-[#0F172A]">API 서버</p>
                  <p className="text-sm text-[#64748B]">정상 작동</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-[#0F172A]">스토리지</p>
                  <p className="text-sm text-[#64748B]">75% 사용</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}