import { type ClassValue, clsx } from 'clsx';

// Combine class names utility
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format number with thousand separators
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

// Format calories with unit
export function formatCalories(calories: number | undefined): string {
  if (calories === undefined || calories === null) return 'N/A';
  return `${formatNumber(Math.round(calories))} kcal`;
}

// Format weight in grams
export function formatWeight(weight: number | undefined): string {
  if (weight === undefined || weight === null) return 'N/A';
  return `${formatNumber(weight)}g`;
}

// Capitalize first letter of each word
export function capitalize(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Truncate text with ellipsis
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Get error message from various error types
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}

// Check if the code is running on the client side
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

// Generate URL-friendly slug from text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse query parameters from URL
export function parseQueryParams(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

// Format date to readable string
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Generate random ID for client-side use
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Check if value is empty (null, undefined, empty string, empty array, empty object)
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

// Create delay promise for loading states
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Format serving size for display
export function formatServing(serving: string | undefined): string {
  if (!serving || serving === 'N/A') return '';
  return serving;
}

// Get initials from name (for avatars)
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!isClient()) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// Format API endpoint for display
export function formatApiEndpoint(endpoint: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  return `${baseUrl}${endpoint}`;
}
