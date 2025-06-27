import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

interface Track{
    title: string;
    artitst: string;
}


export async function GenerateTracks(mood: string, imageTitle: string): Promise<Track[]> {
    const prompt = `
        Você é um curador musical. 
        Para o mood "${mood}" inspirado na imagem "${imageTitle}", 
        sugira 12 faixas no formato JSON abaixo:
        [
            { "title": "Nome da Música 1", "artist": "Nome do Artista 1" },
            { "title": "Nome da Música 2", "artist": "Nome do Artista 2" },
            ...
        ]
    `;

    const urlBase = "https://api.openai.com/v1/chat/completions"

    try {
        const response = await axios.post(
            urlBase,
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: "user", content: prompt }],
                temperature: 0.8,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const raw = response.data.choices[0].message.content;

        const parsed: Track[] = JSON.parse(raw)
        return parsed;

    } catch (error) {
        console.error(`Erro ao gerar lista de músicas com OpenAI: ${error}`);
        return [];
    }
}