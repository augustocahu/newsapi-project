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
Object.defineProperty(exports, "__esModule", { value: true });
const newsApiService_1 = require("./services/newsApiService");
const fileManager_1 = require("./utils/fileManager");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = yield (0, newsApiService_1.fetchNews)();
        if (articles.length > 0) {
            (0, fileManager_1.saveNewsToFile)(articles);
        }
        // Se você quiser testar a leitura do arquivo:
        const savedArticles = (0, fileManager_1.readNewsFromFile)();
        if (savedArticles) {
            console.log(`Foram carregados ${savedArticles.length} artigos.`);
        }
    });
}
main();
