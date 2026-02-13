'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useFadeIn } from '@/hooks/useFadeIn'
import { Download, LayoutGrid, CreditCard, Banknote, ArrowUpRight, Clock, Zap, Building2 } from 'lucide-react'
import BrandedQRCode from '@/components/ui/BrandedQRCode'
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
    customComponent: 'menu',
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
    customComponent: 'payout',
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
      <Image src={src} alt={alt} width={800} height={600} className="w-full h-auto block" />
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
      <a href="/download" onClick={() => event('qr_code_click')} className="block">
        {url ? (
          <BrandedQRCode value={url} />
        ) : (
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-900 rounded" />
        )}
      </a>
      <p className="text-xs text-gray-500 text-center">Scan or tap to download</p>
    </div>
  )
}

function MockMenuBuilder() {
  const cocktails = [
    { name: 'Margarita', price: '14.00' },
    { name: 'Old Fashioned', price: '16.00' },
    { name: 'Espresso Martini', price: '15.00' },
  ]
  const beers = [
    { name: 'IPA Draft', price: '8.00' },
    { name: 'Lager Draft', price: '7.00' },
  ]

  const DragDots = () => (
    <div className="flex flex-col gap-[3px] opacity-30">
      <div className="flex gap-[3px]"><div className="w-[3px] h-[3px] rounded-full bg-gray-400" /><div className="w-[3px] h-[3px] rounded-full bg-gray-400" /></div>
      <div className="flex gap-[3px]"><div className="w-[3px] h-[3px] rounded-full bg-gray-400" /><div className="w-[3px] h-[3px] rounded-full bg-gray-400" /></div>
      <div className="flex gap-[3px]"><div className="w-[3px] h-[3px] rounded-full bg-gray-400" /><div className="w-[3px] h-[3px] rounded-full bg-gray-400" /></div>
    </div>
  )

  return (
    <div className="rounded-xl border border-gray-800 border-t-2 border-t-primary/60 bg-gray-900/80 shadow-2xl shadow-black/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-gray-800/80 flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-0.5">Menu</div>
          <div className="text-white font-semibold">Friday Night Pop-Up</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500 bg-gray-800 px-2.5 py-1 rounded-md">5 items</div>
          <div className="text-xs text-primary bg-primary/10 border border-primary/25 px-2.5 py-1 rounded-md">+ Add</div>
        </div>
      </div>

      {/* Cocktails category */}
      <div className="border-b border-gray-800/50">
        <div className="px-4 sm:px-5 py-2.5 bg-gray-800/30 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Cocktails</span>
          <span className="text-[10px] text-gray-500">{cocktails.length} items</span>
        </div>
        {cocktails.map((item, i) => (
          <div key={item.name} className={`px-4 sm:px-5 py-3 flex items-center gap-3 ${i < cocktails.length - 1 ? 'border-b border-gray-800/30' : ''}`}>
            <DragDots />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium">{item.name}</div>
            </div>
            <div className="text-sm text-gray-300 font-medium">${item.price}</div>
          </div>
        ))}
      </div>

      {/* Beer category */}
      <div>
        <div className="px-4 sm:px-5 py-2.5 bg-gray-800/30 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Beer</span>
          <span className="text-[10px] text-gray-500">{beers.length} items</span>
        </div>
        {beers.map((item, i) => (
          <div key={item.name} className={`px-4 sm:px-5 py-3 flex items-center gap-3 ${i < beers.length - 1 ? 'border-b border-gray-800/30' : ''}`}>
            <DragDots />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium">{item.name}</div>
            </div>
            <div className="text-sm text-gray-300 font-medium">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MockPayoutCard() {
  const recentPayouts = [
    { date: 'Feb 9', amount: '1,247.50', method: 'Instant', status: 'Paid' },
    { date: 'Feb 7', amount: '892.00', method: 'Standard', status: 'Paid' },
    { date: 'Feb 4', amount: '2,105.75', method: 'Instant', status: 'Paid' },
  ]

  return (
    <div className="rounded-xl border border-gray-800 border-t-2 border-t-primary/60 bg-gray-900/80 shadow-2xl shadow-black/50 overflow-hidden">
      {/* Balance */}
      <div className="p-4 sm:p-5 border-b border-gray-800/80">
        <div className="text-xs text-gray-500 mb-1">Available Balance</div>
        <div className="text-2xl font-bold text-white">$3,842.25</div>
        <div className="flex items-center gap-1 mt-1">
          <ArrowUpRight className="h-3 w-3 text-emerald-400" />
          <span className="text-xs text-emerald-400">+$1,247.50 today</span>
        </div>
      </div>

      {/* Payout options */}
      <div className="p-4 sm:p-5 border-b border-gray-800/80 grid grid-cols-2 gap-2.5">
        <div className="bg-primary/10 border border-primary/25 rounded-lg p-3 text-center">
          <Zap className="h-4 w-4 text-primary mx-auto mb-1.5" />
          <div className="text-xs font-medium text-white">Instant</div>
          <div className="text-[10px] text-gray-400 mt-0.5">1% fee · seconds</div>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 text-center">
          <Clock className="h-4 w-4 text-gray-400 mx-auto mb-1.5" />
          <div className="text-xs font-medium text-white">Standard</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Free · 1–2 days</div>
        </div>
      </div>

      {/* Bank destination */}
      <div className="px-4 sm:px-5 py-3 border-b border-gray-800/80 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
          <Building2 className="h-4 w-4 text-gray-400" />
        </div>
        <div>
          <div className="text-xs text-white font-medium">Chase ••• 4829</div>
          <div className="text-[10px] text-gray-500">Checking account</div>
        </div>
      </div>

      {/* Recent payouts */}
      <div className="p-4 sm:p-5">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2.5">Recent Payouts</div>
        <div className="space-y-2">
          {recentPayouts.map((payout) => (
            <div key={payout.date} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-gray-400 text-xs">{payout.date}</span>
                <span className="text-[10px] text-gray-600">{payout.method}</span>
              </div>
              <span className="text-white text-xs font-medium">${payout.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-[180px] sm:w-[220px] mx-auto bg-gradient-to-b from-[#272f3b] to-[#161b24] rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-2.5 shadow-2xl shadow-black/50">
      <div className="w-full h-full bg-black rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-black rounded-b-lg sm:rounded-b-xl z-20" />
        <Image src={src} alt={alt} width={220} height={476} className="w-full h-auto block" />
      </div>
    </div>
  )
}

// Step with its own intersection observer — alternating slide direction on desktop via CSS
function StepItem({ step, index }: { step: typeof steps[number]; index: number }) {
  const Icon = step.icon
  const isEven = index % 2 === 0
  const { ref, isVisible } = useFadeIn(0.2)

  // On desktop (lg+), use from-left / from-right for alternating slide direction
  const directionClass = isEven ? 'lg:from-left' : 'lg:from-right'

  return (
    <div
      ref={ref}
      className={`fade-in-section ${directionClass} ${isVisible ? 'visible' : ''} flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}
    >
      {/* Text side */}
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-lg lg:rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg relative flex-shrink-0`}>
            <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
            <div className="absolute -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-gray-900 border lg:border-2 border-gray-700 flex items-center justify-center">
              <span className="text-[9px] lg:text-xs font-bold text-white">{step.number}</span>
            </div>
          </div>
          <h3 className="text-base lg:text-xl font-semibold text-white">{step.title}</h3>
        </div>
        <p className="text-sm lg:text-base text-gray-400 leading-relaxed">{step.description}</p>
      </div>

      {/* Image side */}
      <div className="flex-1">
        {step.customComponent === 'menu' ? (
          <MockMenuBuilder />
        ) : step.customComponent === 'payout' ? (
          <MockPayoutCard />
        ) : step.image ? (
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
    </div>
  )
}

export default function HowItWorks() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden scroll-mt-24">

      <div className="container relative z-10">
        <div ref={ref} className={`fade-in-section ${isVisible ? 'visible' : ''} text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-20`}>
          <h2 className="fade-child heading-2 mb-3 sm:mb-4">
            Up and running in minutes
          </h2>
          <p className="fade-child text-base sm:text-lg text-gray-400">
            Four simple steps to accepting payments and getting paid.
          </p>
        </div>

        <div className="space-y-14 sm:space-y-20 lg:space-y-28 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepItem key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
