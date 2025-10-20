export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F7F5F3] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#0BA360] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#64748B] text-lg">로딩 중...</p>
      </div>
    </div>
  )
}
