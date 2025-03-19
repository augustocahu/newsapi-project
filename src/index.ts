import { fetchNews } from './services/newsApiService';
import { saveNewsToFile, readNewsFromFile } from './utils/fileManager';

async function main() {
  const articles = await fetchNews();
  if (articles.length > 0) {
    saveNewsToFile(articles);
  }

  // Se você quiser testar a leitura do arquivo:
  const savedArticles = readNewsFromFile();
  if (savedArticles) {
    console.log(`Foram carregados ${savedArticles.length} artigos.`);
  }
}

main();
