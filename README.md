# Radio Browser Challenge

## Descrição
Este projeto é uma aplicação para reviver a experiência de ouvir rádio, permitindo que os usuários explorem estações de rádio do mundo todo, adicionem favoritos, editem informações, e ouçam suas estações preferidas.

## Tecnologias Utilizadas
- **Linguagem:** TypeScript, JavaScript
- **Framework:** React com Vite
- **Estilização:** Tailwind CSS
- **Gerenciamento de Estado:** React Hooks (useEffect, useCallBack, useState)
- **Bibliotecas de Ícones:** Phosphor Icons
- **Biblioteca para Testes:** Jest e Testing Library
- **Outras Tecnologias:** Axios para requisições HTTP, Docker para containerização

## Funcionalidades
- Adicionar estações de rádio à lista de favoritos
- Visualizar a lista de estações favoritas
- Remover estações da lista de favoritos
- Editar informações das estações favoritas
- Reproduzir e pausar a transmissão da rádio
- Buscar estações por nome, país ou idioma com paginação de 10 estações por vez
- Persistir os dados dos favoritos no localStorage

## Como Instalar e Usar o Projeto

### Pré-requisitos
- Node.js instalado na máquina
- Gerenciador de pacotes npm
- Docker (opcional, para rodar o projeto em container)

### Passos para Instalação

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:vitorluigif/teste-frontend-radio-browser.git
   cd teste-frontend-radio-browser
2. **Instale as dependências:**
   Para instalar todas as dependências do projeto, execute o comando:
   ```bash
   npm install

### Passos para Configuração e Execução do Projeto
   1. **Configurar variáveis de ambiente:**
      Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias, seguindo o exemplo do .env.example 
   2. **Rodar o projeto localmente:**
     Para iniciar o servidor de desenvolvimento, execute:
     ```bash
     npm run dev .
3. **Executar os testes:**
     Para iniciar os testes, execute:
     ```bash
     npm test .

## Usando Docker (opcional)
Para rodar o projeto utilizando Docker, siga os passos abaixo:
1. **Build da imagem Docker:**
   ```bash
   docker build -t radio-browser-app .
2. **Rodar o container:**
   ```bash
   docker run -p 3000:3000 radio-browser-app .

**Esses passos permitem criar e executar a aplicação em um ambiente Docker, facilitando a implantação e configuração do projeto.** 

## .gitignore

O projeto utiliza um arquivo `.gitignore` para evitar o commit de arquivos desnecessários.

## Usando Docker (opcional)
6. **Referência para o Challenge:**
Este projeto foi desenvolvido como parte de um desafio proposto pela [Coodesh](https://coodesh.com/). 

> This is a challenge by [Coodesh](https://coodesh.com/)
