import axios from 'axios';

interface generateTracksProps{
    humor: string,
    imgTitle: string
}

export async function GenerateTracks(humor:string, imgTitle:string){
    const response = await axios.post('http://192.168.1.51:3001/generate-playlist', {
        mood: humor,
        imageTitle: imgTitle
    })

    const playlist = response.data;

    playlist.forEach((music: any, index: number) => {
        console.log(`${index + 1}. ${music.title} - ${music.artist}`);
    });
}