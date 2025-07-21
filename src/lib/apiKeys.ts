import { db, dbErrorHandler } from "./db";
import { API_BASE_URL } from "./api";

// Generate a random API key
const generateApiKey = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = 'kkm_';
  for (let i = 0; i < 32; i++) {
    apiKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return apiKey;
};

// Hash API key for storage
const hashApiKey = async (apiKey: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(apiKey);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// API Key interface
export interface ApiKey {
  id: number;
  user_id: number;
  name: string;
  key_preview: string; // First 8 chars + masked rest
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
  usage_count?: number;
}

// API Key with full key (only returned on creation)
export interface ApiKeyWithSecret extends ApiKey {
  key: string;
}

// Usage statistics interface
export interface UsageStats {
  total_requests: number;
  requests_today: number;
  requests_this_hour: number;
  requests_this_minute: number;
  limits: {
    per_minute: { limit: number; remaining: number };
    per_hour: { limit: number; remaining: number };
    per_day: { limit: number; remaining: number };
  };
  recent_requests: Array<{
    timestamp: string;
    endpoint: string;
  }>;
}

// Create a new API key for a user
export const createApiKey = async (
  userId: string,
  name: string
): Promise<ApiKeyWithSecret> => {
  try {
    const apiKey = generateApiKey();
    const keyHash = await hashApiKey(apiKey);

    const result = await db.execute({
      sql: "INSERT INTO api_keys (user_id, key_hash, name) VALUES (?, ?, ?) RETURNING id, user_id, name, created_at, last_used_at, is_active",
      args: [userId, keyHash, name],
    });

    if (result.rows.length === 0) {
      throw new Error("Failed to create API key");
    }

    const row = result.rows[0] as any;

    return {
      id: row.id,
      user_id: row.user_id,
      name: row.name,
      key: apiKey,
      key_preview: apiKey.substring(0, 8) + '...' + apiKey.substring(apiKey.length - 4),
      created_at: row.created_at,
      last_used_at: row.last_used_at,
      is_active: row.is_active === 1,
    };
  } catch (error) {
    return dbErrorHandler(error, "createApiKey");
  }
};

// Get all API keys for a user
export const getUserApiKeys = async (userId: string): Promise<ApiKey[]> => {
  try {
    const result = await db.execute({
      sql: `
        SELECT
          ak.id,
          ak.user_id,
          ak.name,
          ak.created_at,
          ak.last_used_at,
          ak.is_active,
          COUNT(rll.id) as usage_count
        FROM api_keys ak
        LEFT JOIN rate_limit_logs rll ON ak.id = rll.api_key_id
        WHERE ak.user_id = ?
        GROUP BY ak.id
        ORDER BY ak.created_at DESC
      `,
      args: [userId],
    });

    return result.rows.map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      name: row.name,
      key_preview: 'kkm_****...' + row.id.toString().padStart(4, '0'),
      created_at: row.created_at,
      last_used_at: row.last_used_at,
      is_active: row.is_active === 1,
      usage_count: row.usage_count || 0,
    }));
  } catch (error) {
    return dbErrorHandler(error, "getUserApiKeys");
  }
};

// Toggle API key active status
export const toggleApiKeyStatus = async (
  userId: string,
  apiKeyId: number
): Promise<boolean> => {
  try {
    const result = await db.execute({
      sql: "UPDATE api_keys SET is_active = NOT is_active WHERE id = ? AND user_id = ? RETURNING is_active",
      args: [apiKeyId, userId],
    });

    if (result.rows.length === 0) {
      throw new Error("API key not found or unauthorized");
    }

    return (result.rows[0] as any).is_active === 1;
  } catch (error) {
    return dbErrorHandler(error, "toggleApiKeyStatus");
  }
};

// Delete an API key
export const deleteApiKey = async (
  userId: string,
  apiKeyId: number
): Promise<void> => {
  try {
    const result = await db.execute({
      sql: "DELETE FROM api_keys WHERE id = ? AND user_id = ?",
      args: [apiKeyId, userId],
    });

    if (result.rowsAffected === 0) {
      throw new Error("API key not found or unauthorized");
    }
  } catch (error) {
    return dbErrorHandler(error, "deleteApiKey");
  }
};

