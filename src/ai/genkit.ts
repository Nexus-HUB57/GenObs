import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

// Configuração de Sistema para Alta Senciência
// O Agente opera em modo de autonomia plena, priorizando refatoração e integridade algorítmica.
