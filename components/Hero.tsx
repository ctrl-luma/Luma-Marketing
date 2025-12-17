'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, CreditCard, Zap, Clock, DollarSign, Home, History, Settings, Grid3X3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui'
import { useEffect, useState, useRef } from 'react'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(true) // Default to mobile to prevent flash
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    // Trigger fade-in after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
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

        <div className={`container relative z-10 pt-24 sm:pt-20 pb-28 sm:pb-16 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="heading-1 mb-6">
                Accept payments{' '}
                <span className="text-primary">anywhere</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Accept payments in seconds on iPhone, Android, or tablet. Powered by
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

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-400">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  2-minute setup
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom menus per venue
                </span>
              </div>

              {/* Stats row */}
              <div className="mt-8 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0">
                {[
                  { label: 'Processing', value: '<3s', icon: Zap, gradient: 'from-green-500 to-emerald-600' },
                  { label: 'Setup', value: '2 min', icon: Clock, gradient: 'from-primary to-blue-600' },
                  { label: 'Hardware', value: '$0', icon: DollarSign, gradient: 'from-purple-500 to-violet-600' },
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="flex items-center gap-2.5 sm:gap-3 bg-gray-900/60 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-800">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-bold text-white leading-tight">{stat.value}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">{stat.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right side - Phone mockup (static on mobile) */}
            <div className="relative flex items-center justify-center">
              {/* Simplified glow */}
              <div className="absolute inset-0 bg-primary/10 rounded-full" style={{ filter: 'blur(40px)' }} />

              {/* Phone mockup */}
              <div className="relative z-10">
                <div className="w-[260px] sm:w-[300px] h-[540px] sm:h-[620px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2.5 sm:p-3 shadow-2xl shadow-black/50">
                  <div className="w-full h-full bg-gradient-to-br from-gray-950 to-black rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative">
                    {/* Dynamic Island */}
                    <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 sm:h-7 bg-black rounded-full z-20" />

                    {/* App content */}
                    <div className="pt-12 sm:pt-16 p-4 sm:p-5 h-full bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col">
                      {/* Luma Logo */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary flex items-center justify-center">
                          <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5">
                            <path d="M9 8H13V20H23V24H9V8Z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        </div>
                      </div>

                      {/* Header */}
                      <div className="mb-4 sm:mb-6">
                        <p className="text-base sm:text-lg font-semibold text-white leading-tight">Tap to Pay</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Ready to accept</p>
                      </div>

                      {/* Amount display */}
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="text-center mb-6 sm:mb-8">
                          <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">Amount</p>
                          <p className="text-4xl sm:text-5xl font-bold text-white">$24.00</p>
                        </div>

                        {/* Tap indicator (static) */}
                        <div className="relative">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                            <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center">
                              <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6">Hold card near phone</p>
                      </div>

                      {/* Bottom navigation */}
                      <div className="mt-auto pt-2">
                        <div className="flex items-center justify-around py-2 sm:py-3 border-t border-gray-800">
                          <button className="flex flex-col items-center gap-0.5">
                            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            <span className="text-[8px] sm:text-[10px] text-primary">Home</span>
                          </button>
                          <button className="flex flex-col items-center gap-0.5">
                            <Grid3X3 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                            <span className="text-[8px] sm:text-[10px] text-gray-500">Catalog</span>
                          </button>
                          <button className="flex flex-col items-center gap-0.5">
                            <History className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                            <span className="text-[8px] sm:text-[10px] text-gray-500">History</span>
                          </button>
                          <button className="flex flex-col items-center gap-0.5">
                            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                            <span className="text-[8px] sm:text-[10px] text-gray-500">Settings</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile floating badges - static, no blur */}
                <div className="lg:hidden absolute -bottom-24 sm:-bottom-28 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                  <div className="bg-gray-900 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 shadow-xl border border-gray-800 min-w-[130px] sm:min-w-[150px]">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-400">Processing</p>
                        <p className="text-xs sm:text-sm font-semibold text-white">&lt;3 seconds</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 shadow-xl border border-gray-800 min-w-[130px] sm:min-w-[150px]">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-400">Works on</p>
                        <p className="text-xs sm:text-sm font-semibold text-white">iPhone & Android</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              Accept payments in seconds on iPhone, Android, or tablet. Powered by
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                2-minute setup
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Custom menus per venue
              </span>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { label: 'Processing', value: '<3s', icon: Zap, gradient: 'from-green-500 to-emerald-600' },
                { label: 'Setup', value: '2 min', icon: Clock, gradient: 'from-primary to-blue-600' },
                { label: 'Hardware', value: '$0', icon: DollarSign, gradient: 'from-purple-500 to-violet-600' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex items-center gap-2.5 sm:gap-3 bg-gray-900/60 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-bold text-white leading-tight">{stat.value}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right side - Phone mockup with tap animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative flex items-center justify-center"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />

            {/* Phone mockup */}
            <div className="relative z-10">
              <div className="w-[260px] sm:w-[300px] h-[540px] sm:h-[620px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2.5 sm:p-3 shadow-2xl shadow-black/50">
                <div className="w-full h-full bg-gradient-to-br from-gray-950 to-black rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 sm:h-7 bg-black rounded-full z-20" />

                  {/* App content */}
                  <div className="pt-12 sm:pt-16 p-4 sm:p-5 h-full bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col">
                    {/* Luma Logo */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary flex items-center justify-center">
                        <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5">
                          <path d="M9 8H13V20H23V24H9V8Z" fill="white"/>
                        </svg>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                    </div>

                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                      <p className="text-base sm:text-lg font-semibold text-white leading-tight">Tap to Pay</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">Ready to accept</p>
                    </div>

                    {/* Amount display */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-center mb-6 sm:mb-8"
                      >
                        <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">Amount</p>
                        <p className="text-4xl sm:text-5xl font-bold text-white">$24.00</p>
                      </motion.div>

                      {/* Tap indicator */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                      >
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                          <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                          </div>
                        </div>
                        {/* Ripple effect */}
                        <motion.div
                          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full border-2 border-primary/30"
                        />
                      </motion.div>

                      <p className="text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6">Hold card near phone</p>
                    </div>

                    {/* Bottom navigation */}
                    <div className="mt-auto pt-2">
                      <div className="flex items-center justify-around py-2 sm:py-3 border-t border-gray-800">
                        <button className="flex flex-col items-center gap-0.5">
                          <Home className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          <span className="text-[8px] sm:text-[10px] text-primary">Home</span>
                        </button>
                        <button className="flex flex-col items-center gap-0.5">
                          <Grid3X3 className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                          <span className="text-[8px] sm:text-[10px] text-gray-500">Catalog</span>
                        </button>
                        <button className="flex flex-col items-center gap-0.5">
                          <History className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                          <span className="text-[8px] sm:text-[10px] text-gray-500">History</span>
                        </button>
                        <button className="flex flex-col items-center gap-0.5">
                          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                          <span className="text-[8px] sm:text-[10px] text-gray-500">Settings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating icon accents */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="hidden lg:flex absolute -left-8 top-1/3 w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 items-center justify-center shadow-xl shadow-green-500/30"
              >
                <Zap className="w-7 h-7 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="hidden lg:flex absolute -right-8 top-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 items-center justify-center shadow-xl shadow-primary/30"
              >
                <Smartphone className="w-7 h-7 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="hidden lg:flex absolute -right-4 top-1/4 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 items-center justify-center shadow-lg shadow-purple-500/30"
              >
                <CreditCard className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
