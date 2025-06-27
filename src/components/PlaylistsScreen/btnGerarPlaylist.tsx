import { Text, TouchableOpacity } from "react-native";
import { btnGerarPlaylist } from "./stylesPlaylist";

export function BtnGerarPlaylistAstral(){
    return(
        <TouchableOpacity style = {btnGerarPlaylist.container}>
            <Text style = {btnGerarPlaylist.txt}>➕ Nova Playlist Astral  🎧</Text>
        </TouchableOpacity>
    )
}
