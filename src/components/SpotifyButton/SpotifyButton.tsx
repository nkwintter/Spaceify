import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './SpotifyButtonStyle';
import { handleCreatePlaylist } from '../../services/playlistApi.service';

interface SpotifyButtonProps {
  mood: string;
  imageTitle: string;
}

export default function SpotifyButton({ mood, imageTitle }: SpotifyButtonProps) {
  const { token, user, isAuthenticated } = useSpotifyAuth();

  const handlePress = async () => {
    if (!isAuthenticated || !user || !token) {
      console.warn('Usuário não autenticado no Spotify!');
      return;
    }

    await handleCreatePlaylist({ mood, imageTitle, user, token });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button} activeOpacity={0.8}>
      <View style={styles.content}>
        <Ionicons name="musical-notes" size={22} color="#000" style={styles.icon} />
        <Text style={styles.text}>Ouvir playlist no Spotify</Text>
      </View>
    </TouchableOpacity>
  );
}
function useSpotifyAuth(): { token: any; user: any; isAuthenticated: any; } {
  throw new Error('Function not implemented.');
}

