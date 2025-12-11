'use client'

import { useState, useEffect } from 'react'

export function useIsMobile(breakpoint: number = 1024): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check on mount
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)
    checkMobile()

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [breakpoint])

  return isMobile
}

// Simplified animation variants for mobile
export const mobileOptimizedTransition = {
  duration: 0.2,
  ease: 'easeOut'
}

export const desktopTransition = {
  duration: 0.5,
  ease: 'easeOut'
}
