'use client'

import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-primary text-sm sm:text-base font-semibold tracking-wide mb-2 sm:mb-4">
            About Luma
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-6">
            Payments should be{' '}
            <span className="text-primary">simple</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-400 leading-relaxed">
            We got tired of watching mobile vendors struggle with hardware that
            wasn&apos;t built for them. So we built something better.
          </p>
        </motion.div>
      </div>
    </section>
  )
}