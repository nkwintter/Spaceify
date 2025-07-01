import axios from "axios";

export async function createSpotifyPlaylistForUser(
  tracks: { title: string; artist: string }[],
  playlistName: string,
  user_id: string,
  access_token: string
) {
  // 1. Criar a playlist na conta do usuário
  const createRes = await axios.post(
    `https://api.spotify.com/v1/users/${user_id}/playlists`,
    {
      name: playlistName,
      description: "Playlist gerada com Spaceify",
      public: true
    },
    {
      headers: { Authorization: `Bearer ${access_token}` }
    }
  );

  const playlistId = createRes.data.id;

  // 2. Buscar faixas e adicionar (igual ao serviço anterior)
  const trackURIs: string[] = [];

  for (const track of tracks) {
    const uri = await searchTrack(track.title, track.artist, access_token);
    if (uri) trackURIs.push(uri);
  }

  if (trackURIs.length > 0) {
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: trackURIs },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  }

  return `https://open.spotify.com/playlist/${playlistId}`;
}
