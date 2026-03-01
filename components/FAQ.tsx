'use client'

import { useFadeIn } from '@/hooks/useFadeIn'
import { useState, useCallback, useMemo, memo, useRef, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getTierById } from '@/lib/pricing'
import { event } from '@/lib/analytics'
import { getCountryRate, getTTPRate, formatRate } from '@/lib/stripe-rates'
import { getVisitorCountry, detectCountry } from '@/lib/country'

const proTier = getTierById('pro')

interface FaqItem {
  question: string
  answer: string
  answerSuffix?: string
  hasContactLink?: boolean
}

function buildFaqs(countryCode: string): FaqItem[] {
  const country = getCountryRate(countryCode)
  const ttp = getTTPRate(country)
  const cur = country.currency

  const starterTTP = formatRate(ttp, cur, 'starter')
  const proTTP = formatRate(ttp, cur, 'pro')
  const starterManual = formatRate(country.manualCard, cur, 'starter')
  const proManual = formatRate(country.manualCard, cur, 'pro')

  return [
    {
      question: 'Do I need special hardware?',
      answer: 'No. Luma works on your existing iPhone or Android phone. Just download the app and start accepting payments using Tap to Pay. No card readers, dongles, or proprietary hardware required.',
    },
    {
      question: 'How do payouts work?',
      answer: 'Payouts are handled by Stripe. You can get paid daily or set up instant payouts for a small fee. Funds go directly to your bank account.',
    },
    {
      question: 'What are the fees?',
      answer: `Our Starter plan is free with ${starterTTP} per transaction. Pro is ${proTier?.price}${proTier?.period} with lower rates at ${proTTP}. No hidden fees, no contracts. Manually entered cards have slightly higher rates due to additional fraud protection. High-volume businesses can `,
      answerSuffix: ' for custom pricing or manual entry rates.',
      hasContactLink: true,
    },
    {
      question: 'What devices are supported?',
      answer: 'For iPhone: iPhone XS or later running iOS 16.4 or newer. For Android: Any phone with NFC running Android 8.0 (Oreo) or later. This includes most phones from 2018 onwards.',
    },
    {
      question: 'How do I track tips and split revenue?',
      answer: 'Tips are tracked automatically per transaction and staff member. Revenue splits let you automatically divide payments between operators, venues, and promoters — no manual calculations needed.',
    },
    {
      question: 'What are custom menus?',
      answer: 'Custom menus let you create different menus, pricing, and inventory for each venue or event. Heading to a new location? Switch your entire menu with one tap in the app. Set up once in the dashboard, use everywhere. Pro users get unlimited menus — perfect for mobile vendors who work multiple venues.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes. No contracts, no commitments. You can cancel your subscription anytime from your account settings. Your Starter plan access continues even after canceling Pro.',
    },
    {
      question: 'What about manual card entry?',
      answer: `Manual card entry (typing in card numbers) has slightly higher fees due to increased fraud risk. Starter: ${starterManual} per transaction. Pro: ${proManual} per transaction. This also applies to any online sales directly to customers, including ticket sales and online orders from your menu. Tap to Pay is always cheaper and faster.`,
    },
    {
      question: 'Which countries do you support?',
      answer: 'Luma is available in 23 countries: United States, Canada, United Kingdom, Australia, New Zealand, Ireland, France, Germany, Spain, Italy, Netherlands, Belgium, Austria, Portugal, Finland, Sweden, Denmark, Norway, Switzerland, Luxembourg, Czechia, Singapore, and Malaysia. Your currency is automatically set based on the country you select during signup.',
    },
  ]
}

const AnswerContent = memo(function AnswerContent({ faq }: { faq: FaqItem }) {
  return (
    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
      {faq.answer}
      {faq.hasContactLink && (
        <>
          <Link href="/contact" onClick={() => event('faq_contact_click')} className="text-primary hover:text-primary-400 underline">contact us</Link>
          {faq.answerSuffix}
        </>
      )}
    </p>
  )
})

/* ── Mobile: accordion ── */
const MobileFAQ = memo(function MobileFAQ({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index)
    event('faq_toggle', { question: faqs[index].question })
  }, [faqs])

  return (
    <div className="md:hidden space-y-2">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50">
          <button
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer"
          >
            <span className={`font-medium text-sm pr-4 transition-colors duration-200 ${openIndex === index ? 'text-white' : 'text-gray-400'}`}>
              {faq.question}
            </span>
            <ChevronRight
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                openIndex === index ? 'rotate-90' : ''
              }`}
            />
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{ gridTemplateRows: openIndex === index ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden min-h-0">
              <div className="px-4 pb-4">
                <AnswerContent faq={faq} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
})

/* ── Desktop: side-by-side ── */
const DesktopFAQ = memo(function DesktopFAQ({ faqs }: { faqs: FaqItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const answerRef = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
    event('faq_toggle', { question: faqs[index].question })
  }, [faqs])

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.scrollHeight // force layout measurement
    }
  }, [activeIndex])

  return (
    <div className="hidden md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 lg:gap-10">
      {/* Question list */}
      <nav className="flex flex-col gap-1" role="tablist">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(index)}
              className={`group relative text-left px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gray-800/80 text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
              }`}
            >
              <span className="flex items-center gap-3">
                <ChevronRight
                  className={`h-4 w-4 flex-shrink-0 transition-all duration-200 ${
                    isActive ? 'text-primary translate-x-0.5' : 'text-gray-600 group-hover:text-gray-500'
                  }`}
                />
                <span className="text-sm lg:text-base font-medium">{faq.question}</span>
              </span>
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Answer panel */}
      <div className="relative min-h-[200px]">
        <div className="sticky top-28 border border-gray-800 rounded-2xl bg-gray-900/60 backdrop-blur-sm p-6 lg:p-8">
          <h3 className="text-white font-semibold text-base lg:text-lg mb-4">
            {faqs[activeIndex].question}
          </h3>
          <div
            ref={answerRef}
            key={activeIndex}
            className="animate-fade-in"
          >
            <AnswerContent faq={faqs[activeIndex]} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default function FAQ() {
  const { ref, isVisible } = useFadeIn()
  const [countryCode, setCountryCode] = useState(getVisitorCountry)

  useEffect(() => {
    detectCountry().then(setCountryCode)
  }, [])

  const faqs = useMemo(() => buildFaqs(countryCode), [countryCode])

  return (
    <section id="faq" className="section-padding bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
        }}
      />
      <div className="container relative z-10">
        <div ref={ref} className={`fade-in-section ${isVisible ? 'visible' : ''} text-center max-w-3xl mx-auto mb-8 sm:mb-12`}>
          <h2 className="fade-child heading-2 mb-3 sm:mb-4">
            Frequently asked questions
          </h2>
          <p className="fade-child text-base sm:text-lg text-gray-400">
            Quick answers to common questions.
          </p>
        </div>

        <div className={`fade-in-section ${isVisible ? 'visible' : ''} max-w-4xl mx-auto`}>
          <div className="fade-child">
            <MobileFAQ faqs={faqs} />
            <DesktopFAQ faqs={faqs} />
          </div>
        </div>
      </div>
    </section>
  )
}
