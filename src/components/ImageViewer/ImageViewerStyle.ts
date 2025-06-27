import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  imagem: {
    width: width - 40,
    height: 300,
    borderRadius: 20,
    marginBottom: 25,
    shadowColor: '#7FB3FF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
    borderWidth: 2,
    borderColor: 'rgba(127, 179, 255, 0.2)',
  },
});