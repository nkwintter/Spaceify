import { Text, TouchableOpacity } from "react-native";
import { btnGerarPlaylist } from "./stylesPlaylist";
import { GenerateTracks } from "../../services/generateTracks.Service";

export function BtnGerarPlaylistAstral(){
    return(
        <TouchableOpacity style = {btnGerarPlaylist.container} onPress={() => GenerateTracks("agitado", "Nebulosa do carangueijo")}>
            <Text style = {btnGerarPlaylist.txt}>➕ Nova Playlist Astral  🎧</Text>
        </TouchableOpacity>
    )
}
