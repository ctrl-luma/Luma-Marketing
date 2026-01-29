'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useFadeIn } from '@/hooks/useFadeIn'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function AppShowcase() {
  const isMobile = useIsMobile()
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const DashboardContent = () => (
    <div className="relative">
      {/* Browser chrome */}
      <div className="bg-gray-900 rounded-t-lg sm:rounded-t-xl p-2 sm:p-3 flex items-center gap-2 border border-gray-800 border-b-0">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-2 sm:mx-4">
          <a
            href={process.env.NEXT_PUBLIC_DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-400 max-w-md mx-auto hover:text-gray-200 hover:underline transition-colors cursor-pointer"
          >
            {process.env.NEXT_PUBLIC_DASHBOARD_URL}
          </a>
        </div>
      </div>

      {/* Dashboard screenshot */}
      <div className="rounded-b-lg sm:rounded-b-xl border border-gray-800 border-t-0 overflow-hidden">
        <img
          src="/screenshots/dashboard-analytics.webp"
          alt="Luma POS vendor analytics dashboard showing revenue trends, transaction counts, and peak hours"
          className="w-full h-auto block"
        />
      </div>

      {/* Glow effect - hidden on mobile */}
      <div className="hidden lg:block absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-3xl" />
    </div>
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

        {/* Dashboard screenshot */}
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
