// 블로그 템플릿 수정 - 독자 화면에서 불필요한 요소 제거
const { createClient } = require('@supabase/supabase-js');

// Supabase 클라이언트 초기화
const supabaseUrl = 'https://zbccwmtesxalzzgralrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiY2N3bXRlc3hhbHp6Z3JhbHJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg1NzM1MiwiZXhwIjoyMDc2NDMzMzUyfQ.nPRqka27bSKoCNFGnn7cagynn7Fq44W5Nfr7FNrjic4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateBlogTemplateFix() {
  console.log('🔧 블로그 템플릿 수정 - 독자 화면 정리 중...');
  
  const updatedContent = `## 🎾 테니스 라켓 고를 때 가장 많이 하는 실수 5가지 😱 (코치가 직접 교정해드립니다)

라켓을 처음 잡았을 때, 그 설렘을 기억하시나요? 🎾  
하지만 시간이 지날수록 '왜 공이 이렇게 안 맞지?' 하는 의문이 생깁니다. 대부분의 초보는 실력이 아니라 **라켓 선택에서부터** 방향이 엇나갑니다.  
"라켓은 장비가 아니라, 당신의 스윙을 기억하는 파트너입니다."

---

## 🎯 사람들이 자주 놓치는 부분
라켓 선택에서 가장 흔한 실수는 '편함'을 기준으로 삼는 것입니다. 하지만 편한 라켓이 항상 좋은 라켓은 아니에요. 무게, 밸런스, 텐션, 그립, 환경까지 고려해야 진짜 '내 몸에 맞는' 라켓을 찾을 수 있습니다.

> 💡 **핵심 포인트:** 라켓은 편한 게 아니라 균형 있는 게 좋습니다.

---

## ⚙️ 코치의 실전 분석

#### ⚖️ 1. 가벼운 라켓이 편하다고 착각한다
가벼운 라켓은 처음엔 쉬워 보이지만, 임팩트 순간의 안정성이 떨어집니다. 팔 힘으로 버티려다 어깨와 팔꿈치에 피로가 쌓이죠.

| 구분 | 잘못된 선택 | 교정 방법 |
|------|--------------|------------|
| 초보자 | 270g 이하 | 285g 전후 |
| 중급자 | 280g 이하 | 295~305g |
| 여성 | 270g 이하 | 285g 전후 |

> 💬 **코치의 조언:** "무게보다 리듬을 기준으로 잡으세요."

#### ⚙️ 2. 밸런스는 눈에 안 보이니 무시한다
라켓의 밸런스는 파워와 컨트롤을 나누는 경계선이에요. 헤드라이트는 손의 컨트롤, 헤드헤비는 공의 추진력.

> 💬 **코치의 조언:** "초보는 중립형(320mm 전후)을 기준으로, 이후 자신의 플레이 스타일에 맞춰 조정하세요."

#### 🧵 3. 스트링 텐션은 '기본값이면 괜찮겠지?'
55lbs는 '모두를 위한 평균값'이지 '당신을 위한 세팅'이 아닙니다. 스윙 속도, 체력, 공감각에 따라 텐션은 달라져야 해요.

> 💬 **코치의 조언:** "낮을수록 파워, 높을수록 컨트롤입니다."

📎 [스트링 텐션 계산기](/utility/string-tension)

#### 🪶 4. 그립 사이즈를 감으로 고른다
라켓을 잡을 때 손가락 하나가 그립과 손바닥 사이에 들어가면 적당합니다. 너무 작으면 손목 통증, 너무 크면 스윙 타이밍이 느려집니다.

> 💬 **코치의 조언:** "그립은 라켓보다 중요합니다. 손이 편해야 몸이 움직입니다."

#### 🗺️ 5. 환경이 라켓을 바꾼다는 걸 모른다
하드코트, 클레이, 실내와 야외. 환경이 바뀌면 라켓 반응도 달라집니다. 습도와 온도는 텐션을 무너뜨리고, 공의 반발력을 바꿔요.

> 💬 **코치의 조언:** "여름엔 텐션을 2~3lbs 낮추고, 겨울엔 2lbs 높이세요. 작은 조정이 경기 결과를 바꿉니다."

---

## 🧩 코트에서 바로 써먹는 법
라켓을 고를 때는 다음 순서로 체크하세요:

1. **무게 테스트**: 10회 연속 스윙해도 어깨가 무겁지 않은가?
2. **밸런스 확인**: 라켓을 손가락에 올려놓고 균형점을 찾아보세요
3. **그립 사이즈**: 손가락 하나가 들어갈 정도면 적당합니다
4. **텐션 조정**: 시즌과 코트 환경에 맞춰 조정하세요

> 💬 **코치의 조언:** "라켓은 당신의 스윙을 기억하는 파트너입니다."

---

## 💬 코치의 이야기
"한 달 전, 한 제자가 어깨 통증으로 레슨을 중단했어요. 알고 보니 270g 라켓을 쓰고 있었죠. 무게를 295g으로 바꾸자 통증이 사라졌어요. 기술보다 **장비를 이해하는 순간**, 그 사람의 테니스가 달라집니다."

"라켓을 바꿀 때마다 당신의 몸이 느낀 차이를 기록해보세요. 그게 바로 성장의 기록입니다."

---

## 🧠 자주 묻는 질문
**Q. 라켓 무게는 어떻게 정하나요?**  
A. 초보자는 285g 전후, 중급자는 295~305g이 이상적입니다. 무게보다는 균형이 중요해요.

**Q. 스트링 텐션은 언제 조정하나요?**  
A. 계절이 바뀔 때마다, 그리고 새로운 코트에서 플레이할 때 조정하세요. 여름엔 낮추고, 겨울엔 높이세요.

**Q. 그립 사이즈를 잘못 고르면 어떻게 되나요?**  
A. 작은 그립은 손목 통증, 큰 그립은 임팩트 불안정의 원인이 됩니다. 손가락 하나가 들어갈 정도가 적당해요.

---

## 🔗 함께 보면 좋은 콘텐츠
- [스트링 텐션 계산기](/utility/string-tension)
- [NTRP 자가 진단 테스트](/utility/ntrp-analyzer)
- [테니스 부상 리스크 체크](/utility/injury-risk)

---

## 🏁 마무리
라켓은 장비가 아니라, 당신의 스윙을 기억하는 파트너입니다.  
누가 쓴 라켓인지보다 **내 손이 편한가**, 그게 전부예요.  
한 번쯤 라켓을 바꿨을 때의 느낌을 기록해두세요. 그것이 당신의 성장일지입니다.

> "라켓을 바꿀 때마다 당신의 몸이 느낀 차이를 기록해보세요. 그게 바로 성장의 기록입니다."

---

## 📤 친구에게 공유하기
<button onclick="navigator.clipboard.writeText('https://tennisfriends.kr/blog/common-tennis-racket-mistakes'); alert('공유 링크가 복사되었습니다 📎');">공유하기 📎</button>`;

  try {
    console.log('📝 수정된 콘텐츠로 포스트 업데이트 중...');

    // Supabase에서 포스트 업데이트
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ 
        content: updatedContent,
        updated_at: new Date().toISOString()
      })
      .eq('slug', 'common-tennis-racket-mistakes')
      .select();

    if (error) {
      console.error('❌ 포스트 업데이트 오류:', error);
      return;
    }

    console.log('✅ 독자 화면 정리 완료!');
    console.log('📊 수정된 포스트:', JSON.stringify(data[0], null, 2));

  } catch (error) {
    console.error('❌ 포스트 업데이트 중 오류 발생:', error);
  }
}

// 스크립트 실행
updateBlogTemplateFix()
  .then(() => {
    console.log('\n✅ 블로그 템플릿 수정 완료');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ 스크립트 실행 중 오류 발생:', error);
    process.exit(1);
  });
