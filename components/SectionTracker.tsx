'use client'

import { useEffect, useRef } from 'react'
import { event } from '@/lib/analytics'

interface SectionTrackerProps {
  section: string
  children: React.ReactNode
  className?: string
}

export default function SectionTracker({ section, children, className }: SectionTrackerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tracked = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          event('section_view', { section })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [section])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
