import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function generateTracks(mood: string, imageTitle: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
        Você é um curador musical. 
        Para o humor "${mood}" inspirado na imagem de nome"${imageTitle}", 
        crie uma playlist com 12 faixas no formato JSON abaixo:
        [
            { "title": "Nome da Música 1", "artist": "Nome do Artista 1" },
            { "title": "Nome da Música 2", "artist": "Nome do Artista 2" },
            ...
        ]
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanJson = text.replace(/```json|```/g, '').trim();

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Erro ao gerar tracks via Gemini:", error);
    throw new Error("Erro ao gerar playlist com Gemini");
  }
}
