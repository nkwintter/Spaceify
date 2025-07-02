import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpotifyAuthProvider } from './src/context/SpotifyAuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SpotifyCallback from '../Spaceify/src/callback/Spotify/SpotifyCallback';
import Profile from './src/screens/profile/Profile';
// import HomeScreen from './src/screens/HomeScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImagemDetalhes from './src/screens/ImagemDetalhes/imagemDetalhes';
import { PlaylistsScreen } from './src/screens/playlistScreen';

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
          <Stack.Screen name="Playlists" component={PlaylistsScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SpotifyAuthProvider> 

/* 
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./src/context/ThemeContext";
import HomeScreenPlaceholder from "./src/screens/HomeScreenPlaceholder";
import MoodsScreen from "./src/screens/MoodsScreen";
import PlaylistScreenPlaceholder from "./src/screens/PlaylistScreenPlaceholder";
import DetailsScreenPlaceholder from "./src/screens/DetailsScreenPlaceholder";
import ProfilePlaceholder from "./src/screens/ProfileScreenPlaceholder";
import type { RootStackParamList } from "./src/navigation/types";
import { useFonts, Tomorrow_400Regular, Tomorrow_700Bold } from "@expo-google-fonts/tomorrow";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Tomorrow_400Regular,
    Tomorrow_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#00A8FF" size="large" />
      </View>
    );
  }
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreenPlaceholder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreenPlaceholder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Moods"
            component={MoodsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Playlist"
            component={PlaylistScreenPlaceholder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfilePlaceholder}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
		*/ 

  );
}