'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'
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
} from 'lucide-react'

const heroFeatures = [
  {
    name: 'Tap to Pay',
    description: 'Accept payments directly on your iPhone or Android. No card readers, dongles, or proprietary hardware needed.',
    icon: Smartphone,
    color: 'primary',
  },
  {
    name: 'Transparent Pricing',
    description: '2.7% + $0.15 per tap. No hidden fees, no fund holds, instant payouts available.',
    icon: DollarSign,
    color: 'green',
  },
  {
    name: 'Live Dashboard',
    description: 'Watch transactions flow in real-time. Track sales, tips, and inventory as they happen.',
    icon: BarChart3,
    color: 'purple',
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
    name: 'Fully Customizable',
    description: 'Add your own inventory, menu items, and subscriptions to sell.',
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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'from-green-500/20 to-green-500/10',
          icon: 'text-green-500',
          border: 'border-green-500/20',
        }
      case 'purple':
        return {
          bg: 'from-purple-500/20 to-purple-500/10',
          icon: 'text-purple-500',
          border: 'border-purple-500/20',
        }
      default:
        return {
          bg: 'from-primary/20 to-primary/10',
          icon: 'text-primary',
          border: 'border-primary/20',
        }
    }
  }

  // Mobile version - with subtle CSS fade-in
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

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
            {heroFeatures.map((feature) => {
              const Icon = feature.icon
              const colors = getColorClasses(feature.color)
              return (
                <div
                  key={feature.name}
                  className={`relative p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border ${colors.border} group`}
                >
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4 sm:mb-6`}>
                    <Icon className={`h-5 w-5 sm:h-7 sm:w-7 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                    {feature.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 p-5 sm:p-8 md:p-10">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-5 sm:mb-6 text-center">
                Everything else you need
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6">
                {additionalFeatures.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.name} className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-800 flex items-center justify-center">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm sm:text-base mb-0.5 sm:mb-1">{feature.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop version - with animations
  return (
    <section className="section-padding bg-black relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-black" />

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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {heroFeatures.map((feature, index) => {
            const Icon = feature.icon
            const colors = getColorClasses(feature.color)
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border ${colors.border} group`}
              >
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4 sm:mb-6`}>
                  <Icon className={`h-5 w-5 sm:h-7 sm:w-7 ${colors.icon}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {feature.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 p-5 sm:p-8 md:p-10">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-5 sm:mb-6 text-center">
              Everything else you need
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6">
              {additionalFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.name} className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-800 flex items-center justify-center">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm sm:text-base mb-0.5 sm:mb-1">{feature.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
