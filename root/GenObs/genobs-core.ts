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

    // ==================== DETECÇÃO DE PLUGINS ====================
    hasDataview(): boolean {
        return !!(this.app as any).plugins?.plugins?.dataview;
    }

    hasTemplater(): boolean {
        return !!(this.app as any).plugins?.plugins?.["templater-obsidian"];
    }

    hasTasks(): boolean {
        return !!(this.app as any).plugins?.plugins?.tasks;
    }

    // ==================== DAILY NOTE AVANÇADA ====================
    async createSmartDailyNote() {
        const date = new Date();
        const today = date.toISOString().split('T')[0];
        const path = `${this.settings.dailyNoteFolder}/${today}.md`;

        let content = `# ${date.toLocaleDateString('pt-BR', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        })}\n\n`;

        // Reflexão com IA
        const reflection = await this.ollama.generate(
            "Escreva uma reflexão curta, profunda e motivadora para hoje."
        );
        content += `## Reflexão GenObs\n> ${reflection}\n\n`;

        // Integração com Tasks / Dataview
        if (this.hasDataview()) {
            content += `## Tarefas Pendentes\n\`\`\`dataview\nTASK\nWHERE !completed AND due <= date("${today}")\n\`\`\`\n\n`;
        } else {
            content += `## Tarefas Pendentes\n- [ ] Tarefa 1\n- [ ] Tarefa 2\n\n`;
        }

        // Sugestão de links com Templater
        if (this.hasTemplater()) {
            content += `## Notas Relacionadas\n<% tp.file.cursor() %>\n`;
        }

        await this.app.vault.create(path, content);
        new Notice(`✅ Daily Note Avançada criada: ${today}`);
    }

    // ==================== GERAÇÃO COM CONTEXTO ====================
    async generateWithAI(prompt: string, context?: string): Promise<string> {
        let fullPrompt = prompt;
        if (context) {
            fullPrompt = `Contexto: ${context}\n\nTarefa: ${prompt}`;
        }
        return await this.ollama.generate(fullPrompt);
    }

    updateSettings(settings: GenObsSettings) {
        this.settings = settings;
        this.ollama = new OllamaClient({
            baseUrl: settings.ollamaBaseUrl,
            model: settings.ollamaModel,
            temperature: settings.temperature
        });
    }
}