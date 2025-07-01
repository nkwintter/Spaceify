import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './SpotifyButtonStyle';
import { Ionicons } from '@expo/vector-icons';

export default function SpotifyButton() {
  const handlePress = () => {
    // Lógica para abrir playlist do Spotify (em breve)
    console.log('Abrir Spotify 🎵');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button} activeOpacity={0.8}>
      <View style={styles.content}>
        <Ionicons name="musical-notes" size={22} color="#000" style={styles.icon} />
        <Text style={styles.text}>Ouvir playlist no Spotify </Text>
      </View>
    </TouchableOpacity>
  );
}
