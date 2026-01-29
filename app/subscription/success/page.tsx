'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, CreditCard, Loader } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { apiClient } from '@/lib/api'
import { redirectToVendorDashboard } from '@/lib/auth-handoff'
import { event } from '@/lib/analytics'

export default function SubscriptionSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const paymentIntentId = searchParams.get('payment_intent')
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processSubscription = async () => {
      // Handle subscription payment completion from signup flow
      if (paymentIntentId) {
        // Payment was successful, subscription should now be active
        // Just redirect to dashboard
        setTimeout(() => {
          redirectToVendorDashboard()
        }, 3000)
        event('subscription_success', { method: 'payment_intent' })
        setIsProcessing(false)
        return
      }

      // Handle regular checkout session flow
      if (!sessionId) {
        setError('Invalid session')
        setIsProcessing(false)
        return
      }

      try {
        // Notify backend about successful subscription
        await apiClient.post('/stripe/subscription-success', {
          sessionId,
        })

        // After successful subscription, create Stripe Connect account
        const response = await apiClient.get<{ url?: string }>('/auth/stripe/connect-link')
        
        if (response.url) {
          // Redirect to Stripe Connect onboarding
          setTimeout(() => {
            window.location.href = response.url!
          }, 3000)
        } else {
          // Fallback to dashboard
          setTimeout(() => {
            redirectToVendorDashboard()
          }, 3000)
        }
      } catch (err) {
        console.error('Failed to process subscription:', err)
        setError('Failed to complete setup. Please contact support.')
      } finally {
        setIsProcessing(false)
      }
    }

    processSubscription()
  }, [sessionId, paymentIntentId, router])

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          <div className="text-red-500 mb-6">
            <p className="text-xl font-semibold">{error}</p>
          </div>
          <Button onClick={() => { event('subscription_error_go_to_dashboard'); redirectToVendorDashboard() }}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader className="h-12 w-12 text-primary mx-auto mb-6 animate-spin" />
            <h1 className="text-2xl font-bold text-white mb-4">
              Processing your subscription...
            </h1>
            <p className="text-gray-400">
              Please wait while we set up your Pro account.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
            >
              <CreditCard className="h-12 w-12 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-4">
              Welcome to Pro!
            </h1>
            
            <p className="text-gray-400 mb-8">
              Your subscription is active. Now let's set up your payment processing to start accepting payments from customers.
            </p>

            <div className="space-y-2 max-w-sm mx-auto text-left bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-8">
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Pro subscription activated
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                Lower transaction fees unlocked
              </div>
              <div className="flex items-center text-gray-300">
                <div className="h-5 w-5 mr-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
                Redirecting to payment setup...
              </div>
            </div>

            <p className="text-sm text-gray-500">
              You'll be redirected in a moment...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}