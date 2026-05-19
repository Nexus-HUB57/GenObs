import { Notice } from 'obsidian';

export interface OllamaConfig {
    baseUrl: string;
    model: string;
    temperature: number;
}

export class OllamaClient {
    constructor(private config: OllamaConfig) {}

    async generate(prompt: string): Promise<string> {
        try {
            const response = await fetch(`${this.config.baseUrl}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: this.config.model,
                    prompt: prompt,
                    temperature: this.config.temperature,
                    stream: false
                })
            });

            if (!response.ok) throw new Error('Falha na comunicação com Ollama');

            const data = await response.json();
            return data.response || "Sem resposta.";
        } catch (err) {
            console.error(err);
            new Notice("❌ Não foi possível conectar ao Ollama. Verifique se está rodando.");
            return "*Erro: Ollama não respondeu*";
        }
    }
}