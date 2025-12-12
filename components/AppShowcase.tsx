'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react'

export default function AppShowcase() {
  const [isMobile, setIsMobile] = useState(true)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const chartHeights = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88]
  const transactions = [
    { item: 'Espresso Martini x2', amount: '$28.00', time: 'Just now' },
    { item: 'Margarita', amount: '$14.00', time: '2 min ago' },
    { item: 'Old Fashioned x3', amount: '$48.00', time: '5 min ago' },
  ]

  const DashboardContent = () => (
    <>
      {/* Browser chrome */}
      <div className="bg-gray-900 rounded-t-lg sm:rounded-t-xl p-2 sm:p-3 flex items-center gap-2 border border-gray-800 border-b-0">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-2 sm:mx-4">
          <div className="bg-gray-800 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
            portal.lumapos.co
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="bg-gray-950 rounded-b-lg sm:rounded-b-xl border border-gray-800 border-t-0 p-4 sm:p-6 md:p-8">
        {/* Top stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 border border-gray-800">
            <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md shadow-primary/20">
                <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Today&apos;s Sales</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">$4,287</div>
            <div className="text-[10px] sm:text-xs text-green-500 mt-0.5 sm:mt-1">+12% vs yesterday</div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 border border-gray-800">
            <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-500/20">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Tips</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">$847</div>
            <div className="text-[10px] sm:text-xs text-green-500 mt-0.5 sm:mt-1">+8% vs yesterday</div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 border border-gray-800">
            <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-md shadow-purple-500/20">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Transactions</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">312</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Avg $13.74</div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 border border-gray-800">
            <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Avg Time</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold text-white">2.3s</div>
            <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">Per transaction</div>
          </div>
        </div>

        {/* Chart area */}
        <div className="bg-gray-900/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-800 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-medium text-white">Sales Today</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
              <span className="text-[10px] sm:text-xs text-gray-500">Live</span>
            </div>
          </div>
          {/* Chart - static on mobile, animated on desktop */}
          <div className="flex items-end gap-0.5 sm:gap-1 h-20 sm:h-32">
            {chartHeights.map((height, i) => (
              isMobile ? (
                <div
                  key={i}
                  style={{ height: `${height}%` }}
                  className="flex-1 bg-gradient-to-t from-primary/80 to-primary/40 rounded-t"
                />
              ) : (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${height}%` } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-primary/80 to-primary/40 rounded-t"
                />
              )
            ))}
          </div>
          <div className="flex justify-between mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-600">
            <span>12pm</span>
            <span>3pm</span>
            <span>6pm</span>
            <span>9pm</span>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-gray-900/50 rounded-lg sm:rounded-xl border border-gray-800 overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-800">
            <h3 className="text-xs sm:text-sm font-medium text-white">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-gray-800">
            {transactions.map((tx, i) => (
              isMobile ? (
                <div
                  key={i}
                  className="p-3 sm:p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
                    <div>
                      <div className="text-xs sm:text-sm text-white">{tx.item}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{tx.time}</div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white">{tx.amount}</div>
                </div>
              ) : (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  className="p-3 sm:p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
                    <div>
                      <div className="text-xs sm:text-sm text-white">{tx.item}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{tx.time}</div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white">{tx.amount}</div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Glow effect - hidden on mobile */}
      <div className="hidden lg:block absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-3xl" />
    </>
  )

  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      {/* Background elements - hidden on mobile */}
      <div className="hidden lg:block absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div
        ref={isMobile ? fadeRef : undefined}
        className={`container relative z-10 ${isMobile ? `transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}` : ''}`}
      >
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {isMobile ? (
            <>
              <h2 className="heading-2 mb-3 sm:mb-4">See everything in real-time</h2>
              <p className="text-base sm:text-lg text-gray-400">
                Your dashboard updates live as transactions happen. No refreshing, no waiting.
              </p>
            </>
          ) : (
            <>
              <motion.h2
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="heading-2 mb-3 sm:mb-4"
              >
                See everything in real-time
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-lg text-gray-400"
              >
                Your dashboard updates live as transactions happen. No refreshing, no waiting.
              </motion.p>
            </>
          )}
        </div>

        {/* Dashboard mockup */}
        {isMobile ? (
          <div className="relative max-w-5xl mx-auto">
            <DashboardContent />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-5xl mx-auto"
          >
            <DashboardContent />
          </motion.div>
        )}
      </div>
    </section>
  )
}
