'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { id: 1, name: 'Payment Failure Rate', value: 1, prefix: '<', suffix: '%' },
  { id: 2, name: 'Average Processing Time', value: 10, prefix: '<', suffix: 's' },
  { id: 3, name: 'Event Uptime', value: 99.9, suffix: '%' },
  { id: 4, name: 'Setup Time', value: 2, suffix: ' min' },
]

export default function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
      </div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="heading-2 text-white mb-4"
          >
            Built for reliability at peak event hours
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            When the line is 20 deep at the bar, every second counts. 
            Luma delivers the speed and reliability you need.
          </motion.p>
        </div>

        <dl ref={ref} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <dt className="text-sm font-medium text-gray-400 uppercase tracking-wide">{stat.name}</dt>
              <dd className="mt-2 text-5xl font-extrabold text-white">
                {inView && (
                  <>
                    {stat.prefix}
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                    {stat.suffix}
                  </>
                )}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}