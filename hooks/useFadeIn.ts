'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight fade-in hook using native Intersection Observer
 * No external dependencies, GPU-accelerated CSS animations
 */
export function useFadeIn(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element) // Only trigger once
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}
