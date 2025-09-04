const API_KEY = 'TGOhcb2fhf6G8LVf9aFxmgS05h7MphFNgSRJkcQZ';
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

export async function searchFoods(query: string, limit: number = 20) {
  if (!query || query.trim().length < 2) return [];

  const searchUrl = `${BASE_URL}/foods/search?api_key=${API_KEY}&query=${encodeURIComponent(query)}&pageSize=${limit}`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error(`Search failed: ${response.status}`);
    const data = await response.json();
    return data.foods || [];
  } catch (error) {
    throw error;
  }
}

export function convertUsdaFood(usdaFood: any) {
  const nutrients = usdaFood.foodNutrients || [];
  const getNutrient = (nutrientNumber: string) => {
    const nutrient = nutrients.find((n: any) => n.nutrientNumber === nutrientNumber);
    return nutrient ? nutrient.value : 0;
  };

  return {
    id: usdaFood.fdcId.toString(),
    name: usdaFood.description || 'Unknown Food',
    brand: usdaFood.brandOwner || '',
    calories: Math.round(getNutrient('208')),
    protein: Math.round(getNutrient('203') * 10) / 10,
    carbs: Math.round(getNutrient('205') * 10) / 10,
    fat: Math.round(getNutrient('204') * 10) / 10,
    serving: 100,
  };
}