'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { publicMenuApi, type PublicCatalog, type PublicProduct, type PreorderItem } from '@/lib/api/menu'
import { getStripePromise } from '@/lib/stripe'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ArrowLeft, AlertCircle, ShoppingBag, CreditCard, Wallet, Clock, ShieldCheck } from 'lucide-react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface CartItem {
  product: PublicProduct
  quantity: number
  notes?: string
}

interface CustomerFormState {
  firstName: string
  lastName: string
  email: string
  phone: string | undefined
  orderNotes: string
}

interface CheckoutFormProps {
  catalog: PublicCatalog
  cart: CartItem[]
  subtotal: number
  taxAmount: number
  total: number
  tipAmount: number
  formState: CustomerFormState
  setFormState: React.Dispatch<React.SetStateAction<CustomerFormState>>
}

// Shared form fields component
function CustomerForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phone,
  setPhone,
  orderNotes,
  setOrderNotes,
}: {
  firstName: string
  setFirstName: (v: string) => void
  lastName: string
  setLastName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  phone: string | undefined
  setPhone: (v: string | undefined) => void
  orderNotes: string
  setOrderNotes: (v: string) => void
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">First Name</label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Last Name</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">We&apos;ll send order updates to this email</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone (optional)</label>
        <PhoneInput
          international
          defaultCountry="US"
          limitMaxLength
          value={phone}
          onChange={setPhone}
          placeholder="(555) 123-4567"
          className="phone-input-dark"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Order Notes (optional)</label>
        <textarea
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          placeholder="Any special requests..."
          rows={2}
          className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm resize-none"
        />
      </div>
    </div>
  )
}

