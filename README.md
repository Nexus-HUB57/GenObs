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

**Roadmap Técnico – GenObs** (Maturação e Tração)
Duração total estimada: 10 a 12 semanas (até versão estável 1.0.0 e adoção inicial pela comunidade).
Formato de trabalho: Sprints de 2 semanas, com revisão a cada final de sprint.

**Sprint Foco Tarefas Técnicas	Entregáveis	Critérios de Aceite** 

Sprint 0
Dias 1–7	Fundação e Refatoração	1. Estruturar pastas conforme padrão do Obsidian Plugin Template.
2. Configurar esbuild + TypeScript + Jest.
3. Implementar Plugin básico com comandos vazios.
4. Criar sistema de logging (console com prefixo [GenObs]).
5. Remover dependências desnecessárias (Node.js do lado do usuário).	- Repositório com src/, tests/, esbuild.config.mjs.
- manifest.json válido.
- Comando “GenObs: Hello World” funcional.	- Plugin carrega sem erros no Obsidian.
- npm run build gera main.js e styles.css.
- Teste unitário simples passa (npm test).

Sprint 1
Dias 8–21	Sistema de Embeddings Local + Cache	1. Implementar EmbeddingProvider interface.
2. Integrar Transformers.js (modelo Xenova/all-MiniLM-L6-v2).
3. Criar CacheManager com persistência em .genobs/cache.json.
4. Indexação assíncrona (debounce de 5s, requestIdleCallback).
5. Comando “GenObs: Rebuild index”.	- Arquivo de cache gerado no vault.
- Busca semântica simples (via console).
- Sem travamentos da UI durante indexação.	- Indexar 500 arquivos em < 3s (em hardware médio).
- Cache persiste entre reinicializações.
- Console mostra logs de progresso.

Sprint 2
Dias 22–35	Busca Híbrida e Interface Inicial	1. Implementar índice BM25 (invertido).
2. Função search(query, topK) combinando BM25 + vetorial.
3. Criar modal de busca (CTRL+Shift+F) com resultados clicáveis.
4. Aba de configurações (ativação de agentes, modelo de embedding).	- Busca híbrida funcional (usando cache).
- Modal com campo de texto e lista de resultados.
- Configurações salvam no data.json do plugin.	- Resultados semanticamente relevantes (teste com “machine learning” acha notas sobre “neural networks”).
- Modal abre/fecha rápido.

Sprint 3
Dias 36–49	Agentes e Automatizações	1. Agente Daily Note: gerar nota diária com resumo do dia anterior (usando LLM local ou remoto).
2. Agente Semantic Watcher: sugerir links entre notas ao editar.
3. Scheduler (execução periódica configurável).
4. Integração opcional com Ollama (fallback para local).	- Daily notes criadas automaticamente no horário definido.
- Notificações de sugestão de links.
- Agentes podem ser ligados/desligados nas configs.	- Daily note contém texto relevante (ex: notas criadas/modificadas no dia).
- Sugestão de links não atrapalha edição.

Sprint 4
Dias 50–63	Performance, Testes e Release Candidata	1. Teste com vault de 10k arquivos (otimizar I/O e memória).
2. Implementar Web Worker para embedding (evitar bloqueio).
3. Escrever testes de integração (usando obsidian-api-mock).
4. Gerar CHANGELOG.md e documentação de API.
5. Submeter PR para obsidian-releases.	- Plugin aprovado no Community Registry (processo pode levar 5–10 dias).
- Documentação completa no README.
- Benchmark de performance anexado à release.	- Nenhum crash com vault grande.
- Testes de integração cobrem fluxos principais (busca, rebuild, daily note).

Sprint 5
Dias 64–77	Tração e Polimento	1. Landing page simples (GitHub Pages) com demonstração em vídeo.
2. Post no Product Hunt e em comunidades (Reddit, Obsidian Forum).
3. Coletar issues dos primeiros usuários e corrigir bugs críticos.
4. Implementar analytics anônimo (opcional) para features mais usadas.	- Pelo menos 50 stars no GitHub.
- 5 issues resolvidas de usuários reais.
- Vídeo tutorial (2 min) embutido no README.	- Nenhum bug bloqueador aberto.
- Usuários conseguem instalar e usar sem ler documentação.

Sprint 6
Dias 78–84	Versão 1.0.0 e Suporte Contínuo	1. Marcar release 1.0.0.
2. Criar template de issue para feature request e bug.
3. Estabelecer canal de suporte (Discord ou GitHub Discussions).
4. Planejar roadmap futuro (ex: suporte a múltiplos vaults, plugin mobile).	- Release estável marcada no GitHub.
- Canal de suporte ativo com pelo menos 10 membros.
- Documentação traduzida (opcional).	- Usuários reportam satisfação via feedback.
- Plugin aparece nas buscas do Obsidian Community Plugins.

📅 Cronograma Semanal (Exemplo com datas fictícias)
Semana	Sprint	Atividade Principal	Reunião de Checkpoint (você comigo)
1	0	Fundação + estrutura	Final da semana: revisão do código base
2–3	1	Embeddings + cache	Apresentação da busca semântica no console
4–5	2	Busca híbrida + UI	Demonstração do modal de busca
6–7	3	Agentes + scheduler	Daily note automática funcionando
8–9	4	Performance + release	PR enviado para obsidian-releases
10–11	5	Tração + polimento	Análise das primeiras métricas
12	6	Versão 1.0.0	Lançamento oficial
