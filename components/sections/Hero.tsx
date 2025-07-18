'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default function Hero() {
  return (
    <section className="relative pt-20 md:pt-24 pb-16 md:pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 -z-10" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />

      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" size="lg" className="mb-6 inline-flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Production Ready API</span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Fast & Reliable{' '}
            <span className="gradient-text">Food Calorie API</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Access nutritional data for 750+ Malaysian & International foods through our simple REST API
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/docs">
              <Button size="lg" className="min-w-[200px] group">
                Get API Access
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <a
              href="https://kalori-makanan-kkm.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="min-w-[200px] group">
                View Documentation
                <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">750+</div>
              <div className="text-sm text-gray-600">Food Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">11</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">REST</div>
              <div className="text-sm text-gray-600">API Standard</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </motion.div>

          {/* Code Preview */}
          <motion.div
            className="mt-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-gray-900 rounded-lg p-4 text-left overflow-x-auto">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <pre className="text-sm text-gray-300">
                <code>{`curl "https://kalori-makanan-kkm.onrender.com/foods/search?name=nasi%20lemak"

{
  "total": 1,
  "foods": [{
    "id": 1,
    "name": "Nasi Lemak",
    "calories_kcal": 398,
    "serving": "1 pinggan",
    "category": "Nasi"
  }]
}`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
