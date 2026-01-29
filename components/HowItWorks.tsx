'use client'

import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { useIsMobile } from '@/hooks/useIsMobile'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, LayoutGrid, CreditCard, Banknote } from 'lucide-react'
import StarryBackground from './StarryBackground'
import { event } from '@/lib/analytics'

const steps = [
  {
    number: '1',
    title: 'Download the App',
    description: 'Get Luma on your iPhone or Android. Create your account in minutes — no hardware, no contracts, no credit card required.',
    icon: Download,
    gradient: 'from-primary-500 to-primary-700',
    image: null,
    hasQr: true,
  },
  {
    number: '2',
    title: 'Build Your Menu',
    description: 'Create products with images, set prices, and organize categories. Build different menus for each venue or event — switch between them instantly.',
    icon: LayoutGrid,
    gradient: 'from-primary-400 to-primary-600',
    image: '/screenshots/howit-menu.webp',
    imageAlt: 'Luma vendor dashboard showing catalog editor with products and categories',
  },
  {
    number: '3',
    title: 'Accept Payments',
    description: 'Tap to pay with any contactless card, Apple Pay, or Google Pay. No card readers needed — your phone is the terminal.',
    icon: CreditCard,
    gradient: 'from-primary-600 to-primary-800',
    image: '/screenshots/tap_to_pay.webp',
    imageAlt: 'Luma tap to pay accepting a contactless payment on iPhone',
    isPhone: true,
  },
  {
    number: '4',
    title: 'Get Paid',
    description: 'Cash out to your bank anytime. Choose free standard payouts or instant transfers. Track every dollar from sale to settlement.',
    icon: Banknote,
    gradient: 'from-primary-500 to-primary-800',
    image: '/screenshots/howit-payout.webp',
    imageAlt: 'Luma vendor dashboard showing cash out payout screen with instant and standard options',
  },
]

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50 max-w-full">
      <div className="bg-gray-900 px-2 py-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex-1 mx-0.5 sm:mx-1">
          <a
            href={process.env.NEXT_PUBLIC_DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => event('dashboard_url_click', { location: 'how_it_works' })}
            className="block bg-gray-800 rounded px-1.5 sm:px-2.5 py-0.5 sm:py-0.5 text-[9px] sm:text-[11px] text-gray-400 max-w-[12rem] mx-auto -translate-x-[23px] hover:text-gray-200 hover:underline transition-colors cursor-pointer truncate text-center"
          >
            {process.env.NEXT_PUBLIC_DASHBOARD_URL}
          </a>
        </div>
      </div>
      <img src={src} alt={alt} className="w-full h-auto block" />
    </div>
  )
}

function QrDownload() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(`${window.location.origin}/download`)
  }, [])

  return (
    <div className="flex flex-col items-center gap-3">
      <a href="/download" onClick={() => event('qr_code_click')} className="bg-white p-3 rounded-xl shadow-inner block">
        {url ? (
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=000000&margin=0`}
            alt="Scan to download Luma"
            className="w-32 h-32 sm:w-40 sm:h-40"
          />
        ) : (
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 rounded" />
        )}
      </a>
      <p className="text-xs text-gray-500 text-center">Scan or tap to download</p>
    </div>
  )
}

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-[180px] sm:w-[220px] mx-auto bg-gradient-to-b from-[#272f3b] to-[#161b24] rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-2.5 shadow-2xl shadow-black/50">
      <div className="w-full h-full bg-black rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-b-lg sm:rounded-b-xl z-20" />
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
    </div>
  )
}

export default function HowItWorks() {
  const isMobile = useIsMobile()
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  })

  // Mobile version
  if (isMobile) {
    return (
      <section className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <StarryBackground subtle className="z-[1]" />
        <div
          ref={fadeRef}
          className={`container relative z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="heading-2 mb-3 sm:mb-4">
              Up and running in minutes
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Four simple steps to start accepting payments anywhere.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-14 max-w-md sm:max-w-lg mx-auto px-1">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.number}>
                  {/* Step header */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg relative flex-shrink-0`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{step.description}</p>

                  {/* Screenshot or QR */}
                  {step.image ? (
                    step.isPhone ? (
                      <PhoneFrame src={step.image} alt={step.imageAlt!} />
                    ) : (
                      <BrowserFrame src={step.image} alt={step.imageAlt!} />
                    )
                  ) : step.hasQr ? (
                    <QrDownload />
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Desktop version — alternating layout
  return (
    <section className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      <StarryBackground subtle className="z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-3 sm:mb-4"
          >
            Up and running in minutes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-400"
          >
            Four simple steps to start accepting payments anywhere.
          </motion.p>
        </div>

        <div className="space-y-20 sm:space-y-28 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.12 }}
                className={`flex items-center gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Text side */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg relative`}>
                      <Icon className="w-7 h-7 text-white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Image side */}
                <div className="flex-1">
                  {step.image ? (
                    step.isPhone ? (
                      <PhoneFrame src={step.image} alt={step.imageAlt!} />
                    ) : (
                      <BrowserFrame src={step.image} alt={step.imageAlt!} />
                    )
                  ) : step.hasQr ? (
                    <QrDownload />
                  ) : (
                    <div className="flex items-center justify-center h-48">
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl opacity-60`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
