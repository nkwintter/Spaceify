import { StyleSheet, Text, View, FlatList } from 'react-native';
import { playlistStyles } from './styles';
import { CardPlaylist } from '../../components/cardPlaylist';

export function PlaylistsScreen() {

    const playlists = [
        'Playlist 1',
        'Playlist 2',
    ]

    return (
        <View style={playlistStyles.container}>
            <Text style={playlistStyles.title}>Playslists Astrais</Text>

            {playlists.length != 0 ?
                <FlatList
                    data={playlists}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <CardPlaylist title={item} />
                    }
                ></FlatList>
                :
                <Text style={playlistStyles.title}>Você ainda não possui playlists Astrais</Text>
            }

        </View>
    )
}