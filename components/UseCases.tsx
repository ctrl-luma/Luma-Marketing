'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'

const useCases = [
  {
    title: 'Mobile Bars',
    description: 'From weddings to corporate events. Accept payments, track tips, and split revenue with venues.',
  },
  {
    title: 'Food Trucks',
    description: 'Fast checkout for high-volume service. Works on your phone, no bulky hardware needed.',
  },
  {
    title: 'Event Vendors',
    description: 'Festivals, markets, and pop-ups. Switch between events instantly, track sales by location.',
  },
  {
    title: 'Pop-up Shops',
    description: 'Set up anywhere in minutes. No contracts, no commitments, just start selling.',
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

  // Mobile version
  if (isMobile) {
    return (
      <section className="section-padding bg-black relative overflow-hidden">
        <div
          ref={fadeRef}
          className={`container relative z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="heading-2 mb-3 sm:mb-4">
              Built for how you work
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              From weddings to farmer&apos;s markets, Luma adapts to your business.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8">
              {useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="relative pl-4 border-l-2 border-primary/50"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-1.5">
                    {useCase.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Desktop version
  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                className="relative pl-4 border-l-2 border-primary/50 hover:border-primary transition-colors"
              >
                <h3 className="text-base font-semibold text-white mb-1.5">
                  {useCase.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
