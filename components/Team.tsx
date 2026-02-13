'use client'

import { useFadeIn } from '@/hooks/useFadeIn'
import { Linkedin, Twitter } from 'lucide-react'

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    bio: 'Former VP of Product at Square, 15+ years in fintech',
    image: '/team/sarah.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-founder',
    bio: 'Ex-Google engineer, expert in distributed systems',
    image: '/team/michael.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Emily Watson',
    role: 'Head of Product',
    bio: 'Previously led product teams at Shopify and Amazon',
    image: '/team/emily.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'David Kim',
    role: 'Head of Engineering',
    bio: 'Full-stack architect with 12+ years experience',
    image: '/team/david.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Jessica Martinez',
    role: 'Head of Sales',
    bio: 'Built sales teams at multiple successful SaaS startups',
    image: '/team/jessica.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Alex Thompson',
    role: 'Head of Customer Success',
    bio: 'Passionate about helping businesses grow and succeed',
    image: '/team/alex.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
]

export default function Team() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-black to-gray-950/50" />
      <div className="container relative z-10">
        <div
          ref={ref}
          className={`fade-in-section ${isVisible ? 'visible' : ''} text-center max-w-3xl mx-auto mb-16`}
        >
          <h2 className="fade-child heading-2 mb-4">Meet our team</h2>
          <p className="fade-child text-lead">
            We're a diverse team of innovators, builders, and problem-solvers
            united by our passion for transforming retail technology.
          </p>
        </div>

        <div className={`fade-in-section ${isVisible ? 'visible' : ''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
          {team.map((member) => (
            <div
              key={member.name}
              className="fade-child relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 text-center transition-all duration-500 border border-gray-700/50 hover:border-primary/30 group overflow-hidden"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 -z-10" />

              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-4xl font-semibold text-gray-400 group-hover:scale-105 transition-transform duration-500 shadow-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>

                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-primary-100 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm text-primary-400 font-medium mb-3 group-hover:text-primary-300 transition-colors duration-300">
                  {member.role}
                </p>
                <p className="text-sm text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {member.bio}
                </p>

                <div className="flex justify-center space-x-3">
                <a
                  href={member.social.linkedin}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
