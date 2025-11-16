'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const contactItems = [
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@lumapos.co',
    link: 'mailto:contact@lumapos.co',
  },
  {
    icon: Phone,
    title: 'Sales',
    content: '+1 (912) 549-3637',
    link: 'tel:+19125493637',
  },
  {
    icon: MapPin,
    title: 'Office',
    content: 'Remote-first company',
    link: null,
  },
  {
    icon: Clock,
    title: 'Support Hours',
    content: '24/7 for events',
    link: null,
  },
]

export default function ContactInfo() {
  return (
    <section className="section-padding bg-gray-950">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-400">{item.content}</p>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}