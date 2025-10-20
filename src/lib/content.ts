import { supabase, Utility, BlogPost, Guide } from './supabase'

// 유틸리티 관련 함수
export const utilityService = {
  // 모든 유틸리티 가져오기
  async getAll(): Promise<Utility[]> {
    const { data, error } = await supabase
      .from('utilities')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  // ID로 유틸리티 가져오기
  async getById(id: string): Promise<Utility | null> {
    const { data, error } = await supabase
      .from('utilities')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single()
    
    if (error) throw error
    return data
  },

  // href로 유틸리티 가져오기
  async getByHref(href: string): Promise<Utility | null> {
    const { data, error } = await supabase
      .from('utilities')
      .select('*')
      .eq('href', href)
      .eq('active', true)
      .single()
    
    if (error) throw error
    return data
  },

  // 유틸리티 생성
  async create(utility: Omit<Utility, 'id' | 'created_at' | 'updated_at'>): Promise<Utility> {
    const { data, error } = await supabase
      .from('utilities')
      .insert(utility)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 유틸리티 업데이트
  async update(id: string, updates: Partial<Utility>): Promise<Utility> {
    const { data, error } = await supabase
      .from('utilities')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 유틸리티 삭제 (비활성화)
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('utilities')
      .update({ active: false })
      .eq('id', id)
    
    if (error) throw error
  }
}

// 블로그 관련 함수
export const blogService = {
  // 모든 블로그 포스트 가져오기
  async getAll(published: boolean = true): Promise<BlogPost[]> {
    const query = supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (published) {
      query.eq('published', true)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  },

  // 슬러그로 블로그 포스트 가져오기
  async getBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) throw error
    return data
  },

  // 카테고리별 블로그 포스트 가져오기
  async getByCategory(category: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // 태그별 블로그 포스트 가져오기
  async getByTag(tag: string): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .contains('tags', [tag])
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // 인기 블로그 포스트 가져오기
  async getFeatured(limit: number = 5): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .eq('published', true)
      .order('views', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // 조회수 증가
  async incrementViews(slug: string): Promise<void> {
    const { error } = await supabase.rpc('increment_views', {
      table_name: 'blog_posts',
      slug: slug
    })
    
    if (error) throw error
  },

  // 블로그 포스트 생성
  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 블로그 포스트 업데이트
  async update(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 블로그 포스트 삭제
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// 가이드 관련 함수
export const guideService = {
  // 모든 가이드 가져오기
  async getAll(): Promise<Guide[]> {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // 슬러그로 가이드 가져오기
  async getBySlug(slug: string): Promise<Guide | null> {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  },

  // 카테고리별 가이드 가져오기
  async getByCategory(category: string): Promise<Guide[]> {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // 난이도별 가이드 가져오기
  async getByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<Guide[]> {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('difficulty', difficulty)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // 인기 가이드 가져오기
  async getFeatured(limit: number = 5): Promise<Guide[]> {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('featured', true)
      .order('views', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // 조회수 증가
  async incrementViews(slug: string): Promise<void> {
    const { error } = await supabase.rpc('increment_views', {
      table_name: 'guides',
      slug: slug
    })
    
    if (error) throw error
  },

  // 가이드 생성
  async create(guide: Omit<Guide, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<Guide> {
    const { data, error } = await supabase
      .from('guides')
      .insert(guide)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 가이드 업데이트
  async update(id: string, updates: Partial<Guide>): Promise<Guide> {
    const { data, error } = await supabase
      .from('guides')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 가이드 삭제
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('guides')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// 카테고리 타입 정의
interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  icon: string
  parent_id?: string
  sort_order: number
  created_at: string
  updated_at: string
}

// 태그 타입 정의
interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  color: string
  usage_count: number
  created_at: string
  updated_at: string
}

// 카테고리 관련 함수
export const categoryService = {
  // 모든 카테고리 가져오기
  async getAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    return data || []
  },

  // 슬러그로 카테고리 가져오기
  async getBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  }
}

// 태그 관련 함수
export const tagService = {
  // 모든 태그 가져오기
  async getAll(): Promise<Tag[]> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('usage_count', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // 슬러그로 태그 가져오기
  async getBySlug(slug: string): Promise<Tag | null> {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  }
}
