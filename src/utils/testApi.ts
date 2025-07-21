// API Test Utility
// Use this script to verify your API configuration and connectivity

import {
  getHealthStatus,
  searchFoods,
  getCategories,
  isApiConfigured,
  getApiStatus
} from '../lib/api';

interface TestResult {
  name: string;
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

/**
 * Run all API tests to verify configuration and connectivity
 */
export const runApiTests = async (): Promise<TestResult[]> => {
  const results: TestResult[] = [];

  console.log('🚀 Starting API Tests...\n');

  // Test 1: Check API Configuration
  console.log('1️⃣ Testing API Configuration...');
  try {
    const apiStatus = getApiStatus();
    const isConfigured = isApiConfigured();

    results.push({
      name: 'API Configuration',
      success: isConfigured,
      message: isConfigured
        ? `API configured correctly (${apiStatus.apiKeyPrefix})`
        : 'API key not configured',
      data: apiStatus
    });

    console.log(isConfigured ? '✅ PASS' : '❌ FAIL', isConfigured ? 'API key configured' : 'API key missing');
  } catch (error) {
    results.push({
      name: 'API Configuration',
      success: false,
      message: 'Failed to check API configuration',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    console.log('❌ FAIL - Configuration check failed');
  }

  // Test 2: Health Check
  console.log('\n2️⃣ Testing API Health...');
  try {
    const health = await getHealthStatus();
    const isHealthy = health.status === 'healthy';

    results.push({
      name: 'Health Check',
      success: isHealthy,
      message: `API health: ${health.status}`,
      data: health
    });

    console.log(isHealthy ? '✅ PASS' : '❌ FAIL', `API status: ${health.status}`);
  } catch (error) {
    results.push({
      name: 'Health Check',
      success: false,
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    console.log('❌ FAIL - Health check failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  // Test 3: Categories Endpoint
  console.log('\n3️⃣ Testing Categories Endpoint...');
  try {
    const categories = await getCategories();
    const hasCategories = Array.isArray(categories) && categories.length > 0;

    results.push({
      name: 'Categories Endpoint',
      success: hasCategories,
      message: hasCategories
        ? `Found ${categories.length} categories`
        : 'No categories returned',
      data: { count: categories.length, sample: categories.slice(0, 3) }
    });

    console.log(hasCategories ? '✅ PASS' : '❌ FAIL',
      hasCategories ? `${categories.length} categories loaded` : 'No categories found');
  } catch (error) {
    results.push({
      name: 'Categories Endpoint',
      success: false,
      message: 'Categories request failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    console.log('❌ FAIL - Categories request failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  // Test 4: Search Functionality
  console.log('\n4️⃣ Testing Search Functionality...');
  try {
    const searchResult = await searchFoods('nasi');
    const hasResults = searchResult.foods && searchResult.foods.length > 0;

    results.push({
      name: 'Search Functionality',
      success: hasResults,
      message: hasResults
        ? `Search returned ${searchResult.total} results`
        : 'Search returned no results',
      data: {
        total: searchResult.total,
        returned: searchResult.foods.length,
        sample: searchResult.foods.slice(0, 2)
      }
    });

    console.log(hasResults ? '✅ PASS' : '⚠️ WARN',
      hasResults ? `Search found ${searchResult.total} results` : 'Search returned no results (might be expected)');
  } catch (error) {
    results.push({
      name: 'Search Functionality',
      success: false,
      message: 'Search request failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    console.log('❌ FAIL - Search request failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  // Summary
  const passedTests = results.filter(r => r.success).length;
  const totalTests = results.length;

  console.log('\n📊 Test Summary:');
  console.log(`${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Your API is ready to use.');
  } else {
    console.log('⚠️ Some tests failed. Check the results above for troubleshooting.');
  }

  return results;
};

/**
 * Quick test to verify basic API connectivity
 */
export const quickTest = async (): Promise<boolean> => {
  try {
    console.log('🔍 Running quick API test...');

    if (!isApiConfigured()) {
      console.log('❌ API key not configured');
      return false;
    }

    const health = await getHealthStatus();
    if (health.status !== 'healthy') {
      console.log('❌ API not healthy');
      return false;
    }

    console.log('✅ Quick test passed!');
    return true;
  } catch (error) {
    console.log('❌ Quick test failed:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
};

/**
 * Test a specific search term
 */
export const testSearch = async (searchTerm: string): Promise<void> => {
  try {
    console.log(`🔍 Testing search for: "${searchTerm}"`);

    const result = await searchFoods(searchTerm);

    console.log(`📊 Results: ${result.total} total, ${result.foods.length} returned`);

    if (result.foods.length > 0) {
      console.log('📝 Sample results:');
      result.foods.slice(0, 3).forEach((food, index) => {
        console.log(`  ${index + 1}. ${food.name} - ${food.calories_kcal || 'N/A'} kcal`);
      });
    } else {
      console.log('No results found for this search term.');
    }
  } catch (error) {
    console.log('❌ Search test failed:', error instanceof Error ? error.message : 'Unknown error');
  }
};

/**
 * Generate API troubleshooting report
 */
export const generateTroubleshootingReport = (): void => {
  console.log('\n🔧 API Troubleshooting Report:');
  console.log('================================');

  const apiStatus = getApiStatus();

  console.log(`Base URL: ${apiStatus.baseUrl}`);
  console.log(`API Key Set: ${apiStatus.hasApiKey ? 'Yes' : 'No'}`);
  if (apiStatus.hasApiKey) {
    console.log(`API Key Preview: ${apiStatus.apiKeyPrefix}`);
  }

  console.log('\nEnvironment Variables:');
  console.log(`- VITE_KALORI_MAKANAN_BASE_URL: ${import.meta.env.VITE_KALORI_MAKANAN_BASE_URL || 'Not set'}`);
  console.log(`- VITE_KALORI_MAKANAN_API_KEY: ${import.meta.env.VITE_KALORI_MAKANAN_API_KEY ? 'Set (hidden)' : 'Not set'}`);

  if (!apiStatus.hasApiKey) {
    console.log('\n💡 Troubleshooting Tips:');
    console.log('1. Create a .env file in your project root');
    console.log('2. Add: VITE_KALORI_MAKANAN_API_KEY=your_actual_api_key');
    console.log('3. Restart your development server');
    console.log('4. Contact the API provider if you need an API key');
  }
};

// Development helper: Make functions available in browser console
if (typeof window !== 'undefined') {
  (window as any).apiTests = {
    runAll: runApiTests,
    quick: quickTest,
    search: testSearch,
    troubleshoot: generateTroubleshootingReport
  };

  console.log('🛠️ API test utilities available in console:');
  console.log('- apiTests.runAll() - Run all tests');
  console.log('- apiTests.quick() - Quick connectivity test');
  console.log('- apiTests.search("term") - Test specific search');
  console.log('- apiTests.troubleshoot() - Generate troubleshooting report');
}
