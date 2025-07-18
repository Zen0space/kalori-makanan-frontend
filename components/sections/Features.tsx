'use client'

import { motion } from 'framer-motion'
import {
  Search,
  BarChart3,
  Tag,
  Code2,
  BookOpen,
  Rocket,
  CheckCircle
} from 'lucide-react'
import { Card } from '@/components/ui/Card'

const features = [
  {
    icon: Search,
    title: 'Food Search',
    description: 'Search through our extensive database by food name with instant results and fuzzy matching support.',
    highlights: ['Instant search', 'Fuzzy matching', 'Multi-language']
  },
  {
    icon: BarChart3,
    title: 'Calorie Data',
    description: 'Get detailed nutritional information including calories, serving sizes, and weight measurements.',
    highlights: ['Accurate data', 'Serving sizes', 'Weight in grams']
  },
  {
    icon: Tag,
    title: 'Categories',
    description: 'Browse foods organized into 11 distinct categories for easy navigation and filtering.',
    highlights: ['11 categories', 'Easy filtering', 'Organized groups']
  },
  {
    icon: Code2,
    title: 'REST API',
    description: 'Simple and intuitive RESTful endpoints that are easy to integrate into any application.',
    highlights: ['RESTful design', 'JSON responses', 'Standard HTTP']
  },
  {
    icon: BookOpen,
    title: 'Auto Docs',
    description: 'Interactive API documentation with Swagger UI and ReDoc for easy exploration and testing.',
    highlights: ['Swagger UI', 'ReDoc', 'Try it now']
  },
  {
    icon: Rocket,
    title: 'Production Ready',
    description: 'Deployed on reliable infrastructure with 99.9% uptime and optimized for performance.',
    highlights: ['99.9% uptime', 'Fast response', 'Scalable']
  }
]

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need in a <span className="gradient-text">Food API</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Built with developers in mind, our API provides comprehensive food data with simple integration
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                variant="default"
                hover="lift"
                className="h-full"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-600 mb-4">
            Ready to explore our API capabilities?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://kalori-makanan-kkm.onrender.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-6 py-2.5"
            >
              Explore API Docs
            </a>
            <a
              href="/examples"
              className="btn btn-outline px-6 py-2.5"
            >
              View Examples
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
