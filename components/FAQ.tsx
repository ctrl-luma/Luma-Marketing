'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
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
    answer: `Our Starter plan is free with ${starterTier?.transactionFee.replace(' per tap', '')} per transaction. Pro is ${proTier?.price}${proTier?.period} with lower rates at ${proTier?.transactionFee.replace(' per tap', '')}. No hidden fees, no contracts. High-volume businesses can `,
    answerSuffix: ' for custom pricing.',
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
]

export default function FAQ() {
  const [isMobile, setIsMobile] = useState(true)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const FAQList = () => (
    <div className="space-y-2 sm:space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-800 rounded-lg sm:rounded-xl overflow-hidden bg-gray-900/50"
        >
          <button
            onClick={() => { setOpenIndex(openIndex === index ? null : index); event('faq_toggle', { question: faq.question }) }}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left cursor-pointer"
          >
            <span className="font-medium text-white text-sm sm:text-base pr-4">{faq.question}</span>
            <ChevronDown
              className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? 'max-h-48' : 'max-h-0'
            }`}
          >
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
      ))}
    </div>
  )

  // Mobile version - with subtle CSS fade-in
  if (isMobile) {
    return (
      <section id="faq" className="section-padding bg-black relative overflow-hidden">
        <div
          ref={fadeRef}
          className={`container relative z-10 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="heading-2 mb-3 sm:mb-4">
              Frequently asked questions
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Quick answers to common questions.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <FAQList />
          </div>
        </div>
      </section>
    )
  }

  // Desktop version - with animations
  return (
    <section id="faq" className="section-padding bg-black relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 mb-3 sm:mb-4"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-400"
          >
            Quick answers to common questions.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <FAQList />
        </motion.div>
      </div>
    </section>
  )
}
