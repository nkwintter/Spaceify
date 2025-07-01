import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { generateTracks } from './AI.BackEnd';
import { createSpotifyPlaylistForUser } from './services/spotify.service'

dotenv.config();
const app = express();
app.use(express.json());

app.post('/generate-playlist', async (req: Request, res: Response) => {
  const { mood, imageTitle } = req.body;

  if (!mood || !imageTitle) {
    return res.status(400).json({ error: 'Campos obrigatórios: mood e imageTitle' });
  }

  try {
    const tracks = await generateTracks(mood, imageTitle);
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar playlist' });
  }
});

app.post('/create-user-playlist', async (req, res) => {
  const { tracks, playlistName, user_id, access_token } = req.body;

  if (!tracks || !user_id || !access_token) {
    return res.status(400).json({ error: 'Faltam dados para criar a playlist' });
  }

  try {
    const url = await createSpotifyPlaylistForUser(tracks, playlistName, user_id, access_token);
    res.json({ playlistUrl: url });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar playlist' });
  }
});

app.get('/', (req, res) => res.send("Spaceify Gemini API OK"));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server rodando em: http://localhost:${PORT}`);
});


