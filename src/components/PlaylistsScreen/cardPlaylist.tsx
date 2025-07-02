import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { cardPlaylist } from "./stylesPlaylist";

interface CardPlaylistProps {
    title: string;
    img: string;
}

export function CardPlaylist({title, img}: CardPlaylistProps){
    return (
        <TouchableOpacity style={cardPlaylist.container}>
            <Image style={cardPlaylist.img} alt="capa da playlist" source={{uri: (img)}}></Image>
            <View style = {cardPlaylist.viewGeral}> 
                <Text style={cardPlaylist.title}>
                    {title}
                </Text>
                
                <Text style = {cardPlaylist.descriptionTxt}>Playlist • App</Text>   {/*Mudar o App para o nome do user */}
                
            </View>
            
        </TouchableOpacity>
    )
}
