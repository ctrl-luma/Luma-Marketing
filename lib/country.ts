/**
 * Detect visitor's country code for pricing display.
 *
 * Priority:
 * 1. `luma-country` cookie (set by middleware from Vercel's x-vercel-ip-country)
 * 2. IP geolocation via country.is (free, no API key)
 * 3. 'US' default
 */

const SUPPORTED_CODES = new Set([
  'US', 'CA', 'GB', 'AU', 'NZ', 'IE', 'FR', 'DE', 'ES', 'IT',
  'NL', 'BE', 'AT', 'PT', 'FI', 'SE', 'DK', 'NO', 'CH', 'LU',
  'CZ', 'SG', 'MY',
])

/**
 * Get the visitor's country code from the cookie (set by middleware on Vercel).
 * Returns null if the cookie isn't set.
 */
function getFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)luma-country=([^;]*)/)
  return match?.[1] || null
}

/**
 * Fetch country from IP via country.is (free, no key required).
 * Caches the result in a cookie so we only call once per session.
 */
async function fetchFromIP(): Promise<string> {
  try {
    const res = await fetch('https://api.country.is', { signal: AbortSignal.timeout(3000) })
    if (!res.ok) return 'US'
    const data = await res.json()
    const code = data?.country || 'US'
    return SUPPORTED_CODES.has(code) ? code : 'US'
  } catch {
    return 'US'
  }
}

/**
 * Set the country cookie client-side (mirrors what middleware does on Vercel).
 */
function setCookie(code: string) {
  if (typeof document === 'undefined') return
  document.cookie = `luma-country=${code}; path=/; max-age=86400; SameSite=Lax`
}

/**
 * Get the visitor's country code (client-side).
 * Returns immediately from cookie if available, otherwise fetches from IP geolocation.
 */
export function getVisitorCountry(): string {
  const fromCookie = getFromCookie()
  if (fromCookie) {
    console.log('[country] from cookie:', fromCookie)
    return fromCookie
  }
  // No cookie — return US for now, fetchAndSetCountry will update it
  return 'US'
}

/**
 * Async version that fetches from IP if no cookie is set.
 * Call this in useEffect to detect and cache the country.
 */
export async function detectCountry(): Promise<string> {
  const fromCookie = getFromCookie()
  if (fromCookie) {
    console.log('[country] from cookie:', fromCookie)
    return fromCookie
  }

  console.log('[country] no cookie, fetching from IP...')
  const code = await fetchFromIP()
  console.log('[country] detected from IP:', code)
  setCookie(code)
  return code
}
