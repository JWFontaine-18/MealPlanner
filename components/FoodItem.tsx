import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FoodItem as FoodItemType } from '@/types/food';

interface FoodItemProps {
  food: FoodItemType;
  onPress: () => void;
}

export function FoodItem({ food, onPress }: FoodItemProps) {
  return (
    <TouchableOpacity style={styles.foodItem} onPress={onPress}>
      <View style={styles.foodItemContent}>
        <View style={styles.foodMainInfo}>
          <Text style={styles.foodName}>{food.name}</Text>
          {food.brand && ( // only show brand if it exists
            <Text style={styles.foodBrand}>{food.brand}</Text>
          )}
        </View>
        <View style={styles.foodNutrition}>
          <Text style={styles.foodCalories}>
            {food.calories} cal
          </Text>
          <Text style={styles.foodMacros}>
            P:{food.protein}g C:{food.carbs}g F:{food.fat}g
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  foodItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodMainInfo: {
    flex: 1,
  },
  foodName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  foodBrand: {
    color: "#AAAAAA",
    fontSize: 14,
    fontStyle: "italic",
  },
  foodNutrition: {
    alignItems: "flex-end",
  },
  foodCalories: {
    color: "#00D4FF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  foodMacros: {
    color: "#CCCCCC",
    fontSize: 12,
  },
});