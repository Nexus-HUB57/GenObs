#!/bin/bash
echo "🚀 Configurando Ollama + Llama para GenObs..."

if ! command -v ollama &> /dev/null; then
    echo "Instalando Ollama..."
    curl -fsSL https://ollama.com/install.sh | sh
fi

echo "Iniciando Ollama..."
ollama serve > /dev/null 2>&1 &
sleep 4

echo "Baixando modelos..."
ollama pull llama3.2
ollama pull nomic-embed-text

echo "✅ Ollama configurado com sucesso!"
ollama list