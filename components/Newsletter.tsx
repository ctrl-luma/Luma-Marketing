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
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="heading-3 mb-4 text-white">
            Get event tips & POS updates
          </h2>
          
          <p className="text-lead mb-8 max-w-2xl mx-auto text-gray-300">
            Join 1,000+ mobile bar operators getting weekly tips on maximizing 
            event revenue, new features, and exclusive partner deals.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-800 bg-gray-950/50 backdrop-blur-sm px-5 py-3 text-gray-100 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
                disabled={status === 'loading' || status === 'success'}
              />
              
              <Button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                isLoading={status === 'loading'}
              >
                {status === 'success' ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Subscribe
                  </>
                )}
              </Button>
            </div>
            
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-green-600"
              >
                Thanks for subscribing! Check your email for a confirmation.
              </motion.p>
            )}
            
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-sm text-red-600"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
            
            <p className="mt-4 text-xs text-gray-400">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}