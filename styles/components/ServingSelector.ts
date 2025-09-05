import { StyleSheet } from 'react-native';

export const servingSelectorStyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  foodInfo: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  foodName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  brandName: {
    color: "#CCCCCC",
    fontSize: 14,
  },
  servingContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  adjustButton: {
    backgroundColor: "#00D4FF20",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  amountInput: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    minWidth: 80,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  unitSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  unitButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#2A2A2A",
    minWidth: 60,
    alignItems: "center",
  },
  selectedUnitButton: {
    backgroundColor: "#00D4FF20",
    borderWidth: 1,
    borderColor: "#00D4FF",
  },
  unitText: {
    color: "#CCCCCC",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedUnitText: {
    color: "#00D4FF",
  },
  nutritionContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
  },
  nutritionGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    color: "#00D4FF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  nutritionLabel: {
    color: "#CCCCCC",
    fontSize: 12,
  },
  foodNameInput: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});