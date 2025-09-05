import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FoodItem as FoodItemType, MealType } from '@/types/food';
import { FoodItem } from './FoodItem';
import { mealSectionStyles as styles } from '@/styles/components/MealSection';

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

