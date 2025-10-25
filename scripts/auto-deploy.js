#!/usr/bin/env node

/**
 * 자동 배포 및 검토 스크립트
 * GitHub Actions와 연동하여 배포 후 자동 검토 수행
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutoDeploy {
  constructor() {
    this.config = {
      siteUrl: 'https://tennisfrends.vercel.app',
      checkInterval: 10000, // 10초
      maxRetries: 30,
      timeout: 300000 // 5분
    };
  }

  /**
   * 배포 상태 확인
   */
  async checkDeploymentStatus() {
    try {
      const response = await fetch(this.config.siteUrl, {
        method: 'HEAD',
        timeout: 5000
      });
      
      return {
        status: response.status,
        healthy: response.status === 200,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * 사이트 기능 테스트
   */
  async testSiteFunctionality() {
    const tests = [
      {
        name: '메인 페이지',
        url: this.config.siteUrl,
        expected: 200
      },
      {
        name: 'NTRP 테스트',
        url: `${this.config.siteUrl}/ntrp-test`,
        expected: 200
      },
      {
        name: '유틸리티 페이지',
        url: `${this.config.siteUrl}/utility`,
        expected: 200
      },
      {
        name: '블로그 페이지',
        url: `${this.config.siteUrl}/blog`,
        expected: 200
      }
    ];

    const results = [];
    
    for (const test of tests) {
      try {
        const response = await fetch(test.url, { timeout: 5000 });
        const success = response.status === test.expected;
        
        results.push({
          name: test.name,
          url: test.url,
          status: response.status,
          success,
          timestamp: new Date().toISOString()
        });
        
        console.log(`${success ? '✅' : '❌'} ${test.name}: ${response.status}`);
      } catch (error) {
        results.push({
          name: test.name,
          url: test.url,
          status: 'error',
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        console.log(`❌ ${test.name}: ${error.message}`);
      }
    }
    
    return results;
  }

  /**
   * 성능 분석
   */
  async analyzePerformance() {
    console.log('📊 성능 분석 시작...');
    
    const performanceTests = [
      {
        name: '페이지 로드 시간',
        test: async () => {
          const start = Date.now();
          await fetch(this.config.siteUrl);
          return Date.now() - start;
        }
      },
      {
        name: 'API 응답 시간',
        test: async () => {
          const start = Date.now();
          await fetch(`${this.config.siteUrl}/api/blog`);
          return Date.now() - start;
        }
      }
    ];
    
    const results = {};
    
    for (const test of performanceTests) {
      try {
        const time = await test.test();
        results[test.name] = time;
        console.log(`  ⏱️ ${test.name}: ${time}ms`);
      } catch (error) {
        results[test.name] = 'error';
        console.log(`  ❌ ${test.name}: ${error.message}`);
      }
    }
    
    return results;
  }

  /**
   * 자동 수정 시도
   */
  async attemptAutoFix(issues) {
    console.log('🔧 자동 수정 시도...');
    
    const fixes = [
      {
        condition: (issues) => issues.some(i => i.includes('timeout')),
        action: async () => {
          console.log('  🔄 타임아웃 문제 - 재시도...');
          await this.wait(5000);
        }
      },
      {
        condition: (issues) => issues.some(i => i.includes('404')),
        action: async () => {
          console.log('  🔄 404 오류 - 캐시 클리어...');
          // Vercel 캐시 클리어를 위한 재배포 트리거
          await this.triggerRedeploy();
        }
      },
      {
        condition: (issues) => issues.some(i => i.includes('500')),
        action: async () => {
          console.log('  🔄 500 오류 - 서버 재시작...');
          await this.triggerRedeploy();
        }
      }
    ];
    
    for (const fix of fixes) {
      if (fix.condition(issues)) {
        await fix.action();
        await this.wait(10000); // 수정 후 대기
        return true;
      }
    }
    
    return false;
  }

  /**
   * 재배포 트리거
   */
  async triggerRedeploy() {
    try {
      // GitHub API를 통해 새로운 배포 트리거
      const response = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/dispatches`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'redeploy',
          client_payload: {
            ref: 'main',
            reason: 'auto-fix'
          }
        })
      });
      
      if (response.ok) {
        console.log('  ✅ 재배포 트리거 완료');
      } else {
        console.log('  ❌ 재배포 트리거 실패');
      }
    } catch (error) {
      console.log('  ❌ 재배포 트리거 오류:', error.message);
    }
  }

  /**
   * 배포 완료 대기
   */
  async waitForDeployment() {
    console.log('⏳ 배포 완료 대기 중...');
    
    let retries = 0;
    const maxRetries = this.config.maxRetries;
    
    while (retries < maxRetries) {
      const status = await this.checkDeploymentStatus();
      
      if (status.healthy) {
        console.log('✅ 배포 완료 확인');
        return true;
      }
      
      console.log(`⏳ 배포 대기 중... (${retries + 1}/${maxRetries})`);
      await this.wait(this.config.checkInterval);
      retries++;
    }
    
    console.log('❌ 배포 타임아웃');
    return false;
  }

  /**
   * 종합 검토 실행
   */
  async runFullReview() {
    console.log('🚀 자동 배포 검토 시작...\n');
    
    // 1. 배포 상태 확인
    console.log('1️⃣ 배포 상태 확인');
    const deploymentStatus = await this.checkDeploymentStatus();
    console.log(`   상태: ${deploymentStatus.healthy ? '✅ 정상' : '❌ 오류'}`);
    
    if (!deploymentStatus.healthy) {
      console.log('❌ 배포 실패 - 자동 수정 시도');
      const fixed = await this.attemptAutoFix(['deployment-failed']);
      if (!fixed) {
        console.log('❌ 자동 수정 실패');
        return false;
      }
    }
    
    // 2. 사이트 기능 테스트
    console.log('\n2️⃣ 사이트 기능 테스트');
    const functionalityResults = await this.testSiteFunctionality();
    const failedTests = functionalityResults.filter(r => !r.success);
    
    if (failedTests.length > 0) {
      console.log(`❌ ${failedTests.length}개 테스트 실패`);
      const issues = failedTests.map(t => `${t.name}: ${t.status}`);
      await this.attemptAutoFix(issues);
    } else {
      console.log('✅ 모든 기능 테스트 통과');
    }
    
    // 3. 성능 분석
    console.log('\n3️⃣ 성능 분석');
    const performanceResults = await this.analyzePerformance();
    
    // 4. 결과 요약
    console.log('\n📋 검토 결과 요약:');
    console.log(`  🕐 시간: ${new Date().toISOString()}`);
    console.log(`  🌐 배포 상태: ${deploymentStatus.healthy ? '✅ 정상' : '❌ 오류'}`);
    console.log(`  🧪 기능 테스트: ${failedTests.length === 0 ? '✅ 통과' : `❌ ${failedTests.length}개 실패`}`);
    console.log(`  📊 성능: ${Object.keys(performanceResults).length}개 지표 측정`);
    
    // 5. 보고서 생성
    await this.generateReport({
      deploymentStatus,
      functionalityResults,
      performanceResults
    });
    
    return deploymentStatus.healthy && failedTests.length === 0;
  }

  /**
   * 검토 보고서 생성
   */
  async generateReport(data) {
    const report = {
      timestamp: new Date().toISOString(),
      deployment: data.deploymentStatus,
      functionality: data.functionalityResults,
      performance: data.performanceResults,
      summary: {
        healthy: data.deploymentStatus.healthy,
        testsPassed: data.functionalityResults.filter(r => r.success).length,
        testsTotal: data.functionalityResults.length
      }
    };
    
    const reportPath = path.join(process.cwd(), 'deploy-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`📄 검토 보고서 생성: ${reportPath}`);
  }

  /**
   * 유틸리티: 대기
   */
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI 실행
if (require.main === module) {
  const autoDeploy = new AutoDeploy();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'wait':
      autoDeploy.waitForDeployment().then(success => {
        process.exit(success ? 0 : 1);
      });
      break;
    case 'test':
      autoDeploy.testSiteFunctionality().then(() => {
        process.exit(0);
      });
      break;
    case 'review':
      autoDeploy.runFullReview().then(success => {
        process.exit(success ? 0 : 1);
      });
      break;
    case 'help':
    default:
      console.log(`
🚀 자동 배포 검토 도구

사용법:
  node scripts/auto-deploy.js wait     # 배포 완료 대기
  node scripts/auto-deploy.js test      # 기능 테스트만 실행
  node scripts/auto-deploy.js review    # 종합 검토 실행
  node scripts/auto-deploy.js help       # 도움말 표시

환경변수:
  GITHUB_TOKEN          # GitHub API 토큰
  GITHUB_REPOSITORY     # GitHub 저장소 (자동 설정)
      `);
      break;
  }
}

module.exports = AutoDeploy;
