# Live API Setup Guide

This guide will help you set up the live Kalori Makanan API integration for your frontend application.

## Prerequisites

- Node.js and npm/yarn installed
- Access to the Kalori Makanan API
- Basic knowledge of environment variables

## Step 1: Environment Configuration

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update your `.env` file with the following variables:**
   ```env
   # Kalori Makanan API Configuration
   VITE_KALORI_MAKANAN_BASE_URL=https://kalori-makanan-kkm.onrender.com
   VITE_KALORI_MAKANAN_API_KEY=your_actual_api_key_here
   
   # Alternative API Base URL (fallback)
   VITE_API_BASE_URL=https://kalori-makanan-kkm.onrender.com
   ```

## Step 2: Get Your API Key

1. **Visit the API Documentation:**
   - Go to [https://kalori-makanan-kkm.onrender.com/docs](https://kalori-makanan-kkm.onrender.com/docs)
   - Review the authentication requirements

2. **Request API Access:**
   - Contact the API provider to get your API key
   - The API key will be used in the `X-API-Key` header for authentication

3. **Update your environment file:**
   - Replace `your_actual_api_key_here` with your actual API key
   - **Important:** Never commit your real API key to version control

## Step 3: Test Your Setup

1. **Start your development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Check the API status on the homepage:**
   - Look for the API status indicators below the main call-to-action buttons
   - You should see:
     - "API Status: Operational" (green dot)
     - "API Key: Configured" (blue dot)

3. **Test the live demo:**
   - Use the search functionality on the homepage
   - Try searching for Malaysian foods like: "nasi lemak", "rendang", "ayam"
   - You should see real results from the live database

## Step 4: Available API Endpoints

The following endpoints are now available with authentication:

### Search Foods
```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://kalori-makanan-kkm.onrender.com/foods/search?name=nasi%20lemak"
```

### Get All Foods (Paginated)
```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://kalori-makanan-kkm.onrender.com/foods?page=1&size=10"
```

### Get Food by ID
```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://kalori-makanan-kkm.onrender.com/foods/1"
```

### Get Categories
```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://kalori-makanan-kkm.onrender.com/categories"
```

### Health Check
```bash
curl -H "X-API-Key: YOUR_API_KEY" \
     "https://kalori-makanan-kkm.onrender.com/health"
```

## Troubleshooting

### Common Issues

1. **"Authentication failed" Error:**
   - Check that your API key is correctly set in the `.env` file
   - Ensure there are no extra spaces or quotes around the API key
   - Verify your API key is valid and hasn't expired

2. **"API Key: Not Set" Status:**
   - Make sure your `.env` file is in the root directory
   - Restart your development server after updating environment variables
   - Check that the variable name is exactly `VITE_KALORI_MAKANAN_API_KEY`

3. **"Rate limit exceeded" Error:**
   - Wait a few minutes before making more requests
   - Implement request caching in your application
   - Contact the API provider if you need higher rate limits

4. **Network/CORS Issues:**
   - The API should handle CORS properly for web applications
   - If you encounter CORS issues, contact the API provider

### Development Tips

1. **Environment Variables:**
   - Restart your dev server when changing environment variables
   - Use different API keys for development and production if available

2. **Error Handling:**
   - The API client includes comprehensive error handling
   - Check the browser console for detailed error messages
   - All API errors are logged with relevant context

3. **Performance:**
   - The health check runs every 30 seconds automatically
   - Search results are limited to top 3 for the demo (you can modify this)
   - Consider implementing debouncing for search inputs in production

## API Response Format

### Food Object
```typescript
interface Food {
  id: number;
  name: string;
  serving?: string;
  weight_g?: number;
  calories_kcal?: number;
  reference?: string;
  category?: string;
}
```

### Search Response
```typescript
interface FoodSearchResponse {
  total: number;
  foods: Food[];
}
```

## Security Notes

- **Never expose your API key in client-side code in production**
- **Use environment variables for all sensitive configuration**
- **Consider implementing a backend proxy for production applications**
- **The current setup is suitable for development and demo purposes**

## Support

If you encounter issues:

1. Check the [API Documentation](https://kalori-makanan-kkm.onrender.com/docs)
2. Review the browser console for error messages
3. Verify your environment configuration
4. Contact the API provider for access or rate limit issues

## Database Information

The API provides access to:
- **750+ food items** from Malaysian and international cuisine
- **11 food categories** for organized browsing
- **Detailed nutritional information** including calories per serving
- **Real-time data** with high availability

---

**Happy coding! 🚀**