import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 7,
  },
  nomeImagem: {
    color: '#99FEFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  descricao: {
    color: '#E0E5F1',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  verMaisBtn: {
    marginTop: 14,
    alignItems: 'flex-end',
  },
  verMaisTexto: {
    color: '#7FB3FF',
    fontSize: 15,
    fontWeight: '600',
  },
});
