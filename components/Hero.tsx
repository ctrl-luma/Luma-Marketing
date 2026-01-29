'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Clock, DollarSign, CreditCard } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui'
import PhoneShowcase from './PhoneShowcase'
import StarryBackground from './StarryBackground'
import { useEffect, useState, useRef } from 'react'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(true) // Default to mobile to prevent flash
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    // Trigger fade-in after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', check)
    }
  }, [])

  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Mobile content with subtle CSS fade-in
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <StarryBackground className="absolute inset-0 z-0" />

        <div className={`container relative z-10 pt-24 sm:pt-20 pb-28 sm:pb-16 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="heading-1 mb-6">
                Accept payments{' '}
                <span className="text-primary">anywhere</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Accept payments in seconds on your iPhone or Android. Powered by
                Stripe, built for speed. Lower fees, no contracts, no
                proprietary hardware.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-6 sm:mb-8">
                <Link href="/get-started" className="w-full sm:w-auto">
                  <Button size="lg" className="group w-full sm:w-auto text-sm sm:text-base">
                    Start Your Free Account
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>

                <a href="#pricing" onClick={handlePricingClick} className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="group w-full sm:w-auto text-sm sm:text-base">
                    View Pricing
                  </Button>
                </a>
              </div>

              {/* Benefits row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: 'Processing', value: '<3 seconds', icon: Zap },
                  { label: 'Setup', value: '5 minutes', icon: Clock },
                  { label: 'Hardware cost', value: 'Free', icon: DollarSign },
                  { label: 'No card needed', value: 'Free to start', icon: CreditCard },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex flex-col items-center gap-2 bg-gray-900/60 rounded-xl px-3 py-3.5 sm:px-4 sm:py-4 border border-gray-800">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm sm:text-base font-semibold text-white leading-tight">{item.value}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{item.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right side - Phone showcase */}
            <PhoneShowcase mobile />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>
    )
  }

  // Desktop version with full animations
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <StarryBackground className="absolute inset-0 z-0" />

      <div className="container relative z-10 pt-24 sm:pt-20 pb-28 sm:pb-16 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="heading-1 mb-6">
              Accept payments{' '}
              <span className="text-primary">anywhere</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
              Accept payments in seconds on your iPhone or Android. Powered by
              Stripe, built for speed. Lower fees, no contracts, no
              proprietary hardware.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center mb-6 sm:mb-8">
              <Link href="/get-started" className="w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto text-sm sm:text-base">
                  Start Your Free Account
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <a href="#pricing" onClick={handlePricingClick} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="group w-full sm:w-auto text-sm sm:text-base">
                  View Pricing
                </Button>
              </a>
            </div>

            {/* Benefits row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {[
                { label: 'Processing', value: '<3 seconds', icon: Zap },
                { label: 'Setup', value: '5 minutes', icon: Clock },
                { label: 'Hardware cost', value: 'Free', icon: DollarSign },
                { label: 'No card needed', value: 'Free to start', icon: CreditCard },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex flex-col items-center gap-2 bg-gray-900/60 rounded-xl px-4 py-4 border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-base font-semibold text-white leading-tight">{item.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Phone showcase */}
          <PhoneShowcase />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
