import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  category: string
  publishDate: string
  author: string
  slug: string
  featuredImage?: string
  readTime?: string
  tags?: string[]
}

export function generateBlogMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    category,
    publishDate,
    author,
    slug,
    featuredImage,
    readTime,
    tags = []
  } = config

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tennisfriends.co.kr'
  const blogUrl = `${siteUrl}/blog/${slug}`
  const ogImage = featuredImage || `${siteUrl}/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`

  // SEO 최적화된 제목 (60자 이내)
  const seoTitle = `${title} | 테니스프렌즈 블로그`
  const seoDescription = description.length > 160 ? description.substring(0, 157) + '...' : description

  // 구조화된 데이터 (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": author,
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "테니스프렌즈",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": publishDate,
    "dateModified": publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": blogUrl
    },
    "keywords": keywords.join(', '),
    "articleSection": category,
    "wordCount": readTime ? parseInt(readTime) * 200 : 2000, // 대략적인 단어 수
    "inLanguage": "ko-KR"
  }

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: '테니스프렌즈',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: blogUrl,
      siteName: '테니스프렌즈',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ko_KR',
      type: 'article',
      publishedTime: publishDate,
      modifiedTime: publishDate,
      authors: [author],
      section: category,
      tags: tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
      creator: '@tennisfriends',
      site: '@tennisfriends',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    other: {
      'article:author': author,
      'article:section': category,
      'article:tag': tags.join(','),
      'article:published_time': publishDate,
      'article:modified_time': publishDate,
    },
  }
}

// 바이럴 최적화를 위한 키워드 분석
export function analyzeViralKeywords(content: string): string[] {
  const viralKeywords = [
    '초보자', '완벽', '가이드', '비법', '팁', '꿀팁', '실력향상', '레벨업',
    '무료', '쉽게', '빠르게', '효과적', '확실한', '검증된', '전문가',
    '2024', '최신', '트렌드', '인기', '추천', '베스트', 'TOP',
    '비교', '분석', '리뷰', '후기', '경험담', '실제', '진짜',
    '궁금한', '알고싶은', '모르는', '잘못된', '오해', '진실'
  ]

  const foundKeywords = viralKeywords.filter(keyword => 
    content.toLowerCase().includes(keyword.toLowerCase())
  )

  return foundKeywords
}

// 가독성 점수 계산
export function calculateReadabilityScore(content: string): number {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const words = content.split(/\s+/).filter(w => w.length > 0)
  const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0)

  if (sentences.length === 0 || words.length === 0) return 0

  const avgWordsPerSentence = words.length / sentences.length
  const avgSyllablesPerWord = syllables / words.length

  // 간단한 가독성 점수 (0-100, 높을수록 읽기 쉬움)
  const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
  
  return Math.max(0, Math.min(100, Math.round(score)))
}

function countSyllables(word: string): number {
  const vowels = 'aeiouAEIOU'
  let count = 0
  let previousWasVowel = false

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i])
    if (isVowel && !previousWasVowel) {
      count++
    }
    previousWasVowel = isVowel
  }

  // 마지막이 'e'로 끝나는 경우 제외
  if (word.toLowerCase().endsWith('e') && count > 1) {
    count--
  }

  return Math.max(1, count)
}

// 콘텐츠 최적화 제안
export function getContentOptimizationSuggestions(content: string, targetKeywords: string[]): string[] {
  const suggestions: string[] = []
  
  // 키워드 밀도 체크
  const wordCount = content.split(/\s+/).length
  targetKeywords.forEach(keyword => {
    const keywordCount = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length
    const density = (keywordCount / wordCount) * 100
    
    if (density < 1) {
      suggestions.push(`"${keyword}" 키워드 밀도를 높여보세요. (현재: ${density.toFixed(2)}%)`)
    } else if (density > 3) {
      suggestions.push(`"${keyword}" 키워드 밀도가 너무 높습니다. (현재: ${density.toFixed(2)}%)`)
    }
  })

  // 제목 태그 체크
  const headingTags = content.match(/<h[1-6][^>]*>/gi) || []
  if (headingTags.length < 3) {
    suggestions.push('더 많은 제목 태그(H1, H2, H3)를 사용하여 구조를 개선하세요.')
  }

  // 이미지 alt 텍스트 체크
  const images = content.match(/<img[^>]*>/gi) || []
  const imagesWithAlt = content.match(/<img[^>]*alt=["'][^"']*["'][^>]*>/gi) || []
  if (images.length > 0 && imagesWithAlt.length < images.length) {
    suggestions.push('모든 이미지에 alt 텍스트를 추가하세요.')
  }

  // 내부 링크 체크
  const internalLinks = content.match(/href=["'][^"']*["']/gi) || []
  if (internalLinks.length < 2) {
    suggestions.push('더 많은 내부 링크를 추가하여 SEO를 개선하세요.')
  }

  return suggestions
}

// 소셜 미디어 최적화
export function generateSocialMediaContent(config: SEOConfig): {
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
} {
  const { title, description, category, tags = [] } = config
  
  const hashtags = tags.map(tag => `#${tag}`).join(' ')
  const categoryTag = `#${category.replace(/\s+/g, '')}`

  return {
    facebook: `${title}\n\n${description}\n\n${hashtags} ${categoryTag} #테니스프렌즈 #테니스`,
    twitter: `${title}\n\n${description}\n\n${hashtags} ${categoryTag} #테니스프렌즈`,
    instagram: `${title}\n\n${description}\n\n${hashtags} ${categoryTag} #테니스프렌즈 #테니스 #테니스팁`,
    linkedin: `${title}\n\n${description}\n\n테니스 실력 향상을 위한 전문적인 가이드입니다.\n\n${hashtags} ${categoryTag} #테니스프렌즈 #테니스 #스포츠`
  }
}
