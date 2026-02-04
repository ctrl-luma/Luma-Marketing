'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StarryBackground from '@/components/StarryBackground'
import {
  QrCode,
  CheckCircle2,
  Zap,
  Shield,
  Ticket,
  CreditCard,
  Clock,
  BarChart3,
} from 'lucide-react'
import { event } from '@/lib/analytics'

const APP_LINKS = {
  ios: process.env.NEXT_PUBLIC_IOS_DOWNLOAD_URL || null,
  android: process.env.NEXT_PUBLIC_ANDROID_DOWNLOAD_URL || null,
}

const FEATURES = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process payments in seconds with tap-to-pay technology',
  },
  {
    icon: Ticket,
    title: 'Events & Ticketing',
    description: 'Sell tickets online and scan QR codes at the door',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your transactions are protected with end-to-end encryption',
  },
  {
    icon: CreditCard,
    title: 'All Payment Types',
    description: 'Accept cards, Apple Pay, Google Pay, and contactless',
  },
  {
    icon: Clock,
    title: 'Real-Time Sync',
    description: 'Sales instantly sync across all your devices',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Track performance with detailed insights and reports',
  },
]

// Detect mobile device type
function getMobileOS(): 'ios' | 'android' | null {
  if (typeof window === 'undefined') return null
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
  if (/android/i.test(userAgent)) return 'android'
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) return 'ios'
  return null
}

export default function DownloadPage() {
  const appLinks = APP_LINKS
  const [qrUrl, setQrUrl] = useState<string>('')

  // Set QR URL on client side only to avoid hydration mismatch
  useEffect(() => {
    setQrUrl(`${window.location.origin}/download`)
  }, [])

  // Auto-open app store in new tab for mobile users
  useEffect(() => {
    if (!appLinks.ios && !appLinks.android) return

    const mobileOS = getMobileOS()
    if (mobileOS === 'ios' && appLinks.ios) {
      window.open(appLinks.ios, '_blank')
    } else if (mobileOS === 'android' && appLinks.android) {
      window.open(appLinks.android, '_blank')
    }
  }, [])

  return (
    <div className="relative">
      {/* Top glow effect — matches homepage */}
      <div className="absolute top-0 left-0 right-0 z-[60]">
        <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent z-30 pointer-events-none" />

      {/* Background gradients — hidden on mobile for performance */}
      <div className="hidden lg:block fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-radial from-primary/15 to-transparent" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-radial from-primary/10 to-transparent" />
      </div>

      {/* Full-page starry background + grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <StarryBackground className="absolute inset-0 z-0" />

      <div className="relative z-10">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="heading-1 mb-4">
                  Take Payments{' '}
                  <span className="text-primary">Anywhere</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                  Download the Luma POS app to accept payments on the go.
                  Available for iPhone and Android devices.
                </p>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <a
                    href={appLinks.ios || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (!appLinks.ios) { e.preventDefault() } else { event('download_click_ios') } }}
                    className={`w-full sm:w-auto flex justify-center ${!appLinks.ios ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] transition-transform duration-200'}`}
                  >
                    <img
                      src="/apple-download.png"
                      alt="Download on the App Store"
                      className="h-14"
                    />
                  </a>

                  <a
                    href={appLinks.android || undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (!appLinks.android) { e.preventDefault() } else { event('download_click_android') } }}
                    className={`w-full sm:w-auto flex justify-center ${!appLinks.android ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] transition-transform duration-200'}`}
                  >
                    <img
                      src="/google-download.png"
                      alt="Get it on Google Play"
                      className="h-14"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
          </section>

          {/* QR Code Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="flex-shrink-0">
                    <div className="bg-white p-4 rounded-xl shadow-inner">
                      {qrUrl ? (
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrUrl)}&bgcolor=ffffff&color=000000&margin=0`}
                          alt="Download QR Code"
                          className="w-40 h-40"
                        />
                      ) : (
                        <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded">
                          <QrCode className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Scan to Download</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Point your phone&apos;s camera at the QR code to download the app
                      instantly. Works with both iPhone and Android.
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>Auto-detects your device type</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
            <div className="text-center mb-10">
              <h2 className="heading-2 mb-4">
                Everything You Need to{' '}
                <span className="text-primary">Sell Anywhere</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Powerful features designed for mobile merchants and event vendors
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors backdrop-blur-sm"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
