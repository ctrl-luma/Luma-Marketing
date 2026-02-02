'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { publicEventsApi, type PublicEvent } from '@/lib/api/events'
import { CalendarDays, MapPin, Search, Ticket, Loader2 } from 'lucide-react'
import { io, type Socket } from 'socket.io-client'

export default function EventsPage() {
  const [events, setEvents] = useState<PublicEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchEvents = useCallback(async () => {
    try {
      const params: { search?: string } = {}
      if (debouncedSearch) params.search = debouncedSearch
      const res = await publicEventsApi.list(params)
      setEvents(res.events)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Socket.IO for real-time updates
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334'
    let socket: Socket | null = null

    try {
      socket = io(`${apiUrl}/public`, {
        transports: ['websocket', 'polling'],
        autoConnect: true,
      })

      socket.on('connect', () => {
        socket?.emit('join', 'events:public')
      })

      socket.on('EVENT_CREATED', () => fetchEvents())
      socket.on('EVENT_UPDATED', () => fetchEvents())
      socket.on('EVENT_DELETED', () => fetchEvents())
      socket.on('TICKET_PURCHASED', () => fetchEvents())
    } catch {
      // Socket not available, graceful fallback
    }

    return () => {
      socket?.disconnect()
    }
  }, [fetchEvents])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  const getLowestPrice = (event: any) => {
    // List endpoint returns minPrice directly, detail endpoint has tiers
    if (event.minPrice !== undefined && event.minPrice !== null) {
      return event.minPrice === 0 ? 'Free' : `$${parseFloat(event.minPrice).toFixed(2)}`
    }
    if (event.tiers?.length) {
      const min = Math.min(...event.tiers.map((t: any) => t.price))
      return min === 0 ? 'Free' : `$${min.toFixed(2)}`
    }
    return null
  }

  const getTotalAvailable = (event: any) => {
    if (event.tiers?.length) {
      return event.tiers.reduce((sum: number, t: any) => sum + (t.available ?? 0), 0)
    }
    return null
  }

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-24 sm:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h1 className="heading-1 mb-4">Upcoming Events</h1>
            <p className="text-lead">
              Discover events from mobile bars, food trucks, and vendors powered by Luma POS.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search events by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-gray-900/80 border border-gray-800 overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 w-3/4 bg-gray-800 rounded" />
                    <div className="h-4 w-1/2 bg-gray-800 rounded" />
                    <div className="h-4 w-2/3 bg-gray-800 rounded" />
                    <div className="flex justify-between pt-3 border-t border-gray-800">
                      <div className="h-5 w-16 bg-gray-800 rounded" />
                      <div className="h-8 w-24 bg-gray-800 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <CalendarDays className="h-16 w-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No events found</h3>
              <p className="text-gray-500">
                {debouncedSearch ? 'Try a different search term.' : 'Check back soon for upcoming events.'}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((evt) => (
                <Link
                  key={evt.id}
                  href={`/events/${evt.slug}`}
                  className="group block rounded-2xl bg-gray-900/80 border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] bg-gray-800 relative overflow-hidden">
                    {evt.imageUrl ? (
                      <img
                        src={evt.imageUrl}
                        alt={evt.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <CalendarDays className="h-12 w-12 text-gray-700" />
                      </div>
                    )}
                    {/* Price badge */}
                    {getLowestPrice(evt) && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-white">
                        {getLowestPrice(evt) === 'Free' ? 'Free' : `From ${getLowestPrice(evt)}`}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {evt.name}
                    </h3>

                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-gray-500 shrink-0" />
                        <span>{formatDate(evt.startsAt)} at {formatTime(evt.startsAt)}</span>
                      </div>
                      {evt.locationName && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500 shrink-0" />
                          <span className="truncate">{evt.locationName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-gray-500 shrink-0" />
                        <span>
                          {getTotalAvailable(evt) !== null
                            ? getTotalAvailable(evt) > 0
                              ? `${getTotalAvailable(evt)} tickets available`
                              : 'Sold out'
                            : 'Tickets available'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
