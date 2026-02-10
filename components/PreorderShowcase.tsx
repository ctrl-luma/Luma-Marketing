'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useFadeIn } from '@/hooks/useFadeIn'
import { useIsMobile } from '@/hooks/useIsMobile'
import { QrCode, ShoppingCart, CreditCard, Bell } from 'lucide-react'
import Link from 'next/link'
import { event } from '@/lib/analytics'
import StarryBackground from './StarryBackground'

const features = [
  {
    icon: QrCode,
    title: 'QR Code Menus',
    description: 'Generate a QR code for any menu. Customers scan and browse your full menu instantly.',
  },
  {
    icon: ShoppingCart,
    title: 'Online Ordering',
    description: 'Customers add items, customize orders, and check out — all from their phone.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Accept payment upfront, at pickup, or let customers choose.',
  },
  {
    icon: Bell,
    title: 'Real-Time Updates',
    description: 'Get instant notifications. Track order status from placed to picked up.',
  },
]

function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-b from-[#272f3b] to-[#161b24] shadow-2xl shadow-black/50 rounded-[2rem] sm:rounded-[3rem] p-1.5 sm:p-3 ${className}`}>
      <div className="w-full h-full bg-gradient-to-br from-gray-950 to-black overflow-hidden relative rounded-[1.5rem] sm:rounded-[2.5rem]">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black z-20 w-16 h-4 sm:w-24 sm:h-6 rounded-b-lg sm:rounded-b-xl" />
        {children}
      </div>
    </div>
  )
}

function PhoneWithScreenshot({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-[#272f3b] to-[#161b24] flex items-center justify-center">
        <span className="text-gray-600 text-sm">Screenshot</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain"
      onError={() => setHasError(true)}
    />
  )
}

function DualPhones({ animate = true }: { animate?: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 420 }}>
      {/* Glow */}
      <div className="absolute inset-0 bg-primary/10 rounded-full" style={{ filter: 'blur(60px)' }} />

      <div className="relative z-10 flex items-end gap-4 sm:gap-6">
        {/* Left phone - Menu */}
        <div className={animate ? '' : 'transition-all duration-700 ease-out'}>
          <div className="text-center mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Browse Menu</span>
          </div>
          <PhoneFrame className="w-[155px] h-[320px] sm:w-[220px] sm:h-[455px]">
            <PhoneWithScreenshot src="/screenshots/mobile-preorder.webp" alt="Customer browsing menu on phone" />
          </PhoneFrame>
        </div>

        {/* Right phone - Order Tracking */}
        <div className={animate ? '' : 'transition-all duration-700 ease-out'}>
          <div className="text-center mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Track Order</span>
          </div>
          <PhoneFrame className="w-[155px] h-[320px] sm:w-[220px] sm:h-[455px]">
            <PhoneWithScreenshot src="/screenshots/mobile-tracking.webp" alt="Customer tracking order status on phone" />
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}

export default function PreorderShowcase() {
  const isMobile = useIsMobile()
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  const [initialLoad, setInitialLoad] = useState(false)
  useEffect(() => {
    if (window.location.hash) {
      setInitialLoad(true)
    }
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const shouldAnimate = inView || initialLoad

  // Mobile version
  if (isMobile) {
    return (
      <section className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
        <StarryBackground subtle className="z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

        <div
          ref={fadeRef}
          className={`container relative z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="heading-2 mb-3">
              Let customers order before they arrive
            </h2>
            <p className="text-base text-gray-400">
              Share a QR code or link. Customers browse your menu, place orders, and pay — all from their phone.
            </p>
          </div>

          {/* Dual phone mockups */}
          <div className="mb-10">
            <DualPhones animate={false} />
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50"
                >
                  <Icon className="h-5 w-5 text-primary mb-2" />
                  <h4 className="font-medium text-white text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Link
              href="/get-started"
              onClick={() => event('preorder_showcase_get_started_click')}
              className="text-sm text-primary hover:text-primary-400 font-medium"
            >
              Get started for free →
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Desktop version
  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      <StarryBackground subtle className="z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-4"
          >
            Let customers order before they arrive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Share a QR code or link. Customers browse your menu, place orders, and pay — all from their phone.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Dual phone mockups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <DualPhones />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={shouldAnimate ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="pt-2"
            >
              <Link
                href="/get-started"
                onClick={() => event('preorder_showcase_get_started_click')}
                className="text-sm text-primary hover:text-primary-400 font-medium"
              >
                Get started for free →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
