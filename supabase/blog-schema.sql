-- 블로그 포스트 테이블
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[], -- 배열로 태그 저장
  read_time INTEGER, -- 읽기 시간(분)
  image_emoji VARCHAR(10), -- 이모지 아이콘
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id),
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT[]
);

-- 블로그 카테고리 테이블
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7), -- 헥스 컬러 코드
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 블로그 태그 테이블
CREATE TABLE IF NOT EXISTS blog_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  color VARCHAR(7), -- 헥스 컬러 코드
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 블로그 댓글 테이블 (향후 확장용)
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- RLS (Row Level Security) 정책
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view tags" ON blog_tags
  FOR SELECT USING (true);

CREATE POLICY "Public can view approved comments" ON blog_comments
  FOR SELECT USING (status = 'approved');

-- 관리자 전용 정책 (향후 인증 시스템과 연동)
CREATE POLICY "Admins can manage posts" ON blog_posts
  FOR ALL USING (true);

CREATE POLICY "Admins can manage categories" ON blog_categories
  FOR ALL USING (true);

CREATE POLICY "Admins can manage tags" ON blog_tags
  FOR ALL USING (true);

CREATE POLICY "Admins can manage comments" ON blog_comments
  FOR ALL USING (true);

-- 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_comments_updated_at BEFORE UPDATE ON blog_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 기본 카테고리 데이터 삽입
INSERT INTO blog_categories (name, slug, description, color) VALUES
  ('실력 향상', 'skill-improvement', '테니스 실력 향상을 위한 가이드와 팁', '#0BA360'),
  ('장비', 'equipment', '라켓, 스트링, 신발 등 장비 관련 정보', '#2364AA'),
  ('전술', 'strategy', '테니스 전술과 전략', '#C7F000'),
  ('건강', 'health', '부상 예방과 건강 관리', '#F59E0B'),
  ('규칙', 'rules', '테니스 규칙과 매너', '#8B5CF6')
ON CONFLICT (slug) DO NOTHING;

-- 기본 태그 데이터 삽입
INSERT INTO blog_tags (name, slug, color) VALUES
  ('NTRP', 'ntrp', '#0BA360'),
  ('라켓', 'racket', '#2364AA'),
  ('스트링', 'string', '#C7F000'),
  ('초보자', 'beginner', '#F59E0B'),
  ('전술', 'strategy', '#8B5CF6'),
  ('부상예방', 'injury-prevention', '#EF4444'),
  ('규칙', 'rules', '#3B82F6')
ON CONFLICT (slug) DO NOTHING;
