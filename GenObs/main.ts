import { Plugin, Notice } from 'obsidian';
import { GenObsCore } from './genobs-core';
import { GenObsSettingTab, DEFAULT_SETTINGS, GenObsSettings } from './settings';

export default class GenObsPlugin extends Plugin {
    settings: GenObsSettings;
    private genobs: GenObsCore;

    async onload() {
        await this.loadSettings();
        this.genobs = new GenObsCore(this.app, this.settings);

        this.addRibbonIcon('brain', 'GenObs Daily Note', () => {
            this.genobs.createSmartDailyNote();
        });

        this.addCommand({
            id: 'genobs-daily',
            name: 'Criar Daily Note Inteligente',
            callback: () => this.genobs.createSmartDailyNote()
        });

        this.addSettingTab(new GenObsSettingTab(this.app, this));

        new Notice('🚀 GenObs Agent carregado com sucesso!');
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.genobs?.updateSettings(this.settings);
    }
}