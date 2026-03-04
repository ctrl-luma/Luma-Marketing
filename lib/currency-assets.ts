'use client'

import { useState, useEffect, useMemo } from 'react'
import { getCountryRate } from './stripe-rates'
import { getVisitorCountry, detectCountry } from './country'

/**
 * Currencies that have localized screenshot/video assets.
 * Each maps to a folder under /public/screenshots/{currency}/
 */
const ASSET_CURRENCIES = new Set(['usd', 'eur', 'gbp'])

/** Map a country code to the asset currency folder name */
export function getAssetCurrency(countryCode: string): string {
  const currency = getCountryRate(countryCode).currency
  if (ASSET_CURRENCIES.has(currency)) return currency
  // All European currencies (SEK, DKK, NOK, CHF, CZK) fall back to EUR
  const EUR_CURRENCIES = ['sek', 'dkk', 'nok', 'chf', 'czk']
  if (EUR_CURRENCIES.includes(currency)) return 'eur'
  // Everything else (USD, CAD, AUD, NZD, SGD, MYR) falls back to USD
  return 'usd'
}

/**
 * Hook that returns currency-localized asset paths based on visitor's country.
 *
 * On initial render, reads the `luma-country` cookie synchronously.
 * Falls back to IP geolocation if no cookie is set (async, triggers re-render).
 * Defaults to USD if country/currency is unknown.
 */
export function useCurrencyAssets() {
  const [countryCode, setCountryCode] = useState(getVisitorCountry)

  useEffect(() => {
    detectCountry().then(setCountryCode)
  }, [])

  const currency = useMemo(() => getAssetCurrency(countryCode), [countryCode])

  return useMemo(() => ({
    currency,
    heroLeft: `/screenshots/${currency}/hero-left.webp`,
    heroCenter: `/screenshots/${currency}/hero-center.webp`,
    tapToPay: `/screenshots/${currency}/tap_to_pay.webp`,
    events: `/screenshots/${currency}/events.webp`,
    mobilePreorder: `/screenshots/${currency}/mobile-preorder.webp`,
    mobileTracking: `/screenshots/${currency}/mobile-tracking.webp`,
    analyticsPoster: `/screenshots/${currency}/analytics-poster.webp`,
    analyticsVideoAv1: `/screenshots/${currency}/analytics-loop-av1.webm`,
    analyticsVideoWebm: `/screenshots/${currency}/analytics-loop.webm`,
    analyticsVideoMp4: `/screenshots/${currency}/analytics-loop.mp4`,
  }), [currency])
}
