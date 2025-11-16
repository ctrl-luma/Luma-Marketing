import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogGrid from '@/components/BlogGrid'
import Newsletter from '@/components/Newsletter'

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 mb-6">Blog - News and Updates</h1>
              <p className="text-lead text-gray-300">
                Tips for mobile bar operators, product updates, and insights 
                from the event industry.
              </p>
            </div>
          </div>
        </section>
        <BlogGrid />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}