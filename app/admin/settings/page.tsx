"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Settings,
  Database,
  Globe,
  Shield,
  Mail,
  Bell,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import Link from "next/link";

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    // 데이터베이스 설정
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    
    // 사이트 설정
    siteName: "테니스프렌즈",
    siteDescription: "테니스 실력 분석 및 커뮤니티 플랫폼",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    
    // 보안 설정
    adminPassword: "",
    sessionTimeout: "24",
    maxLoginAttempts: "5",
    
    // 이메일 설정
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    
    // 알림 설정
    emailNotifications: true,
    systemAlerts: true,
    userReports: true,
    
    // 성능 설정
    cacheTimeout: "3600",
    maxFileSize: "10",
    compressionEnabled: true,
  });

  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      // 실제로는 API 호출로 설정을 저장
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      alert("설정이 저장되었습니다.");
    } catch (error) {
      alert("설정 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("모든 설정을 기본값으로 초기화하시겠습니까?")) {
      // 기본값으로 리셋
      setSettings({
        ...settings,
        siteName: "테니스프렌즈",
        siteDescription: "테니스 실력 분석 및 커뮤니티 플랫폼",
        sessionTimeout: "24",
        maxLoginAttempts: "5",
        smtpPort: "587",
        emailNotifications: true,
        systemAlerts: true,
        userReports: true,
        cacheTimeout: "3600",
        maxFileSize: "10",
        compressionEnabled: true,
      });
    }
  };

  const testDatabaseConnection = async () => {
    try {
      // 실제로는 Supabase 연결 테스트
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("데이터베이스 연결이 성공했습니다.");
    } catch (error) {
      alert("데이터베이스 연결에 실패했습니다.");
    }
  };

  const testEmailConnection = async () => {
    try {
      // 실제로는 SMTP 연결 테스트
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("이메일 서버 연결이 성공했습니다.");
    } catch (error) {
      alert("이메일 서버 연결에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  관리자 대시보드
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A] flex items-center gap-3">
                  <Settings className="w-8 h-8 text-[#0BA360]" />
                  시스템 설정
                </h1>
                <p className="text-[#64748B] mt-1">시스템 환경 변수 및 설정 관리</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {lastSaved && (
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  마지막 저장: {lastSaved.toLocaleTimeString('ko-KR')}
                </div>
              )}
              <Button onClick={handleReset} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                초기화
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="bg-[#0BA360] hover:bg-[#19C37D] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "저장 중..." : "저장"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="database" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="database">데이터베이스</TabsTrigger>
            <TabsTrigger value="site">사이트</TabsTrigger>
            <TabsTrigger value="security">보안</TabsTrigger>
            <TabsTrigger value="email">이메일</TabsTrigger>
            <TabsTrigger value="performance">성능</TabsTrigger>
          </TabsList>

          <TabsContent value="database" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  데이터베이스 설정
                </CardTitle>
                <CardDescription>
                  Supabase 데이터베이스 연결 설정을 관리합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                    Supabase URL
                  </label>
                  <Input
                    value={settings.supabaseUrl}
                    onChange={(e) => setSettings({...settings, supabaseUrl: e.target.value})}
                    placeholder="https://your-project.supabase.co"
                    type="url"
                  />
                  <p className="text-xs text-[#64748B] mt-1">
                    Supabase 프로젝트의 API URL을 입력하세요.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                    Supabase Anon Key
                  </label>
                  <Input
                    value={settings.supabaseAnonKey}
                    onChange={(e) => setSettings({...settings, supabaseAnonKey: e.target.value})}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    type="password"
                  />
                  <p className="text-xs text-[#64748B] mt-1">
                    Supabase 프로젝트의 익명 키를 입력하세요.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button onClick={testDatabaseConnection} variant="outline">
                    연결 테스트
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-[#64748B]">연결됨</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="site" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  사이트 설정
                </CardTitle>
                <CardDescription>
                  웹사이트의 기본 정보를 설정합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                    사이트 이름
                  </label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    placeholder="테니스프렌즈"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                    사이트 설명
                  </label>
                  <Textarea
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                    placeholder="테니스 실력 분석 및 커뮤니티 플랫폼"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                    사이트 URL
                  </label>
                  <Input
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                    placeholder="https://tennisfriends.com"
                    type="url"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  보안 설정
                </CardTitle>
                <CardDescription>
                  시스템 보안 및 접근 제어 설정을 관리합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                    관리자 비밀번호
                  </label>
                  <Input
                    value={settings.adminPassword}
                    onChange={(e) => setSettings({...settings, adminPassword: e.target.value})}
                    placeholder="새 비밀번호 입력"
                    type="password"
                  />
                  <p className="text-xs text-[#64748B] mt-1">
                    비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                      세션 타임아웃 (시간)
                    </label>
                    <Input
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
                      placeholder="24"
                      type="number"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                      최대 로그인 시도 횟수
                    </label>
                    <Input
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings({...settings, maxLoginAttempts: e.target.value})}
                      placeholder="5"
                      type="number"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">보안 권고사항</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        정기적으로 비밀번호를 변경하고, 강력한 비밀번호를 사용하세요.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  이메일 설정
                </CardTitle>
                <CardDescription>
                  SMTP 서버 및 이메일 알림 설정을 관리합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                      SMTP 호스트
                    </label>
                    <Input
                      value={settings.smtpHost}
                      onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                      SMTP 포트
                    </label>
                    <Input
                      value={settings.smtpPort}
                      onChange={(e) => setSettings({...settings, smtpPort: e.target.value})}
                      placeholder="587"
                      type="number"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                    SMTP 사용자명
                  </label>
                  <Input
                    value={settings.smtpUser}
                    onChange={(e) => setSettings({...settings, smtpUser: e.target.value})}
                    placeholder="your-email@gmail.com"
                    type="email"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                    SMTP 비밀번호
                  </label>
                  <Input
                    value={settings.smtpPassword}
                    onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
                    placeholder="앱 비밀번호"
                    type="password"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-[#0F172A]">알림 설정</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm">이메일 알림 활성화</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settings.systemAlerts}
                        onChange={(e) => setSettings({...settings, systemAlerts: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm">시스템 알림</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={settings.userReports}
                        onChange={(e) => setSettings({...settings, userReports: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm">사용자 리포트</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button onClick={testEmailConnection} variant="outline">
                    연결 테스트
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-[#64748B]">설정 필요</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  성능 설정
                </CardTitle>
                <CardDescription>
                  시스템 성능 및 최적화 설정을 관리합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                      캐시 타임아웃 (초)
                    </label>
                    <Input
                      value={settings.cacheTimeout}
                      onChange={(e) => setSettings({...settings, cacheTimeout: e.target.value})}
                      placeholder="3600"
                      type="number"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#0F172A] mb-2 block">
                      최대 파일 크기 (MB)
                    </label>
                    <Input
                      value={settings.maxFileSize}
                      onChange={(e) => setSettings({...settings, maxFileSize: e.target.value})}
                      placeholder="10"
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-[#0F172A]">최적화 옵션</h4>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.compressionEnabled}
                      onChange={(e) => setSettings({...settings, compressionEnabled: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-sm">압축 활성화</span>
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">성능 팁</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        캐시 타임아웃을 적절히 설정하면 페이지 로딩 속도를 향상시킬 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
