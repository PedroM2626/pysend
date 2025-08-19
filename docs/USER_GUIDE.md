# 👤 Guia do Usuário - Pysend

## 🎯 Primeiros Passos

### 1. Acesso ao Sistema
Após a instalação, acesse o Pysend através do navegador:
- **Desenvolvimento**: `http://localhost:8080`
- **Produção**: Seu domínio configurado

### 2. Interface Principal
O Pysend possui 4 seções principais:
- **📊 Dashboard**: Visão geral e métricas
- **📤 Upload**: Carregamento de arquivos Excel
- **📈 Relatórios**: Visualização de dados processados
- **⚙️ Configurações**: Personalização do sistema

## 📊 Dashboard

### Visão Geral
O dashboard é sua central de comando, mostrando:

#### Métricas Principais
- **Relatórios Processados**: Total de arquivos processados
- **Emails Enviados**: Quantidade de emails enviados
- **Taxa de Sucesso**: Percentual de operações bem-sucedidas
- **Usuários Ativos**: Número de usuários utilizando o sistema

#### Atividade Recente
Timeline das últimas operações:
- ✅ **Sucessos**: Relatórios processados com sucesso
- ⏳ **Em Processamento**: Arquivos sendo processados
- ⚠️ **Avisos**: Problemas menores encontrados
- ❌ **Erros**: Falhas que precisam de atenção

#### Status do Sistema
Monitoramento em tempo real:
- **Servidor Principal**: Status de conexão
- **Email SMTP**: Conectividade do email
- **Processamento**: Sistema de processamento
- **Backup**: Serviço de backup

### Ações Rápidas
Botões de acesso direto:
- **Processar Novo Arquivo Excel**: Vai para upload
- **Visualizar Relatórios**: Acessa os relatórios
- **Configurar Email**: Abre configurações de email

## 📤 Upload de Arquivos

### Carregamento de Arquivos

#### Métodos de Upload
1. **Drag & Drop**: Arraste o arquivo para a área designada
2. **Clique para Selecionar**: Clique no botão e escolha o arquivo
3. **Formatos Aceitos**: Apenas .xlsx e .xls (Excel)

#### Validações Automáticas
- **Formato**: Verifica se é arquivo Excel válido
- **Tamanho**: Limite máximo configurável (padrão: 50MB)
- **Integridade**: Verifica se o arquivo não está corrompido

### Configuração de Email

#### Campos Obrigatórios
- **Email Destinatário**: Para onde enviar o relatório
- **Assunto do Email**: Título da mensagem (use {date} para data atual)

#### Campos Opcionais
- **Nome do Remetente**: Como aparecerá no email
- **Mensagem Personalizada**: Texto adicional no email

#### Opções Avançadas
- **Incluir Gráficos**: Adiciona visualizações ao relatório
- **Envio Automático**: Envia automaticamente após processamento

### Processamento

#### Etapas do Processo
1. **Carregando arquivo Excel**: Upload e validação
2. **Processando dados de vendas**: Leitura das planilhas
3. **Calculando métricas**: Análise dos dados
4. **Gerando relatório**: Criação do documento final
5. **Enviando email**: Envio para destinatário
6. **Concluído**: Operação finalizada

#### Acompanhamento
- **Barra de Progresso**: Mostra o andamento atual
- **Status em Tempo Real**: Descrição da etapa atual
- **Estimativa de Tempo**: Tempo restante aproximado

## 📈 Relatórios

### Métricas de Vendas

#### Cards de Resumo
- **Receita Total**: Soma de todas as vendas
- **Produtos Vendidos**: Quantidade total de itens
- **Ticket Médio**: Valor médio por transação
- **Lojas Ativas**: Número de lojas com vendas

#### Funcionalidades
- **Atualização Automática**: Dados sempre atualizados
- **Comparação Temporal**: Variação percentual
- **Drill-down**: Clique para detalhes

### Tabela de Performance

#### Dados por Loja
- **Loja**: Nome da unidade
- **Receita**: Faturamento total
- **Qtd. Vendida**: Número de produtos
- **Ticket Médio**: Receita ÷ quantidade
- **Performance**: Classificação (Alta/Média/Baixa)

#### Funcionalidades da Tabela
- **Ordenação**: Clique nos cabeçalhos para ordenar
- **Performance Visual**: Badges coloridos para classificação
- **Destaque**: Melhor loja em destaque
- **Responsiva**: Adapta-se a diferentes telas

### Exportação de Dados

#### Formato CSV
- **Separador**: Ponto e vírgula (;)
- **Codificação**: UTF-8
- **Formato de Data**: DD/MM/AAAA
- **Formato Monetário**: R$ 0.000,00

#### Como Exportar
1. Clique no botão **Exportar CSV**
2. Arquivo será baixado automaticamente
3. Nome do arquivo: `relatorio-vendas-AAAA-MM-DD.csv`

## ⚙️ Configurações

### Configurações de Email

