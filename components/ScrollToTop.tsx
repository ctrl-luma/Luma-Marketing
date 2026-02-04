'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SCROLL_OFFSET = 50 // Offset for fixed header

function scrollToHash(hash: string) {
  const element = document.querySelector(hash)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    window.scrollTo({ top, behavior: 'instant' })
  }
}

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Check for hash in URL
    const hash = window.location.hash

    if (hash) {
      // Small delay to ensure layout is complete
      requestAnimationFrame(() => {
        scrollToHash(hash)
      })
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
        scrollToHash(hash)
      }, 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return null
}