'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button, GradientBackground } from './ui'

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

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
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-2 text-white mb-4 sm:mb-6"
            >
              Ready to get started?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-primary-100 mb-8 sm:mb-10"
            >
              Set up in 2 minutes. No credit card required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <Link href="/get-started" className="w-full sm:w-auto">
                <Button size="lg" variant="white" className="w-full sm:w-auto group text-sm sm:text-base">
                  Start Free Today
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="#pricing" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white/30 bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto text-sm sm:text-base"
                >
                  View Pricing
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 sm:mt-6 text-xs sm:text-sm text-primary-100/80"
            >
              No credit card required • Cancel anytime
            </motion.p>
          </div>

        </motion.div>
      </div>
    </GradientBackground>
  )
}