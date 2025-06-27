import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  favoritoBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  favoritoAtivo: {
    backgroundColor: '#FF4D6D',
    borderColor: '#FF4D6D',
  },
  textoFavorito: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    letterSpacing: 0.5,
  },
});
