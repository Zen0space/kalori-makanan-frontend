'use client'

import { useState, useEffect } from 'react'
import { Activity, CheckCircle, XCircle, RefreshCw, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PingResult {
  success: boolean
  message: string
  apiUrl: string
  results: {
    healthCheck: string
    searchTest: string
    categoriesCheck: string
    searchedFood: string
    totalResults: number
  }
  timestamp: string
}

export default function KeepAliveStatus() {
  const [status, setStatus] = useState<PingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkStatus = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/keep-alive')
      const data = await response.json()

      if (response.ok) {
        setStatus(data)
        setLastChecked(new Date())
      } else {
        setError(data.message || 'Failed to check status')
      }
    } catch (err) {
      setError('Unable to reach keep-alive endpoint')
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh every 5 minutes
  useEffect(() => {
    checkStatus()
    const interval = setInterval(checkStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    return status === 'success' ? 'text-green-600' : 'text-red-600'
  }

  const getStatusIcon = (status: string) => {
    return status === 'success'
      ? <CheckCircle className="w-4 h-4 text-green-600" />
      : <XCircle className="w-4 h-4 text-red-600" />
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">API Keep-Alive Status</CardTitle>
          </div>
          <Badge
            variant={status?.success ? 'success' : 'danger'}
            size="sm"
          >
            {status?.success ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Last Checked */}
          {lastChecked && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Last checked:</span>
              </span>
              <span className="text-gray-700 font-medium">
                {formatTime(lastChecked)}
              </span>
            </div>
          )}

          {/* Status Details */}
          {status && (
            <div className="space-y-3 border-t pt-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Health Check:</span>
                  <span className={cn('font-medium flex items-center space-x-1',
                    getStatusColor(status.results.healthCheck))}>
                    {getStatusIcon(status.results.healthCheck)}
                    <span>{status.results.healthCheck}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Search Test:</span>
                  <span className={cn('font-medium flex items-center space-x-1',
                    getStatusColor(status.results.searchTest))}>
                    {getStatusIcon(status.results.searchTest)}
                    <span>{status.results.searchTest}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Categories:</span>
                  <span className={cn('font-medium flex items-center space-x-1',
                    getStatusColor(status.results.categoriesCheck))}>
                    {getStatusIcon(status.results.categoriesCheck)}
                    <span>{status.results.categoriesCheck}</span>
                  </span>
                </div>
              </div>

              {/* Search Details */}
              {status.results.searchedFood && (
                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <p className="text-gray-600">
                    Searched for: <span className="font-medium text-gray-900">
                      "{status.results.searchedFood}"
                    </span>
                  </p>
                  <p className="text-gray-600 mt-1">
                    Found: <span className="font-medium text-gray-900">
                      {status.results.totalResults} results
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Manual Trigger Button */}
          <Button
            onClick={checkStatus}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Now
              </>
            )}
          </Button>

          {/* Info Text */}
          <p className="text-xs text-gray-500 text-center">
            Automatic pings run every 14 minutes to keep the API active
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
