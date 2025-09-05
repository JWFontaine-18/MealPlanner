import { StyleSheet } from 'react-native';

export const mealSectionStyles = StyleSheet.create({
  mealSection: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  mealTitleContainer: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  caloriesText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#00D4FF",
    marginTop: 2,
  },
  addButton: {
    backgroundColor: "#00D4FF20",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  foodList: {
    minHeight: 40,
  },
  emptyText: {
    color: "#666666",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 12,
  },
});