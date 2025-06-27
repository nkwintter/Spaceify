import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpotifyAuthProvider } from '../Spaceify/src/context/SpotifyAuthProvider.tsx';
import LoginScreen from './src/screens/LoginScreen';
// import HomeScreen from './src/screens/HomeScreen'; // LEMBRAR DPS DE ATUALIZAR

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SpotifyAuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SpotifyAuthProvider>
  );
}