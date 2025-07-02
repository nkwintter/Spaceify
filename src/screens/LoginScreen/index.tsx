import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useSpotifyAuth } from '../../context/SpotifyAuthContext';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../screens/LoginScreen/styles';

const LoginScreen = () => {
  const { login, isAuthenticated, isLoading } = useSpotifyAuth();
  const navigation = useNavigation<any>();
  const [isConnecting, setIsConnecting] = useState(false);

  // Redirecionar para Home se já estiver autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      console.log('✅ Usuário autenticado, navegando para Home...');
      navigation.replace('Profile');//navigation.replace('Playlists'); // Usar replace em vez de navigate
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    try {
      setIsConnecting(true);
      console.log('Iniciando processo de login...');

      await login();

    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert(
        'Erro de Conexão',
        'Não foi possível conectar com o Spotify. Tente novamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/astronauta.png')}
        style={styles.astronaut}
        resizeMode="contain"
      />

      <Text style={styles.title}>SPACEFY</Text>

      <View style={styles.card}>
        <Image
          source={require('../../assets/spotify-logo.png')}
          style={styles.spotifyLogo}
          resizeMode="contain"
        />

        <Text style={styles.cardText}>conecte a sua conta Spotify</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isConnecting || isLoading}
        >
          {isConnecting ? (
            <>
              <ActivityIndicator size="small" color="#ffffff" />
              <Text style={styles.buttonText}> CONECTANDO...</Text>
            </>
          ) : (
            <Text style={styles.buttonText}>CONECTAR-SE</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;