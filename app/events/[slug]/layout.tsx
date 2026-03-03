import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334'

interface EventData {
  event: {
    name: string
    slug: string
    description: string | null
    startsAt: string
    timezone: string
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  try {
    const res = await fetch(`${API_URL}/events/public/${slug}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) return {}

    const { event } = (await res.json()) as EventData

    const title = `${event.name} | Luma Events`
    const tz = event.timezone || 'America/New_York'
    const description = event.description
      ? event.description.slice(0, 160)
      : `${event.name} — ${new Date(event.startsAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          timeZone: tz,
        })}`

    return {
      title,
      description,
      openGraph: {
        title: event.name,
        description,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: event.name,
        description,
      },
    }
  } catch {
    return {}
  }
}

export default function EventLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
