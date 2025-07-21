import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Key,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Activity,
  Clock,
  TrendingUp,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "../components/ui";
import { UsageChart } from "../components/UsageChart";
import { ApiTester } from "../components/ApiTester";
import {
  createApiKey,
  getUserApiKeys,
  toggleApiKeyStatus,
  deleteApiKey,
  getUserUsageStats,
  getUsageChartData,
} from "../lib/apiKeys";
import { ApiKey, ApiKeyWithSecret, UsageStats } from "../lib/apiKeys";

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [chartData, setChartData] = useState<
    Array<{ date: string; requests: number }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newApiKey, setNewApiKey] = useState<ApiKeyWithSecret | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<number | null>(null);
  const [showFullKey, setShowFullKey] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [user.id]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [keys, stats, chart] = await Promise.all([
        getUserApiKeys(user.id),
        getUserUsageStats(user.id),
        getUsageChartData(user.id, 7),
      ]);
      setApiKeys(keys);
      setUsageStats(stats);
      setChartData(chart);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateApiKey = async () => {
    if (!newKeyName.trim()) return;

    try {
      const apiKey = await createApiKey(user.id, newKeyName);
      setNewApiKey(apiKey);
      setNewKeyName("");
      await loadDashboardData();
    } catch (error) {
      console.error("Error creating API key:", error);
      alert("Failed to create API key");
    }
  };

  const handleToggleApiKey = async (apiKeyId: number) => {
    try {
      await toggleApiKeyStatus(user.id, apiKeyId);
      await loadDashboardData();
    } catch (error) {
      console.error("Error toggling API key:", error);
      alert("Failed to update API key status");
    }
  };

  const handleDeleteApiKey = async (apiKeyId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this API key? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await deleteApiKey(user.id, apiKeyId);
      await loadDashboardData();
    } catch (error) {
      console.error("Error deleting API key:", error);
      alert("Failed to delete API key");
    }
  };

  const copyToClipboard = (text: string, keyId?: number) => {
    navigator.clipboard.writeText(text);
    if (keyId) {
      setCopiedKeyId(keyId);
      setTimeout(() => setCopiedKeyId(null), 2000);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            API Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user.name}! Manage your API keys and monitor usage.
          </p>
        </motion.div>

        {/* Usage Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-blue-500" />
                <Badge variant="primary">Per Minute</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {usageStats?.limits.per_minute.remaining || 0}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                of {usageStats?.limits.per_minute.limit || 10} remaining
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      ((usageStats?.limits.per_minute.remaining || 0) /
                        (usageStats?.limits.per_minute.limit || 10)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-green-500" />
                <Badge variant="secondary">Per Hour</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {usageStats?.limits.per_hour.remaining || 0}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                of {usageStats?.limits.per_hour.limit || 200} remaining
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      ((usageStats?.limits.per_hour.remaining || 0) /
                        (usageStats?.limits.per_hour.limit || 200)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <Badge variant="outline">Per Day</Badge>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {usageStats?.limits.per_day.remaining || 0}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                of {usageStats?.limits.per_day.limit || 500} remaining
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      ((usageStats?.limits.per_day.remaining || 0) /
                        (usageStats?.limits.per_day.limit || 500)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Keys Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>API Keys</CardTitle>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => setShowNewKeyModal(true)}
                  icon={<Plus className="w-4 h-4" />}
                >
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {apiKeys.length === 0 ? (
                <div className="text-center py-8">
                  <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    No API keys yet. Generate your first key to get started.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setShowNewKeyModal(true)}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Generate API Key
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div
                      key={apiKey.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Key className="w-5 h-5 text-gray-400" />
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {apiKey.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Created on {formatDate(apiKey.created_at)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={apiKey.is_active ? "secondary" : "outline"}
                          >
                            {apiKey.is_active ? "Active" : "Inactive"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleApiKey(apiKey.id)}
                          >
                            {apiKey.is_active ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteApiKey(apiKey.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <code className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm flex-1">
                          {apiKey.key_preview}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            copyToClipboard(apiKey.key_preview, apiKey.id)
                          }
                        >
                          {copiedKeyId === apiKey.id ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>{apiKey.usage_count || 0} requests</span>
                        {apiKey.last_used_at && (
                          <span>
                            Last used: {formatDateTime(apiKey.last_used_at)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Usage Overview (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <UsageChart chartData={chartData} timeRange="7d" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Requests */}
        {usageStats && usageStats.recent_requests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent API Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {usageStats.recent_requests.map((request, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    >
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {request.endpoint}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDateTime(request.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* New API Key Modal */}
        {showNewKeyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4">
                Generate New API Key
              </h3>
              {!newApiKey ? (
                <>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Enter a name for this API key"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleCreateApiKey()
                    }
                  />
                  <div className="flex justify-end space-x-3 mt-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setShowNewKeyModal(false);
                        setNewKeyName("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="gradient"
                      onClick={handleCreateApiKey}
                      disabled={!newKeyName.trim()}
                    >
                      Generate Key
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-green-600 mb-4">
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">
                        API Key Generated Successfully!
                      </span>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-yellow-800 dark:text-yellow-200">
                          <p className="font-semibold mb-1">Important:</p>
                          <p>
                            Copy this API key now. For security reasons, you
                            won't be able to see it again.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type={showFullKey ? "text" : "password"}
                        value={newApiKey.key}
                        readOnly
                        className="w-full px-4 py-2 pr-20 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm dark:bg-gray-700"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                        <button
                          onClick={() => setShowFullKey(!showFullKey)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {showFullKey ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(newApiKey.key)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold mb-2">
                      Add to your .env file:
                    </h4>
                    <code className="block bg-gray-900 text-gray-100 p-3 rounded text-sm">
                      KALORI_MAKANAN_API_KEY={newApiKey.key}
                    </code>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-semibold mb-1">Usage:</p>
                      <p>
                        Include this API key in your requests using the
                        X-API-Key header:
                      </p>
                      <code className="block bg-blue-100 dark:bg-blue-900/50 p-2 rounded mt-2 text-xs">
                        X-API-Key: {newApiKey.key}
                      </code>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowNewKeyModal(false);
                      setNewApiKey(null);
                      setNewKeyName("");
                    }}
                    className="w-full"
                  >
                    Done
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        )}

        {/* API Tester Section */}
        {apiKeys.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>API Tester</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Test your API endpoints with your active API key
                </p>
                {apiKeys.filter((k) => k.is_active).length > 0 ? (
                  <ApiTester
                    apiKey={`kkm_****...${apiKeys
                      .find((k) => k.is_active)
                      ?.id.toString()
                      .padStart(4, "0")}`}
                  />
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No active API keys. Activate an API key to use the tester.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
