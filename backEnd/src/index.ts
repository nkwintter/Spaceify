import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { GenerateTracks } from './AI.service';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/generate-playlist', async (req: Request, res: Response) => {
  const { mood, imageTitle } = req.body;

  if (!mood || !imageTitle) {
    return res.status(400).json({ error: 'Campos obrigatórios: mood e imageTitle' });
  }

  try {
    const tracks = await GenerateTracks(mood, imageTitle);
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar playlist' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});

