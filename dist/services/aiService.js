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
exports.default = chooseBestArticle;
const openai_1 = require("openai");
const OPENAI_API_KEY = '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';
const openai = new openai_1.OpenAI({
    apiKey: OPENAI_API_KEY,
});
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
function chooseBestArticle(articles_1) {
    return __awaiter(this, arguments, void 0, function* (articles, retryCount = 0) {
        var _a;
        const MAX_RETRIES = 5;
        const RETRY_DELAY = 2000;
        const BACKOFF_FACTOR = 2;
        try {
            const prompt = `Eu vou te fornecer três notícias. Escolha a melhor notícia considerando relevância, clareza e impacto. Explique a razão da sua escolha e apresente um resumo curto dela:\n\n` +
                articles.map((article, index) => `Notícia ${index + 1}:\nTítulo: ${article.title}\nConteúdo: ${article.content}`).join('\n\n');
            console.log(`🤖 Avaliando as três notícias...`);
            const response = yield openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
                temperature: 0.5,
            });
            const result = ((_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || null;
            console.log(`✅ Avaliação concluída!`);
            return result;
        }
        catch (error) {
            if (retryCount < MAX_RETRIES && error.code === 'insufficient_quota') {
                const delayTime = RETRY_DELAY * (Math.pow(BACKOFF_FACTOR, retryCount));
                console.error(`⚠️ Erro de cota. Tentando novamente em ${delayTime / 1000} segundos...`);
                yield delay(delayTime);
                return chooseBestArticle(articles, retryCount + 1);
            }
            console.error('❌ Erro ao avaliar as notícias:', error.message || error);
            return null;
        }
    });
}
