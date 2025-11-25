'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CreditCard, Mail, Lock, User, Building, Eye, EyeOff, Phone, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { authService } from '@/lib/api'

const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for new mobile bars and pop-ups',
    features: ['2.9% + $0.09 per tap', 'Tap to Pay on iPhone/Android', 'Basic features']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19/month',
    description: 'For established mobile bars running regular events',
    features: ['2.8% + $0.07 per tap', 'Revenue splits', 'Advanced analytics'],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'For multi-bar operators and festival organizers',
    features: ['As low as 2.6% + $0.05', 'Unlimited devices', 'Priority support']
  }
]

type Step = 'account' | 'business' | 'pricing' | 'payment' | 'confirmation'

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
  const selectedTier = searchParams.get('tier')
  
  const [currentStep, setCurrentStep] = useState<Step>(selectedTier ? 'account' : 'pricing')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    businessName: '',
    businessType: '',
    phone: '',
    selectedPlan: selectedTier || '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingZip: '',
    acceptTerms: false,
    acceptPrivacy: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  
  const getSteps = (): Step[] => {
    if (selectedTier) {
      return selectedTier === 'starter' 
        ? ['account', 'business', 'confirmation'] 
        : ['account', 'business', 'payment', 'confirmation']
    }
    
    if (formData.selectedPlan) {
      return formData.selectedPlan === 'starter'
        ? ['pricing', 'account', 'business', 'confirmation']
        : ['pricing', 'account', 'business', 'payment', 'confirmation']
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
        if (!formData.email) newErrors.email = 'Email is required'
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
      case 'payment':
        if (formData.selectedPlan !== 'starter') {
          if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
          if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required'
          if (!formData.cvv) newErrors.cvv = 'CVV is required'
          if (!formData.billingZip) newErrors.billingZip = 'Billing ZIP is required'
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setApiError(null)
    
    try {
      const response = await authService.signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        organizationName: formData.businessName,
        phone: formData.phone,
        acceptTerms: true,
        acceptPrivacy: true,
        subscriptionTier: formData.selectedPlan as 'starter' | 'pro' | 'enterprise'
      })
      
      // Save auth tokens and user data
      // Auth service already handles this in the signup method
      
      // Handle different tier-specific redirects
      if (response.stripeOnboardingUrl) {
        // Starter tier - go to Stripe Connect onboarding
        window.location.href = response.stripeOnboardingUrl
      } else if (response.stripeCheckoutUrl) {
        // Pro tier - go to Stripe checkout for subscription
        window.location.href = response.stripeCheckoutUrl
      } else if (response.customPlanRequested) {
        // Enterprise tier - show custom plan form
        setCurrentStep('confirmation')
        // Will redirect to custom plan form after confirmation
        setTimeout(() => {
          router.push('/custom-plan-request')
        }, 3000)
      } else {
        // Fallback to dashboard
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      setApiError(error.error || 'Failed to create account. Please try again.')
      setIsLoading(false)
    }
  }

  const handleNext = async () => {
    if (!validateStep()) return
    
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
      // If this is the last step before confirmation, submit the form
      if (steps[nextIndex] === 'confirmation') {
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
    // Special case: if we're on account step and came from a pricing tier
    if (currentStep === 'account' && selectedTier) {
      // Clear the selected tier and go to pricing selection
      setFormData(prev => ({ ...prev, selectedPlan: '' }))
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
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Luma</span>
              <span className="text-2xl font-bold text-white ml-1">POS</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                Already have an account?
              </span>
              <Link 
                href="/dashboard" 
                className="text-sm font-medium text-primary hover:text-primary-400 transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors ml-4">
                <ArrowLeft className="h-5 w-5" />
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

        <div className="container max-w-2xl py-8 min-h-[calc(100vh-200px)] flex flex-col">
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
                  <h1 className="text-2xl font-bold text-white mb-3">Choose your plan</h1>
                  <p className="text-gray-400 text-sm mb-6">
                    Start free, upgrade anytime. No contracts, no proprietary hardware.
                  </p>
                  
                  <div className="grid gap-3">
                    {pricingTiers.map((tier) => (
                      <label
                        key={tier.id}
                        className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
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
                          <span className="absolute -top-1.5 left-3 bg-gradient-to-r from-primary-600/80 to-primary-700/80 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white/90 shadow-md shadow-primary/15 z-20 whitespace-nowrap">
                            Most Popular
                          </span>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2 mb-1">
                            <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                            <span className="text-2xl font-bold text-primary">{tier.price}</span>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{tier.description}</p>
                          <ul className="space-y-0.5">
                            {tier.features.map((feature, i) => (
                              <li key={i} className="flex items-center text-sm text-gray-300">
                                <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-4 mt-1 transition-colors ${
                          formData.selectedPlan === tier.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-600'
                        }`}>
                          {formData.selectedPlan === tier.id && (
                            <Check className="h-3 w-3 text-white" />
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
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-3">Create your account</h1>
                  <p className="text-gray-400 text-sm mb-6">
                    Get started with Luma POS in less than 2 minutes
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-12 pr-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full pl-12 pr-12 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.password ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="Minimum 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-12 pr-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="Re-enter your password"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Business Information */}
              {currentStep === 'business' && (
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-3">Tell us about your business</h1>
                  <p className="text-gray-400 text-sm mb-6">
                    We'll use this to customize your Luma experience
                  </p>
                  
                  {apiError && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-400">{apiError}</p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First name
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.firstName ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.lastName ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Business name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          className={`w-full pl-12 pr-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.businessName ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="The Rolling Bar Co."
                        />
                      </div>
                      {errors.businessName && (
                        <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Business type
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border bg-gray-900/50 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
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
                        <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone number <span className="text-gray-500">(optional)</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
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
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-900 text-primary focus:ring-2 focus:ring-primary/50"
                        />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                          I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and acknowledge that I have read the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment */}
              {currentStep === 'payment' && (
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-3">Payment information</h1>
                  <p className="text-gray-400 text-sm mb-6">Secure payment powered by Stripe</p>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">You're subscribing to:</p>
                        <h3 className="text-lg font-semibold text-white">{pricingTiers.find(t => t.id === formData.selectedPlan)?.name} Plan</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {pricingTiers.find(t => t.id === formData.selectedPlan)?.price}
                        </p>
                        {formData.selectedPlan !== 'high-volume' && (
                          <p className="text-xs text-gray-400">billed monthly</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Card number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className={`w-full pl-12 pr-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                              errors.cardNumber ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                            }`}
                            placeholder="4242 4242 4242 4242"
                          />
                        </div>
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Expiry date
                          </label>
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                            }`}
                            placeholder="MM/YY"
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                              errors.cvv ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                            }`}
                            placeholder="123"
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Billing ZIP code
                        </label>
                        <input
                          type="text"
                          value={formData.billingZip}
                          onChange={(e) => handleInputChange('billingZip', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                            errors.billingZip ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                          }`}
                          placeholder="10001"
                        />
                        {errors.billingZip && (
                          <p className="text-red-500 text-sm mt-1">{errors.billingZip}</p>
                        )}
                      </div>
                    </div>
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
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
                  >
                    <Check className="h-12 w-12 text-white" />
                  </motion.div>
                  
                  <h1 className="text-2xl font-bold text-white mb-3">Welcome to Luma POS!</h1>
                  <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                    Your account has been created successfully. We're setting up your dashboard and will redirect you in a moment.
                  </p>
                  
                  <div className="space-y-2 max-w-sm mx-auto text-left bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      Account created
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                      {formData.selectedPlan === 'starter' ? 'Free plan activated' : 'Payment processed'}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <div className="h-5 w-5 mr-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      </div>
                      Setting up your dashboard...
                    </div>
                  </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            {currentStep !== 'confirmation' ? (
              <>
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={(currentStepIndex === 0 && !selectedTier) || isLoading}
                className="disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    {currentStepIndex === steps.length - 2 ? 'Complete Setup' : 'Continue'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
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