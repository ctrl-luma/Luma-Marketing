import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Event Image'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3334'

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let imageUrl: string | null = null
  let eventName = 'Luma Event'

  try {
    const res = await fetch(`${API_URL}/events/public/${slug}`, {
      next: { revalidate: 60 },
    })
    if (res.ok) {
      const { event } = await res.json()
      imageUrl = event.imageUrl || event.bannerUrl
      eventName = event.name || eventName
    }
  } catch {
    // Fall through to fallback
  }

  if (imageUrl) {
    // Fetch the actual image and return it with correct content-type
    try {
      const imgRes = await fetch(imageUrl)
      if (imgRes.ok) {
        const buffer = await imgRes.arrayBuffer()
        const bytes = new Uint8Array(buffer)

        // Detect content type from magic bytes
        let type = 'image/png'
        if (bytes[0] === 0xFF && bytes[1] === 0xD8) type = 'image/jpeg'
        else if (bytes[0] === 0x89 && bytes[1] === 0x50) type = 'image/png'
        else if (bytes[0] === 0x52 && bytes[1] === 0x49) type = 'image/webp'
        else if (bytes[0] === 0x47 && bytes[1] === 0x49) type = 'image/gif'

        return new Response(buffer, {
          headers: { 'Content-Type': type },
        })
      }
    } catch {
      // Fall through to generated fallback
    }
  }

  // Fallback: generate a simple branded image with event name
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#3b82f6',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '24px',
          }}
        >
          LUMA EVENTS
        </div>
        <div
          style={{
            fontSize: 56,
            color: '#ffffff',
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          {eventName}
        </div>
      </div>
    ),
    { ...size },
  )
}
