import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSpotifyAuth } from '../../context/SpotifyAuthProvider.tsx';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../screens/LoginScreen/styles';

const LoginScreen = () => {
  const { login, isAuthenticated } = useSpotifyAuth();
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated]);

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

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>CONECTAR-SE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;