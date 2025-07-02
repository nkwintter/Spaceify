import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../callback/Spotify/styles';

interface SpotifyCallbackParams {
  access_token?: string;
  refresh_token?: string;
  error?: string;
  error_description?: string;
}

interface RouteParams {
  params?: SpotifyCallbackParams;
}

const SpotifyCallback: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Obter parâmetros da navegação 
        const routeParams = (route.params as RouteParams)?.params;

        if (routeParams?.access_token) {
          // Salvar token no AsyncStorage
          await AsyncStorage.setItem('@spotify_token', routeParams.access_token);

          // Salvar outros dados úteis se disponíveis
          if (routeParams.refresh_token) {
            await AsyncStorage.setItem('@spotify_refresh_token', routeParams.refresh_token);
          }

          // Navegar de volta para a tela principal
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' as never }],
          });

        } else if (routeParams?.error) {
          console.error('Erro na autenticação do Spotify:', routeParams.error);
          console.error('Descrição do erro:', routeParams.error_description);

          // Navegar de volta para a tela de login
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
          });
        } else {
          // Se não há parâmetros, pode ser um erro
          console.warn('Nenhum parâmetro recebido no callback');

          // Aguardar um pouco antes de redirecionar 
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' as never }],
            });
          }, 3000);
        }

      } catch (error) {
        console.error('Erro ao processar callback do Spotify:', error);

        // Em caso de erro, navega para login
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
      }
    };

    // Pequeno delay para garantir que os parâmetros foram carregados
    const timer = setTimeout(handleCallback, 1000);

    return () => clearTimeout(timer);
  }, [navigation, route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎵</Text>
        <Text style={styles.title}>Conectando com Spotify</Text>
        <Text style={styles.subtitle}>Aguarde um momento...</Text>

        <ActivityIndicator
          size="large"
          color="#1DB954"
          style={styles.loader}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Processando autenticação</Text>
        </View>
      </View>
    </View>
  );
};

export default SpotifyCallback;