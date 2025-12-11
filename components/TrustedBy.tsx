'use client'

import { CreditCard, Smartphone, Shield } from 'lucide-react'

export default function TrustedBy() {
  return (
    <section className="py-8 sm:py-12 bg-gray-950 border-y border-gray-900">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16">
          <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="text-xs sm:text-sm">Powered by Stripe</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
            <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="text-xs sm:text-sm">Apple Pay & Google Pay</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-gray-400">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="text-xs sm:text-sm">All Major Cards Accepted</span>
          </div>
        </div>
      </div>
    </section>
  )
}