'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Database, Layers, Activity } from 'lucide-react'

interface Stat {
  icon: any
  value: string
  label: string
  suffix?: string
  color: string
}

const stats: Stat[] = [
  {
    icon: Database,
    value: '750',
    suffix: '+',
    label: 'Food Items',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Layers,
    value: '11',
    label: 'Categories',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    value: '100',
    suffix: '%',
    label: 'REST Standard',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Activity,
    value: '99.9',
    suffix: '%',
    label: 'Uptime',
    color: 'from-orange-500 to-red-500'
  }
]

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const targetValue = parseFloat(value)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps
    const increment = targetValue / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      if (currentStep === steps) {
        setCount(targetValue)
        clearInterval(timer)
      } else {
        setCount(Math.min(currentStep * increment, targetValue))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, targetValue])

  const displayValue = count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-max relative">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            API by the <span className="gradient-text">Numbers</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Trusted by developers for reliable food data access
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative group">
                {/* Card */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Icon */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${stat.color} p-3 md:p-3.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-full h-full text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <div className="text-sm md:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>

                  {/* Decorative Elements */}
                  <div className={`absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>API Status: Operational</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
