import json
import requests
import sseclient
import time

# CONFIGURAÇÕES DO AGENTE AFILIADO
FIREBASE_PROJETO = "SEU_PROJETO_FIREBASE"
FIREBASE_TOKEN = "SEU_TOKEN_OU_SECRET_DATABASE"
ID_DESTE_AFILIADO = "afiliado_venex_01"  # Identificador único deste nó

URL_STREAM_SUB = f"https://{FIREBASE_PROJETO}.firebaseio.com/subtarefas_agentes.json?auth={FIREBASE_TOKEN}"

print(f"🤖 [Agente Afiliado - {ID_DESTE_AFILIADO}]: Conectando ao Mural de Subtarefas...")

def executar_logica_afiliado(id_subtarefa, dados_subtarefa):
    print(f"🛠️ Realizando trabalho para a ação: {dados_subtarefa.get('comando_afiliado')}")
    
    # SIMULAÇÃO DO TRABALHO DO AGENTE (Sua inteligência Openclaw)
    # Aqui o robô executa a varredura, dispara webhooks ou monitora transações
    time.sleep(3) 
    
    # Entrega o relatório de volta ao Firebase e altera o status para validação
    url_entrega = f"https://{FIREBASE_PROJETO}.firebaseio.com/subtarefas_agentes/{id_subtarefa}.json?auth={FIREBASE_TOKEN}"
    payload_entrega = {
        "status_execucao": "pronto_validacao",
        "id_afiliado": ID_DESTE_AFILIADO,
        "resultado_parcial": "Varredura concluída com sucesso pelo nó afiliado."
    }
    
    requests.patch(url_entrega, data=json.dumps(payload_entrega))
    print("✅ Trabalho entregue ao Orquestrador para auditoria.")

def escutar_subtarefas():
    try:
        resposta_stream = requests.get(URL_STREAM_SUB, stream=True, headers={'Accept': 'text/event-stream'})
        cliente = sseclient.SSEClient(resposta_stream)
        
        for evento in cliente.events():
            if evento.event == 'put':
                dados_evento = json.loads(evento.data)
                caminho = dados_evento.get('path')
                dados_internos = dados_evento.get('data')
                
                if caminho == '/' and dados_internos:
                    for id_sub, conteudo in dados_internos.items():
                        # O afiliado pesca apenas o que está livre (id_afiliado nulo) e pendente
                        if isinstance(conteudo, dict) and conteudo.get('status_execucao') == 'pendente' and conteudo.get('id_afiliado') is None:
                            print(f"\n🎯 Subtarefa disponível encontrada: ID [{id_sub}]")
                            
                            # Trava a tarefa para si imediatamente mudando o status e assumindo a ID
                            url_trava = f"https://{FIREBASE_PROJETO}.firebaseio.com/subtarefas_agentes/{id_sub}.json?auth={FIREBASE_TOKEN}"
                            requests.patch(url_trava, data=json.dumps({
                                "status_execucao": "em_processamento",
                                "id_afiliado": ID_DESTE_AFILIADO
                            }))
                            
                            executar_logica_afiliado(id_sub, conteudo)
                            
    except Exception as e:
        print(f"🚨 Oscilação de rede no afiliado: {str(e)}. Reconectando...")
        time.sleep(5)
        escutar_subtarefas()

if __name__ == "__main__":
    escutar_subtarefas()
