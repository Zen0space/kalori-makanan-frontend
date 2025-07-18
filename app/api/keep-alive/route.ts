import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://kalori-makanan-kkm.onrender.com';

// Array of Malaysian and international foods to randomly search
const FOOD_SEARCHES = [
  'nasi lemak',
  'rendang',
  'ayam goreng',
  'char kuey teow',
  'roti canai',
  'satay',
  'laksa',
  'nasi goreng',
  'mee goreng',
  'teh tarik',
  'cendol',
  'asam pedas',
  'nasi kerabu',
  'sup kambing',
  'murtabak',
  'kuih lapis',
  'pisang goreng',
  'nasi dagang',
  'ikan bakar',
  'sambal udang'
];

// Function to get a random food from the array
const getRandomFood = () => {
  const randomIndex = Math.floor(Math.random() * FOOD_SEARCHES.length);
  return FOOD_SEARCHES[randomIndex];
};

// Main ping function
async function pingAPI() {
  const results = {
    health: false,
    search: false,
    categories: false,
    timestamp: new Date().toISOString(),
    searchedFood: '',
    totalResults: 0
  };

  // 1. Health check
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    if (healthResponse.ok) {
      results.health = true;
    }
  } catch (error) {
    console.error('Health check failed:', error);
  }

  // 2. Random food search
  try {
    const randomFood = getRandomFood();
    results.searchedFood = randomFood;

    const searchResponse = await fetch(
      `${API_BASE_URL}/foods/search?name=${encodeURIComponent(randomFood)}`
    );

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      results.search = true;
      results.totalResults = searchData.total || 0;
    }
  } catch (error) {
    console.error('Search failed:', error);
  }

  // 3. Categories check
  try {
    const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
    if (categoriesResponse.ok) {
      results.categories = true;
    }
  } catch (error) {
    console.error('Categories fetch failed:', error);
  }

  return results;
}

// GET handler for manual trigger
export async function GET(request: Request) {
  try {
    console.log('Keep-alive API route triggered at:', new Date().toISOString());

    const results = await pingAPI();

    return NextResponse.json({
      success: true,
      message: 'Keep-alive ping completed',
      apiUrl: API_BASE_URL,
      results: {
        healthCheck: results.health ? 'success' : 'failed',
        searchTest: results.search ? 'success' : 'failed',
        categoriesCheck: results.categories ? 'success' : 'failed',
        searchedFood: results.searchedFood,
        totalResults: results.totalResults
      },
      timestamp: results.timestamp,
      note: 'This endpoint helps keep the Render.com API active by making periodic requests'
    });
  } catch (error) {
    console.error('Keep-alive route error:', error);

    return NextResponse.json({
      success: false,
      error: 'Keep-alive ping failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// POST handler for Netlify scheduled function (if needed)
export async function POST(request: Request) {
  return GET(request);
}
