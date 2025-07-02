import { StyleSheet } from "react-native";

export const playlistStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#4c23c7',
        padding: 20,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        top: 0, 
        bottom: 0,
    },
    
    title :{
        padding: 10,
        alignSelf: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },

    list : {
        
    },

    viewElse:{
        alignItems: "center",
        justifyContent:'center',

    },

    titleElse :{
        padding: 10,
        alignSelf: 'center',
        fontSize: 23,
        color: '#fff',
        textAlign: 'center'
    },
})