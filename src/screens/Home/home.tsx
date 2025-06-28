import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import nebulosa from '../../assets/nebulosa.jpg'; 

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Título */}
      <Text style={styles.title}>Imagem do Dia</Text>

      {/* Imagem da NASA */}
      <View style={styles.imageContainer}>
        <Image
          source={nebulosa}
          style={styles.image}
        />
        <View style={styles.imagePorCima}>
        <Text style={styles.imageTitle}>Nebulosa da Borboleta</Text>
        <Text style={styles.imageDate}>25 de junho de 2025</Text>
        <Text style={styles.imageDescription}>
          Uma vasta nuvem de gás e poeira em forma de asas, iluminada por uma estrela moribunda.
        </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.listenButton}>
        <Icon name="headset" size={20} color="#fff" />
        <Text style={styles.listenButtonText}>Ouvir o Universo</Text>
      </TouchableOpacity>

      {/* Mood Atual */}
      <View style={styles.moodContainer}>
        <Text style={styles.moodLabel}>Mood Atual</Text>
        <View style={styles.moodRow}>
          <Text style={styles.moodText}>🌍 Exploração Cósmica</Text>
          <TouchableOpacity>
            <Text style={styles.changeMood}>Trocar mood</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Favoritos Recentes */}
      <Text style={styles.favoritesTitle}>Favoritos Recentes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoritesScroll}>
        {['Meteoros', 'Estelar', 'Violeta', 'Galáctico'].map((name, index) => (
          <View key={index} style={styles.favoriteCard}>
            <Image
              style={styles.favoriteImage}
            />
            <Text style={styles.favoriteText}>{name}</Text>
          </View>
        ))}
      </ScrollView>

    </ScrollView>
  );
}
