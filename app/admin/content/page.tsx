"use client";

import { useState, useEffect } from "react";
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
  TrendingUp,
  Loader2
} from "lucide-react";
import Link from "next/link";

// 블로그 포스트 타입 정의
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

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

// 블로그 포스트 폼 컴포넌트
function BlogPostForm({ 
  post, 
  onSave, 
  onCancel 
}: { 
  post: BlogPost | null; 
  onSave: (data: Partial<BlogPost>) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || '',
    tags: post?.tags?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    onSave({
      ...formData,
      tags,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-[#0F172A]">제목</label>
          <Input 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="포스트 제목을 입력하세요" 
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-[#0F172A]">슬러그</label>
          <Input 
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
            placeholder="URL 슬러그를 입력하세요" 
            required
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-[#0F172A]">카테고리</label>
        <Input 
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          placeholder="카테고리를 입력하세요" 
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-[#0F172A]">요약</label>
        <Textarea 
          value={formData.excerpt}
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          placeholder="포스트 요약을 입력하세요" 
          rows={3}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-[#0F172A]">본문</label>
        <Textarea 
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder="포스트 본문을 입력하세요" 
          rows={10}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-[#0F172A]">태그</label>
        <Input 
          value={formData.tags}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          placeholder="태그를 쉼표로 구분하여 입력하세요" 
        />
      </div>
      
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit" className="bg-[#0BA360] hover:bg-[#19C37D] text-white">
          {post ? '수정' : '저장'}
        </Button>
      </div>
    </form>
  );
}

export default function ContentManagementPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [utilities, setUtilities] = useState(sampleUtilities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [showNewUtilityForm, setShowNewUtilityForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // 실제 블로그 포스트 데이터 가져오기
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data.posts || []);
        } else {
          console.error('블로그 포스트를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('블로그 포스트 로딩 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredBlogPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredUtilities = utilities.filter(utility => {
    const matchesSearch = utility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         utility.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || utility.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const deleteBlogPost = async (id: string) => {
    if (confirm("정말로 이 블로그 포스트를 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setBlogPosts(blogPosts.filter(post => post.id !== id));
        } else {
          alert('삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('삭제 오류:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const editBlogPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowNewPostForm(true);
  };

  const saveBlogPost = async (postData: Partial<BlogPost>) => {
    try {
      const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        if (editingPost) {
          setBlogPosts(blogPosts.map(post => 
            post.id === editingPost.id ? updatedPost : post
          ));
        } else {
          setBlogPosts([updatedPost, ...blogPosts]);
        }
        setShowNewPostForm(false);
        setEditingPost(null);
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const deleteUtility = (id: number) => {
    if (confirm("정말로 이 유틸리티를 삭제하시겠습니까?")) {
      setUtilities(utilities.filter(utility => utility.id !== id));
    }
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
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 animate-spin text-[#0BA360]" />
                    <span className="ml-2 text-[#64748B]">블로그 포스트를 불러오는 중...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredBlogPosts.map((post) => (
                      <div key={post.id} className="border border-[#E2E8F0] rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-[#0F172A]">{post.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                            </div>
                            <p className="text-[#64748B] mb-3">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-[#64748B]">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.created_at).toLocaleDateString('ko-KR')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                수정: {new Date(post.updated_at).toLocaleDateString('ko-KR')}
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
                              onClick={() => editBlogPost(post)}
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
                    {filteredBlogPosts.length === 0 && !loading && (
                      <div className="text-center py-12">
                        <div className="text-[#64748B]">조건에 맞는 블로그 포스트가 없습니다.</div>
                      </div>
                    )}
                  </div>
                )}
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

        {/* 새 포스트 작성/수정 폼 */}
        {showNewPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>{editingPost ? '블로그 포스트 수정' : '새 블로그 포스트 작성'}</CardTitle>
              </CardHeader>
              <CardContent>
                <BlogPostForm 
                  post={editingPost}
                  onSave={saveBlogPost}
                  onCancel={() => {
                    setShowNewPostForm(false);
                    setEditingPost(null);
                  }}
                />
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
