import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import AnimatedReanimated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import FavoriteButton from '../../components/FavoriteButton/favoriteButton';
import ImageTitle from '../../components/ImageTitle/ImageTitle';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import SpotifyButton from '../../components/SpotifyButton/SpotifyButton';

import AnimatedHeader from '../../components/AnimateHeader/AnimateHeader';
import { fetchApod } from '../../services/nasaApiService';
import { ImageData } from '../../types/types';
import { localStyles } from './imagemDetalhesStyle';


export default function ImagemDetalhes() {
  const [data, setData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    async function getApod() {
      try {
        const apodData = await fetchApod();

        if (apodData.media_type === 'image') {
          setData({
            url: apodData.hdurl || apodData.url,
            title: apodData.title,
            explanation: apodData.explanation,
          });
        } else if (apodData.media_type === 'video' && apodData.thumbnail_url) {
          setData({
            url: apodData.thumbnail_url,
            title: apodData.title,
            explanation: apodData.explanation,
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

  if (loading)
    return (
      <LinearGradient
        colors={['#0B0B22', '#18002C']} style={localStyles.gradient}
      >
        <SafeAreaView style={localStyles.safeArea}>
          <StatusBar backgroundColor="#0D1B2A" barStyle="light-content" />
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
          <StatusBar backgroundColor="#0D1B2A" barStyle="light-content" />
          <View style={localStyles.centered}>
            <Text style={localStyles.errorText}>🚀 {error}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );

  if (!data) return null;

  return (
    <LinearGradient
      colors={['#0B0B22', '#18002C']} style={localStyles.gradient}
    >
      <SafeAreaView style={localStyles.safeArea}>
        <StatusBar backgroundColor="#0D1B2A" barStyle="light-content" />

        <ScrollView contentContainerStyle={localStyles.scrollContent}>
          <AnimatedReanimated.View entering={FadeIn.duration(700)}>
            <AnimatedHeader />
          </AnimatedReanimated.View>

          <AnimatedReanimated.View entering={FadeIn.duration(700)}>
            <ImageViewer url={data.url} />
          </AnimatedReanimated.View>

          <AnimatedReanimated.View entering={FadeIn.delay(800).duration(700)}>
            <Text style={{
              color: '#B0C4DE',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
              marginVertical: 12,
              textShadowColor: 'rgba(0,0,0,0.5)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 4,
            }}>
              Aqui está a descrição da imagem escolhida
            </Text>
          </AnimatedReanimated.View>

          <AnimatedReanimated.View entering={FadeIn.delay(1200).duration(700)}>
            <ImageTitle title={data.title} description={data.explanation} />
          </AnimatedReanimated.View>

          <SpotifyButton />
          <FavoriteButton />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}