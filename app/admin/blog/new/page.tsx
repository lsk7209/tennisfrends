"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다.").max(255, "제목은 255자를 초과할 수 없습니다."),
  slug: z.string().min(1, "슬러그는 필수입니다.").max(255, "슬러그는 255자를 초과할 수 없습니다."),
  excerpt: z.string().max(500, "요약은 500자를 초과할 수 없습니다.").optional(),
  content: z.string().min(1, "내용은 필수입니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  tags: z.array(z.string()).optional(),
  read_time: z.coerce.number().min(1, "읽기 시간은 1분 이상이어야 합니다.").max(60, "읽기 시간은 60분을 초과할 수 없습니다."),
  image_emoji: z.string().max(10, "이모지는 10자를 초과할 수 없습니다.").optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean(),
  seo_title: z.string().max(255, "SEO 제목은 255자를 초과할 수 없습니다.").optional(),
  seo_description: z.string().max(500, "SEO 설명은 500자를 초과할 수 없습니다.").optional(),
  seo_keywords: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const categories = [
  { value: "실력 향상", label: "실력 향상" },
  { value: "장비", label: "장비" },
  { value: "전술", label: "전술" },
  { value: "건강", label: "건강" },
  { value: "규칙", label: "규칙" },
];

const commonTags = [
  "NTRP", "라켓", "스트링", "초보자", "전술", "부상예방", "규칙", "서브", "포핸드", "백핸드",
  "발리", "스매시", "드롭샷", "로브", "스핀", "파워", "컨트롤", "정확성", "스피드", "지구력"
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      tags: [],
      read_time: 5,
      image_emoji: "🎾",
      status: "draft",
      featured: false,
      seo_title: "",
      seo_description: "",
      seo_keywords: [],
    },
  });

  // 제목이 변경될 때 슬러그 자동 생성
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    form.setValue("slug", slug);
    form.setValue("seo_title", title);
  };

  // 요약이 변경될 때 SEO 설명 자동 생성
  const handleExcerptChange = (excerpt: string) => {
    form.setValue("seo_description", excerpt);
  };

  const addTag = (tag: string) => {
    if (tag && !form.getValues("tags")?.includes(tag)) {
      const currentTags = form.getValues("tags") || [];
      form.setValue("tags", [...currentTags, tag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue("tags", currentTags.filter(tag => tag !== tagToRemove));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200; // 한국어 기준
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          read_time: calculateReadTime(data.content),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('블로그 포스트가 성공적으로 저장되었습니다!');
        router.push('/admin/blog');
      } else {
        alert(`저장 중 오류가 발생했습니다: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm" className="text-[#0BA360] hover:bg-[#0BA360]/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                목록으로 돌아가기
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">새 블로그 포스트 작성</h1>
              <p className="text-[#334155]">새로운 블로그 포스트를 작성하고 게시하세요.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* 기본 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>제목 *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleTitleChange(e.target.value);
                            }}
                            placeholder="블로그 포스트 제목을 입력하세요"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>슬러그 *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="URL에 사용될 슬러그" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>요약</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleExcerptChange(e.target.value);
                          }}
                          placeholder="포스트의 간단한 요약을 입력하세요"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>내용 *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="블로그 포스트 내용을 마크다운으로 작성하세요"
                          rows={15}
                          className="font-mono"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 카테고리 및 태그 */}
            <Card>
              <CardHeader>
                <CardTitle>분류 및 태그</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>카테고리 *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="카테고리를 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image_emoji"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이모지 아이콘</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="🎾" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>태그</FormLabel>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {form.watch("tags")?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="새 태그 입력"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(newTag);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addTag(newTag)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {commonTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addTag(tag)}
                          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 게시 설정 */}
            <Card>
              <CardHeader>
                <CardTitle>게시 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>상태</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">초안</SelectItem>
                            <SelectItem value="published">게시</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="read_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>예상 읽기 시간 (분)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">추천 포스트</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          메인 페이지에 추천 포스트로 표시됩니다.
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* SEO 설정 */}
            <Card>
              <CardHeader>
                <CardTitle>SEO 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="seo_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO 제목</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="검색엔진에 표시될 제목" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seo_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO 설명</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="검색엔진에 표시될 설명"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 제출 버튼 */}
            <div className="flex justify-end gap-4">
              <Link href="/admin/blog">
                <Button variant="outline">취소</Button>
              </Link>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0BA360] hover:bg-[#19C37D]"
              >
                {isSubmitting ? (
                  <>
                    <Save className="w-4 h-4 mr-2 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    저장하기
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
