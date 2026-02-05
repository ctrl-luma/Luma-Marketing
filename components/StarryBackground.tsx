'use client'

import { useEffect, useState } from 'react'

function Star({ size = 4, color = 'rgba(255,255,255,0.6)', style }: {
  size?: number
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px 0px ${color}`,
        ...style,
      }}
    />
  )
}

function FourPointStar({ size = 16, color = 'rgba(255,255,255,0.7)', style }: {
  size?: number
  color?: string
  style?: React.CSSProperties
}) {
  return (
    <div style={{ position: 'absolute', width: size, height: size, ...style }}>
      <div
        style={{
          position: 'absolute',
          left: size / 2 - 1,
          top: 0,
          width: 2,
          height: size,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: size / 2 - 1,
          left: 0,
          width: size,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: size / 2 - 2,
          top: size / 2 - 2,
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 ${size / 2}px 0px ${color}`,
        }}
      />
    </div>
  )
}

interface StarryBackgroundProps {
  children?: React.ReactNode
  className?: string
  subtle?: boolean
  opacity?: number
}

export default function StarryBackground({ children, className = '', subtle = false, opacity }: StarryBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const groupStyle = (anim: string): React.CSSProperties => ({
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none' as const,
    animation: mounted ? `${anim} 4s ease-in-out infinite` : 'none',
    opacity: mounted ? undefined : 0,
  })

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', opacity: opacity ?? (subtle ? 0.4 : 1) }} className={className}>
      {/* Star group 1 */}
      <div style={groupStyle('starTwinkle1')}>
        <FourPointStar style={{ top: '8%', left: '5%' }} size={16} color="rgba(255,255,255,0.6)" />
        <Star style={{ top: '15%', left: '18%' }} size={4} color="rgba(255,255,255,0.5)" />
        <Star style={{ top: '10%', left: '82%' }} size={6} color="rgba(255,255,255,0.5)" />
        <FourPointStar style={{ top: '22%', left: '90%' }} size={12} color="rgba(255,255,255,0.45)" />
        <Star style={{ top: '30%', left: '12%' }} size={3} color="rgba(255,255,255,0.4)" />
        <Star style={{ top: '12%', left: '45%' }} size={5} color="rgba(255,255,255,0.5)" />
        <Star style={{ top: '35%', left: '75%' }} size={4} color="rgba(255,255,255,0.4)" />
        <FourPointStar style={{ top: '50%', left: '30%' }} size={11} color="rgba(255,255,255,0.35)" />
        <Star style={{ top: '60%', left: '62%' }} size={3} color="rgba(255,255,255,0.4)" />
        <Star style={{ top: '75%', left: '8%' }} size={5} color="rgba(255,255,255,0.45)" />
        <FourPointStar style={{ top: '70%', left: '85%' }} size={12} color="rgba(255,255,255,0.4)" />
        <Star style={{ top: '85%', left: '40%' }} size={4} color="rgba(255,255,255,0.35)" />
        <Star style={{ top: '45%', left: '65%' }} size={3} color="rgba(255,255,255,0.4)" />
        <FourPointStar style={{ top: '90%', left: '72%' }} size={10} color="rgba(255,255,255,0.3)" />
      </div>

      {/* Star group 2 — opposite phase */}
      <div style={groupStyle('starTwinkle2')}>
        <Star style={{ top: '10%', left: '13%' }} size={5} color="rgba(255,255,255,0.5)" />
        <FourPointStar style={{ top: '18%', left: '85%' }} size={18} color="rgba(255,255,255,0.55)" />
        <Star style={{ top: '25%', left: '8%' }} size={4} color="rgba(255,255,255,0.4)" />
        <Star style={{ top: '14%', left: '55%' }} size={6} color="rgba(255,255,255,0.45)" />
        <FourPointStar style={{ top: '6%', left: '72%' }} size={11} color="rgba(255,255,255,0.4)" />
        <Star style={{ top: '32%', left: '88%' }} size={3} color="rgba(255,255,255,0.45)" />
        <Star style={{ top: '20%', left: '35%' }} size={5} color="rgba(255,255,255,0.5)" />
        <FourPointStar style={{ top: '55%', left: '58%' }} size={14} color="rgba(255,255,255,0.35)" />
        <Star style={{ top: '65%', left: '20%' }} size={4} color="rgba(255,255,255,0.4)" />
        <Star style={{ top: '80%', left: '90%' }} size={5} color="rgba(255,255,255,0.4)" />
        <FourPointStar style={{ top: '72%', left: '50%' }} size={11} color="rgba(255,255,255,0.3)" />
        <Star style={{ top: '88%', left: '15%' }} size={3} color="rgba(255,255,255,0.35)" />
        <Star style={{ top: '42%', left: '42%' }} size={4} color="rgba(255,255,255,0.4)" />
      </div>

      {children && (
        <div style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </div>
      )}
    </div>
  )
}
