'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, X, Sparkles, TrendingUp } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const comparison = [
  {
    feature: 'Monthly Fees',
    luma: 'Free starter plan',
    square: '$60+ for Plus',
    clover: '$15+ with contract',
    toast: '$69+ minimum',
  },
  {
    feature: 'Processing Rate',
    luma: '2.7% + $0.05',
    square: '2.6% + $0.10',
    clover: '2.3% + $0.10',
    toast: '2.75% + $0.15',
  },
  {
    feature: 'Tap to Pay',
    luma: true,
    square: true,
    clover: false,
    toast: false,
  },
  {
    feature: 'No Hardware Required',
    luma: true,
    square: false,
    clover: false,
    toast: false,
  },
  {
    feature: 'Event Mode',
    luma: true,
    square: false,
    clover: false,
    toast: false,
  },
  {
    feature: 'Revenue Splits',
    luma: true,
    square: false,
    clover: false,
    toast: false,
  },
  {
    feature: 'No Contracts',
    luma: true,
    square: true,
    clover: false,
    toast: false,
  },
  {
    feature: 'Same-Day Payouts',
    luma: true,
    square: 'Extra fee',
    clover: false,
    toast: false,
  },
]

export default function Comparison() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  
  const lumaColumnRef = useRef<HTMLTableCellElement>(null)
  const [badgePosition, setBadgePosition] = useState<number | null>(null)
  
  useEffect(() => {
    const updatePosition = () => {
      if (lumaColumnRef.current) {
        const rect = lumaColumnRef.current.getBoundingClientRect()
        const parentRect = lumaColumnRef.current.offsetParent?.getBoundingClientRect()
        if (parentRect) {
          setBadgePosition(rect.left - parentRect.left + rect.width / 2)
        }
      }
    }
    
    updatePosition()
    window.addEventListener('resize', updatePosition)
    
    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [inView])

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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Industry Leading</span>
          </div>
          <h2 className="heading-2 mb-4 text-white">
            Why mobile bars choose Luma
          </h2>
          <p className="text-lead text-gray-300">
            Compare Luma to Square, Clover, and Toast. See why event vendors 
            are switching to the POS built specifically for their needs.
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
          <div className="mt-16 relative">
            {badgePosition && (
              <span 
                className="absolute top-0 -translate-y-1/2 bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-2 rounded-full text-sm font-semibold text-white shadow-lg shadow-primary/20 z-20 whitespace-nowrap flex items-center gap-1.5"
                style={{ left: `${badgePosition}px`, transform: 'translate(-50%, -50%)' }}
              >
                <Sparkles className="h-4 w-4" />
                Winner
              </span>
            )}
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-1">
              <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-6 font-semibold text-gray-100">Features</th>
                  <th ref={lumaColumnRef} className="text-center p-6">
                      <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 text-xl mt-2">Luma</div>
                      <div className="text-xs text-gray-400 mt-1">Built for Events</div>
                    </th>
                <th className="text-center p-6">
                  <div className="font-semibold text-gray-400">Square</div>
                  <div className="text-xs text-gray-500 mt-1 opacity-60">Retail Focus</div>
                </th>
                <th className="text-center p-6">
                  <div className="font-semibold text-gray-400">Clover</div>
                  <div className="text-xs text-gray-500 mt-1 opacity-60">Legacy Hardware</div>
                </th>
                <th className="text-center p-6">
                  <div className="font-semibold text-gray-400">Toast</div>
                  <div className="text-xs text-gray-500 mt-1 opacity-60">Restaurant Only</div>
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
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      {row.feature}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    {typeof row.luma === 'boolean' ? (
                      row.luma ? (
                        <div className="flex justify-center items-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
                            <Check className="h-5 w-5 text-green-500 relative z-10" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <X className="h-5 w-5 text-gray-600 opacity-50" />
                        </div>
                      )
                    ) : (
                      <span className="text-sm font-semibold text-primary-400 bg-primary/10 px-3 py-1 rounded-full">{row.luma}</span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center items-center">
                      {typeof row.square === 'boolean' ? (
                        row.square ? (
                          <Check className="h-5 w-5 text-gray-400" />
                        ) : (
                          <X className="h-5 w-5 text-gray-600 opacity-50" />
                        )
                      ) : (
                        <span className="text-sm text-gray-400">{row.square}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center items-center">
                      {typeof row.clover === 'boolean' ? (
                        row.clover ? (
                          <Check className="h-5 w-5 text-gray-400" />
                        ) : (
                          <X className="h-5 w-5 text-gray-600 opacity-50" />
                        )
                      ) : (
                        <span className="text-sm text-gray-400">{row.clover}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center items-center">
                      {typeof row.toast === 'boolean' ? (
                        row.toast ? (
                          <Check className="h-5 w-5 text-gray-400" />
                        ) : (
                          <X className="h-5 w-5 text-gray-600 opacity-50" />
                        )
                      ) : (
                        <span className="text-sm text-gray-400">{row.toast}</span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-lg shadow-primary/20 text-center">
                <Sparkles className="inline h-4 w-4 mr-1" />
                Luma Wins in Every Category
              </div>
              
              {comparison.map((row, index) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
                >
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    {row.feature}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Luma - Always prominent */}
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg p-3 border border-primary/30">
                      <div className="text-xs text-primary-400 font-semibold mb-1">Luma</div>
                      {typeof row.luma === 'boolean' ? (
                        row.luma ? (
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-xs text-green-400">Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <X className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-xs text-gray-500">No</span>
                          </div>
                        )
                      ) : (
                        <span className="text-xs font-medium text-primary-300">{row.luma}</span>
                      )}
                    </div>
                    
                    {/* Square */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                      <div className="text-xs text-gray-400 mb-1">Square</div>
                      {typeof row.square === 'boolean' ? (
                        row.square ? (
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-xs text-gray-500">Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <X className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-xs text-gray-600">No</span>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-gray-400">{row.square}</span>
                      )}
                    </div>
                    
                    {/* Clover */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                      <div className="text-xs text-gray-400 mb-1">Clover</div>
                      {typeof row.clover === 'boolean' ? (
                        row.clover ? (
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-xs text-gray-500">Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <X className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-xs text-gray-600">No</span>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-gray-400">{row.clover}</span>
                      )}
                    </div>
                    
                    {/* Toast */}
                    <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                      <div className="text-xs text-gray-400 mb-1">Toast</div>
                      {typeof row.toast === 'boolean' ? (
                        row.toast ? (
                          <div className="flex items-center">
                            <Check className="h-4 w-4 text-gray-500 mr-1" />
                            <span className="text-xs text-gray-500">Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <X className="h-4 w-4 text-gray-600 mr-1" />
                            <span className="text-xs text-gray-600">No</span>
                          </div>
                        )
                      ) : (
                        <span className="text-xs text-gray-400">{row.toast}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-white">30% Lower Costs</h3>
            </div>
            <p className="text-sm text-gray-300">
              Save thousands annually with our transparent pricing and no monthly fees on starter plan.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-semibold text-white">Built for Events</h3>
            </div>
            <p className="text-sm text-gray-300">
              The only POS designed specifically for mobile bars, pop-ups, and event vendors.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Check className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="font-semibold text-white">No Contracts</h3>
            </div>
            <p className="text-sm text-gray-300">
              Start free, cancel anytime. No hardware to buy, no contracts to sign.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}