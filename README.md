# GenObs
Agentic AI


**Agentic AI Assistant para Obsidian**

Um agente inteligente completo integrado ao Obsidian: Daily Notes automáticas, geração de conteúdo com IA, busca semântica (embeddings), templates avançados, integração com Dataview/Templater e CLI.

## Funcionalidades

- ✨ Daily Notes inteligentes com reflexões por IA
- 🔍 Busca semântica (vector search)
- 📝 Geração automática de notas e templates
- 🔗 Integração nativa com Templater + Dataview + QuickAdd
- 🧠 Sistema de embeddings local
- 💻 Interface CLI (`genobs`)

## Instalação

1. Baixe o plugin em `Releases`
2. Coloque em `.obsidian/plugins/genobs/`

Ajustes Técnicos Prioritários (Base para Maturação)
Com base na minha análise anterior, estes são os gaps técnicos que mais travam a adoção e a estabilidade do plugin:

Problema Atual	Impacto	Solução Técnica
Sem releases oficiais / pacote publicado	Usuário não consegue instalar via Community Plugins; só manualmente	Criar release v0.1.0 no GitHub e submeter ao Obsidian Community Plugin Registry
Instalação manual requer Node.js + npm	Barreira para usuários não técnicos (maioria do público do Obsidian)	Empacotar com esbuild (já padrão no plugin template) e gerar main.js, manifest.json, styles.css prontos para uso
Sistema de embeddings local sem cache	Performance degrada em vaults grandes (>500 arquivos)	Implementar cache persistente dos embeddings (usando IndexedDB ou arquivo .bin no vault)
Indexação síncrona bloqueia UI	Travamentos durante rebuild do índice	Tornar todo processo de embedding assíncrono e em segundo plano (Web Workers ou chunks + requestIdleCallback)
Sem suporte a múltiplos modelos de embedding	Limita a adoção por usuários com diferentes hardware/LLMs	Abstrair EmbeddingProvider com implementações: Transformers.js (local, leve), Ollama, OpenAI, etc.
Código monolítico difícil de testar	Bugs frequentes, difícil contribuição externa	Separar em módulos: embeddingService, agentScheduler, searchEngine, fileWatcher, cliHandler
📋 Plano de Ação Técnica (Sprints de 1–2 semanas)
Sprint 0 – Fundação (3 dias)
Refatorar estrutura de pastas seguindo o padrão do Obsidian Plugin Template:

text
src/
  ├── main.ts
  ├── embedding/
  │    ├── provider.interface.ts
  │    ├── transformersProvider.ts
  │    └── cacheManager.ts
  ├── agents/
  │    ├── dailyNoteAgent.ts
  │    ├── semanticSearchAgent.ts
  │    └── scheduler.ts
  └── cli/
       └── genobsCommands.ts
Configurar esbuild com minificação e source maps.

Adicionar scripts npm: dev, build, test, lint.

Sprint 1 – Primeira Release Oficial (1 semana)
Implementar sistema de cache de embeddings:

Salvar em {vaultPath}/.genobs/cache.json ou IndexedDB.

Usar hash do conteúdo do arquivo para invalidar cache.

Fazer toda indexação rodar em background com debounce (aguardar 5s sem alterações para processar).

Criar um comando manual: GenObs: Rebuild index para forçar recálculo.

Gerar manifest.json com minAppVersion: "1.5.0" e versions corretos.

Publicar release v0.1.0 no GitHub e submeter pull request para o obsidian-releases.

Sprint 2 – Experiência do Usuário e Integração (1 semana)
Adicionar configurações visuais (aba nativa do Obsidian) para:

Escolher modelo de embedding (local/cloud)

Ativar/desativar cada agente

Definir horário da daily note

Melhorar a CLI (genobs): comandos status, search "texto", rebuild.

Garantir que nenhuma dependência externa seja exigida do usuário (remover necessidade de Node.js). O plugin deve ser apenas copiar três arquivos.

Escrever README.md com:

GIF mostrando busca semântica em ação

Tabela comparativa (GenObs vs outros plugins de IA)

Instrução de instalação (via Community Plugins, após aprovação)

Sprint 3 – Performance e Robustez (1 semana)
Implementar índice invertido híbrido: BM25 + embeddings para busca híbrida (melhor que só vetorial).

Adicionar timeout e fallback para chamadas a LLM externas (evitar travamento).

Tratar erros silenciosamente e logar no console do Obsidian (Developer Console).

Escrever testes unitários para o cacheManager, embeddingProvider (Jest + mock do Obsidian API).

Testar com vault de 5.000+ arquivos (simular com scripts).

Sprint 4 – Tração e Comunidade (contínuo)
Lançar no Product Hunt e em subreddits r/ObsidianMD, r/PKMS.

Criar issue templates no GitHub para feature request e bug report.

Gravar um tutorial em vídeo (2-3 min) mostrando o diferencial da busca local privada.

Implementar feedback anônimo (opcional) para entender quais features os usuários mais usam.

🧪 Critérios de "Maturação" (Definition of Done)
O GenObs estará maduro para adoção em larga escala quando:

✅ Estiver listado no Community Plugin Registry (qualquer usuário instala em 2 cliques).

✅ Suportar vaults de até 10.000 arquivos sem queda perceptível de performance.

✅ Funcionar 100% offline (modelo local com Transformers.js ou similar).

✅ Ter testes automatizados cobrindo >70% das funções críticas.

✅ Não apresentar crash ou freezing em uso contínuo de 1 semana (teste real).

✅ Ter pelo menos 50 stars no GitHub e 5 issues resolvidas de usuários reais.
3. Ative o plugin no Obsidian

## Desenvolvimento

```bash
npm install
npm run dev
