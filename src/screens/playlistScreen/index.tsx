// PlaylistsScreen.tsx
import React, { useCallback, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { playlistStyles } from './styles';
import { CardPlaylist } from '../../components/PlaylistsScreen/cardPlaylist';
import { LinearGradient } from 'expo-linear-gradient';
import { BtnGerarPlaylistAstral } from '../../components/PlaylistsScreen/btnGerarPlaylist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export interface PlaylistItem {
    title: string;
    img: string;
    url: string;
}

export function PlaylistsScreen() {
    const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    const loadPlaylists = async () => {
        try {
            setIsLoading(true);
            const saved = await AsyncStorage.getItem('@playlists');
            const parsed = saved ? JSON.parse(saved) : [];
            setPlaylists(parsed);
        } catch (error) {
            console.error('Erro ao carregar playlists:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPlaylists();
        }, [])
    );


    return (
        <LinearGradient
            colors={['#0b0330', '#15084f', '#4c23c7']}
            style={playlistStyles.container}
        >
            <Text style={playlistStyles.title}>Playslists Astrais</Text>

            {isLoading ? (
                <ActivityIndicator size="large" color="#69e7b8" style={{ marginTop: 40 }} />
            ) : playlists.length > 0 ? (
                <FlatList
                    data={playlists}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <CardPlaylist title={item.title} img={item.img} url={item.url} />
                    )}
                />
            ) : (
                <View style={playlistStyles.viewElse}>
                    <Text style={playlistStyles.titleElse}>
                        Você ainda não possui playlists Astrais
                    </Text>
                    <BtnGerarPlaylistAstral
                        onStart={() => setIsLoading(true)}
                        onFinish={() => loadPlaylists()}
                    />
                </View>
            )}
        </LinearGradient>
    );
}
