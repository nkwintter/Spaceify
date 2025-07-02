import { Text, TouchableOpacity, View } from "react-native";
import { btnGerarPlaylist } from "./stylesPlaylist";
import { handleCreatePlaylist } from "../../services/playlistApi.service";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSpotifyAuth } from '../../context/SpotifyAuthContext';

export function BtnGerarPlaylistAstral() {
  const { user, token } = useSpotifyAuth();

  const handleClick = () => {
    handleCreatePlaylist({
      mood: "agitado",
      imageTitle: "Nebulosa do carangueijo",
      user,
      token
    });
  };

  return (
    <TouchableOpacity style={btnGerarPlaylist.container} onPress={handleClick}>
      <View style={btnGerarPlaylist.alinhamentoItens}>
        <MaterialIcons name="add" size={35} color="white" style={btnGerarPlaylist.icon} />
        <Text style={btnGerarPlaylist.txt}> Nova Playlist Astral </Text>
      </View>
    </TouchableOpacity>
  );
}
