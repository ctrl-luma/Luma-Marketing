'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { publicEventsApi, type PublicEvent, type PublicTier } from '@/lib/api/events'
import { CalendarDays, MapPin, Clock, Ticket, Users, ArrowLeft, Loader2, ExternalLink, Mail, ShieldAlert, AlertTriangle, Plus, Minus, Share2 } from 'lucide-react'
import { io, type Socket } from 'socket.io-client'

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [event, setEvent] = useState<PublicEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [copied, setCopied] = useState(false)

  // Only one tier can be selected at a time — the one with qty > 0
  const selectedTierId = Object.entries(quantities).find(([, qty]) => qty > 0)?.[0] || null
  const totalQuantity = Object.values(quantities).reduce((sum, q) => sum + q, 0)
  const totalPrice = event?.tiers
    ? Object.entries(quantities).reduce((sum, [tierId, qty]) => {
        const tier = event.tiers.find(t => t.id === tierId)
        return sum + (tier ? tier.price * qty : 0)
      }, 0)
    : 0

  const fetchEvent = useCallback(async () => {
    try {
      const res = await publicEventsApi.getBySlug(slug)
      setEvent(res.event)
    } catch {
      setError('Event not found')
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    fetchEvent()
  }, [fetchEvent])

  // Real-time updates for ticket availability
  useEffect(() => {
    if (!event) return
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334'
    let socket: Socket | null = null

    try {
      socket = io(`${apiUrl}/public`, {
        transports: ['websocket', 'polling'],
        autoConnect: true,
      })

      socket.on('connect', () => {
        socket?.emit('join', `event:${event.id}`)
      })

      socket.on('TICKET_PURCHASED', () => fetchEvent())
      socket.on('TICKET_REFUNDED', () => fetchEvent())
    } catch {
      // graceful fallback
    }

    return () => {
      socket?.disconnect()
    }
  }, [event?.id, fetchEvent])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatDateShort = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  const isSoldOut = (tier: PublicTier) => {
    return tier.maxQuantity !== null && tier.available !== null && tier.available <= 0
  }

  const salesOpen = event
    ? (!event.salesStartAt || new Date(event.salesStartAt) <= new Date()) &&
      (!event.salesEndAt || new Date(event.salesEndAt) > new Date())
    : false

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: event?.name, url })
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <Header />
        <main className="pt-20 sm:pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
            {/* Banner skeleton */}
            <div className="h-48 sm:h-64 md:h-80 bg-gray-800/50 rounded-2xl mt-6 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-10 w-3/4 bg-gray-800 rounded-lg" />
                <div className="h-5 w-1/3 bg-gray-800/60 rounded" />
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div className="h-24 bg-gray-800/40 rounded-2xl" />
                  <div className="h-24 bg-gray-800/40 rounded-2xl" />
                </div>
                <div className="h-40 bg-gray-800/30 rounded-2xl mt-4" />
              </div>
              <div className="space-y-4">
                <div className="h-8 w-24 bg-gray-800 rounded-lg" />
                <div className="h-40 bg-gray-800/40 rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="relative min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="h-20 w-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
            <CalendarDays className="h-10 w-10 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Event Not Found</h1>
          <p className="text-gray-400 mb-8 max-w-sm">This event may have ended or the link may be incorrect.</p>
          <Link href="/events" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 transition-colors">
            Browse Events
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-20 sm:pt-24 pb-16">
        {/* Hero Banner */}
        {(event.bannerUrl || event.imageUrl) && (
          <div className="w-full h-56 sm:h-72 md:h-96 bg-gray-900 relative overflow-hidden">
            <img
              src={event.bannerUrl || event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            {/* Overlay event title on banner for large screens */}
            <div className="absolute bottom-0 left-0 right-0 hidden md:block">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">{event.name}</h1>
                    {event.organizationName && (
                      <p className="text-gray-300 text-sm">Hosted by <span className="text-white font-medium">{event.organizationName}</span></p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link & share (mobile) */}
          <div className="flex items-center justify-between mt-6 mb-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              All Events
            </Link>
            {!(event.bannerUrl || event.imageUrl) && (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" />
                {copied ? 'Copied!' : 'Share'}
              </button>
            )}
            {(event.bannerUrl || event.imageUrl) && (
              <button
                type="button"
                onClick={handleShare}
                className="md:hidden inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" />
                {copied ? 'Copied!' : 'Share'}
              </button>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Event Details */}
            <div className="lg:col-span-2">
              {/* Title (mobile only if banner exists, always if no banner) */}
              {(event.bannerUrl || event.imageUrl) ? (
                <div className="md:hidden mb-6">
                  <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
                  {event.organizationName && (
                    <p className="text-gray-400 text-sm">Hosted by <span className="text-gray-300">{event.organizationName}</span></p>
                  )}
                </div>
              ) : (
                <div className="mb-6">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{event.name}</h1>
                  {event.organizationName && (
                    <p className="text-gray-400 text-sm">Hosted by <span className="text-gray-300">{event.organizationName}</span></p>
                  )}
                </div>
              )}

              {/* Quick info strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300 mb-8 pb-6 border-b border-gray-800/60">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>{formatDateShort(event.startsAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{formatTime(event.startsAt)} – {formatTime(event.endsAt)}</span>
                </div>
                {event.locationName && (
                  <button
                    type="button"
                    onClick={() => {
                      const q = encodeURIComponent(event.locationAddress || event.locationName || '')
                      const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)
                      window.open(isApple ? `https://maps.apple.com/?q=${q}` : `https://maps.google.com/maps?q=${q}`, '_blank')
                    }}
                    className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="underline decoration-gray-600 underline-offset-2">{event.locationName}</span>
                  </button>
                )}
              </div>

              {/* Detail cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/60">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date & Time</p>
                    <p className="text-sm font-medium text-white">{formatDate(event.startsAt)}</p>
                    <p className="text-sm text-gray-400">
                      {formatTime(event.startsAt)} – {formatTime(event.endsAt)}
                    </p>
                  </div>
                </div>

                {event.locationName && (
                  <button
                    type="button"
                    onClick={() => {
                      const q = encodeURIComponent(event.locationAddress || event.locationName || '')
                      const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)
                      window.open(isApple ? `https://maps.apple.com/?q=${q}` : `https://maps.google.com/maps?q=${q}`, '_blank')
                    }}
                    className="w-full text-left flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800/60 hover:border-gray-700 transition-colors group cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
                      <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{event.locationName}</p>
                      {event.locationAddress && (
                        <p className="text-sm text-gray-400">{event.locationAddress}</p>
                      )}
                      <p className="text-xs text-primary mt-1.5 flex items-center gap-1">
                        Open in Maps <ExternalLink className="h-3 w-3" />
                      </p>
                    </div>
                  </button>
                )}
              </div>

              {/* Age restriction */}
              {event.ageRestriction && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 text-amber-300 text-sm mb-8">
                  <ShieldAlert className="h-5 w-5 shrink-0" />
                  <span>{event.ageRestriction}</span>
                </div>
              )}

              {/* Description */}
              {event.description && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-4">About this event</h2>
                  <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {event.description}
                  </div>
                </div>
              )}

              {/* Contact & Policies */}
              {(event.contactEmail || event.refundPolicy) && (
                <div className="space-y-3 pt-6 border-t border-gray-800/60">
                  {event.contactEmail && (
                    <div className="flex items-center gap-2.5 text-sm text-gray-400">
                      <Mail className="h-4 w-4 text-gray-500 shrink-0" />
                      <span>Questions? <a href={`mailto:${event.contactEmail}`} className="text-primary hover:underline">{event.contactEmail}</a></span>
                    </div>
                  )}
                  {event.refundPolicy && (
                    <div className="flex items-start gap-2.5 text-sm text-gray-400">
                      <AlertTriangle className="h-4 w-4 text-gray-500 shrink-0 mt-0.5" />
                      <span>{event.refundPolicy}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ticket Tiers Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="rounded-2xl border border-gray-800/60 bg-gradient-to-b from-gray-900/80 to-gray-950/80 p-6">
                  <h2 className="text-lg font-semibold text-white mb-5">Tickets</h2>

                  {!salesOpen && (
                    <div className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm mb-5">
                      {event.salesStartAt && new Date(event.salesStartAt) > new Date()
                        ? `Sales open ${formatDateShort(event.salesStartAt)} at ${formatTime(event.salesStartAt)}`
                        : 'Ticket sales have ended'}
                    </div>
                  )}

                  <div className="space-y-3">
                    {event.tiers
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((tier) => {
                        const soldOut = isSoldOut(tier)
                        const qty = quantities[tier.id] || 0
                        const isSelected = qty > 0
                        const maxQty = Math.min(
                          event.maxTicketsPerOrder || 10,
                          tier.available !== null ? tier.available : 999
                        )
                        return (
                          <div
                            key={tier.id}
                            className={`rounded-xl border p-4 transition-all ${
                              soldOut
                                ? 'bg-gray-900/30 border-gray-800/50 opacity-50'
                                : isSelected
                                ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20'
                                : 'bg-gray-900/40 border-gray-800/60 hover:border-gray-700'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-1.5">
                              <h3 className="font-semibold text-white text-sm">{tier.name}</h3>
                              <span className={`text-base font-bold ${isSelected ? 'text-primary' : 'text-white'}`}>
                                {tier.price === 0 ? 'Free' : `$${tier.price.toFixed(2)}`}
                              </span>
                            </div>

                            {tier.description && (
                              <p className="text-xs text-gray-400 mb-3 leading-relaxed">{tier.description}</p>
                            )}

                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${soldOut ? 'text-red-400' : 'text-gray-500'}`}>
                                {soldOut
                                  ? 'Sold out'
                                  : tier.available !== null
                                  ? `${tier.available} left`
                                  : 'Available'}
                              </span>

                              {salesOpen && !soldOut && (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setQuantities(prev => ({ ...prev, [tier.id]: Math.max(0, qty - 1) }))}
                                    disabled={qty === 0}
                                    className="h-7 w-7 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-5 text-center text-sm font-medium text-white tabular-nums">{qty}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newQty = Math.min(maxQty, qty + 1)
                                      const reset: Record<string, number> = {}
                                      event!.tiers.forEach(t => { reset[t.id] = 0 })
                                      reset[tier.id] = newQty
                                      setQuantities(reset)
                                    }}
                                    disabled={qty >= maxQty}
                                    className="h-7 w-7 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                  </div>

                  {/* Go to Checkout button */}
                  {selectedTierId && totalQuantity > 0 && (
                    <Link
                      href={`/events/${slug}/checkout?tier=${selectedTierId}&qty=${quantities[selectedTierId]}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors mt-5"
                    >
                      <Ticket className="h-4 w-4" />
                      Go to Checkout · {totalQuantity} {totalQuantity === 1 ? 'ticket' : 'tickets'}
                      {totalPrice > 0 ? ` · $${totalPrice.toFixed(2)}` : ' · Free'}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
