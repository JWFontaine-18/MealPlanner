export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  serving: number;
  protein: number;
  carbs: number;
  fat: number;
  brand?: string;
}

export interface MealData {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snacks: FoodItem[];
}

export type MealType = keyof MealData;

export interface FormData {
  name: string;
  calories: string;
  serving: string;
  protein: string;
  carbs: string;
  fat: string;
  brand: string;
}