'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, Shield, Users } from 'lucide-react'

const principles = [
  {
    title: 'Speed First',
    description: 'Every feature is optimized for high-volume environments. No lag, no delays.',
    icon: Zap,
  },
  {
    title: 'No Lock-in',
    description: 'No contracts, no proprietary hardware. Use your own devices, cancel anytime.',
    icon: Shield,
  },
  {
    title: 'Built for Operators',
    description: 'Revenue splits, tip tracking, multi-location support—features real vendors need.',
    icon: Users,
  },
]

export default function Mission() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-black">
      <div className="container">
        {/* Story Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12 sm:mb-20"
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">The problem</h2>
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
        </motion.div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-800 bg-gray-900/30"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {principle.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}