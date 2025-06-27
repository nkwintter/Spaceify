import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImagemDetalhes from './src/screens/ImagemDetalhes/imagemDetalhes';

export default function App() {
  const imagemMock = {
    url: 'https://apod.nasa.gov/apod/image/2406/Messier78_Hubble_960.jpg',
    title: 'Messier 78 – Uma nebulosa em Órion',
    explanation:
      'Messier 78 é uma nebulosa de reflexão na constelação de Órion, composta por poeira e gás que reflete a luz das estrelas próximas.',
  };

  return (
    <SafeAreaProvider>
          <ImagemDetalhes />
    </SafeAreaProvider>
  );
}