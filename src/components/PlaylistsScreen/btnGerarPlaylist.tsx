// BtnGerarPlaylistAstral.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { btnGerarPlaylist } from "./stylesPlaylist";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSpotifyAuth } from '../../context/SpotifyAuthContext';
import { handleCreatePlaylist } from '../../services/playlistApi.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  onStart?: () => void;
  onFinish?: () => void;
}

export function BtnGerarPlaylistAstral({ onStart, onFinish }: Props) {
  const { user, token } = useSpotifyAuth();

  const handlePress = async () => {
    onStart?.();

    try {
      const saved = await AsyncStorage.getItem('@ultima_escolha');
      if (!saved) {
        console.warn('Nenhuma escolha de imagem/mood encontrada.');
        return;
      }

      const { mood, imageTitle, imageUrl } = JSON.parse(saved);

      await handleCreatePlaylist({
        mood,
        imageTitle,
        imageUrl,
        user,
        token,
      });
    } catch (error) {
      console.error('Erro ao gerar playlist:', error);
    } finally {
      onFinish?.();
    }
  };

  return (
    <TouchableOpacity style={btnGerarPlaylist.container} onPress={handlePress}>
      <View style={btnGerarPlaylist.alinhamentoItens}>
        <MaterialIcons name="add" size={35} color="white" style={btnGerarPlaylist.icon} />
        <Text style={btnGerarPlaylist.txt}> Nova Playlist Astral </Text>
      </View>
    </TouchableOpacity>
  );
}
