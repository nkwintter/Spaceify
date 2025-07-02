import { StyleSheet } from "react-native";

export const cardPlaylist = StyleSheet.create({
    
    container:{
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#5e34d2b4',
        padding: 5,
        flexDirection: 'row',
        borderTopRightRadius: 50,
        borderEndEndRadius: 50,
        
    },

    img:{
        margin: 5,
        width: 65,
        height: 65,
        borderRadius: 5,
    },

    viewGeral:{
        justifyContent: 'center',
        marginLeft: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 5,
    },

    descriptionTxt: {
        fontSize: 15,
        color: '#fff',
    }

})

export const btnGerarPlaylist = StyleSheet.create({
    container:{
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#1338cc',
        padding: 10,
        borderRadius: 50,
        maxWidth: '75%',
    },

    alinhamentoItens:{
        flexDirection: 'row'
    },

    txt:{
        marginRight: 10,
        marginVertical: 8,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        
    },

    icon:{
        margin: 5,
    }

})