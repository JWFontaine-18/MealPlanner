import { AddFoodModal } from "@/components/AddFoodModal";
import { MealSection } from "@/components/FoodLog";
import { useFoodLog } from "@/hooks/useFoodLog";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logScreenStyles as styles } from '@/styles/screens/LogScreen';

export default function LogScreen() {
  const {
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
    getDayCalories,
  } = useFoodLog();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Food Log</Text>
          <Text style={styles.subtitle}>Track your daily meals</Text>
          <View>
            <Text style={styles.caloriesText}>
              Total Calories: {getDayCalories()}
            </Text>
          </View>
          <MealSection
            title="Breakfast"
            mealType="breakfast"
            foods={mealData.breakfast}
            onAddFood={openAddFoodModal}
            onRemoveFood={removeFood}
          />

          <MealSection
            title="Lunch"
            mealType="lunch"
            foods={mealData.lunch}
            onAddFood={openAddFoodModal}
            onRemoveFood={removeFood}
          />

          <MealSection
            title="Dinner"
            mealType="dinner"
            foods={mealData.dinner}
            onAddFood={openAddFoodModal}
            onRemoveFood={removeFood}
          />

          <MealSection
            title="Snacks"
            mealType="snacks"
            foods={mealData.snacks}
            onAddFood={openAddFoodModal}
            onRemoveFood={removeFood}
          />
        </View>
      </ScrollView>

      <AddFoodModal
        visible={modalVisible}
        selectedMeal={selectedMeal}
        formData={formData}
        onClose={closeModal}
        onSave={addFood}
        onSaveFromApi={addFoodFromApi}
        onUpdateFormData={updateFormData}
      />
    </SafeAreaView>
  );
}

