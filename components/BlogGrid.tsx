'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: 'How to Maximize Tips at Your Next Pop-up Event',
    excerpt: 'Learn proven strategies to increase tips by 30% at mobile bar events, from payment timing to menu psychology.',
    date: '2025-01-15',
    category: 'Tips & Tricks',
    image: '/blog/tips-strategies.jpg',
    slug: 'maximize-tips-popup-events',
  },
  {
    id: 2,
    title: 'Introducing Tap to Pay on Android',
    excerpt: 'Luma POS now supports Tap to Pay on Android devices. Accept contactless payments without any additional hardware.',
    date: '2025-01-10',
    category: 'Product Update',
    image: '/blog/android-tap-to-pay.jpg',
    slug: 'tap-to-pay-android-launch',
  },
  {
    id: 3,
    title: 'Revenue Splits: Simplifying Event Partnerships',
    excerpt: 'Our new revenue split feature automatically divides payments between venues, promoters, and operators.',
    date: '2025-01-05',
    category: 'Feature Spotlight',
    image: '/blog/revenue-splits.jpg',
    slug: 'revenue-splits-feature',
  },
  {
    id: 4,
    title: '5 Mobile Bar Trends for 2025',
    excerpt: "From craft mocktails to sustainable practices, discover what's trending in the mobile bar industry this year.",
    date: '2024-12-28',
    category: 'Industry Insights',
    image: '/blog/mobile-bar-trends.jpg',
    slug: 'mobile-bar-trends-2025',
  },
  {
    id: 5,
    title: 'Case Study: $50K Weekend with Luma POS',
    excerpt: 'How The Rolling Bar used Luma POS to process over $50,000 during a three-day music festival.',
    date: '2024-12-20',
    category: 'Success Stories',
    image: '/blog/success-story.jpg',
    slug: 'rolling-bar-case-study',
  },
  {
    id: 6,
    title: 'Offline Mode: Never Miss a Sale',
    excerpt: 'Our offline mode ensures you can keep processing payments even when festival WiFi fails.',
    date: '2024-12-15',
    category: 'Feature Spotlight',
    image: '/blog/offline-mode.jpg',
    slug: 'offline-mode-explained',
  },
]

export default function BlogGrid() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-primary/30 transition-all duration-500 group"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 -z-10" />
              
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/30 group-hover:scale-110 transition-transform duration-500">
                      {post.title.charAt(0)}
                    </span>
                  </div>
                </div>
              </Link>
              
              <div className="p-6 relative z-20">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="text-primary font-medium group-hover:text-primary-400 transition-colors duration-300">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary hover:text-primary-400 transition-colors font-medium"
                >
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}