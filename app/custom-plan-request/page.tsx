'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Building, TrendingUp, FileText, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { apiClient } from '@/lib/api'
import { event } from '@/lib/analytics'
import { redirectToVendorDashboard } from '@/lib/auth-handoff'
import { useRouter } from 'next/navigation'

export default function CustomPlanRequestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    businessDescription: '',
    expectedVolume: '',
    useCase: '',
    additionalRequirements: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.businessDescription.trim()) {
      newErrors.businessDescription = 'Business description is required'
    }
    if (!formData.expectedVolume.trim()) {
      newErrors.expectedVolume = 'Expected volume is required'
    }
    if (!formData.useCase.trim()) {
      newErrors.useCase = 'Use case is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Submit the custom plan request
      await apiClient.post('/custom-plan-requests', formData)
      event('custom_plan_submit')
      setSubmitted(true)
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        redirectToVendorDashboard()
      }, 3000)
    } catch (error) {
      console.error('Failed to submit custom plan request:', error)
      setErrors({ submit: 'Failed to submit request. Please try again.' })
      setIsLoading(false)
    }
  }

  if (submitted) {
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
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
          >
            <Send className="h-12 w-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-white mb-4">
              Request Submitted!
            </h1>
            
            <p className="text-gray-400 mb-8">
              Thank you for your interest in our Enterprise plan. Our team will review your request and contact you within 24 hours.
            </p>

            <p className="text-sm text-gray-500">
              Redirecting to your dashboard...
            </p>
          </motion.div>
        </div>
      </div>
    )
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
            <a href={process.env.NEXT_PUBLIC_DASHBOARD_URL || '/dashboard'} className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </a>
          </div>
        </header>

        <div className="container max-w-2xl py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-white mb-3">Custom Enterprise Plan</h1>
            <p className="text-gray-400 mb-8">
              Tell us about your business needs and we'll create a custom plan tailored to your requirements.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Building className="inline h-4 w-4 mr-2" />
                  Describe your business
                </label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                    errors.businessDescription ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                  }`}
                  placeholder="Tell us about your business model, number of locations, types of events you operate at..."
                />
                {errors.businessDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessDescription}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <TrendingUp className="inline h-4 w-4 mr-2" />
                  Expected transaction volume
                </label>
                <input
                  type="text"
                  value={formData.expectedVolume}
                  onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                    errors.expectedVolume ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                  }`}
                  placeholder="e.g., $50,000/month, 1000 transactions/day"
                />
                {errors.expectedVolume && (
                  <p className="text-red-500 text-sm mt-1">{errors.expectedVolume}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FileText className="inline h-4 w-4 mr-2" />
                  Primary use case
                </label>
                <textarea
                  value={formData.useCase}
                  onChange={(e) => handleInputChange('useCase', e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                    errors.useCase ? 'border-red-500' : 'border-gray-700 focus:border-primary'
                  }`}
                  placeholder="How will you primarily use Luma POS? What problems are you looking to solve?"
                />
                {errors.useCase && (
                  <p className="text-red-500 text-sm mt-1">{errors.useCase}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="inline h-4 w-4 mr-2" />
                  Additional requirements <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  value={formData.additionalRequirements}
                  onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  placeholder="Any special features, integrations, or support requirements?"
                />
              </div>

              {errors.submit && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-sm text-red-400">{errors.submit}</p>
                </div>
              )}

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="font-semibold text-white mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    Our enterprise team will review your requirements within 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    We'll schedule a call to discuss your needs in detail
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    You'll receive a custom pricing proposal tailored to your business
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}