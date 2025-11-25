'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { apiClient } from '@/lib/api'

export default function OnboardingRefreshPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Try to get a new onboarding link
    const refreshOnboarding = async () => {
      try {
        // This endpoint would need to be implemented in your backend
        const response = await apiClient.get<{ url?: string }>('/auth/stripe/onboarding-link')
        if (response.url) {
          window.location.href = response.url
        } else {
          setError('Unable to refresh onboarding link. Please contact support.')
        }
      } catch (err) {
        console.error('Failed to refresh onboarding:', err)
        setError('Failed to refresh onboarding link. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    refreshOnboarding()
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <RefreshCw className="h-12 w-12 text-primary mx-auto mb-6 animate-spin" />
            <h1 className="text-2xl font-bold text-white mb-4">
              Refreshing your onboarding session...
            </h1>
            <p className="text-gray-400">
              Please wait while we redirect you back to complete your payment setup.
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Onboarding Session Expired
            </h1>
            
            <p className="text-gray-400 mb-8">
              {error}
            </p>

            <div className="space-y-3 max-w-xs mx-auto">
              <Button
                onClick={() => window.location.reload()}
                size="lg"
                className="w-full"
              >
                Try Again
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}