'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Eye, Heart } from 'lucide-react'

const values = [
  {
    title: 'Our Mission',
    description: 'Enable businesses to set up, accept payments, and track sales with minimal hardware. Start small on mobile, scale seamlessly to retail.',
    icon: Target,
  },
  {
    title: 'Our Vision',
    description: 'Create a modern, Stripe-native ecosystem that empowers vendors from their first pop-up to their flagship location.',
    icon: Eye,
  },
  {
    title: 'Our Values',
    description: 'Speed, simplicity, transparency. No hidden fees, no long contracts, no proprietary hardware. Just tools that work when you need them.',
    icon: Heart,
  },
]

export default function Mission() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-gray-900">
      <div className="container">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { label: 'Founded', value: '2025' },
            { label: 'Active Events', value: '100+' },
            { label: 'Processed Volume', value: '$1M+' },
            { label: 'Avg Rating', value: '4.9⭐' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}