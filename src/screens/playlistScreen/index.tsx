import { Text, View, FlatList } from 'react-native';
import { playlistStyles } from './styles';
import { CardPlaylist } from '../../components/PlaylistsScreen/cardPlaylist';
import { LinearGradient } from 'expo-linear-gradient';
import { BtnGerarPlaylistAstral } from '../../components/PlaylistsScreen/btnGerarPlaylist';

export function PlaylistsScreen() {

    //para testes...
    const playlists: string | ArrayLike<any> | null | undefined = [
        // 'Playlist 1',
        // 'Playlist 2',
    ]

    return (
        <LinearGradient
            colors={['#0b0330', '#15084f', '#4c23c7']}
            style={playlistStyles.container}>

            <Text style={playlistStyles.title}>Playslists Astrais</Text>

            {playlists.length != 0 ?
                <FlatList
                    data={playlists}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <CardPlaylist title={item} img={'https://i.postimg.cc/Y9sHGTx0/A7X-Logo.jpg'} />
                    }
                ></FlatList>
                :
                <View style={playlistStyles.viewElse}>
                    <Text style={playlistStyles.titleElse}>Você ainda não possui playlists Astrais</Text>
                    <BtnGerarPlaylistAstral />
                </View>

            }
        </LinearGradient>
    )
}