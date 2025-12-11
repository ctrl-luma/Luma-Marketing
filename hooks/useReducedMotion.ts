'use client'

import { useState, useEffect } from 'react'

/**
 * Hook that returns true if we should reduce/disable animations
 * Returns true on mobile (<1024px) or if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(true) // Default true to prevent flash

  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setShouldReduce(isMobile || prefersReduced)
  }, [])

  return shouldReduce
}

/**
 * Returns animation props that are disabled on mobile
 * Use this to wrap framer-motion initial/animate/transition props
 */
export function useAnimationProps(props: {
  initial?: object
  animate?: object
  transition?: object
}) {
  const shouldReduce = useReducedMotion()

  if (shouldReduce) {
    // Return empty props to skip animation, show final state immediately
    return {
      initial: undefined,
      animate: undefined,
      transition: undefined,
    }
  }

  return props
}
