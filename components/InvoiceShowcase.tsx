'use client'

import { useFadeIn } from '@/hooks/useFadeIn'
import { FileText, Mail, Clock, Check } from 'lucide-react'
import Link from 'next/link'
import { event } from '@/lib/analytics'

const features = [
  {
    icon: FileText,
    title: 'Create & Send',
    description: 'Build invoices with line items, tax, and notes. Send to your customer in one click.',
  },
  {
    icon: Mail,
    title: 'Email Delivery',
    description: 'Invoices are emailed with a secure Stripe payment link — customers pay online.',
  },
  {
    icon: Clock,
    title: 'Payment Tracking',
    description: 'See invoice status in real time — draft, sent, paid, or overdue at a glance.',
  },
]

const invoiceLines = [
  { description: 'Bar service — Friday night event', qty: 1, price: 850.00 },
  { description: 'Premium cocktail package (50 guests)', qty: 1, price: 625.00 },
  { description: 'Glassware rental', qty: 50, price: 2.50 },
]

function MockInvoice() {
  const subtotal = invoiceLines.reduce((sum, line) => sum + line.qty * line.price, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="rounded-xl border border-gray-800 border-t-2 border-t-primary/60 bg-gray-900/80 shadow-2xl shadow-black/50 overflow-hidden">
      {/* Invoice header */}
      <div className="p-4 sm:p-6 border-b border-gray-800/80">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Invoice</div>
            <div className="text-white font-semibold text-lg">#INV-2026-0047</div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
            <Check className="h-3 w-3" />
            Paid
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-0.5">From</div>
            <div className="text-gray-300">The Craft Mobile Bar</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-0.5">To</div>
            <div className="text-gray-300">Riverside Event Co.</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-0.5">Issued</div>
            <div className="text-gray-300">Feb 8, 2026</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-0.5">Due</div>
            <div className="text-gray-300">Feb 22, 2026</div>
          </div>
        </div>
      </div>

      {/* Line items */}
      <div className="p-4 sm:p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs uppercase tracking-wider">
              <th className="text-left pb-3 font-medium">Description</th>
              <th className="text-right pb-3 font-medium w-12">Qty</th>
              <th className="text-right pb-3 font-medium w-20">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {invoiceLines.map((line, i) => (
              <tr key={i} className="border-t border-gray-800/50">
                <td className="py-2.5 pr-4">{line.description}</td>
                <td className="py-2.5 text-right text-gray-400">{line.qty}</td>
                <td className="py-2.5 text-right">${(line.qty * line.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-4 pt-4 border-t border-gray-800/80 space-y-2 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-white font-semibold text-base pt-2 border-t border-gray-800/80">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 bg-gray-950/50 border-t border-gray-800/50 flex items-center justify-between">
        <span className="text-xs text-gray-500">Paid via Stripe on Feb 10, 2026</span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-emerald-400">Payment received</span>
        </div>
      </div>
    </div>
  )
}

export default function InvoiceShowcase() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="invoice-showcase" className="section-padding bg-gradient-to-b from-gray-950 to-black relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container relative z-10">
        <div ref={ref} className={`fade-in-section ${isVisible ? 'visible' : ''} text-center max-w-3xl mx-auto mb-8 sm:mb-12`}>
          <h2 className="fade-child heading-2 mb-4">
            Professional invoices in seconds
          </h2>
          <p className="fade-child text-base sm:text-lg text-gray-400">
            Create, send, and track invoices — get paid faster without leaving your dashboard.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Mock invoice */}
          <div className={`fade-in-section from-left ${isVisible ? 'visible' : ''}`}>
            <div className="fade-child">
              <MockInvoice />
            </div>
          </div>

          {/* Features */}
          <div className={`fade-in-section from-right ${isVisible ? 'visible' : ''} space-y-6`}>
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="fade-child flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}

            {/* CTA */}
            <div className="fade-child pt-2">
              <Link
                href="/get-started"
                onClick={() => event('invoice_showcase_cta_click')}
                className="text-sm text-primary hover:text-primary-400 font-medium"
              >
                Get started for free →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
