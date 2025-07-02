import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, StatusBar, Animated } from 'react-native';
import {styles} from './style';
import React, { useEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import nebulosa from '../../assets/nebulosa.jpg'; 
import SpotifyButton from '../../components/SpotifyButton/SpotifyButton';
import { fetchApodList } from '../../services/nasaApiService';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteButton from '../../components/FavoriteButton/favoriteButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useMood } from '../../contexts/moodContexts'


type ImagemFavorita = {
  url: string;
  title: string;
};

type RootStackParamList = {
  Home: undefined;
  ImagemDetalhes: undefined;
};

type Props = {
  navigation: HomeNavigationProp;
  route: any;
}

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;


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


export default function Home() {
  console.log('🏠 Home component renderizou');
const [dados, setDados] = useState<ImageData | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [expanded, setExpanded] = useState(false);
const navigation = useNavigation<HomeNavigationProp>();

const handlePress = () => {
    navigation.navigate('ImagemDetalhes'); 
  };


const { changeMood, moods, currentMoodIndex } = useMood();

const animation = useRef(new Animated.Value(0)).current;

const coresAtuais = moods[currentMoodIndex].colors;

const proximoIndiceMood = (currentMoodIndex + 1) % moods.length;

const proximasCores = moods[proximoIndiceMood].colors;

const GradienteAnimado = Animated.createAnimatedComponent(LinearGradient);

// interpolação para animar entre as cores atuais e as próximas
const cor1 = animation.interpolate({
  inputRange: [0, 1],
  outputRange: [coresAtuais[0], proximasCores[0]]
});

const cor2 = animation.interpolate({
  inputRange: [0, 1],
  outputRange: [coresAtuais[1], proximasCores[1]]
});

const trocarMood = () => {
  Animated.timing(animation, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false
  }).start(() => {
    changeMood(); // chama o changeMood do contexto
    animation.setValue(0);
  });
};

const [favoritos, setFavoritos] = useState<ImagemFavorita[]>([]);

useEffect(() => {
  async function getApodDodia() {
    try {
      // URL da API da NASA APOD para hoje
      const API_KEY = 'p0Q4koCNEvHZ54CmGHqh7jkc5h2sUvyaP0Cyjhj5'; // ou use 'DEMO_KEY' para testes
      const today = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD
      
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${today}`
      );
      
      const dadosApod = await response.json()
      
      if (dadosApod.media_type === 'image') {
        setDados({
          url: dadosApod.hdurl || dadosApod.url,
          title: dadosApod.title,
          explanation: dadosApod.explanation,
          date: dadosApod.date,
        });
      } else if (dadosApod.media_type === 'video' && dadosApod.thumbnail_url) {
        setDados({
          url: dadosApod.thumbnail_url,
          title: dadosApod.title,
          explanation: dadosApod.explanation,
          date: dadosApod.date,
        });
      } else {
        setError('Conteúdo de hoje não é uma imagem');
      }
    } catch (err) {
      console.log('❌ Erro ao buscar APOD:', err);
      setError('Erro ao carregar imagem do dia da NASA.');
    } finally {
      setLoading(false);
    }
  }

  getApodDodia();
}, []);

  if (loading) {
    return (
      <GradienteAnimado colors={[cor1, cor2]} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#7FB3FF" />
          </View>
        </SafeAreaView>
      </GradienteAnimado>
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
    <GradienteAnimado colors={[cor1, cor2]} style={styles.gradient}>
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
     
      <Text style={styles.title}>Imagem do Dia</Text>

      {dados && (
        <TouchableOpacity onPress={handlePress}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: dados.url }} style={styles.image} />
          <View style={styles.imagePorCima}>
            <Text style={styles.imageTitle}>{dados.title}</Text>
            <Text style={styles.imageDate}>{formatDate(dados.date)}</Text>
            <Text
              style={styles.imageDescription}
              numberOfLines={expanded ? undefined : 2}
            >
              {dados.explanation}
            </Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.seeMore}>
                {expanded ? 'Ver menos' : 'Ver mais'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableOpacity>
      )}

      <SpotifyButton />

      <View style={styles.moodContainer}>
        <Text style={styles.moodLabel}>Mood Atual</Text>
        <View style={styles.moodRow}>
          <Text style={styles.moodText}>{moods[currentMoodIndex].name}</Text>
          <TouchableOpacity onPress={trocarMood}>
          <Text style={styles.changeMood}>Trocar mood</Text>
        </TouchableOpacity>

        </View>
      </View>

     
      <Text style={styles.favoritesTitle}>Imagens Favoritas Recentes</Text>
      <FlatList<ImagemFavorita>
        data={favoritos || []}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
         <TouchableOpacity onPress={handlePress}>
        <View style={styles.favoriteCard}>
        <Image source={{ uri: item.url }} style={styles.favoriteImage} />
        <Text style={styles.favoriteText}>{item.title}</Text>
        </View>
        </TouchableOpacity> 
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        />
    </ScrollView>
    </SafeAreaView>
    </GradienteAnimado>
  );
}

