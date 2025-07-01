import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
 fundoGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  favoritoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoFavorito: {
    color: '#000',
    fontSize: 16,

    fontWeight: '600',
    marginLeft: 12,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(107, 71, 147, 0.9)', // sombra lilás para o texto
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});