'use client'

import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/Button';

interface StripePaymentFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  clientSecret?: string;
}

export default function StripePaymentForm({
  onSuccess,
  onError,
  isLoading,
  setIsLoading,
  clientSecret
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);

  // Determine if this is a SetupIntent (for trials) or PaymentIntent
  const isSetupIntent = clientSecret?.startsWith('seti_');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      let error;

      if (isSetupIntent) {
        // For trials: confirm the setup intent to save payment method
        const result = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/subscription/success`,
          },
          redirect: 'if_required'
        });
        error = result.error;
      } else {
        // For immediate payments: confirm the payment intent
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/subscription/success`,
          },
          redirect: 'if_required'
        });
        error = result.error;
      }

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || 'An error occurred');
          onError(error.message || 'Payment failed');
        } else {
          setMessage("An unexpected error occurred.");
          onError('An unexpected error occurred');
        }
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setMessage('An error occurred while processing your payment');
      onError(err.message || 'Payment processing failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: 'tabs',
          defaultValues: {
            billingDetails: {
              address: {
                country: 'US',
              }
            }
          }
        }}
      />
      
      {message && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          {message}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!stripe || !elements || isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processing...
          </>
        ) : isSetupIntent ? (
          'Start Free Trial'
        ) : (
          'Subscribe Now'
        )}
      </Button>
    </form>
  );
}