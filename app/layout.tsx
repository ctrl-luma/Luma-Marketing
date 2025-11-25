import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Modern Point of Sale System`,
  description: 'A highly scalable, fast and secure POS platform for modern businesses',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3333'),
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>
        <AuthProvider>
          <ScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}