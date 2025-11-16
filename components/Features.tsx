'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Zap, 
  Shield, 
  Smartphone,
  DollarSign,
  Calendar,
  Users,
  Wifi,
  Receipt,
  Split,
  BarChart3
} from 'lucide-react'

const features = [
  {
    name: 'Live Dashboard',
    description: 'Watch transactions flow in real-time. Track sales, tips, and inventory as they happen. 100% live updates.',
    icon: BarChart3,
  },
  {
    name: 'Tap to Pay',
    description: 'Accept payments directly on your iPhone or Android. No card readers, dongles, or proprietary hardware needed.',
    icon: Smartphone,
  },
  {
    name: 'Stripe-Powered',
    description: '2.7% + $0.05 per tap. Lower than Square, transparent pricing, instant payouts available.',
    icon: DollarSign,
  },
  {
    name: 'Event Mode',
    description: 'Switch between events instantly. Track sales by location, date, and staff. Clone last week\'s setup in one tap.',
    icon: Calendar,
  },
  {
    name: 'Revenue Splits',
    description: 'Auto-split payments between bar operators, venues, and promoters. No more manual calculations.',
    icon: Split,
  },
  {
    name: 'Offline Ready',
    description: 'Keep selling when WiFi fails. Transactions queue locally and sync when you\'re back online.',
    icon: Wifi,
  },
  {
    name: 'Instant Reports',
    description: 'See hourly sales, tips by staff, and best sellers. Export to PDF or Google Sheets instantly.',
    icon: Receipt,
  },
  {
    name: 'Multi-Device Sync',
    description: 'All devices stay in perfect sync. Add items on one device, see them everywhere instantly.',
    icon: Users,
  },
]

export default function Features() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-black relative overflow-hidden" id="features">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-black" />
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-4"
          >
            Built for Mobile Bars & Pop-ups
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lead"
          >
            Everything you need to run events efficiently. From setup to settlement 
            in minutes, not hours. No contracts, no proprietary hardware, just pure speed.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-primary/30 transition-all duration-500 group overflow-hidden"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 -z-10" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon className="h-7 w-7 text-primary group-hover:text-primary-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-100 transition-colors duration-300">
                    {feature.name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}