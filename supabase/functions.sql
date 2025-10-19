-- 슈퍼베이스 함수들

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_views(table_name TEXT, slug TEXT)
RETURNS void AS $$
BEGIN
  IF table_name = 'blog_posts' THEN
    UPDATE blog_posts SET views = views + 1 WHERE slug = increment_views.slug;
  ELSIF table_name = 'guides' THEN
    UPDATE guides SET views = views + 1 WHERE slug = increment_views.slug;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 슬러그 생성 함수
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(title, '[^가-힣a-zA-Z0-9\s]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '^-+|-+$', '', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- 태그 사용 횟수 업데이트 함수
CREATE OR REPLACE FUNCTION update_tag_usage()
RETURNS TRIGGER AS $$
BEGIN
  -- 블로그 포스트의 경우
  IF TG_TABLE_NAME = 'blog_posts' THEN
    -- 기존 태그들의 사용 횟수 감소
    IF TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN
      UPDATE tags 
      SET usage_count = usage_count - 1 
      WHERE name = ANY(OLD.tags);
    END IF;
    
    -- 새 태그들의 사용 횟수 증가
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
      UPDATE tags 
      SET usage_count = usage_count + 1 
      WHERE name = ANY(NEW.tags);
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- 태그 사용 횟수 업데이트 트리거
CREATE TRIGGER update_blog_posts_tag_usage
  AFTER INSERT OR UPDATE OR DELETE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_tag_usage();

-- 검색 함수 (전문 검색)
CREATE OR REPLACE FUNCTION search_content(
  search_term TEXT,
  content_type TEXT DEFAULT 'all'
)
RETURNS TABLE(
  id UUID,
  title TEXT,
  content TEXT,
  type TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  rank REAL
) AS $$
BEGIN
  IF content_type = 'blog' OR content_type = 'all' THEN
    RETURN QUERY
    SELECT 
      bp.id,
      bp.title,
      bp.content,
      'blog'::TEXT as type,
      bp.created_at,
      ts_rank(
        to_tsvector('korean', bp.title || ' ' || bp.content),
        plainto_tsquery('korean', search_term)
      ) as rank
    FROM blog_posts bp
    WHERE bp.published = true
      AND to_tsvector('korean', bp.title || ' ' || bp.content) @@ plainto_tsquery('korean', search_term)
    ORDER BY rank DESC;
  END IF;
  
  IF content_type = 'guide' OR content_type = 'all' THEN
    RETURN QUERY
    SELECT 
      g.id,
      g.title,
      g.content,
      'guide'::TEXT as type,
      g.created_at,
      ts_rank(
        to_tsvector('korean', g.title || ' ' || g.content),
        plainto_tsquery('korean', search_term)
      ) as rank
    FROM guides g
    WHERE to_tsvector('korean', g.title || ' ' || g.content) @@ plainto_tsquery('korean', search_term)
    ORDER BY rank DESC;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 통계 함수
CREATE OR REPLACE FUNCTION get_content_stats()
RETURNS TABLE(
  total_utilities INTEGER,
  total_blog_posts INTEGER,
  total_guides INTEGER,
  total_views BIGINT,
  published_posts INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*)::INTEGER FROM utilities WHERE active = true) as total_utilities,
    (SELECT COUNT(*)::INTEGER FROM blog_posts) as total_blog_posts,
    (SELECT COUNT(*)::INTEGER FROM guides) as total_guides,
    (SELECT COALESCE(SUM(views), 0) FROM blog_posts) + (SELECT COALESCE(SUM(views), 0) FROM guides) as total_views,
    (SELECT COUNT(*)::INTEGER FROM blog_posts WHERE published = true) as published_posts;
END;
$$ LANGUAGE plpgsql;

-- 인기 컨텐츠 함수
CREATE OR REPLACE FUNCTION get_popular_content(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  id UUID,
  title TEXT,
  type TEXT,
  views INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  (
    SELECT 
      bp.id,
      bp.title,
      'blog'::TEXT as type,
      bp.views,
      bp.created_at
    FROM blog_posts bp
    WHERE bp.published = true
    ORDER BY bp.views DESC, bp.created_at DESC
    LIMIT limit_count
  )
  UNION ALL
  (
    SELECT 
      g.id,
      g.title,
      'guide'::TEXT as type,
      g.views,
      g.created_at
    FROM guides g
    ORDER BY g.views DESC, g.created_at DESC
    LIMIT limit_count
  )
  ORDER BY views DESC, created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
