"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

interface BlogTopic {
  id: string
  title: string
  category: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'high' | 'medium' | 'low'
  estimatedTime: string
  keywords: string[]
}

const blogTopics: BlogTopic[] = [
  {
    id: 'ntrp-guide-2024',
    title: 'NTRP 레벨 완벽 가이드: 1.5부터 5.0+까지',
    category: '실력 향상',
    status: 'completed',
    priority: 'high',
    estimatedTime: '8분',
    keywords: ['NTRP', '실력 측정', '가이드']
  },
  {
    id: 'tennis-racket-selection',
    title: '초보자를 위한 테니스 라켓 선택 가이드',
    category: '장비 & 기어',
    status: 'pending',
    priority: 'high',
    estimatedTime: '6분',
    keywords: ['라켓', '초보자', '장비 선택']
  },
  {
    id: 'tennis-strategy-basics',
    title: '테니스 전술의 기초: 포지셔닝과 샷 선택',
    category: '전술 & 전략',
    status: 'pending',
    priority: 'high',
    estimatedTime: '10분',
    keywords: ['전술', '포지셔닝', '전략']
  },
  {
    id: 'tennis-30day-challenge',
    title: '테니스 실력 향상을 위한 30일 챌린지',
    category: '실력 향상',
    status: 'pending',
    priority: 'medium',
    estimatedTime: '7분',
    keywords: ['실력 향상', '챌린지', '30일']
  },
  {
    id: 'tennis-beginner-roadmap',
    title: '초보자를 위한 첫 3개월 테니스 로드맵',
    category: '실력 향상',
    status: 'pending',
    priority: 'high',
    estimatedTime: '9분',
    keywords: ['초보자', '로드맵', '3개월']
  }
]

const categoryColors = {
  '실력 향상': 'bg-green-100 text-green-800',
  '장비 & 기어': 'bg-blue-100 text-blue-800',
  '전술 & 전략': 'bg-purple-100 text-purple-800',
  '훈련 & 연습': 'bg-orange-100 text-orange-800',
  '경기 & 대회': 'bg-red-100 text-red-800',
  '건강 & 부상': 'bg-pink-100 text-pink-800',
  '영양 & 생활': 'bg-yellow-100 text-yellow-800',
  '교육 & 학습': 'bg-indigo-100 text-indigo-800'
}

const priorityColors = {
  'high': 'bg-red-100 text-red-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'low': 'bg-gray-100 text-gray-800'
}

export default function BlogChecklist() {
  const [topics, setTopics] = useState<BlogTopic[]>(blogTopics)
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')

  const filteredTopics = topics.filter(topic => {
    if (filter === 'all') return true
    return topic.status === filter
  })

  const toggleStatus = (id: string) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === id) {
        const statusOrder = ['pending', 'in-progress', 'completed']
        const currentIndex = statusOrder.indexOf(topic.status)
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length] as 'pending' | 'in-progress' | 'completed'
        return { ...topic, status: nextStatus }
      }
      return topic
    }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'in-progress':
        return '🔄'
      default:
        return '⏳'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료'
      case 'in-progress':
        return '진행중'
      default:
        return '대기중'
    }
  }

  const stats = {
    total: topics.length,
    completed: topics.filter(t => t.status === 'completed').length,
    inProgress: topics.filter(t => t.status === 'in-progress').length,
    pending: topics.filter(t => t.status === 'pending').length
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-4">블로그 콘텐츠 관리</h1>
        <p className="text-[#334155] mb-6">
          테니스 관련 블로그 글 주제 100개를 체계적으로 관리하고 진행 상황을 추적합니다.
        </p>
        
        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#0F172A]">{stats.total}</div>
              <div className="text-sm text-[#64748B]">전체</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-[#64748B]">완료</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-sm text-[#64748B]">진행중</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
              <div className="text-sm text-[#64748B]">대기중</div>
            </CardContent>
          </Card>
        </div>

        {/* 필터 */}
        <div className="flex gap-2 mb-6">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            size="sm"
          >
            전체 ({stats.total})
          </Button>
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
            size="sm"
          >
            대기중 ({stats.pending})
          </Button>
          <Button 
            variant={filter === 'in-progress' ? 'default' : 'outline'}
            onClick={() => setFilter('in-progress')}
            size="sm"
          >
            진행중 ({stats.inProgress})
          </Button>
          <Button 
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
            size="sm"
          >
            완료 ({stats.completed})
          </Button>
        </div>
      </div>

      {/* 주제 목록 */}
      <div className="grid gap-4">
        {filteredTopics.map((topic) => (
          <Card key={topic.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => toggleStatus(topic.id)}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {getStatusIcon(topic.status)}
                    </button>
                    <h3 className="text-lg font-semibold text-[#0F172A]">
                      {topic.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={categoryColors[topic.category as keyof typeof categoryColors]}>
                      {topic.category}
                    </Badge>
                    <Badge className={priorityColors[topic.priority]}>
                      {topic.priority === 'high' ? '높음' : topic.priority === 'medium' ? '보통' : '낮음'}
                    </Badge>
                    <Badge variant="outline">
                      {topic.estimatedTime}
                    </Badge>
                    <Badge variant="secondary">
                      {getStatusText(topic.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {topic.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        #{keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="ml-4">
                  <Button variant="outline" size="sm">
                    편집
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-[#64748B]">
              {filter === 'all' ? '등록된 주제가 없습니다.' : 
               filter === 'pending' ? '대기중인 주제가 없습니다.' :
               filter === 'in-progress' ? '진행중인 주제가 없습니다.' :
               '완료된 주제가 없습니다.'}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
