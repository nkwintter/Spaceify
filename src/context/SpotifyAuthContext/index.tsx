// SpotifyAuthContext.tsx - Versão corrigida e completa
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string }>;
  followers: { total: number };
  country: string;
}

interface SpotifyAuthContextType {
  token: string | null;
  user: SpotifyUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const SpotifyAuthContext = createContext<SpotifyAuthContextType | null>(null);

export const useSpotifyAuth = () => {
  const context = useContext(SpotifyAuthContext);
  if (!context) {
    throw new Error('useSpotifyAuth deve ser usado dentro de um SpotifyAuthProvider');
  }
  return context;
};

export const SpotifyAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Client ID do seu app Spotify
  const CLIENT_ID = '31a4444d5e0542a69db4049886453097';

  // Configuração do AuthSession
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  // // Redirect URI usando o scheme do seu app
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'spaceify',
  });

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      await loadFromStorage();
    } catch (error) {
      console.error('Erro na inicialização:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@spotify_token');
      const storedUser = await AsyncStorage.getItem('@spotify_user');
      const storedExpiration = await AsyncStorage.getItem('@spotify_token_expiration');

      if (storedToken) {
        // Verificar se o token expirou
        if (storedExpiration) {
          const expirationTime = parseInt(storedExpiration);
          if (Date.now() > expirationTime) {
            console.log('Token expirado, removendo...');
            await clearStoredData();
            return;
          }
        }

        // Validar token fazendo uma requisição
        const isValid = await validateToken(storedToken);
        if (isValid) {
          setToken(storedToken);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        } else {
          await clearStoredData();
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do storage:', error);
      await clearStoredData();
    }
  };

  const clearStoredData = async () => {
    try {
      await AsyncStorage.multiRemove([
        '@spotify_token',
        '@spotify_user',
        '@spotify_token_expiration'
      ]);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  };

  const validateToken = async (accessToken: string): Promise<boolean> => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.text(); 
      console.log('Resposta da API /me:', result);

      if (response.status === 401) {
        console.log('Token inválido ou expirado');
        return false;
      }

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        await AsyncStorage.setItem('@spotify_user', JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  };

  const login = async () => {
  try {
    setIsLoading(true);

    console.log('Iniciando login do Spotify...');
    console.log('Redirect URI:', redirectUri);

    const request = new AuthSession.AuthRequest({
      clientId: CLIENT_ID,
      scopes: [
        'user-read-email',
        'user-read-private',
        'playlist-read-private',
        'playlist-read-collaborative',
        'user-library-read',
        'user-top-read',
        'streaming',
        'user-read-playback-state',
        'user-modify-playback-state',
        'playlist-modify-public',     
        'playlist-modify-private'
      ],
      usePKCE: true,
      responseType: AuthSession.ResponseType.Code,
      redirectUri,
      state: Math.random().toString(36).substring(7),
    });

    await request.makeAuthUrlAsync(discovery); // Gera a URL antes de pedir autenticação

    const result = await request.promptAsync(discovery);

    console.log('Resultado da autenticação:', result.type);

    if (result.type === 'success' && result.params.code) {
      const tokenResponse = await AuthSession.exchangeCodeAsync(
        
        {
          clientId: CLIENT_ID,
          code: result.params.code,
          redirectUri,
          extraParams: {
            code_verifier: request.codeVerifier!,
            show_dialog: 'true',
          },
        },
        discovery,
      );

      // const { access_token, expires_in } = tokenResponse;
      const access_token = tokenResponse.accessToken;
      const expires_in = tokenResponse.expiresIn;


      if (access_token) {
        console.log('Token recebido com sucesso');

        setToken(access_token);
        await AsyncStorage.setItem('@spotify_token', access_token);

        if (expires_in) {
          const expirationTime = Date.now() + expires_in * 1000;
          await AsyncStorage.setItem('@spotify_token_expiration', expirationTime.toString());
        }

        await fetchUserData(access_token);

        console.log('Login concluído com sucesso');
      } else {
        throw new Error('Token não recebido após troca do código');
      }

    } else if (result.type === 'error') {
      console.error('Erro na autenticação:', result.error);
      Alert.alert('Erro', 'Falha na autenticação com Spotify');
    } else if (result.type === 'cancel') {
      console.log('Login cancelado pelo usuário');
    }
  } catch (error) {
    console.error('Erro durante o login:', error);
    Alert.alert('Erro', 'Ocorreu um erro durante o login');
  } finally {
    setIsLoading(false);
  }
};


  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        await AsyncStorage.setItem('@spotify_user', JSON.stringify(userData));
        console.log('Dados do usuário carregados:', userData.display_name);
      } else {
        console.error('Erro ao buscar dados do usuário:', response.status);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const refreshUser = async () => {
    if (token) {
      await fetchUserData(token);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await clearStoredData();
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro durante o logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    token,
    user,
    isLoading,
    isAuthenticated: !!token,
    login,
    logout,
    refreshUser
  };

  return (
    <SpotifyAuthContext.Provider value={value}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};