// Order summary component
function OrderSummary({ cart, subtotal, taxAmount, tipAmount, total }: {
  cart: CartItem[]
  subtotal: number
  taxAmount: number
  tipAmount: number
  total: number
}) {
  return (
    <div className="rounded-xl bg-gray-900/60 border border-gray-800 p-4">
      <h3 className="font-semibold text-white text-sm mb-3">Order Summary</h3>
      <div className="space-y-2 mb-3">
        {cart.map(item => (
          <div key={item.product.catalogProductId} className="flex justify-between text-sm">
            <span className="text-gray-300">
              {item.quantity} × {item.product.name}
            </span>
            <span className="text-gray-400">
              ${((item.product.price / 100) * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 pt-3 space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="text-gray-300">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Tax</span>
          <span className="text-gray-300">${taxAmount.toFixed(2)}</span>
        </div>
        {tipAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Tip</span>
            <span className="text-gray-300">${tipAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-semibold pt-1.5 border-t border-gray-800">
          <span className="text-white">Total</span>
          <span className="text-white">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

// Pay Now form - uses Stripe hooks (must be inside Elements provider)
function PayNowCheckoutForm({ catalog, cart, subtotal, taxAmount, total, tipAmount, formState, setFormState }: CheckoutFormProps) {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stripe = useStripe()
  const elements = useElements()

  const { firstName, lastName, email, phone, orderNotes } = formState

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const customerName = `${firstName.trim()} ${lastName.trim()}`.trim()
    const customerEmail = email.toLowerCase().trim()

    if (!stripe || !elements) {
      setError('Payment system not loaded. Please refresh the page.')
      return
    }

    // Submit Stripe elements to validate
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || 'Payment validation failed')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const items: PreorderItem[] = cart.map(item => ({
        catalogProductId: item.product.catalogProductId,
        quantity: item.quantity,
        notes: item.notes,
      }))

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({ elements })
      if (pmError) {
        setError(pmError.message || 'Failed to create payment method')
        setSubmitting(false)
        return
      }

      const res = await publicMenuApi.createPreorder(slug, {
        customerName,
        customerEmail,
        customerPhone: phone?.trim() || undefined,
        paymentType: 'pay_now',
        items,
        orderNotes: orderNotes.trim() || undefined,
        tipAmount: tipAmount > 0 ? tipAmount : undefined,
        paymentMethodId: paymentMethod.id,
      })

      sessionStorage.removeItem(`preorder_cart_${slug}`)
      router.push(`/menu/${slug}/success?id=${res.preorder.id}&email=${encodeURIComponent(customerEmail)}`)
    } catch (err: unknown) {
      const error = err as { error?: string; message?: string }
      setError(error?.error || error?.message || 'Failed to place order. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <OrderSummary cart={cart} subtotal={subtotal} taxAmount={taxAmount} tipAmount={tipAmount} total={total} />

      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm bg-primary/10 border border-primary/30 text-primary-300">
        <CreditCard className="h-4 w-4 shrink-0" />
        <span>Pay now and skip the line at pickup</span>
      </div>

      <CustomerForm
        firstName={firstName}
        setFirstName={(v) => setFormState(s => ({ ...s, firstName: v }))}
        lastName={lastName}
        setLastName={(v) => setFormState(s => ({ ...s, lastName: v }))}
        email={email}
        setEmail={(v) => setFormState(s => ({ ...s, email: v }))}
        phone={phone}
        setPhone={(v) => setFormState(s => ({ ...s, phone: v }))}
        orderNotes={orderNotes}
        setOrderNotes={(v) => setFormState(s => ({ ...s, orderNotes: v }))}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Payment</label>
        <div className="rounded-xl border border-gray-700 p-4 bg-gray-900">
          <PaymentElement options={{ layout: 'tabs' }} />
        </div>
      </div>

      {catalog.pickupInstructions && (
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-900/40 border border-gray-800/60">
          <Clock className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-white mb-0.5">Pickup Instructions</p>
            <p className="text-xs text-gray-400">{catalog.pickupInstructions}</p>
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
        disabled={submitting || !stripe || !firstName.trim() || !lastName.trim() || !email.trim()}
        className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>Secured by Stripe</span>
      </div>
    </form>
  )
}

// Pay at Pickup form - no Stripe hooks needed
function PayAtPickupCheckoutForm({ catalog, cart, subtotal, taxAmount, total, tipAmount, formState, setFormState }: CheckoutFormProps) {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { firstName, lastName, email, phone, orderNotes } = formState

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const customerName = `${firstName.trim()} ${lastName.trim()}`.trim()
    const customerEmail = email.toLowerCase().trim()

    setSubmitting(true)
    setError(null)

    try {
      const items: PreorderItem[] = cart.map(item => ({
        catalogProductId: item.product.catalogProductId,
        quantity: item.quantity,
        notes: item.notes,
      }))

      const res = await publicMenuApi.createPreorder(slug, {
        customerName,
        customerEmail,
        customerPhone: phone?.trim() || undefined,
        paymentType: 'pay_at_pickup',
        items,
        orderNotes: orderNotes.trim() || undefined,
        tipAmount: tipAmount > 0 ? tipAmount : undefined,
      })

      sessionStorage.removeItem(`preorder_cart_${slug}`)
      router.push(`/menu/${slug}/success?id=${res.preorder.id}&email=${encodeURIComponent(customerEmail)}`)
    } catch (err: unknown) {
      const error = err as { error?: string; message?: string }
      setError(error?.error || error?.message || 'Failed to place order. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <OrderSummary cart={cart} subtotal={subtotal} taxAmount={taxAmount} tipAmount={tipAmount} total={total} />

      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm bg-amber-500/10 border border-amber-500/30 text-amber-300">
        <Wallet className="h-4 w-4 shrink-0" />
        <span>Pay when you pick up your order</span>
      </div>

      <CustomerForm
        firstName={firstName}
        setFirstName={(v) => setFormState(s => ({ ...s, firstName: v }))}
        lastName={lastName}
        setLastName={(v) => setFormState(s => ({ ...s, lastName: v }))}
        email={email}
        setEmail={(v) => setFormState(s => ({ ...s, email: v }))}
        phone={phone}
        setPhone={(v) => setFormState(s => ({ ...s, phone: v }))}
        orderNotes={orderNotes}
        setOrderNotes={(v) => setFormState(s => ({ ...s, orderNotes: v }))}
      />

      {catalog.pickupInstructions && (
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-900/40 border border-gray-800/60">
          <Clock className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-white mb-0.5">Pickup Instructions</p>
            <p className="text-xs text-gray-400">{catalog.pickupInstructions}</p>
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
        disabled={submitting || !firstName.trim() || !lastName.trim() || !email.trim()}
        className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </span>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [catalog, setCatalog] = useState<PublicCatalog | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [paymentType, setPaymentType] = useState<'pay_now' | 'pay_at_pickup'>('pay_now')
  const [tipPercent, setTipPercent] = useState<number | null>(null)
  const [customTip, setCustomTip] = useState('')
  const [formState, setFormState] = useState<CustomerFormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: undefined,
    orderNotes: '',
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedCart = sessionStorage.getItem(`preorder_cart_${slug}`)
        if (!savedCart) {
          router.push(`/menu/${slug}`)
          return
        }

        const cartData = JSON.parse(savedCart) as CartItem[]
        if (cartData.length === 0) {
          router.push(`/menu/${slug}`)
          return
        }
        setCart(cartData)

        const res = await publicMenuApi.getCatalog(slug)
        setCatalog(res.catalog)

        if (res.catalog.preorderPaymentMode === 'pay_at_pickup') {
          setPaymentType('pay_at_pickup')
        } else if (res.catalog.preorderPaymentMode === 'pay_now') {
          setPaymentType('pay_now')
        }
      } catch {
        router.push(`/menu/${slug}`)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [slug, router])

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product.price / 100) * item.quantity, 0)
  }, [cart])

  const taxAmount = useMemo(() => {
    if (!catalog) return 0
    return subtotal * (catalog.taxRate / 100)
  }, [subtotal, catalog])

  const tipAmount = useMemo(() => {
    if (tipPercent !== null) {
      return subtotal * (tipPercent / 100)
    }
    if (customTip) {
      const amount = parseFloat(customTip)
      return isNaN(amount) ? 0 : amount
    }
    return 0
  }, [subtotal, tipPercent, customTip])

  const total = useMemo(() => {
    return subtotal + taxAmount + tipAmount
  }, [subtotal, taxAmount, tipAmount])

  const stripePromise = getStripePromise()

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black">
        <main className="pt-6 pb-16">
          <div className="w-full max-w-[600px] mx-auto px-4 animate-pulse">
            <div className="h-4 w-24 bg-gray-800 rounded mb-6" />
            <div className="h-7 w-40 bg-gray-800 rounded mb-8" />
            <div className="space-y-4">
              <div className="h-32 bg-gray-800/50 rounded-xl" />
              <div className="h-12 bg-primary/20 rounded-xl" />
              <div className="h-10 bg-gray-800/50 rounded-xl" />
              <div className="h-10 bg-gray-800/50 rounded-xl" />
              <div className="h-32 bg-gray-800/50 rounded-xl" />
              <div className="h-12 bg-gray-800/50 rounded-xl" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!catalog || cart.length === 0) {
    return (
      <div className="relative min-h-screen bg-black">
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <ShoppingBag className="h-12 w-12 text-gray-600 mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Your cart is empty</h1>
          <p className="text-gray-400 text-sm mb-6">Add some items before checking out.</p>
          <Link
            href={`/menu/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Link>
        </div>
      </div>
    )
  }

  const formProps: CheckoutFormProps = { catalog, cart, subtotal, taxAmount, total, tipAmount, formState, setFormState }

  return (
    <div className="relative min-h-screen bg-black">
      <main className="pt-6 pb-16">
        <div className="w-full max-w-[600px] mx-auto px-4">
          <Link
            href={`/menu/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Link>

          <h1 className="text-xl font-bold text-white mb-1">Checkout</h1>
          <p className="text-sm text-gray-400 mb-6">{catalog.name}</p>

          {/* Payment mode selection */}
          {catalog.preorderPaymentMode === 'both' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Payment Option</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType('pay_now')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentType === 'pay_now'
                      ? 'bg-primary/10 border-primary/40'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <CreditCard className={`h-5 w-5 mb-2 ${paymentType === 'pay_now' ? 'text-primary' : 'text-gray-500'}`} />
                  <p className={`text-sm font-semibold ${paymentType === 'pay_now' ? 'text-white' : 'text-gray-300'}`}>
                    Pay Now
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Skip the line</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType('pay_at_pickup')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentType === 'pay_at_pickup'
                      ? 'bg-primary/10 border-primary/40'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <Wallet className={`h-5 w-5 mb-2 ${paymentType === 'pay_at_pickup' ? 'text-primary' : 'text-gray-500'}`} />
                  <p className={`text-sm font-semibold ${paymentType === 'pay_at_pickup' ? 'text-white' : 'text-gray-300'}`}>
                    Pay at Pickup
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Pay when ready</p>
                </button>
              </div>
            </div>
          )}

          {/* Tip selection - only show if catalog has tip screen enabled */}
          {catalog.showTipScreen && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Add a tip (optional)</label>
              <div className="flex gap-2 mb-2">
                {(catalog.tipPercentages || [15, 18, 20, 25]).map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => {
                      setTipPercent(tipPercent === pct ? null : pct)
                      setCustomTip('')
                    }}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      tipPercent === pct
                        ? 'bg-primary text-white'
                        : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              {catalog.allowCustomTip && (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Custom amount"
                    value={customTip}
                    onChange={(e) => {
                      setCustomTip(e.target.value)
                      setTipPercent(null)
                    }}
                    className="w-full pl-7 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
              )}
            </div>
          )}

          {/* Render the appropriate checkout form */}
          {paymentType === 'pay_now' ? (
            <Elements
              stripe={stripePromise}
              options={{
                mode: 'payment' as const,
                amount: Math.round(total * 100),
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
              }}
            >
              <PayNowCheckoutForm {...formProps} />
            </Elements>
          ) : (
            <PayAtPickupCheckoutForm {...formProps} />
          )}
        </div>
      </main>
    </div>
  )
}
