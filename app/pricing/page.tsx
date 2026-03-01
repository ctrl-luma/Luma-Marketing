import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingPageContent from '@/components/PricingPageContent'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Pricing & Rates — Luma POS',
  description: 'Transparent pricing for every country. See exactly what you pay per transaction with Luma — Stripe processing fees plus our small platform fee. No hidden costs.',
}

export default async function PricingPage() {
  const cookieStore = await cookies()
  const detectedCountry = cookieStore.get('luma-country')?.value || 'US'

  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative z-10">
        <Header />
        <main>
          <PricingPageContent detectedCountry={detectedCountry} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
