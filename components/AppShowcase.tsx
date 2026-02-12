'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { event } from '@/lib/analytics'

function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    const tryPlay = () => {
      if (!document.hidden) {
        video.play().catch(() => {})
      }
    }

    video.addEventListener('canplay', tryPlay, { once: true })
    tryPlay()

    // Click-to-play fallback for mobile
    const onClick = () => tryPlay()
    video.addEventListener('click', onClick)

    // Pause when scrolled out of view, resume when back
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || document.hidden) {
          video.pause()
        } else {
          tryPlay()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(video)

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else tryPlay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      video.removeEventListener('click', onClick)
      video.removeEventListener('canplay', tryPlay)
    }
  }, [isMobile])

  return (
    <div
      className="relative aspect-video bg-gray-950 bg-cover bg-center"
      style={{ backgroundImage: 'url(/analytics-poster.webp)' }}
    >
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        {isMobile ? (
          <source src="/analytics-loop.mp4" type="video/mp4" />
        ) : (
          <>
            <source src="/analytics-loop-av1.webm" type='video/webm; codecs="av01.0.05M.08"' />
            <source src="/analytics-loop.webm" type="video/webm" />
            <source src="/analytics-loop.mp4" type="video/mp4" />
          </>
        )}
      </video>
    </div>
  )
}

export default function AppShowcase() {
  const [initialLoad, setInitialLoad] = useState(false)
  useEffect(() => {
    if (window.location.hash) {
      setInitialLoad(true)
    }
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const shouldAnimate = inView || initialLoad

  return (
    <section id="app-showcase" className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden scroll-mt-24">
      {/* Background elements - hidden on mobile */}
      <div className="hidden lg:block absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="heading-2 mb-3 sm:mb-4"
          >
            See everything in real-time
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-gray-400"
          >
            Your dashboard updates live as transactions happen. No refreshing, no waiting.
          </motion.p>
        </div>

        {/* Dashboard screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Browser chrome */}
            <div className="bg-gray-900 rounded-t-lg sm:rounded-t-xl p-2 sm:p-3 flex items-center gap-2 border border-gray-800 border-b-0">
              <div className="flex gap-1 sm:gap-1.5">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-2 sm:mx-4">
                <a
                  href={process.env.NEXT_PUBLIC_DASHBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => event('dashboard_url_click', { location: 'app_showcase' })}
                  className="block bg-gray-800 rounded-md sm:rounded-lg px-2 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-400 max-w-md mx-auto hover:text-gray-200 hover:underline transition-colors cursor-pointer"
                >
                  {process.env.NEXT_PUBLIC_DASHBOARD_URL}
                </a>
              </div>
            </div>

            {/* Dashboard demo video */}
            <div className="rounded-b-lg sm:rounded-b-xl border border-gray-800 border-t-0 overflow-hidden">
              <DemoVideo />
            </div>

            {/* Glow effect - hidden on mobile */}
            <div className="hidden lg:block absolute -inset-4 bg-primary/10 blur-2xl -z-10 rounded-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
