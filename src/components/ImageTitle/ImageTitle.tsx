import React, { useState } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { styles } from './ImageTitleStyle';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

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
    <View>
      <Text style={styles.nomeImagem}>🌠 {title}</Text>

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
    </View>
  );
}