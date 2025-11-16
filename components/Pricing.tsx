'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for new mobile bars and pop-ups',
    features: [
      '2.9% + $0.09 per tap',
      'Tap to Pay on iPhone/Android',
      'Simple menu builder',
      'Basic tip tracking',
      'Event mode',
      'Daily payout summary',
      '1-2 devices',
    ],
    notIncluded: [
      'Revenue splits',
      'Multi-device support',
      'Advanced analytics',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For established mobile bars running regular events',
    features: [
      '2.8% + $0.07 per tap',
      'Everything in Starter',
      'Unlimited events & locations',
      'Up to 10 devices',
      'Revenue splits (venue/promoter)',
      'Tip pooling & tip-out rules',
      'Analytics dashboard',
      'Export to CSV/PDF',
      'Event templates',
    ],
    notIncluded: [],
    cta: 'Get Pro',
    highlighted: true,
  },
  {
    name: 'High-Volume',
    price: 'Custom',
    period: '',
    description: 'For multi-bar operators and festival organizers',
    features: [
      'As low as 2.6% + $0.05',
      'Everything in Pro',
      'Unlimited devices',
      'Priority support & SLA',
      'Multi-venue rollups',
      'Staff performance reports',
      'Custom branding available',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function Pricing() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden" id="pricing">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary/15 to-transparent rounded-full blur-light opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-light opacity-30" />
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-4 text-white"
          >
            Lower fees than Square. No contracts.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lead text-gray-300"
          >
            Start free, scale as you grow. Powered by Stripe with transparent, 
            event-friendly pricing. Cancel anytime.
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <div className="md:grid md:grid-cols-3 md:gap-8 mt-8 md:px-0 overflow-x-auto md:overflow-visible scrollbar-hide">
            <div className="flex md:contents gap-4 px-4 md:px-0 pb-4 md:pb-0 snap-x snap-mandatory">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl md:rounded-2xl p-4 md:p-8 overflow-visible transition-all duration-500 group flex flex-col min-h-[400px] md:min-h-[600px] flex-shrink-0 w-[280px] md:w-auto snap-center ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-primary-800 to-primary-900 text-white shadow-2xl shadow-primary/20 border-2 border-primary-600 md:mt-6 scale-105 md:scale-100'
                  : 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 z-20 whitespace-nowrap">
                  Most Popular
                </span>
              )}
              
              {/* Animated gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                tier.highlighted 
                  ? 'from-primary-700/20 via-primary-800/10 to-transparent' 
                  : 'from-primary/10 via-primary/5 to-transparent'
              }`} />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 -z-10" />

              <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8">
                <h3 className={`text-2xl font-bold ${
                  tier.highlighted ? 'text-white' : 'text-gray-100'
                }`}>
                  {tier.name}
                </h3>
                <p className={`mt-2 text-sm ${
                  tier.highlighted ? 'text-primary-100' : 'text-gray-400'
                }`}>
                  {tier.description}
                </p>
                <div className="mt-6">
                  <span className={`text-4xl font-bold ${
                    tier.highlighted ? 'text-white' : 'text-gray-100'
                  }`}>
                    {tier.price}
                  </span>
                  <span className={`text-lg ${
                    tier.highlighted ? 'text-primary-100' : 'text-gray-400'
                  }`}>
                    {tier.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
                      tier.highlighted ? 'text-primary-100' : 'text-primary'
                    }`} />
                    <span className={`text-sm ${
                      tier.highlighted ? 'text-primary-50' : 'text-gray-300'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
                {tier.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start opacity-60">
                    <X className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-gray-600" />
                    <span className="text-sm text-gray-500 line-through">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={`/get-started?tier=${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="block">
                <Button
                  variant={tier.highlighted ? 'secondary' : 'primary'}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Link>
              </div>
            </motion.div>
          ))}
            </div>
          </div>
          
          {/* Mobile scroll indicator */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex gap-2">
              {tiers.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === 1 ? 'w-8 bg-primary' : 'w-4 bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}