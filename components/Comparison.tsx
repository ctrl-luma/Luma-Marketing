'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { useFadeIn } from '@/hooks/useFadeIn'
import { Check, X, AlertTriangle } from 'lucide-react'
import { getTierById } from '@/lib/pricing'

const proTier = getTierById('pro')

const comparison = [
  {
    feature: 'Typical Monthly Cost',
    description: 'With tip pooling & team permissions',
    luma: proTier ? `${proTier.price}${proTier.period.replace('/', '/').replace('month', 'mo')}` : '$19/mo',
    square: '$89/mo',
    clover: '$185/mo',
    toast: '$207/mo',
    othersAvg: '$160/mo avg',
    isWarning: { square: true, clover: true, toast: true },
    othersWarning: true,
  },
  {
    feature: 'Payout Speed',
    description: 'How fast you get your money',
    luma: '2-day standard',
    square: '1-2 days',
    clover: '2-3 days',
    toast: '2-3 days',
    othersAvg: '1-3 days',
    isWarning: { square: false, clover: false, toast: false },
    othersWarning: false,
  },
  {
    feature: 'Hardware Cost',
    luma: '$0',
    square: '$0-799',
    clover: '$599-1,799',
    toast: '$799-1,339',
    othersAvg: '$600-1,800',
    isWarning: { square: false, clover: true, toast: true },
    othersWarning: true,
  },
  {
    feature: 'Tip Pooling',
    description: 'Split tips by hours, role, or custom rules',
    luma: 'Included',
    square: '+$4/employee/mo',
    clover: '+$50/mo extra',
    toast: '+$69/mo extra',
    othersAvg: '+$50/mo avg',
    isWarning: { square: true, clover: true, toast: true },
    othersWarning: true,
  },
  {
    feature: 'Team Permissions',
    luma: 'Included',
    square: '+$35/mo extra',
    clover: '+$45/mo extra',
    toast: '+$69/mo extra',
    othersAvg: '+$50/mo avg',
    isWarning: { square: true, clover: true, toast: true },
    othersWarning: true,
  },
  {
    feature: 'Instant Payout Fee',
    luma: '1%',
    square: '1.75%',
    clover: 'Not available',
    toast: 'Not available',
    othersAvg: '1.75% or N/A',
    isWarning: { square: true, clover: true, toast: true },
    othersWarning: true,
  },
  {
    feature: 'Contract Required',
    luma: 'None',
    square: 'None',
    clover: '3-4 year lock-in',
    toast: '2 year lock-in',
    othersAvg: 'Up to 4 years',
    isWarning: { square: false, clover: true, toast: true },
    othersWarning: true,
  },
  {
    feature: 'Custom Catalogs',
    description: 'Switch menus & pricing per venue instantly',
    luma: 'Unlimited',
    square: 'Not available',
    clover: 'Not available',
    toast: 'Not available',
    othersAvg: 'Not available',
    isWarning: { square: true, clover: true, toast: true },
    othersWarning: true,
  },
]

