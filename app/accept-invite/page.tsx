'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { apiClient } from '@/lib/api/client'
import { Check, AlertCircle, Loader2, Eye, EyeOff, Smartphone } from 'lucide-react'
import { event } from '@/lib/analytics'

interface InviteInfo {
  valid: boolean
  email?: string
  firstName?: string
  lastName?: string
  organizationName?: string
  inviterName?: string
}

function AcceptInviteContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [loading, setLoading] = useState(true)
  const [inviteInfo, setInviteInfo] = useState<InviteInfo | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Validate token on mount
  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setInviteInfo({ valid: false })
        setLoading(false)
        return
      }

      try {
        const result = await apiClient.get<InviteInfo>(`/auth/validate-invite?token=${token}`)
        setInviteInfo(result)
      } catch (err) {
        setInviteInfo({ valid: false })
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [token])

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (!/[0-9]/.test(pwd)) {
      return 'Password must contain at least one number'
    }
    if (!/[a-z]/.test(pwd)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[A-Z]/.test(pwd)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) {
      return 'Password must contain at least one special character'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate password
    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    // Check passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setSubmitting(true)

    try {
      await apiClient.post('/auth/accept-invite', {
        token,
        password,
      })
      event('invite_accepted')
      setSuccess(true)
    } catch (err: any) {
      event('invite_error', { error: err.error || 'unknown' })
      setError(err.error || 'Failed to accept invite. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-400">Validating invite...</p>
        </div>
      </div>
    )
  }

  if (!inviteInfo?.valid) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 mb-6">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Invalid or Expired Invite</h1>
            <p className="text-gray-400">
              This invitation link is no longer valid. It may have expired or already been used.
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Please contact your organization administrator for a new invite.
          </p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 mb-6">
            <Check className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Account Created!</h1>
            <p className="text-gray-400 mb-6">
              Your account has been set up successfully. You can now log in using the Luma app.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Smartphone className="h-5 w-5" />
              <span className="font-medium">Download the Luma app to get started</span>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">
              Download the Luma app from the App Store or Google Play, then log in with:
            </p>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white font-medium">{inviteInfo.email}</p>
            </div>
            <Link href="/download" className="block" onClick={() => event('invite_download_app_click')}>
              <Button variant="primary" size="lg" className="w-full">
                Download the App
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary mb-4 inline-block">
            Luma
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome, {inviteInfo.firstName}!
          </h1>
          <p className="text-gray-400">
            {inviteInfo.inviterName} has invited you to join{' '}
            <span className="text-white font-medium">{inviteInfo.organizationName}</span>
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400">
                {inviteInfo.email}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Create Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-gray-600 pr-12"
                  placeholder="Enter a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be 8+ characters with uppercase, lowercase, number, and special character
              </p>
            </div>

            {/* Confirm Password */}
            <Input
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={submitting}
            >
              Create Account
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AcceptInviteContent />
    </Suspense>
  )
}
