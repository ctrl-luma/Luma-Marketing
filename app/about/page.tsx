import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutHero from '@/components/AboutHero'
import Mission from '@/components/Mission'
import Team from '@/components/Team'
import Newsletter from '@/components/Newsletter'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <Mission />
        <Team />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}