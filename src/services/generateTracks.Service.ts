import axios from 'axios';

interface generateTracksProps{
    humor: string,
    imgTitle: string
}

export async function GenerateTracks(humor:string, imgTitle:string){
    const response = await axios.post('http://localhost:3001/generate-playlist', {
        mood: imgTitle,
        imageTitle: humor
    })

    const playlist = response.data; 
    console.log('Playlist gerada:', playlist);

    playlist.forEach((music: any, index: number) => {
        console.log(`${index + 1}. ${music.title} - ${music.artist}`);
    });
}