import React, { useRef, useEffect, useState } from 'react';
import { TouchableOpacity, Animated, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './FavoriteButtonStyle';

type Props = {
  image: {
    url: string;
    title: string;
    explanation: string;
  };
};

const FAVORITO_KEY = '@imagens_favoritas';

export default function FavoriteButton({ image }: Props) {
  const [favorito, setFavorito] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const textoOpacity = useRef(new Animated.Value(1)).current;
  const beatAnim = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    const verificarSeEstaFavorito = async () => {
      const salvos = await AsyncStorage.getItem(FAVORITO_KEY);
      if (salvos) {
        const lista = JSON.parse(salvos);
        const jaExiste = lista.some((item: any) => item.url === image.url);
        setFavorito(jaExiste);
      }
    };
    verificarSeEstaFavorito();
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
    const salvos = await AsyncStorage.getItem(FAVORITO_KEY);
    let lista = salvos ? JSON.parse(salvos) : [];

    const existe = lista.find((item: any) => item.url === image.url);

    let novaLista;

    if (existe) {
      novaLista = lista.filter((item: any) => item.url !== image.url);
      setFavorito(false);
    } else {
      novaLista = [...lista, image];
      setFavorito(true);
    }

    await AsyncStorage.setItem(FAVORITO_KEY, JSON.stringify(novaLista));
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

  const gradientColors: [string, string, ...string[]] = favorito
    ? ['#1BC0DC', '#1E4789', '#1EBFDB']
    : ['#1A237E', '#1EBFDB', '#1E4789'];

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={animatePress} style={{ borderRadius: 25 }}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.fundoGradient, { borderRadius: 25 }]}
      >
        <Animated.View style={[styles.favoritoBtn, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name={favorito ? 'heart' : 'heart-outline'} size={40} color="#5328EF" />
          <Animated.Text style={[styles.textoFavorito, { opacity: textoOpacity }]}>
            {favorito ? 'Salvo com sucesso! ✨' : 'Salvar nos Favoritos'}
          </Animated.Text>
        </Animated.View>
      </LinearGradient>
    </TouchableOpacity>
  );
}