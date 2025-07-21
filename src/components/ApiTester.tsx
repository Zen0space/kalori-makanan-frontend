import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button, Card, CardContent, Badge } from "./ui";
import { API_BASE_URL } from "../lib/api";

interface ApiTesterProps {
  apiKey: string;
}

interface ApiResponse {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
  duration: number;
}

const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/health",
    description: "Check API health status",
    params: [],
  },
  {
    method: "GET",
    path: "/foods/search",
    description: "Search foods by name",
    params: [{ name: "name", type: "string", required: true, example: "nasi lemak" }],
  },
  {
    method: "GET",
    path: "/foods/{id}",
    description: "Get food by ID",
    params: [{ name: "id", type: "number", required: true, example: "1" }],
  },
  {
    method: "GET",
    path: "/foods",
    description: "List all foods (paginated)",
    params: [
      { name: "page", type: "number", required: false, example: "1" },
      { name: "size", type: "number", required: false, example: "10" },
    ],
  },
  {
    method: "GET",
    path: "/categories",
    description: "List all categories",
    params: [],
  },
  {
    method: "GET",
    path: "/foods/search/{name}/calories",
    description: "Quick calorie lookup",
    params: [{ name: "name", type: "string", required: true, example: "rendang" }],
  },
];

export const ApiTester: React.FC<ApiTesterProps> = ({ apiKey }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [params, setParams] = useState<Record<string, string>>({});
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleParamChange = (paramName: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [paramName]: value,
    }));
  };

  const buildUrl = () => {
    let url = API_BASE_URL + selectedEndpoint.path;

    // Replace path parameters
    selectedEndpoint.params.forEach((param) => {
      if (url.includes(`{${param.name}}`)) {
        url = url.replace(`{${param.name}}`, params[param.name] || "");
      }
    });

    // Add query parameters
    const queryParams = selectedEndpoint.params
      .filter((param) => !selectedEndpoint.path.includes(`{${param.name}}`))
      .filter((param) => params[param.name])
      .map((param) => `${param.name}=${encodeURIComponent(params[param.name])}`)
      .join("&");

    if (queryParams) {
      url += `?${queryParams}`;
    }

    return url;
  };

  const handleTest = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    const startTime = performance.now();

    try {
      const url = buildUrl();
      const res = await fetch(url, {
        method: selectedEndpoint.method,
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      });

      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      const data = await res.json();

      // Extract relevant headers
      const headers: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        if (
          key.toLowerCase().includes("rate") ||
          key.toLowerCase().includes("limit") ||
          key.toLowerCase().includes("remaining") ||
          key.toLowerCase().includes("reset")
        ) {
          headers[key] = value;
        }
      });

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
        headers,
        duration,
      });
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-600";
    if (status >= 400 && status < 500) return "text-yellow-600";
    if (status >= 500) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Endpoint Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Endpoint
        </label>
        <select
          value={API_ENDPOINTS.indexOf(selectedEndpoint)}
          onChange={(e) => {
            setSelectedEndpoint(API_ENDPOINTS[parseInt(e.target.value)]);
            setParams({});
            setResponse(null);
            setError(null);
          }}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
        >
          {API_ENDPOINTS.map((endpoint, index) => (
            <option key={index} value={index}>
              {endpoint.method} {endpoint.path} - {endpoint.description}
            </option>
          ))}
        </select>
      </div>

      {/* Parameters */}
      {selectedEndpoint.params.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Parameters
          </h4>
          {selectedEndpoint.params.map((param) => (
            <div key={param.name}>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                {param.name}
                {param.required && <span className="text-red-500 ml-1">*</span>}
                <span className="text-xs text-gray-500 ml-2">({param.type})</span>
              </label>
              <input
                type="text"
                value={params[param.name] || ""}
                onChange={(e) => handleParamChange(param.name, e.target.value)}
                placeholder={`e.g. ${param.example}`}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm dark:bg-gray-700"
              />
            </div>
          ))}
        </div>
      )}

      {/* Request URL Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Request URL
        </label>
        <div className="flex items-center space-x-2">
          <code className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-mono overflow-x-auto">
            {buildUrl()}
          </code>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(buildUrl(), "url")}
          >
            {copiedField === "url" ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Test Button */}
      <Button
        variant="gradient"
        onClick={handleTest}
        disabled={isLoading}
        icon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        className="w-full"
      >
        {isLoading ? "Testing..." : "Send Request"}
      </Button>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-800 dark:text-red-200">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Response Display */}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Response Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${getStatusColor(response.status)}`}>
                    {response.status}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {response.statusText}
                  </div>
                  <Badge variant="outline" size="sm">
                    {response.duration}ms
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rate Limit Headers */}
          {Object.keys(response.headers).length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Rate Limit Headers</h4>
                <div className="space-y-2">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{key}:</span>
                      <span className="font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Response Body */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Response Body</h4>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowRawResponse(!showRawResponse)}
                  >
                    {showRawResponse ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Pretty
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Raw
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(JSON.stringify(response.data, null, 2), "response")
                    }
                  >
                    {copiedField === "response" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                <code>
                  {showRawResponse
                    ? JSON.stringify(response.data)
                    : JSON.stringify(response.data, null, 2)}
                </code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ApiTester;
