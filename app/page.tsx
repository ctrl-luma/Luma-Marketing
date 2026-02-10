import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import AppShowcase from '@/components/AppShowcase'
import EventsShowcase from '@/components/EventsShowcase'
import PreorderShowcase from '@/components/PreorderShowcase'
import Comparison from '@/components/Comparison'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import CTA from '@/components/CTA'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import SectionTracker from '@/components/SectionTracker'

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
          <SectionTracker section="hero"><Hero /></SectionTracker>
          <SectionTracker section="trusted_by"><TrustedBy /></SectionTracker>
          <SectionTracker section="how_it_works"><HowItWorks /></SectionTracker>
          <SectionTracker section="features"><Features /></SectionTracker>
          <SectionTracker section="app_showcase"><AppShowcase /></SectionTracker>
          <SectionTracker section="events_showcase"><EventsShowcase /></SectionTracker>
          <SectionTracker section="preorder_showcase"><PreorderShowcase /></SectionTracker>
          <SectionTracker section="comparison"><Comparison /></SectionTracker>
          <SectionTracker section="pricing"><Pricing /></SectionTracker>
          <SectionTracker section="faq"><FAQ /></SectionTracker>
          <SectionTracker section="cta"><CTA /></SectionTracker>
          <SectionTracker section="newsletter"><Newsletter /></SectionTracker>
        </main>
        <Footer />
      </div>
    </div>
  )
}