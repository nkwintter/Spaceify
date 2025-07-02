import axios from "axios";
import { Linking, Alert } from 'react-native';
interface Props {
  mood: string;
  imageTitle: string;
  user: any;
  token: string | null;
}

export const handleCreatePlaylist = async ({ mood, imageTitle, user, token }: Props) => {
  try {
    const response = await axios.post('http://192.168.1.51:3001/generate-playlist', {
      mood,
      imageTitle
    });

    const tracks = response.data;

    const playlistResponse = await axios.post('http://192.168.1.51:3001/create-user-playlist', {
      tracks,
      playlistName: `${mood} - ${imageTitle}`,
      user_id: user?.id,
      access_token: token
    });

    const playlistUrl = playlistResponse.data.playlistUrl;
    Linking.openURL(playlistUrl);

  } catch (error) {
    console.error('Erro ao gerar playlist:', error);
    Alert.alert('Erro', 'Não foi possível gerar a playlist.');
  }
};
