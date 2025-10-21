const { createClient } = require('@supabase/supabase-js');

// Supabase 클라이언트 설정
const supabaseUrl = 'https://zbccwmtesxalzzgralrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiY2N3bXRlc3hhbHp6Z3JhbHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTczNTIsImV4cCI6MjA3NjQzMzM1Mn0.EnjcUyU4YeyhI3cC_uJY_3t4m64AVGxa8Ls6mBBntmY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBlogAPI() {
  try {
    console.log('🔍 블로그 API 테스트 시작...');
    
    // 모든 블로그 포스트 조회
    const { data: allPosts, error: allError } = await supabase
      .from('blog_posts')
      .select('*');
    
    if (allError) {
      console.error('❌ 전체 포스트 조회 에러:', allError);
      return;
    }
    
    console.log(`📊 총 ${allPosts.length}개의 포스트가 있습니다:`);
    allPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.slug})`);
      console.log(`   카테고리: ${post.category}`);
      console.log(`   태그: ${post.tags ? post.tags.join(', ') : '없음'}`);
      console.log(`   생성일: ${post.created_at}`);
      console.log('---');
    });
    
    // 특정 포스트 조회 테스트
    const { data: specificPost, error: specificError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', 'solo-tennis-training-routine')
      .single();
    
    if (specificError) {
      console.error('❌ 특정 포스트 조회 에러:', specificError);
    } else {
      console.log('✅ 특정 포스트 조회 성공:');
      console.log(`   제목: ${specificPost.title}`);
      console.log(`   내용 길이: ${specificPost.content ? specificPost.content.length : 0}자`);
    }
    
  } catch (error) {
    console.error('❌ 테스트 에러:', error);
  }
}

testBlogAPI();
