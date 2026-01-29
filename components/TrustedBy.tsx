'use client'

import { CreditCard, Smartphone, Shield } from 'lucide-react'

export default function TrustedBy() {
  return (
    <section className="py-4 sm:py-12 bg-gray-950 border-y border-gray-900">
      <div className="container">
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-8 md:gap-16">
          <div className="flex items-center gap-1.5 sm:gap-3 text-gray-400">
            <Shield className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="text-[10px] sm:text-sm whitespace-nowrap">Powered by Stripe</span>
          </div>

          {/* Combined on mobile, separate on desktop */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-gray-400 sm:hidden">
            <CreditCard className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            <span className="text-[10px] whitespace-nowrap">All Cards & Apple/Google Pay</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-gray-400">
            <Smartphone className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm whitespace-nowrap">Apple Pay & Google Pay</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-gray-400">
            <CreditCard className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm whitespace-nowrap">All Major Cards Accepted</span>
          </div>
        </div>
      </div>
    </section>
  )
}