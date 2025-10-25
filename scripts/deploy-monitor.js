#!/usr/bin/env node

/**
 * Vercel 배포 모니터링 및 자동 검토 스크립트
 * GitHub Actions와 연동하여 배포 상태를 실시간으로 모니터링
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 설정
const CONFIG = {
  GITHUB_REPO: 'cousorai/4_tennis',
  VERCEL_PROJECT: 'tennisfrends',
  SITE_URL: 'https://tennisfrends.vercel.app',
  CHECK_INTERVAL: 30000, // 30초
  MAX_RETRIES: 10,
  WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL
};

class DeployMonitor {
  constructor() {
    this.deployments = [];
    this.lastCheck = null;
    this.isRunning = false;
  }

  /**
   * GitHub API를 통해 최근 커밋과 배포 상태 확인
   */
  async checkGitHubStatus() {
    try {
      const response = await this.fetchGitHubAPI(`/repos/${CONFIG.GITHUB_REPO}/commits?per_page=5`);
      const commits = JSON.parse(response);
      
      console.log(`📊 최근 커밋 ${commits.length}개 확인`);
      
      for (const commit of commits) {
        const commitData = {
          sha: commit.sha,
          message: commit.commit.message,
          author: commit.commit.author.name,
          date: commit.commit.author.date,
          url: commit.html_url
        };
        
        console.log(`  📝 ${commitData.sha.substring(0, 7)}: ${commitData.message}`);
      }
      
      return commits;
    } catch (error) {
      console.error('❌ GitHub 상태 확인 실패:', error.message);
      return [];
    }
  }

  /**
   * Vercel 사이트 상태 확인
   */
  async checkVercelStatus() {
    try {
      const response = await this.fetchURL(CONFIG.SITE_URL);
      const isHealthy = response.status === 200;
      
      console.log(`🌐 Vercel 사이트 상태: ${isHealthy ? '✅ 정상' : '❌ 오류'} (${response.status})`);
      
      return {
        status: response.status,
        healthy: isHealthy,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Vercel 사이트 확인 실패:', error.message);
      return {
        status: 'error',
        healthy: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * 배포 상태 종합 분석
   */
  async analyzeDeployment() {
    console.log('\n🔍 배포 상태 분석 시작...\n');
    
    const [commits, siteStatus] = await Promise.all([
      this.checkGitHubStatus(),
      this.checkVercelStatus()
    ]);
    
    const analysis = {
      timestamp: new Date().toISOString(),
      commits: commits.length,
      siteHealthy: siteStatus.healthy,
      siteStatus: siteStatus.status,
      lastCommit: commits[0] || null,
      issues: []
    };
    
    // 문제점 분석
    if (!siteStatus.healthy) {
      analysis.issues.push('사이트 접속 불가');
    }
    
    if (commits.length === 0) {
      analysis.issues.push('최근 커밋 없음');
    }
    
    // 결과 출력
    console.log('\n📋 배포 분석 결과:');
    console.log(`  🕐 시간: ${analysis.timestamp}`);
    console.log(`  📝 커밋 수: ${analysis.commits}`);
    console.log(`  🌐 사이트 상태: ${analysis.siteHealthy ? '✅ 정상' : '❌ 오류'}`);
    console.log(`  🚨 문제점: ${analysis.issues.length > 0 ? analysis.issues.join(', ') : '없음'}`);
    
    if (analysis.issues.length > 0) {
      console.log('\n🔧 자동 수정 시도...');
      await this.attemptAutoFix(analysis);
    }
    
    return analysis;
  }

  /**
   * 자동 수정 시도
   */
  async attemptAutoFix(analysis) {
    console.log('🔧 자동 수정 프로세스 시작...');
    
    // 1. 사이트 재배포 시도
    if (!analysis.siteHealthy) {
      console.log('  🔄 사이트 재배포 시도...');
      try {
        // GitHub API를 통해 새로운 배포 트리거
        await this.triggerRedeploy();
        console.log('  ✅ 재배포 트리거 완료');
      } catch (error) {
        console.error('  ❌ 재배포 실패:', error.message);
      }
    }
    
    // 2. 알림 전송
    if (CONFIG.WEBHOOK_URL) {
      await this.sendNotification(analysis);
    }
  }

  /**
   * 재배포 트리거
   */
  async triggerRedeploy() {
    // GitHub Actions 워크플로우 트리거
    const workflowData = {
      ref: 'main'
    };
    
    try {
      await this.fetchGitHubAPI(`/repos/${CONFIG.GITHUB_REPO}/actions/workflows/deploy.yml/dispatches`, {
        method: 'POST',
        body: JSON.stringify(workflowData)
      });
    } catch (error) {
      console.error('워크플로우 트리거 실패:', error.message);
    }
  }

  /**
   * 알림 전송
   */
  async sendNotification(analysis) {
    const message = {
      text: `🚀 Vercel 배포 상태 알림`,
      attachments: [{
        color: analysis.siteHealthy ? 'good' : 'danger',
        fields: [
          { title: '사이트 상태', value: analysis.siteHealthy ? '✅ 정상' : '❌ 오류', short: true },
          { title: '최근 커밋', value: analysis.commits, short: true },
          { title: '문제점', value: analysis.issues.length > 0 ? analysis.issues.join(', ') : '없음', short: false },
          { title: '시간', value: analysis.timestamp, short: true }
        ]
      }]
    };
    
    try {
      await this.fetchURL(CONFIG.WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(message)
      });
      console.log('📢 알림 전송 완료');
    } catch (error) {
      console.error('❌ 알림 전송 실패:', error.message);
    }
  }

  /**
   * HTTP 요청 헬퍼
   */
  async fetchURL(url, options = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'DeployMonitor/1.0',
          'Content-Type': 'application/json',
          ...options.headers
        }
      };
      
      const req = https.request(requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data
          });
        });
      });
      
      req.on('error', reject);
      
      if (options.body) {
        req.write(options.body);
      }
      
      req.end();
    });
  }

  /**
   * GitHub API 요청
   */
  async fetchGitHubAPI(endpoint, options = {}) {
    const url = `https://api.github.com${endpoint}`;
    const headers = {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      ...options.headers
    };
    
    return this.fetchURL(url, { ...options, headers });
  }

  /**
   * 모니터링 시작
   */
  async start() {
    if (this.isRunning) {
      console.log('⚠️ 모니터링이 이미 실행 중입니다.');
      return;
    }
    
    this.isRunning = true;
    console.log('🚀 Vercel 배포 모니터링 시작...\n');
    
    // 초기 분석
    await this.analyzeDeployment();
    
    // 주기적 모니터링
    const interval = setInterval(async () => {
      if (!this.isRunning) {
        clearInterval(interval);
        return;
      }
      
      console.log('\n⏰ 정기 상태 확인...');
      await this.analyzeDeployment();
    }, CONFIG.CHECK_INTERVAL);
    
    // 종료 처리
    process.on('SIGINT', () => {
      console.log('\n🛑 모니터링 중지...');
      this.isRunning = false;
      clearInterval(interval);
      process.exit(0);
    });
  }

  /**
   * 모니터링 중지
   */
  stop() {
    this.isRunning = false;
  }
}

// CLI 실행
if (require.main === module) {
  const monitor = new DeployMonitor();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      monitor.start();
      break;
    case 'check':
      monitor.analyzeDeployment().then(() => process.exit(0));
      break;
    case 'help':
    default:
      console.log(`
🚀 Vercel 배포 모니터링 도구

사용법:
  node scripts/deploy-monitor.js start    # 지속적 모니터링 시작
  node scripts/deploy-monitor.js check    # 한 번만 상태 확인
  node scripts/deploy-monitor.js help     # 도움말 표시

환경변수:
  GITHUB_TOKEN          # GitHub API 토큰 (선택사항)
  DISCORD_WEBHOOK_URL    # Discord 웹훅 URL (선택사항)
  SLACK_WEBHOOK_URL      # Slack 웹훅 URL (선택사항)
      `);
      break;
  }
}

module.exports = DeployMonitor;
