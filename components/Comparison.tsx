'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, X, AlertTriangle } from 'lucide-react'

const comparison = [
  {
    feature: 'Typical Monthly Cost',
    description: 'With tip pooling & team permissions',
    luma: '$19/mo',
    square: '$89/mo',
    clover: '$185/mo',
    toast: '$207/mo',
    isWarning: { square: true, clover: true, toast: true },
  },
  {
    feature: 'Processing Rate',
    luma: '2.7% + $0.15',
    square: '2.6% + $0.15',
    clover: '2.6% + $0.10',
    toast: '2.99% + $0.15',
    isWarning: { square: false, clover: false, toast: false },
    lumaHighlight: false, // Don't highlight green since we're not the lowest
  },
  {
    feature: 'Fund Holds',
    description: 'Can they freeze your money?',
    luma: 'Never',
    square: '30% held 120 days',
    clover: '10% reserve',
    toast: 'Rolling reserve',
    isWarning: { square: true, clover: true, toast: true },
  },
  {
    feature: 'Hardware Cost',
    luma: '$0',
    square: '$0-799',
    clover: '$599-1,799',
    toast: '$799-1,339',
    isWarning: { square: false, clover: true, toast: true },
  },
  {
    feature: 'Tip Pooling',
    luma: 'Included',
    square: '+$35/mo extra',
    clover: '+$50/mo extra',
    toast: '+$69/mo extra',
    isWarning: { square: true, clover: true, toast: true },
  },
  {
    feature: 'Team Permissions',
    luma: 'Included',
    square: '+$35/mo extra',
    clover: '+$45/mo extra',
    toast: '+$69/mo extra',
    isWarning: { square: true, clover: true, toast: true },
  },
  {
    feature: 'Instant Payout Fee',
    luma: '1%',
    square: '1.75%',
    clover: 'Not available',
    toast: 'Not available',
    isWarning: { square: true, clover: true, toast: true },
  },
  {
    feature: 'Contract Required',
    luma: 'None',
    square: 'None',
    clover: '3-4 year lock-in',
    toast: '2 year lock-in',
    isWarning: { square: false, clover: true, toast: true },
  },
]

export default function Comparison() {
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
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
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

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
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
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className={`border-b border-gray-700/50 transition-all hover:bg-gray-800/30 ${
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
                    {renderValue(row.luma, false, row.lumaHighlight !== false)}
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
                </motion.tr>
              ))}
            </tbody>
          </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3 sm:space-y-4">

              {comparison.map((row, index) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/50"
                >
                  <h3 className="font-semibold text-white text-sm sm:text-base mb-1 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full" />
                    {row.feature}
                  </h3>
                  {row.description && (
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-2 ml-3.5 sm:ml-4">{row.description}</p>
                  )}

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2">
                    {/* Luma */}
                    <div className={`rounded-md sm:rounded-lg p-2 sm:p-3 border ${row.lumaHighlight !== false ? 'bg-gradient-to-br from-green-500/20 to-green-500/10 border-green-500/30' : 'bg-gray-900/50 border-gray-700'}`}>
                      <div className={`text-[10px] sm:text-xs font-semibold mb-0.5 sm:mb-1 ${row.lumaHighlight !== false ? 'text-green-400' : 'text-gray-300'}`}>Luma</div>
                      {renderMobileValue(row.luma, false, row.lumaHighlight !== false)}
                    </div>

                    {/* Square */}
                    <div className={`rounded-md sm:rounded-lg p-2 sm:p-3 border ${row.isWarning?.square ? 'bg-red-500/5 border-red-500/20' : 'bg-gray-900/50 border-gray-800'}`}>
                      <div className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">Square</div>
                      {renderMobileValue(row.square, row.isWarning?.square)}
                    </div>

                    {/* Clover */}
                    <div className={`rounded-md sm:rounded-lg p-2 sm:p-3 border ${row.isWarning?.clover ? 'bg-red-500/5 border-red-500/20' : 'bg-gray-900/50 border-gray-800'}`}>
                      <div className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">Clover</div>
                      {renderMobileValue(row.clover, row.isWarning?.clover)}
                    </div>

                    {/* Toast */}
                    <div className={`rounded-md sm:rounded-lg p-2 sm:p-3 border ${row.isWarning?.toast ? 'bg-red-500/5 border-red-500/20' : 'bg-gray-900/50 border-gray-800'}`}>
                      <div className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">Toast</div>
                      {renderMobileValue(row.toast, row.isWarning?.toast)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 border border-red-500/20"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm sm:text-base mb-1">Watch out for fund holds</h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Many payment processors can hold <span className="text-red-400 font-medium">up to 30% of your earnings for months</span> if they consider you &quot;high risk&quot; — which often includes event vendors with irregular sales patterns. Luma never holds your funds.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
