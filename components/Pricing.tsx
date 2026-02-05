'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { pricingTiers, type PricingTier } from '@/lib/pricing'
import StarryBackground from './StarryBackground'
import { event } from '@/lib/analytics'

export default function Pricing() {
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

  const PricingCard = ({ tier }: { tier: PricingTier, index: number }) => (
    <div
      className={`relative rounded-2xl p-6 sm:p-7 md:p-8 overflow-visible flex flex-col transition-all duration-300 ${
        tier.highlighted
          ? 'bg-gradient-to-br from-primary/20 via-primary/10 to-gray-900 text-white shadow-xl shadow-primary/10 border-2 border-primary/50 ring-1 ring-primary/20'
          : 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-gray-600'
      }`}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-primary/20 z-20 whitespace-nowrap">
          Most Popular
        </span>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 sm:mb-6">
          <h3 className={`text-xl sm:text-2xl font-bold ${
            tier.highlighted ? 'text-white' : 'text-gray-100'
          }`}>
            {tier.name}
          </h3>
          <p className={`mt-1.5 sm:mt-2 text-xs sm:text-sm ${
            tier.highlighted ? 'text-primary-100' : 'text-gray-400'
          }`}>
            {tier.description}
          </p>
          <div className="mt-3 sm:mt-4">
            {tier.trialDays && (
              <div className="inline-block bg-green-500/20 text-green-400 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-2 border border-green-500/30">
                {tier.trialDays}-day free trial
              </div>
            )}
            {tier.promoPrice ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-bold ${
                    tier.highlighted ? 'text-white' : 'text-gray-100'
                  }`}>
                    {tier.promoPrice}
                  </span>
                  <span className={`text-base sm:text-lg line-through opacity-50 ${
                    tier.highlighted ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {tier.regularPrice}
                  </span>
                </div>
                <div className={`text-xs sm:text-sm mt-1 ${
                  tier.highlighted ? 'text-primary-100' : 'text-gray-400'
                }`}>
                  <span className="text-green-400 font-medium">{tier.promoPeriod}</span>
                  <span className="mx-1">•</span>
                  <span>then {tier.regularPrice}/month</span>
                </div>
              </>
            ) : (
              <>
                <span className={`text-4xl sm:text-5xl font-bold ${
                  tier.highlighted ? 'text-white' : 'text-gray-100'
                }`}>
                  {tier.price}
                </span>
                <span className={`text-lg sm:text-xl ${
                  tier.highlighted ? 'text-primary-100' : 'text-gray-400'
                }`}>
                  {tier.period}
                </span>
              </>
            )}
          </div>
        </div>

        <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
          <li className="flex items-start">
            <Check className={`h-4 w-4 sm:h-5 sm:w-5 mr-2.5 sm:mr-3 mt-0.5 flex-shrink-0 ${
              tier.highlighted ? 'text-primary-100' : 'text-primary'
            }`} />
            <span className={`text-xs sm:text-sm font-medium ${
              tier.highlighted ? 'text-primary-50' : 'text-gray-300'
            }`}>
              {tier.transactionFee}
            </span>
          </li>
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <Check className={`h-4 w-4 sm:h-5 sm:w-5 mr-2.5 sm:mr-3 mt-0.5 flex-shrink-0 ${
                tier.highlighted ? 'text-primary-100' : 'text-primary'
              }`} />
              <span className={`text-xs sm:text-sm ${
                tier.highlighted ? 'text-primary-50' : 'text-gray-300'
              }`}>
                {feature}
              </span>
            </li>
          ))}
          {tier.notIncluded.map((feature) => (
            <li key={feature} className="flex items-start opacity-60">
              <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2.5 sm:mr-3 mt-0.5 flex-shrink-0 text-gray-600" />
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Link href={`/get-started?tier=${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="block" onClick={() => event(`cta_pricing_${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`)}>
          <Button
            variant={tier.highlighted ? 'secondary' : 'primary'}
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base"
          >
            {tier.cta}
          </Button>
        </Link>
      </div>
    </div>
  )

  // Mobile version - with subtle CSS fade-in
  if (isMobile) {
    return (
      <section className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden" id="pricing">
        <StarryBackground subtle className="z-[1]" />
        <div
          ref={fadeRef}
          className={`container relative z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="heading-2 mb-3 sm:mb-4 text-white">
              Lower Fees. No Contracts.
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Start free, scale as you grow. Powered by Stripe with transparent,
              event-friendly pricing. Cancel anytime.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-0">
              {pricingTiers.map((tier, index) => (
                <PricingCard key={tier.name} tier={tier} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop version - with animations
  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden" id="pricing">
      <StarryBackground subtle className="z-[1]" />
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary/15 to-transparent rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl opacity-30" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-3 sm:mb-4 text-white"
          >
            Lower Fees. No Contracts.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-300"
          >
            Start free, scale as you grow. Powered by Stripe with transparent,
            event-friendly pricing. Cancel anytime.
          </motion.p>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-0">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-6 sm:p-7 md:p-8 overflow-visible transition-all duration-300 group flex flex-col ${
                  tier.highlighted
                    ? 'bg-gradient-to-br from-primary/20 via-primary/10 to-gray-900 text-white shadow-xl shadow-primary/10 border-2 border-primary/50 ring-1 ring-primary/20'
                    : 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-gray-600'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-primary/20 z-20 whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                  tier.highlighted
                    ? 'from-primary-700/20 via-primary-800/10 to-transparent'
                    : 'from-primary/10 via-primary/5 to-transparent'
                }`} />

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 sm:mb-6">
                    <h3 className={`text-xl sm:text-2xl font-bold ${
                      tier.highlighted ? 'text-white' : 'text-gray-100'
                    }`}>
                      {tier.name}
                    </h3>
                    <p className={`mt-1.5 sm:mt-2 text-xs sm:text-sm ${
                      tier.highlighted ? 'text-primary-100' : 'text-gray-400'
                    }`}>
                      {tier.description}
                    </p>
                    <div className="mt-3 sm:mt-4">
                      {tier.trialDays && (
                        <div className="inline-block bg-green-500/20 text-green-400 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-2 border border-green-500/30">
                          {tier.trialDays}-day free trial
                        </div>
                      )}
                      {tier.promoPrice ? (
                        <>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-4xl sm:text-5xl font-bold ${
                              tier.highlighted ? 'text-white' : 'text-gray-100'
                            }`}>
                              {tier.promoPrice}
                            </span>
                            <span className={`text-base sm:text-lg line-through opacity-50 ${
                              tier.highlighted ? 'text-gray-300' : 'text-gray-500'
                            }`}>
                              {tier.regularPrice}
                            </span>
                          </div>
                          <div className={`text-xs sm:text-sm mt-1 ${
                            tier.highlighted ? 'text-primary-100' : 'text-gray-400'
                          }`}>
                            <span className="text-green-400 font-medium">{tier.promoPeriod}</span>
                            <span className="mx-1">•</span>
                            <span>then {tier.regularPrice}/month</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className={`text-4xl sm:text-5xl font-bold ${
                            tier.highlighted ? 'text-white' : 'text-gray-100'
                          }`}>
                            {tier.price}
                          </span>
                          <span className={`text-lg sm:text-xl ${
                            tier.highlighted ? 'text-primary-100' : 'text-gray-400'
                          }`}>
                            {tier.period}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                    <li className="flex items-start">
                      <Check className={`h-4 w-4 sm:h-5 sm:w-5 mr-2.5 sm:mr-3 mt-0.5 flex-shrink-0 ${
                        tier.highlighted ? 'text-primary-100' : 'text-primary'
                      }`} />
                      <span className={`text-xs sm:text-sm font-medium ${
                        tier.highlighted ? 'text-primary-50' : 'text-gray-300'
                      }`}>
                        {tier.transactionFee}
                      </span>
                    </li>
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className={`h-4 w-4 sm:h-5 sm:w-5 mr-2.5 sm:mr-3 mt-0.5 flex-shrink-0 ${
                          tier.highlighted ? 'text-primary-100' : 'text-primary'
                        }`} />
                        <span className={`text-xs sm:text-sm ${
                          tier.highlighted ? 'text-primary-50' : 'text-gray-300'
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                    {tier.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start opacity-60">
                        <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2.5 sm:mr-3 mt-0.5 flex-shrink-0 text-gray-600" />
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/get-started?tier=${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="block" onClick={() => event(`cta_pricing_${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`)}>
                    <Button
                      variant={tier.highlighted ? 'secondary' : 'primary'}
                      className="w-full py-2.5 sm:py-3 text-sm sm:text-base"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
