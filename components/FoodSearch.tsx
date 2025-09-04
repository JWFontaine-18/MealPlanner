import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchFoods, convertUsdaFood } from '@/services/foodApi';
import { SearchResultItem } from './SearchResultItem';
import { MealType } from '@/types/food';

interface FoodSearchProps {
  selectedMeal: MealType;
  onFoodSelected: (nutritionData: any, meal: MealType) => void;
  onFoodSelectedForCustomizing: (nutritionData: any) => void;
  onClose: () => void;
}

export function FoodSearch({ selectedMeal, onFoodSelected, onFoodSelectedForCustomizing }: FoodSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError('');

      try {
        const foods = await searchFoods(query, 25);
        const converted = foods
          .map(convertUsdaFood)
          .filter((food: any) => food.calories > 0)
          .sort((a: any, b: any) => a.name.split(' ').length - b.name.split(' ').length);
        setResults(converted);
      } catch (err) {
        setError('Search failed. Try again.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleFoodSelect = (food: any) => {
    onFoodSelectedForCustomizing({
      name: food.name,
      brand: food.brand,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      serving: food.serving,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666666" />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder={`Search for foods to add to ${selectedMeal}...`}
          placeholderTextColor="#666666"
          autoFocus={true}
        />
      </View>

      <View style={styles.content}>
        {isLoading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#00D4FF" />
          </View>
        )}

        {error && (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!isLoading && !error && results.length > 0 && (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SearchResultItem
                food={item}
                onSelect={() => handleFoodSelect(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        {!isLoading && !error && results.length === 0 && query.length >= 2 && (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No foods found for "{query}"</Text>
          </View>
        )}

        {query.length < 2 && (
          <View style={styles.centerContainer}>
            <Ionicons name="restaurant" size={48} color="#666666" />
            <Text style={styles.emptyText}>Search for Foods</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
});