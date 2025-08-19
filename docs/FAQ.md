# ❓ Perguntas Frequentes (FAQ) - Pysend

## 🎯 Geral

### O que é o Pysend?
O Pysend é um sistema web de automação para processamento de relatórios de vendas. Ele permite carregar arquivos Excel, processar dados de forma automática e enviar relatórios personalizados por email.

### Quais são os principais benefícios?
- **Automação completa**: Elimina tarefas manuais repetitivas
- **Interface intuitiva**: Fácil de usar, sem necessidade de conhecimento técnico
- **Personalização**: Configuração flexível de emails e relatórios
- **Eficiência**: Processamento rápido de grandes volumes de dados
- **Confiabilidade**: Sistema robusto com validações e tratamento de erros

### É gratuito?
Sim, o Pysend é um software livre e gratuito. Você pode usar, modificar e distribuir conforme necessário.

## 📤 Upload e Arquivos

### Quais formatos de arquivo são aceitos?
- **Excel 2007+**: .xlsx (recomendado)
- **Excel 97-2003**: .xls
- **Tamanho máximo**: 50MB (configurável)

### Por que meu arquivo não é aceito?
Possíveis causas:
- **Formato incorreto**: Apenas Excel é aceito
- **Arquivo corrompido**: Tente abrir no Excel e salvar novamente
- **Senha protegido**: Remova a proteção por senha
- **Muito grande**: Reduza o tamanho ou aumente o limite nas configurações

### Como deve estar estruturada a planilha?
```
| Loja          | Produto    | Quantidade | Valor   | Data       |
|---------------|------------|------------|---------|------------|
| Loja Centro   | Produto A  | 10         | 100.00  | 01/01/2024 |
| Loja Norte    | Produto B  | 5          | 250.00  | 01/01/2024 |
```

**Requisitos:**
- Primeira linha com cabeçalhos
- Dados nas linhas seguintes
- Sem células mescladas
- Formato de data consistente

### Posso processar múltiplos arquivos?
Atualmente, o sistema processa um arquivo por vez. Para múltiplos arquivos:
1. Combine em uma única planilha, ou
2. Processe um de cada vez

## 📧 Email e Configurações

### Como configurar o email SMTP?
1. Acesse **Configurações** → **Email**
2. Configure:
   - **Servidor SMTP**: Ex: smtp.gmail.com
   - **Porta**: 587 (TLS) ou 465 (SSL)
   - **Credenciais**: Seu email e senha

### Configurações para provedores populares:

#### Gmail
```
Servidor: smtp.gmail.com
Porta: 587
Segurança: TLS
Nota: Use senha de app, não a senha normal
```

#### Outlook/Hotmail
```
Servidor: smtp.outlook.com
Porta: 587
Segurança: TLS
```

#### Yahoo
```
Servidor: smtp.mail.yahoo.com
Porta: 587 ou 465
Segurança: TLS ou SSL
```

### Como criar senha de app no Gmail?
1. Ative a **verificação em duas etapas**
2. Vá em **Conta Google** → **Segurança**
3. Em **Como fazer login no Google**, clique em **Senhas de app**
4. Selecione **Email** e **Outro (nome personalizado)**
5. Digite "Pysend" e clique em **Gerar**
6. Use a senha gerada (16 caracteres) no Pysend

### Posso alterar o template do email?
Sim! Na configuração de email você pode personalizar:
- **Assunto**: Use {date} para inserir a data atual
- **Mensagem**: Texto personalizado
- **Remetente**: Nome que aparece no email

### O email não está sendo enviado. O que fazer?
Verifique:
1. **Configurações SMTP**: Servidor, porta, credenciais
2. **Conexão internet**: Teste outras aplicações
3. **Firewall**: Libere a porta SMTP
4. **Limite do provedor**: Alguns limitam envios por hora
5. **Spam**: Verifique a pasta de spam do destinatário

## 📊 Relatórios e Dados

### Que métricas são calculadas?
- **Receita Total**: Soma de todas as vendas
- **Produtos Vendidos**: Quantidade total de itens
- **Ticket Médio**: Receita ÷ quantidade total
- **Performance por Loja**: Classificação baseada na receita

### Como é calculada a performance?
- **Alta**: ≥ 25% da receita total
- **Média**: 15% a 24% da receita total
- **Baixa**: < 15% da receita total

### Posso exportar os dados?
Sim! Clique em **Exportar CSV** na página de relatórios. O arquivo incluirá:
- Dados por loja
- Formatação brasileira (ponto e vírgula)
- Codificação UTF-8

### Os dados ficam salvos?
- **Temporariamente**: Dados ficam na sessão atual
- **Configurações**: Salvas no navegador (localStorage)
- **Arquivos**: Não são armazenados permanentemente (por segurança)

## 🔧 Problemas Técnicos

### O sistema está lento. O que fazer?
Possíveis soluções:
1. **Arquivo grande**: Reduza o tamanho da planilha
2. **Navegador**: Feche outras abas, limpe cache
3. **Conexão**: Verifique a velocidade da internet
4. **Horário**: Use em horários de menor tráfego

### Erro "Arquivo não encontrado"
- Verifique se o arquivo ainda existe no local original
- Tente fazer upload novamente
- Certifique-se de que o arquivo não está aberto em outro programa

