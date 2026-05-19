import { Vault } from 'obsidian';
import { cosineSimilarity } from './embeddings';

export class VectorStore {
    private index: Map<string, any> = new Map();
    constructor(private vault: Vault) {}
    async load(data: any) { if (data?.index) this.index = new Map(Object.entries(data.index)); }
    save() { return { index: Object.fromEntries(this.index) }; }
    add(path: string, embedding: number[], content: string) {
        this.index.set(path, { path, embedding, content: content.slice(0, 500) });
    }
    async search(queryEmbedding: number[], topK: number = 5) {
        const results = Array.from(this.index.values()).map(data => ({
            ...data,
            score: cosineSimilarity(queryEmbedding, data.embedding)
        }));
        return results.sort((a,b) => b.score - a.score).slice(0, topK);
    }
}