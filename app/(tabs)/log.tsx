import { AddFoodModal } from "@/components/AddFoodModal";
import { MealSection } from "@/components/MealSection";
import { useFoodLog } from "@/hooks/useFoodLog";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  } = useFoodLog();

  const totalCalories = mealData.breakfast.reduce((acc, food) => acc + food.calories, 0) +
    mealData.lunch.reduce((acc, food) => acc + food.calories, 0) +
    mealData.dinner.reduce((acc, food) => acc + food.calories, 0) +
    mealData.snacks.reduce((acc, food) => acc + food.calories, 0);

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
              Total Calories: {totalCalories}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    fontWeight: "400",
    marginBottom: 30,
    textAlign: "center",
  },
  caloriesText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  }
});
