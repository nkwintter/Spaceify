import axios from 'axios';

const API_KEY = '8umLRwthz2JKTgLeKE018FzZzOgjcOarnhxmgoFL';
const BASE_URL = 'https://api.nasa.gov';

export async function fetchApodList(count = 10) {
  try {
    const response = await axios.get(`${BASE_URL}/planetary/apod`, {
      params: {
        api_key: API_KEY,
        count,
        thumbs: true,
      },
    });

    return response.data.filter((item: any) => item.title);
  } catch (error) {
    console.error('Erro ao buscar lista APOD:', error);
    throw error;
  }
}