export default function Comparison() {
  const [isMobile, setIsMobile] = useState(true)
  const { ref: fadeRef, isVisible } = useFadeIn(0.1)

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const renderValue = (value: string | boolean, isWarning?: boolean, isLuma?: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex justify-center items-center">
          <div className="relative">
            {isLuma && <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />}
            <Check className={`h-5 w-5 ${isLuma ? 'text-green-500' : 'text-gray-400'} relative z-10`} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <X className="h-5 w-5 text-gray-600 opacity-50" />
        </div>
      )
    }

    if (isLuma) {
      return (
        <span className="text-sm font-semibold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
          {value}
        </span>
      )
    }

    if (isWarning) {
      return (
        <span className="text-sm font-medium text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20 flex items-center gap-1.5 justify-center">
          <AlertTriangle className="h-3.5 w-3.5" />
          {value}
        </span>
      )
    }

    return <span className="text-sm text-gray-400">{value}</span>
  }

  const renderMobileValue = (value: string | boolean, isWarning?: boolean, isLuma?: boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex items-center">
          <Check className={`h-3 w-3 sm:h-4 sm:w-4 ${isLuma ? 'text-green-500' : 'text-gray-500'} mr-1`} />
          <span className={`text-[10px] sm:text-xs ${isLuma ? 'text-green-400' : 'text-gray-500'}`}>Yes</span>
        </div>
      ) : (
        <div className="flex items-center">
          <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 mr-1" />
          <span className="text-[10px] sm:text-xs text-gray-600">No</span>
        </div>
      )
    }

    if (isLuma) {
      return <span className="text-[10px] sm:text-xs font-semibold text-green-400">{value}</span>
    }

    if (isWarning) {
      return (
        <span className="text-[10px] sm:text-xs font-medium text-red-400 flex items-center gap-0.5">
          <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          {value}
        </span>
      )
    }

    return <span className="text-[10px] sm:text-xs text-gray-400">{value}</span>
  }

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      {/* Animated background elements - hidden on mobile */}
      <div className="hidden lg:block absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div
        ref={isMobile ? fadeRef : undefined}
        className={`container relative z-10 ${isMobile ? `transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}` : ''}`}
      >
        {isMobile ? (
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="heading-2 mb-3 sm:mb-4 text-white">
              The hidden costs they don&apos;t tell you about
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Other POS systems nickel-and-dime you with extra fees. We don&apos;t.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            <h2 className="heading-2 mb-3 sm:mb-4 text-white">
              The hidden costs they don&apos;t tell you about
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Other POS systems nickel-and-dime you with extra fees. We don&apos;t.
            </p>
          </motion.div>
        )}

        <div
          ref={ref}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-3xl -z-10" />
          <div className="relative">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-1">
              <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-6 font-semibold text-gray-100">Features</th>
                  <th className="text-center p-6">
                      <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 text-xl mt-2">Luma</div>
                      <div className="text-xs text-green-400 mt-1">Built for Events</div>
                    </th>
                <th className="text-center p-6">
                  <div className="font-semibold text-gray-400">Square</div>
                  <div className="text-xs text-gray-500 mt-1 opacity-60">Hidden fees</div>
                </th>
                <th className="text-center p-6">
                  <div className="font-semibold text-gray-400">Clover</div>
                  <div className="text-xs text-gray-500 mt-1 opacity-60">Hardware lock-in</div>
                </th>
                <th className="text-center p-6">
                  <div className="font-semibold text-gray-400">Toast</div>
                  <div className="text-xs text-gray-500 mt-1 opacity-60">Long contracts</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, index) => (
                <tr
                  key={row.feature}
                  className={`border-b border-gray-700/50 transition-colors hover:bg-gray-800/30 ${
                    index % 2 === 0 ? 'bg-gray-900/20' : 'bg-transparent'
                  }`}
                >
                  <td className="p-6 font-medium text-gray-100">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {row.feature}
                      </div>
                      {row.description && (
                        <span className="text-xs text-gray-500 ml-5">{row.description}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    {renderValue(row.luma, false, true)}
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center items-center">
                      {renderValue(row.square, row.isWarning?.square)}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center items-center">
                      {renderValue(row.clover, row.isWarning?.clover)}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center items-center">
                      {renderValue(row.toast, row.isWarning?.toast)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>

            {/* Mobile Cards - Clean list format */}
            <div className="lg:hidden">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-2 border-b border-gray-700/50">
                  <div className="p-3 sm:p-4 bg-primary/10 border-r border-gray-700/50">
                    <div className="text-primary font-bold text-sm sm:text-base">Luma</div>
                    <div className="text-[10px] sm:text-xs text-primary/70">Built for events</div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="text-gray-400 font-medium text-sm sm:text-base">Others</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">Square, Clover, Toast</div>
                  </div>
                </div>

                {/* Rows */}
                {comparison.map((row, index) => (
                  <div
                    key={row.feature}
                    className={`border-b border-gray-700/50 last:border-b-0 ${index % 2 === 0 ? 'bg-gray-900/20' : ''}`}
                  >
                    {/* Feature name */}
                    <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-1">
                      <div className="text-xs sm:text-sm font-medium text-white">{row.feature}</div>
                      {row.description && (
                        <div className="text-[10px] sm:text-xs text-gray-500">{row.description}</div>
                      )}
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-2">
                      {/* Luma value */}
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-r border-gray-700/50">
                        <span className="text-sm sm:text-base font-semibold text-green-400">
                          {row.luma}
                        </span>
                      </div>

                      {/* Competitors - show average */}
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                        {row.othersWarning ? (
                          <span className="text-xs sm:text-sm text-red-400 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                            <span>{row.othersAvg}</span>
                          </span>
                        ) : (
                          <span className="text-xs sm:text-sm text-gray-400">{row.othersAvg}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