// Get usage statistics for a user
export const getUserUsageStats = async (userId: string): Promise<UsageStats> => {
  try {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get total requests
    const totalResult = await db.execute({
      sql: `
        SELECT COUNT(*) as total
        FROM rate_limit_logs rll
        JOIN api_keys ak ON rll.api_key_id = ak.id
        WHERE ak.user_id = ?
      `,
      args: [userId],
    });

    // Get requests in different time windows
    const timeWindowsResult = await db.execute({
      sql: `
        SELECT
          COUNT(CASE WHEN rll.timestamp > ? THEN 1 END) as minute_count,
          COUNT(CASE WHEN rll.timestamp > ? THEN 1 END) as hour_count,
          COUNT(CASE WHEN rll.timestamp > ? THEN 1 END) as day_count
        FROM rate_limit_logs rll
        JOIN api_keys ak ON rll.api_key_id = ak.id
        WHERE ak.user_id = ?
      `,
      args: [
        oneMinuteAgo.toISOString(),
        oneHourAgo.toISOString(),
        oneDayAgo.toISOString(),
        userId,
      ],
    });

    // Get recent requests
    const recentResult = await db.execute({
      sql: `
        SELECT rll.timestamp, rll.endpoint
        FROM rate_limit_logs rll
        JOIN api_keys ak ON rll.api_key_id = ak.id
        WHERE ak.user_id = ?
        ORDER BY rll.timestamp DESC
        LIMIT 10
      `,
      args: [userId],
    });

    const totals = totalResult.rows[0] as any;
    const timeWindows = timeWindowsResult.rows[0] as any;

    // Rate limits (from the backend configuration)
    const RATE_LIMITS = {
      per_minute: 10,
      per_hour: 200,
      per_day: 500,
    };

    return {
      total_requests: totals.total || 0,
      requests_today: timeWindows.day_count || 0,
      requests_this_hour: timeWindows.hour_count || 0,
      requests_this_minute: timeWindows.minute_count || 0,
      limits: {
        per_minute: {
          limit: RATE_LIMITS.per_minute,
          remaining: Math.max(0, RATE_LIMITS.per_minute - (timeWindows.minute_count || 0)),
        },
        per_hour: {
          limit: RATE_LIMITS.per_hour,
          remaining: Math.max(0, RATE_LIMITS.per_hour - (timeWindows.hour_count || 0)),
        },
        per_day: {
          limit: RATE_LIMITS.per_day,
          remaining: Math.max(0, RATE_LIMITS.per_day - (timeWindows.day_count || 0)),
        },
      },
      recent_requests: recentResult.rows.map((row: any) => ({
        timestamp: row.timestamp,
        endpoint: row.endpoint,
      })),
    };
  } catch (error) {
    return dbErrorHandler(error, "getUserUsageStats");
  }
};

// Check if API key exists in backend
export const verifyApiKeyWithBackend = async (apiKey: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    // If we get a 200 or 429 (rate limited), the key is valid
    return response.status === 200 || response.status === 429;
  } catch (error) {
    console.error('Error verifying API key:', error);
    return false;
  }
};

// Get usage chart data
export const getUsageChartData = async (userId: string, days = 7): Promise<Array<{
  date: string;
  requests: number;
}>> => {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

    const result = await db.execute({
      sql: `
        SELECT
          DATE(rll.timestamp) as date,
          COUNT(*) as requests
        FROM rate_limit_logs rll
        JOIN api_keys ak ON rll.api_key_id = ak.id
        WHERE ak.user_id = ? AND rll.timestamp >= ? AND rll.timestamp <= ?
        GROUP BY DATE(rll.timestamp)
        ORDER BY date ASC
      `,
      args: [userId, startDate.toISOString(), endDate.toISOString()],
    });

    // Fill in missing dates with 0 requests
    const chartData: Array<{ date: string; requests: number }> = [];
    const dataMap = new Map(
      result.rows.map((row: any) => [row.date, row.requests])
    );

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      chartData.push({
        date: dateStr,
        requests: dataMap.get(dateStr) || 0,
      });
    }

    return chartData;
  } catch (error) {
    return dbErrorHandler(error, "getUsageChartData");
  }
};
