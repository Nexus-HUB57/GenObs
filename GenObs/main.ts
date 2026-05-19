import { Plugin, Notice } from 'obsidian';
import { GenObsCore } from './genobs-core';
import { GenObsSettingTab, DEFAULT_SETTINGS, GenObsSettings } from './settings';

export default class GenObsPlugin extends Plugin {
    settings: GenObsSettings;
    private genobs: GenObsCore;

    async onload() {
        await this.loadSettings();
        this.genobs = new GenObsCore(this.app, this.settings);

        // Ribbon Icon
        this.addRibbonIcon('brain', 'Criar Daily Note (GenObs)', () => {
            this.genobs.createSmartDailyNote();
        });

        // Comandos
        this.addCommand({
            id: 'genobs-daily-note',
            name: 'Criar Daily Note Inteligente',
            callback: () => this.genobs.createSmartDailyNote()
        });

        this.addCommand({
            id: 'genobs-generate',
            name: 'Gerar texto com IA',
            editorCallback: async (editor) => {
                const prompt = window.prompt("Digite o prompt para GenObs:");
                if (prompt) {
                    const result = await this.genobs.generateWithAI(prompt);
                    editor.replaceSelection(result);
                }
            }
        });

        this.addSettingTab(new GenObsSettingTab(this.app, this));

        new Notice('🚀 GenObs Agent carregado com sucesso!');
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        if (this.genobs) this.genobs.updateSettings(this.settings);
    }
}