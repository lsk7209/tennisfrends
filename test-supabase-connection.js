// Supabase 연결 테스트
const { createClient } = require('@supabase/supabase-js');

// 환경 변수 설정
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://zbccwmtesxalzzgralrz.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiY2N3bXRlc3hhbHp6Z3JhbHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTczNTIsImV4cCI6MjA3NjQzMzM1Mn0.EnjcUyU4YeyhI3cC_uJY_3t4m64AVGxa8Ls6mBBntmY';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 환경 변수 확인:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? '설정됨' : '없음');

async function testConnection() {
  try {
    console.log('🚀 Supabase 연결 테스트 시작...');
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // 블로그 포스트 조회 테스트
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, category, created_at')
      .limit(5);
    
    if (error) {
      console.error('❌ Supabase 쿼리 에러:', error);
      return;
    }
    
    console.log('✅ Supabase 연결 성공!');
    console.log(`📊 조회된 포스트 수: ${data.length}`);
    
    data.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.slug})`);
    });
    
  } catch (error) {
    console.error('❌ 연결 테스트 에러:', error);
  }
}

testConnection();
