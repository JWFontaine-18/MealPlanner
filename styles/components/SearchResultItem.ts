import { StyleSheet } from 'react-native';

export const searchResultItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  secondLine: {
    color: '#999999',
    fontSize: 13,
    marginTop: 2,
  },
});