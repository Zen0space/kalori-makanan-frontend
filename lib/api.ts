// API client functions for Kalori Makanan API

import {
  Food,
  FoodSearchResponse,
  Category,
  HealthCheck,
  PaginationParams,
  CalorieResponse,
  ApiError
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://kalori-makanan-kkm.onrender.com';

// Helper function for API requests
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        detail: `HTTP error! status: ${response.status}`,
        status: response.status,
      }));
      throw new Error(error.detail || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

// Health check
export async function getHealthStatus(): Promise<HealthCheck> {
  return apiRequest<HealthCheck>('/health');
}

// Search foods by name
export async function searchFoods(name: string): Promise<FoodSearchResponse> {
  const encodedName = encodeURIComponent(name);
  return apiRequest<FoodSearchResponse>(`/foods/search?name=${encodedName}`);
}

// Get food by ID
export async function getFoodById(id: number): Promise<Food> {
  return apiRequest<Food>(`/foods/${id}`);
}

// List all foods with pagination
export async function getAllFoods(params?: PaginationParams): Promise<FoodSearchResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const query = queryParams.toString();
  return apiRequest<FoodSearchResponse>(`/foods${query ? `?${query}` : ''}`);
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  return apiRequest<Category[]>('/categories');
}

// Quick calorie lookup
export async function getCaloriesByName(name: string): Promise<CalorieResponse> {
  const encodedName = encodeURIComponent(name);
  return apiRequest<CalorieResponse>(`/foods/search/${encodedName}/calories`);
}

// Get foods by category
export async function getFoodsByCategory(category: string, params?: PaginationParams): Promise<FoodSearchResponse> {
  const queryParams = new URLSearchParams();
  queryParams.append('category', category);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  return apiRequest<FoodSearchResponse>(`/foods?${queryParams.toString()}`);
}
