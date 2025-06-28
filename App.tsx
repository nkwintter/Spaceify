import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImagemDetalhes from './src/screens/ImagemDetalhes/imagemDetalhes';

export default function App() {

  return (
    <SafeAreaProvider>
          <ImagemDetalhes />
    </SafeAreaProvider>
  );
}