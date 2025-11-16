'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Smartphone, Zap, BarChart3, CreditCard } from 'lucide-react'

export default function AppShowcase() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mobile First Design</span>
            </div>
            
            <h2 className="heading-2 mb-6">
              Your entire POS in your pocket
            </h2>
            
            <p className="text-lead text-gray-300 mb-8">
              Accept payments, manage inventory, and track sales - all from your iPhone or Android. 
              No clunky hardware, no setup time, just pure speed.
            </p>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Lightning Fast</h3>
                  <p className="text-sm text-gray-400">
                    Process payments in under 3 seconds. Your customers won't wait, and neither should you.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Real-time Analytics</h3>
                  <p className="text-sm text-gray-400">
                    Watch your sales, tips, and inventory update live. Make data-driven decisions on the fly.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Tap to Pay</h3>
                  <p className="text-sm text-gray-400">
                    Accept contactless payments directly on your phone. No readers, no dongles, no hassle.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Phone mockups */}
          <div ref={ref} className="relative h-[600px] flex items-center justify-center">
            {/* Main phone - centered */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -30 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: -15 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute z-30"
              style={{ transform: "perspective(1000px)" }}
            >
              <div className="relative">
                {/* Phone frame */}
                <div className="w-[280px] h-[580px] bg-gradient-to-b from-gray-900 to-black rounded-[3rem] p-3 shadow-2xl shadow-black/50">
                  <div className="w-full h-full bg-gradient-to-br from-gray-950 to-black rounded-[2.5rem] overflow-hidden relative">
                    {/* Status bar */}
                    <div className="absolute top-0 inset-x-0 h-12 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-between px-6">
                      <span className="text-xs text-white">9:41 AM</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-3 bg-white rounded-sm opacity-60" />
                        <div className="w-4 h-3 bg-white rounded-sm" />
                        <div className="w-6 h-3 bg-white rounded-sm" />
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="pt-12 p-4 h-full bg-gradient-to-b from-gray-900 to-gray-950">
                      <div className="bg-primary/10 rounded-xl p-4 mb-4">
                        <div className="text-sm text-primary mb-1">Today's Sales</div>
                        <div className="text-3xl font-bold text-white">$3,847.50</div>
                        <div className="text-xs text-green-500 mt-1">↑ 23% from yesterday</div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-gray-800/50 rounded-lg p-3 flex justify-between items-center">
                          <span className="text-sm text-gray-300">Mojito</span>
                          <span className="text-sm font-semibold text-white">$12.00</span>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3 flex justify-between items-center">
                          <span className="text-sm text-gray-300">Margarita</span>
                          <span className="text-sm font-semibold text-white">$14.00</span>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3 flex justify-between items-center">
                          <span className="text-sm text-gray-300">Old Fashioned</span>
                          <span className="text-sm font-semibold text-white">$16.00</span>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 inset-x-4">
                        <button className="w-full bg-primary text-white font-semibold py-4 rounded-xl">
                          Charge $42.00
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10" />
              </div>
            </motion.div>

            {/* Second phone - left tilted */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: 30, rotateZ: -5 }}
              animate={inView ? { opacity: 0.8, x: -120, rotateY: 25, rotateZ: -5 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="absolute z-20"
              style={{ transform: "perspective(1000px)" }}
            >
              <div className="w-[240px] h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-black/30">
                <div className="w-full h-full bg-gray-950 rounded-[2rem] overflow-hidden">
                  <div className="p-4 h-full">
                    <div className="bg-green-500/10 rounded-lg p-3 mb-3">
                      <div className="text-xs text-green-500 mb-1">Tips Today</div>
                      <div className="text-2xl font-bold text-white">$567.80</div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-800/50 rounded p-2">
                        <div className="text-xs text-gray-400">Sarah C.</div>
                        <div className="text-sm text-white">$89.50</div>
                      </div>
                      <div className="bg-gray-800/50 rounded p-2">
                        <div className="text-xs text-gray-400">Mike R.</div>
                        <div className="text-sm text-white">$76.20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Third phone - right tilted */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -30, rotateZ: 5 }}
              animate={inView ? { opacity: 0.8, x: 120, rotateY: -25, rotateZ: 5 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="absolute z-10"
              style={{ transform: "perspective(1000px)" }}
            >
              <div className="w-[240px] h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-black/30">
                <div className="w-full h-full bg-gray-950 rounded-[2rem] overflow-hidden">
                  <div className="p-4 h-full">
                    <div className="mb-4">
                      <div className="text-xs text-gray-400 mb-2">Inventory Alert</div>
                      <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                        <div className="text-sm text-red-500 font-medium">Low Stock: Vodka</div>
                        <div className="text-xs text-gray-400 mt-1">2 bottles remaining</div>
                      </div>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-3">
                      <div className="text-xs text-purple-500 mb-1">Best Seller</div>
                      <div className="text-lg font-bold text-white">Espresso Martini</div>
                      <div className="text-xs text-gray-400">142 sold today</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}