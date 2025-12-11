'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { apiClient } from '@/lib/api'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await apiClient.post('/contact', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        message: formData.message.trim()
      })
      
      console.log('Contact form submitted successfully:', response)
      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
      
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error: any) {
      console.error('Contact form error:', error)
      console.error('Error details:', error.details)
      setStatus('error')
      
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 border border-gray-800/50"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-800 bg-gray-950/50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-100 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-800 bg-gray-950/50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-100 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Company / Event Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-800 bg-gray-950/50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-100 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Mobile Bar Co."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-gray-800 bg-gray-950/50 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-100 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell us about your business and what you're looking for..."
                />
              </div>

              <Button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                isLoading={status === 'loading'}
                className="w-full text-sm sm:text-base"
                size="lg"
              >
                {status === 'success' ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    <Send className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
            
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <p className="text-xs sm:text-sm text-green-400 font-medium">
                  Thank you for reaching out! We&apos;ve received your message and will get back to you within 24 hours.
                </p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-xs sm:text-sm text-red-400">
                  Something went wrong while sending your message. Please try again or email us directly at support@lumapos.co
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}