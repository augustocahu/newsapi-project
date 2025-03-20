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
const newsApiService_1 = require("./services/newsApiService");
const aiService_1 = __importDefault(require("./services/aiService"));
const fs_1 = __importDefault(require("fs"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = yield (0, newsApiService_1.fetchNews)();
        if (articles.length === 0) {
            console.log('Nenhuma notícia encontrada.');
            return;
        }
        fs_1.default.writeFileSync('news.json', JSON.stringify(articles, null, 2));
        console.log('📝 Notícias salvas com sucesso em news.json');
        const result = yield (0, aiService_1.default)(articles);
        if (result) {
            console.log(`\n🤖 Melhor notícia escolhida pela IA:\n${result}`);
        }
    });
}
main();
