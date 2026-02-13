import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutHero from '@/components/AboutHero'
import Mission from '@/components/Mission'
import Newsletter from '@/components/Newsletter'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative z-10">
        <Header />
        <main>
          <AboutHero />
          <Mission />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </div>
  )
}