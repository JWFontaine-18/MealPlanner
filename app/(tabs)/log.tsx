import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// TypeScript interface to define the shape of a food item
interface FoodItem {
  id: string;
  name: string;
  calories: number;
  serving: number;
  protein: number;
  carbs: number;
  fat: number;
  brand?: string;
}

// TypeScript interface for our meal data structure
interface MealData {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snacks: FoodItem[];
}

export default function LogScreen() {
  // useState Hook Explanation:
  // This is React's way of managing component state (data that can change)
  // useState returns an array with 2 elements: [currentValue, setterFunction]
  // When we call setMealData, React will re-render the component with new data
  const [mealData, setMealData] = useState<MealData>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });

  // Modal state - controls whether the add food modal is visible
  const [modalVisible, setModalVisible] = useState(false);

  // Track which meal we're adding food to
  const [selectedMeal, setSelectedMeal] = useState<keyof MealData>("breakfast");

  // Form state - tracks what the user types in the form
  const [formData, setFormData] = useState({
    name: "",
    calories: "",
    serving: "",
    protein: "",
    carbs: "",
    fat: "",
    brand: "",
  });

  // Function to open the modal for a specific meal
  const openAddFoodModal = (mealType: keyof MealData) => {
    setSelectedMeal(mealType); // Remember which meal we're adding to
    setModalVisible(true); // Show the modal
  };

  // Function to close modal and reset form
  const closeModal = () => {
    setModalVisible(false);
    // Reset form data when closing
    setFormData({
      name: "",
      calories: "",
      serving: "",
      protein: "",
      carbs: "",
      fat: "",
      brand: "",
    });
  };

  // Function to add food to the selected meal
  const addFood = () => {
    // Validation: make sure required fields are filled
    if (!formData.name || !formData.calories) {
      Alert.alert("Error", "Please enter food name and calories");
      return;
    }

    // Create new food item
    const newFood: FoodItem = {
      id: Date.now().toString(), // Simple ID generation using timestamp
      name: formData.name,
      calories: parseInt(formData.calories) || 0,
      serving: parseInt(formData.serving) || 0,
      protein: parseFloat(formData.protein) || 0,
      carbs: parseFloat(formData.carbs) || 0,
      fat: parseFloat(formData.fat) || 0,
      brand: formData.brand,
    };

    // Update the meal data using spread operator (React best practice)
    setMealData((prevData) => ({
      ...prevData, // Keep all existing meals
      [selectedMeal]: [...prevData[selectedMeal], newFood], // Add new food to selected meal
    }));

    closeModal(); // Close modal after adding food
  };

  // Function to remove food from a meal
  const removeFood = (mealType: keyof MealData, foodId: string) => {
    Alert.alert("Remove Food", "Are you sure you want to remove this food?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setMealData((prevData) => ({
            ...prevData,
            [mealType]: prevData[mealType].filter((food) => food.id !== foodId),
          }));
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView allows content to scroll when it exceeds screen height */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Food Log</Text>
          <Text style={styles.subtitle}>Track your daily meals</Text>

          {/* Breakfast Section */}
          <View style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>Breakfast</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => openAddFoodModal("breakfast")}
              >
                <Ionicons name="add" size={20} color="#00D4FF" />
              </TouchableOpacity>
            </View>
            {/* Food items will be displayed here */}
            <View style={styles.foodList}>
              {mealData.breakfast.length === 0 ? (
                <Text style={styles.emptyText}>No foods logged yet</Text>
              ) : (
                mealData.breakfast.map((food) => (
                  <TouchableOpacity
                    key={food.id}
                    style={styles.foodItem}
                    onPress={() => removeFood("breakfast", food.id)}
                  >
                    <View style={styles.foodItemContent}>
                      <View style={styles.foodMainInfo}>
                        <Text style={styles.foodName}>{food.name}</Text>
                        {food.brand && (
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
                ))
              )}
            </View>
          </View>

          {/* Lunch Section */}
          <View style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>Lunch</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => openAddFoodModal("lunch")}
              >
                <Ionicons name="add" size={20} color="#00D4FF" />
              </TouchableOpacity>
            </View>
            <View style={styles.foodList}>
              {mealData.lunch.length === 0 ? (
                <Text style={styles.emptyText}>No foods logged yet</Text>
              ) : (
                mealData.lunch.map((food) => (
                  <TouchableOpacity
                    key={food.id}
                    style={styles.foodItem}
                    onPress={() => removeFood("lunch", food.id)}
                  >
                    <View style={styles.foodItemContent}>
                      <View style={styles.foodMainInfo}>
                        <Text style={styles.foodName}>{food.name}</Text>
                        {food.brand && (
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
                ))
              )}
            </View>
          </View>

          {/* Dinner Section */}
          <View style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>Dinner</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => openAddFoodModal("dinner")}
              >
                <Ionicons name="add" size={20} color="#00D4FF" />
              </TouchableOpacity>
            </View>
            <View style={styles.foodList}>
              {mealData.dinner.length === 0 ? (
                <Text style={styles.emptyText}>No foods logged yet</Text>
              ) : (
                mealData.dinner.map((food) => (
                  <TouchableOpacity
                    key={food.id}
                    style={styles.foodItem}
                    onPress={() => removeFood("dinner", food.id)}
                  >
                    <View style={styles.foodItemContent}>
                      <View style={styles.foodMainInfo}>
                        <Text style={styles.foodName}>{food.name}</Text>
                        {food.brand && (
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
                ))
              )}
            </View>
          </View>

          {/* Snacks Section */}
          <View style={styles.mealSection}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealTitle}>Snacks</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => openAddFoodModal("snacks")}
              >
                <Ionicons name="add" size={20} color="#00D4FF" />
              </TouchableOpacity>
            </View>
            <View style={styles.foodList}>
              {mealData.snacks.length === 0 ? (
                <Text style={styles.emptyText}>No foods logged yet</Text>
              ) : (
                mealData.snacks.map((food) => (
                  <TouchableOpacity
                    key={food.id}
                    style={styles.foodItem}
                    onPress={() => removeFood("snacks", food.id)}
                  >
                    <View style={styles.foodItemContent}>
                      <View style={styles.foodMainInfo}>
                        <Text style={styles.foodName}>{food.name}</Text>
                        {food.brand && (
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
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal for Adding Food */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              Add to{" "}
              {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
            </Text>
            <TouchableOpacity onPress={addFood}>
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
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Brand (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Organic Valley, Kraft"
                placeholderTextColor="#666666"
                value={formData.brand}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, brand: text }))
                }
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
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, serving: text }))
                }
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
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, calories: text }))
                }
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
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, protein: text }))
                }
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
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, carbs: text }))
                }
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
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, fat: text }))
                }
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1, // Takes up full available space (important concept in React Native)
    backgroundColor: "#0A0A0A", // Dark theme background
  },
  scrollView: {
    flex: 1, // Allows ScrollView to expand and scroll when content is too long
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },

  // Header Styles
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    fontWeight: "400",
    marginBottom: 30, // Space before meal sections
  },

  // Meal Section Styles
  mealSection: {
    backgroundColor: "#1A1A1A", // Slightly lighter than main background
    borderRadius: 12, // Rounded corners
    padding: 16,
    marginBottom: 16, // Space between meal sections
    borderWidth: 1,
    borderColor: "#2A2A2A", // Subtle border
  },
  mealHeader: {
    flexDirection: "row", // Arrange children horizontally
    justifyContent: "space-between", // Push title left, button right
    alignItems: "center", // Center vertically
    marginBottom: 12,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  addButton: {
    backgroundColor: "#00D4FF20", // Semi-transparent accent color (20 = ~12% opacity)
    borderRadius: 20, // Circular button
    width: 36,
    height: 36,
    justifyContent: "center", // Center icon horizontally
    alignItems: "center", // Center icon vertically
  },

  // Food List Styles
  foodList: {
    minHeight: 40, // Ensures consistent spacing even when empty
  },
  emptyText: {
    color: "#666666",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 12,
  },
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

  // Modal Styles
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

  // Form Input Styles
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
