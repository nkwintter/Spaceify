import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  LayoutAnimation,
  
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './ImageTitleStyle';


type Props = {
  title: string;
  description: string;
};

export default function ImageTitle({ title, description }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <LinearGradient
      colors={['#2a2d5a', '#1b1c3a']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.nomeImagem}>🌌 {title}</Text>

      <Text
        style={styles.descricao}
        numberOfLines={expanded ? undefined : 4}
      >
        {description}
      </Text>

      <TouchableOpacity onPress={toggleExpanded} style={styles.verMaisBtn}>
        <Text style={styles.verMaisTexto}>
          {expanded ? 'Ver menos ▲' : 'Ver mais ▼'}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}