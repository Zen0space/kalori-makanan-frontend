// API Client for Kalori Makanan API

import {
  Food,
  FoodSearchResponse,
  Category,
  HealthCheck,
  PaginatedResponse,
  CalorieInfo,
} from "./types";

const API_BASE_URL =
  import.meta.env.VITE_KALORI_MAKANAN_BASE_URL ||
  "https://kalori-makanan-kkm.onrender.com";
const API_KEY = import.meta.env.VITE_KALORI_MAKANAN_API_KEY;

// Helper function to create headers with API key
function createHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["X-API-Key"] = API_KEY;
  } else {
    console.warn(
      "⚠️ VITE_KALORI_MAKANAN_API_KEY is not set. API requests may fail if authentication is required.",
    );
  }

  return headers;
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Handle specific authentication errors
    if (response.status === 401) {
      console.error("🔐 Authentication failed. Please check your API key.");
      throw new Error(
        "Authentication failed. Please verify your API key is correct.",
      );
    }

    if (response.status === 403) {
      console.error(
        "🚫 Access forbidden. Your API key may not have sufficient permissions.",
      );
      throw new Error(
        "Access forbidden. Your API key may not have sufficient permissions.",
      );
    }

    if (response.status === 429) {
      console.error("⏰ Rate limit exceeded. Please try again later.");
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    const error = await response
      .json()
      .catch(() => ({ detail: "An error occurred" }));

    console.error(`🔴 API Error (${response.status}):`, error);
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// API functions

/**
 * Check API health status
 */
export const getHealthStatus = async (): Promise<HealthCheck> => {
  const response = await fetch(`${API_BASE_URL}/health`, {
    headers: createHeaders(),
  });
  return handleResponse<HealthCheck>(response);
};

/**
 * Search foods by name
 */
export const searchFoods = async (
  name: string,
): Promise<FoodSearchResponse> => {
  console.log(`🔍 Searching for foods: "${name}"`);
  const params = new URLSearchParams({ name });
  const response = await fetch(`${API_BASE_URL}/foods/search?${params}`, {
    headers: createHeaders(),
  });
  const result = await handleResponse<FoodSearchResponse>(response);
  console.log(`✅ Found ${result.total} foods matching "${name}"`);
  return result;
};

/**
 * Get food by ID
 */
export const getFoodById = async (id: number): Promise<Food> => {
  const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
    headers: createHeaders(),
  });
  return handleResponse<Food>(response);
};

/**
 * Get all foods (paginated)
 */
export const getAllFoods = async (
  page = 1,
  size = 10,
): Promise<PaginatedResponse<Food>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  const response = await fetch(`${API_BASE_URL}/foods?${params}`, {
    headers: createHeaders(),
  });
  return handleResponse<PaginatedResponse<Food>>(response);
};

/**
 * Get all categories
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    headers: createHeaders(),
  });
  return handleResponse<Category[]>(response);
};

/**
 * Quick calorie lookup by food name
 */
export const getQuickCalories = async (name: string): Promise<CalorieInfo> => {
  const response = await fetch(
    `${API_BASE_URL}/foods/search/${encodeURIComponent(name)}/calories`,
    {
      headers: createHeaders(),
    },
  );
  return handleResponse<CalorieInfo>(response);
};

// Utility function to check if API is properly configured
export const isApiConfigured = (): boolean => {
  return Boolean(API_KEY);
};

// Utility function to get API configuration status
export const getApiStatus = () => {
  return {
    baseUrl: API_BASE_URL,
    hasApiKey: Boolean(API_KEY),
    apiKeyPrefix: API_KEY ? `${API_KEY.substring(0, 8)}...` : "Not set",
  };
};

// Export base URL for reference
export { API_BASE_URL };
