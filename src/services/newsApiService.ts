import axios from 'axios';

export type Article = {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  publishedAt: string;
  content: string | null;
};

export type ApiResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};


const API_KEY = '';
const URL = `https://newsapi.org/v2/everything?q=technology&pageSize=50&apiKey=${API_KEY}`;

export async function fetchNews(): Promise<Article[]> {
  console.log("🔍 Fazendo requisição para a NewsAPI...");

  try {
    const response = await axios.get<ApiResponse>(URL);
    console.log("✅ Requisição bem-sucedida! Recebendo artigos...");

    if (response.data.status === 'ok') {
      console.log(`📊 Número de artigos encontrados: ${response.data.articles.length}`);
      return response.data.articles;
    } else {
      console.error("❌ Erro na resposta da API:", response.data);
      return [];
    }
  } catch (error) {
    console.error('❌ Erro ao buscar notícias:', error);
    return [];
  }
}
