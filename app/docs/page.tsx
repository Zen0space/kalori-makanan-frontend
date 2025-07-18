'use client'

import { motion } from 'framer-motion'
import {
  Book,
  Code2,
  Terminal,
  FileJson,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { copyToClipboard } from '@/lib/utils'

const endpoints = [
  {
    method: 'GET',
    path: '/health',
    description: 'Check API health status',
    response: {
      status: 'ok',
      message: 'API is running',
      database_connected: true
    }
  },
  {
    method: 'GET',
    path: '/foods/search?name={name}',
    description: 'Search foods by name',
    params: [
      { name: 'name', type: 'string', required: true, description: 'Food name to search for' }
    ],
    response: {
      total: 2,
      foods: [
        {
          id: 1,
          name: "Nasi Lemak",
          calories_kcal: 398,
          serving: "1 pinggan",
          category: "Nasi"
        }
      ]
    }
  },
  {
    method: 'GET',
    path: '/foods/{id}',
    description: 'Get food by ID',
    params: [
      { name: 'id', type: 'integer', required: true, description: 'Food ID' }
    ],
    response: {
      id: 1,
      name: "Nasi Lemak",
      calories_kcal: 398,
      serving: "1 pinggan",
      weight_g: 230,
      reference: "MyFitnessPal",
      category: "Nasi"
    }
  },
  {
    method: 'GET',
    path: '/foods',
    description: 'List all foods with pagination',
    params: [
      { name: 'page', type: 'integer', required: false, description: 'Page number (default: 1)' },
      { name: 'limit', type: 'integer', required: false, description: 'Items per page (default: 20)' }
    ],
    response: {
      total: 750,
      page: 1,
      limit: 20,
      foods: []
    }
  },
  {
    method: 'GET',
    path: '/categories',
    description: 'List all food categories',
    response: [
      { id: 1, name: "Nasi" },
      { id: 2, name: "Mee" },
      { id: 3, name: "Roti" }
    ]
  },
  {
    method: 'GET',
    path: '/foods/search/{name}/calories',
    description: 'Quick calorie lookup by name',
    params: [
      { name: 'name', type: 'string', required: true, description: 'Food name' }
    ],
    response: {
      food_name: "Nasi Lemak",
      calories_kcal: 398,
      serving: "1 pinggan"
    }
  }
]

const codeExamples = {
  curl: `curl "https://kalori-makanan-kkm.onrender.com/foods/search?name=nasi%20lemak"`,

  javascript: `// Using Fetch API
const response = await fetch(
  'https://kalori-makanan-kkm.onrender.com/foods/search?name=nasi lemak'
);
const data = await response.json();
console.log(data);

// Using Axios
const axios = require('axios');
const { data } = await axios.get(
  'https://kalori-makanan-kkm.onrender.com/foods/search',
  { params: { name: 'nasi lemak' } }
);`,

  python: `import requests

# Search for food
response = requests.get(
    'https://kalori-makanan-kkm.onrender.com/foods/search',
    params={'name': 'nasi lemak'}
)
data = response.json()
print(data)

# Using with pandas
import pandas as pd
df = pd.DataFrame(data['foods'])`,

  php: `<?php
$url = 'https://kalori-makanan-kkm.onrender.com/foods/search?name=nasi%20lemak';
$response = file_get_contents($url);
$data = json_decode($response, true);
print_r($data);

// Using cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
?>`,
}

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('javascript')

  const handleCopy = async (code: string, id: string) => {
    const success = await copyToClipboard(code)
    if (success) {
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    }
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
            <Book className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              API Documentation
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Everything you need to integrate the Kalori Makanan API into your application
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.aside
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="sticky top-24 space-y-2">
              <a href="#getting-started" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                Getting Started
              </a>
              <a href="#endpoints" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                API Endpoints
              </a>
              <a href="#response-examples" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                Response Examples
              </a>
              <a href="#error-handling" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                Error Handling
              </a>
              <a href="#code-examples" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                Code Examples
              </a>
              <a href="#rate-limiting" className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                Rate Limiting
              </a>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <a
                  href="https://kalori-makanan-kkm.onrender.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <span>Interactive API Docs</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Getting Started */}
            <section id="getting-started" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
              <Card>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Base URL</h3>
                      <code className="block bg-gray-100 px-4 py-2 rounded text-sm">
                        https://kalori-makanan-kkm.onrender.com
                      </code>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Authentication</h3>
                      <p className="text-gray-600">No authentication required. The API is free and open to use.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Response Format</h3>
                      <p className="text-gray-600">All responses are returned in JSON format with appropriate HTTP status codes.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Endpoints */}
            <section id="endpoints" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API Endpoints</h2>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <Card key={index}>
                    <CardContent>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge variant="primary" size="sm">
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm font-mono text-gray-800">{endpoint.path}</code>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{endpoint.description}</p>

                      {endpoint.params && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
                          <div className="space-y-2">
                            {endpoint.params.map((param, idx) => (
                              <div key={idx} className="flex items-start space-x-2 text-sm">
                                <code className="bg-gray-100 px-2 py-0.5 rounded">{param.name}</code>
                                <span className="text-gray-500">({param.type})</span>
                                {param.required && <Badge variant="accent" size="xs">Required</Badge>}
                                <span className="text-gray-600">- {param.description}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Response Examples */}
            <section id="response-examples" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Response Examples</h2>
              <Card>
                <CardContent>
                  <h3 className="font-semibold text-gray-900 mb-3">Successful Response</h3>
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{JSON.stringify({
                        total: 3,
                        foods: [
                          {
                            id: 1,
                            name: "Nasi Lemak",
                            calories_kcal: 398,
                            serving: "1 pinggan",
                            weight_g: 230,
                            category: "Nasi"
                          }
                        ]
                      }, null, 2)}</code>
                    </pre>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-3">Pagination Response</h3>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{JSON.stringify({
                        total: 750,
                        page: 1,
                        limit: 20,
                        foods: []
                      }, null, 2)}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Error Handling */}
            <section id="error-handling" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Handling</h2>
              <Card>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Error Response Format</h3>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-sm text-gray-300">
                          <code>{JSON.stringify({
                            detail: "Food not found",
                            status: 404
                          }, null, 2)}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Common Error Codes</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="danger" size="sm">400</Badge>
                          <span className="text-gray-600">Bad Request - Invalid parameters</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="danger" size="sm">404</Badge>
                          <span className="text-gray-600">Not Found - Resource doesn't exist</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="danger" size="sm">500</Badge>
                          <span className="text-gray-600">Internal Server Error</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Code Examples */}
            <section id="code-examples" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Examples</h2>
              <Card>
                <CardContent className="p-0">
                  {/* Tabs */}
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6 pt-6">
                      {Object.keys(codeExamples).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setActiveTab(lang)}
                          className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === lang
                              ? 'text-primary border-primary'
                              : 'text-gray-500 border-transparent hover:text-gray-700'
                          }`}
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Content */}
                  <div className="p-6">
                    <div className="relative">
                      <button
                        onClick={() => handleCopy(codeExamples[activeTab as keyof typeof codeExamples], activeTab)}
                        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {copiedCode === activeTab ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{codeExamples[activeTab as keyof typeof codeExamples]}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Rate Limiting */}
            <section id="rate-limiting" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limiting</h2>
              <Card>
                <CardContent>
                  <div className="flex items-start space-x-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-600">
                        The API currently has generous rate limits suitable for most applications.
                        If you encounter rate limiting issues, please wait a moment before retrying your request.
                      </p>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> For production applications with high traffic, consider implementing
                      caching on your end to reduce API calls and improve performance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Additional Resources */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card hover="lift">
                  <CardContent>
                    <div className="flex items-center space-x-3 mb-2">
                      <Terminal className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-gray-900">Interactive API</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Test API endpoints directly in your browser with Swagger UI
                    </p>
                    <a
                      href="https://kalori-makanan-kkm.onrender.com/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary hover:underline"
                    >
                      <span>Open Swagger UI</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>

                <Card hover="lift">
                  <CardContent>
                    <div className="flex items-center space-x-3 mb-2">
                      <FileJson className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-gray-900">ReDoc</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Browse comprehensive API documentation with ReDoc
                    </p>
                    <a
                      href="https://kalori-makanan-kkm.onrender.com/redoc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-primary hover:underline"
                    >
                      <span>Open ReDoc</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </section>
          </motion.main>
        </div>
      </div>
    </div>
  )
}
