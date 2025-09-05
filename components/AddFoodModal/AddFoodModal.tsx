import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormData, MealType } from '@/types/food';
import { FoodSearch } from '../FoodSearch';
import { ServingSelector } from './ServingSelector';
import { ManualFoodForm } from './ManualFoodForm';
import { ModalTabNavigation } from './ModalTabNavigation';
import { addFoodModalStyles as styles } from '@/styles/components/AddFoodModal';

interface AddFoodModalProps {
  visible: boolean;
  selectedMeal: MealType;
  formData: FormData;
  onClose: () => void;
  onSave: () => void;
  onSaveFromApi: (nutritionData: any, meal: MealType) => void;
  onUpdateFormData: (field: keyof FormData, value: string) => void;
}

type TabType = 'search' | 'manual' | 'customize';

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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [editedFoodName, setEditedFoodName] = useState('');

  useEffect(() => {
    if (visible) {
      setActiveTab('search');
      setHasUnsavedChanges(false);
      setSelectedFood(null);
      setServingMultiplier(1);
    }
  }, [visible]);

  useEffect(() => {
    const hasData = Object.values(formData).some(value => value.trim().length > 0);
    setHasUnsavedChanges(hasData && activeTab === 'manual');
  }, [formData, activeTab]);

  const handleFoodSelectedFromSearch = (nutritionData: any) => {
    setSelectedFood(nutritionData);
    setServingMultiplier(1);
    setEditedFoodName(nutritionData.name);
    setActiveTab('customize');
  };

  const handleSaveCustomizedFood = () => {
    if (!selectedFood) return;
    
    const adjustedFood = {
      name: editedFoodName || selectedFood.name,
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

  const handleTabChange = (newTab: TabType) => {
    if (newTab === 'search' && hasUnsavedChanges) {
      console.log('⚠️ Switching tabs with unsaved changes');
    }
    setActiveTab(newTab);
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      console.log('⚠️ Closing modal with unsaved changes');
    }
    onClose();
  };



  const renderSearchInterface = () => (
    <FoodSearch
      selectedMeal={selectedMeal}
      onFoodSelectedForCustomizing={handleFoodSelectedFromSearch}
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
          householdServing={selectedFood.householdServing}
          servingSize={selectedFood.servingSize}
          servingSizeUnit={selectedFood.servingSizeUnit}
          onServingChange={setServingMultiplier}
          onNameChange={setEditedFoodName}
        />
        <View style={styles.customizeFooter}>
          <TouchableOpacity style={styles.addButton} onPress={handleSaveCustomizedFood}>
            <Text style={styles.addButtonText}>Add to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.modalHeader}>
      <TouchableOpacity onPress={handleClose}>
        <Text style={styles.cancelButton}>Cancel</Text>
      </TouchableOpacity>

      <Text style={styles.modalTitle}>
        Add to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
      </Text>

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

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        {renderHeader()}
        {activeTab !== 'customize' && (
          <ModalTabNavigation 
            activeTab={activeTab}
            hasUnsavedChanges={hasUnsavedChanges}
            onTabChange={handleTabChange}
          />
        )}
        <View style={styles.tabContent}>
          {activeTab === 'search' && renderSearchInterface()}
          {activeTab === 'manual' && (
            <ManualFoodForm 
              formData={formData}
              onUpdateFormData={onUpdateFormData}
            />
          )}
          {activeTab === 'customize' && renderCustomizeInterface()}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

