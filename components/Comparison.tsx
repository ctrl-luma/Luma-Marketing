'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { Check, AlertTriangle } from 'lucide-react'
import { getTierById } from '@/lib/pricing'
import StarryBackground from './StarryBackground'

const proTier = getTierById('pro')

const comparison = [
  {
    feature: 'Typical Monthly Cost',
    description: 'With tip pooling & team permissions',
    luma: proTier?.promoPrice ? `${proTier.promoPrice} first mo` : '$19.99 first mo',
    lumaSubtext: proTier?.regularPrice ? `then ${proTier.regularPrice}/mo` : 'then $29.99/mo',
    othersAvg: '$160/mo avg',
    othersWarning: true,
  },
  {
    feature: 'Hardware Cost',
    description: 'Use your own iPhone or Android',
    luma: '$0',
    othersAvg: '$600–1,800',
    othersWarning: true,
  },
  {
    feature: 'Tip Pooling',
    description: 'Split tips by hours, role, or custom rules',
    luma: 'Included with Pro',
    othersAvg: '+$50/mo avg',
    othersWarning: true,
  },
  {
    feature: 'Team Permissions',
    description: 'Control who can access what',
    luma: 'Included with Pro',
    othersAvg: '+$50/mo avg',
    othersWarning: true,
  },
  {
    feature: 'Event Ticketing',
    description: 'Sell tickets online with QR code scanning',
    luma: 'Base processing fee',
    lumaSubtext: 'No extra ticketing fee',
    othersAvg: '$1.79 + 6.6%/ticket',
    othersWarning: true,
  },
  {
    feature: 'Instant Payout Fee',
    description: 'Get paid same-day',
    luma: '1%',
    othersAvg: '1.75% or N/A',
    othersWarning: true,
  },
  {
    feature: 'Contract Required',
    description: 'Cancel anytime, no lock-in',
    luma: 'None',
    othersAvg: 'Up to 4 years',
    othersWarning: true,
  },
  {
    feature: 'Custom Menus',
    description: 'Switch menus & pricing per venue instantly',
    luma: 'Unlimited',
    othersAvg: 'Not available',
    othersWarning: true,
  },
]

function FeatureCard({ item }: { item: typeof comparison[number] }) {
  return (
    <div className="h-full flex flex-col bg-gray-900/60 border border-gray-800 rounded-2xl p-5 sm:p-6 backdrop-blur-sm hover:border-gray-700 transition-colors">
      {/* Feature name + description */}
      <div className="mb-4 flex-1">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
          <h3 className="font-semibold text-white text-sm sm:text-base">{item.feature}</h3>
        </div>
        {item.description && (
          <p className="text-xs sm:text-sm text-gray-500 ml-[18px]">{item.description}</p>
        )}
      </div>

      {/* Values row */}
      <div className="flex items-start gap-3">
        {/* Luma */}
        <div className="flex-1 min-h-[60px]">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Luma</div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            <Check className="w-3.5 h-3.5" />
            {item.luma}
          </span>
          {item.lumaSubtext && (
            <div className="text-[11px] text-gray-500 mt-1 ml-1">{item.lumaSubtext}</div>
          )}
        </div>

        {/* Industry */}
        <div className="flex-1 min-h-[60px]">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5">Industry Avg</div>
          {item.othersWarning ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
              <AlertTriangle className="w-3.5 h-3.5" />
              {item.othersAvg}
            </span>
          ) : (
            <span className="inline-flex items-center text-sm text-gray-400 bg-gray-800/60 px-3 py-1.5 rounded-full border border-gray-700/50">
              {item.othersAvg}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Desktop card with its own intersection observer
function AnimatedFeatureCard({ item, index, initialLoad }: { item: typeof comparison[number]; index: number; initialLoad: boolean }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const shouldAnimate = inView || initialLoad

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <FeatureCard item={item} />
    </motion.div>
  )
}

export default function Comparison() {
  const [isMobile, setIsMobile] = useState(true)
  const [initialLoad, setInitialLoad] = useState(false)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
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
    <section className="section-padding bg-black relative overflow-hidden">
      <StarryBackground subtle className="z-[1]" />
      {/* Background elements - hidden on mobile */}
      <div className="hidden lg:block absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div
        ref={isMobile ? fadeRef : undefined}
        className={`container relative z-10 ${isMobile ? `transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}` : ''}`}
      >
        {isMobile ? (
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="heading-2 mb-3 sm:mb-4 text-white">
              The hidden costs they don&apos;t tell you about
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Other POS systems nickel-and-dime you with extra fees. We don&apos;t.
            </p>
          </div>
        ) : (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            <h2 className="heading-2 mb-3 sm:mb-4 text-white">
              The hidden costs they don&apos;t tell you about
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Other POS systems nickel-and-dime you with extra fees. We don&apos;t.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
          {comparison.map((item, index) => (
            isMobile ? (
              <FeatureCard key={item.feature} item={item} />
            ) : (
              <AnimatedFeatureCard key={item.feature} item={item} index={index} initialLoad={initialLoad} />
            )
          ))}
        </div>
      </div>
    </section>
  )
}
