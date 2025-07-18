// TypeScript types based on Pydantic models from backend

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

export interface Category {
  id: number;
  name: string;
}

export interface HealthCheck {
  status: string;
  message: string;
  database_connected: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiError {
  detail: string;
  status?: number;
}

export interface CalorieResponse {
  food_name: string;
  calories_kcal: number;
  serving?: string;
}
