import React, { useRef, useEffect, useState } from 'react';
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './FavoriteButtonStyle';

const FAVORITO_KEY = '@imagem_favorita';

export default function FavoriteButton() {
  const [favorito, setFavorito] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const textoOpacity = useRef(new Animated.Value(1)).current;
  const beatAnim = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    const carregarFavorito = async () => {
      const salvo = await AsyncStorage.getItem(FAVORITO_KEY);
      if (salvo === 'true') {
        setFavorito(true);
      }
    };
    carregarFavorito();
  }, []);

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
          duration: 1,
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
          duration: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    toggleFavorito();
  };

  // Escolhe cores do gradiente com base no estado favorito
  const gradientColors: [string, string, ...string[]] = favorito
    ? ['#1BC0DC', '#1E4789', '##1EBFDB'] // roxos escuros, galácticos
    : ['#1A237E', '#1EBFDB', '#1E4789']; // tons escuros de azul

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={animatePress} style={{ borderRadius: 25 }}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.fundoGradient, { borderRadius: 25 }]}
      >
        <Animated.View
          style={[styles.favoritoBtn, { transform: [{ scale: scaleAnim }] }]}
        >
          <Ionicons
            name={favorito ? 'heart' : 'heart-outline'}
            size={40}
            color="#5328EF"
          />
          <Animated.Text style={[styles.textoFavorito, { opacity: textoOpacity }]}>
            {favorito ? 'Salvo com sucesso! ✨' : 'Salvar nos Favoritos'}
          </Animated.Text>
        </Animated.View>
      </LinearGradient>
    </TouchableOpacity>
  );
}