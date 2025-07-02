// BtnGerarPlaylistAstral.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { btnGerarPlaylist } from "./stylesPlaylist";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSpotifyAuth } from '../../context/SpotifyAuthContext';
import { handleCreatePlaylist } from '../../services/playlistApi.service';

interface Props {
  onStart?: () => void;
  onFinish?: () => void;
}

export function BtnGerarPlaylistAstral({ onStart, onFinish }: Props) {
  const { user, token } = useSpotifyAuth();

  const handlePress = async () => {
    onStart?.(); 

    await handleCreatePlaylist({
      mood: 'agitado',
      imageTitle: 'Nebulosa do carangueijo',
      user,
      token,
    });

    onFinish?.(); 
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
