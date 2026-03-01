'use client'

import { useFadeIn } from '@/hooks/useFadeIn'
import { useState, useCallback, memo } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { getTierById } from '@/lib/pricing'
import { event } from '@/lib/analytics'

const starterTier = getTierById('starter')
const proTier = getTierById('pro')

const faqs = [
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
    answer: `Our Starter plan is free with ${starterTier?.transactionFee.replace(' per tap', '')} per transaction. Pro is ${proTier?.price}${proTier?.period} with lower rates at ${proTier?.transactionFee.replace(' per tap', '')}. No hidden fees, no contracts. Manually entered cards have slightly higher rates due to additional fraud protection. High-volume businesses can `,
    answerSuffix: ' for custom pricing or manual entry rates.',
    hasContactLink: true,
  },
  {
    question: 'What devices are supported?',
    answer: 'For iPhone: iPhone XS or later running iOS 16.4 or newer. For Android: Any phone with NFC running Android 8.0 (Oreo) or later. This includes most phones from 2018 onwards.',
  },
  {
    question: 'How do I track tips and split revenue?',
    answer: 'Tips are tracked automatically per transaction and staff member. Revenue splits let you automatically divide payments between operators, venues, and promoters - no manual calculations needed.',
  },
  {
    question: 'What are custom menus?',
    answer: 'Custom menus let you create different menus, pricing, and inventory for each venue or event. Heading to a new location? Switch your entire menu with one tap in the app. Set up once in the dashboard, use everywhere. Pro users get unlimited menus—perfect for mobile vendors who work multiple venues.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. No contracts, no commitments. You can cancel your subscription anytime from your account settings. Your Starter plan access continues even after canceling Pro.',
  },
  {
    question: 'What about manual card entry?',
    answer: 'Manual card entry (typing in card numbers) has slightly higher fees due to increased fraud risk. Starter: 3.1% + $0.33 per transaction. Pro: 3.0% + $0.31 per transaction. This also applies to any online sales directly to customers, including ticket sales and online orders from your menu. Tap to Pay is always cheaper and faster.',
  },
  {
    question: 'Which countries do you support?',
    answer: 'Luma is available in 23 countries: United States, Canada, United Kingdom, Australia, New Zealand, Ireland, France, Germany, Spain, Italy, Netherlands, Belgium, Austria, Portugal, Finland, Sweden, Denmark, Norway, Switzerland, Luxembourg, Czechia, Singapore, and Malaysia. Your currency is automatically set based on the country you select during signup.',
  },
]

const FAQItem = memo(function FAQItem({ faq, isOpen, onToggle }: {
  faq: typeof faqs[number]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-gray-800 rounded-lg sm:rounded-xl overflow-hidden bg-gray-900/50">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left cursor-pointer"
      >
        <span className="font-medium text-white text-sm sm:text-base pr-4">{faq.question}</span>
        <ChevronDown
          className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden min-h-0">
          <p className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-400 text-xs sm:text-sm leading-relaxed">
            {faq.answer}
            {faq.hasContactLink && (
              <>
                <Link href="/contact" onClick={() => event('faq_contact_click')} className="text-primary hover:text-primary-400 underline">contact us</Link>
                {faq.answerSuffix}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
})

function FAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index)
    event('faq_toggle', { question: faqs[index].question })
  }, [])

  return (
    <div className="space-y-2 sm:space-y-3">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          faq={faq}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}

export default function FAQ() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="faq" className="section-padding bg-black relative overflow-hidden">
      {/* Static radial glow — pure CSS, no JS, no re-renders */}
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

        <div className={`fade-in-section ${isVisible ? 'visible' : ''} max-w-2xl mx-auto`}>
          <div className="fade-child">
            <FAQList />
          </div>
        </div>
      </div>
    </section>
  )
}
