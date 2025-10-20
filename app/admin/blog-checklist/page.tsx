import BlogChecklist from '@/components/blog-checklist'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function BlogChecklistPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F3]">
      <Header />
      <BlogChecklist />
      <Footer />
    </div>
  )
}
