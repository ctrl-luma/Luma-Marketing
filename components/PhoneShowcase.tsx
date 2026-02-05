'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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

function PlaceholderScreen({ label }: { label: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#272f3b] to-[#161b24] flex items-center justify-center">
      <span className="text-gray-600 text-sm">{label}</span>
    </div>
  )
}

function PhoneWithScreenshot({ src, alt, placeholder }: { src: string; alt: string; placeholder: string }) {
  const [hasError, setHasError] = useState(false)

  return (
    <>
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setHasError(true)}
        />
      )}
      {hasError && <PlaceholderScreen label={placeholder} />}
    </>
  )
}

export default function PhoneShowcase({ mobile = false }: PhoneShowcaseProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(timer)
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
              transform: mounted
                ? 'translate(-50%, -50%) translateX(-70px) rotate(15deg) scale(0.85)'
                : 'translate(-50%, -50%) translateX(0) rotate(0deg) scale(0.85)',
              opacity: mounted ? 1 : 0,
              transition: 'transform 0.8s ease-out 0.4s, opacity 0.8s ease-out 0.4s',
            }}
          >
            <PhoneFrame small className="w-[150px] h-[320px]">
              <PhoneWithScreenshot src="/screenshots/hero-left.webp" alt="Luma POS menu view" placeholder="Left Screenshot" />
            </PhoneFrame>
          </div>

          {/* Right phone */}
          <div
            className="absolute origin-center"
            style={{
              left: '50%',
              top: '50%',
              zIndex: 1,
              transform: mounted
                ? 'translate(-50%, -50%) translateX(70px) rotate(-15deg) scale(0.85)'
                : 'translate(-50%, -50%) translateX(0) rotate(0deg) scale(0.85)',
              opacity: mounted ? 1 : 0,
              transition: 'transform 0.8s ease-out 0.4s, opacity 0.8s ease-out 0.4s',
            }}
          >
            <PhoneFrame small className="w-[150px] h-[320px]">
              <PhoneWithScreenshot src="/screenshots/hero-right.webp" alt="Luma POS order history" placeholder="Right Screenshot" />
            </PhoneFrame>
          </div>

          {/* Center phone (on top) */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              zIndex: 2,
              opacity: mounted ? 1 : 0,
              transform: mounted
                ? 'translate(-50%, -50%) translateY(0)'
                : 'translate(-50%, -50%) translateY(15px)',
              transition: 'transform 0.5s ease-out 0.1s, opacity 0.5s ease-out 0.1s',
            }}
          >
            <PhoneFrame small className="w-[170px] h-[360px]">
              <PhoneWithScreenshot src="/screenshots/hero-center.webp" alt="Luma POS tap to pay" placeholder="Center Screenshot" />
            </PhoneFrame>
          </div>
        </div>
      </div>
    )
  }

  // Desktop: 3 phones with Framer Motion fan-out
  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 620 }}>
      {/* Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />

      <div className="relative z-10" style={{ width: 500, height: 620 }}>
        {/* Left phone */}
        <motion.div
          initial={{ x: 0, rotate: 0, opacity: 0, scale: 0.9 }}
          animate={{ x: -120, rotate: 15, opacity: 1, scale: 0.9 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
          style={{ zIndex: 1 }}
        >
          <PhoneFrame className="w-[250px] h-[520px]">
            <PhoneWithScreenshot src="/screenshots/hero-left.webp" alt="Luma POS menu view" placeholder="Left Screenshot" />
          </PhoneFrame>
        </motion.div>

        {/* Right phone */}
        <motion.div
          initial={{ x: 0, rotate: 0, opacity: 0, scale: 0.9 }}
          animate={{ x: 120, rotate: -15, opacity: 1, scale: 0.9 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
          style={{ zIndex: 1 }}
        >
          <PhoneFrame className="w-[250px] h-[520px]">
            <PhoneWithScreenshot src="/screenshots/hero-right.webp" alt="Luma POS order history" placeholder="Right Screenshot" />
          </PhoneFrame>
        </motion.div>

        {/* Center phone (on top) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 2 }}
        >
          <PhoneFrame className="w-[280px] h-[580px]">
            <PhoneWithScreenshot src="/screenshots/hero-center.webp" alt="Luma POS tap to pay" placeholder="Center Screenshot" />
          </PhoneFrame>
        </motion.div>
      </div>
    </div>
  )
}
