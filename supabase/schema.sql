-- 테니스프렌즈 데이터베이스 스키마
-- 슈퍼베이스에서 실행할 SQL 스크립트

-- 유틸리티 테이블
CREATE TABLE IF NOT EXISTS utilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  tag TEXT NOT NULL,
  href TEXT NOT NULL,
  button_text TEXT NOT NULL,
  time TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  questions JSONB DEFAULT '[]',
  results JSONB DEFAULT '[]',
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 블로그 포스트 테이블
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT '테니스프렌즈',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'general',
  reading_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 가이드 테이블
CREATE TABLE IF NOT EXISTS guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 사용자 테이블 (확장)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 컨텐츠 카테고리 테이블
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  icon TEXT DEFAULT '📁',
  parent_id UUID REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 태그 테이블
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6B7280',
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_utilities_featured ON utilities(featured);
CREATE INDEX IF NOT EXISTS idx_utilities_active ON utilities(active);
CREATE INDEX IF NOT EXISTS idx_utilities_sort_order ON utilities(sort_order);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category);
CREATE INDEX IF NOT EXISTS idx_guides_difficulty ON guides(difficulty);
CREATE INDEX IF NOT EXISTS idx_guides_featured ON guides(featured);
CREATE INDEX IF NOT EXISTS idx_guides_created_at ON guides(created_at DESC);

-- RLS (Row Level Security) 정책
ALTER TABLE utilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책
CREATE POLICY "Public read access for utilities" ON utilities FOR SELECT USING (active = true);
CREATE POLICY "Public read access for blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read access for guides" ON guides FOR SELECT USING (true);
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for tags" ON tags FOR SELECT USING (true);

-- 사용자 프로필 정책
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 적용
CREATE TRIGGER update_utilities_updated_at BEFORE UPDATE ON utilities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON guides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 초기 데이터 삽입
INSERT INTO categories (name, slug, description, color, icon, sort_order) VALUES
('실력 분석', 'skill-analysis', '테니스 실력 측정 및 분석', '#3B82F6', '📊', 1),
('성향 분석', 'style-analysis', '플레이 스타일 및 성향 분석', '#8B5CF6', '🧩', 2),
('장비 추천', 'equipment', '라켓, 스트링 등 장비 추천', '#F97316', '🏸', 3),
('훈련 가이드', 'training', '테니스 훈련법 및 팁', '#10B981', '💪', 4),
('규칙 및 규정', 'rules', '테니스 규칙 및 규정', '#6366F1', '📚', 5),
('건강 및 부상', 'health', '부상 예방 및 건강 관리', '#EF4444', '🛡️', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO tags (name, slug, description, color) VALUES
('NTRP', 'ntrp', 'National Tennis Rating Program', '#3B82F6'),
('초급자', 'beginner', '테니스 초급자', '#10B981'),
('중급자', 'intermediate', '테니스 중급자', '#F59E0B'),
('상급자', 'advanced', '테니스 상급자', '#EF4444'),
('라켓', 'racket', '테니스 라켓', '#8B5CF6'),
('스트링', 'string', '테니스 스트링', '#6366F1'),
('훈련법', 'training', '테니스 훈련법', '#14B8A6'),
('규칙', 'rules', '테니스 규칙', '#F97316'),
('부상예방', 'injury-prevention', '부상 예방', '#EF4444'),
('코트', 'court', '테니스 코트', '#10B981')
ON CONFLICT (slug) DO NOTHING;
