'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function OnboardingCompletePage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
        >
          <CheckCircle className="h-12 w-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Setup Complete!
          </h1>
          
          <p className="text-gray-400 mb-8">
            Your Stripe account is now connected and you're ready to start accepting payments. 
            You'll be redirected to your dashboard in a few seconds.
          </p>

          <Button
            onClick={() => router.push('/dashboard')}
            size="lg"
            className="w-full max-w-xs mx-auto"
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  )
}