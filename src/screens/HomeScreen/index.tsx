import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSpotifyAuth } from '../../context/SpotifyAuthProvider.tsx';

const HomeScreen = () => {
  const { user, logout } = useSpotifyAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🎵 Bem-vindo à Home!</Text>
      <Text>Usuário: {user?.display_name ?? 'Desconhecido'}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

export default HomeScreen;