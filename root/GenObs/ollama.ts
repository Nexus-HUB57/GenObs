import { Notice } from 'obsidian';

export interface OllamaConfig {
    baseUrl: string;
    model: string;
    temperature: number;
}

export class OllamaClient {
    constructor(private config: OllamaConfig) {}

    async generate(prompt: string, systemPrompt?: string): Promise<string> {
        try {
            const response = await fetch(`${this.config.baseUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: this.config.model,
                    prompt: prompt,
                    system: systemPrompt,
                    temperature: this.config.temperature,
                    stream: false
                })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            return data.response || "Sem resposta do modelo.";
        } catch (error) {
            console.error(error);
            new Notice("❌ Ollama não está respondendo. Verifique se está rodando.");
            return "*Erro ao conectar com Ollama*";
        }
    }
}