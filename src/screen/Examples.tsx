import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  BookOpen,
  Terminal,
  Zap,
  Shield,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui";

export const Examples: React.FC = () => {
  const [activeTab, setActiveTab] = useState("setup");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tabs = [
    {
      id: "setup",
      title: "Getting Started",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: "javascript",
      title: "JavaScript/Node.js",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      id: "python",
      title: "Python",
      icon: <Terminal className="w-4 h-4" />,
    },
    {
      id: "curl",
      title: "cURL/CLI",
      icon: <Terminal className="w-4 h-4" />,
    },
    {
      id: "frontend",
      title: "Frontend Apps",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: "best-practices",
      title: "Best Practices",
      icon: <Shield className="w-4 h-4" />,
    },
  ];

  const renderSetupGuide = () => (
    <div className="space-y-8">
      {/* Step 1: Get API Key */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
              1
            </span>
            Get Your API Key
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            First, you need to generate an API key from your dashboard.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Note:</p>
                <p>
                  If you don't have an API key yet, go to your{" "}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-blue-600 underline"
                    onClick={() =>
                      alert(
                        "Please sign up or login to access your dashboard and generate API keys",
                      )
                    }
                  >
                    Dashboard
                  </Button>{" "}
                  and generate one.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() =>
                window.open(
                  "https://kalori-makanan-kkm.onrender.com/docs",
                  "_blank",
                )
              }
              icon={<ExternalLink className="w-4 h-4" />}
            >
              View API Docs
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                window.open(
                  "https://kalori-makanan-kkm.onrender.com/redoc",
                  "_blank",
                )
              }
              icon={<BookOpen className="w-4 h-4" />}
            >
              ReDoc
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Environment Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
              2
            </span>
            Environment Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Add your API key to your environment variables for secure storage.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Create .env file:</h4>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`# .env file
KALORI_MAKANAN_API_KEY=your_api_key_here
KALORI_MAKANAN_BASE_URL=https://kalori-makanan-kkm.onrender.com`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      `# .env file\nKALORI_MAKANAN_API_KEY=your_api_key_here\nKALORI_MAKANAN_BASE_URL=https://kalori-makanan-kkm.onrender.com`,
                      "env",
                    )
                  }
                  className="absolute top-2 right-2"
                >
                  {copiedCode === "env" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <p className="font-semibold mb-1">Security Best Practices:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Never commit your .env file to version control</li>
                    <li>Add .env to your .gitignore file</li>
                    <li>
                      Use different API keys for development and production
                    </li>
                    <li>Regularly rotate your API keys</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Rate Limits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
              3
            </span>
            Rate Limits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Be aware of the API rate limits to avoid getting blocked:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">10</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                requests per minute
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">200</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                requests per hour
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">500</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                requests per day
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderJavaScriptExamples = () => (
    <div className="space-y-8">
      {/* Node.js Example */}
      <Card>
        <CardHeader>
          <CardTitle>Node.js/JavaScript Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">1. Install dependencies:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`npm install dotenv axios
# or
yarn add dotenv axios`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard("npm install dotenv axios", "npm-install")
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "npm-install" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">2. Create API client:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`// api-client.js
require('dotenv').config();
const axios = require('axios');

const API_BASE_URL = process.env.KALORI_MAKANAN_BASE_URL || 'https://kalori-makanan-kkm.onrender.com';
const API_KEY = process.env.KALORI_MAKANAN_API_KEY;

if (!API_KEY) {
  throw new Error('KALORI_MAKANAN_API_KEY is required in .env file');
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded. Please wait before making more requests.');
    }
    return Promise.reject(error);
  }
);

