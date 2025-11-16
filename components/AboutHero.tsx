'use client'

import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="heading-1 mb-6 text-white">About Luma</h1>
          <p className="text-lead text-gray-300">
            We're building the POS that mobile bars and event vendors actually want. 
            No contracts, no proprietary hardware, just pure speed powered by Stripe. 
            From pop-ups to festivals, we help you focus on serving customers, not fighting tech.
          </p>
        </motion.div>
      </div>
    </section>
  )
}