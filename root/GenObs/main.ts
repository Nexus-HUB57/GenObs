import { App, Plugin, PluginSettingTab, Setting, Notice, TFile } from 'obsidian';
import { GenObsSettings, DEFAULT_SETTINGS } from './settings';
import { OllamaClient } from './ollama';
import { VectorStore } from './vector-store';
import { SemanticSearchModal } from './semantic-search-modal';
import { CodeAnalyzer } from './code-analyzer';
import { DevAgent } from './dev-agent';
import { getEmbedding } from './embeddings';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default class GenObsPlugin extends Plugin {
    settings: GenObsSettings;
    ollama: OllamaClient;
    vectorStore: VectorStore;
    codeAnalyzer: CodeAnalyzer;
    devAgent: DevAgent;

    async onload() {
        await this.loadSettings();
        this.ollama = new OllamaClient(this.settings);
        this.vectorStore = new VectorStore(this.app.vault);
        await this.vectorStore.load(await this.loadData());
        this.codeAnalyzer = new CodeAnalyzer(this.app, this.ollama);
        this.devAgent = new DevAgent(this.ollama);

        this.addRibbonIcon('bot', 'GenObs: Quick Action', () => this.quickGenerate());

        this.addCommand({ id: 'semantic-search', name: 'Busca semântica', callback: () => new SemanticSearchModal(this.app, this.settings, this.vectorStore).open() });
        this.addCommand({ id: 'generate-code', name: 'Gerar código (Python/Java/C++)', callback: () => this.promptCodeGeneration() });
        this.addCommand({ id: 'analyze-repo', name: 'Analisar repositório atual', callback: () => this.analyzeCurrentRepo() });
        
        this.addCommand({
            id: 'run-python-script',
            name: 'Executar script Python selecionado',
            callback: async () => {
                const code = this.getSelectedText();
                if (!code) {
                  new Notice("Selecione um código Python primeiro.");
                  return;
                }
                const tmpFile = await this.saveTempFile(code, '.py');
                try {
                  const { stdout, stderr } = await execAsync(`python ${tmpFile}`);
                  new Notice(stdout || stderr);
                } catch (e) {
                  new Notice(`Erro de execução: ${e.message}`);
                }
            }
        });

        this.registerEvent(this.app.vault.on('modify', async (file) => {
            if (this.settings.autoEmbedOnSave && file instanceof TFile && file.extension === 'md') {
                const content = await this.app.vault.read(file);
                const embedding = await getEmbedding(content, this.settings);
                this.vectorStore.add(file.path, embedding, content);
                await this.saveData(this.vectorStore.save());
            }
        }));

        this.addSettingTab(new GenObsSettingTab(this.app, this));
    }

    getSelectedText() {
        const view = this.app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
        return view?.editor.getSelection();
    }

    async saveTempFile(content: string, ext: string) {
        const path = `.tmp_genobs_${Date.now()}${ext}`;
        await this.app.vault.adapter.write(path, content);
        return path;
    }

    async quickGenerate() {
        const prompt = window.prompt("Digite sua solicitação:");
        if (!prompt) return;
        const response = await this.ollama.generateWithAI(prompt);
        this.appendToActiveEditor(response);
    }

    async promptCodeGeneration() {
        const lang = window.prompt("Linguagem (python, java, cpp, fullstack, data):");
        const desc = window.prompt("Descrição:");
        if (!lang || !desc) return;
        const code = await this.devAgent.generateCode(lang, desc);
        this.appendToActiveEditor(`\n```${lang}\n${code}\n```\n`);
    }

    async analyzeCurrentRepo() {
        const path = (this.app.workspace.getActiveFile()?.parent?.path) || "/";
        const analysis = await this.codeAnalyzer.analyzeRepository(path);
        this.appendToActiveEditor(`## Archival Audit Result\n${analysis}`);
    }

    appendToActiveEditor(content: string) {
        const view = this.app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
        if (view) view.editor.replaceSelection(content + "\n");
    }

    async loadSettings() { this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()); }
    async saveSettings() { await this.saveData(this.settings); }
}

class GenObsSettingTab extends PluginSettingTab {
    plugin: GenObsPlugin;
    constructor(app: App, plugin: GenObsPlugin) { super(app, plugin); this.plugin = plugin; }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        new Setting(containerEl).setName('Ollama URL').addText(text => text.setValue(this.plugin.settings.ollamaUrl).onChange(async (val) => { this.plugin.settings.ollamaUrl = val; await this.plugin.saveSettings(); }));
        new Setting(containerEl).setName('Modelo').addText(text => text.setValue(this.plugin.settings.model).onChange(async (val) => { this.plugin.settings.model = val; await this.plugin.saveSettings(); }));
    }
}