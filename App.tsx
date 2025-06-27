import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpotifyAuthProvider } from '../Spaceify/src/context/SpotifyAuthProvider.tsx';
import LoginScreen from './src/screens/LoginScreen';
// import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    function App() {
      return (
        <SpotifyAuthProvider>
          <LoginScreen />
        </SpotifyAuthProvider>
      );
    }
  );
}