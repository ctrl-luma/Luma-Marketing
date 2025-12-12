'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { Wine, Truck, Calendar, Store } from 'lucide-react'

const useCases = [
  {
    title: 'Mobile Bars',
    description: 'From weddings to corporate events. Accept payments, track tips, and split revenue with venues.',
    icon: Wine,
    gradient: 'from-primary to-blue-600',
    shadow: 'shadow-primary/25',
  },
  {
    title: 'Food Trucks',
    description: 'Fast checkout for high-volume service. Works on your phone, no bulky hardware needed.',
    icon: Truck,
    gradient: 'from-orange-500 to-amber-600',
    shadow: 'shadow-orange-500/25',
  },
  {
    title: 'Event Vendors',
    description: 'Festivals, markets, and pop-ups. Switch between events instantly, track sales by location.',
    icon: Calendar,
    gradient: 'from-purple-500 to-violet-600',
    shadow: 'shadow-purple-500/25',
  },
  {
    title: 'Pop-up Shops',
    description: 'Set up anywhere in minutes. No contracts, no commitments, just start selling.',
    icon: Store,
    gradient: 'from-green-500 to-emerald-600',
    shadow: 'shadow-green-500/25',
  },
]

export default function UseCases() {
  const [isMobile, setIsMobile] = useState(true)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Mobile version - with subtle CSS fade-in
  if (isMobile) {
    return (
      <section className="section-padding bg-black relative overflow-hidden">
        <div
          ref={fadeRef}
          className={`container relative z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="heading-2 mb-3 sm:mb-4">
              Built for how you work
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              From weddings to farmer&apos;s markets, Luma adapts to your business.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {useCases.map((useCase) => {
              const Icon = useCase.icon
              return (
                <div
                  key={useCase.title}
                  className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-4 sm:p-6 border border-gray-800"
                >
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${useCase.gradient} shadow-lg ${useCase.shadow} flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Desktop version - with animations
  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-3 sm:mb-4"
          >
            Built for how you work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-400"
          >
            From weddings to farmer&apos;s markets, Luma adapts to your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-4 sm:p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${useCase.gradient} shadow-lg ${useCase.shadow} flex items-center justify-center mb-3 sm:mb-4`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">
                  {useCase.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
