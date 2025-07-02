import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpotifyAuthProvider } from './src/context/SpotifyAuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SpotifyCallback from '../Spaceify/src/callback/Spotify/SpotifyCallback';
import Profile from './src/screens/profile/Profile';
import { ThemeProvider } from './src/context/ThemeContext'; 
import Home from './src/screens/Home/home';

import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MoodProvider } from './src/contexts/moodContexts';
import ImagemDetalhes from './src/screens/ImagemDetalhes/imagemDetalhes';
import { PlaylistsScreen } from './src/screens/playlistScreen';
import MoodsScreen from './src/screens/MoodsScreen';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    // LIMPAR ASYNCSTORAGE:
    // useEffect(() => {
    //   AsyncStorage.clear().then(() => {
    //     console.log('AsyncStorage limpo com sucesso');
    //   });
    // }, [])

    <ThemeProvider>
      <SpotifyAuthProvider>
         <MoodProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SpotifyCallback" component={SpotifyCallback} />
            <Stack.Screen name="Playlists" component={PlaylistsScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ImagemDetalhes" component={ImagemDetalhes} />
            <Stack.Screen name="MoodsScreen" component={MoodsScreen} />

             <Stack.Screen name="Home" component={Home} /> 
          </Stack.Navigator>
        </NavigationContainer>
       </MoodProvider>
      </SpotifyAuthProvider>
    </ThemeProvider> 
  );
}




