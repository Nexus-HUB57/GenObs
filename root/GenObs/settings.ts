export interface GenObsSettings {
    ollamaUrl: string;
    model: string;
    embeddingModel: string;
    temperature: number;
    autoEmbedOnSave: boolean;
}

export const DEFAULT_SETTINGS: GenObsSettings = {
    ollamaUrl: 'http://localhost:11434',
    model: 'llama3.2',
    embeddingModel: 'nomic-embed-text',
    temperature: 0.75,
    autoEmbedOnSave: false
};