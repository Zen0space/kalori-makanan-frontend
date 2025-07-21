# Keep-Alive Function for Kalori Makanan API

This Netlify function prevents your backend API from hibernating by making regular requests to keep it active.

## 📋 Overview

Free hosting services like Render.com put applications to sleep after periods of inactivity. This keep-alive function:

- 🔄 Makes regular API calls to prevent hibernation
- 🍽️ Uses realistic Malaysian food searches to simulate real traffic
- 📊 Monitors multiple API endpoints
- 📝 Provides detailed logging and status reports

## 🚀 Quick Start

### 1. Deploy the Function

The function is already set up in your project. When you deploy to Netlify, it will be automatically available at:
```
https://your-site.netlify.app/.netlify/functions/keep-alive
```

### 2. Test the Function

Visit the test page:
```
https://your-site.netlify.app/keep-alive-test.html
```

Or trigger manually via URL:
```
https://your-site.netlify.app/.netlify/functions/keep-alive
```

## ⚙️ Configuration

### Environment Variables

Set in your Netlify dashboard under **Site settings > Environment variables**:

- `NEXT_PUBLIC_API_BASE_URL` - Your API base URL (defaults to `https://kalori-makanan-kkm.onrender.com`)

### API Endpoints Tested

The function calls these endpoints:

1. **Health Check**: `GET /health`
2. **Food Search**: `GET /foods/search?name={random_food}`
3. **Categories**: `GET /categories`

### Food Search Terms

Uses authentic Malaysian and international foods:
- nasi lemak, rendang, satay
- char kuey teow, roti canai
- laksa, cendol, murtabak
- And 15+ more authentic dishes

## 📅 Scheduling Options

### Option 1: Netlify Scheduled Functions (Pro Plan)

Already configured in `netlify.toml`:
```toml
[[functions]]
  name = "keep-alive"
  schedule = "*/14 * * * *"  # Every 14 minutes
```

**Note**: Requires Netlify Pro plan ($19/month)

### Option 2: External Cron Services (Free)

Use free cron services like:

#### UptimeRobot (Recommended)
1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Create HTTP(s) monitor
3. URL: `https://your-site.netlify.app/.netlify/functions/keep-alive`
4. Monitoring interval: 5-15 minutes

#### Cron-job.org
1. Sign up at [cron-job.org](https://cron-job.org)
2. Create new cron job
3. URL: `https://your-site.netlify.app/.netlify/functions/keep-alive`
4. Schedule: `*/14 * * * *` (every 14 minutes)

#### GitHub Actions
Create `.github/workflows/keep-alive.yml`:
```yaml
name: Keep API Alive
on:
  schedule:
    - cron: '*/14 * * * *'  # Every 14 minutes
  workflow_dispatch:

jobs:
  keep-alive:
    runs-on: ubuntu-latest
    steps:
      - name: Call keep-alive function
        run: |
          curl -X GET "https://your-site.netlify.app/.netlify/functions/keep-alive"
```

## 🧪 Testing

### Manual Testing

1. **Via Test Page**: Visit `/keep-alive-test.html`
2. **Via URL**: Open `/.netlify/functions/keep-alive` in browser
3. **Via curl**:
   ```bash
   curl https://your-site.netlify.app/.netlify/functions/keep-alive
   ```

### Expected Response

```json
{
  "message": "Keep-alive ping completed",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "apiUrl": "https://kalori-makanan-kkm.onrender.com",
  "results": {
    "healthCheck": "success",
    "searchTest": "success", 
    "categoriesCheck": "success"
  },
  "summary": {
    "totalChecks": 3,
    "successfulChecks": 3
  },
  "note": "This function helps prevent API hibernation on free hosting services"
}
```

## 📊 Monitoring

### Function Logs

View logs in Netlify dashboard:
1. Go to **Functions** tab
2. Click on `keep-alive` function
3. View **Function log**

### Success Indicators

- `healthCheck`: API health endpoint responds
- `searchTest`: Food search works correctly
- `categoriesCheck`: Categories endpoint active

### What Each Check Does

1. **Health Check** (`/health`)
   - Verifies API is responding
   - Lightweight endpoint check

2. **Search Test** (`/foods/search`)
   - Tests main functionality
   - Uses random Malaysian food names
   - Logs search results for verification

3. **Categories Check** (`/categories`)
   - Ensures database connectivity
   - Tests additional endpoints

## 🔧 Troubleshooting

### Common Issues

#### "Function not found"
- Ensure function is deployed to Netlify
- Check `netlify.toml` configuration
- Verify `netlify/functions/keep-alive.ts` exists

#### API calls failing
- Check `NEXT_PUBLIC_API_BASE_URL` environment variable
- Verify your API is accessible
- Check API logs for errors

#### No scheduled execution
- Scheduled functions require Netlify Pro plan
- Use external cron service for free alternative
- Manual triggers always work

### Debug Steps

1. **Test manually** via test page
2. **Check function logs** in Netlify dashboard
3. **Verify API status** directly
4. **Check environment variables**

## 🛠️ Customization

### Modify Food Search Terms

Edit `FOOD_SEARCHES` array in `keep-alive.ts`:

```typescript
const FOOD_SEARCHES = [
  "your-custom-food-1",
  "your-custom-food-2",
  // ... add your foods
];
```

### Add More API Endpoints

Add additional checks in the `pingAPI` function:

```typescript
// Add your custom endpoint check
try {
  const customResponse = await fetch(`${API_BASE_URL}/your-endpoint`);
  if (customResponse.ok) {
    console.log("Custom endpoint active");
  }
} catch (error) {
  console.error("Custom endpoint failed:", error);
}
```

### Adjust Frequency

For external cron services:
- **Every 10 minutes**: `*/10 * * * *`
- **Every 15 minutes**: `*/15 * * * *`
- **Every 30 minutes**: `*/30 * * * *`

**Recommendation**: 10-15 minutes for free hosting services

## 📈 Benefits

- ✅ **Prevents cold starts**: Users get faster response times
- ✅ **Maintains availability**: API stays responsive 24/7
- ✅ **Realistic traffic**: Uses actual food search patterns
- ✅ **Comprehensive monitoring**: Tests multiple endpoints
- ✅ **Easy debugging**: Detailed logs and status reports
- ✅ **Cost effective**: Works with free hosting tiers

## 🔗 Related Files

- `netlify/functions/keep-alive.ts` - Main function code
- `public/keep-alive-test.html` - Manual test interface
- `netlify.toml` - Function configuration
- This documentation file

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review function logs in Netlify dashboard
3. Test your API endpoints manually
4. Verify environment variables are set correctly

The keep-alive function helps ensure your food calorie API remains responsive and provides the best user experience! 🍽️