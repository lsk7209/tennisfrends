#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Vercel 빌드 실패 시 자동 재배포 스크립트
 */
async function autoRedeploy() {
  try {
    console.log('🔍 빌드 상태 확인 중...');
    
    // 1. 로컬에서 빌드 테스트
    console.log('📦 로컬 빌드 실행 중...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ 로컬 빌드 성공!');
    
    // 2. Vercel 재배포 트리거
    console.log('🚀 Vercel 재배포 시작...');
    
    // 방법 1: Vercel CLI 사용
    try {
      execSync('npx vercel --prod --yes', { stdio: 'inherit' });
      console.log('✅ Vercel 재배포 완료!');
    } catch (error) {
      console.error('❌ Vercel CLI 재배포 실패:', error.message);
      
      // 방법 2: Vercel API 사용
      console.log('🔄 Vercel API로 재배포 시도...');
      const fetch = require('node-fetch');
      
      const response = await fetch('https://api.vercel.com/v1/integrations/deploy', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'tennisfrends',
          gitSource: {
            type: 'github',
            repo: 'lsk7209/tennisfrends',
            ref: 'main'
          }
        })
      });
      
      if (response.ok) {
        console.log('✅ Vercel API 재배포 완료!');
      } else {
        throw new Error(`API 재배포 실패: ${response.status}`);
      }
    }
    
  } catch (error) {
    console.error('❌ 자동 재배포 실패:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  autoRedeploy();
}

module.exports = { autoRedeploy };
