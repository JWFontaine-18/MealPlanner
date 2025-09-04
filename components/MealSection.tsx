import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodItem as FoodItemType, MealType } from '@/types/food';
import { FoodItem } from './FoodItem';

interface MealSectionProps {
  title: string;
  mealType: MealType;
  foods: FoodItemType[];
  onAddFood: (mealType: MealType) => void;
  onRemoveFood: (mealType: MealType, foodId: string) => void;
}

export function MealSection({ title, mealType, foods, onAddFood, onRemoveFood }: MealSectionProps) {
  const totalCalories = foods.reduce((acc, food) => acc + food.calories, 0);
  return (
    <View style={styles.mealSection}>
      <View style={styles.mealHeader}>
        <View style={styles.mealTitleContainer}>
          <Text style={styles.mealTitle}>{title}</Text>
          <Text style={styles.caloriesText}>{totalCalories} cal</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAddFood(mealType)}
        >
          <Ionicons name="add" size={20} color="#00D4FF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.foodList}>
        {foods.length === 0 ? (
          <Text style={styles.emptyText}>No foods logged yet</Text>
        ) : (
          foods.map((food) => (
            <FoodItem
              key={food.id}
              food={food}
              onPress={() => onRemoveFood(mealType, food.id)}
            />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealSection: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mealTitleContainer: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  caloriesText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#00D4FF",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#00D4FF20",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  foodList: {
    minHeight: 40,
  },
  emptyText: {
    color: "#666666",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 12,
  },
});