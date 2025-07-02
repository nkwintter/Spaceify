import axios from "axios";
import { Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  mood: string;
  imageTitle: string;
  imageUrl: string;
  user: any;
  token: string | null;
}

export const handleCreatePlaylist = async ({ mood, imageTitle, imageUrl, user, token }: Props) => {
  try {
    const response = await axios.post('http://192.168.1.51:3001/generate-playlist', {
      mood,
      imageTitle
    });

    const tracks = response.data;

    const playlistResponse = await axios.post('http://192.168.1.51:3001/create-user-playlist', {
      tracks,
      playlistName: `${imageTitle}`,
      user_id: user?.id,
      access_token: token
    });

    const playlistUrl = playlistResponse.data.playlistUrl;
    // Linking.openURL(playlistUrl);

    const newPlaylist = {
      title: imageTitle,
      img: imageUrl, // ou algo dinâmico
      url: playlistUrl,
    };

    const saved = await AsyncStorage.getItem('@playlists');
    const playlists = saved ? JSON.parse(saved) : [];

    playlists.push(newPlaylist);

    await AsyncStorage.setItem('@playlists', JSON.stringify(playlists));
    console.log('Nova playlist salva:', newPlaylist);

  } catch (error) {
    console.error('Erro ao gerar playlist:', error);
    Alert.alert('Erro', 'Não foi possível gerar a playlist.');
  }
};
