import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  secondLine: {
    color: '#999999',
    fontSize: 13,
    marginTop: 2,
  },
});

