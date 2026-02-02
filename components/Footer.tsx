'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail } from 'lucide-react'
import { event } from '@/lib/analytics'

const footerLinks = {
  product: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Events', href: '/events' },
    { name: 'Get Started', href: '/get-started' },
    { name: 'Download App', href: '/download' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
}

const socialLinks = [
  { name: 'Email', icon: Mail, href: 'mailto:support@lumapos.co' },
]

export default function Footer() {
  const pathname = usePathname()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const hash = href.substring(1)

      if (pathname === '/') {
        // Already on home page, scroll to element with offset
        e.preventDefault()
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
      // If on different page, let normal navigation happen
    }
  }

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-primary">Luma</span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
              The mobile POS for events. Lower fees, no contracts.
            </p>
            <a
              href="mailto:support@lumapos.co"
              onClick={() => event('footer_click_email')}
              className="text-gray-500 hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-2"
            >
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              support@lumapos.co
            </a>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-100 tracking-wider uppercase mb-3 sm:mb-4">
              Product
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => { handleNavClick(e, link.href); event(`footer_click_${link.name.toLowerCase().replace(/\s+/g, '_')}`) }}
                    className="text-gray-400 hover:text-primary text-xs sm:text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-100 tracking-wider uppercase mb-3 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => event(`footer_click_${link.name.toLowerCase().replace(/\s+/g, '_')}`)}
                    className="text-gray-400 hover:text-primary text-xs sm:text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-100 tracking-wider uppercase mb-3 sm:mb-4">
              Legal
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => event(`footer_click_${link.name.toLowerCase().replace(/\s+/g, '_')}`)}
                    className="text-gray-400 hover:text-primary text-xs sm:text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <p className="text-center text-xs sm:text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Luma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}