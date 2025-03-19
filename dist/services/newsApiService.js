"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNews = fetchNews;
const axios_1 = __importDefault(require("axios"));
const API_KEY = '3e5b7c46a2e34004865e1baca0424e35';
const URL = `https://newsapi.org/v2/everything?q=technology&pageSize=50&apiKey=${API_KEY}`;
function fetchNews() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🔍 Fazendo requisição para a NewsAPI...");
        try {
            const response = yield axios_1.default.get(URL);
            console.log("✅ Requisição bem-sucedida! Recebendo artigos...");
            if (response.data.status === 'ok') {
                console.log(`📊 Número de artigos encontrados: ${response.data.articles.length}`);
                return response.data.articles;
            }
            else {
                console.error("❌ Erro na resposta da API:", response.data);
                return [];
            }
        }
        catch (error) {
            console.error('❌ Erro ao buscar notícias:', error);
            return [];
        }
    });
}
