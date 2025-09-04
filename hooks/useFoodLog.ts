import { useState } from 'react';
import { Alert } from 'react-native';
import { MealData, MealType, FoodItem, FormData } from '@/types/food';

export function useFoodLog() {
  const [mealData, setMealData] = useState<MealData>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>("lunch");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    calories: "",
    serving: "",
    protein: "",
    carbs: "",
    fat: "",
    brand: "",
  });

  const openAddFoodModal = (mealType: MealType) => {
    setSelectedMeal(mealType);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      name: "",
      calories: "",
      serving: "",
      protein: "",
      carbs: "",
      fat: "",
      brand: "",
    });
  };

  const addFood = () => {
    if (!formData.name || !formData.calories) {
      Alert.alert("Error", "Please enter food name and calories");
      return;
    }

    const newFood: FoodItem = {
      id: Date.now().toString(),
      name: formData.name,
      calories: parseInt(formData.calories) || 0,
      serving: parseInt(formData.serving) || 0,
      protein: parseFloat(formData.protein) || 0,
      carbs: parseFloat(formData.carbs) || 0,
      fat: parseFloat(formData.fat) || 0,
      brand: formData.brand,
    };

    setMealData((prevData) => ({
      ...prevData,
      [selectedMeal]: [...prevData[selectedMeal], newFood],
    }));

    closeModal();
  };

  const removeFood = (mealType: MealType, foodId: string) => {
    Alert.alert("Remove Food", "Are you sure you want to remove this food?", [
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
    ]);
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    mealData,
    modalVisible,
    selectedMeal,
    formData,
    openAddFoodModal,
    closeModal,
    addFood,
    removeFood,
    updateFormData,
  };
}