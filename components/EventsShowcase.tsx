'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Ticket, QrCode, Wallet, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { event } from '@/lib/analytics'
import StarryBackground from './StarryBackground'

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
  // Check if navigating to home page with any hash (from another page)
  const [initialLoad, setInitialLoad] = useState(false)
  useEffect(() => {
    if (window.location.hash) {
      setInitialLoad(true)
    }
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const shouldAnimate = inView || initialLoad

  return (
    <section id="events-showcase" className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden scroll-mt-24">
      <StarryBackground subtle className="z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="heading-2 mb-4"
          >
            Sell tickets, not just drinks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-gray-400"
          >
            Host events, sell tickets online, and scan guests in — all from the same app you use for payments.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Browser screenshot */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.96 }}
            animate={shouldAnimate ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserFrame
              src="/screenshots/events.webp"
              alt="Luma event page showing ticket tiers and purchase options"
            />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="pt-2"
            >
              <Link
                href="/events"
                onClick={() => event('events_showcase_browse_click')}
                className="text-sm text-primary hover:text-primary-400 font-medium"
              >
                Browse upcoming events →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
