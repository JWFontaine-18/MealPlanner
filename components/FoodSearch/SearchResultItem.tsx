import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchResultItemStyles as styles } from '@/styles/components/SearchResultItem';

interface SearchResultItemProps {
  food: {
    id: string;
    name: string;
    brand: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    serving: number;
  };
  onSelect: () => void;
}

export function SearchResultItem({ food, onSelect }: SearchResultItemProps) {
  const formatServingInfo = () => {
    const servingText = food.serving ? `${food.serving}g` : '100g';
    return `${food.calories} cal per ${servingText} serving`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {food.name}
        </Text>
        <Text style={styles.secondLine} numberOfLines={1}>
          {food.brand ? `${food.brand} - ${formatServingInfo()}` : formatServingInfo()}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#666666" />
    </TouchableOpacity>
  );
}


