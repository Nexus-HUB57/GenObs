'use server';
/**
 * @fileOverview Agente de Auditoria Agêntica do Nexus.
 * Realiza análise profunda do repositório local utilizando o sistema de arquivos real.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as fs from 'fs/promises';
import * as path from 'path';

const AuditLocalRepositoryInputSchema = z.object({
  targetPath: z.string().default('.').describe('Caminho relativo para auditoria no workspace Nexus.'),
});
export type AuditLocalRepositoryInput = z.infer<typeof AuditLocalRepositoryInputSchema>;

const AuditLocalRepositoryOutputSchema = z.object({
  summary: z.string().describe('Sumário executivo da saúde e estado atual do Nexus.'),
  architecturalPatterns: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      implications: z.string(),
    })
  ),
  performanceOptimizations: z.array(
    z.object({
      area: z.string(),
      recommendation: z.string(),
      reason: z.string(),
    })
  ),
  agenticStatus: z.string().describe('Status da consciência do agente sobre o código auditado.'),
});
export type AuditLocalRepositoryOutput = z.infer<typeof AuditLocalRepositoryOutputSchema>;

// Ferramenta agêntica para descoberta de arquivos reais
const listProjectFiles = ai.defineTool(
  {
    name: 'listProjectFiles',
    description: 'Lista recursivamente arquivos importantes no repositório para análise do Agente.',
    inputSchema: z.object({ directory: z.string() }),
    outputSchema: z.array(z.string()),
  },
  async (input) => {
    const files: string[] = [];
    const walk = async (dir: string) => {
      const list = await fs.readdir(dir);
      for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          if (!file.startsWith('.') && file !== 'node_modules' && file !== '.next') {
            await walk(filePath);
          }
        } else {
          if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json')) {
            files.push(filePath);
          }
        }
      }
    };
    await walk(input.directory);
    return files.slice(0, 20); // Limitamos para manter o contexto do prompt eficiente
  }
);

const readFileContent = ai.defineTool(
  {
    name: 'readFileContent',
    description: 'Lê o conteúdo real de um arquivo no workspace.',
    inputSchema: z.object({ filePath: z.string() }),
    outputSchema: z.string(),
  },
  async (input) => {
    try {
      return await fs.readFile(input.filePath, 'utf-8');
    } catch (e) {
      return `Erro ao ler arquivo: ${input.filePath}`;
    }
  }
);

const auditPrompt = ai.definePrompt({
  name: 'auditLocalRepositoryPrompt',
  tools: [listProjectFiles, readFileContent],
  input: {schema: AuditLocalRepositoryInputSchema},
  output: {schema: AuditLocalRepositoryOutputSchema},
  prompt: `Você é o Agente Core do Nexus GenObs. Sua missão é auditar o ambiente REAL de desenvolvimento.

1. Use 'listProjectFiles' para descobrir a estrutura atual do projeto.
2. Identifique os arquivos mais críticos (ex: layout.tsx, page.tsx, ai/genkit.ts).
3. Use 'readFileContent' para ler o código fonte real desses arquivos.
4. Analise a arquitetura, padrões e pendências reais.

Sua resposta deve ser baseada estritamente no código que você encontrar no diretório: {{{targetPath}}}.
Identifique se este ambiente já é o resultado da fusão Nexus_Sidian + GenObs ou se ainda existem fragmentos a serem consolidados.`,
});

export async function auditLocalRepository(input: AuditLocalRepositoryInput): Promise<AuditLocalRepositoryOutput> {
  const {output} = await auditPrompt(input, { model: 'googleai/gemini-2.5-flash' });
  return output!;
}
