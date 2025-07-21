// API Response Types based on the Kalori Makanan API

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

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ApiError {
  detail: string;
  status?: number;
}

export interface CalorieInfo {
  food_name: string;
  calories: number;
}
