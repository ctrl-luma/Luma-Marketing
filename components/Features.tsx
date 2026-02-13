'use client'

import {
  Smartphone,
  DollarSign,

  Users,
  Settings,
  Receipt,
  Split,
  BarChart3,
  Zap,
} from 'lucide-react'
import { getTierById } from '@/lib/pricing'
import { useFadeIn } from '@/hooks/useFadeIn'

const proTier = getTierById('pro')

const audiencePills = ['Mobile Bars', 'Food Trucks', 'Event Vendors', 'Pop-up Shops']

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
    name: 'Team Management',
    description: 'Add staff, assign roles, and track who sold what. Perfect for busy events.',
    icon: Users,
  },
  {
    name: 'Revenue Splits',
    description: 'Auto-split payments between operators, venues, and promoters.',
    icon: Split,
  },
  {
    name: 'Custom Menus',
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
    icon: Smartphone,
  },
  {
    name: 'Instant Payouts',
    description: 'Get your money fast. Access funds within minutes instead of waiting days.',
    icon: Zap,
  },
]

export default function Features() {
  const { ref, isVisible } = useFadeIn()

  // Separate observer for bottom section
  const { ref: bottomRef, isVisible: bottomVisible } = useFadeIn()

  return (
    <section className="section-padding bg-black relative overflow-hidden scroll-mt-24" id="features">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-black" />


      <div className="container relative z-10">
        <div ref={ref} className={`fade-in-section ${isVisible ? 'visible' : ''} text-center max-w-3xl mx-auto mb-10 sm:mb-16`}>
          <h2 className="fade-child heading-2 mb-3 sm:mb-4">
            Everything you need to run events
          </h2>
          <p className="fade-child text-base sm:text-lg text-gray-400">
            From weddings to farmer&apos;s markets. Set up in minutes, not hours.
          </p>
          <div className="fade-child flex flex-wrap justify-center gap-2 mt-4 sm:mt-5">
            {audiencePills.map((pill) => (
              <span
                key={pill}
                className="px-3 py-1 text-sm text-gray-300 border border-gray-700 rounded-full"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Hero features - prominent cards with glow */}
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 mb-16 items-stretch">
          {heroFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.name}
                className="group relative h-full"
              >
                {/* Hover glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6 sm:p-8 rounded-2xl bg-gray-900/90 border border-gray-800 border-t-2 border-t-primary/60 group-hover:border-primary/30 group-hover:border-t-primary transition-colors duration-300 h-full">
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
              </div>
            )
          })}
        </div>

        {/* Additional features - 3x2 grid */}
        <div
          ref={bottomRef}
          className={`fade-in-section ${bottomVisible ? 'visible' : ''} max-w-5xl mx-auto`}
        >
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-8 text-center">
            Everything else you need
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {additionalFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.name}
                  className="group p-5 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 hover:bg-gray-900/80 transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">{feature.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
