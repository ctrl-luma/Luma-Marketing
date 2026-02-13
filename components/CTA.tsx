'use client'

import { useFadeIn } from '@/hooks/useFadeIn'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button, GradientBackground } from './ui'
import { event } from '@/lib/analytics'

export default function CTA() {
  const handlePricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { ref, isVisible } = useFadeIn()

  return (
    <GradientBackground variant="subtle" className="section-padding">
      <div className="container">
        <div
          ref={ref}
          className={`fade-in-section ${isVisible ? 'visible' : ''} relative`}
        >
          <div className="fade-child">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-2 text-white mb-4 sm:mb-6">
                Ready to get started?
              </h2>

              <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10">
                Set up in 5 minutes. No credit card required.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link href="/get-started" className="w-full sm:w-auto" onClick={() => event('cta_bottom_get_started')}>
                  <Button size="lg" variant="primary" className="w-full sm:w-auto group text-sm sm:text-base">
                    Start Free Today
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <a href="#pricing" onClick={(e) => { handlePricingClick(e); event('cta_bottom_view_pricing') }} className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto text-sm sm:text-base"
                  >
                    View Pricing
                  </Button>
                </a>
              </div>

              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
                No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  )
}
