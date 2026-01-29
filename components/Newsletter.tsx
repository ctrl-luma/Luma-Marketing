'use client'

import { Mail, Send, Check } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { event } from '@/lib/analytics'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    event('newsletter_submit')

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
      {/* Static gradient background - hidden on mobile for performance */}
      <div className="hidden lg:block absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Card container */}
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-gray-800 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-blue-600 rounded-xl sm:rounded-2xl mb-5 sm:mb-6 shadow-lg shadow-primary/20">
              <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>

            <h2 className="heading-3 mb-2 sm:mb-3 text-white">
              Stay in the loop
            </h2>

            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto">
              Product updates, tips for event vendors, and the occasional deal.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-gray-700 bg-gray-900/80 px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base text-gray-100 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                  disabled={status === 'loading' || status === 'success'}
                />

                <Button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  isLoading={status === 'loading'}
                  className="text-sm sm:text-base px-6"
                >
                  {status === 'success' ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Done!
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
                <p className="mt-3 sm:mt-4 text-sm text-green-500">
                  Thanks for subscribing!
                </p>
              )}

              {status === 'error' && (
                <p className="mt-3 sm:mt-4 text-sm text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}

              <p className="mt-4 sm:mt-5 text-[10px] sm:text-xs text-gray-500">
                By subscribing, you agree to our <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors underline">Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}