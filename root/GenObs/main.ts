import { Plugin, Notice, addIcon } from 'obsidian';
import { GenObsCore } from './genobs-core';
import { GenObsSettingTab, DEFAULT_SETTINGS, GenObsSettings } from './settings';

export default class GenObsPlugin extends Plugin {
    settings: GenObsSettings;
    private genobs: GenObsCore;

    async onload() {
        await this.loadSettings();
        this.genobs = new GenObsCore(this.app, this.settings);

        // Ícone customizado no Ribbon
        addIcon('genobs', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>');

        this.addRibbonIcon('genobs', 'GenObs - Daily Note', () => {
            this.genobs.createSmartDailyNote();
        });

        // Comandos Principais
        this.addCommand({
            id: 'genobs-daily',
            name: '📅 Criar Daily Note Inteligente',
            callback: () => this.genobs.createSmartDailyNote()
        });

        this.addCommand({
            id: 'genobs-generate',
            name: '✨ Gerar Texto com IA (no cursor)',
            editorCallback: async (editor) => {
                const prompt = window.prompt("Digite o prompt para GenObs:");
                if (prompt) {
                    const result = await this.genobs.generateWithAI(prompt);
                    editor.replaceSelection(result);
                }
            }
        });

        this.addCommand({
            id: 'genobs-update-embeddings',
            name: '🔄 Atualizar Embeddings do Vault',
            callback: () => {
                new Notice("Funcionalidade de embeddings em desenvolvimento...");
            }
        });

        // Settings
        this.addSettingTab(new GenObsSettingTab(this.app, this));

        new Notice('🚀 GenObs Agent carregado com sucesso!', 4000);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        if (this.genobs) this.genobs.updateSettings(this.settings);
    }

    onunload() {
        console.log('GenObs descarregado.');
    }
}