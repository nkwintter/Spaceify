import { Text, TouchableOpacity } from "react-native";

interface CardPlaylistProps {
    title: string
}

export function CardPlaylist({title}: CardPlaylistProps){
    return (
        <TouchableOpacity>
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    )
}