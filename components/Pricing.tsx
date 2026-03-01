'use client'

import { useMemo, useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { pricingTiers } from '@/lib/pricing'
import { event } from '@/lib/analytics'
import { getCountryRate, getTTPRate, formatRate, type LumaTier } from '@/lib/stripe-rates'
import { getVisitorCountry, detectCountry } from '@/lib/country'

export default function Pricing() {
  const { ref, isVisible } = useFadeIn()

  const [countryCode, setCountryCode] = useState(getVisitorCountry)

  useEffect(() => {
    detectCountry().then(setCountryCode)
  }, [])

  const country = useMemo(() => getCountryRate(countryCode), [countryCode])
  const ttp = useMemo(() => getTTPRate(country), [country])

  const tierFees = useMemo(() => ({
    starter: formatRate(ttp, country.currency, 'starter') + ' per tap',
    pro: formatRate(ttp, country.currency, 'pro') + ' per tap',
  }), [ttp, country])

  // Show Pro (highlighted) first on mobile — lead with best offer
  const mobileTiers = [...pricingTiers].sort((a, b) => (b.highlighted ? 1 : 0) - (a.highlighted ? 1 : 0))

  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden" id="pricing">

      <div className="container relative z-10">
        <div ref={ref} className={`fade-in-section ${isVisible ? 'visible' : ''} text-center max-w-3xl mx-auto mb-10 sm:mb-16`}>
          <h2 className="fade-child heading-2 mb-3 sm:mb-4 text-white">
            Lower Fees. No Contracts.
          </h2>
          <p className="fade-child text-base sm:text-lg text-gray-300">
            Start free, scale as you grow. Powered by Stripe with transparent,
            event-friendly pricing. Cancel anytime.
          </p>
        </div>

        {/* Mobile layout */}
        <div className={`fade-in-section ${isVisible ? 'visible' : ''} relative max-w-md mx-auto lg:hidden`}>
          <div className="flex flex-col gap-4">
            {mobileTiers.map((tier) => (
              <div
                key={tier.name}
                className={`fade-child relative rounded-2xl p-5 sm:p-6 overflow-visible flex flex-col ${
                  tier.highlighted
                    ? 'bg-gradient-to-br from-primary/25 via-primary/15 to-gray-900 text-white shadow-2xl shadow-primary/20 border-2 border-primary/60 ring-1 ring-primary/30 scale-[1.02]'
                    : 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-primary/20 z-20 whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                {/* Header: name + price side by side */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-lg font-bold ${tier.highlighted ? 'text-white' : 'text-gray-100'}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs mt-0.5 ${tier.highlighted ? 'text-primary-100' : 'text-gray-400'}`}>
                      {tier.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    {tier.trialDays && (
                      <div className="inline-block bg-green-500/20 text-green-400 text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1 border border-green-500/30">
                        {tier.trialDays}-day free trial
                      </div>
                    )}
                    {tier.promoPrice ? (
                      <>
                        <div className="flex items-baseline gap-1.5 justify-end">
                          <span className={`text-2xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-100'}`}>
                            {tier.promoPrice}
                          </span>
                          <span className={`text-sm line-through opacity-50 ${tier.highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                            {tier.regularPrice}
                          </span>
                        </div>
                        <div className={`text-[10px] mt-0.5 ${tier.highlighted ? 'text-primary-100' : 'text-gray-400'}`}>
                          <span className="text-green-400 font-medium">{tier.promoPeriod}</span>
                          <span className="mx-0.5">•</span>
                          <span>then {tier.regularPrice}/mo</span>
                        </div>
                      </>
                    ) : (
                      <span className={`text-2xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-100'}`}>
                        {tier.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Transaction fee */}
                <div className={`text-xs font-medium mb-3 px-2.5 py-1.5 rounded-lg w-fit ${
                  tier.highlighted
                    ? 'bg-primary/10 text-primary-100'
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  {tierFees[tier.id as LumaTier] || tier.transactionFee}
                </div>

                {/* Features — compact 2-column grid */}
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className={`h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0 ${
                        tier.highlighted ? 'text-primary-100' : 'text-primary'
                      }`} />
                      <span className={`text-[11px] leading-tight ${
                        tier.highlighted ? 'text-primary-50' : 'text-gray-300'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={`/get-started?tier=${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="block" onClick={() => event(`cta_pricing_${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`)}>
                  <Button
                    variant={tier.highlighted ? 'secondary' : 'primary'}
                    className="w-full py-2.5 text-sm"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop layout — single card, two tight columns */}
        <div className={`fade-in-section ${isVisible ? 'visible' : ''} relative max-w-2xl mx-auto hidden lg:block`}>
          <div className="fade-child relative rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-800">
              {pricingTiers.map((tier) => (
                <div key={tier.name} className={`px-6 py-5 flex flex-col ${tier.highlighted ? 'bg-primary/6' : ''}`}>
                  {/* Name + badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-bold text-white">{tier.name}</h3>
                    {tier.highlighted && (
                      <span className="rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Price + fee on one line */}
                  <div className="flex items-baseline gap-2 mb-1">
                    {tier.promoPrice ? (
                      <>
                        <span className="text-xl font-bold text-white">{tier.promoPrice}</span>
                        <span className="text-xs line-through text-gray-500">{tier.regularPrice}</span>
                        <span className="text-[10px] text-gray-500">/ mo</span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-white">{tier.price}</span>
                    )}
                    <span className="text-[10px] text-gray-500 ml-auto">{(tierFees[tier.id as LumaTier] || tier.transactionFee).replace(' per tap', '')}</span>
                  </div>

                  {/* Promo / trial info */}
                  {(tier.promoPrice || tier.trialDays) && (
                    <p className="text-[10px] text-gray-400 mb-3">
                      {tier.trialDays && <span className="text-green-400 font-medium">{tier.trialDays}-day free trial</span>}
                      {tier.trialDays && tier.promoPrice && <span className="mx-1">•</span>}
                      {tier.promoPrice && <span>then {tier.regularPrice}/mo</span>}
                    </p>
                  )}
                  {!tier.promoPrice && !tier.trialDays && <div className="mb-3" />}

                  {/* Features — single tight column */}
                  <ul className="space-y-1 mb-4 flex-grow">
                    {tier.features.filter(f => f !== 'Everything in Starter').map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5">
                        <Check className={`h-3 w-3 flex-shrink-0 ${tier.highlighted ? 'text-primary-200' : 'text-primary'}`} />
                        <span className={`text-[11px] ${tier.highlighted ? 'text-gray-200' : 'text-gray-300'}`}>{feature}</span>
                      </li>
                    ))}
                    {tier.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5 opacity-40">
                        <X className="h-3 w-3 flex-shrink-0 text-gray-600" />
                        <span className="text-[11px] text-gray-500 line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.highlighted && tier.features.includes('Everything in Starter') && (
                    <p className="text-[10px] text-primary-200/60 mb-3">+ everything in Starter</p>
                  )}

                  <Link href={`/get-started?tier=${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`} className="block" onClick={() => event(`cta_pricing_${tier.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`)}>
                    <Button
                      variant={tier.highlighted ? 'secondary' : 'primary'}
                      className="w-full py-2 text-sm"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
