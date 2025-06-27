import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles.js';

const CLIENT_ID = 'SEU_CLIENT_ID'; // substitua pelo seu

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
};

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['user-read-email', 'user-read-private'],
      responseType: AuthSession.ResponseType.Token,
      redirectUri: AuthSession.makeRedirectUri({
        scheme: 'spaceify',
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      console.log('Token obtido:', access_token);
      navigation.navigate('Home', { token: access_token });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/astronauta.png')}
        style={styles.image}
      />
      <Text style={styles.title}>SPACEFY</Text>

      <View style={styles.card}>
        <Image
          source={require('../../assets/spotify-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>conecte a sua conta Spotify</Text>

        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
          <Text style={styles.buttonText}>CONECTAR-SE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
