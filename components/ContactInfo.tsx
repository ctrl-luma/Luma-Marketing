'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare } from 'lucide-react'

const contactItems = [
  {
    icon: Mail,
    title: 'Email us',
    content: 'support@lumapos.co',
    link: 'mailto:support@lumapos.co',
  },
  {
    icon: MessageSquare,
    title: 'Response time',
    content: 'Usually within 24 hours',
    link: null,
  },
]

export default function ContactInfo() {
  return (
    <section className="py-4 sm:py-6 bg-black">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16">
          {contactItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 sm:gap-4"
              >
                <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-lg">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">{item.title}</p>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-sm sm:text-base text-white hover:text-primary transition-colors font-medium"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base text-white font-medium">{item.content}</p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}