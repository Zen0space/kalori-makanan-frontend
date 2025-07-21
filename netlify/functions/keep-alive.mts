import type { Config } from "@netlify/functions";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://kalori-makanan-kkm.onrender.com";

// Array of Malaysian and international foods to randomly search
const FOOD_SEARCHES = [
  "nasi lemak",
  "rendang",
  "ayam goreng",
  "char kuey teow",
  "roti canai",
  "satay",
  "laksa",
  "nasi goreng",
  "mee goreng",
  "teh tarik",
  "cendol",
  "asam pedas",
  "nasi kerabu",
  "sup kambing",
  "murtabak",
  "kuih lapis",
  "pisang goreng",
  "nasi dagang",
  "ikan bakar",
  "sambal udang",
];

// Function to get a random food from the array
const getRandomFood = (): string => {
  const randomIndex = Math.floor(Math.random() * FOOD_SEARCHES.length);
  return FOOD_SEARCHES[randomIndex];
};

// Function to make API calls
const pingAPI = async () => {
  const results = {
    health: false,
    search: false,
    categories: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // 1. Call health endpoint
    console.log("Checking API health...");
    const healthResponse = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        "User-Agent": "Netlify-KeepAlive-Scheduled/1.0",
      },
    });

    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      results.health = true;
      console.log("Health check successful:", healthData);
    } else {
      console.log("Health check failed with status:", healthResponse.status);
    }
  } catch (error) {
    console.error("Health check failed:", error);
  }

  try {
    // 2. Make a random food search
    const randomFood = getRandomFood();
    console.log(`Searching for: ${randomFood}`);

    const searchResponse = await fetch(
      `${API_BASE_URL}/foods/search?name=${encodeURIComponent(randomFood)}`,
      {
        method: "GET",
        headers: {
          "User-Agent": "Netlify-KeepAlive-Scheduled/1.0",
        },
      }
    );

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      results.search = true;
      console.log(`Found ${searchData.total || 0} results for "${randomFood}"`);

      // Log first result if available
      if (searchData.foods && searchData.foods.length > 0) {
        console.log(
          `First result: ${searchData.foods[0].name} - ${searchData.foods[0].calories_kcal} kcal`
        );
      }
    } else {
      console.log("Search failed with status:", searchResponse.status);
    }
  } catch (error) {
    console.error("Search failed:", error);
  }

  try {
    // 3. Call categories endpoint to ensure more activity
    console.log("Checking categories endpoint...");
    const categoriesResponse = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "User-Agent": "Netlify-KeepAlive-Scheduled/1.0",
      },
    });

    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      results.categories = true;
      console.log(
        `Categories endpoint active: ${categories.length || 0} categories found`
      );
    } else {
      console.log("Categories check failed with status:", categoriesResponse.status);
    }
  } catch (error) {
    console.error("Categories fetch failed:", error);
  }

  return results;
};

export default async () => {
  console.log("=== Scheduled Keep-Alive Function Triggered ===");
  console.log("Time:", new Date().toISOString());
  console.log("API URL:", API_BASE_URL);

  try {
    const results = await pingAPI();

    const response = {
      message: "Scheduled keep-alive ping completed",
      timestamp: results.timestamp,
      apiUrl: API_BASE_URL,
      results: {
        healthCheck: results.health ? "success" : "failed",
        searchTest: results.search ? "success" : "failed",
        categoriesCheck: results.categories ? "success" : "failed",
      },
      summary: {
        totalChecks: 3,
        successfulChecks: [results.health, results.search, results.categories].filter(Boolean).length,
      },
      nextRun: "in 14 minutes",
      note: "This scheduled function prevents API hibernation on free hosting services",
    };

    console.log("=== Scheduled Keep-Alive Complete ===");
    console.log(JSON.stringify(response, null, 2));

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Scheduled keep-alive function error:", error);

    const errorResponse = {
      error: "Scheduled keep-alive function failed",
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
      apiUrl: API_BASE_URL,
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// Schedule configuration - runs every 14 minutes
export const config: Config = {
  schedule: "*/14 * * * *",
};