module.exports = apiClient;`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `// api-client.js\nrequire('dotenv').config();\nconst axios = require('axios');\n\nconst API_BASE_URL = process.env.KALORI_MAKANAN_BASE_URL || 'https://kalori-makanan-kkm.onrender.com';\nconst API_KEY = process.env.KALORI_MAKANAN_API_KEY;\n\nif (!API_KEY) {\n  throw new Error('KALORI_MAKANAN_API_KEY is required in .env file');\n}\n\nconst apiClient = axios.create({\n  baseURL: API_BASE_URL,\n  headers: {\n    'X-API-Key': API_KEY,\n    'Content-Type': 'application/json',\n  },\n});\n\n// Add response interceptor for error handling\napiClient.interceptors.response.use(\n  (response) => response,\n  (error) => {\n    if (error.response?.status === 429) {\n      console.error('Rate limit exceeded. Please wait before making more requests.');\n    }\n    return Promise.reject(error);\n  }\n);\n\nmodule.exports = apiClient;`,
                    "api-client",
                  )
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "api-client" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">3. Usage examples:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`// example.js
const apiClient = require('./api-client');

async function searchFoods(name) {
  try {
    const response = await apiClient.get('/foods/search', {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching foods:', error.message);
    throw error;
  }
}

async function getFoodById(id) {
  try {
    const response = await apiClient.get(\`/foods/\${id}\`);
    return response.data;
  } catch (error) {
    console.error('Error getting food:', error.message);
    throw error;
  }
}

async function getQuickCalories(foodName) {
  try {
    const response = await apiClient.get(\`/foods/search/\${encodeURIComponent(foodName)}/calories\`);
    return response.data;
  } catch (error) {
    console.error('Error getting calories:', error.message);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Search for nasi lemak
    const searchResults = await searchFoods('nasi lemak');
    console.log('Search results:', searchResults);

    // Get quick calorie info
    const calories = await getQuickCalories('rendang');
    console.log('Calories:', calories);

    // Get specific food details
    const food = await getFoodById(1);
    console.log('Food details:', food);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `// example.js\nconst apiClient = require('./api-client');\n\nasync function searchFoods(name) {\n  try {\n    const response = await apiClient.get('/foods/search', {\n      params: { name }\n    });\n    return response.data;\n  } catch (error) {\n    console.error('Error searching foods:', error.message);\n    throw error;\n  }\n}\n\nasync function getFoodById(id) {\n  try {\n    const response = await apiClient.get(\`/foods/\${id}\`);\n    return response.data;\n  } catch (error) {\n    console.error('Error getting food:', error.message);\n    throw error;\n  }\n}\n\nasync function getQuickCalories(foodName) {\n  try {\n    const response = await apiClient.get(\`/foods/search/\${encodeURIComponent(foodName)}/calories\`);\n    return response.data;\n  } catch (error) {\n    console.error('Error getting calories:', error.message);\n    throw error;\n  }\n}\n\n// Example usage\nasync function main() {\n  try {\n    // Search for nasi lemak\n    const searchResults = await searchFoods('nasi lemak');\n    console.log('Search results:', searchResults);\n\n    // Get quick calorie info\n    const calories = await getQuickCalories('rendang');\n    console.log('Calories:', calories);\n\n    // Get specific food details\n    const food = await getFoodById(1);\n    console.log('Food details:', food);\n  } catch (error) {\n    console.error('Error:', error.message);\n  }\n}\n\nmain();`,
                    "js-example",
                  )
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "js-example" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TypeScript Example */}
      <Card>
        <CardHeader>
          <CardTitle>TypeScript Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`// types.ts
export interface Food {
  id: number;
  name: string;
  serving?: string;
  weight_g?: number;
  calories_kcal?: number;
  reference?: string;
  category?: string;
}

export interface FoodSearchResponse {
  total: number;
  foods: Food[];
}

export interface CalorieInfo {
  food_name: string;
  calories: number;
}

// api-client.ts
import axios, { AxiosInstance } from 'axios';
import { Food, FoodSearchResponse, CalorieInfo } from './types';

class KaloriMakananAPI {
  private client: AxiosInstance;

  constructor(apiKey: string, baseURL = 'https://kalori-makanan-kkm.onrender.com') {
    this.client = axios.create({
      baseURL,
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Add error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded. Please wait before making more requests.');
        }
        throw error;
      }
    );
  }

  async searchFoods(name: string): Promise<FoodSearchResponse> {
    const response = await this.client.get('/foods/search', {
      params: { name }
    });
    return response.data;
  }

  async getFoodById(id: number): Promise<Food> {
    const response = await this.client.get(\`/foods/\${id}\`);
    return response.data;
  }

  async getQuickCalories(foodName: string): Promise<CalorieInfo> {
    const response = await this.client.get(\`/foods/search/\${encodeURIComponent(foodName)}/calories\`);
    return response.data;
  }
}

export default KaloriMakananAPI;`}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                copyToClipboard(
                  `// types.ts\nexport interface Food {\n  id: number;\n  name: string;\n  serving?: string;\n  weight_g?: number;\n  calories_kcal?: number;\n  reference?: string;\n  category?: string;\n}\n\nexport interface FoodSearchResponse {\n  total: number;\n  foods: Food[];\n}\n\nexport interface CalorieInfo {\n  food_name: string;\n  calories: number;\n}\n\n// api-client.ts\nimport axios, { AxiosInstance } from 'axios';\nimport { Food, FoodSearchResponse, CalorieInfo } from './types';\n\nclass KaloriMakananAPI {\n  private client: AxiosInstance;\n\n  constructor(apiKey: string, baseURL = 'https://kalori-makanan-kkm.onrender.com') {\n    this.client = axios.create({\n      baseURL,\n      headers: {\n        'X-API-Key': apiKey,\n        'Content-Type': 'application/json',\n      },\n    });\n\n    // Add error handling\n    this.client.interceptors.response.use(\n      (response) => response,\n      (error) => {\n        if (error.response?.status === 429) {\n          throw new Error('Rate limit exceeded. Please wait before making more requests.');\n        }\n        throw error;\n      }\n    );\n  }\n\n  async searchFoods(name: string): Promise<FoodSearchResponse> {\n    const response = await this.client.get('/foods/search', {\n      params: { name }\n    });\n    return response.data;\n  }\n\n  async getFoodById(id: number): Promise<Food> {\n    const response = await this.client.get(\`/foods/\${id}\`);\n    return response.data;\n  }\n\n  async getQuickCalories(foodName: string): Promise<CalorieInfo> {\n    const response = await this.client.get(\`/foods/search/\${encodeURIComponent(foodName)}/calories\`);\n    return response.data;\n  }\n}\n\nexport default KaloriMakananAPI;`,
                  "ts-example",
                )
              }
              className="absolute top-2 right-2"
            >
              {copiedCode === "ts-example" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPythonExamples = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Python Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">1. Install dependencies:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`pip install requests python-dotenv
# or
poetry add requests python-dotenv`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    "pip install requests python-dotenv",
                    "pip-install",
                  )
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "pip-install" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">2. Create API client:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`# kalori_api.py
import os
import requests
from typing import Dict, List, Optional
from dotenv import load_dotenv

load_dotenv()

class KaloriMakananAPI:
    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        self.api_key = api_key or os.getenv('KALORI_MAKANAN_API_KEY')
        self.base_url = base_url or os.getenv('KALORI_MAKANAN_BASE_URL', 'https://kalori-makanan-kkm.onrender.com')

        if not self.api_key:
            raise ValueError("API key is required. Set KALORI_MAKANAN_API_KEY in .env file")

        self.session = requests.Session()
        self.session.headers.update({
            'X-API-Key': self.api_key,
            'Content-Type': 'application/json'
        })

    def _make_request(self, method: str, endpoint: str, **kwargs) -> Dict:
        """Make HTTP request with error handling"""
        url = f"{self.base_url}{endpoint}"

        try:
            response = self.session.request(method, url, **kwargs)

            if response.status_code == 429:
                raise Exception("Rate limit exceeded. Please wait before making more requests.")

            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            raise Exception(f"API request failed: {str(e)}")

    def search_foods(self, name: str) -> Dict:
        """Search foods by name"""
        return self._make_request('GET', '/foods/search', params={'name': name})

    def get_food_by_id(self, food_id: int) -> Dict:
        """Get food details by ID"""
        return self._make_request('GET', f'/foods/{food_id}')

    def get_quick_calories(self, food_name: str) -> Dict:
        """Get quick calorie information"""
        endpoint = f'/foods/search/{requests.utils.quote(food_name)}/calories'
        return self._make_request('GET', endpoint)

    def get_categories(self) -> List[Dict]:
        """Get all food categories"""
        return self._make_request('GET', '/categories')

    def get_all_foods(self, page: int = 1, size: int = 10) -> Dict:
        """Get paginated list of all foods"""
        return self._make_request('GET', '/foods', params={'page': page, 'size': size})

    def check_health(self) -> Dict:
        """Check API health status"""
        return self._make_request('GET', '/health')`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `# kalori_api.py\nimport os\nimport requests\nfrom typing import Dict, List, Optional\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\nclass KaloriMakananAPI:\n    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):\n        self.api_key = api_key or os.getenv('KALORI_MAKANAN_API_KEY')\n        self.base_url = base_url or os.getenv('KALORI_MAKANAN_BASE_URL', 'https://kalori-makanan-kkm.onrender.com')\n        \n        if not self.api_key:\n            raise ValueError("API key is required. Set KALORI_MAKANAN_API_KEY in .env file")\n        \n        self.session = requests.Session()\n        self.session.headers.update({\n            'X-API-Key': self.api_key,\n            'Content-Type': 'application/json'\n        })\n\n    def _make_request(self, method: str, endpoint: str, **kwargs) -> Dict:\n        """Make HTTP request with error handling"""\n        url = f"{self.base_url}{endpoint}"\n        \n        try:\n            response = self.session.request(method, url, **kwargs)\n            \n            if response.status_code == 429:\n                raise Exception("Rate limit exceeded. Please wait before making more requests.")\n            \n            response.raise_for_status()\n            return response.json()\n            \n        except requests.exceptions.RequestException as e:\n            raise Exception(f"API request failed: {str(e)}")\n\n    def search_foods(self, name: str) -> Dict:\n        """Search foods by name"""\n        return self._make_request('GET', '/foods/search', params={'name': name})\n\n    def get_food_by_id(self, food_id: int) -> Dict:\n        """Get food details by ID"""\n        return self._make_request('GET', f'/foods/{food_id}')\n\n    def get_quick_calories(self, food_name: str) -> Dict:\n        """Get quick calorie information"""\n        endpoint = f'/foods/search/{requests.utils.quote(food_name)}/calories'\n        return self._make_request('GET', endpoint)\n\n    def get_categories(self) -> List[Dict]:\n        """Get all food categories"""\n        return self._make_request('GET', '/categories')\n\n    def get_all_foods(self, page: int = 1, size: int = 10) -> Dict:\n        """Get paginated list of all foods"""\n        return self._make_request('GET', '/foods', params={'page': page, 'size': size})\n\n    def check_health(self) -> Dict:\n        """Check API health status"""\n        return self._make_request('GET', '/health')`,
                    "python-client",
                  )
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "python-client" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">3. Usage example:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`# example.py
from kalori_api import KaloriMakananAPI

def main():
    # Initialize API client (reads from .env automatically)
    api = KaloriMakananAPI()

    try:
        # Check API health
        health = api.check_health()
        print(f"API Status: {health['status']}")

        # Search for foods
        search_results = api.search_foods('nasi lemak')
        print(f"Found {search_results['total']} foods")

        for food in search_results['foods'][:3]:
            print(f"- {food['name']}: {food['calories_kcal']} kcal")

        # Get quick calories
        calories = api.get_quick_calories('rendang')
        print(f"{calories['food_name']}: {calories['calories']} calories")

        # Get food by ID
        food_detail = api.get_food_by_id(1)
        print(f"Food #{food_detail['id']}: {food_detail['name']}")

        # Get categories
        categories = api.get_categories()
        print(f"Available categories: {len(categories)}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `# example.py\nfrom kalori_api import KaloriMakananAPI\n\ndef main():\n    # Initialize API client (reads from .env automatically)\n    api = KaloriMakananAPI()\n\n    try:\n        # Check API health\n        health = api.check_health()\n        print(f"API Status: {health['status']}")\n\n        # Search for foods\n        search_results = api.search_foods('nasi lemak')\n        print(f"Found {search_results['total']} foods")\n        \n        for food in search_results['foods'][:3]:\n            print(f"- {food['name']}: {food['calories_kcal']} kcal")\n\n        # Get quick calories\n        calories = api.get_quick_calories('rendang')\n        print(f"{calories['food_name']}: {calories['calories']} calories")\n\n        # Get food by ID\n        food_detail = api.get_food_by_id(1)\n        print(f"Food #{food_detail['id']}: {food_detail['name']}")\n\n        # Get categories\n        categories = api.get_categories()\n        print(f"Available categories: {len(categories)}")\n\n    except Exception as e:\n        print(f"Error: {e}")\n\nif __name__ == "__main__":\n    main()`,
                    "python-example",
                  )
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "python-example" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurlExamples = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>cURL Command Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Basic Setup:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`# Set your API key as environment variable
export KALORI_MAKANAN_API_KEY="your_api_key_here"
export API_BASE_URL="https://kalori-makanan-kkm.onrender.com"`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `# Set your API key as environment variable\nexport KALORI_MAKANAN_API_KEY="your_api_key_here"\nexport API_BASE_URL="https://kalori-makanan-kkm.onrender.com"`,
                    "curl-setup",
                  )
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "curl-setup" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">API Examples:</h4>
            <div className="space-y-4">
              {[
                {
                  title: "Health Check",
                  command: `curl -H "X-API-Key: $KALORI_MAKANAN_API_KEY" \\\n  "$API_BASE_URL/health"`,
                  id: "curl-health",
                },
                {
                  title: "Search Foods",
                  command: `curl -H "X-API-Key: $KALORI_MAKANAN_API_KEY" \\\n  "$API_BASE_URL/foods/search?name=nasi%20lemak"`,
                  id: "curl-search",
                },
                {
                  title: "Get Food by ID",
                  command: `curl -H "X-API-Key: $KALORI_MAKANAN_API_KEY" \\\n  "$API_BASE_URL/foods/1"`,
                  id: "curl-id",
                },
                {
                  title: "Quick Calories",
                  command: `curl -H "X-API-Key: $KALORI_MAKANAN_API_KEY" \\\n  "$API_BASE_URL/foods/search/rendang/calories"`,
                  id: "curl-calories",
                },
                {
                  title: "Get Categories",
                  command: `curl -H "X-API-Key: $KALORI_MAKANAN_API_KEY" \\\n  "$API_BASE_URL/categories"`,
                  id: "curl-categories",
                },
                {
                  title: "Paginated Foods",
                  command: `curl -H "X-API-Key: $KALORI_MAKANAN_API_KEY" \\\n  "$API_BASE_URL/foods?page=1&size=10"`,
                  id: "curl-paginated",
                },
              ].map((example) => (
                <div key={example.id}>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {example.title}:
                  </h5>
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{example.command}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(example.command, example.id)
                      }
                      className="absolute top-2 right-2"
                    >
                      {copiedCode === example.id ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFrontendExamples = () => (
    <div className="space-y-8">
      {/* React Example */}
      <Card>
        <CardHeader>
          <CardTitle>React/Next.js Integration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Environment Setup:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`# .env.local (Next.js)
NEXT_PUBLIC_KALORI_MAKANAN_API_KEY=your_api_key_here
NEXT_PUBLIC_KALORI_MAKANAN_BASE_URL=https://kalori-makanan-kkm.onrender.com

# .env (Vite/React)
VITE_KALORI_MAKANAN_API_KEY=your_api_key_here
VITE_KALORI_MAKANAN_BASE_URL=https://kalori-makanan-kkm.onrender.com`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `# .env.local (Next.js)\nNEXT_PUBLIC_KALORI_MAKANAN_API_KEY=your_api_key_here\nNEXT_PUBLIC_KALORI_MAKANAN_BASE_URL=https://kalori-makanan-kkm.onrender.com\n\n# .env (Vite/React)\nVITE_KALORI_MAKANAN_API_KEY=your_api_key_here\nVITE_KALORI_MAKANAN_BASE_URL=https://kalori-makanan-kkm.onrender.com`,
                    "frontend-env",
                  )
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "frontend-env" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">React Hook Example:</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`// hooks/useKaloriAPI.js
import { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_KALORI_MAKANAN_API_KEY || process.env.VITE_KALORI_MAKANAN_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_KALORI_MAKANAN_BASE_URL || process.env.VITE_KALORI_MAKANAN_BASE_URL;

export function useKaloriAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {
        ...options,
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait before trying again.');
      }

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchFoods = (name) => makeRequest(\`/foods/search?name=\${encodeURIComponent(name)}\`);
  const getFoodById = (id) => makeRequest(\`/foods/\${id}\`);
  const getQuickCalories = (name) => makeRequest(\`/foods/search/\${encodeURIComponent(name)}/calories\`);
  const getCategories = () => makeRequest('/categories');

  return {
    loading,
    error,
    searchFoods,
    getFoodById,
    getQuickCalories,
    getCategories,
  };
}

// components/FoodSearch.jsx
import React, { useState } from 'react';
import { useKaloriAPI } from '../hooks/useKaloriAPI';

export default function FoodSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { loading, error, searchFoods } = useKaloriAPI();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const data = await searchFoods(query);
      setResults(data.foods);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for food..."
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-2">
        {results.map((food) => (
          <div key={food.id} className="p-3 border rounded">
            <h3 className="font-semibold">{food.name}</h3>
            <p className="text-gray-600">{food.calories_kcal} kcal</p>
            {food.category && (
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {food.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}`}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `// hooks/useKaloriAPI.js\nimport { useState, useEffect } from 'react';\n\nconst API_KEY = process.env.NEXT_PUBLIC_KALORI_MAKANAN_API_KEY || process.env.VITE_KALORI_MAKANAN_API_KEY;\nconst BASE_URL = process.env.NEXT_PUBLIC_KALORI_MAKANAN_BASE_URL || process.env.VITE_KALORI_MAKANAN_BASE_URL;\n\nexport function useKaloriAPI() {\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState(null);\n\n  const makeRequest = async (endpoint, options = {}) => {\n    setLoading(true);\n    setError(null);\n\n    try {\n      const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {\n        ...options,\n        headers: {\n          'X-API-Key': API_KEY,\n          'Content-Type': 'application/json',\n          ...options.headers,\n        },\n      });\n\n      if (response.status === 429) {\n        throw new Error('Rate limit exceeded. Please wait before trying again.');\n      }\n\n      if (!response.ok) {\n        throw new Error(\`HTTP error! status: \${response.status}\`);\n      }\n\n      const data = await response.json();\n      return data;\n    } catch (err) {\n      setError(err.message);\n      throw err;\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  const searchFoods = (name) => makeRequest(\`/foods/search?name=\${encodeURIComponent(name)}\`);\n  const getFoodById = (id) => makeRequest(\`/foods/\${id}\`);\n  const getQuickCalories = (name) => makeRequest(\`/foods/search/\${encodeURIComponent(name)}/calories\`);\n  const getCategories = () => makeRequest('/categories');\n\n  return {\n    loading,\n    error,\n    searchFoods,\n    getFoodById,\n    getQuickCalories,\n    getCategories,\n  };\n}\n\n// components/FoodSearch.jsx\nimport React, { useState } from 'react';\nimport { useKaloriAPI } from '../hooks/useKaloriAPI';\n\nexport default function FoodSearch() {\n  const [query, setQuery] = useState('');\n  const [results, setResults] = useState([]);\n  const { loading, error, searchFoods } = useKaloriAPI();\n\n  const handleSearch = async (e) => {\n    e.preventDefault();\n    if (!query.trim()) return;\n\n    try {\n      const data = await searchFoods(query);\n      setResults(data.foods);\n    } catch (err) {\n      console.error('Search failed:', err);\n    }\n  };\n\n  return (\n    <div className="max-w-md mx-auto p-6">\n      <form onSubmit={handleSearch} className="mb-4">\n        <input\n          type="text"\n          value={query}\n          onChange={(e) => setQuery(e.target.value)}\n          placeholder="Search for food..."\n          className="w-full p-2 border rounded mb-2"\n        />\n        <button\n          type="submit"\n          disabled={loading}\n          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"\n        >\n          {loading ? 'Searching...' : 'Search'}\n        </button>\n      </form>\n\n      {error && (\n        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">\n          {error}\n        </div>\n      )}\n\n      <div className="space-y-2">\n        {results.map((food) => (\n          <div key={food.id} className="p-3 border rounded">\n            <h3 className="font-semibold">{food.name}</h3>\n            <p className="text-gray-600">{food.calories_kcal} kcal</p>\n            {food.category && (\n              <span className="text-xs bg-gray-200 px-2 py-1 rounded">\n                {food.category}\n              </span>\n            )}\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}`,
                    "react-example",
                  )
                }
                className="absolute top-2 right-2"
              >
                {copiedCode === "react-example" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBestPractices = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Security Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                API Key Security
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>
                    Store API keys in environment variables (.env files)
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Never commit API keys to version control</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>
                    Use different keys for development/staging/production
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Regularly rotate your API keys</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Monitor API key usage in your dashboard</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                Rate Limiting
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>
                    Implement exponential backoff for rate limit errors
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Cache responses when possible to reduce API calls</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Handle 429 status codes gracefully</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Monitor usage patterns in your dashboard</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                Error Handling
              </h4>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`// Example error handling
async function makeAPIRequest(endpoint) {
  try {
    const response = await fetch(endpoint, {
      headers: { 'X-API-Key': process.env.KALORI_MAKANAN_API_KEY }
    });

    if (response.status === 429) {
      // Rate limit exceeded - implement backoff
      const retryAfter = response.headers.get('Retry-After') || 60;
      console.log(\`Rate limited. Retry after \${retryAfter} seconds\`);
      throw new Error('RATE_LIMITED');
    }

    if (response.status === 401) {
      throw new Error('Invalid API key');
    }

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    if (error.message === 'RATE_LIMITED') {
      // Handle rate limiting
      return null;
    }
    console.error('API request failed:', error);
    throw error;
  }
}`}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      `// Example error handling\nasync function makeAPIRequest(endpoint) {\n  try {\n    const response = await fetch(endpoint, {\n      headers: { 'X-API-Key': process.env.KALORI_MAKANAN_API_KEY }\n    });\n\n    if (response.status === 429) {\n      // Rate limit exceeded - implement backoff\n      const retryAfter = response.headers.get('Retry-After') || 60;\n      console.log(\`Rate limited. Retry after \${retryAfter} seconds\`);\n      throw new Error('RATE_LIMITED');\n    }\n\n    if (response.status === 401) {\n      throw new Error('Invalid API key');\n    }\n\n    if (!response.ok) {\n      throw new Error(\`HTTP error! status: \${response.status}\`);\n    }\n\n    return await response.json();\n  } catch (error) {\n    if (error.message === 'RATE_LIMITED') {\n      // Handle rate limiting\n      return null;\n    }\n    console.error('API request failed:', error);\n    throw error;\n  }\n}`,
                      "error-handling",
                    )
                  }
                  className="absolute top-2 right-2"
                >
                  {copiedCode === "error-handling" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Production Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Production Deployment Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              "Environment variables are properly configured",
              "API keys are securely stored and not exposed",
              "Error handling is implemented for all API calls",
              "Rate limiting is properly handled with backoff strategies",
              "Caching is implemented where appropriate",
              "Monitoring and logging are set up",
              "Fallback mechanisms for API failures",
              "Regular API key rotation schedule",
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 mt-0.5"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "setup":
        return renderSetupGuide();
      case "javascript":
        return renderJavaScriptExamples();
      case "python":
        return renderPythonExamples();
      case "curl":
        return renderCurlExamples();
      case "frontend":
        return renderFrontendExamples();
      case "best-practices":
        return renderBestPractices();
      default:
        return renderSetupGuide();
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Integration Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn how to integrate the Kalori Makanan API into your applications
            with step-by-step examples and best practices.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "secondary"}
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon}
                size="sm"
              >
                {tab.title}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto"
        >
          {renderTabContent()}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Card variant="gradient" className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Generate your API key and start building amazing nutrition apps
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  window.open(
                    "https://kalori-makanan-kkm.onrender.com/docs",
                    "_blank",
                  )
                }
                icon={<ExternalLink className="w-5 h-5" />}
              >
                View API Documentation
              </Button>
              <Button
                variant="primary"
                size="lg"
                icon={<ChevronRight className="w-5 h-5" />}
                onClick={() =>
                  alert(
                    "Please sign up or login to access your dashboard and generate API keys",
                  )
                }
              >
                Get Your API Key
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
