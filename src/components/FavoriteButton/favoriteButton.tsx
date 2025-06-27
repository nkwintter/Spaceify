import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './FavoriteButtonStyle';

type Props = {
  favorito: boolean;
  toggleFavorito: () => void;
};

export default function FavoriteButton({ favorito, toggleFavorito }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    toggleFavorito();
  };

  return (
    <TouchableOpacity style={styles.favoritoBtn} onPress={animatePress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name={favorito ? 'star' : 'star-outline'}
          size={26}
          color={favorito ? '#FFD700' : '#aaa'}
        />
      </Animated.View>
      <Text style={styles.textoFavorito}>
        {favorito ? 'Adicionado aos Favoritos' : 'Adicionar aos Favoritos'}
      </Text>
    </TouchableOpacity>
  );
}
