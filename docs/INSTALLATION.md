# 🚀 Guia de Instalação - Pysend

## Pré-requisitos

### Software Necessário
- **Node.js** versão 18.0 ou superior
- **npm** (incluído com Node.js) ou **yarn**
- **Git** para clonagem do repositório
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

### Verificação dos Pré-requisitos

```bash
# Verificar versão do Node.js
node --version
# Deve retornar v18.0.0 ou superior

# Verificar versão do npm
npm --version
# Deve retornar 8.0.0 ou superior

# Verificar versão do Git
git --version
# Deve retornar uma versão válida
```

## 📦 Instalação

### 1. Clonagem do Repositório

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pysend.git

# Navegue para o diretório
cd pysend
```

### 2. Instalação das Dependências

```bash
# Usando npm (recomendado)
npm install

# OU usando yarn
yarn install
```

### 3. Verificação da Instalação

```bash
# Execute o projeto em modo desenvolvimento
npm run dev

# OU com yarn
yarn dev
```

O projeto será executado em `http://localhost:8080`

## ⚙️ Configuração do Ambiente

### Variáveis de Ambiente
O projeto utiliza variáveis de ambiente que são configuradas automaticamente pelo Vite. Não é necessário criar arquivo `.env` manualmente.

### Configuração de SMTP (Opcional)
Para envio real de emails, configure suas credenciais SMTP através da interface web:

1. Acesse `http://localhost:8080/settings`
2. Configure o servidor SMTP
3. Defina as credenciais de email

## 🔧 Scripts Disponíveis

### Desenvolvimento
```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Servidor com hot reload será executado em localhost:8080
```

### Build de Produção
```bash
# Gera build otimizado para produção
npm run build

# Arquivos serão gerados na pasta 'dist/'
```

### Preview do Build
```bash
# Visualiza o build de produção localmente
npm run preview

# Servidor será executado em localhost:4173
```

### Linting e Formatação
```bash
# Verifica problemas no código
npm run lint

# Formata automaticamente o código
npm run format
```

## 🐳 Instalação com Docker (Opcional)

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
```

### Comandos Docker
```bash
# Build da imagem
docker build -t pysend .

# Executar container
docker run -p 8080:8080 pysend
```

## 📱 Configuração para Dispositivos Móveis

### Acesso via Rede Local
Para testar em dispositivos móveis na mesma rede:

```bash
# Execute com bind para todas as interfaces
npm run dev -- --host 0.0.0.0

# Acesse via IP da máquina: http://192.168.1.XXX:8080
```

### PWA (Progressive Web App)
O projeto está configurado para funcionar como PWA:
- **Cache offline** para recursos estáticos
- **Instalação** no dispositivo
- **Ícones** otimizados para diferentes telas

## 🔍 Solução de Problemas

### Erro: "Cannot find module"
```bash
# Limpe o cache do npm
npm cache clean --force

# Remova node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erro de Porta em Uso
```bash
# Execute em porta diferente
npm run dev -- --port 3000

# OU defina variável de ambiente
PORT=3000 npm run dev
```

### Problemas de Permissão (Linux/Mac)
```bash
# Configure permissões do npm
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Problemas de CORS
Se encontrar problemas de CORS durante desenvolvimento:
```bash
# Execute com proxy configurado
npm run dev -- --host localhost
```

## 🌐 Deploy em Produção

### Netlify
1. Conecte seu repositório GitHub
2. Configure build command: `npm run build`
3. Configure publish directory: `dist`
4. Deploy automático será executado

### Vercel
1. Conecte seu repositório GitHub
2. Vercel detectará automaticamente as configurações
3. Deploy será executado automaticamente

### Servidor Próprio
```bash
# 1. Gere o build
npm run build

# 2. Configure servidor web (nginx exemplo)
server {
    listen 80;
    server_name seu-dominio.com;
    root /caminho/para/pysend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 3. Reinicie o nginx
sudo systemctl restart nginx
```

## 🔐 Configurações de Segurança

### HTTPS em Produção
```bash
# Usando Let's Encrypt
sudo certbot --nginx -d seu-dominio.com
```

### Headers de Segurança
Configure os seguintes headers no seu servidor:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

## 📊 Monitoramento

### Logs de Aplicação
```bash
# Visualizar logs em tempo real
npm run dev 2>&1 | tee logs/app.log

# Analisar erros
grep -i error logs/app.log
```

### Performance
Para monitorar performance:
- Use **Chrome DevTools** para análise
- **Lighthouse** para auditoria completa
- **Web Vitals** para métricas essenciais

## 🔄 Atualizações

### Atualização de Dependências
```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências menores
npm update

# Atualizar dependências maiores (cuidado!)
npm install package@latest
```

### Backup antes de Atualizações
```bash
# Backup do projeto
tar -czf pysend-backup-$(date +%Y%m%d).tar.gz .

# Backup do banco de dados (se aplicável)
# pg_dump ou mysqldump conforme necessário
```

## 📞 Suporte

Se encontrar problemas durante a instalação:

1. **Verifique os logs** de erro detalhadamente
2. **Consulte a documentação** específica de cada erro
3. **Procure issues similares** no GitHub
4. **Abra uma nova issue** com detalhes completos

### Informações para Suporte
Sempre inclua:
- Versão do Node.js (`node --version`)
- Versão do npm (`npm --version`)
- Sistema operacional
- Mensagem de erro completa
- Passos para reproduzir o problema

---

**Instalação concluída com sucesso? Acesse o [Guia do Usuário](USER_GUIDE.md) para começar a usar o Pysend!**