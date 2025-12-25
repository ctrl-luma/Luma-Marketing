'use client'

import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, LayoutGrid, CreditCard, Banknote, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Download the App',
    description: 'Get Luma on your iPhone or Android. No hardware needed.',
    icon: Download,
    gradient: 'from-primary to-blue-600',
  },
  {
    number: '02',
    title: 'Create Your Menu',
    description: 'Set up products, prices, and categories in minutes.',
    icon: LayoutGrid,
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    number: '03',
    title: 'Accept Payments',
    description: 'Tap to pay with any card. Apple Pay & Google Pay included.',
    icon: CreditCard,
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    number: '04',
    title: 'Get Paid',
    description: 'Money hits your bank daily. Instant payouts available.',
    icon: Banknote,
    gradient: 'from-amber-500 to-orange-600',
  },
]

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(true)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
    const Icon = step.icon
    return (
      <div className="relative flex flex-col items-center text-center group">
        {/* Connector line - hidden on mobile and last item */}
        {index < steps.length - 1 && (
          <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5">
            <div className="h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-full" />
            <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          </div>
        )}

        {/* Icon */}
        <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300`}>
          <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-white" />
          {/* Step number badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-bold text-white">{step.number}</span>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">
          {step.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 max-w-[200px]">
          {step.description}
        </p>
      </div>
    )
  }

  // Mobile version
  if (isMobile) {
    return (
      <section className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div
          ref={fadeRef}
          className={`container relative z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="heading-2 mb-3 sm:mb-4">
              Up and running in minutes
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Four simple steps to start accepting payments anywhere.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Desktop version with animations
  return (
    <section className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-3 sm:mb-4"
          >
            Up and running in minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-400"
          >
            Four simple steps to start accepting payments anywhere.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
            >
              <StepCard step={step} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
