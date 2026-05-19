import { App, PluginSettingTab, Setting } from 'obsidian';
import GenObsPlugin from './main';

export interface GenObsSettings {
    ollamaBaseUrl: string;
    ollamaModel: string;
    temperature: number;
    autoEmbedOnSave: boolean;
    dailyNoteFolder: string;
}

export const DEFAULT_SETTINGS: GenObsSettings = {
    ollamaBaseUrl: 'http://localhost:11434',
    ollamaModel: 'llama3.2',
    temperature: 0.75,
    autoEmbedOnSave: true,
    dailyNoteFolder: 'Daily'
};

export class GenObsSettingTab extends PluginSettingTab {
    plugin: GenObsPlugin;

    constructor(app: App, plugin: GenObsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'GenObs Settings' });

        new Setting(containerEl)
            .setName('Ollama Base URL')
            .addText(text => text
                .setPlaceholder('http://localhost:11434')
                .setValue(this.plugin.settings.ollamaBaseUrl)
                .onChange(async (value) => {
                    this.plugin.settings.ollamaBaseUrl = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Ollama Model')
            .addText(text => text
                .setValue(this.plugin.settings.ollamaModel)
                .onChange(async (value) => {
                    this.plugin.settings.ollamaModel = value;
                    await this.plugin.saveSettings();
                }));
    }
}