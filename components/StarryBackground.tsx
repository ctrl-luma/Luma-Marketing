'use client'

import { memo } from 'react'

interface StarryBackgroundProps {
  children?: React.ReactNode
  className?: string
  subtle?: boolean
  opacity?: number
}

export default memo(function StarryBackground({ children, className = '', subtle = false, opacity }: StarryBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        opacity: opacity ?? (subtle ? 0.4 : 1),
        contain: 'strict',
      }}
    >
      <div className="starry-group-1" style={{ opacity: 0.7 }} />
      <div className="starry-group-2" style={{ opacity: 0.5 }} />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
})
