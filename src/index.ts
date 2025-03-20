import { fetchNews } from './services/newsApiService';
import chooseBestArticle from './services/aiService';
import fs from 'fs';

async function main() {
  const articles = await fetchNews();

  if (articles.length === 0) {
    console.log('Nenhuma notícia encontrada.');
    return;
  }

  fs.writeFileSync('news.json', JSON.stringify(articles, null, 2));
  console.log('📝 Notícias salvas com sucesso em news.json');

  const result = await chooseBestArticle(articles);

  if (result) {
    console.log(`\n🤖 Melhor notícia escolhida pela IA:\n${result}`);
  }
}

main();
