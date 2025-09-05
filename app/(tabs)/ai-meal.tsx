import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonScreenStyles as styles } from '@/styles/screens/CommonScreen';

export default function logScreen () {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AI Meals</Text>
        <Text style={styles.subtitle}>Get AI meals</Text>
      </View>
    </SafeAreaView>
  );
};

