import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './ImageTitleStyle';

type Props = {
  title: string;
  description: string;
};

export default function ImageTitle({ title, description }: Props) {
  return (
    <View>
      <Text style={styles.nomeImagem}>🌠 {title}</Text>
      <Text style={styles.descricao}>{description}</Text>
    </View>
  );
}