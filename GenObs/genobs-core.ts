import { App, Notice, TFile } from 'obsidian';
import { OllamaClient } from './ollama';
import { GenObsSettings } from './settings';

export class GenObsCore {
    private ollama: OllamaClient;

    constructor(private app: App, private settings: GenObsSettings) {
        this.ollama = new OllamaClient({
            baseUrl: settings.ollamaBaseUrl,
            model: settings.ollamaModel,
            temperature: settings.temperature
        });
    }

    updateSettings(settings: GenObsSettings) {
        this.settings = settings;
        this.ollama = new OllamaClient({
            baseUrl: settings.ollamaBaseUrl,
            model: settings.ollamaModel,
            temperature: settings.temperature
        });
    }

    async createSmartDailyNote() {
        const date = new Date();
        const today = date.toISOString().split('T')[0];
        const path = `${this.settings.dailyNoteFolder}/${today}.md`;

        const reflection = await this.ollama.generate(
            `Escreva uma reflexão curta, motivadora e útil para o dia de hoje.`
        );

        const content = `# ${date.toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })}\n\n` +

        `## Reflexão GenObs\n> ${reflection}\n\n` +

        `## Tarefas Pendentes\n` +
        `\`\`\`dataview\nTASK\nWHERE !completed\n\`\`\`\n\n` +

        `## Notas Relacionadas\n`;

        await this.app.vault.create(path, content);
        new Notice(`✅ Daily Note criada: ${today}`);
    }

    async generateWithAI(prompt: string): Promise<string> {
        return await this.ollama.generate(prompt);
    }
}