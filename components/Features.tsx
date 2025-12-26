'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import {
  Smartphone,
  DollarSign,
  Calendar,
  Users,
  Settings,
  Receipt,
  Split,
  BarChart3,
  Zap,
} from 'lucide-react'
import { getTierById } from '@/lib/pricing'

const proTier = getTierById('pro')

const heroFeatures = [
  {
    name: 'Tap to Pay',
    description: 'Accept payments directly on your iPhone or Android. No card readers, dongles, or proprietary hardware needed.',
    icon: Smartphone,
  },
  {
    name: 'Transparent Pricing',
    description: `${proTier?.transactionFee?.replace(' per tap', '')}. No hidden fees, no fund holds, instant payouts available.`,
    icon: DollarSign,
  },
  {
    name: 'Live Dashboard',
    description: 'Watch transactions flow in real-time. Track sales, tips, and inventory as they happen.',
    icon: BarChart3,
  },
]

const additionalFeatures = [
  {
    name: 'Event Mode',
    description: 'Switch between events instantly. Clone last week\'s setup in one tap.',
    icon: Calendar,
  },
  {
    name: 'Revenue Splits',
    description: 'Auto-split payments between operators, venues, and promoters.',
    icon: Split,
  },
  {
    name: 'Custom Catalogs',
    description: 'Different menus and pricing for each venue. Switch with one tap.',
    icon: Settings,
  },
  {
    name: 'Instant Reports',
    description: 'Export sales, tips, and best sellers to PDF or Sheets.',
    icon: Receipt,
  },
  {
    name: 'Multi-Device Sync',
    description: 'All devices stay in sync. Updates appear everywhere instantly.',
    icon: Users,
  },
  {
    name: 'Instant Payouts',
    description: 'Get your money fast. Access funds within minutes instead of waiting days.',
    icon: Zap,
  },
]

export default function Features() {
  const [isMobile, setIsMobile] = useState(true)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Mobile version
  if (isMobile) {
    return (
      <section className="section-padding bg-black relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-black" />

        <div
          ref={fadeRef}
          className={`container relative z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="heading-2 mb-3 sm:mb-4">
              Built for Mobile Bars & Pop-ups
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Everything you need to run events efficiently. From setup to settlement
              in minutes, not hours.
            </p>
          </div>

          {/* Hero features - larger cards */}
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mb-12 sm:mb-16 items-stretch">
            {heroFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.name}
                  className="relative p-5 sm:p-6 rounded-2xl bg-gray-900/80 border border-gray-800 group h-full"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Additional features - clean grid */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6 text-center">
              Everything else you need
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {additionalFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.name}
                    className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 transition-colors h-full"
                  >
                    <Icon className="h-5 w-5 text-primary mb-2" />
                    <h4 className="font-medium text-white text-sm mb-1">{feature.name}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop version
  return (
    <section className="section-padding bg-black relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-black" />

      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-3 sm:mb-4"
          >
            Built for Mobile Bars & Pop-ups
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-400"
          >
            Everything you need to run events efficiently. From setup to settlement
            in minutes, not hours.
          </motion.p>
        </div>

        {/* Hero features - prominent cards with glow */}
        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-16 items-stretch">
          {heroFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full"
              >
                {/* Hover glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6 sm:p-8 rounded-2xl bg-gray-900/90 border border-gray-800 group-hover:border-primary/30 transition-colors duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional features - 3x2 grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8 text-center">
            Everything else you need
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  className="group p-5 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 hover:bg-gray-900/80 transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">{feature.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
