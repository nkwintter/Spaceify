import { Text, TouchableOpacity, View } from "react-native";
import { btnGerarPlaylist } from "./stylesPlaylist";
import { handleCreatePlaylist } from "../../services/playlistApi.service";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export function BtnGerarPlaylistAstral() {
    return (
        <TouchableOpacity style={btnGerarPlaylist.container} onPress={() => handleCreatePlaylist({mood:"agitado", imageTitle: "Nebulosa do carangueijo"})}>
            <View>
                <MaterialIcons name="add" size={40} color="white" />
                <Text style={btnGerarPlaylist.txt}> Nova Playlist Astral  🎧</Text>
            </View>
            
        </TouchableOpacity>
    )
}
