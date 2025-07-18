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
const getRandomFood = () => {
  const randomIndex = Math.floor(Math.random() * FOOD_SEARCHES.length);
  return FOOD_SEARCHES[randomIndex];
};

// Function to make API calls
const pingAPI = async () => {
  const results = {
    health: false,
    search: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // 1. Call health endpoint
    console.log("Checking API health...");
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      results.health = true;
      console.log("Health check successful:", healthData);
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
    );

    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      results.search = true;
      console.log(`Found ${searchData.total} results for "${randomFood}"`);

      // Log first result if available
      if (searchData.foods && searchData.foods.length > 0) {
        console.log(
          `First result: ${searchData.foods[0].name} - ${searchData.foods[0].calories_kcal} kcal`,
        );
      }
    }
  } catch (error) {
    console.error("Search failed:", error);
  }

  // 3. Optionally call another endpoint to ensure activity
  try {
    const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      console.log(
        `Categories endpoint active: ${categories.length} categories found`,
      );
    }
  } catch (error) {
    console.error("Categories fetch failed:", error);
  }

  return results;
};

export default async (req: Request) => {
  console.log("=== Keep-Alive Function Triggered ===");
  console.log("Time:", new Date().toISOString());
  console.log("API URL:", API_BASE_URL);

  try {
    const results = await pingAPI();

    const response = {
      message: "Keep-alive ping completed",
      timestamp: results.timestamp,
      results: {
        healthCheck: results.health ? "success" : "failed",
        searchTest: results.search ? "success" : "failed",
      },
      nextRun: "in 14 minutes",
    };

    console.log("=== Keep-Alive Complete ===");
    console.log(JSON.stringify(response, null, 2));

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Keep-alive function error:", error);

    return new Response(
      JSON.stringify({
        error: "Keep-alive function failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

// Schedule configuration - runs every 14 minutes
export const config: Config = {
  schedule: "*/14 * * * *",
};
