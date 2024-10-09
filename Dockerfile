# Etapa de build
FROM node:18-alpine AS builder

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de configuração de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Rodar o comando de build do Vite
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copiar os arquivos de build da aplicação para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80 para servir a aplicação
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
