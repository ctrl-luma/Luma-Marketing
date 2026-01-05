import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://lumapos.co'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/onboarding/',
        '/subscription/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
