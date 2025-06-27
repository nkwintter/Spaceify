import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './SpotifyButtonStyle';

export default function SpotifyButton() {
  return (
    <TouchableOpacity style={styles.botaoSpotify}>
      <Ionicons name="musical-notes" size={20} color="#fff" />
      <Text style={styles.textoBotao}>Ouvir no Spotify</Text>
    </TouchableOpacity>
  );
}