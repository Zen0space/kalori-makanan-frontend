'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  Search,
  Hash,
  Tag,
  Zap,
  Copy,
  CheckCircle,
  Loader2,
  Play,
  ChevronRight
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  searchFoods,
  getFoodById,
  getCategories,
  getAllFoods,
  getCaloriesByName,
  getHealthStatus
} from '@/lib/api'
import { Food, Category } from '@/lib/types'
import { copyToClipboard, formatCalories, formatServing, formatWeight } from '@/lib/utils'

interface Example {
  id: string
  title: string
  description: string
  icon: any
  endpoint: string
  code: {
    javascript: string
    python: string
    curl: string
  }
  runExample: () => Promise<any>
}

export default function ExamplesPage() {
  const [activeExample, setActiveExample] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Record<string, string>>({})

  const examples: Example[] = [
    {
      id: 'search',
      title: 'Search Foods by Name',
      description: 'Search for foods using partial or full name matching',
      icon: Search,
      endpoint: '/foods/search?name={name}',
      code: {
        javascript: `// Search for "nasi"
const response = await fetch(
  'https://kalori-makanan-kkm.onrender.com/foods/search?name=nasi'
);
const data = await response.json();
console.log(data);`,
        python: `import requests

response = requests.get(
    'https://kalori-makanan-kkm.onrender.com/foods/search',
    params={'name': 'nasi'}
)
data = response.json()
print(data)`,
        curl: `curl "https://kalori-makanan-kkm.onrender.com/foods/search?name=nasi"`
      },
      runExample: async () => {
        return await searchFoods('nasi')
      }
    },
    {
      id: 'getById',
      title: 'Get Food by ID',
      description: 'Retrieve complete information about a specific food item',
      icon: Hash,
      endpoint: '/foods/{id}',
      code: {
        javascript: `// Get food with ID 1
const response = await fetch(
  'https://kalori-makanan-kkm.onrender.com/foods/1'
);
const food = await response.json();
console.log(food);`,
        python: `import requests

response = requests.get(
    'https://kalori-makanan-kkm.onrender.com/foods/1'
)
food = response.json()
print(food)`,
        curl: `curl "https://kalori-makanan-kkm.onrender.com/foods/1"`
      },
      runExample: async () => {
        return await getFoodById(1)
      }
    },
    {
      id: 'categories',
      title: 'List All Categories',
      description: 'Get all available food categories',
      icon: Tag,
      endpoint: '/categories',
      code: {
        javascript: `// Get all categories
const response = await fetch(
  'https://kalori-makanan-kkm.onrender.com/categories'
);
const categories = await response.json();
console.log(categories);`,
        python: `import requests

response = requests.get(
    'https://kalori-makanan-kkm.onrender.com/categories'
)
categories = response.json()
print(categories)`,
        curl: `curl "https://kalori-makanan-kkm.onrender.com/categories"`
      },
      runExample: async () => {
        return await getCategories()
      }
    },
    {
      id: 'quickCalories',
      title: 'Quick Calorie Lookup',
      description: 'Get calorie information directly by food name',
      icon: Zap,
      endpoint: '/foods/search/{name}/calories',
      code: {
        javascript: `// Quick calorie lookup for "rendang"
const response = await fetch(
  'https://kalori-makanan-kkm.onrender.com/foods/search/rendang/calories'
);
const calories = await response.json();
console.log(calories);`,
        python: `import requests

response = requests.get(
    'https://kalori-makanan-kkm.onrender.com/foods/search/rendang/calories'
)
calories = response.json()
print(calories)`,
        curl: `curl "https://kalori-makanan-kkm.onrender.com/foods/search/rendang/calories"`
      },
      runExample: async () => {
        return await getCaloriesByName('rendang')
      }
    },
    {
      id: 'pagination',
      title: 'Paginated Food List',
      description: 'Browse all foods with pagination support',
      icon: Code2,
      endpoint: '/foods?page={page}&limit={limit}',
      code: {
        javascript: `// Get first page with 10 items
const response = await fetch(
  'https://kalori-makanan-kkm.onrender.com/foods?page=1&limit=10'
);
const data = await response.json();
console.log(data);`,
        python: `import requests

response = requests.get(
    'https://kalori-makanan-kkm.onrender.com/foods',
    params={'page': 1, 'limit': 10}
)
data = response.json()
print(data)`,
        curl: `curl "https://kalori-makanan-kkm.onrender.com/foods?page=1&limit=10"`
      },
      runExample: async () => {
        return await getAllFoods({ page: 1, limit: 10 })
      }
    }
  ]

  const runExample = async (example: Example) => {
    setLoading({ ...loading, [example.id]: true })
    setActiveExample(example.id)

    try {
      const result = await example.runExample()
      setResults({ ...results, [example.id]: result })
    } catch (error) {
      setResults({ ...results, [example.id]: { error: error instanceof Error ? error.message : 'An error occurred' } })
    } finally {
      setLoading({ ...loading, [example.id]: false })
    }
  }

  const handleCopy = async (code: string, id: string) => {
    const success = await copyToClipboard(code)
    if (success) {
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    }
  }

  const getActiveTab = (exampleId: string) => activeTab[exampleId] || 'javascript'
  const setExampleTab = (exampleId: string, tab: string) => {
    setActiveTab({ ...activeTab, [exampleId]: tab })
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16">
      <div className="container-max">
        {/* Page Header */}
        <motion.div
          className="max-w-4xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Code2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              API Examples
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Interactive examples demonstrating how to use the Kalori Makanan API
          </p>
        </motion.div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover="lift" className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                        <example.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{example.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Endpoint */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Endpoint</p>
                    <code className="block bg-gray-100 px-3 py-2 rounded text-sm">
                      GET {example.endpoint}
                    </code>
                  </div>

                  {/* Code Tabs */}
                  <div className="mb-4">
                    <div className="flex space-x-4 mb-3 border-b border-gray-200">
                      {Object.keys(example.code).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setExampleTab(example.id, lang)}
                          className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                            getActiveTab(example.id) === lang
                              ? 'text-primary border-primary'
                              : 'text-gray-500 border-transparent hover:text-gray-700'
                          }`}
                        >
                          {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'cURL'}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => handleCopy(
                          example.code[getActiveTab(example.id) as keyof typeof example.code],
                          `${example.id}-${getActiveTab(example.id)}`
                        )}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors z-10"
                      >
                        {copiedCode === `${example.id}-${getActiveTab(example.id)}` ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-xs text-gray-300">
                          <code>{example.code[getActiveTab(example.id) as keyof typeof example.code]}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Run Button */}
                  <Button
                    onClick={() => runExample(example)}
                    disabled={loading[example.id]}
                    className="w-full"
                  >
                    {loading[example.id] ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Example
                      </>
                    )}
                  </Button>

                  {/* Results */}
                  {results[example.id] && activeExample === example.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-700">Response</p>
                        <Badge variant="success" size="sm">Live Result</Badge>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-xs text-gray-300">
                          <code>{JSON.stringify(results[example.id], null, 2)}</code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Examples Section */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Integration Example</h2>
          <Card>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">React Hook Example</h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>{`import { useState, useEffect } from 'react';

function useFoodSearch(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.length < 2) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          \`https://kalori-makanan-kkm.onrender.com/foods/search?name=\${query}\`
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { data, loading, error };
}

// Usage
function FoodSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFoodSearch(searchTerm);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search foods..."
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <ul>
          {data.foods.map(food => (
            <li key={food.id}>
              {food.name} - {food.calories_kcal} kcal
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Node.js Backend Example</h3>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                      <code>{`const express = require('express');
const axios = require('axios');
const app = express();

const API_BASE_URL = 'https://kalori-makanan-kkm.onrender.com';

// Proxy endpoint for food search
app.get('/api/foods/search', async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get(\`\${API_BASE_URL}/foods/search\`, {
      params: { name }
    });

    // Add caching headers
    res.set('Cache-Control', 'public, max-age=300');
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message
    });
  }
});

// Get food details with caching
const cache = new Map();

app.get('/api/foods/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = \`food-\${id}\`;

  // Check cache
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey));
  }

  try {
    const response = await axios.get(\`\${API_BASE_URL}/foods/\${id}\`);

    // Cache for 1 hour
    cache.set(cacheKey, response.data);
    setTimeout(() => cache.delete(cacheKey), 3600000);

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Tips Section */}
        <motion.section
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <ChevronRight className="w-5 h-5 text-primary mr-2" />
                  Implement Caching
                </h3>
                <p className="text-gray-600">
                  Cache API responses on your server to reduce latency and API calls. Food data doesn't change frequently.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <ChevronRight className="w-5 h-5 text-primary mr-2" />
                  Use Debouncing
                </h3>
                <p className="text-gray-600">
                  When implementing search, debounce user input to avoid making too many API requests.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <ChevronRight className="w-5 h-5 text-primary mr-2" />
                  Handle Errors Gracefully
                </h3>
                <p className="text-gray-600">
                  Always implement proper error handling and show user-friendly messages when API calls fail.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <ChevronRight className="w-5 h-5 text-primary mr-2" />
                  Respect Rate Limits
                </h3>
                <p className="text-gray-600">
                  Although generous, be mindful of rate limits and implement retry logic with exponential backoff.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
