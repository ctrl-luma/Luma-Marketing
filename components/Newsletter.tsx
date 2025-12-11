'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Send, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function Newsletter() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334'
      const response = await fetch(`${apiUrl}/marketing/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'website' }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    } catch (error) {
      console.error('Subscription error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Static gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
            <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          </div>

          <h2 className="heading-3 mb-3 sm:mb-4 text-white">
            Stay in the loop
          </h2>

          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Product updates, tips for event vendors, and the occasional deal.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-800 bg-gray-950/50 backdrop-blur-sm px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base text-gray-100 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
                disabled={status === 'loading' || status === 'success'}
              />

              <Button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                isLoading={status === 'loading'}
                className="text-sm sm:text-base"
              >
                {status === 'success' ? (
                  <>
                    <Check className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Subscribe
                  </>
                )}
              </Button>
            </div>

            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 sm:mt-3 text-xs sm:text-sm text-green-600"
              >
                Thanks for subscribing! Check your email for a confirmation.
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 sm:mt-3 text-xs sm:text-sm text-red-600"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}

            <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-400">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}