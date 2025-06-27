import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './FavoriteButtonStyle';

type Props = {
  favorito: boolean;
  toggleFavorito: () => void;
};

export default function FavoriteButton({ favorito, toggleFavorito }: Props) {
  return (
    <TouchableOpacity style={styles.favoritoBtn} onPress={toggleFavorito}>
      <Ionicons
        name={favorito ? 'star' : 'star-outline'}
        size={24}
        color={favorito ? '#FFD700' : '#aaa'}
      />
      <Text style={styles.textoFavorito}>
        {favorito ? 'Adicionado aos Favoritos' : 'Adicionar aos Favoritos'}
      </Text>
    </TouchableOpacity>
  );
}