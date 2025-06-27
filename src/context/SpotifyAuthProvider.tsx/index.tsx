import React, { createContext, useContext, useEffect, useState } from 'react';
import { authorize, refresh, AuthConfiguration } from 'react-native-app-auth';
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

const config: AuthConfiguration = {
  clientId: '31a4444d5e0542a69db4049886453097',//CONFERIR CLIENTE ID 31a4444d5e0542a69db4049886453097
  redirectUrl: 'com.spaceify://oauthredirect', // CONFERIR  A URL'S 
  scopes: ['user-read-email', 'user-read-private', 'playlist-read-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};


export const SpotifyAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@spotify_token');
      const storedUser = await AsyncStorage.getItem('@spotify_user');

      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar o Token: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      const authState = await authorize(config);
      setToken(authState.accessToken);
      await AsyncStorage.setItem('@spotify_token', authState.accessToken);

      const response = await fetch('https://api.spotify.com/v1/me', {//conferir
        headers: { Authorization: `Bearer ${authState.accessToken}` },
      });

      const userData = await response.json();
      setUser(userData);
      await AsyncStorage.setItem('@spotify_user', JSON.stringify(userData));
    } catch (err) {
      console.error('Erro ao logar com Spotify:', err);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem('@spotify_token');
      await AsyncStorage.removeItem('@spotify_user');
    } catch (err) {
      console.error('Erro ao efetuar o logout:', err);
    }
  };

  return (
    <SpotifyAuthContext.Provider
      value={{ token, user, isLoading, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};