'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button, GradientBackground } from './ui'

export default function CTA() {
  const [isMobile, setIsMobile] = useState(true)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const Content = () => (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="heading-2 text-white mb-4 sm:mb-6">
        Ready to get started?
      </h2>

      <p className="text-base sm:text-lg text-primary-100 mb-8 sm:mb-10">
        Set up in 2 minutes. No credit card required.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <Link href="/get-started" className="w-full sm:w-auto">
          <Button size="lg" variant="white" className="w-full sm:w-auto group text-sm sm:text-base">
            Start Free Today
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <a href="#pricing" onClick={handlePricingClick} className="w-full sm:w-auto">
          <Button
            variant="secondary"
            size="lg"
            className="border-white/30 bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto text-sm sm:text-base"
          >
            View Pricing
          </Button>
        </a>
      </div>

      <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-primary-100/80">
        No credit card required • Cancel anytime
      </p>
    </div>
  )

  // Mobile version - with subtle CSS fade-in
  if (isMobile) {
    return (
      <GradientBackground variant="primary" className="section-padding">
        <div
          ref={fadeRef}
          className={`container transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="relative">
            <Content />
          </div>
        </div>
      </GradientBackground>
    )
  }

  // Desktop version - with animations
  return (
    <GradientBackground variant="primary" className="section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Content />
          </motion.div>
        </motion.div>
      </div>
    </GradientBackground>
  )
}