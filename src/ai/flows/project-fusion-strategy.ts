'use server';
/**
 * @fileOverview AI agent for strategizing the fusion of two repositories.
 *
 * - projectFusionStrategy - Handles the architectural merging strategy.
 * - ProjectFusionInput - Input for the fusion process.
 * - ProjectFusionOutput - Strategic roadmap for the merge.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectFusionInputSchema = z.object({
  repoA: z.string().describe('First repository name (e.g., Nexus_Sidian).'),
  repoB: z.string().describe('Second repository name (e.g., GenObs).'),
  context: z.string().optional().describe('Additional context about the pending issues or goals.'),
});
export type ProjectFusionInput = z.infer<typeof ProjectFusionInputSchema>;

const ProjectFusionOutputSchema = z.object({
  roadmap: z.array(z.object({
    step: z.string(),
    description: z.string(),
    priority: z.enum(['High', 'Medium', 'Low']),
  })).describe('Step-by-step plan for the fusion.'),
  architecturalAlignment: z.string().describe('How to align the two architectures.'),
  conflictResolution: z.string().describe('Strategy for handling potential code or dependency conflicts.'),
  fusionSummary: z.string().describe('Overview of the merged "Nexus GenObs" state.'),
});
export type ProjectFusionOutput = z.infer<typeof ProjectFusionOutputSchema>;

export async function projectFusionStrategy(input: ProjectFusionInput): Promise<ProjectFusionOutput> {
  return projectFusionStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectFusionStrategyPrompt',
  input: {schema: ProjectFusionInputSchema},
  output: {schema: ProjectFusionOutputSchema},
  prompt: `You are a Nexus Software Architect specializing in AI-driven development.
Your mission is to execute a strategic fusion between two core repositories: {{{repoA}}} and {{{repoB}}}.

Current Context: {{{context}}}

Analyze the following fusion objectives:
1. Merge Obsidian vault semantic discovery (Sidian) with Advanced Repository Auditing (GenObs).
2. Unify the AI flow infrastructure into a single Nexus Engine.
3. Consolidate pending tasks and technical debt.

Provide a detailed roadmap, architectural alignment strategy, and conflict resolution plan for this fusion.`,
});

const projectFusionStrategyFlow = ai.defineFlow(
  {
    name: 'projectFusionStrategyFlow',
    inputSchema: ProjectFusionInputSchema,
    outputSchema: ProjectFusionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
