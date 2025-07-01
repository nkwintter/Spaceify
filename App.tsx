import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpotifyAuthProvider } from './src/context/SpotifyAuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SpotifyCallback from '../Spaceify/src/callback/Spotify/SpotifyCallback';
// import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SpotifyAuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SpotifyCallback" component={SpotifyCallback} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SpotifyAuthProvider>
  );
}