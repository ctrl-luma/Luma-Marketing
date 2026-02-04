'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button, GradientBackground } from './ui'
import { event } from '@/lib/analytics'

export default function CTA() {
  const [isMobile, setIsMobile] = useState(true)
  const [initialLoad, setInitialLoad] = useState(false)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    if (window.location.hash) {
      setInitialLoad(true)
    }
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

  const shouldAnimate = inView || initialLoad

  const Content = () => (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="heading-2 text-white mb-4 sm:mb-6">
        Ready to get started?
      </h2>

      <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10">
        Set up in 5 minutes. No credit card required.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
        <Link href="/get-started" className="w-full sm:w-auto" onClick={() => event('cta_bottom_get_started')}>
          <Button size="lg" variant="primary" className="w-full sm:w-auto group text-sm sm:text-base">
            Start Free Today
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <a href="#pricing" onClick={(e) => { handlePricingClick(e); event('cta_bottom_view_pricing') }} className="w-full sm:w-auto">
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto text-sm sm:text-base"
          >
            View Pricing
          </Button>
        </a>
      </div>

      <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
        No credit card required • Cancel anytime
      </p>
    </div>
  )

  // Mobile version - with subtle CSS fade-in
  if (isMobile) {
    return (
      <GradientBackground variant="subtle" className="section-padding">
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
    <GradientBackground variant="subtle" className="section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Content />
          </motion.div>
        </motion.div>
      </div>
    </GradientBackground>
  )
}