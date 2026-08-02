# Relatório de Pesquisa: Instruções do Dockerfile
**Programa FAP - APONTI**  
**Atividade Prática: Containerização de API (Sala de Aula Invertida)**  
**Projeto:** API de Estoque (`estoque-api`)  

---

## 1. Introdução

O **Dockerfile** é o script declarativo responsável por orientar o Docker no processo de construção (*build*) de uma imagem de container. Ele funciona como uma "receita de bolo" automatizada que define desde o sistema operacional base e o ambiente de execução até as dependências, portas de comunicação e comandos de inicialização da aplicação.

Abaixo, detalhamos o papel e a semântica de cada uma das instruções principais utilizadas na containerização da **API de Estoque**.

---

## 2. Explicação das Instruções do Dockerfile

### `FROM`
- **O que faz:** Define a imagem base sobre a qual a nova imagem será construída.
- **Para que serve:** Em vez de configurar um sistema operacional do zero, utilizamos uma imagem pré-configurada e oficial mantida pela comunidade (por exemplo, `node:18-alpine`). A versão `alpine` é uma distribuição Linux extremamente leve e otimizada, reduzindo o tamanho final da imagem e aumentando a segurança do container.

### `WORKDIR`
- **O que faz:** Define o diretório de trabalho padrão (*working directory*) dentro do container.
- **Para que serve:** Todos os comandos subsequentes (`COPY`, `RUN`, `CMD`) serão executados a partir dessa pasta interna (por exemplo, `/app`). Caso o diretório informado não exista, o Docker o cria automaticamente.

### `COPY`
- **O que faz:** Copia arquivos ou diretórios da máquina hospedeira (*host*) para dentro do sistema de arquivos do container.
- **Para que serve:** É utilizado para transferir o código-fonte da aplicação e os arquivos de configuração (como `package.json`) para dentro do container. Ao copiar primeiro os manifestos de dependências (`package.json`) antes de instalar os pacotes, aproveitamos o mecanismo de *cache* de camadas do Docker, agilizando *builds* futuros.

### `RUN`
- **O que faz:** Executa comandos no ambiente do container durante a etapa de **construção** (*build*) da imagem.
- **Para que serve:** É empregado para instalar dependências do sistema ou bibliotecas do projeto (como `npm install`). O resultado de cada instrução `RUN` é salvo em uma nova camada permanente da imagem Docker.

### `EXPOSE`
- **O que faz:** Documenta e sinaliza qual porta de rede a aplicação dentro do container estará escutando.
- **Para que serve:** Serve como uma documentação explícita (para desenvolvedores e orquestradores) de que o serviço (neste caso, a API Node.js na porta `3000`) aguarda conexões nessa porta. *Nota:* Por si só, a instrução não publica a porta no host; o mapeamento é realizado no momento da execução (`docker run -p 3000:3000`).

### `CMD`
- **O que faz:** Especifica o comando padrão que será executado assim que o container for **instanciado** (*run*).
- **Para que serve:** Ao contrário da instrução `RUN` (que roda no build), o `CMD` roda em tempo de execução para iniciar a aplicação propriamente dita (por exemplo, `CMD ["npm", "start"]` ou `CMD ["node", "server.js"]`).

---

## 3. Conclusão

A utilização de um `Dockerfile` substitui abordagens imperativas e manuais de instalação por um fluxo declarativo, auditável e reproduzível em qualquer ambiente (desenvolvimento, staging ou produção).

---
