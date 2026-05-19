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
        containerEl.createEl('h2', { text: 'GenObs - Configurações' });

        new Setting(containerEl)
            .setName('Ollama URL')
            .setDesc('Endereço do Ollama')
            .addText(text => text
                .setPlaceholder('http://localhost:11434')
                .setValue(this.plugin.settings.ollamaBaseUrl)
                .onChange(async (value) => {
                    this.plugin.settings.ollamaBaseUrl = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Modelo Ollama')
            .setDesc('Ex: llama3.2, llama4:maverick, etc.')
            .addText(text => text
                .setValue(this.plugin.settings.ollamaModel)
                .onChange(async (value) => {
                    this.plugin.settings.ollamaModel = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Temperature')
            .setDesc('0.0 = mais preciso, 1.0 = mais criativo')
            .addSlider(slider => slider
                .setLimits(0, 1, 0.05)
                .setValue(this.plugin.settings.temperature)
                .onChange(async (value) => {
                    this.plugin.settings.temperature = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Auto Embeddings ao salvar')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.autoEmbedOnSave)
                .onChange(async (value) => {
                    this.plugin.settings.autoEmbedOnSave = value;
                    await this.plugin.saveSettings();
                }));
    }
}