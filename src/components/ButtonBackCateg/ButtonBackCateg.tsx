import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { styles } from './ButtonBackCategStyle';

export default function ButtonBackCateg() {
  const rotation = useSharedValue(0);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handlePress = () => {
    rotation.value = withTiming(rotation.value + 360, { duration: 500 });
    console.log('Voltar para Categorias (em breve com navegação)');
  };

  return (
    <Animated.View entering={FadeInLeft.duration(700)}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Animated.View style={[styles.icon, animatedIconStyle]}>
          <Ionicons name="rocket-sharp" size={20} color="#000" />
        </Animated.View>
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}