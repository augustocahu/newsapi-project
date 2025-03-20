import { OpenAI } from 'openai';
import { Article } from './newsApiService';
import * as dotenv from 'dotenv';

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function chooseBestArticle(articles: Article[], retryCount = 0): Promise<string | null> {
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 2000;
  const BACKOFF_FACTOR = 2;

  try {
    const prompt = `Eu vou te fornecer três notícias. Escolha a melhor notícia considerando relevância, clareza e impacto. Explique a razão da sua escolha e apresente um resumo curto dela:\n\n` +
      articles.map((article, index) => `Notícia ${index + 1}:\nTítulo: ${article.title}\nConteúdo: ${article.content}`).join('\n\n');

    console.log(`🤖 Avaliando as três notícias...`);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.5,
    });

    const result = response.choices[0].message?.content || null;
    console.log(`✅ Avaliação concluída!`);
    return result;
  } catch (error: any) {
    if (retryCount < MAX_RETRIES && error.code === 'insufficient_quota') {
      const delayTime = RETRY_DELAY * (BACKOFF_FACTOR ** retryCount);
      console.error(`⚠️ Erro de cota. Tentando novamente em ${delayTime / 1000} segundos...`);
      
      await delay(delayTime);
      return chooseBestArticle(articles, retryCount + 1);
    }

    console.error('❌ Erro ao avaliar as notícias:', error.message || error);
    return null;
  }
}
