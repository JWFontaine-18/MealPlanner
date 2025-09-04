import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FormData, MealType } from '@/types/food';
import { FoodSearch } from './FoodSearch';
import { ServingSelector } from './ServingSelector';

/**
 * Props for the AddFoodModal component
 * 
 * We maintain backward compatibility with the existing interface
 * while adding new functionality for database search
 */
interface AddFoodModalProps {
  visible: boolean;
  selectedMeal: MealType;
  formData: FormData;
  onClose: () => void;
  onSave: () => void;
  onSaveFromApi: (nutritionData: any, meal: MealType) => void;
  onUpdateFormData: (field: keyof FormData, value: string) => void;
}

/**
 * Tab types for the modal
 * 
 * Users can switch between searching the database or entering food manually
 */
type TabType = 'search' | 'manual' | 'customize';

/**
 * Enhanced AddFoodModal Component
 * 
 * Now includes tabs for database search and manual entry
 */
export function AddFoodModal({
  visible,
  selectedMeal,
  formData,
  onClose,
  onSave,
  onSaveFromApi,
  onUpdateFormData,
}: AddFoodModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('search');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);

  // ========================================
  // EFFECTS
  // ========================================
  
  /**
   * Reset state when modal opens/closes
   * 
   * When the modal opens, we want to start fresh with the search tab.
   * This provides a consistent user experience.
   */
  useEffect(() => {
    if (visible) {
      setActiveTab('search');
      setHasUnsavedChanges(false);
      setSelectedFood(null);
      setServingMultiplier(1);
    }
  }, [visible]);

  /**
   * Track changes to form data to detect unsaved changes
   * 
   * This helps us provide better UX by warning users about unsaved data
   */
  useEffect(() => {
    // Check if any form fields have data
    const hasData = Object.values(formData).some(value => value.trim().length > 0);
    setHasUnsavedChanges(hasData && activeTab === 'manual');
  }, [formData, activeTab]);

  // ========================================
  // EVENT HANDLERS
  // ========================================
  
  /**
   * Handles food selection from the search results
   * 
   * When a user selects a food from the database search, we populate
   * the manual entry form with that data and switch to the manual tab.
   * This allows users to review and modify the data before saving.
   */
  const handleFoodSelectedFromSearch = (nutritionData: any) => {
    setSelectedFood(nutritionData);
    setServingMultiplier(1);
    setActiveTab('customize');
  };

  const handleSaveCustomizedFood = () => {
    if (!selectedFood) return;
    
    const adjustedFood = {
      name: selectedFood.name,
      brand: selectedFood.brand,
      calories: Math.round(selectedFood.calories * servingMultiplier),
      protein: Math.round(selectedFood.protein * servingMultiplier * 10) / 10,
      carbs: Math.round(selectedFood.carbs * servingMultiplier * 10) / 10,
      fat: Math.round(selectedFood.fat * servingMultiplier * 10) / 10,
      serving: Math.round(selectedFood.serving * servingMultiplier),
    };
    
    onSaveFromApi(adjustedFood, selectedMeal);
    onClose();
  };

  /**
   * Handles tab switching with unsaved changes warning
   * 
   * If the user has unsaved manual entry data and tries to switch to search,
   * we should warn them that their data will be lost.
   */
  const handleTabChange = (newTab: TabType) => {
    if (newTab === 'search' && hasUnsavedChanges) {
      // In a production app, you might want to show an alert here
      // For now, we'll just switch tabs
      console.log('⚠️ Switching tabs with unsaved changes');
    }
    
    setActiveTab(newTab);
  };

  /**
   * Enhanced close handler
   * 
   * We might want to warn about unsaved changes when closing
   */
  const handleClose = () => {
    if (hasUnsavedChanges) {
      // In a production app, you might want to show a confirmation dialog
      console.log('⚠️ Closing modal with unsaved changes');
    }
    
    onClose();
  };

  // ========================================
  // RENDER METHODS
  // ========================================
  
  /**
   * Renders the tab navigation
   * 
   * Two tabs: "Search Database" and "Manual Entry"
   */
  const renderTabNavigation = () => (
    <View style={styles.tabContainer}>
      {/* Search Database Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'search' && styles.activeTabButton,
        ]}
        onPress={() => handleTabChange('search')}
      >
        <Ionicons
          name="search"
          size={16}
          color={activeTab === 'search' ? '#00D4FF' : '#666666'}
          style={styles.tabIcon}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'search' && styles.activeTabText,
          ]}
        >
          Search Database
        </Text>
      </TouchableOpacity>

      {/* Manual Entry Tab */}
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === 'manual' && styles.activeTabButton,
        ]}
        onPress={() => handleTabChange('manual')}
      >
        <Ionicons
          name="create"
          size={16}
          color={activeTab === 'manual' ? '#00D4FF' : '#666666'}
          style={styles.tabIcon}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'manual' && styles.activeTabText,
          ]}
        >
          Manual Entry
        </Text>
        {/* Show dot indicator if there's unsaved data */}
        {hasUnsavedChanges && <View style={styles.unsavedIndicator} />}
      </TouchableOpacity>
    </View>
  );

  /**
   * Renders the manual entry form (original functionality)
   * 
   * This is the same form as before, but now it's one tab within the modal
   */
  const renderManualEntryForm = () => (
    <ScrollView style={styles.formContent}>
      {/* Basic Information Section */}
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

      {/* Macronutrients Section */}
      <Text style={styles.sectionHeader}>Macronutrients (Optional)</Text>
      <Text style={styles.sectionSubtitle}>
        Add detailed nutrition information for better tracking
      </Text>

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

      {/* Helper text at the bottom */}
      <View style={styles.helperTextContainer}>
        <Text style={styles.helperText}>
          💡 Tip: You can also search our database for automatic nutrition information
        </Text>
      </View>
    </ScrollView>
  );

  /**
   * Renders the search interface
   * 
   * This shows the FoodSearch component that allows users to find foods
   * from the Open Food Facts database
   */
  const renderSearchInterface = () => (
    <FoodSearch
      selectedMeal={selectedMeal}
      onFoodSelected={() => {}} // Not used anymore
      onFoodSelectedForCustomizing={handleFoodSelectedFromSearch}
      onClose={() => {}}
    />
  );

  const renderCustomizeInterface = () => {
    if (!selectedFood) return null;
    
    return (
      <View style={styles.customizeContainer}>
        <ServingSelector
          foodName={selectedFood.name}
          brand={selectedFood.brand}
          baseCalories={selectedFood.calories}
          baseProtein={selectedFood.protein}
          baseCarbs={selectedFood.carbs}
          baseFat={selectedFood.fat}
          baseServing={selectedFood.serving}
          onServingChange={setServingMultiplier}
        />
        <View style={styles.customizeFooter}>
          <TouchableOpacity style={styles.addButton} onPress={handleSaveCustomizedFood}>
            <Text style={styles.addButtonText}>Add to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /**
   * Renders the modal header with title and action buttons
   */
  const renderHeader = () => (
    <View style={styles.modalHeader}>
      {/* Cancel Button */}
      <TouchableOpacity onPress={handleClose}>
        <Text style={styles.cancelButton}>Cancel</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.modalTitle}>
        Add to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
      </Text>

      {/* Save/Add Button */}
      {activeTab === 'manual' ? (
        <TouchableOpacity onPress={onSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      ) : activeTab === 'customize' ? (
        <TouchableOpacity onPress={() => setActiveTab('search')}>
          <Text style={styles.cancelButton}>Back</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.saveButtonPlaceholder} />
      )}
    </View>
  );

  // ========================================
  // MAIN RENDER
  // ========================================
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        {/* Header with title and action buttons */}
        {renderHeader()}
        
        {/* Tab navigation - hide when customizing */}
        {activeTab !== 'customize' && renderTabNavigation()}
        
        {/* Tab content */}
        <View style={styles.tabContent}>
          {activeTab === 'search' && renderSearchInterface()}
          {activeTab === 'manual' && renderManualEntryForm()}
          {activeTab === 'customize' && renderCustomizeInterface()}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({
  // Main modal container
  modalContainer: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  // Modal header with title and buttons
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
    fontWeight: "500",
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00D4FF",
  },
  saveButtonPlaceholder: {
    width: 40, // Same width as "Save" text to maintain centered title
  },

  // Tab navigation styles
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    position: "relative", // For the unsaved changes indicator
  },
  activeTabButton: {
    backgroundColor: "#00D4FF20",
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  activeTabText: {
    color: "#00D4FF",
    fontWeight: "600",
  },
  unsavedIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
  },

  // Tab content area
  tabContent: {
    flex: 1,
  },

  // Manual entry form styles
  formContent: {
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
  
  // Section headers and content
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00D4FF",
    marginTop: 20,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#CCCCCC",
    marginBottom: 16,
    lineHeight: 20,
  },

  // Helper text at bottom of form
  helperTextContainer: {
    marginTop: 20,
    marginBottom: 40, // Extra space for scrolling
    padding: 16,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  helperText: {
    fontSize: 14,
    color: "#CCCCCC",
    lineHeight: 20,
    textAlign: "center",
  },

  // Customize interface styles
  customizeContainer: {
    flex: 1,
  },
  customizeFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  addButton: {
    backgroundColor: '#00D4FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});