import React from "react";
import { Text, TouchableOpacity, Image, View, Linking } from "react-native";
import { cardPlaylist } from "./stylesPlaylist";
import { PlaylistItem } from "../../screens/playlistScreen";


export function CardPlaylist({ title, img, url }: PlaylistItem) {
    return (
        <TouchableOpacity style={cardPlaylist.container}>
            <Image style={cardPlaylist.img} alt="capa da playlist" source={{ uri: (img) || 'https://i.postimg.cc/DywJcn9G/image.png'}}></Image>
            <View style={cardPlaylist.viewGeral}>
                <Text style={cardPlaylist.title}>
                    {title || 'Sem título'}
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL(url)}>
                    <Text style={cardPlaylist.linkTxt}>
                        Acessar no Spotify 
                    </Text>
                </TouchableOpacity>

                <Text style={cardPlaylist.descriptionTxt}>• Playlist </Text>  {/*Mudar o App para o nome do user */}

            </View>

        </TouchableOpacity>
    )
}
