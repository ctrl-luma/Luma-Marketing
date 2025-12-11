import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import UseCases from '@/components/UseCases'
import Features from '@/components/Features'
import AppShowcase from '@/components/AppShowcase'
import Comparison from '@/components/Comparison'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="relative">
      {/* Top glow effect */}
      <div className="absolute top-0 left-0 right-0 z-[60]">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent z-30 pointer-events-none" />

      {/* Background gradients - hidden on mobile for performance */}
      <div className="hidden lg:block fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-primary/15 to-transparent" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 to-transparent" />
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <TrustedBy />
          <UseCases />
          <Features />
          <AppShowcase />
          <Comparison />
          <Pricing />
          <FAQ />
          <CTA />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </div>
  )
}