#### Servidor SMTP
- **Servidor SMTP**: Endereço do servidor (ex: smtp.gmail.com)
- **Porta**: Porta de conexão (587 para TLS, 465 para SSL)
- **Email Padrão**: Email que aparecerá como remetente
- **Timeout**: Tempo limite para conexão (segundos)

#### Exemplos de Configuração

##### Gmail
```
Servidor SMTP: smtp.gmail.com
Porta: 587
Segurança: TLS
```

##### Outlook
```
Servidor SMTP: smtp.outlook.com
Porta: 587
Segurança: TLS
```

##### Yahoo
```
Servidor SMTP: smtp.mail.yahoo.com
Porta: 587
Segurança: TLS
```

### Notificações

#### Tipos de Notificação
- **Habilitar Notificações**: Liga/desliga todo o sistema
- **Notificar Sucessos**: Alertas para operações bem-sucedidas
- **Notificar Erros**: Alertas para falhas
- **Relatórios por Email**: Resumos semanais automáticos

### Processamento

#### Configurações de Arquivo
- **Processamento Automático**: Processa arquivos automaticamente
- **Backup de Arquivos**: Mantém cópia dos arquivos processados
- **Tentativas de Reenvio**: Número de tentativas em caso de falha
- **Tamanho Máximo**: Limite de tamanho por arquivo (MB)

### Segurança

#### Autenticação
- **Requer Autenticação**: Exige login para acesso
- **Timeout de Sessão**: Tempo para desconexão automática (minutos)

#### Logs
- **Habilitar Logs**: Registra atividades do sistema
- **Nível de Log**: Detalhamento dos registros

## 📝 Fluxo de Trabalho Típico

### Uso Diário
1. **Acessar Dashboard**: Verificar status geral
2. **Upload de Arquivo**: Carregar planilha do dia
3. **Configurar Email**: Definir destinatário (se alterado)
4. **Processar**: Executar o processamento
5. **Verificar Relatório**: Conferir dados gerados

### Uso Semanal
1. **Revisar Métricas**: Análise de performance semanal
2. **Exportar Dados**: Backup em CSV
3. **Configurações**: Ajustar configurações se necessário
4. **Verificar Logs**: Revisar atividades da semana

### Uso Mensal
1. **Análise Completa**: Revisão detalhada dos dados
2. **Backup Completo**: Arquivos e configurações
3. **Atualização**: Verificar atualizações disponíveis
4. **Otimização**: Ajustar configurações baseado no uso

## 🔧 Solução de Problemas

### Problemas Comuns

#### Arquivo não é Aceito
**Causa**: Formato incorreto ou arquivo corrompido
**Solução**: 
- Verifique se é arquivo .xlsx ou .xls
- Abra no Excel e salve novamente
- Verifique se não há senha no arquivo

#### Email não é Enviado
**Causa**: Configurações SMTP incorretas
**Solução**:
- Verifique servidor e porta
- Confirme credenciais de email
- Teste com outro provedor de email

#### Dados não Aparecem
**Causa**: Planilha mal formatada
**Solução**:
- Verifique se há cabeçalhos na primeira linha
- Confirme se dados estão na planilha correta
- Remova células mescladas

#### Sistema Lento
**Causa**: Arquivo muito grande ou conexão lenta
**Solução**:
- Reduza tamanho do arquivo
- Verifique conexão de internet
- Processe em horários de menos tráfego

### Contatos para Suporte

#### Suporte Técnico
- **Email**: contato.pedromoratolahoz@gmail.com
- **Horário**: Segunda a sexta, 8h às 18h
- **Resposta**: Até 24 horas úteis

#### Recursos Adicionais
- **Documentação**: [docs/TECHNICAL.md](TECHNICAL.md)
- **FAQ**: [docs/FAQ.md](FAQ.md)
- **Vídeos**: Canal no YouTube (em breve)

## 📱 Uso Mobile

### Responsividade
O Pysend é totalmente responsivo:
- **Smartphone**: Interface otimizada para toque
- **Tablet**: Layout adaptado para tela média
- **Desktop**: Experiência completa

### PWA (Progressive Web App)
- **Instalação**: Adicione à tela inicial
- **Offline**: Funcionalidades básicas sem internet
- **Notificações**: Receba alertas no dispositivo

## 📈 Dicas de Produtividade

### Organização de Arquivos
- **Nomenclatura**: Use padrão "vendas_AAAA_MM_DD.xlsx"
- **Pastas**: Organize por mês/ano
- **Backup**: Mantenha cópias locais

### Automação
- **Envio Automático**: Configure para envios regulares
- **Templates**: Use modelos padrão de email
- **Agendamento**: Processe em horários fixos

### Análise
- **Comparação**: Compare dados de períodos diferentes
- **Tendências**: Observe padrões de vendas
- **Alertas**: Configure alertas para metas

---

**Dúvidas sobre o uso? Consulte nossa [FAQ](FAQ.md) ou entre em contato com o suporte!**