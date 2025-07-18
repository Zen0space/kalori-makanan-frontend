'use client'

import { motion } from 'framer-motion'
import { Activity, Server, Clock, Info } from 'lucide-react'
import KeepAliveStatus from '@/components/ui/KeepAliveStatus'
import { Card, CardContent } from '@/components/ui/Card'

export default function MonitorPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container-max">
        {/* Page Header */}
        <motion.div
          className="max-w-4xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              API Monitor
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Keep-alive monitoring for the Kalori Makanan API on Render.com
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
          {/* Keep Alive Status Component */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <KeepAliveStatus />
          </motion.div>

          {/* Information Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* How it Works */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Server className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">How it Works</h3>
                    <p className="text-sm text-gray-600">
                      Render.com free tier services sleep after 15 minutes of inactivity.
                      This keep-alive function automatically pings the API every 14 minutes
                      with random food searches to prevent it from sleeping.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Schedule</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Runs every 14 minutes (24/7)</li>
                      <li>• Makes 3 API calls per run</li>
                      <li>• Searches random Malaysian foods</li>
                      <li>• Checks health & categories endpoints</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Technical Details</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>
                        <strong>Function:</strong> Netlify Scheduled Function
                      </p>
                      <p>
                        <strong>Cron Expression:</strong> <code className="bg-gray-100 px-2 py-0.5 rounded">*/14 * * * *</code>
                      </p>
                      <p>
                        <strong>API Endpoint:</strong> <code className="bg-gray-100 px-2 py-0.5 rounded">/api/keep-alive</code>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">About Free Tier Limitations</h3>
              <div className="prose prose-sm text-gray-600">
                <p>
                  Render.com's free tier automatically spins down services after 15 minutes of inactivity
                  to conserve resources. When a request comes in after the service has been sleeping,
                  it takes 30-60 seconds to spin back up, resulting in slow initial responses.
                </p>
                <p className="mt-3">
                  This keep-alive function prevents that by making periodic requests to keep the service
                  active. The function searches for random Malaysian foods like "nasi lemak", "rendang",
                  and "char kuey teow" to simulate real usage.
                </p>
                <p className="mt-3">
                  <strong>Note:</strong> This monitoring page is for development and debugging purposes.
                  The scheduled function runs automatically on Netlify without any manual intervention required.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
