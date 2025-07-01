import axios from 'axios';
import { useSpotifyAuth } from '../../context/SpotifyAuthContext';
import { Linking, Alert } from 'react-native';

interface Props {
  mood: string;
  imageTitle: string;
}

export const handleCreatePlaylist = ({ mood, imageTitle }: Props) => {
  const { user, token } = useSpotifyAuth();

  const handleGenerate = async () => {
    try {
      
      const response = await axios.post('http://localhost:3001/generate-playlist', {
        mood,
        imageTitle
      });

      //lista com as músicas [{name: , artist: }...]
      const tracks = response.data; 

      const playlistResponse = await axios.post('http://localhost:3001/create-user-playlist', {
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
  }
};