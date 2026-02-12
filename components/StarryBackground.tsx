'use client'

import { useEffect, useState, memo } from 'react'

interface StarryBackgroundProps {
  children?: React.ReactNode
  className?: string
  subtle?: boolean
  opacity?: number
}

export default memo(function StarryBackground({ children, className = '', subtle = false, opacity }: StarryBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: opacity ?? (subtle ? 0.4 : 1) }}
    >
      <div
        className="starry-group-1"
        style={{
          animation: mounted ? 'starTwinkle1 4s ease-in-out infinite' : 'none',
          opacity: mounted ? undefined : 0,
        }}
      />
      <div
        className="starry-group-2"
        style={{
          animation: mounted ? 'starTwinkle2 4s ease-in-out infinite' : 'none',
          opacity: mounted ? undefined : 0,
        }}
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
})
