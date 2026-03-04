'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'
import { detectCountry } from '@/lib/country'

const EU_EEA_UK = new Set([
  'AT', 'BE', 'CZ', 'DK', 'FI', 'FR', 'DE', 'GB',
  'IE', 'IT', 'LU', 'NL', 'NO', 'PT', 'ES', 'SE', 'CH',
])

const CONSENT_KEY = 'luma_cookie_consent'
const GTM_ID = 'GTM-PCNRKR3G'

function loadAnalytics() {
  if (typeof window === 'undefined') return
  if (process.env.NODE_ENV !== 'production') return
  // Prevent double-loading
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) return

  // GA
  const gaScript = document.createElement('script')
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  gaScript.async = true
  document.head.appendChild(gaScript)

  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })

  // GTM
  const gtmScript = document.createElement('script')
  gtmScript.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
  document.head.appendChild(gtmScript)
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    detectCountry().then((country) => {
      if (!EU_EEA_UK.has(country)) {
        // Non-EU: load immediately, no banner
        loadAnalytics()
        return
      }

      // EU: check stored consent
      const consent = localStorage.getItem(CONSENT_KEY)
      if (consent === 'accepted') {
        loadAnalytics()
      } else if (consent === 'rejected') {
        // Do nothing
      } else {
        setShowBanner(true)
      }
    })
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    loadAnalytics()
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 animate-[slideUp_0.3s_ease-out] p-4 sm:p-6">
      <div className="max-w-xl mx-auto rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl shadow-black/50 px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-sm text-gray-300 mb-4">
          We use cookies for analytics to improve your experience.{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="flex-1 rounded-xl border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
