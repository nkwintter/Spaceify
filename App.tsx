import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MoodProvider } from './src/contexts/moodContexts';
import ImagemDetalhes from './src/screens/ImagemDetalhes/imagemDetalhes';
import Home from './src/screens/Home/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <SafeAreaProvider>
      <MoodProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ImagemDetalhes" component={ImagemDetalhes} />
          </Stack.Navigator>
        </NavigationContainer>
      </MoodProvider>
    </SafeAreaProvider>
  );
}