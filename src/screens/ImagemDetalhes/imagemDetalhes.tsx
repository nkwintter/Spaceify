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
import { useRoute, useNavigation } from '@react-navigation/native';

import FavoriteButton from '../../components/FavoriteButton/favoriteButton';
import ImageTitle from '../../components/ImageTitle/ImageTitle';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import SpotifyButton from '../../components/SpotifyButton/SpotifyButton';
import AnimatedHeader from '../../components/AnimateHeader/AnimateHeader';
import ButtonBackCateg from '../../components/ButtonBackCateg/ButtonBackCateg';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { localStyles } from './imagemDetalhesStyle';
import { ImageData } from '../../types/types';

const FAVORITO_KEY = '@imagens_favoritas';

export default function ImagemDetalhes() {
  const route = useRoute();
  const navigation = useNavigation();

  // Protege acesso aos params
  const params = route.params as { item?: ImageData; categoria?: string } | undefined;

  if (!params?.item) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        <Text style={{ color: "white", fontSize: 18 }}>
          Nenhuma imagem foi passada para exibição.
        </Text>
        <Text
          style={{ color: "#7FB3FF", marginTop: 20 }}
          onPress={() => navigation.goBack()}
        >
          ← Voltar
        </Text>
      </View>
    );
  }

  const { item, categoria = "default" } = params;

  const [data, setData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const imageUrl = item.hdurl ?? item.url ?? item.thumbnail_url ?? null;
    if (!imageUrl) {
      setError("URL da imagem não encontrada.");
      setLoading(false);
      return;
    }
    setData({
      url: imageUrl,
      title: item.title,
      explanation: item.explanation,
      date: item.date,
      media_type: item.media_type,
    });
    setLoading(false);
  }, [item]);

  useEffect(() => {
    async function checkFavorito() {
      if (!data) return;
      const salvo = await AsyncStorage.getItem(FAVORITO_KEY);
      const lista = salvo ? JSON.parse(salvo) : [];
      const existe = lista.some((favItem: ImageData) => favItem.url === data.url);
      setFavorito(existe);
    }
    checkFavorito();
  }, [data]);

  const toggleFavorito = async () => {
    if (!data) return;
    const salvo = await AsyncStorage.getItem(FAVORITO_KEY);
    let lista = salvo ? JSON.parse(salvo) : [];
    const existe = lista.find((favItem: ImageData) => favItem.url === data.url);

    if (existe) {
      lista = lista.filter((favItem: ImageData) => favItem.url !== data.url);
      setFavorito(false);
    } else {
      lista.push(data);
      setFavorito(true);
    }

    await AsyncStorage.setItem(FAVORITO_KEY, JSON.stringify(lista));
  };

  if (loading) {
    return (
      <LinearGradient colors={["#0B0B22", "#18002C"]} style={localStyles.gradient}>
        <SafeAreaView style={localStyles.safeArea}>
          <StatusBar backgroundColor="#0D1B2A" barStyle="light-content" />
          <View style={localStyles.centered}>
            <ActivityIndicator size="large" color="#7FB3FF" />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={["#1b1c3a", "#0a0e23"]} style={localStyles.gradient}>
        <SafeAreaView style={localStyles.safeArea}>
          <StatusBar backgroundColor="#0D1B2A" barStyle="light-content" />
          <View style={localStyles.centered}>
            <Text style={localStyles.errorText}>🚀 {error}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!data) return null;

  return (
    <LinearGradient colors={["#0B0B22", "#18002C"]} style={localStyles.gradient}>
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
            <Text style={localStyles.descriptionIntro}>
              Aqui está a descrição da imagem escolhida
            </Text>
          </AnimatedReanimated.View>

          <AnimatedReanimated.View entering={FadeIn.delay(1200).duration(700)}>
            <ImageTitle title={data.title} description={data.explanation} />
          </AnimatedReanimated.View>

          <AnimatedReanimated.View entering={FadeIn.delay(300).duration(600)}>
            <ButtonBackCateg />
          </AnimatedReanimated.View>

          <SpotifyButton mood={categoria} imageTitle={data.title} />

          <FavoriteButton
            image={data}
            favorito={favorito}
            setFavorito={toggleFavorito}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}