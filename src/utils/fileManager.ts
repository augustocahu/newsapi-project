import fs from 'fs';
import path from 'path';
import { Article } from '../services/newsApiService';

const filePath = path.join(__dirname, '../../news.json');

export function saveNewsToFile(articles: Article[]): void {
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
  console.log(`Notícias salvas com sucesso em ${filePath}`);
}

export function readNewsFromFile(): Article[] | null {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler o arquivo de notícias:', error);
    return null;
  }
}
