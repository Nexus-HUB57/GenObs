'use server';
/**
 * @fileOverview A Genkit flow for performing semantic search across an Obsidian vault and connected repositories.
 *
 * - semanticallySearchVault - A function that handles the semantic search process.
 * - SemanticallySearchVaultInput - The input type for the semanticallySearchVault function.
 * - SemanticallySearchVaultOutput - The return type for the semanticallySearchVault function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SemanticallySearchVaultInputSchema = z.object({
  query: z.string().describe('The natural language query for semantic search.'),
});
export type SemanticallySearchVaultInput = z.infer<typeof SemanticallySearchVaultInputSchema>;

const SemanticallySearchVaultOutputSchema = z.object({
  results: z.array(
    z.object({
      id: z.string().describe('A unique identifier for the search result (e.g., file path).'),
      snippet: z.string().describe('A relevant snippet of text from the found document/code.'),
      score: z.number().describe('A similarity score indicating relevance.'),
    })
  ).describe('A list of semantic search results.'),
  summary: z.string().describe('A brief summary of the search results.'),
});
export type SemanticallySearchVaultOutput = z.infer<typeof SemanticallySearchVaultOutputSchema>;

// Placeholder tool for semantic search. In a real application, this would interact with an HNSW index.
const semanticSearchVaultTool = ai.defineTool(
  {
    name: 'semanticSearchVault',
    description: 'Performs a high-dimensional semantic search across the Obsidian vault and connected repositories based on a natural language query. Returns relevant notes and code snippets.',
    inputSchema: z.object({
      query: z.string().describe('The natural language query to semantically search for.'),
    }),
    outputSchema: SemanticallySearchVaultOutputSchema.shape.results,
  },
  async (input) => {
    // Simulate interaction with a local HNSW index or similar semantic search service.
    // In a real scenario, this would call an external service or library.
    console.log(`Performing semantic search for query: "${input.query}"`);
    // Return dummy data for demonstration purposes
    if (input.query.toLowerCase().includes('nextjs')) {
      return [
        { id: 'vault/notes/nextjs-architecture.md', snippet: 'Discusses server-side rendering and static site generation in Next.js.', score: 0.95 },
        { id: 'repo/my-next-app/pages/index.tsx', snippet: 'Example Next.js page with data fetching using getServerSideProps.', score: 0.88 },
      ];
    } else if (input.query.toLowerCase().includes('performance')) {
      return [
        { id: 'vault/notes/optimization-techniques.md', snippet: 'Strategies for optimizing web application performance, including lazy loading and code splitting.', score: 0.92 },
        { id: 'repo/my-next-app/utils/perf-logger.ts', snippet: 'Utility function for logging client-side performance metrics.', score: 0.85 },
      ];
    } else {
      return [
        { id: 'vault/notes/general-concept.md', snippet: `A generic note related to '${input.query}'.`, score: 0.70 },
        { id: 'repo/some-code/src/main.ts', snippet: `Some code related to '${input.query}'.`, score: 0.65 },
      ];
    }
  }
);

const semanticSearchPrompt = ai.definePrompt({
  name: 'semanticSearchPrompt',
  input: { schema: SemanticallySearchVaultInputSchema },
  output: { schema: SemanticallySearchVaultOutputSchema },
  tools: [semanticSearchVaultTool],
  prompt: `You are an intelligent assistant capable of semantically searching an Obsidian vault and connected code repositories.

When a user provides a natural language query for information, use the 'semanticSearchVault' tool to find relevant notes and code snippets.

After retrieving the results, summarize them briefly and present them clearly, highlighting the most relevant findings.

User Query: {{{query}}}
`,
});

const semanticallySearchVaultFlow = ai.defineFlow(
  {
    name: 'semanticallySearchVaultFlow',
    inputSchema: SemanticallySearchVaultInputSchema,
    outputSchema: SemanticallySearchVaultOutputSchema,
  },
  async (input) => {
    const { output } = await semanticSearchPrompt(input);
    return output!;
  }
);

export async function semanticallySearchVault(input: SemanticallySearchVaultInput): Promise<SemanticallySearchVaultOutput> {
  return semanticallySearchVaultFlow(input);
}
