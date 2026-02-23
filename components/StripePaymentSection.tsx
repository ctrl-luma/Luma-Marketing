'use client'

import { Elements } from '@stripe/react-stripe-js'
import { getStripePromise } from '@/lib/stripe'
import StripePaymentForm from '@/components/StripePaymentForm'

interface StripePaymentSectionProps {
  clientSecret: string
  onSuccess: () => void
  onError: (error: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function StripePaymentSection({
  clientSecret,
  onSuccess,
  onError,
  isLoading,
  setIsLoading,
}: StripePaymentSectionProps) {
  return (
    <Elements
      stripe={getStripePromise()}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#f97316',
            colorBackground: '#111827',
            colorText: '#f3f4f6',
            colorDanger: '#ef4444',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            spacingUnit: '4px',
            borderRadius: '12px',
          },
          rules: {
            '.Tab': {
              border: '1px solid #374151',
              boxShadow: 'none',
            },
            '.Tab:hover': {
              border: '1px solid #4b5563',
            },
            '.Tab--selected': {
              borderColor: '#f97316',
              boxShadow: '0 0 0 1px #f97316',
            },
            '.Input': {
              border: '1px solid #374151',
              boxShadow: 'none',
            },
            '.Input:focus': {
              border: '1px solid #f97316',
              boxShadow: '0 0 0 1px #f97316',
            },
            '.Label': {
              fontWeight: '500',
            },
          },
        },
      }}
    >
      <StripePaymentForm
        onSuccess={onSuccess}
        onError={onError}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        clientSecret={clientSecret}
      />
    </Elements>
  )
}
