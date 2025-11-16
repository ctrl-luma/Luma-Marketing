'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, PlayCircle } from 'lucide-react'
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
              className="heading-2 text-white mb-6"
            >
              Ready for your next event?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lead text-primary-100 mb-10"
            >
              Set up in 2 minutes. Accept payments instantly. Get paid same day. 
              Join mobile bars and event vendors ditching Square for Luma.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/get-started" className="w-full sm:w-auto">
                <Button size="lg" variant="white" className="w-full sm:w-auto">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link href="/demo" className="w-full sm:w-auto">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="border-white/30 bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  See Live Demo
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-sm text-primary-100"
            >
              No credit card required • Start free • Upgrade anytime
            </motion.p>
          </div>

        </motion.div>
      </div>
    </GradientBackground>
  )
}