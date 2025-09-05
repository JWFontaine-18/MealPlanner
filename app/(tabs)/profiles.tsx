import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonScreenStyles as styles } from '@/styles/screens/CommonScreen';

export default function ProfilesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profiles</Text>
        <Text style={styles.subtitle}>Manage your fitness profiles</Text>
      </View>
    </SafeAreaView>
  );
}

