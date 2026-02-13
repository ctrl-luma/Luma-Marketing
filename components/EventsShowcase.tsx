'use client'

import Image from 'next/image'
import { Ticket, QrCode, Wallet, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { event } from '@/lib/analytics'
import { useFadeIn } from '@/hooks/useFadeIn'

const features = [
  {
    icon: Ticket,
    title: 'Sell Tickets Online',
    description: 'Create events with multiple ticket tiers. Customers purchase directly from your branded event page.',
  },
  {
    icon: QrCode,
    title: 'QR Code Entry',
    description: 'Every ticket gets a unique QR code. Scan at the door with the Luma app — instant validation.',
  },
  {
    icon: Wallet,
    title: 'Apple & Google Wallet',
    description: 'Tickets auto-save to mobile wallets. No printing, no lost tickets, no hassle.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Sales',
    description: 'Track ticket sales, check-ins, and revenue as it happens. Export reports anytime.',
  },
]

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lumapos.co'
  const displayUrl = `${siteUrl.replace(/^https?:\/\//, '')}/events/summer-fest-2026`

  return (
    <div className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50">
      <div className="bg-gray-900 p-2 sm:p-3 flex items-center gap-2 border-b-0">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-2 sm:mx-4">
          <div className="bg-gray-800 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-400 max-w-sm mx-auto truncate">
            {displayUrl}
          </div>
        </div>
      </div>
      <div className="bg-gray-950">
        <Image src={src} alt={alt} width={800} height={600} className="w-full h-auto block" />
      </div>
    </div>
  )
}

export default function EventsShowcase() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="events-showcase" className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container relative z-10">
        <div ref={ref} className={`fade-in-section ${isVisible ? 'visible' : ''} text-center max-w-3xl mx-auto mb-8 sm:mb-12`}>
          <h2 className="fade-child heading-2 mb-4">
            Sell tickets, not just drinks
          </h2>
          <p className="fade-child text-base sm:text-lg text-gray-400">
            Host events, sell tickets online, and scan guests in — all from the same app you use for payments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Browser screenshot */}
          <div className={`fade-in-section from-left ${isVisible ? 'visible' : ''}`}>
            <BrowserFrame
              src="/screenshots/events.webp"
              alt="Luma event page showing ticket tiers and purchase options"
            />
          </div>

          {/* Features */}
          <div className={`fade-in-section from-right ${isVisible ? 'visible' : ''} space-y-6`}>
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="fade-child flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}

            {/* CTA */}
            <div className="fade-child pt-2">
              <Link
                href="/events"
                onClick={() => event('events_showcase_browse_click')}
                className="text-sm text-primary hover:text-primary-400 font-medium"
              >
                Browse upcoming events →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
