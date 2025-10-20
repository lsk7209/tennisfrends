import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface Utility {
  id: string
  title: string
  description: string
  icon: string
  color: string
  tag: string
  href: string
  buttonText: string
  time: string
  content: Record<string, unknown> // JSON 형태의 컨텐츠
  questions?: Question[]
  results?: Result[]
  created_at: string
  updated_at: string
}

export interface Question {
  id: number
  question: string
  options: {
    value: string
    label: string
    description: string
  }[]
}

export interface Result {
  level: string
  title: string
  summary: string[]
  actions: string[]
  nextSteps: {
    title: string
    href: string
  }[]
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published: boolean
  featured: boolean
  tags: string[]
  category: string
  reading_time: number
  views: number
  created_at: string
  updated_at: string
}

export interface Guide {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  featured: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}
