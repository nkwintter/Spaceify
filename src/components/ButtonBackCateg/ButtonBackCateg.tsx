import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInLeft,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { styles } from './ButtonBackCategStyle';

type RootStackParamList = {
  MoodsScreen: undefined;
  ImagemDetalhes: { item: any };
};

export default function ButtonBackCateg() {
  const rotation = useSharedValue(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handlePress = () => {
  rotation.value = withTiming(rotation.value + 360, { duration: 500 });
  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MoodsScreen' }],
    });
  }, 300);
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