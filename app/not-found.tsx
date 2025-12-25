'use client'

import Link from 'next/link'
import { ArrowLeft, CreditCard, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-lg">
        {/* Animated 404 with card icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <span className="text-[150px] sm:text-[200px] font-bold text-gray-800/50 leading-none select-none">
            404
          </span>
          {/* Floating card that "missed" the reader */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-xl shadow-primary/30">
              <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Page not found
          </h1>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/">
              <Button variant="primary" size="lg" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                <Search className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
