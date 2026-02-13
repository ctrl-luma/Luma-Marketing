'use client'

import { useFadeIn } from '@/hooks/useFadeIn'
import { Zap, Shield, Users } from 'lucide-react'

const principles = [
  {
    title: 'Speed First',
    description: 'Every feature is optimized for high-volume environments. No lag, no delays.',
    icon: Zap,
    color: 'primary',
  },
  {
    title: 'No Lock-in',
    description: 'No contracts, no proprietary hardware. Use your own devices, cancel anytime.',
    icon: Shield,
    color: 'primary',
  },
  {
    title: 'Built for Operators',
    description: 'Revenue splits, tip tracking, events & ticketing—features real vendors need.',
    icon: Users,
    color: 'primary',
  },
]

const getColorClasses = (color: string) => {
  switch (color) {
    case 'green':
      return {
        bg: 'from-green-500 to-emerald-600',
        border: 'border-green-500/30',
        shadow: 'shadow-lg shadow-green-500/20',
      }
    case 'purple':
      return {
        bg: 'from-purple-500 to-violet-600',
        border: 'border-purple-500/30',
        shadow: 'shadow-lg shadow-purple-500/20',
      }
    default:
      return {
        bg: 'from-primary to-blue-600',
        border: 'border-primary/30',
        shadow: 'shadow-lg shadow-primary/20',
      }
  }
}

export default function Mission() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section className="section-padding">
      <div className="container">
        {/* Story Section */}
        <div
          ref={ref}
          className={`fade-in-section ${isVisible ? 'visible' : ''} max-w-3xl mx-auto mb-10 sm:mb-20`}
        >
          <div className="fade-child">
            <h2 className="text-lg sm:text-2xl font-semibold text-white mb-3 sm:mb-6">The problem</h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-400 leading-relaxed">
              <p>
                Most POS systems are built for brick-and-mortar stores. They assume you have
                a fixed location, reliable WiFi, and the budget for expensive hardware.
              </p>
              <p>
                If you&apos;re running a mobile bar, food truck, or pop-up shop, you&apos;re
                stuck with solutions that weren&apos;t designed for you. Clunky card readers,
                confusing software, contracts that don&apos;t make sense for seasonal work,
                and rates that seem to change every other month.
              </p>
              <p className="text-white font-medium">
                Luma is different. We built a POS that runs on the phone you already have,
                with pricing that scales with your business, and features that actually
                matter for mobile vendors.
              </p>
            </div>
          </div>
        </div>

        {/* Principles Grid */}
        <div className={`fade-in-section ${isVisible ? 'visible' : ''} grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto`}>
          {principles.map((principle) => {
            const Icon = principle.icon
            const colors = getColorClasses(principle.color)
            return (
              <div
                key={principle.title}
                className={`fade-child relative p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border ${colors.border} group hover:border-opacity-50 transition-all duration-300`}
              >
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${colors.bg} ${colors.shadow} flex items-center justify-center mb-3 sm:mb-6 mx-auto`}>
                  <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-xl font-semibold text-white mb-1.5 sm:mb-3 text-center">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-base text-gray-400 leading-relaxed text-center">
                  {principle.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
