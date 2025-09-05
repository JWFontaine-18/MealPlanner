import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FoodItem as FoodItemType } from '@/types/food';
import { foodItemStyles as styles } from '@/styles/components/FoodItem';

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

