import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormData, MealType } from '@/types/food';

interface AddFoodModalProps {
  visible: boolean;
  selectedMeal: MealType;
  formData: FormData;
  onClose: () => void;
  onSave: () => void;
  onUpdateFormData: (field: keyof FormData, value: string) => void;
}

export function AddFoodModal({
  visible,
  selectedMeal,
  formData,
  onClose,
  onSave,
  onUpdateFormData,
}: AddFoodModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            Add to{" "}
            {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
          </Text>
          <TouchableOpacity onPress={onSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Food Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Chicken Breast, Apple"
              placeholderTextColor="#666666"
              value={formData.name}
              onChangeText={(text) => onUpdateFormData('name', text)}
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
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Serving Size *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., 1 Cup, 1 TBSP"
              placeholderTextColor="#666666"
              keyboardType="default"
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
            <Text style={styles.inputLabel}>Carbs (g)</Text>
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
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  cancelButton: {
    fontSize: 16,
    color: "#FF6B6B",
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00D4FF",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#FFFFFF",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00D4FF",
    marginTop: 20,
    marginBottom: 16,
  },
});