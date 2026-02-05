export const GA_MEASUREMENT_ID = 'G-LF4ZVG936Y'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export const event = (action: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params)
  }
}
