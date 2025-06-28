import axios from 'axios';

const API_KEY = '8umLRwthz2JKTgLeKE018FzZzOgjcOarnhxmgoFL'; 
const BASE_URL = 'https://api.nasa.gov';

export async function fetchApod(date?: string) {
  try {
    const response = await axios.get(`${BASE_URL}/planetary/apod`, {
      params: {
        api_key: API_KEY,
        date,
        thumbs: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar APOD:', error);
    throw error;
  }
}