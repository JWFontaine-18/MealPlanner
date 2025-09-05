import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { FormData } from '@/types/food';
import { addFoodModalStyles as styles } from '@/styles/components/AddFoodModal';

interface ManualFoodFormProps {
  formData: FormData;
  onUpdateFormData: (field: keyof FormData, value: string) => void;
}

export function ManualFoodForm({ formData, onUpdateFormData }: ManualFoodFormProps) {
  return (
    <ScrollView style={styles.formContent}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Food Name *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Chicken Breast, Apple"
          placeholderTextColor="#666666"
          value={formData.name}
          onChangeText={(text) => onUpdateFormData('name', text)}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Brand (Optional)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., Organic Valley, Kraft"
          placeholderTextColor="#666666"
          value={formData.brand}
          onChangeText={(text) => onUpdateFormData('brand', text)}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Serving Size *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., 1 cup, 100g, 1 piece"
          placeholderTextColor="#666666"
          value={formData.serving}
          onChangeText={(text) => onUpdateFormData('serving', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Calories *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., 150"
          placeholderTextColor="#666666"
          keyboardType="numeric"
          value={formData.calories}
          onChangeText={(text) => onUpdateFormData('calories', text)}
        />
      </View>

      <Text style={styles.sectionHeader}>Macronutrients (Optional)</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Protein (g)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., 25"
          placeholderTextColor="#666666"
          keyboardType="numeric"
          value={formData.protein}
          onChangeText={(text) => onUpdateFormData('protein', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Carbohydrates (g)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., 30"
          placeholderTextColor="#666666"
          keyboardType="numeric"
          value={formData.carbs}
          onChangeText={(text) => onUpdateFormData('carbs', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Fat (g)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., 10"
          placeholderTextColor="#666666"
          keyboardType="numeric"
          value={formData.fat}
          onChangeText={(text) => onUpdateFormData('fat', text)}
        />
      </View>
    </ScrollView>
  );
}