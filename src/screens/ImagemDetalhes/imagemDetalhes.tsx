import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './imagemDetalhesStyle';
import { Ionicons } from '@expo/vector-icons';
import ImageViewer from '../../components/ImageViewer/ImageViewer';
import ImageTitle from '../../components/ImageTitle/ImageTitle';
import SpotifyButton from '../../components/SpotifyButton/SpotifyButton';
import FavoriteButton from '../../components/FavoriteButton/favoriteButton';
import { ImageData } from '../../types/types';


type Props = {
  data: ImageData;
};

export default function ImagemDetalhes({ data }: Props) {
  const [favorito, setFavorito] = useState(false);
  const toggleFavorito = () => setFavorito(!favorito);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        <Ionicons name="planet" size={24} color="#7FB3FF" /> Detalhes da Imagem
      </Text>

      <ImageViewer url={data.url} />
      <ImageTitle title={data.title} description={data.explanation} />
      <SpotifyButton />
      <FavoriteButton favorito={favorito} toggleFavorito={toggleFavorito} />
    </View>
  );
}