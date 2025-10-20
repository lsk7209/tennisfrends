export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      {/* 헤더 스켈레톤 */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 브레드크럼 스켈레톤 */}
        <div className="mb-6">
          <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* 메인 콘텐츠 스켈레톤 */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
          <div className="p-6">
            {/* 제목 스켈레톤 */}
            <div className="space-y-4 mb-6">
              <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* 메타 정보 스켈레톤 */}
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* 이미지 스켈레톤 */}
            <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse mb-6"></div>

            {/* 목차 스켈레톤 */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-28 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* 본문 스켈레톤 */}
            <div className="space-y-4">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
