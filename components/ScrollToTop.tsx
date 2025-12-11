'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Check for hash in URL
    const hash = window.location.hash

    if (hash) {
      // If there's a hash, scroll to that element
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView()
      }
    } else {
      // No hash, scroll to top
      window.scrollTo(0, 0)
    }
  }, [pathname])

  // Handle initial page load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView()
        }
      }, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return null
}