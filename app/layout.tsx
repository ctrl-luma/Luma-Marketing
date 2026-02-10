import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import { AuthProvider } from '@/components/providers/AuthProvider'
import Analytics from '@/components/Analytics'
import { GA_MEASUREMENT_ID } from '@/lib/analytics'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const viewport: Viewport = {
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Mobile POS for Bars, Food Trucks & Events`,
  description: 'Accept payments anywhere with Tap to Pay on your phone. Built for mobile bars, food trucks, and event vendors. No hardware needed, lower fees, instant payouts.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3333'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Luma POS - Mobile Payments for Bars, Food Trucks & Events',
    description: 'Accept payments anywhere with Tap to Pay on your phone. Built for mobile bars, food trucks, and event vendors. No hardware, lower fees, instant payouts.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://lumapos.co',
    siteName: 'Luma POS',
    images: [
      {
        url: '/app-icon-black-square.png',
        width: 1024,
        height: 1024,
        alt: 'Luma POS',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Luma POS - Mobile Payments for Bars, Food Trucks & Events',
    description: 'Accept payments anywhere with Tap to Pay. Built for mobile bars, food trucks, and event vendors. No hardware, lower fees.',
    images: ['/app-icon-black-square.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Luma POS',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `}
        </Script>
      </head>
      <body>
        <AuthProvider>
          <Analytics />
          <ScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}