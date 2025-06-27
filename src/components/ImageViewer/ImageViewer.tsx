import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './ImageViewerStyle';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Props {
  url: string;
}

export default function ImageViewer({ url }: Props) {
  return (
    <Animated.View entering={FadeIn.duration(700)}>
      <View style={styles.container}>
        <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
      </View>
    </Animated.View>
  );
}