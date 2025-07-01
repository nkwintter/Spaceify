import axios from "axios";

async function searchTrack(trackName: string, artist: string, accessToken: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(`${trackName} ${artist}`);
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const items = response.data.tracks.items;
    return items.length > 0 ? items[0].uri : null;
  } catch (error) {
    console.error(`Erro ao buscar música ${trackName} - ${artist}:`, error);
    return null;
  }
}

export async function createSpotifyPlaylistForUser(
  tracks: { title: string; artist: string }[],
  playlistName: string,
  user_id: string,
  access_token: string
) {
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
