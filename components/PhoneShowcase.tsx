'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

interface PhoneShowcaseProps {
  mobile?: boolean
}

function PhoneFrame({ children, className = '', small = false }: { children: React.ReactNode; className?: string; small?: boolean }) {
  return (
    <div className={`bg-gradient-to-b from-[#272f3b] to-[#161b24] shadow-2xl shadow-black/50 ${small ? 'rounded-[2rem] p-1.5' : 'rounded-[3rem] p-3'} ${className}`}>
      <div className={`w-full h-full bg-gradient-to-br from-gray-950 to-black overflow-hidden relative ${small ? 'rounded-[1.5rem]' : 'rounded-[2.5rem]'}`}>
        {/* Dynamic Island */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 bg-black z-20 ${small ? 'w-16 h-4 rounded-b-lg' : 'w-24 h-6 rounded-b-xl'}`} />
        {children}
      </div>
    </div>
  )
}

function PhoneWithScreenshot({ src, alt, onLoad }: { src: string; alt: string; onLoad?: () => void }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-b from-[#272f3b] to-[#161b24] flex items-center justify-center">
        <span className="text-gray-600 text-sm">Screenshot</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="280px"
      priority
      className="object-cover"
      onLoad={() => onLoad?.()}
      onError={() => { setHasError(true); onLoad?.() }}
    />
  )
}

const IMAGE_COUNT = 3

export default function PhoneShowcase({ mobile = false }: PhoneShowcaseProps) {
  const [ready, setReady] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)

  const onImageLoad = useCallback(() => {
    setLoadedCount(prev => prev + 1)
  }, [])

  // Trigger animation once all images loaded (or after 4s fallback)
  useEffect(() => {
    if (loadedCount >= IMAGE_COUNT) {
      // Small delay so the browser has painted the images before animating
      const id = requestAnimationFrame(() => setReady(true))
      return () => cancelAnimationFrame(id)
    }
  }, [loadedCount])

  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 4000)
    return () => clearTimeout(timeout)
  }, [])

  if (mobile) {
    return (
      <div className="relative flex items-center justify-center" style={{ height: 400 }}>
        {/* Glow */}
        <div className="absolute inset-0 bg-primary/10 rounded-full" style={{ filter: 'blur(40px)' }} />

        <div className="relative z-10 mx-auto" style={{ width: 300, height: 400 }}>
          {/* Left phone */}
          <div
            className="absolute origin-center"
            style={{
              left: '50%',
              top: '50%',
              zIndex: 1,
              transform: ready
                ? 'translate(-50%, -50%) translateX(-70px) rotate(15deg) scale(0.85)'
                : 'translate(-50%, -50%) translateX(0) rotate(0deg) scale(0.85)',
              opacity: ready ? 1 : 0,
              transition: 'transform 0.8s ease-out 0.4s, opacity 0.8s ease-out 0.4s',
            }}
          >
            <PhoneFrame small className="w-[150px] h-[320px]">
              <PhoneWithScreenshot src="/screenshots/hero-left.webp" alt="Luma POS menu view" onLoad={onImageLoad} />
            </PhoneFrame>
          </div>

          {/* Right phone */}
          <div
            className="absolute origin-center"
            style={{
              left: '50%',
              top: '50%',
              zIndex: 1,
              transform: ready
                ? 'translate(-50%, -50%) translateX(70px) rotate(-15deg) scale(0.85)'
                : 'translate(-50%, -50%) translateX(0) rotate(0deg) scale(0.85)',
              opacity: ready ? 1 : 0,
              transition: 'transform 0.8s ease-out 0.4s, opacity 0.8s ease-out 0.4s',
            }}
          >
            <PhoneFrame small className="w-[150px] h-[320px]">
              <PhoneWithScreenshot src="/screenshots/hero-right.webp" alt="Luma POS order history" onLoad={onImageLoad} />
            </PhoneFrame>
          </div>

          {/* Center phone (on top) */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              zIndex: 2,
              opacity: ready ? 1 : 0,
              transform: ready
                ? 'translate(-50%, -50%) translateY(0)'
                : 'translate(-50%, -50%) translateY(15px)',
              transition: 'transform 0.5s ease-out 0.1s, opacity 0.5s ease-out 0.1s',
            }}
          >
            <PhoneFrame small className="w-[170px] h-[360px]">
              <PhoneWithScreenshot src="/screenshots/hero-center.webp" alt="Luma POS tap to pay" onLoad={onImageLoad} />
            </PhoneFrame>
          </div>
        </div>
      </div>
    )
  }

  // Desktop: 3 phones with CSS fan-out
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 620 }}>

      <div className="relative z-10" style={{ width: 500, height: 620 }}>
        {/* Left phone */}
        <div
          className="absolute left-1/2 top-1/2 origin-center"
          style={{
            zIndex: 1,
            transform: ready
              ? 'translate(-50%, -50%) translateX(-120px) rotate(15deg) scale(0.9)'
              : 'translate(-50%, -50%) translateX(0) rotate(0deg) scale(0.9)',
            opacity: ready ? 1 : 0,
            transition: 'transform 0.8s ease-out 0.6s, opacity 0.8s ease-out 0.6s',
          }}
        >
          <PhoneFrame className="w-[250px] h-[520px]">
            <PhoneWithScreenshot src="/screenshots/hero-left.webp" alt="Luma POS menu view" onLoad={onImageLoad} />
          </PhoneFrame>
        </div>

        {/* Right phone */}
        <div
          className="absolute left-1/2 top-1/2 origin-center"
          style={{
            zIndex: 1,
            transform: ready
              ? 'translate(-50%, -50%) translateX(120px) rotate(-15deg) scale(0.9)'
              : 'translate(-50%, -50%) translateX(0) rotate(0deg) scale(0.9)',
            opacity: ready ? 1 : 0,
            transition: 'transform 0.8s ease-out 0.6s, opacity 0.8s ease-out 0.6s',
          }}
        >
          <PhoneFrame className="w-[250px] h-[520px]">
            <PhoneWithScreenshot src="/screenshots/hero-right.webp" alt="Luma POS order history" onLoad={onImageLoad} />
          </PhoneFrame>
        </div>

        {/* Center phone (on top) */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            zIndex: 2,
            opacity: ready ? 1 : 0,
            transform: ready
              ? 'translate(-50%, -50%) translateY(0)'
              : 'translate(-50%, -50%) translateY(20px)',
            transition: 'transform 0.5s ease-out 0.3s, opacity 0.5s ease-out 0.3s',
          }}
        >
          <PhoneFrame className="w-[280px] h-[580px]">
            <PhoneWithScreenshot src="/screenshots/hero-center.webp" alt="Luma POS tap to pay" onLoad={onImageLoad} />
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}
