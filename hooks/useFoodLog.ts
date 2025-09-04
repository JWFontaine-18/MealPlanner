import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { MealData, MealType, FoodItem, FormData } from '@/types/food';

export function useFoodLog() {
  const [mealData, setMealData] = useState<MealData>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>("breakfast");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    calories: "",
    serving: "",
    protein: "",
    carbs: "",
    fat: "",
    brand: "",
  });
  const clearFormData = useCallback(() => {
    setFormData({
      name: "",
      calories: "",
      serving: "",
      protein: "",
      carbs: "",
      fat: "",
      brand: "",
    });
  }, []);

  const openAddFoodModal = useCallback((mealType: MealType) => {
    setSelectedMeal(mealType);
    setModalVisible(true);
    clearFormData();
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    clearFormData();
  }, []);

  const addFood = useCallback(() => {
    if (!formData.name || !formData.calories) {
      Alert.alert("Missing Information", "Please enter at least a food name and calories");
      return;
    }

    const calories = parseInt(formData.calories);
    if (isNaN(calories) || calories < 0 || calories > 10000) {
      Alert.alert("Invalid Calories", "Please enter a valid calorie amount (0-10000)");
      return;
    }

    try {
      const newFood: FoodItem = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        calories: calories,
        serving: parseFloat(formData.serving) || 100,
        protein: parseFloat(formData.protein) || 0,
        carbs: parseFloat(formData.carbs) || 0,
        fat: parseFloat(formData.fat) || 0,
        brand: formData.brand.trim(),
      };

      setMealData((prevData) => ({
        ...prevData,
        [selectedMeal]: [...prevData[selectedMeal], newFood],
      }));

      closeModal();
    } catch (error) {
      Alert.alert("Error", "Failed to add food. Please try again.");
    }
  }, [formData, selectedMeal, closeModal]);

  const addFoodFromApi = useCallback((nutritionData: any, mealType: MealType) => {
    try {
      const newFood: FoodItem = {
        id: `api_${Date.now()}`,
        name: nutritionData.name,
        calories: nutritionData.calories,
        serving: nutritionData.serving || 100,
        protein: nutritionData.protein,
        carbs: nutritionData.carbs,
        fat: nutritionData.fat,
        brand: nutritionData.brand,
      };

      setMealData((prevData) => ({
        ...prevData,
        [mealType]: [...prevData[mealType], newFood],
      }));
    } catch (error) {
      Alert.alert("Error", "Failed to add food from search results. Please try manual entry.");
    }
  }, []);

  const removeFood = useCallback((mealType: MealType, foodId: string) => {
    const foodItem = mealData[mealType].find(food => food.id === foodId);
    const foodName = foodItem?.name || "this food";

    Alert.alert(
      "Remove Food", 
      `Are you sure you want to remove "${foodName}" from ${mealType}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setMealData((prevData) => ({
              ...prevData,
              [mealType]: prevData[mealType].filter((food) => food.id !== foodId),
            }));
          },
        },
      ]
    );
  }, [mealData]);

  const updateFormData = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      [field]: value 
    }));
  }, []);

  const getMealCalories = useCallback((mealType: MealType): number => {
    return mealData[mealType].reduce((total, food) => total + food.calories, 0);
  }, [mealData]);

  const getDayCalories = useCallback((): number => {
    return Object.values(mealData).flat().reduce((total, food) => total + food.calories, 0);
  }, [mealData]);

  const getMealNutrition = useCallback((mealType: MealType) => {
    const foods = mealData[mealType];
    return foods.reduce(
      (totals, food) => ({
        calories: totals.calories + food.calories,
        protein: totals.protein + food.protein,
        carbs: totals.carbs + food.carbs,
        fat: totals.fat + food.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [mealData]);

  const getDayNutrition = useCallback(() => {
    const allFoods = Object.values(mealData).flat();
    return allFoods.reduce(
      (totals, food) => ({
        calories: totals.calories + food.calories,
        protein: totals.protein + food.protein,
        carbs: totals.carbs + food.carbs,
        fat: totals.fat + food.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [mealData]);

  return {
    mealData,
    modalVisible,
    selectedMeal,
    formData,
    openAddFoodModal,
    closeModal,
    addFood,
    addFoodFromApi,
    removeFood,
    updateFormData,
    clearFormData,
    getMealCalories,
    getDayCalories,
    getMealNutrition,
    getDayNutrition,
  };
}

export type FoodLogHook = ReturnType<typeof useFoodLog>;