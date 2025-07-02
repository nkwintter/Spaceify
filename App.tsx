
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpotifyAuthProvider } from './src/context/SpotifyAuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SpotifyCallback from '../Spaceify/src/callback/Spotify/SpotifyCallback';
import Profile from './src/screens/profile/Profile';
import { ThemeProvider } from './src/context/ThemeContext';
// import HomeScreen from './src/screens/HomeScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImagemDetalhes from './src/screens/ImagemDetalhes/imagemDetalhes';
import { PlaylistsScreen } from './src/screens/playlistScreen';

const Stack = createNativeStackNavigator();


export default function App() {


  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}