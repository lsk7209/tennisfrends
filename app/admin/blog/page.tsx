"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  read_time: number;
  image_emoji: string;
  status: string;
  featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog?limit=50');
      const result = await response.json();
      
      if (result.error) {
        console.error('Error fetching posts:', result.error);
      } else {
        setPosts(result.data || []);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toggleStatus = async (postId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setPosts(posts.map(post => 
          post.id === postId 
            ? { ...post, status: newStatus, published_at: newStatus === "published" ? new Date().toISOString() : null }
            : post
        ));
      }
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('정말로 이 포스트를 삭제하시겠습니까?')) return;
    
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">게시됨</Badge>;
      case "draft":
        return <Badge variant="secondary">초안</Badge>;
      case "archived":
        return <Badge variant="outline">보관됨</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">블로그 관리</h1>
              <p className="text-[#334155]">블로그 포스트를 작성, 편집, 관리할 수 있습니다.</p>
            </div>
            <Link href="/admin/blog/new">
              <Button className="bg-[#0BA360] hover:bg-[#19C37D]">
                <Plus className="w-4 h-4 mr-2" />
                새 포스트 작성
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>필터 및 검색</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="제목 또는 내용 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="published">게시됨</SelectItem>
                  <SelectItem value="draft">초안</SelectItem>
                  <SelectItem value="archived">보관됨</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 카테고리</SelectItem>
                  <SelectItem value="실력 향상">실력 향상</SelectItem>
                  <SelectItem value="장비">장비</SelectItem>
                  <SelectItem value="전술">전술</SelectItem>
                  <SelectItem value="건강">건강</SelectItem>
                  <SelectItem value="규칙">규칙</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchPosts}>
                새로고침
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">전체 ({filteredPosts.length})</TabsTrigger>
            <TabsTrigger value="published">게시됨 ({filteredPosts.filter(p => p.status === "published").length})</TabsTrigger>
            <TabsTrigger value="draft">초안 ({filteredPosts.filter(p => p.status === "draft").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <div className="grid gap-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-16 bg-gray-200 rounded"></div>
                        <div className="h-8 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-gray-600 mb-4">검색 조건에 맞는 포스트가 없습니다.</p>
                <Link href="/admin/blog/new">
                  <Button>첫 포스트 작성하기</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          {getStatusBadge(post.status)}
                          {post.featured && (
                            <Badge className="bg-[#C7F000] text-[#0F172A]">추천</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>카테고리: {post.category}</span>
                          <span>읽기 시간: {post.read_time}분</span>
                          <span>조회수: {post.view_count}</span>
                          <span>생성: {new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                          {post.published_at && (
                            <span>게시: {new Date(post.published_at).toLocaleDateString('ko-KR')}</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(post.id, post.status)}
                        >
                          {post.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deletePost(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="published">
            <div className="grid gap-4">
              {filteredPosts.filter(p => p.status === "published").map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <p className="text-sm text-gray-600">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>조회수: {post.view_count}</span>
                        <span>게시: {new Date(post.published_at!).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="grid gap-4">
              {filteredPosts.filter(p => p.status === "draft").map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{post.title}</h3>
                      <p className="text-sm text-gray-600">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>생성: {new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(post.id, post.status)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
