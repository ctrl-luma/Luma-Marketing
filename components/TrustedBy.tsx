'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const partners = [
  { name: 'Stripe', logo: 'STRIPE' },
  { name: 'Apple Pay', logo: 'APPLE PAY' },
  { name: 'Google Pay', logo: 'GOOGLE PAY' },
  { name: 'Visa', logo: 'VISA' },
  { name: 'Mastercard', logo: 'MASTERCARD' },
  { name: 'Amex', logo: 'AMEX' },
]

export default function TrustedBy() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-gray-950">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-sm font-semibold text-gray-400 tracking-wide uppercase mb-8">
            Powered by Stripe • Accept All Major Payment Methods
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="text-2xl font-bold text-gray-500 hover:text-gray-300 transition-colors">
                  {partner.logo}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}