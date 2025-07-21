import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Zap,
  Code2,
  Database,
  FileText,
  Rocket,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button, Card, CardContent, Badge } from "../components/ui";
import { searchFoods, getHealthStatus, isApiConfigured } from "../lib/api";
import { Food, HealthCheck } from "../lib/types";
import useSWR from "swr";

// Development helper for API testing (adds utilities to browser console)
import "../utils/testApi";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string>("");

  // Fetch health status
  const { data: healthStatus } = useSWR<HealthCheck>(
    "health",
    getHealthStatus,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
    },
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError("");
    try {
      const response = await searchFoods(searchQuery);
      setSearchResults(response.foods.slice(0, 3)); // Show only top 3 results
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(
        error instanceof Error
          ? error.message
          : "Search failed. Please try again.",
      );
    } finally {
      setIsSearching(false);
    }
  };

  const stats = [
    { value: "750+", label: "Food Items" },
    { value: "11", label: "Categories" },
    { value: "KKM", label: "Trusted Data" },
    { value: "99.9%", label: "Uptime" },
  ];

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Food Search",
      description: "Search by name across our comprehensive database",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Calorie Data",
      description: "Detailed nutrition information for every food item",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Categories",
      description: "Organized food groups for easy navigation",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "REST API",
      description: "Easy integration with any platform or language",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Auto Docs",
      description: "Interactive Swagger & ReDoc documentation",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Production Ready",
      description: "Deployed & reliable with high availability",
    },
  ];

  const codeExamples = [
    {
      title: "Search Foods",
      language: "bash",
      code: `curl -H "X-API-Key: your_api_key" \\
  "https://kalori-makanan-kkm.onrender.com/foods/search?name=nasi%20lemak"`,
    },
    {
      title: "JavaScript/TypeScript",
      language: "typescript",
      code: `const response = await fetch(
  'https://kalori-makanan-kkm.onrender.com/foods/search?name=rendang',
  {
    headers: {
      'X-API-Key': 'your_api_key'
    }
  }
);
const data = await response.json();
console.log(data.foods);`,
    },
    {
      title: "Python",
      language: "python",
      code: `import requests

response = requests.get(
    "https://kalori-makanan-kkm.onrender.com/foods/search",
    params={"name": "ayam"},
    headers={"X-API-Key": "your_api_key"}
)
foods = response.json()["foods"]`,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="primary" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Live API
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Malaysia's Most Trusted
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Food Calorie API
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              750+ Malaysian & International Foods with detailed nutritional
              data by KKM (Kementerian Kesihatan Malaysia) for accurate health
              information.
            </p>

            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 dark:text-green-400 font-medium text-sm">
                  Data by KKM
                </span>
              </div>
              {healthStatus && (
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">
                  <div
                    className={`w-2 h-2 rounded-full ${healthStatus.status === "healthy" ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">
                    API Status:{" "}
                    {healthStatus.status === "healthy"
                      ? "Operational"
                      : "Issues Detected"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gradient"
                size="lg"
                onClick={() =>
                  window.open(
                    "https://kalori-makanan-kkm.onrender.com/docs",
                    "_blank",
                  )
                }
                icon={<ExternalLink className="w-5 h-5" />}
              >
                Get API Access
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("documentation")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powerful features for modern nutrition applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" hover className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Try It Live</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Search our database of Malaysian & International foods
              </p>
            </div>

            <Card variant="gradient" className="p-8">
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try searching: nasi lemak, rendang, ayam..."
                    className="w-full pl-12 pr-32 py-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    size="sm"
                    isLoading={isSearching}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    Search
                  </Button>
                </div>
              </form>

              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">
                    Search Results:
                  </h3>
                  {searchResults.map((food) => (
                    <div
                      key={food.id}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{food.name}</h4>
                          {food.category && (
                            <Badge variant="outline" size="sm" className="mt-1">
                              {food.category}
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {food.calories_kcal || "N/A"}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            kcal
                          </div>
                        </div>
                      </div>
                      {food.serving && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Serving: {food.serving}
                        </p>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {searchError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    <strong>Error:</strong> {searchError}
                  </p>
                  {!isApiConfigured() && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                      💡 Tip: Make sure you have set your
                      VITE_KALORI_MAKANAN_API_KEY in your .env file
                    </p>
                  )}
                </motion.div>
              )}

              {searchError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    <strong>Error:</strong> {searchError}
                  </p>
                  {!isApiConfigured() && (
                    <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                      💡 Tip: Make sure you have set your
                      VITE_KALORI_MAKANAN_API_KEY in your .env file
                    </p>
                  )}
                </motion.div>
              )}

              {searchQuery &&
                searchResults.length === 0 &&
                !isSearching &&
                !searchError && (
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    No results found. Try another search term.
                  </p>
                )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section
        id="documentation"
        className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Quick Start
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Integrate with any language or platform in minutes
              </p>
            </div>

            {/* API Key Setup Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 p-8 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl border border-blue-200 dark:border-blue-800"
            >
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5" />
                </div>
                API Key Setup
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Get your API key</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Visit{" "}
                      <a
                        href="https://kalori-makanan-kkm.onrender.com/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline"
                      >
                        the API documentation
                      </a>{" "}
                      to request your API key
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">
                      Add to your request headers
                    </p>
                    <div className="bg-gray-900 dark:bg-gray-950 p-3 rounded-lg">
                      <code className="text-sm text-gray-300">
                        X-API-Key: your_api_key_here
                      </code>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-2">Start making requests</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      You're ready to search 750+ Malaysian & International
                      foods!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Code Examples Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {codeExamples.map((example, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 p-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs text-gray-500 font-mono">
                          {example.language}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="text-white font-medium mb-3">
                          {example.title}
                        </h4>
                        <pre className="text-xs text-gray-300 overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex flex-col sm:flex-row gap-4">
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={() =>
                    window.open(
                      "https://kalori-makanan-kkm.onrender.com/docs",
                      "_blank",
                    )
                  }
                  icon={<ExternalLink className="w-5 h-5" />}
                >
                  View Full API Documentation
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() =>
                    window.open(
                      "https://github.com/Zen0space/kalori-makanan-kkm",
                      "_blank",
                    )
                  }
                  icon={<Code2 className="w-5 h-5" />}
                >
                  View on GitHub
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start integrating the Kalori Makanan API into your application
              today. No credit card required.
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
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Get API Access
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20"
                onClick={() =>
                  document
                    .getElementById("documentation")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Examples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
