'use client'

import { useState, useMemo, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { Check, ChevronDown, Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { pricingTiers } from '@/lib/pricing'
import { event } from '@/lib/analytics'
import {
  COUNTRY_RATES,
  getCountryRate,
  getTTPRate,
  formatRate,
  formatFixedFee,
  getLumaMarkup,
  type LumaTier,
  type CountryRate,
  type StripeRate,
} from '@/lib/stripe-rates'
import { detectCountry } from '@/lib/country'

function RateRow({
  label,
  starter,
  pro,
  muted,
}: {
  label: string
  starter: string
  pro: string
  muted?: boolean
}) {
  return (
    <tr className={muted ? 'text-gray-500' : ''}>
      <td className="py-2.5 pr-4 text-sm text-gray-300">{label}</td>
      <td className="py-2.5 px-4 text-sm text-center font-mono">{starter}</td>
      <td className="py-2.5 pl-4 text-sm text-center font-mono text-primary-100">{pro}</td>
    </tr>
  )
}

function RateBreakdown({ country }: { country: CountryRate }) {
  const ttp = getTTPRate(country)
  const cur = country.currency

  const stripeTerminalStr = `${country.terminal.percent}% + ${formatFixedFee(country.terminal.fixed, cur)}`
  const stripeTTPStr = country.ttpRate
    ? `${country.ttpRate.percent}% + ${formatFixedFee(country.ttpRate.fixed, cur)}`
    : `${country.terminal.percent}% + ${formatFixedFee(country.terminal.fixed, cur)} + ${formatFixedFee(country.ttpSurcharge!, cur)}`

  return (
    <div className="text-xs text-gray-500 mt-3 space-y-1">
      <p>Stripe Terminal base: {stripeTerminalStr}</p>
      {country.ttpSurcharge !== null && (
        <p>Tap to Pay surcharge: +{formatFixedFee(country.ttpSurcharge, cur)}/auth</p>
      )}
      {country.ttpRate && (
        <p>Tap to Pay base (separate rate): {stripeTTPStr}</p>
      )}
    </div>
  )
}

export default function PricingPageContent({ detectedCountry }: { detectedCountry: string }) {
  const [selectedCountry, setSelectedCountry] = useState(detectedCountry)

  // If no Vercel cookie, detect country client-side via IP geolocation
  useEffect(() => {
    detectCountry().then((code) => {
      setSelectedCountry(prev => prev === detectedCountry ? code : prev)
    })
  }, [detectedCountry])
  const [showAllCountries, setShowAllCountries] = useState(false)
  const { ref: heroRef, isVisible: heroVisible } = useFadeIn()
  const { ref: rateRef, isVisible: rateVisible } = useFadeIn()
  const { ref: allRef, isVisible: allVisible } = useFadeIn()

  const country = useMemo(() => getCountryRate(selectedCountry), [selectedCountry])
  const ttp = useMemo(() => getTTPRate(country), [country])

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code)
    event('pricing_country_change', { country: code })
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-10 sm:pb-16 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
        }} />
        <div className="container relative z-10">
          <div ref={heroRef} className={`fade-in-section ${heroVisible ? 'visible' : ''} text-center max-w-3xl mx-auto`}>
            <h1 className="fade-child heading-1 mb-4 text-white">
              Transparent Pricing
            </h1>
            <p className="fade-child text-base sm:text-lg text-gray-400 mb-6">
              No hidden fees. No contracts. See exactly what you pay per transaction,
              broken down by Stripe processing and our platform fee.
            </p>

            {/* Country selector */}
            <div className="fade-child inline-flex items-center gap-2 bg-gray-900/80 border border-gray-700/50 rounded-xl px-4 py-2.5">
              <Globe className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none cursor-pointer appearance-none pr-6"
                style={{ backgroundImage: 'none' }}
              >
                {COUNTRY_RATES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-gray-900">{c.name}</option>
                ))}
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500 -ml-5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Rate table for selected country */}
      <section className="pb-12 sm:pb-20 bg-black relative overflow-hidden">
        <div className="container relative z-10">
          <div ref={rateRef} className={`fade-in-section ${rateVisible ? 'visible' : ''} max-w-2xl mx-auto`}>

            {/* Plan summary cards */}
            <div className="fade-child grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-xl p-4 sm:p-5 border ${
                    tier.highlighted
                      ? 'bg-primary/8 border-primary/40'
                      : 'bg-gray-900/60 border-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white">{tier.name}</h3>
                    {tier.highlighted && (
                      <span className="text-[9px] font-semibold bg-primary/20 text-primary-200 px-1.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    {tier.promoPrice ? (
                      <>
                        <span className="text-lg font-bold text-white">{tier.promoPrice}</span>
                        <span className="text-xs line-through text-gray-500">{tier.regularPrice}</span>
                        <span className="text-[10px] text-gray-500">/mo</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-white">{tier.price}</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Platform markup: {getLumaMarkup(tier.id as LumaTier, country.currency).label} + {formatFixedFee(getLumaMarkup(tier.id as LumaTier, country.currency).fixedCents, country.currency)}
                  </p>
                </div>
              ))}
            </div>

            {/* Rate table */}
            <div className="fade-child rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 overflow-hidden">
              <div className="px-5 sm:px-6 py-4 border-b border-gray-800/50">
                <h2 className="text-base font-semibold text-white">
                  Rates for {country.name}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {country.currency.toUpperCase()} &middot; Stripe processing + Luma platform fee
                </p>
              </div>

              <div className="px-5 sm:px-6 py-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800/50">
                      <th className="pb-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                      <th className="pb-2.5 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Starter</th>
                      <th className="pb-2.5 text-center text-xs font-medium text-primary-300/60 uppercase tracking-wider">Pro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/30">
                    <RateRow
                      label="Tap to Pay"
                      starter={formatRate(ttp, country.currency, 'starter')}
                      pro={formatRate(ttp, country.currency, 'pro')}
                    />
                    {country.code === 'AU' && (
                      <RateRow
                        label="Bluetooth reader"
                        starter={formatRate(country.terminal, country.currency, 'starter')}
                        pro={formatRate(country.terminal, country.currency, 'pro')}
                      />
                    )}
                    <RateRow
                      label="Manual card entry"
                      starter={formatRate(country.manualCard, country.currency, 'starter')}
                      pro={formatRate(country.manualCard, country.currency, 'pro')}
                    />
                  </tbody>
                </table>

                <RateBreakdown country={country} />
              </div>
            </div>

            {/* CTA */}
            <div className="fade-child flex flex-col sm:flex-row gap-3 mt-6 justify-center">
              <Link href="/get-started?tier=starter" onClick={() => event('cta_pricing_page_starter')}>
                <Button variant="secondary" className="w-full sm:w-auto">Start Free</Button>
              </Link>
              <Link href="/get-started?tier=pro" onClick={() => event('cta_pricing_page_pro')}>
                <Button variant="primary" className="w-full sm:w-auto">Get Pro</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All countries table */}
      <section className="pb-16 sm:pb-24 bg-black relative overflow-hidden">
        <div className="container relative z-10">
          <div ref={allRef} className={`fade-in-section ${allVisible ? 'visible' : ''} max-w-4xl mx-auto`}>
            <button
              onClick={() => {
                setShowAllCountries(prev => !prev)
                event('pricing_all_countries_toggle')
              }}
              className="fade-child w-full flex items-center justify-between px-5 py-4 rounded-xl border border-gray-800 bg-gray-900/40 hover:bg-gray-900/60 transition-colors cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-300">View rates for all {COUNTRY_RATES.length} countries</span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showAllCountries ? 'rotate-180' : ''}`} />
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: showAllCountries ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden min-h-0">
                <div className="mt-4 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b border-gray-800/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tap to Pay (Starter)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-primary-300/60 uppercase tracking-wider">Tap to Pay (Pro)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Manual Card (Starter)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/30">
                      {COUNTRY_RATES.map((c) => {
                        const cTTP = getTTPRate(c)
                        return (
                          <tr
                            key={c.code}
                            className={`hover:bg-gray-800/20 transition-colors cursor-pointer ${c.code === selectedCountry ? 'bg-primary/5' : ''}`}
                            onClick={() => {
                              handleCountryChange(c.code)
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                          >
                            <td className="px-4 py-2.5 text-sm text-gray-200 font-medium">{c.name}</td>
                            <td className="px-4 py-2.5 text-xs text-center text-gray-400 uppercase">{c.currency}</td>
                            <td className="px-4 py-2.5 text-xs text-center text-gray-300 font-mono">{formatRate(cTTP, c.currency, 'starter')}</td>
                            <td className="px-4 py-2.5 text-xs text-center text-primary-100 font-mono">{formatRate(cTTP, c.currency, 'pro')}</td>
                            <td className="px-4 py-2.5 text-xs text-center text-gray-400 font-mono">{formatRate(c.manualCard, c.currency, 'starter')}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-gray-600 mt-3 px-1">
                  Rates include Stripe processing fees + Luma platform fee. Rates for EEA-issued cards shown for European countries.
                  International cards may incur additional fees from Stripe. All rates subject to Stripe&apos;s current pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
