import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SpotifyAuthContextType {
  token: string | null;
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
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
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configuração do AuthSession
  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'spaceify', // Nome do seu app
    path: 'redirect'
  });

  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@spotify_token');
      const storedUser = await AsyncStorage.getItem('@spotify_user');

      if (storedToken) {
        setToken(storedToken);
        // Verificar se o token ainda é válido
        await validateToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateToken = async (accessToken: string) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 401) {
        // Token expirado
        await logout();
        return false;
      }

      return response.ok;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);

      const request = new AuthSession.AuthRequest({
        clientId: '31a4444d5e0542a69db4049886453097',
        scopes: [
          'user-read-email',
          'user-read-private',
          'playlist-read-private',
          'playlist-read-collaborative',
          'user-library-read',
          'user-top-read'
        ],
        usePKCE: false,
        responseType: AuthSession.ResponseType.Token,
        redirectUri: redirectUri,
      });

      console.log('Redirect URI:', redirectUri);

      const result = await request.promptAsync(discovery);

      console.log('Auth result:', result);

      if (result.type === 'success') {
        const { access_token } = result.params;

        if (access_token) {
          setToken(access_token);
          await AsyncStorage.setItem('@spotify_token', access_token);

          const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${access_token}` },
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUser(userData);
            await AsyncStorage.setItem('@spotify_user', JSON.stringify(userData));
            console.log('Login realizado com sucesso:', userData.display_name);
          } else {
            console.error('Erro ao buscar dados do usuário:', userResponse.status);
          }
        }
      } else if (result.type === 'error') {
        console.error(' Erro na autenticação:', result.error);
      } else {
        console.log(' Login cancelado pelo usuário');
      }
    } catch (error) {
      console.error(' Erro durante o login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem('@spotify_token');
      await AsyncStorage.removeItem('@spotify_user');
      console.log(' Logout realizado com sucesso');
    } catch (error) {
      console.error(' Erro durante o logout:', error);
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
    logout
  };

  return (
    <SpotifyAuthContext.Provider value={value}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};