import React, { useRef, useEffect, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './FavoriteButtonStyle';

const FAVORITO_KEY = '@imagem_favorita'; // chave no AsyncStorage

export default function FavoriteButton() {
  const [favorito, setFavorito] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const textoOpacity = useRef(new Animated.Value(1)).current;
  const beatAnim = useRef<Animated.CompositeAnimation | null>(null);

  // Carrega do AsyncStorage ao iniciar
  useEffect(() => {
    const carregarFavorito = async () => {
      const salvo = await AsyncStorage.getItem(FAVORITO_KEY);
      if (salvo === 'true') {
        setFavorito(true);
      }
    };
    carregarFavorito();
  }, []);

  // Inicia ou para a batida
  useEffect(() => {
    if (favorito) {
      beatAnim.current = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      );
      beatAnim.current.start();
    } else {
      if (beatAnim.current) beatAnim.current.stop();
      scaleAnim.setValue(1);
    }
  }, [favorito]);

  const toggleFavorito = async () => {
    const novoEstado = !favorito;
    setFavorito(novoEstado);
    await AsyncStorage.setItem(FAVORITO_KEY, novoEstado.toString());
  };

  const animatePress = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.4,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(textoOpacity, {
          toValue: 0.5,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(textoOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    toggleFavorito();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.favoritoBtn, favorito && styles.favoritoAtivo]}
      onPress={animatePress}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name={favorito ? 'heart' : 'heart-outline'}
          size={40}
          color="#FFFFFF"
        />
      </Animated.View>
      <Animated.Text style={[styles.textoFavorito, { opacity: textoOpacity }]}>
        {favorito ? 'Salvo com sucesso! ✨' : 'Salvar nos Favoritos'}
      </Animated.Text>
    </TouchableOpacity>
  );
}