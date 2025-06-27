import React from 'react';
import { Image } from 'react-native';
import { styles } from './ImageViewerStyle';

type Props = {
  url: string;
};

export default function ImageViewer({ url }: Props) {
  return <Image source={{ uri: url }} style={styles.imagem} resizeMode="cover" />;
}