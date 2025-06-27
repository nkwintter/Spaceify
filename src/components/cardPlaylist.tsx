import { Text, TouchableOpacity } from "react-native";


export function CardPlaylist({title}){
    return (
        <TouchableOpacity>
            <Text>
                {title}
            </Text>
        </TouchableOpacity>
    )
}