import { requestUrl, Notice } from 'obsidian';
import { GenObsSettings } from './settings';

export class OllamaClient {
    constructor(private settings: GenObsSettings) {}

    async generateWithAI(prompt: string): Promise<string> {
        try {
            const response = await requestUrl({
                url: `${this.settings.ollamaUrl}/api/generate`,
                method: 'POST',
                body: JSON.stringify({
                    model: this.settings.model,
                    prompt: prompt,
                    stream: false,
                    temperature: this.settings.temperature
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            return response.json.response;
        } catch (e) {
            new Notice(`Erro Ollama: ${e.message}`);
            return "Erro ao conectar com Ollama.";
        }
    }
}