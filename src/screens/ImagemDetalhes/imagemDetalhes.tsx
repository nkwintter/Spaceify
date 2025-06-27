import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import ImageTitle from '../../components/ImageTitle/ImageTitle';
import SpotifyButton from '../../components/SpotifyButton/SpotifyButton';
import FavoriteButton from '../../components/FavoriteButton/favoriteButton';
import { ImageData } from '../../types/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { localStyles } from './imagemDetalhesStyle';

interface ApodResponse {
  url: string;
  hdurl?: string;
  title: string;
  explanation: string;
  media_type: string;
}

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
          setData(null);
        } else {
          setData({
            url: apodData.hdurl || apodData.url,
            title: apodData.title,
            explanation: apodData.explanation,
          });
        }
      } catch (e) {
        setError('Erro ao carregar dados da NASA.');
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    getApod();
  }, []);

  const toggleFavorito = () => setFavorito(!favorito);

  if (loading)
    return (
      <SafeAreaView style={localStyles.safeArea} edges={['top', 'left', 'right']}>
        <View style={localStyles.centered}>
          <ActivityIndicator size="large" color="#7FB3FF" />
        </View>
      </SafeAreaView>
    );

  if (error)
    return (
      <SafeAreaView style={localStyles.safeArea} edges={['top', 'left', 'right']}>
        <View style={localStyles.centered}>
          <Text style={{ color: '#fff' }}>{error}</Text>
        </View>
      </SafeAreaView>
    );

  if (!data) return null;

  return (
    <SafeAreaView style={localStyles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={localStyles.scrollContent}>
        <Text style={localStyles.titulo}>
          <Ionicons name="planet" size={24} color="#7FB3FF" /> Detalhes da Imagem
        </Text>

        <ImageViewer url={data.url} />
        <ImageTitle title={data.title} description={data.explanation} />
        <SpotifyButton />
        <FavoriteButton favorito={favorito} toggleFavorito={toggleFavorito} />
      </ScrollView>
    </SafeAreaView>
  );
}


async function fetchApod(): Promise<ApodResponse> {
  const apiKey = 'DEMO_KEY';
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  );
  if (!response.ok) {
    throw new Error('Erro ao buscar dados da NASA');
  }
  return response.json();
}