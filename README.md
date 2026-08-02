# 📦 API de Estoque - Containerização com Docker
**Programa FAP - APONTI** | *Disciplina de DevOps / Faculdade*  
*Atividade Prática:* Containerização de API (Metodologia: Sala de Aula Invertida)  


---

## 📌 1. Sobre o Projeto e a Atividade

Esta aplicação é uma **API RESTful de Gestão de Estoque** desenvolvida em **Node.js** com o framework **Express**.

O objetivo desta atividade prática foi substituir o script imperativo tradicional de instalação por uma solução moderna, declarativa e padronizada utilizando **Docker**, garantindo a isolamento da aplicação e a portabilidade do ambiente em qualquer infraestrutura.

---

## 🎯 2. O que era a Atividade (Requisitos Exigidos)

A atividade foi dividida em duas etapas principais conforme o roteiro oficial do programa APONTI:

### 📄 Etapa 1: Pesquisa Teórica (Entregável)
Pesquisar e explicar detalhadamente com palavras próprias a semântica das 6 instruções fundamentais de um `Dockerfile`:
- `FROM`: Definição da imagem base.
- `WORKDIR`: Definição do diretório de trabalho interno do container.
- `COPY`: Transferência estratégica de arquivos do host para o container.
- `RUN`: Execução de comandos no build (instalação de pacotes).
- `EXPOSE`: Sinalização e documentação da porta de rede do serviço.
- `CMD`: Comando padrão executado na inicialização do container.

> 💡 *O relatório completo referente a esta pesquisa foi disponibilizado no arquivo [`Relatorio_Pesquisa_Docker.md`](./Relatorio_Pesquisa_Docker.md).*

### 🛠️ Etapa 2:Containerização Prática
1. Criar o arquivo `Dockerfile` na raiz do projeto `estoque-api` utilizando uma imagem oficial otimizada do Node.js (`node:18-alpine`).
2. Mapear a porta de execução original do servidor (`3000`).
3. Criar o arquivo `.dockerignore` para otimizar o build e evitar cópia de `node_modules` ou logs.
4. Ajustar os manifestos do Node.js (`package.json` / `server.js`) para suportar inicialização padronizada (`npm start`) e verificação de rotas de status (`GET /api/status`).

---

## 🚀 3. Como foi Implementado (Passo a Passo)

1. **Modelagem do `Dockerfile`**:
   - Escolha da imagem leve `node:18-alpine` para reduzir o tamanho do container e acelerar o deploy.
   - Utilização de técnica de caching em camadas copiando primeiramente o `package*.json` antes da execução do `npm install`.
2. **Criação do `.dockerignore`**:
   - Inclusão da pasta `node_modules`, arquivos de log e artefatos Git para reduzir a sobrecarga no build.
3. **Ajustes de Código e Submódulos**:
   - Inicialização e vinculação dos subcomponentes de contratos (`estoque-contracts`) e infraestrutura (`estoque-infra-config`).
   - Adição de rotas HTTP `GET` de verificação de status no [server.js](./server.js).

---

## 📁 4. Estrutura do Repositório

```text
estoque-api/
├── config/                  # Submódulo Git de configurações de infraestrutura
├── contracts/               # Submódulo Git com regras de validação JSON
├── controllers/             # Lógica de controle dos produtos
├── routes/                  # Rotas da API Express
├── .dockerignore            # Arquivos ignorados pelo Docker na construção
├── Dockerfile               # Receita declarativa da imagem Docker
├── package.json             # Dependências e scripts do Node.js
├── Relatorio_Pesquisa_Docker.md # Documento explicativo da Etapa Teórica
├── server.js                # Ponto de entrada do servidor Node.js
└── README.md                # Documentação oficial do repositório
```

---

## 💻 5. Como Executar o Projeto

### Opção A: Executando com Docker (Recomendado)

#### 1. Construir a Imagem Docker
No terminal, dentro da pasta do projeto:
```bash
docker build -t estoque-api .
```

#### 2. Executar o Container
```bash
docker run -d -p 3000:3000 --name estoque-api-container estoque-api
```

#### 3. Testar a Aplicação
Acesse a rota de status no seu navegador ou via cURL:
[http://localhost:3000/api/status](http://localhost:3000/api/status)

---

### Opção B: Executando Nativamente com Node.js

#### 1. Instalar as Dependências
```bash
npm install
```

#### 2. Iniciar o Servidor
```bash
npm start
```

#### 3. Testar a Aplicação
Acesse: [http://localhost:3000](http://localhost:3000)


