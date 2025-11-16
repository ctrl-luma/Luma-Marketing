'use client'

import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="container relative z-10 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="heading-1 mb-6">
            The Mobile POS Built for{' '}
            <span className="text-primary">Events & Pop-ups</span>
          </h1>
          
          <p className="text-lead mb-10 max-w-2xl mx-auto">
            Start accepting payments in seconds with just your iPhone. Powered by 
            Stripe, built for speed. Lower fees than Square, no contracts, no 
            proprietary hardware. Perfect for mobile bars, food trucks, and events.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/get-started" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Button variant="secondary" size="lg" className="group w-full sm:w-auto">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live dashboard updates in real-time as transactions process</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {[
              { label: 'Processing Time', value: '<10s' },
              { label: 'Lower Fees vs Square', value: '0.3%' },
              { label: 'Setup Time', value: '2 min' },
              { label: 'Live Dashboard', value: '100%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-gray-800 p-1">
            <div className="aspect-video bg-gray-950 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
              <PlayCircle className="h-20 w-20 text-primary/80 hover:text-primary transition-colors cursor-pointer relative z-10" />
            </div>
          </div>
          
          <div className="absolute -inset-8 bg-gradient-to-r from-primary/10 to-transparent blur-3xl -z-10" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}