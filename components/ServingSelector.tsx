import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ServingSelectorProps {
  foodName: string;
  brand?: string;
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFat: number;
  baseServing: number;
  householdServing?: string;
  servingSize?: number;
  servingSizeUnit?: string;
  onServingChange: (multiplier: number) => void;
}

const DEFAULT_UNITS = [
  { label: 'g', multiplier: 1, step: 25 },
  { label: 'oz', multiplier: 28.35, step: 1 },
  { label: 'cup', multiplier: 240, step: 0.25 },
  { label: 'tbsp', multiplier: 15, step: 1 },
];

// Common serving patterns with their typical weights
const SERVING_PATTERNS = [
  { pattern: /\begg\b/i, unit: 'egg', weight: 50 },
  { pattern: /\bbanana\b/i, unit: 'banana', weight: 120 },
  { pattern: /\bapple\b/i, unit: 'apple', weight: 180 },
  { pattern: /\borange\b/i, unit: 'orange', weight: 150 },
  { pattern: /\bslice\b|\bbread\b/i, unit: 'slice', weight: 25 },
  { pattern: /\bbreast\b|\bchicken breast\b/i, unit: 'breast', weight: 170 },
  { pattern: /\bpotato\b/i, unit: 'potato', weight: 150 },
  { pattern: /\bcarrot\b/i, unit: 'carrot', weight: 60 },
  { pattern: /\btomato\b/i, unit: 'tomato', weight: 120 },
  { pattern: /\bpeach\b/i, unit: 'peach', weight: 150 },
  { pattern: /\bpear\b/i, unit: 'pear', weight: 180 },
  { pattern: /\bstrawberry\b/i, unit: 'strawberry', weight: 12 },
  { pattern: /\bgrape\b/i, unit: 'grape', weight: 5 },
  { pattern: /\bmuffin\b/i, unit: 'muffin', weight: 60 },
  { pattern: /\bcookie\b/i, unit: 'cookie', weight: 20 },
];

function getContextualServingUnits(foodName: string, householdServing?: string, servingSize?: number, servingSizeUnit?: string) {
  const units = [...DEFAULT_UNITS];
  
  // First priority: Use USDA's own household serving if available
  if (householdServing && servingSize && servingSizeUnit) {
    let multiplier = servingSize;
    if (servingSizeUnit !== 'GRM') {
      multiplier = servingSize * 28.35; // Convert oz to grams
    }
    
    units.unshift({
      label: householdServing.toLowerCase().replace(/^\d+\s*/, ''), // Remove leading numbers
      multiplier,
      step: 1,
    });
  } else {
    // Second priority: Pattern matching for common foods
    for (const pattern of SERVING_PATTERNS) {
      if (pattern.pattern.test(foodName)) {
        units.unshift({
          label: pattern.unit,
          multiplier: pattern.weight,
          step: 1,
        });
        break; // Use first match only
      }
    }
  }
  
  return units;
}

export function ServingSelector({
  foodName,
  brand,
  baseCalories,
  baseProtein,
  baseCarbs,
  baseFat,
  baseServing,
  householdServing,
  servingSize,
  servingSizeUnit,
  onServingChange,
}: ServingSelectorProps) {
  const servingUnits = getContextualServingUnits(foodName, householdServing, servingSize, servingSizeUnit);
  const [selectedUnit, setSelectedUnit] = useState(servingUnits[0]);
  const [amount, setAmount] = useState(1);

  const multiplier = (amount * selectedUnit.multiplier) / baseServing;
  
  const calculatedCalories = Math.round(baseCalories * multiplier);
  const calculatedProtein = Math.round(baseProtein * multiplier * 10) / 10;
  const calculatedCarbs = Math.round(baseCarbs * multiplier * 10) / 10;
  const calculatedFat = Math.round(baseFat * multiplier * 10) / 10;

  React.useEffect(() => {
    onServingChange(multiplier);
  }, [multiplier, onServingChange]);

  const adjustAmount = (delta: number) => {
    const newAmount = Math.max(0.1, amount + delta);
    setAmount(Math.round(newAmount * 100) / 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{foodName}</Text>
        {brand && <Text style={styles.brandName}>{brand}</Text>}
      </View>

      <View style={styles.servingContainer}>
        <Text style={styles.sectionLabel}>Serving Size</Text>
        
        <View style={styles.amountContainer}>
          <TouchableOpacity style={styles.adjustButton} onPress={() => adjustAmount(-selectedUnit.step)}>
            <Ionicons name="remove" size={20} color="#00D4FF" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.amountInput}
            value={amount.toString()}
            onChangeText={(text) => {
              const num = parseFloat(text) || 0;
              setAmount(num);
            }}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={styles.adjustButton} onPress={() => adjustAmount(selectedUnit.step)}>
            <Ionicons name="add" size={20} color="#00D4FF" />
          </TouchableOpacity>
        </View>

        <View style={styles.unitSelector}>
          {servingUnits.map((unit) => (
            <TouchableOpacity
              key={unit.label}
              style={[
                styles.unitButton,
                selectedUnit.label === unit.label && styles.selectedUnitButton,
              ]}
              onPress={() => setSelectedUnit(unit)}
            >
              <Text style={[
                styles.unitText,
                selectedUnit.label === unit.label && styles.selectedUnitText,
              ]}>
                {unit.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.nutritionContainer}>
        <Text style={styles.sectionLabel}>Nutrition Facts</Text>
        <View style={styles.nutritionGrid}>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{calculatedCalories}</Text>
            <Text style={styles.nutritionLabel}>Calories</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{calculatedProtein}g</Text>
            <Text style={styles.nutritionLabel}>Protein</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{calculatedCarbs}g</Text>
            <Text style={styles.nutritionLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionValue}>{calculatedFat}g</Text>
            <Text style={styles.nutritionLabel}>Fat</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  foodInfo: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  foodName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  brandName: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  servingContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  adjustButton: {
    backgroundColor: '#00D4FF20',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    minWidth: 80,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  unitSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    minWidth: 60,
    alignItems: 'center',
  },
  selectedUnitButton: {
    backgroundColor: '#00D4FF20',
    borderWidth: 1,
    borderColor: '#00D4FF',
  },
  unitText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedUnitText: {
    color: '#00D4FF',
  },
  nutritionContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    color: '#00D4FF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  nutritionLabel: {
    color: '#CCCCCC',
    fontSize: 12,
  },
});