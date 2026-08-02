# 1. Imagem base oficial otimizada/leve para Node.js
FROM node:18-alpine

# 2. Diretório de trabalho interno no container
WORKDIR /app

# 3. Cópia estratégica dos arquivos de manifesto para aproveitar o cache de camadas
COPY package*.json ./

# 4. Instalação de dependências do Node.js
RUN npm install

# 5. Cópia do restante do código-fonte para o container
COPY . .

# 6. Exposição da porta 3000 utilizada pela API
EXPOSE 3000

# 7. Comando padrão de inicialização do servidor
CMD ["npm", "start"]
