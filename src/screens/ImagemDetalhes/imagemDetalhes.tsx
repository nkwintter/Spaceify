import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import ImageTitle from '../../components/ImageTitle/ImageTitle';
import SpotifyButton from '../../components/SpotifyButton/SpotifyButton';
import FavoriteButton from '../../components/FavoriteButton/favoriteButton';
import { ImageData } from '../../types/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchApod } from '../../services/nasaApiService';
import { localStyles } from './imagemDetalhesStyle';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ImagemDetalhes() {
  const [data, setData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function getApod() {
      try {
        const apodData = await fetchApod();

        if (apodData.media_type !== 'image') {
          setError('Conteúdo da NASA não é uma imagem');
        } else {
          setData({
            url: apodData.hdurl || apodData.url,
            title: apodData.title,
            explanation: apodData.explanation,
          });
        }
      } catch {
        setError('Erro ao carregar dados da NASA.');
      } finally {
        setLoading(false);
      }
    }

    getApod();
  }, []);

  const toggleFavorito = () => setFavorito(!favorito);

  if (loading)
    return (
      <LinearGradient colors={['#1b1c3a', '#0a0e23']} style={localStyles.gradient}>
        <SafeAreaView style={localStyles.safeArea}>
          <StatusBar backgroundColor="#0a0e23" />
          <View style={localStyles.centered}>
            <ActivityIndicator size="large" color="#7FB3FF" />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );

  if (error)
    return (
      <LinearGradient colors={['#1b1c3a', '#0a0e23']} style={localStyles.gradient}>
        <SafeAreaView style={localStyles.safeArea}>
          <StatusBar backgroundColor="#0a0e23" />
          <View style={localStyles.centered}>
            <Text style={localStyles.errorText}>🚀 {error}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );

  if (!data) return null;

  return (
    <LinearGradient colors={['#1b1c3a', '#0a0e23']} style={localStyles.gradient}>
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar backgroundColor="#0a0e23" barStyle="light-content" />

        <ScrollView contentContainerStyle={localStyles.scrollContent}>
          <Text style={localStyles.titulo}>
            <Ionicons name="planet" size={26} color="#94DAFF" /> Detalhes da Imagem 
          </Text>

          <Animated.View entering={FadeIn.duration(700)}>
            <ImageViewer url={data.url} />
          </Animated.View>

          <Animated.View entering={FadeIn.delay(300).duration(700)}>
            <ImageTitle title={data.title} description={data.explanation} />
          </Animated.View>

          <SpotifyButton />
          <FavoriteButton/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}