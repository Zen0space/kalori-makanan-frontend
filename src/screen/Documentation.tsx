import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Server,
  Code2,
  Book,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  CodeExample,
} from "../components/ui";

export const Documentation: React.FC = () => {
  const endpoints = [
    {
      method: "GET",
      path: "/health",
      description: "Check API health status",
      response: `{
  "status": "healthy",
  "message": "API is running",
  "database_connected": true
}`,
    },
    {
      method: "GET",
      path: "/foods/search?name={name}",
      description: "Search foods by name",
      response: `{
  "total": 2,
  "foods": [
    {
      "id": 1,
      "name": "Nasi Lemak",
      "serving": "1 plate",
      "calories_kcal": 400,
      "category": "Rice Dishes"
    }
  ]
}`,
    },
    {
      method: "GET",
      path: "/foods/{id}",
      description: "Get food by ID",
      response: `{
  "id": 1,
  "name": "Nasi Lemak",
  "serving": "1 plate",
  "weight_g": 250,
  "calories_kcal": 400,
  "reference": "Malaysian Food Database",
  "category": "Rice Dishes"
}`,
    },
    {
      method: "GET",
      path: "/foods",
      description: "List all foods (paginated)",
      response: `{
  "items": [...],
  "total": 750,
  "page": 1,
  "size": 10,
  "pages": 75
}`,
    },
    {
      method: "GET",
      path: "/categories",
      description: "List all categories",
      response: `[
  {
    "id": 1,
    "name": "Rice Dishes"
  },
  {
    "id": 2,
    "name": "Noodles"
  }
]`,
    },
    {
      method: "GET",
      path: "/foods/search/{name}/calories",
      description: "Quick calorie lookup by food name",
      response: `{
  "food_name": "Nasi Lemak",
  "calories": 400
}`,
    },
  ];

  const integrationExamples = [
    {
      title: "JavaScript/TypeScript",
      language: "typescript",
      code: `// Install a HTTP client (optional)
// npm install axios

const API_KEY = process.env.KALORI_MAKANAN_API_KEY;

// Using Fetch API
async function searchFoods(name: string) {
  const response = await fetch(
    \`https://kalori-makanan-kkm.onrender.com/foods/search?name=\${encodeURIComponent(name)}\`,
    {
      headers: {
        'X-API-Key': API_KEY
      }
    }
  );

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  const data = await response.json();
  return data.foods;
}

// Using Axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://kalori-makanan-kkm.onrender.com',
  headers: {
    'X-API-Key': API_KEY
  }
});

async function getFoodById(id: number) {
  const { data } = await api.get(\`/foods/\${id}\`);
  return data;
}`,
    },
    {
      title: "Python",
      language: "python",
      code: `import requests
import os
from typing import List, Dict

BASE_URL = "https://kalori-makanan-kkm.onrender.com"
API_KEY = os.environ.get("KALORI_MAKANAN_API_KEY")

headers = {
    "X-API-Key": API_KEY
}

def search_foods(name: str) -> List[Dict]:
    """Search foods by name"""
    response = requests.get(
        f"{BASE_URL}/foods/search",
        params={"name": name},
        headers=headers
    )
    response.raise_for_status()
    return response.json()["foods"]

def get_food_by_id(food_id: int) -> Dict:
    """Get food details by ID"""
    response = requests.get(
        f"{BASE_URL}/foods/{food_id}",
        headers=headers
    )
    response.raise_for_status()
    return response.json()

def get_categories() -> List[Dict]:
    """Get all food categories"""
    response = requests.get(
        f"{BASE_URL}/categories",
        headers=headers
    )
    response.raise_for_status()
    return response.json()`,
    },
    {
      title: "cURL",
      language: "bash",
      code: `# Set your API key as an environment variable
export API_KEY="your_api_key_here"

# Search foods
curl -H "X-API-Key: $API_KEY" \\
  "https://kalori-makanan-kkm.onrender.com/foods/search?name=rendang"

# Get food by ID
curl -H "X-API-Key: $API_KEY" \\
  "https://kalori-makanan-kkm.onrender.com/foods/123"

# Get all categories
curl -H "X-API-Key: $API_KEY" \\
  "https://kalori-makanan-kkm.onrender.com/categories"

# Get paginated food list
curl -H "X-API-Key: $API_KEY" \\
  "https://kalori-makanan-kkm.onrender.com/foods?page=1&size=20"

# Quick calorie lookup
curl -H "X-API-Key: $API_KEY" \\
  "https://kalori-makanan-kkm.onrender.com/foods/search/nasi%20goreng/calories"`,
    },
  ];

  const errorResponses = [
    {
      status: 400,
      description: "Bad Request",
      example: `{
  "detail": "Invalid query parameter"
}`,
    },
    {
      status: 401,
      description: "Unauthorized",
      example: `{
  "detail": "Invalid or missing API key"
}`,
    },
    {
      status: 403,
      description: "Forbidden",
      example: `{
  "detail": "API key does not have permission for this resource"
}`,
    },
    {
      status: 404,
      description: "Not Found",
      example: `{
  "detail": "Food not found"
}`,
    },
    {
      status: 429,
      description: "Rate Limit Exceeded",
      example: `{
  "detail": "Rate limit exceeded. Please try again later."
}`,
    },
    {
      status: 500,
      description: "Internal Server Error",
      example: `{
  "detail": "Internal server error"
}`,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete guide to integrating the Kalori Makanan API into your
            application
          </p>
        </motion.div>

        {/* Getting Started */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="w-6 h-6 mr-2 text-primary" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Base URL</h3>
                <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                  https://kalori-makanan-kkm.onrender.com
                </code>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Authentication</h3>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    API key authentication is required for all endpoints.
                    Include your API key in the request headers:
                  </p>
                  <div className="bg-gray-900 dark:bg-gray-950 p-4 rounded-lg">
                    <code className="text-sm text-gray-300">
                      X-API-Key: your_api_key_here
                    </code>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                      How to get an API key:
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-300">
                      <li>
                        Visit the{" "}
                        <a
                          href="https://kalori-makanan-kkm.onrender.com/docs"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          API documentation page
                        </a>
                      </li>
                      <li>Contact the API provider to request access</li>
                      <li>
                        Store your API key securely (use environment variables)
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Rate Limiting</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The API has a rate limit of 100 requests per minute per IP
                  address.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Response Format</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  All responses are returned in JSON format with appropriate
                  HTTP status codes.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" size="sm">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    200 OK
                  </Badge>
                  <Badge variant="warning" size="sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    400 Bad Request
                  </Badge>
                  <Badge variant="danger" size="sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    401 Unauthorized
                  </Badge>
                  <Badge variant="danger" size="sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    403 Forbidden
                  </Badge>
                  <Badge variant="danger" size="sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    404 Not Found
                  </Badge>
                  <Badge variant="warning" size="sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    429 Rate Limited
                  </Badge>
                  <Badge variant="danger" size="sm">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    500 Internal Error
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Endpoints */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Server className="w-8 h-8 mr-3 text-primary" />
            API Endpoints
          </h2>

          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card variant="default">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            endpoint.method === "GET" ? "success" : "primary"
                          }
                          size="sm"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-lg font-mono">
                          {endpoint.path}
                        </code>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {endpoint.description}
                    </p>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">
                        Example Response:
                      </h4>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{endpoint.response}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Integration Examples */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Code2 className="w-8 h-8 mr-3 text-primary" />
            Integration Examples
          </h2>

          <div className="grid lg:grid-cols-1 gap-8">
            {integrationExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <CodeExample
                  title={example.title}
                  code={example.code}
                  language={example.language}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Error Handling */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-primary" />
                Error Handling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The API uses standard HTTP status codes to indicate success or
                failure of requests.
              </p>
              <div className="space-y-4">
                {errorResponses.map((error, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="danger" size="sm">
                        {error.status}
                      </Badge>
                      <span className="font-semibold">{error.description}</span>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                      <code>{error.example}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Additional Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="gradient">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need More Help?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Explore our interactive API documentation for testing endpoints
                in real-time
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://kalori-makanan-kkm.onrender.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Swagger Docs
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                <a
                  href="https://kalori-makanan-kkm.onrender.com/redoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  ReDoc
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};
