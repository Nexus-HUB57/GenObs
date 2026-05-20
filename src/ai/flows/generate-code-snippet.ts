'use server';
/**
 * @fileOverview A Genkit flow for generating code snippets in various programming languages.
 *
 * - generateCodeSnippet - A function that handles the code snippet generation process.
 * - GenerateCodeSnippetInput - The input type for the generateCodeSnippet function.
 * - GenerateCodeSnippetOutput - The return type for the generateCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeSnippetInputSchema = z.object({
  language: z
    .enum(['Python', 'Java', 'Cpp', 'TypeScript'])
    .describe('The programming language for the code snippet.'),
  description: z
    .string()
    .describe('A natural language description of the desired code snippet.'),
});
export type GenerateCodeSnippetInput = z.infer<
  typeof GenerateCodeSnippetInputSchema
>;

const GenerateCodeSnippetOutputSchema = z.object({
  code: z.string().describe('The generated code snippet.'),
});
export type GenerateCodeSnippetOutput = z.infer<
  typeof GenerateCodeSnippetOutputSchema
>;

export async function generateCodeSnippet(
  input: GenerateCodeSnippetInput
): Promise<GenerateCodeSnippetOutput> {
  return generateCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeSnippetPrompt',
  input: {schema: GenerateCodeSnippetInputSchema},
  output: {schema: GenerateCodeSnippetOutputSchema},
  prompt: `You are an expert software developer. Your task is to generate a code snippet in the specified programming language based on the provided description.
  
  Provide ONLY the raw code for the requested snippet. Do not include any conversational text, explanations, or comments that are not part of the code's functionality itself.
  
  Language: {{{language}}}
  Description: {{{description}}}`,
});

const generateCodeSnippetFlow = ai.defineFlow(
  {
    name: 'generateCodeSnippetFlow',
    inputSchema: GenerateCodeSnippetInputSchema,
    outputSchema: GenerateCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
