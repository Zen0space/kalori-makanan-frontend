'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2, AlertCircle, Utensils } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { searchFoods } from '@/lib/api'
import { Food } from '@/lib/types'
import { formatCalories, formatServing, formatWeight, debounce } from '@/lib/utils'
import useSWR from 'swr'

export default function ApiDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Use SWR for data fetching with debounce
  const { data, error, isLoading } = useSWR(
    searchTerm.length >= 2 ? `/foods/search?name=${searchTerm}` : null,
    () => searchFoods(searchTerm),
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000,
    }
  )

  const handleSearch = debounce((value: string) => {
    setSearchTerm(value)
  }, 500)

  const searchResults = data?.foods || []
  const hasResults = searchResults.length > 0
  const showEmptyState = searchTerm.length >= 2 && !isLoading && !hasResults && !error

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Try Our <span className="gradient-text">Live API Demo</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Search for any food to see instant results from our API
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Try searching: nasi lemak, rendang, ayam..."
              className="input w-full pl-12 pr-4 py-4 text-lg"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
              ) : (
                <Search className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Start typing to search through 750+ food items
          </p>
        </motion.div>

        {/* Results Container */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Loading State */}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Searching for "{searchTerm}"...</p>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p className="text-gray-600">Unable to fetch results. Please try again.</p>
              </motion.div>
            )}

            {/* Empty State */}
            {showEmptyState && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Utensils className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No foods found matching "{searchTerm}"</p>
                <p className="text-sm text-gray-500 mt-2">Try searching for something else</p>
              </motion.div>
            )}

            {/* Results */}
            {hasResults && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Results Count */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Found <span className="font-semibold">{data?.total || 0}</span> results
                  </p>
                  <Badge variant="secondary">Live API Response</Badge>
                </div>

                {/* Food Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {searchResults.slice(0, 6).map((food: Food) => (
                    <motion.div
                      key={food.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card hover="lift" className="h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-lg">{food.name}</CardTitle>
                            {food.category && (
                              <Badge variant="neutral" size="sm">
                                {food.category}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Calories:</span>
                              <span className="font-semibold text-gray-900">
                                {formatCalories(food.calories_kcal)}
                              </span>
                            </div>
                            {food.serving && (
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Serving:</span>
                                <span className="text-gray-700">{formatServing(food.serving)}</span>
                              </div>
                            )}
                            {food.weight_g && (
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Weight:</span>
                                <span className="text-gray-700">{formatWeight(food.weight_g)}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* API Response Example */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">API Response Example</h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>{JSON.stringify(
                        {
                          total: data?.total,
                          foods: searchResults.slice(0, 2).map((food: Food) => ({
                            id: food.id,
                            name: food.name,
                            calories_kcal: food.calories_kcal,
                            serving: food.serving,
                            weight_g: food.weight_g,
                            category: food.category
                          }))
                        },
                        null,
                        2
                      )}</code>
                    </pre>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* API Endpoint Info */}
        {searchTerm.length >= 2 && (
          <motion.div
            className="max-w-2xl mx-auto mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-sm text-gray-500">
              API Endpoint: <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                GET /foods/search?name={searchTerm}
              </code>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
