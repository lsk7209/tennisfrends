import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    서비스: [
      { name: '유틸리티', href: '/utility' },
      { name: '장비 백과', href: '/gear' },
      { name: '블로그', href: '/blog' },
    ],
    회사: [
      { name: '소개', href: '/about' },
      { name: '문의', href: '/contact' },
      { name: '보도자료', href: '/presskit' },
    ],
    정책: [
      { name: '이용약관', href: '/terms' },
      { name: '개인정보처리방침', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-neutral-ink text-white">
      <div className="container-custom-lg">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 브랜드 섹션 */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🎾</span>
                <span className="text-h3 font-bold">테니스프렌즈</span>
              </div>
              <p className="text-sub text-gray-300 mb-4">
                5분만에 내 실력/장비/훈련의 다음 3가지 행동을 알려주는 테니스 허브
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/subscribe"
                  className="btn-secondary text-white border-white hover:bg-white hover:text-neutral-ink"
                >
                  구독하기
                </Link>
              </div>
            </div>

            {/* 링크 섹션들 */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sub font-medium mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-cap text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 바 */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-cap text-gray-400">
              © {currentYear} 테니스프렌즈. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-cap text-gray-400">
                Made with ❤️ for tennis players
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
