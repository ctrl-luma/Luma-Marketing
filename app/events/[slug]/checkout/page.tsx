'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { publicEventsApi, type PublicEvent } from '@/lib/api/events'
import { getStripePromise } from '@/lib/stripe'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ArrowLeft, Clock, AlertCircle, Minus, Plus, Ticket, ShieldCheck, CalendarDays, MapPin, ShieldAlert } from 'lucide-react'

function CheckoutForm({
  event,
  tierId,
  quantity,
  onQuantityChange,
  maxQty,
  maxPerOrder,
  sessionId,
  expiresAt,
  onExpired,
}: {
  event: PublicEvent
  tierId: string
  quantity: number
  onQuantityChange: (q: number) => void
  maxQty: number
  maxPerOrder: number
  sessionId: string
  expiresAt: Date
  onExpired: () => void
}) {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)

  const stripe = useStripe()
  const elements = useElements()

  const tier = event.tiers.find(t => t.id === tierId)
  const totalAmount = (tier?.price || 0) * quantity

  // Countdown timer
  useEffect(() => {
    const update = () => {
      const remaining = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000))
      setTimeLeft(remaining)
      if (remaining <= 0) onExpired()
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [expiresAt, onExpired])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isUrgent = timeLeft <= 60

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setSubmitting(true)
    setError(null)

    try {
      // For free tickets, skip Stripe
      if (totalAmount === 0) {
        const res = await publicEventsApi.purchase(slug, {
          sessionId,
          tierId,
          quantity,
          customerEmail,
          customerName,
          paymentMethodId: 'free',
        })
        router.push(`/events/${slug}/success?tickets=${res.tickets.map(t => t.id).join(',')}&email=${encodeURIComponent(customerEmail)}`)
        return
      }

      // Submit Stripe elements to get payment method
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message || 'Payment validation failed')
        setSubmitting(false)
        return
      }

      // Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        elements,
      })
      if (pmError) {
        setError(pmError.message || 'Failed to create payment method')
        setSubmitting(false)
        return
      }

      // Purchase tickets
      const res = await publicEventsApi.purchase(slug, {
        sessionId,
        tierId,
        quantity,
        customerEmail,
        customerName,
        paymentMethodId: paymentMethod.id,
      })

      router.push(`/events/${slug}/success?tickets=${res.tickets.map(t => t.id).join(',')}&email=${encodeURIComponent(customerEmail)}`)
    } catch (err: any) {
      setError(err?.error || err?.message || 'Purchase failed. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Timer */}
      <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium ${
        isUrgent
          ? 'bg-red-500/10 border border-red-500/30 text-red-400'
          : 'bg-primary/10 border border-primary/30 text-primary-300'
      }`}>
        <Clock className="h-4 w-4 shrink-0" />
        <span>
          Reserved for {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Ticket + Quantity */}
      <div className="rounded-xl bg-gray-900/60 border border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white text-sm">{tier?.name}</h3>
            <p className="text-sm text-gray-400">
              {tier?.price === 0 ? 'Free' : `$${tier?.price.toFixed(2)} each`}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="h-8 w-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-white font-semibold text-sm w-5 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => onQuantityChange(Math.min(maxQty, quantity + 1))}
              disabled={quantity >= maxQty}
              className="h-8 w-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {tier?.available !== null && (
          <p className="text-xs text-gray-500 mt-2">{tier?.available} remaining · Max {maxPerOrder} per order</p>
        )}

        <div className="border-t border-gray-800 mt-3 pt-3 flex justify-between">
          <span className="text-white font-semibold text-sm">Total</span>
          <span className="text-white font-semibold">
            {totalAmount === 0 ? 'Free' : `$${totalAmount.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Tickets will be sent to this email</p>
        </div>
      </div>

      {/* Payment */}
      {totalAmount > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Payment</label>
          <div className="rounded-xl border border-gray-700 p-4 bg-gray-900">
            <PaymentElement options={{ layout: 'tabs' }} />
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || (!stripe && totalAmount > 0)}
        className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Processing...
          </span>
        ) : totalAmount === 0 ? (
          'Reserve Tickets'
        ) : (
          `Pay $${totalAmount.toFixed(2)}`
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>Secured by Stripe</span>
      </div>

      {event.refundPolicy && (
        <p className="text-xs text-gray-500 text-center">
          {event.refundPolicy}
        </p>
      )}
    </form>
  )
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const tierId = searchParams.get('tier') || ''
  const initialQty = parseInt(searchParams.get('qty') || '1') || 1

  const [event, setEvent] = useState<PublicEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(initialQty)
  const [lockState, setLockState] = useState<{
    sessionId: string
    expiresAt: Date
  } | null>(null)
  const [locking, setLocking] = useState(false)
  const [expired, setExpired] = useState(false)
  const [lockError, setLockError] = useState<string | null>(null)
  const lockAttempted = useRef(false)

  const storageKey = `ticket_lock_${slug}_${tierId}`

  const saveLock = (sessionId: string, expiresAt: string) => {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ sessionId, expiresAt })) } catch {}
  }

  const clearSavedLock = () => {
    try { sessionStorage.removeItem(storageKey) } catch {}
  }

  // Fetch event then restore or create lock
  useEffect(() => {
    if (lockAttempted.current) return
    lockAttempted.current = true

    publicEventsApi.getBySlug(slug)
      .then(res => {
        setEvent(res.event)
        return res.event
      })
      .then(async () => {
        if (!tierId) return
        setLocking(true)

        // Try to restore existing lock from sessionStorage
        try {
          const saved = sessionStorage.getItem(storageKey)
          if (saved) {
            const { sessionId, expiresAt } = JSON.parse(saved)
            if (new Date(expiresAt) > new Date()) {
              const check = await publicEventsApi.checkLock(slug, sessionId)
              setLockState({ sessionId: check.sessionId, expiresAt: new Date(check.expiresAt) })
              setQuantity(check.quantity)
              setLocking(false)
              return
            }
            clearSavedLock()
          }
        } catch {
          clearSavedLock()
        }

        // Create new lock
        try {
          const res = await publicEventsApi.lockTickets(slug, { tierId, quantity: 1 })
          setLockState({ sessionId: res.sessionId, expiresAt: new Date(res.expiresAt) })
          saveLock(res.sessionId, res.expiresAt)
        } catch (err: any) {
          setLockError(err?.error || 'Failed to reserve tickets. Please try again.')
        } finally {
          setLocking(false)
        }
      })
      .catch(() => router.push('/events'))
      .finally(() => setLoading(false))
  }, [slug, tierId, router])

  const tier = event?.tiers.find(t => t.id === tierId)
  const maxPerOrder = event?.maxTicketsPerOrder ?? 10
  const maxQty = tier?.available !== null ? Math.min(tier?.available ?? maxPerOrder, maxPerOrder) : maxPerOrder

  const handleRetry = async () => {
    setExpired(false)
    setLocking(true)
    setLockError(null)
    clearSavedLock()
    try {
      const res = await publicEventsApi.lockTickets(slug, { tierId, quantity })
      setLockState({
        sessionId: res.sessionId,
        expiresAt: new Date(res.expiresAt),
      })
      saveLock(res.sessionId, res.expiresAt)
    } catch (err: any) {
      setLockError(err?.error || 'Failed to reserve tickets. Please try again.')
    } finally {
      setLocking(false)
    }
  }

  const handleExpired = useCallback(() => {
    setExpired(true)
    setLockState(null)
    clearSavedLock()
  }, [storageKey])

  const totalAmount = (tier?.price || 0) * quantity
  const stripePromise = getStripePromise()

  if (loading || locking) {
    return (
      <div className="relative min-h-screen">
        <Header />
        <main className="pt-24 sm:pt-28 pb-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-sm animate-pulse">
            <div className="h-4 w-24 bg-gray-800 rounded mb-6" />
            <div className="h-7 w-40 bg-gray-800 rounded mb-2" />
            <div className="h-4 w-56 bg-gray-800 rounded mb-8" />
            <div className="space-y-4">
              <div className="h-10 bg-gray-800/50 rounded-xl" />
              <div className="h-24 bg-gray-800/50 rounded-xl" />
              <div className="h-10 bg-gray-800/50 rounded-xl" />
              <div className="h-10 bg-gray-800/50 rounded-xl" />
              <div className="h-12 bg-gray-800/50 rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!event || !tier) {
    return (
      <div className="relative min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <Ticket className="h-12 w-12 text-gray-600 mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Ticket tier not found</h1>
          <p className="text-gray-400 text-sm mb-6">This ticket type may no longer be available.</p>
          <Link href={`/events/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Event
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-24 sm:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-sm">
          {/* Back */}
          <Link
            href={`/events/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {event.name}
          </Link>

          <h1 className="text-xl font-bold text-white mb-1">Checkout</h1>
          <p className="text-sm text-gray-400 mb-4">{tier.name} — {event.name}</p>

          {/* Event info */}
          <div className="rounded-xl bg-gray-900/40 border border-gray-800/60 p-3.5 mb-6 space-y-2 text-sm">
            <div className="flex items-center gap-2.5 text-gray-300">
              <CalendarDays className="h-4 w-4 text-gray-500 shrink-0" />
              <span>
                {new Date(event.startsAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                {' · '}
                {new Date(event.startsAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
            {event.locationName && (
              <div className="flex items-center gap-2.5 text-gray-300">
                <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                <span>{event.locationName}</span>
              </div>
            )}
            {event.ageRestriction && (
              <div className="flex items-center gap-2.5 text-amber-300">
                <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
                <span>{event.ageRestriction}</span>
              </div>
            )}
          </div>

          {expired ? (
            <div className="rounded-2xl bg-gray-900/60 border border-gray-800 p-8 text-center">
              <Clock className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-white mb-1">Reservation Expired</h2>
              <p className="text-sm text-gray-400 mb-5">Your ticket hold has expired. Please try again.</p>
              <button
                onClick={handleRetry}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : lockError ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{lockError}</span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : lockState ? (
            <Elements
              stripe={stripePromise}
              options={totalAmount > 0 ? {
                mode: 'payment' as const,
                amount: Math.round(totalAmount * 100),
                currency: 'usd',
                paymentMethodCreation: 'manual',
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#2563EB',
                    colorBackground: '#111827',
                    colorText: '#F3F4F6',
                    borderRadius: '12px',
                  },
                },
              } : {
                paymentMethodCreation: 'manual',
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#2563EB',
                    colorBackground: '#111827',
                    colorText: '#F3F4F6',
                    borderRadius: '12px',
                  },
                },
              }}
            >
              <CheckoutForm
                event={event}
                tierId={tierId}
                quantity={quantity}
                onQuantityChange={setQuantity}
                maxQty={maxQty}
                maxPerOrder={maxPerOrder}
                sessionId={lockState.sessionId}
                expiresAt={lockState.expiresAt}
                onExpired={handleExpired}
              />
            </Elements>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  )
}
