# Keep-Alive Documentation 🏃‍♂️

## Overview

This document explains the keep-alive mechanism implemented to prevent the Kalori Makanan API (hosted on Render.com free tier) from sleeping due to inactivity.

## Problem

Render.com's free tier automatically spins down services after **15 minutes of inactivity**. When the service is sleeping:
- First request takes 30-60 seconds to respond (cold start)
- Poor user experience
- API appears to be down

## Solution

We've implemented a **Netlify Scheduled Function** that automatically pings the API every **14 minutes** to keep it active 24/7.

## How It Works

### 1. Scheduled Function
- **Location**: `/netlify/functions/keep-api-alive.mts`
- **Schedule**: Runs every 14 minutes (`*/14 * * * *`)
- **Actions**:
  - Checks API health endpoint
  - Searches for random Malaysian food
  - Fetches categories list

### 2. Random Food Searches
The function randomly searches for Malaysian foods to simulate real usage:
```javascript
const FOOD_SEARCHES = [
  'nasi lemak', 'rendang', 'ayam goreng', 
  'char kuey teow', 'roti canai', 'satay',
  'laksa', 'nasi goreng', 'mee goreng',
  // ... and more
];
```

### 3. API Endpoints Called
- `GET /health` - Health check
- `GET /foods/search?name={randomFood}` - Search simulation
- `GET /categories` - Categories check

## Setup Instructions

### 1. Deploy to Netlify
The keep-alive function is automatically activated when you deploy to Netlify.

### 2. Environment Variables
Ensure this is set in Netlify:
```
NEXT_PUBLIC_API_BASE_URL=https://kalori-makanan-kkm.onrender.com
```

### 3. Verify Deployment
After deploying, check Netlify Functions tab to confirm:
- Function name: `keep-api-alive`
- Schedule: `*/14 * * * *`
- Status: Active

## Testing & Monitoring

### 1. Manual Testing
Test the keep-alive endpoint locally:
```bash
# During development
curl http://localhost:3000/api/keep-alive

# After deployment
curl https://your-site.netlify.app/api/keep-alive
```

### 2. Monitoring Page
Visit `/monitor` on your deployed site to see:
- Current API status
- Last ping results
- Manual trigger button
- Keep-alive statistics

### 3. Check Netlify Logs
```bash
# View function logs in Netlify dashboard
Functions → keep-api-alive → View logs
```

## API Route Alternative

If scheduled functions don't work, use the API route:
- **Endpoint**: `/api/keep-alive`
- **Methods**: GET, POST
- Can be called by external cron services

### External Cron Services (Backup Options)
1. **Cron-job.org** (free)
2. **UptimeRobot** (free tier)
3. **EasyCron** (free tier)

Set them to call:
```
https://your-site.netlify.app/api/keep-alive
```

## Response Format

Successful response:
```json
{
  "success": true,
  "message": "Keep-alive ping completed",
  "apiUrl": "https://kalori-makanan-kkm.onrender.com",
  "results": {
    "healthCheck": "success",
    "searchTest": "success",
    "categoriesCheck": "success",
    "searchedFood": "nasi lemak",
    "totalResults": 2
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Troubleshooting

### Function Not Running
1. Check Netlify dashboard → Functions tab
2. Verify `netlify.toml` includes function configuration
3. Check function logs for errors

### API Still Sleeping
1. Verify the cron expression: `*/14 * * * *`
2. Check if function is actually executing (logs)
3. Ensure API URL is correct in environment variables

### Manual Override
If automatic pings fail, manually trigger:
```javascript
// Browser console
fetch('/api/keep-alive')
  .then(res => res.json())
  .then(console.log)
```

## Cost Considerations

- **Netlify Functions**: 125,000 free requests/month
- **Keep-alive usage**: ~3,000 requests/month
- **Well within free tier limits**

## Development

### Local Testing
```bash
# Test the function locally
netlify functions:serve

# In another terminal
curl http://localhost:8888/.netlify/functions/keep-api-alive
```

### Modifying Schedule
Edit `netlify.toml`:
```toml
[functions."keep-api-alive"]
  schedule = "*/14 * * * *"  # Change this line
```

Common schedules:
- `*/10 * * * *` - Every 10 minutes
- `*/20 * * * *` - Every 20 minutes
- `0 * * * *` - Every hour

## Important Notes

1. **14-minute interval** ensures the API never reaches the 15-minute sleep threshold
2. **Random searches** prevent the API from detecting patterns
3. **Multiple endpoints** ensure comprehensive activity
4. **Monitoring page** is for debugging only - the function runs automatically

## Support

If the keep-alive function stops working:
1. Check Netlify function logs
2. Verify API is accessible
3. Test manual endpoint
4. Consider backup cron service

---

**Remember**: This keep-alive solution is specifically for Render.com's free tier limitations. If you upgrade to a paid tier, you can disable this function.