import { OllamaClient } from './ollama';

export class DevAgent {
    constructor(private ollama: OllamaClient) {}

    async generateCode(language: string, description: string): Promise<string> {
        let systemPrompt = "";
        switch(language.toLowerCase()) {
            case 'python':
                systemPrompt = "Você é um especialista em Python (Data Science & Web). Use pandas, numpy, scikit-learn, matplotlib para dados, ou FastAPI/Django para web. Siga PEP8.";
                break;
            case 'java':
                systemPrompt = "Você é um arquiteto Java Enterprise. Use Spring Boot, Hibernate, Maven/Gradle. Implemente padrões de projeto (SOLID, Design Patterns).";
                break;
            case 'cpp':
                systemPrompt = "Você é um engenheiro C++ de alta performance. Use C++20, Boost, Eigen, OpenMP. Foco em RAII e gerenciamento de memória eficiente.";
                break;
            case 'fullstack':
                systemPrompt = "Gere uma solução moderna: Next.js (Frontend), Prisma (ORM), Node.js/FastAPI (Backend), Docker & K8s. Use arquitetura hexagonal ou microserviços.";
                break;
            case 'data':
                systemPrompt = "Gere um pipeline ETL/ML. Use polars, duckdb, e scikit-learn. Inclua visualizações avançadas com seaborn.";
                break;
            default:
                systemPrompt = `Gere código profissional em ${language}.`;
        }
        const fullPrompt = `${systemPrompt}\n\nDescrição: ${description}\n\nRetorne APENAS o código dentro de blocos Markdown.`;
        return await this.ollama.generateWithAI(fullPrompt);
    }

    async generateFullstackProject(description: string): Promise<string> {
        const prompt = `Arquitetura Fullstack de Última Geração: ${description}. \nInclua: React/Next.js, Tailwind, Prisma, PostgreSQL, Docker, CI/CD. Responda em formato markdown estruturado.`;
        return await this.ollama.generateWithAI(prompt);
    }
}