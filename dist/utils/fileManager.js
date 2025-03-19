"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNewsToFile = saveNewsToFile;
exports.readNewsFromFile = readNewsFromFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, '../../news.json');
function saveNewsToFile(articles) {
    fs_1.default.writeFileSync(filePath, JSON.stringify(articles, null, 2));
    console.log(`Notícias salvas com sucesso em ${filePath}`);
}
function readNewsFromFile() {
    try {
        const data = fs_1.default.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Erro ao ler o arquivo de notícias:', error);
        return null;
    }
}
