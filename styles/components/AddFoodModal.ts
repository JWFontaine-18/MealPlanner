import { StyleSheet } from 'react-native';

export const addFoodModalStyles = StyleSheet.create({
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
    fontWeight: "500",
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00D4FF",
  },
  saveButtonPlaceholder: {
    width: 40,
  },
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
    position: "relative",
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
  tabContent: {
    flex: 1,
  },
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00D4FF",
    marginTop: 20,
    marginBottom: 16,
  },
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