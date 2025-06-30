import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, StatusBar, Animated } from 'react-native';
import {styles} from './style';
import React, { useEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import nebulosa from '../../assets/nebulosa.jpg'; 
import SpotifyButton from '../../components/SpotifyButton/SpotifyButton';
import { fetchApod } from '../../services/nasaApiService';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useMood } from '../../contexts/moodContexts'


export type ImageData = {
  url: string;
  title: string;
  explanation: string;
  date: string;
};

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

const favorites = [
  { name: 'Chuva de Meteoros', image: require('../../assets/meteoro.jpg') },
  { name: 'Tranquilidade Estelar', image: require('../../assets/estelar.jpg') },
  { name: 'Nebulosa Violeta', image: require('../../assets/violeta.jpg') },
  { name: 'Lo-fi Galáctico', image: require('../../assets/lofi.jpg') },
];

export default function Home() {
  const [data, setData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const { changeMood, moods, currentMoodIndex} = useMood();

  const animation = useRef(new Animated.Value(0)).current;

  const currentColors = moods[currentMoodIndex].colors;

  const nextMoodIndex = (currentMoodIndex + 1) % moods.length;

  const nextColors = moods[nextMoodIndex].colors;

  const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

  // interpolação para animar entre as cores atuais e as próximas
  const color1 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColors[0], nextColors[0]]
  });

  const color2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColors[1], nextColors[1]]
  });

  const handleChangeMood = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start(() => {
      changeMood();        // aqui chamamos o changeMood do contexto
      animation.setValue(0);
    });
  };

  useEffect(() => {
    async function getApod() {
      try {
        const apodData = await fetchApod();

        if (apodData.media_type === 'image') {
          setData({
            url: apodData.hdurl || apodData.url,
            title: apodData.title,
            explanation: apodData.explanation,
            date: apodData.date,
          });
        } else if (apodData.media_type === 'video' && apodData.thumbnail_url) {
          setData({
            url: apodData.thumbnail_url,
            title: apodData.title,
            explanation: apodData.explanation,
            date: apodData.date,
          });
        } else {
          setError('Conteúdo da NASA não é uma imagem');
        }
      } catch {
        setError('Erro ao carregar dados da NASA.');
      } finally {
        setLoading(false);
      }
    }

    getApod();
  }, []);

  if (loading) {
    return (
      <AnimatedLinearGradient colors={[color1, color2]} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#7FB3FF" />
          </View>
        </SafeAreaView>
      </AnimatedLinearGradient>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <AnimatedLinearGradient colors={[color1, color2]} style={styles.gradient}>
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
     
      <Text style={styles.title}>Imagem do Dia</Text>

      {data && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.url }} style={styles.image} />
          <View style={styles.imagePorCima}>
            <Text style={styles.imageTitle}>{data.title}</Text>
            <Text style={styles.imageDate}>{formatDate(data.date)}</Text>
            <Text
              style={styles.imageDescription}
              numberOfLines={expanded ? undefined : 2}
            >
              {data.explanation}
            </Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.seeMore}>
                {expanded ? 'Ver menos' : 'Ver mais'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <SpotifyButton />

      <View style={styles.moodContainer}>
        <Text style={styles.moodLabel}>Mood Atual</Text>
        <View style={styles.moodRow}>
          <Text style={styles.moodText}>{moods[currentMoodIndex].name}</Text>
          <TouchableOpacity onPress={handleChangeMood}>
          <Text style={styles.changeMood}>Trocar mood</Text>
        </TouchableOpacity>

        </View>
      </View>

     
      <Text style={styles.favoritesTitle}>Favoritos Recentes</Text>
      <FlatList
        data={favorites}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.favoriteCard}>
            <Image source={item.image} style={styles.favoriteImage} />
            <Text style={styles.favoriteText}>{item.name}</Text>
          </View>
        )}
        style={styles.favoritesScroll}
      />
    </ScrollView>
    </SafeAreaView>
    </AnimatedLinearGradient>
  );
}

