const { createClient } = require('@supabase/supabase-js');

// Supabase 클라이언트 설정
const supabaseUrl = 'https://zbccwmtesxalzzgralrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiY2N3bXRlc3hhbHp6Z3JhbHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTczNTIsImV4cCI6MjA3NjQzMzM1Mn0.EnjcUyU4YeyhI3cC_uJY_3t4m64AVGxa8Ls6mBBntmY';

const supabase = createClient(supabaseUrl, supabaseKey);

// 블로그 포스트 데이터 (기본 컬럼만 사용)
const blogPosts = [
  {
    slug: 'solo-tennis-training-routine',
    title: '혼자서 실력 올리는 테니스 훈련 루틴 🏋️ (집에서도 가능한 루틴 5가지)',
    excerpt: '코트가 없어도 성장할 수 있습니다. 벽치기, 밸런스 훈련, 하체 강화 루틴 등 집에서도 실력을 끌어올릴 수 있는 실전 루틴 5가지를 소개합니다.',
    content: '## 🏋️ 혼자서 실력 올리는 테니스 훈련 루틴 (집에서도 가능한 루틴 5가지)\n\n테니스는 코트에 나가야만 실력이 오르는 스포츠일까요? 그렇지 않습니다. **집·공원·벽 앞에서도 충분히 성장할 수 있습니다.** 프로 선수들도 오프시즌에는 홈트레이닝 루틴으로 감각을 유지합니다. 오늘은 혼자서 실력을 끌어올릴 수 있는 루틴 5가지를 소개합니다.',
    category: 'training',
    tags: ['테니스훈련', '혼자연습', '테니스홈트', '테니스루틴', '집에서테니스'],
    status: 'published'
  },
  {
    slug: 'tennis-racket-grip-guide',
    title: '내 손에 맞는 라켓 그립 찾는 법 ✋ (그립 두께·감각·부상 방지 가이드)',
    excerpt: '그립은 테니스에서 가장 자주 잡는 \'감각의 중심\'입니다. 그립 두께와 감각을 잘못 선택하면 스윙이 흔들리고 손목 부상으로 이어집니다. 내 손에 딱 맞는 그립을 찾는 방법을 소개합니다.',
    content: '## ✋ 내 손에 맞는 라켓 그립 찾는 법 (그립 두께·감각·부상 방지 가이드)\n\n그립은 테니스에서 가장 자주 잡는 \'감각의 중심\'입니다. 그립 두께와 감각을 잘못 선택하면 스윙이 흔들리고 손목 부상으로 이어집니다. 내 손에 딱 맞는 그립을 찾는 방법을 소개합니다.',
    category: 'gear',
    tags: ['테니스그립', '라켓그립', '손목통증', '테니스장비', '테니스팁'],
    status: 'published'
  },
  {
    slug: 'tennis-court-strategy-guide',
    title: '테니스 코트별 플레이 전략 🎾 (하드·클레이·잔디 완벽 비교 가이드)',
    excerpt: '코트가 달라지면 게임이 달라집니다. 하드·클레이·잔디 코트의 속도, 반응, 전략 차이를 이해하면 경기력은 한 단계 높아집니다.',
    content: '## 🎾 테니스 코트별 플레이 전략 (하드·클레이·잔디 완벽 비교 가이드)\n\n코트가 달라지면 게임이 달라집니다. 하드·클레이·잔디 코트의 속도, 반응, 전략 차이를 이해하면 경기력은 한 단계 높아집니다.',
    category: 'strategy',
    tags: ['테니스코트', '하드코트', '클레이코트', '잔디코트', '테니스전략'],
    status: 'published'
  }
];

async function addBlogPosts() {
  try {
    console.log('🚀 블로그 포스트 추가 시작...');
    
    for (const post of blogPosts) {
      console.log(`📝 "${post.title}" 추가 중...`);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select();
      
      if (error) {
        console.error(`❌ 에러 발생:`, error);
      } else {
        console.log(`✅ 성공: ${post.title}`);
      }
    }
    
    console.log('🎉 모든 블로그 포스트 추가 완료!');
  } catch (error) {
    console.error('❌ 전체 에러:', error);
  }
}

addBlogPosts();