### A página não carrega
1. **Atualizar**: Pressione F5 ou Ctrl+F5
2. **Cache**: Limpe o cache do navegador
3. **JavaScript**: Verifique se está habilitado
4. **Extensões**: Desative temporariamente

### Configurações não são salvas
- Verifique se o JavaScript está habilitado
- Limpe cookies e dados do site
- Tente em modo anônimo/privado
- Use navegador diferente para testar

## 📱 Mobile e Dispositivos

### Funciona no celular?
Sim! O Pysend é totalmente responsivo e funciona em:
- **Smartphones**: Interface otimizada para toque
- **Tablets**: Layout adaptado
- **Desktops**: Experiência completa

### Posso instalar como app?
Sim! O Pysend é um PWA (Progressive Web App):
1. Acesse pelo navegador móvel
2. Procure por "Adicionar à tela inicial"
3. O app funcionará como nativo

### Upload de arquivo no mobile
- **Toque**: Toque na área de upload
- **Seleção**: Escolha da galeria ou tire foto (se Excel estiver em nuvem)
- **Drag & Drop**: Disponível em tablets

## 🔒 Segurança e Privacidade

### Meus dados estão seguros?
Sim! O Pysend implementa várias camadas de segurança:
- **Processamento local**: Dados não saem do seu navegador
- **Validação rigorosa**: Apenas arquivos Excel válidos
- **Sem armazenamento**: Arquivos não ficam no servidor
- **HTTPS**: Conexão criptografada (em produção)

### Quais dados são coletados?
**Dados coletados:**
- Configurações de email (criptografadas)
- Logs de atividade (apenas localmente)
- Métricas de uso (anônimas)

**Dados NÃO coletados:**
- Conteúdo dos arquivos Excel
- Dados pessoais dos clientes
- Informações confidenciais de vendas

### Posso usar em ambiente corporativo?
Sim! O Pysend é adequado para uso corporativo:
- **Deploy próprio**: Instale em seus servidores
- **Personalização**: Adapte conforme necessário
- **Compliance**: Atende requisitos básicos de segurança
- **Logs**: Rastreamento de atividades

## 🚀 Recursos Avançados

### Posso agendar envios automáticos?
Na versão atual, não. Mas está no roadmap para versão 2.0:
- Agendamento diário/semanal/mensal
- Processamento em lote
- Múltiplos destinatários

### Como personalizar o visual?
O sistema usa um design system flexível. Para personalização:
1. **CSS customizado**: Adicione estilos próprios
2. **Tema escuro**: Em desenvolvimento
3. **Logo personalizado**: Substitua na pasta assets

### Integração com outras ferramentas?
Planejado para versões futuras:
- **APIs REST**: Para integrações
- **Webhooks**: Notificações automáticas
- **BI Tools**: Conectores para Power BI, Tableau
- **ERP**: Integração com sistemas corporativos

## 🛠️ Instalação e Setup

### Posso instalar no meu servidor?
Sim! Veja o [Guia de Instalação](INSTALLATION.md) para instruções completas.

### Requisitos mínimos?
- **Node.js**: 18.0+
- **RAM**: 2GB
- **Disco**: 1GB livre
- **Navegador**: Chrome 90+, Firefox 88+, Safari 14+

### Como atualizar?
```bash
git pull origin main
npm install
npm run build
```

### Backup das configurações
As configurações ficam no localStorage do navegador. Para backup:
1. Exporte via **Configurações** → **Backup**
2. Copie o arquivo JSON gerado
3. Para restaurar, importe o arquivo

## 📞 Suporte

### Como obter ajuda?
1. **FAQ**: Consulte esta documentação
2. **Documentação**: Veja [docs/](.)
3. **Issues**: Abra issue no GitHub
4. **Email**: contato.pedromoratolahoz@gmail.com

### Horário de suporte
- **Dias**: Segunda a sexta-feira
- **Horário**: 8h às 18h (Brasília)
- **Resposta**: Até 24 horas úteis

### Como reportar bugs?
1. **Descreva o problema**: Seja específico
2. **Passos para reproduzir**: Detalhe o que fez
3. **Ambiente**: Navegador, OS, versão
4. **Screenshots**: Se possível, anexe imagens
5. **Logs**: Console do navegador (F12)

### Sugestões de melhorias
Adoramos feedback! Envie sugestões via:
- **GitHub Issues**: Para funcionalidades técnicas
- **Email**: Para ideias gerais
- **Formulário**: Em breve no site

## 🔄 Roadmap

### Próximas funcionalidades
**Versão 1.1 (Em breve):**
- [ ] Tema escuro
- [ ] Múltiplos idiomas
- [ ] Backup/restore de configurações
- [ ] Melhor tratamento de erros

**Versão 2.0 (Q2 2024):**
- [ ] Backend completo
- [ ] Múltiplos usuários
- [ ] Agendamento de relatórios
- [ ] Dashboard analítico avançado

### Como sugerir funcionalidades?
1. Verifique se já não existe
2. Abra issue no GitHub com tag "enhancement"
3. Descreva o caso de uso
4. Explique o benefício esperado

---

**Não encontrou sua dúvida? Entre em contato conosco!**
**Email**: contato.pedromoratolahoz@gmail.com