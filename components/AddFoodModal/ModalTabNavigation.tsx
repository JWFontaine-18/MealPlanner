import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addFoodModalStyles as styles } from '@/styles/components/AddFoodModal';

type TabType = 'search' | 'manual' | 'customize';

interface ModalTabNavigationProps {
  activeTab: TabType;
  hasUnsavedChanges: boolean;
  onTabChange: (tab: TabType) => void;
}

export function ModalTabNavigation({ 
  activeTab, 
  hasUnsavedChanges, 
  onTabChange 
}: ModalTabNavigationProps) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'search' && styles.activeTabButton]}
        onPress={() => onTabChange('search')}
      >
        <Ionicons
          name="search"
          size={16}
          color={activeTab === 'search' ? '#00D4FF' : '#666666'}
          style={styles.tabIcon}
        />
        <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>
          Search Database
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'manual' && styles.activeTabButton]}
        onPress={() => onTabChange('manual')}
      >
        <Ionicons
          name="create"
          size={16}
          color={activeTab === 'manual' ? '#00D4FF' : '#666666'}
          style={styles.tabIcon}
        />
        <Text style={[styles.tabText, activeTab === 'manual' && styles.activeTabText]}>
          Manual Entry
        </Text>
        {hasUnsavedChanges && <View style={styles.unsavedIndicator} />}
      </TouchableOpacity>
    </View>
  );
}