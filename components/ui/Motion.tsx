'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { useEffect, useState, ReactNode } from 'react'

// Simple mobile detection - runs once on mount
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  return isMobile
}

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'> {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  x?: number
  className?: string
}

// A simpler fade-in component that skips animation on mobile
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  y = 20,
  x = 0,
  className,
  ...props
}: FadeInProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <div className={className} {...props as React.HTMLAttributes<HTMLDivElement>}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface FadeInViewProps extends FadeInProps {
  inView: boolean
}

// Fade in when in view - skips on mobile
export function FadeInView({
  children,
  inView,
  delay = 0,
  duration = 0.5,
  y = 20,
  x = 0,
  className,
  ...props
}: FadeInViewProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <div className={className} {...props as React.HTMLAttributes<HTMLDivElement>}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
