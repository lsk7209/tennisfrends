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
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

// 샘플 블로그 데이터
const sampleBlogPosts = [
  {
    id: 1,
    title: "2024년 NTRP 레벨 완벽 가이드: 내 실력은 몇 점?",
    slug: "ntrp-guide-2024",
    description: "NTRP 1.5부터 5.0+까지, 각 레벨의 특징과 실력 향상 팁을 자세히 알아봅니다.",
    date: "2024-07-26",
    tags: ["NTRP", "실력분석", "가이드"],
    status: "published",
    views: 1234,
    likes: 56,
    author: "테니스프렌즈 에디터"
  },
  {
    id: 2,
    title: "나에게 맞는 테니스 라켓 고르기: 초보부터 상급자까지",
    slug: "tennis-racket-selection",
    description: "수많은 라켓 중 나에게 딱 맞는 라켓을 찾는 방법과 추천 라켓을 소개합니다.",
    date: "2024-07-28",
    tags: ["라켓", "장비", "추천"],
    status: "published",
    views: 987,
    likes: 43,
    author: "테니스프렌즈 에디터"
  },
  {
    id: 3,
    title: "30일 테니스 챌린지: 초보자도 실력 향상 가능한 훈련 계획",
    slug: "tennis-30day-challenge",
    description: "30일 동안 꾸준히 따라 하면 테니스 실력이 눈에 띄게 향상되는 훈련 계획을 소개합니다.",
    date: "2024-07-29",
    tags: ["훈련", "챌린지", "초보자"],
    status: "draft",
    views: 0,
    likes: 0,
    author: "테니스프렌즈 에디터"
  }
];

// 샘플 유틸리티 데이터
const sampleUtilities = [
  {
    id: 1,
    name: "NTRP 실력 테스트 분석기",
    slug: "ntrp-analyzer",
    description: "15문항으로 정확한 NTRP 레벨을 측정하고 통계를 확인할 수 있습니다.",
    type: "test",
    status: "active",
    usage: 5678,
    rating: 4.8,
    lastUpdated: "2024-07-30"
  },
  {
    id: 2,
    name: "테니스 성향 분석",
    slug: "tennis-type",
    description: "나의 플레이 스타일을 분석하고 맞춤형 훈련 계획을 제공합니다.",
    type: "analysis",
    status: "active",
    usage: 2345,
    rating: 4.6,
    lastUpdated: "2024-07-28"
  },
  {
    id: 3,
    name: "라켓 추천 시스템",
    slug: "racket-recommender",
    description: "실력과 플레이 스타일에 맞는 최적의 라켓을 추천합니다.",
    type: "recommendation",
    status: "development",
    usage: 0,
    rating: 0,
    lastUpdated: "2024-07-25"
  }
];

