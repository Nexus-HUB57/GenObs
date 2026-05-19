import { requestUrl } from 'obsidian';
import { GenObsSettings } from './settings';

export async function getEmbedding(text: string, settings: GenObsSettings): Promise<number[]> {
    const response = await requestUrl({
        url: `${settings.ollamaUrl}/api/embeddings`,
        method: 'POST',
        body: JSON.stringify({ model: settings.embeddingModel, prompt: text.slice(0, 2000) }),
        headers: { 'Content-Type': 'application/json' }
    });
    return response.json.embedding;
}

export function cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0, magA = 0, magB = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        magA += a[i] ** 2;
        magB += b[i] ** 2;
    }
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}