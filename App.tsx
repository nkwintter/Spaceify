import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MoodProvider } from './src/contexts/moodContexts';
import ImagemDetalhes from './src/screens/ImagemDetalhes/imagemDetalhes';
import Home from './src/screens/Home/home';
export default function App() {

  return (
    <SafeAreaProvider>
      <MoodProvider>
          <Home/>
      </MoodProvider>
    </SafeAreaProvider>
  );
}