export default function ContentManagementPage() {
  const [blogPosts, setBlogPosts] = useState(sampleBlogPosts);
  const [utilities, setUtilities] = useState(sampleUtilities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showNewUtilityForm, setShowNewUtilityForm] = useState(false);

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || post.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredUtilities = utilities.filter(utility => {
    const matchesSearch = utility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         utility.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || utility.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const deleteBlogPost = (id: number) => {
    if (confirm("정말로 이 블로그 포스트를 삭제하시겠습니까?")) {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
    }
  };

  const deleteUtility = (id: number) => {
    if (confirm("정말로 이 유틸리티를 삭제하시겠습니까?")) {
      setUtilities(utilities.filter(utility => utility.id !== id));
    }
  };

  const toggleBlogPostStatus = (id: number) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === "published" ? "draft" : "published" }
        : post
    ));
  };

  const toggleUtilityStatus = (id: number) => {
    setUtilities(utilities.map(utility => 
      utility.id === id 
        ? { ...utility, status: utility.status === "active" ? "inactive" : "active" }
        : utility
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
      case "development":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "발행됨";
      case "draft":
        return "초안";
      case "active":
        return "활성";
      case "development":
        return "개발중";
      case "inactive":
        return "비활성";
      default:
        return status;
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
                  <FileText className="w-8 h-8 text-[#0BA360]" />
                  콘텐츠 관리
                </h1>
                <p className="text-[#64748B] mt-1">블로그 포스트 및 유틸리티 관리</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowNewPostForm(true)}
                className="bg-[#0BA360] hover:bg-[#19C37D] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                새 포스트
              </Button>
              <Button 
                onClick={() => setShowNewUtilityForm(true)}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                새 유틸리티
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 필터 및 검색 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>필터 및 검색</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#64748B]" />
                <Input
                  placeholder="제목, 설명으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-[#E2E8F0] rounded-md bg-white"
              >
                <option value="all">모든 상태</option>
                <option value="published">발행됨</option>
                <option value="draft">초안</option>
                <option value="active">활성</option>
                <option value="development">개발중</option>
                <option value="inactive">비활성</option>
              </select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStatus("all");
                }}
              >
                필터 초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="blog">블로그 포스트</TabsTrigger>
            <TabsTrigger value="utilities">유틸리티</TabsTrigger>
          </TabsList>

          <TabsContent value="blog" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>블로그 포스트 관리</CardTitle>
                <CardDescription>
                  총 {filteredBlogPosts.length}개의 포스트가 표시됩니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBlogPosts.map((post) => (
                    <div key={post.id} className="border border-[#E2E8F0] rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-[#0F172A]">{post.title}</h3>
                            <Badge className={getStatusColor(post.status)}>
                              {getStatusText(post.status)}
                            </Badge>
                          </div>
                          <p className="text-[#64748B] mb-3">{post.description}</p>
                          <div className="flex items-center gap-4 text-sm text-[#64748B]">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.views} 조회
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {post.likes} 좋아요
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {post.author}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleBlogPostStatus(post.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBlogPost(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredBlogPosts.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-[#64748B]">조건에 맞는 블로그 포스트가 없습니다.</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>유틸리티 관리</CardTitle>
                <CardDescription>
                  총 {filteredUtilities.length}개의 유틸리티가 표시됩니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUtilities.map((utility) => (
                    <div key={utility.id} className="border border-[#E2E8F0] rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-[#0F172A]">{utility.name}</h3>
                            <Badge className={getStatusColor(utility.status)}>
                              {getStatusText(utility.status)}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {utility.type}
                            </Badge>
                          </div>
                          <p className="text-[#64748B] mb-3">{utility.description}</p>
                          <div className="flex items-center gap-4 text-sm text-[#64748B]">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {utility.usage} 사용
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {utility.rating > 0 ? `${utility.rating}/5.0` : "평가 없음"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {utility.lastUpdated}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`/utility/${utility.slug}`, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUtilityStatus(utility.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteUtility(utility.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredUtilities.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-[#64748B]">조건에 맞는 유틸리티가 없습니다.</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 새 포스트 작성 폼 (모달 대신 간단한 폼) */}
        {showNewPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle>새 블로그 포스트 작성</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A]">제목</label>
                    <Input placeholder="포스트 제목을 입력하세요" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A]">설명</label>
                    <Textarea placeholder="포스트 설명을 입력하세요" rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A]">태그</label>
                    <Input placeholder="태그를 쉼표로 구분하여 입력하세요" />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                      취소
                    </Button>
                    <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white">
                      저장
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 새 유틸리티 작성 폼 */}
        {showNewUtilityForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle>새 유틸리티 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A]">이름</label>
                    <Input placeholder="유틸리티 이름을 입력하세요" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A]">설명</label>
                    <Textarea placeholder="유틸리티 설명을 입력하세요" rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A]">타입</label>
                    <select className="w-full px-3 py-2 border border-[#E2E8F0] rounded-md bg-white">
                      <option value="test">테스트</option>
                      <option value="analysis">분석</option>
                      <option value="recommendation">추천</option>
                      <option value="tool">도구</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowNewUtilityForm(false)}>
                      취소
                    </Button>
                    <Button className="bg-[#0BA360] hover:bg-[#19C37D] text-white">
                      저장
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
