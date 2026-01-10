'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CreditCard, Mail, Lock, User, Building, Eye, EyeOff, Phone, AlertCircle, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { authService } from '@/lib/api'
import { redirectToVendorDashboard } from '@/lib/auth-handoff'
import { Elements } from '@stripe/react-stripe-js'
import { getStripePromise } from '@/lib/stripe'
import StripePaymentForm from '@/components/StripePaymentForm'
import { pricingTiers, getTierById } from '@/lib/pricing'

type Step = 'account' | 'business' | 'usecase' | 'pricing' | 'payment' | 'confirmation'

// Format phone number for display
const formatPhoneDisplay = (phone: string): string => {
  if (!phone) return ''
  
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  // Partial formatting
  if (cleaned.length <= 3) {
    return cleaned
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  }
}

export default function GetStartedPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialTier = searchParams.get('tier')

  const [currentStep, setCurrentStep] = useState<Step>(initialTier ? 'account' : 'pricing')
  const [tierFromUrl, setTierFromUrl] = useState<string | null>(initialTier)
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    businessName: '',
    businessType: '',
    phone: '',
    selectedPlan: initialTier || '',
    acceptTerms: false,
    acceptPrivacy: false,
    useCase: '',
    expectedVolume: '',
    businessDescription: '',
    additionalRequirements: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [isCheckingPassword, setIsCheckingPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  
  const getSteps = (): Step[] => {
    // If we came from URL with tier and haven't gone back to pricing yet
    if (tierFromUrl) {
      if (tierFromUrl === 'starter') {
        return ['account', 'business', 'confirmation']
      } else if (tierFromUrl === 'enterprise') {
        return ['account', 'business', 'usecase', 'confirmation']
      } else {
        return ['account', 'business', 'payment', 'confirmation']
      }
    }

    if (formData.selectedPlan) {
      if (formData.selectedPlan === 'starter') {
        return ['pricing', 'account', 'business', 'confirmation']
      } else if (formData.selectedPlan === 'enterprise') {
        return ['pricing', 'account', 'business', 'usecase', 'confirmation']
      } else {
        return ['pricing', 'account', 'business', 'payment', 'confirmation']
      }
    }

    return ['pricing', 'account', 'business', 'payment', 'confirmation']
  }
  
  const steps = getSteps()
  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const validateStep = () => {
    const newErrors: Record<string, string> = {}
    
    switch (currentStep) {
      case 'account':
        if (!formData.email) {
          newErrors.email = 'Email is required'
        } else {
          // Email regex validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
          }
        }
        if (!formData.password) newErrors.password = 'Password is required'
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }
        break
      case 'business':
        if (!formData.firstName) newErrors.firstName = 'First name is required'
        if (!formData.lastName) newErrors.lastName = 'Last name is required'
        if (!formData.businessName) newErrors.businessName = 'Business name is required'
        if (!formData.businessType) newErrors.businessType = 'Business type is required'
        break
      case 'pricing':
        if (!formData.selectedPlan) newErrors.selectedPlan = 'Please select a plan'
        break
      case 'usecase':
        if (!formData.useCase) newErrors.useCase = 'Please describe your use case'
        if (!formData.businessDescription) newErrors.businessDescription = 'Please describe your business needs'
        break
      case 'payment':
        // Payment validation will be handled by Stripe Elements
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setApiError(null)
    
    try {
      // For Pro tier, account is already created when reaching payment step
      if (formData.selectedPlan === 'pro' && paymentIntentClientSecret) {
        // Payment will be handled by StripePaymentForm
        return
      }
      
      const response = await authService.signup({
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        organizationName: formData.businessName.trim(),
        phone: formData.phone.trim(),
        acceptTerms: true,
        acceptPrivacy: true,
        subscriptionTier: formData.selectedPlan as 'starter' | 'pro' | 'enterprise',
        useCase: formData.useCase?.trim() || undefined,
        businessDescription: formData.businessDescription?.trim() || undefined,
        expectedVolume: formData.expectedVolume?.trim() || undefined,
        additionalRequirements: formData.additionalRequirements?.trim() || undefined
      })
      
      // Save auth tokens and user data
      // Auth service already handles this in the signup method
      
      // Handle different tier-specific redirects
      if (response.stripeOnboardingUrl) {
        // Starter tier - go to Stripe Connect onboarding
        window.location.href = response.stripeOnboardingUrl
      } else if (response.stripeCheckoutUrl) {
        // Legacy checkout flow fallback
        window.location.href = response.stripeCheckoutUrl
      } else if (response.customPlanRequested) {
        // Enterprise tier - go to dashboard (custom plan request already submitted)
        redirectToVendorDashboard()
      } else {
        // Fallback to dashboard
        redirectToVendorDashboard()
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      setApiError(error.error || 'Failed to create account. Please try again.')
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    // Payment was successful, move to confirmation
    setCurrentStep('confirmation')
    
    // Auto-redirect after 5 seconds
    setTimeout(() => {
      redirectToVendorDashboard()
    }, 5000)
  }

  const handlePaymentError = (error: string) => {
    setApiError(error)
    setIsLoading(false)
  }

  const handleNext = async () => {
    if (!validateStep()) return
    
    // Check email availability and password validity when moving from account step
    if (currentStep === 'account') {
      // Check email availability
      setIsCheckingEmail(true)
      try {
        const result = await authService.checkEmailAvailability(formData.email.trim())
        if (result.inUse) {
          setErrors(prev => ({ ...prev, email: 'Email address already in use' }))
          setIsCheckingEmail(false)
          return
        }
      } catch (error) {
        console.error('Email check error:', error)
        setErrors(prev => ({ ...prev, email: 'Unable to verify email availability. Please try again.' }))
        setIsCheckingEmail(false)
        return
      }
      setIsCheckingEmail(false)

      // Check password meets policy requirements
      setIsCheckingPassword(true)
      try {
        const passwordResult = await authService.checkPassword(formData.password)
        if (!passwordResult.valid) {
          setErrors(prev => ({ ...prev, password: passwordResult.errors.join('. ') }))
          setIsCheckingPassword(false)
          return
        }
      } catch (error) {
        console.error('Password check error:', error)
        setErrors(prev => ({ ...prev, password: 'Unable to validate password. Please try again.' }))
        setIsCheckingPassword(false)
        return
      }
      setIsCheckingPassword(false)
    }
    
    // Update steps array if plan was selected
    if (currentStep === 'pricing' && formData.selectedPlan) {
      const newSteps: Step[] = formData.selectedPlan === 'starter'
        ? ['pricing', 'account', 'business', 'confirmation']
        : ['pricing', 'account', 'business', 'payment', 'confirmation']
      const currentIndex = newSteps.indexOf(currentStep)
      setCurrentStep(newSteps[currentIndex + 1])
      return
    }
    
    const nextIndex = currentStepIndex + 1
    
    if (nextIndex < steps.length) {
      // If moving TO payment step, create account and get payment intent
      if (steps[nextIndex] === 'payment') {
        setIsLoading(true)
        try {
          const response = await authService.signup({
            email: formData.email.trim(),
            password: formData.password,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            organizationName: formData.businessName.trim(),
            phone: formData.phone.trim(),
            acceptTerms: true,
            acceptPrivacy: true,
            subscriptionTier: formData.selectedPlan as 'starter' | 'pro' | 'enterprise',
            useCase: formData.useCase?.trim() || undefined,
            businessDescription: formData.businessDescription?.trim() || undefined,
            expectedVolume: formData.expectedVolume?.trim() || undefined,
            additionalRequirements: formData.additionalRequirements?.trim() || undefined
          })
          
          if (response.paymentIntentClientSecret) {
            setPaymentIntentClientSecret(response.paymentIntentClientSecret)
            setCurrentStep(steps[nextIndex])
          } else {
            setApiError('Unable to set up payment. Please try again.')
          }
        } catch (error: any) {
          console.error('Signup error:', error)
          setApiError(error.error || 'Failed to create account. Please try again.')
        }
        setIsLoading(false)
      } else if (steps[nextIndex] === 'confirmation') {
        // For non-payment flows, submit the form
        await handleSubmit()
        if (!apiError) {
          setCurrentStep(steps[nextIndex])
        }
      } else {
        setCurrentStep(steps[nextIndex])
      }
    }
  }

  const handleBack = () => {
    // Special case: if we're on account step and came from a pricing tier URL
    if (currentStep === 'account' && tierFromUrl) {
      // Clear the URL tier tracking so getSteps() includes pricing step
      setTierFromUrl(null)
      // Keep the selected plan so it shows as selected on pricing page
      setCurrentStep('pricing')
      // Update URL to remove the tier parameter
      window.history.pushState({}, '', '/get-started')
      return
    }

    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex])
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    // Clear API error when user makes changes
    if (apiError) {
      setApiError(null)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Luma</span>
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href={process.env.NEXT_PUBLIC_DASHBOARD_URL || '/dashboard'}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                <span className="hidden sm:inline">Already have an account? </span>
                <span className="font-medium text-primary hover:text-primary-400">Sign in</span>
              </a>
              <Link href="/" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </header>

        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-800">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>

        <div className="max-w-xl mx-auto py-6 sm:py-8 px-4 sm:px-6 min-h-[calc(100vh-200px)] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {/* Pricing Selection */}
              {currentStep === 'pricing' && (
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Choose your plan</h1>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                    Start free, upgrade anytime. No contracts, no proprietary hardware.
                  </p>
                  
                  <div className="grid gap-6 sm:gap-8">
                    {pricingTiers.map((tier) => (
                      <label
                        key={tier.id}
                        className={`relative flex items-start p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                          formData.selectedPlan === tier.id
                            ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5'
                            : 'border-gray-700 hover:border-gray-600 bg-gradient-to-br from-gray-800/50 to-gray-900/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="plan"
                          value={tier.id}
                          checked={formData.selectedPlan === tier.id}
                          onChange={(e) => handleInputChange('selectedPlan', e.target.value)}
                          className="sr-only"
                        />

                        {tier.recommended && (
                          <span className="absolute -top-1.5 left-3 bg-gradient-to-r from-primary-600/80 to-primary-700/80 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold text-white/90 shadow-md shadow-primary/15 z-20 whitespace-nowrap">
                            Most Popular
                          </span>
                        )}

                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <h3 className="text-lg sm:text-xl font-semibold text-white">{tier.name}</h3>
                            <span className="text-xl sm:text-2xl font-bold text-primary">{tier.price}{tier.period}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">{tier.description}</p>
                          <ul className="space-y-0.5">
                            <li className="flex items-center text-xs sm:text-sm text-gray-300 font-medium">
                              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mr-1.5 sm:mr-2 flex-shrink-0" />
                              {tier.transactionFee}
                            </li>
                            {tier.features.slice(0, 2).map((feature, i) => (
                              <li key={i} className="flex items-center text-xs sm:text-sm text-gray-300">
                                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mr-1.5 sm:mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center ml-3 sm:ml-4 mt-1 transition-colors ${
                          formData.selectedPlan === tier.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-600'
                        }`}>
                          {formData.selectedPlan === tier.id && (
                            <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.selectedPlan && (
                    <p className="text-red-500 text-sm mt-2">{errors.selectedPlan}</p>
                  )}
                </div>
              )}

              {/* Account Creation */}
              {currentStep === 'account' && (
                <form
                  className="flex-1"
                  onSubmit={(e) => { e.preventDefault(); handleNext(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                >
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Create your account</h1>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                    Get started with Luma in less than 2 minutes
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          onBlur={(e) => {
                            const email = e.target.value.trim()
                            if (email) {
                              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                              if (!emailRegex.test(email)) {
                                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
                              }
                            }
                          }}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.password ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="Minimum 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Confirm password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="Re-enter your password"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </form>
              )}

              {/* Business Information */}
              {currentStep === 'business' && (
                <form
                  className="flex-1"
                  onSubmit={(e) => { e.preventDefault(); handleNext(); }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
                      e.preventDefault();
                      handleNext();
                    }
                  }}
                >
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Tell us about your business</h1>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                    We'll use this to customize your Luma experience
                  </p>

                  {apiError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-start gap-2 sm:gap-3">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-red-400">{apiError}</p>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Please correct the error and try again.</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                          First name
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.firstName ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.lastName ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Business name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.businessName ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="The Rolling Bar Co."
                        />
                      </div>
                      {errors.businessName && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.businessName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Business type
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                          errors.businessType ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                        }`}
                      >
                        <option value="" className="bg-gray-900">Select your business type</option>
                        <option value="event-vendor" className="bg-gray-900">Event Vendor</option>
                        <option value="festival-organizer" className="bg-gray-900">Festival Organizer</option>
                        <option value="food-truck" className="bg-gray-900">Food Truck</option>
                        <option value="mobile-bar" className="bg-gray-900">Mobile Bar</option>
                        <option value="pop-up-shop" className="bg-gray-900">Pop-up Shop</option>
                        <option value="restaurant" className="bg-gray-900">Restaurant</option>
                        <option value="other" className="bg-gray-900">Other</option>
                      </select>
                      {errors.businessType && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.businessType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Phone number <span className="text-gray-500">(optional)</span>
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-3 sm:left-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                        <span className="absolute left-9 sm:left-12 text-xs sm:text-sm text-gray-400">+1</span>
                        <input
                          type="tel"
                          value={formatPhoneDisplay(formData.phone)}
                          onChange={(e) => {
                            // Remove all non-numeric characters
                            const cleaned = e.target.value.replace(/\D/g, '')

                            // Limit to 10 digits
                            const limited = cleaned.slice(0, 10)

                            // Store only digits
                            handleInputChange('phone', limited)
                          }}
                          className="w-full pl-16 sm:pl-20 pr-3 sm:pr-4 py-2.5 rounded-lg sm:rounded-xl border border-gray-700 bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-2 sm:gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                          className="mt-0.5 sm:mt-1 h-4 w-4 rounded border-gray-600 bg-gray-900 text-primary focus:ring-2 focus:ring-primary/50"
                        />
                        <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">
                          I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and acknowledge that I have read the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </span>
                      </label>
                    </div>
                  </div>
                </form>
              )}

              {/* Use Case Information */}
              {currentStep === 'usecase' && (
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Tell us about your needs</h1>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                    Help us understand your requirements for a custom enterprise plan
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Use case <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 sm:left-4 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                        <textarea
                          value={formData.useCase}
                          onChange={(e) => handleInputChange('useCase', e.target.value)}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[100px] sm:min-h-[120px] resize-none ${
                            errors.useCase ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="Describe how you plan to use Luma for your business..."
                        />
                      </div>
                      {errors.useCase && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.useCase}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Business description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.businessDescription}
                        onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                        className={`w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[80px] sm:min-h-[100px] resize-none ${
                          errors.businessDescription ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                        }`}
                        placeholder="Tell us more about your business and specific needs..."
                      />
                      {errors.businessDescription && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.businessDescription}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Expected monthly transaction volume
                      </label>
                      <input
                        type="text"
                        value={formData.expectedVolume}
                        onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-gray-700 bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="e.g., $50,000+ per month"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        Additional requirements
                      </label>
                      <textarea
                        value={formData.additionalRequirements}
                        onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-gray-700 bg-gray-900/50 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all min-h-[60px] sm:min-h-[80px] resize-none"
                        placeholder="Any special features or integrations you need..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment */}
              {currentStep === 'payment' && (
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Payment information</h1>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">Secure payment powered by Stripe</p>

                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-primary/20 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">You're subscribing to:</p>
                        <h3 className="text-base sm:text-lg font-semibold text-white">{getTierById(formData.selectedPlan)?.name} Plan</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xl sm:text-2xl font-bold text-primary">
                          {getTierById(formData.selectedPlan)?.price}{getTierById(formData.selectedPlan)?.period}
                        </p>
                        {formData.selectedPlan !== 'starter' && (
                          <p className="text-[10px] sm:text-xs text-gray-400">billed monthly</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {paymentIntentClientSecret ? (
                    <Elements stripe={getStripePromise()} options={{
                      clientSecret: paymentIntentClientSecret,
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
                    }}>
                      <StripePaymentForm
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    </Elements>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <div className="h-8 w-8 mx-auto mb-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        <p className="text-gray-400">Setting up payment...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Confirmation */}
              {currentStep === 'confirmation' && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-18 h-18 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
                  >
                    <Check className="h-9 w-9 sm:h-12 sm:w-12 text-white" />
                  </motion.div>

                  <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Welcome to Luma!</h1>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 max-w-md mx-auto px-4">
                    Your account has been created successfully. We're setting up your dashboard and will redirect you in a moment.
                  </p>

                  <div className="space-y-2 max-w-sm mx-auto text-left bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700 mb-4 sm:mb-6">
                    <div className="flex items-center text-xs sm:text-sm text-gray-300">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3" />
                      Account created
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-300">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3" />
                      {formData.selectedPlan === 'starter' ? 'Free plan activated' : 'Payment processed'}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-300">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3" />
                      Dashboard ready
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
                      <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                      <p className="text-sm sm:text-base">Getting your dashboard ready...</p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">You'll be redirected automatically</p>
                  </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            {currentStep !== 'confirmation' ? (
              <>
              {currentStep !== 'payment' && (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={(currentStepIndex === 0 && !tierFromUrl) || isLoading}
                  className="disabled:opacity-30 text-sm sm:text-base"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  Back
                </Button>
              )}

              {currentStep === 'payment' ? (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="disabled:opacity-30 text-sm sm:text-base"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  Back
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  size="lg"
                  disabled={isLoading || isCheckingEmail || isCheckingPassword}
                  className="text-sm sm:text-base"
                >
                  {isLoading || isCheckingEmail || isCheckingPassword ? (
                    <>
                      <div className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {isCheckingEmail || isCheckingPassword ? 'Validating...' : 'Processing...'}
                    </>
                  ) : (
                    <>
                      {currentStepIndex === steps.length - 2 ? 'Complete Setup' : 'Continue'}
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
                    </>
                  )}
                </Button>
              )}
              </>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}