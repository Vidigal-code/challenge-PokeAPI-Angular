# Pokédex App 📱🔍

## Descrição em Português

Este projeto é uma aplicação mobile e web híbrida desenvolvida com **Ionic + Angular + TypeScript + TailwindCSS**, consumindo a [PokeAPI](https://pokeapi.co/).  
A tela principal exibe uma lista paginada de Pokémons com nome e imagem, e redireciona para uma tela de detalhes com informações adicionais.  
Implementei **injeção de dependência** com os serviços Angular (`@Injectable`), facilitando testes e reaproveitamento de lógica.  
Utilizei **componentização Angular** com módulos e rotas organizadas para escalabilidade e separação de responsabilidades.  
A interface é **responsiva e adaptativa**, aproveitando os recursos do **Ionic Framework** e estilos personalizados com **TailwindCSS**.  
Usuários podem marcar Pokémons como **favoritos**, que são salvos localmente usando o `Storage` do Ionic.  
Segui boas práticas de versionamento com **commits semânticos**, **nomes claros** e estrutura de código modular.  
Implementei **pipes e diretivas customizadas** para otimizar o carregamento e formatação dos dados.  
A aplicação está preparada para **modo retrato e paisagem**, com experiência fluida em dispositivos móveis e tablets.  
O projeto está disponível no GitHub, incluindo **imagens, GIFs demonstrativos** e testes com **Karma + Jasmine**.

---

## English Description

This project is a hybrid mobile and web app built using **Ionic + Angular + TypeScript + TailwindCSS**, consuming the [PokeAPI](https://pokeapi.co/).  
The main screen displays a paginated list of Pokémon with names and images, and redirects to a detail screen with additional data.  
I implemented **dependency injection** using Angular services (`@Injectable`) to improve testability and logic reuse.  
Angular **component and module structure** ensures scalability and proper separation of concerns.  
The interface is **responsive and adaptive**, leveraging **Ionic Framework** and custom styling via **TailwindCSS**.  
Users can mark Pokémon as **favorites**, stored locally using Ionic's `Storage` service.  
I followed clean code practices with **semantic commits**, **clear naming**, and modular code architecture.  
Custom **pipes and directives** help optimize data formatting and performance.  
The app adapts to both **portrait and landscape modes**, offering a smooth experience across phones and tablets.  
The GitHub repo includes **screenshots, demo GIFs**, and unit tests using **Karma + Jasmine**.

---


<p align="center">
  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" width="150" alt="Pikachu">
</p>

<p align="center">
  Uma aplicação web e mobile moderna para explorar o mundo dos Pokémons, construída com Ionic, Angular, e TailwindCSS.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white" alt="Ionic">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
</p>

---

<details>
<summary><strong>Português 🇧🇷 (Clique para expandir)</strong></summary>

## 📜 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [🏛️ Arquitetura e Boas Práticas](#️-arquitetura-e-boas-práticas)
- [🪝 Implementação de WebHook (Diferencial)](#-implementação-de-webhook-diferencial)
- [🧪 Testes Unitários (Diferencial)](#-testes-unitários-diferencial)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [📁 Estrutura de Arquivos](#-estrutura-de-arquivos)
- [☁️ Deploy](#️-deploy)
- [👨‍💻 Autor](#-autor)

## 📖 Sobre o Projeto

Este projeto é uma Pokédex moderna e responsiva desenvolvida como uma aplicação híbrida (web/mobile) utilizando o poder do **Ionic** e **Angular**. Ele consome a [PokeAPI](https://pokeapi.co/) para fornecer uma lista paginada e pesquisável de Pokémons, com uma tela de detalhes rica em informações para cada criatura.

O projeto foi construído seguindo as melhores práticas de desenvolvimento, com foco em código limpo, componentização, reutilização de lógica e uma arquitetura escalável.

## ✨ Funcionalidades

-   **Listagem e Paginação:** Navegue por uma lista completa de Pokémons com um sistema de paginação eficiente.
-   **Busca Dinâmica:** Encontre Pokémons rapidamente por nome ou número, com `debounce` para otimizar a performance.
-   **Tela de Detalhes Completa:** Veja informações detalhadas como tipos, habilidades, estatísticas, habitat e múltiplos sprites.
-   **Sistema de Favoritos:** Marque seus Pokémons preferidos! A lista é salva localmente (`localStorage`) para persistir entre as sessões.
-   **Página de Favoritos Dedicada:** Gerencie sua coleção de favoritos em uma tela separada, com busca e paginação próprias.
-   **Design Responsivo:** A interface se adapta perfeitamente a qualquer dispositivo, seja celular (retrato/paisagem) ou desktop, graças ao TailwindCSS.
-   **Notificações de WebHook:** Ações na lista de favoritos (adicionar, remover, limpar) enviam notificações em tempo real para um servidor backend.
-   **Feedback Visual:** A aplicação usa *Toasts* para notificar os usuários sobre erros de API, melhorando a experiência de uso.

## 🛠️ Tecnologias Utilizadas

-   **Frontend:**
  -   **Angular 20:** Framework principal para a estrutura da aplicação.
  -   **Ionic 8:** Biblioteca de componentes de UI para criar aplicações híbridas de alta qualidade.
  -   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
  -   **TailwindCSS:** Framework CSS utility-first para estilização rápida e responsiva.
  -   **RxJS:** Biblioteca para programação reativa, usada para gerenciar chamadas de API e eventos.
-   **Backend (Servidor de WebHook):**
  -   **Node.js:** Ambiente de execução JavaScript no servidor.
  -   **Express.js:** Framework minimalista para criar o servidor e a rota do webhook.
-   **Testes:**
  -   **Karma:** Test runner para executar os testes unitários.
  -   **Jasmine:** Framework de testes behavior-driven para escrever os casos de teste.

## 🏛️ Arquitetura e Boas Práticas

-   **Componentização:** A aplicação é dividida em componentes `standalone` (Pages, Header, Footer), promovendo a separação de responsabilidades.
-   **Injeção de Dependência (DI):** Utilizamos o `inject()` do Angular para fornecer serviços (`PokeApiService`, `FavoritesService`, `PaginationService`) aos componentes. Isso desacopla o código, facilita a manutenção e torna os testes unitários possíveis.
-   **Princípio DRY (Don't Repeat Yourself):** A lógica de paginação e busca, que era repetida nas páginas Home e Favoritos, foi abstraída para um serviço reutilizável, o `PaginationService`. Isso centraliza a lógica e torna os componentes mais limpos.
-   **Reatividade com RxJS:** As chamadas de API retornam `Observables`, e a barra de busca utiliza um `Subject` com `debounceTime` para evitar requisições excessivas enquanto o usuário digita.
-   **Tratamento de Erros:** As falhas de API são capturadas e o `ToastController` do Ionic é usado para exibir mensagens de erro amigáveis ao usuário, garantindo uma experiência mais robusta.

## 🪝 Implementação de WebHook (Diferencial)

Um WebHook foi implementado para demonstrar a comunicação em tempo real do frontend com um backend. Quando uma ação relacionada aos favoritos ocorre, o frontend notifica um servidor.

#### Como Funciona:

1.  **Ação no Frontend:** O usuário adiciona ou remove um Pokémon dos favoritos no `FavoritesService`.
2.  **Requisição HTTP:** O serviço imediatamente dispara uma requisição `POST` para o endpoint `http://localhost:3000/webhook`. O `payload` da requisição contém o tipo de evento (`pokemon_added`, `pokemon_removed`, etc.) e os dados relevantes.
    ```typescript
    // Em favorites.service.ts
    this.http.post(this.webhookUrl, {
      event: 'pokemon_added',
      pokemonId,
      timestamp: new Date().toISOString()
    }).subscribe(...);
    ```
3.  **Recepção no Backend:** Um servidor simples criado com Node.js e Express está escutando na porta 3000.
4.  **Processamento:** O servidor recebe o `payload`, exibe as informações no console e retorna uma resposta de sucesso (`200 OK`). Isso simula o processamento do evento, que em um cenário real poderia disparar um email, atualizar um banco de dados, etc.
    ```javascript
    // Em webhook-server/server.js
    app.post('/webhook', (req, res) => {
      console.log('Webhook received:', req.body);
      res.status(200).json({ message: 'Webhook processed successfully' });
    });
    ```

## 🧪 Testes Unitários (Diferencial)

A aplicação possui uma suíte de testes unitários para garantir a qualidade e o funcionamento correto dos componentes.

#### Como os Testes Foram Estruturados:

-   **Ambiente de Teste (`TestBed`):** Para cada componente, o `TestBed` do Angular é usado para configurar um ambiente de teste isolado, declarando o componente a ser testado e fornecendo *mocks* para suas dependências.
-   **Mocks e Spies:** Dependências como `PokeApiService` e `Router` são substituídas por objetos falsos (`SpyObj`) criados com `jasmine.createSpyObj`. Isso nos permite isolar o componente e controlar o comportamento de suas dependências durante os testes.
-   **Casos de Teste (`it` blocks):** Cada `it` descreve um comportamento esperado. Nós verificamos se:
  -   O componente é criado com sucesso.
  -   A navegação para outras páginas é chamada com os parâmetros corretos.
  -   A lógica de negócio (como adicionar/remover um favorito) chama os métodos corretos do serviço.
  -   O estado do componente é atualizado corretamente após uma ação.

```typescript
// Exemplo de teste em favorites.page.spec.ts
it('should remove favorite and update pagination', fakeAsync(() => {
  // Configuração inicial do estado do componente
  component.allFavorites = [
    { id: 1, name: 'bulbasaur' },
    { id: 25, name: 'pikachu' }
  ];
  component.paginationService.total = 2;
  spyOn(favoritesService, 'removeFavorite'); // Espiona o método

  // Executa a ação
  component.removeFavorite(1);
  tick(); // Avança o tempo para resolver operações assíncronas

  // Verificações (Assertions)
  expect(favoritesService.removeFavorite).toHaveBeenCalledWith(1);
  expect(component.allFavorites.length).toBe(1);
  expect(component.paginationService.total).toBe(1);
}));
```

## 🚀 Como Executar o Projeto

Você precisará ter o [Node.js](https://nodejs.org/) e o [pnpm](https://pnpm.io/) (ou npm/yarn) instalados.

#### 1. Frontend (Aplicação Angular/Ionic)

```bash
# Clone o repositório
git clone https://github.com/Vidigal-code/challenge-PokeAPI-Angular.git

# Navegue para a pasta do projeto
cd challenge-PokeAPI-Angular

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm start
```

A aplicação estará disponível em `http://localhost:4200`.

#### 2. Backend (Servidor de WebHook)

O servidor de webhook deve ser executado simultaneamente em um terminal separado.

```bash
# Em um novo terminal, navegue para a pasta do servidor
cd webhook-server

# Instale as dependências
pnpm install

# Crie o arquivo de ambiente (se não existir)
cp .env.example .env

# Inicie o servidor
pnpm start
```

O servidor estará escutando em `http://localhost:3000`. Agora, as ações de favoritar na aplicação serão logadas no console deste terminal.

## 📁 Estrutura de Arquivos

A estrutura do projeto foi organizada para manter uma clara separação de responsabilidades.

```
.
├── src/
│   ├── app/
│   │   ├── favorites/        # Página de Favoritos (componente, HTML, spec)
│   │   ├── home/             # Página Principal (componente, HTML, spec)
│   │   ├── pokemon-details/  # Página de Detalhes (componente, HTML, spec)
│   │   ├── services/         # Serviços reutilizáveis
│   │   │   ├── favorites.service.ts
│   │   │   ├── pagination.service.ts
│   │   │   └── poke-api.service.ts
│   │   ├── header/           # Componente Header
│   │   ├── footer/           # Componente Footer
│   │   ├── app.component.ts  # Componente raiz
│   │   └── app.routes.ts     # Definição de rotas
│   ├── assets/               # Ícones e imagens estáticas
│   └── environments/         # Variáveis de ambiente
├── webhook-server/           # Servidor Node.js para o WebHook
│   ├── server.js
│   ├── package.json
│   └── .env
└── ...
```

## ☁️ Deploy

A aplicação está configurada para deploy no GitHub Pages. Os seguintes scripts no `package.json` automatizam o processo:

-   `build:gh-pages`: Compila o projeto com a URL base correta para o GitHub Pages.
-   `deploy:gh-pages`: Publica o conteúdo da pasta `dist/` na branch `gh-pages`.

## 👨‍💻 Autor

Feito com ❤️ por **Kauan Vidigal**.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Vidigal-code)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kauan-vidigal/)

</details>

---

<details>
<summary><strong>English 🇬🇧 (Click to expand)</strong></summary>

## 📜 Table of Contents

- [About The Project](#-about-the-project-1)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used-1)
- [🏛️ Architecture & Best Practices](#️-architecture--best-practices)
- [🪝 WebHook Implementation (Bonus)](#-webhook-implementation-bonus)
- [🧪 Unit Testing (Bonus)](#-unit-testing-bonus)
- [🚀 Getting Started](#-getting-started)
- [📁 File Structure](#-file-structure)
- [☁️ Deployment](#️-deployment)
- [👨‍💻 Author](#-author-1)

## 📖 About The Project

This project is a modern and responsive Pokédex developed as a hybrid application (web/mobile) using the power of **Ionic** and **Angular**. It consumes the [PokeAPI](https://pokeapi.co/) to provide a paginated and searchable list of Pokémon, with a feature-rich detail screen for each creature.

The project was built following software development best practices, with a focus on clean code, componentization, logic reuse, and a scalable architecture.

## ✨ Features

-   **List & Pagination:** Browse a complete list of Pokémon with an efficient pagination system.
-   **Dynamic Search:** Quickly find Pokémon by name or number, with `debounce` to optimize performance.
-   **Complete Detail Screen:** View detailed information such as types, abilities, stats, habitat, and multiple sprites.
-   **Favorites System:** Bookmark your favorite Pokémon! The list is saved locally (`localStorage`) to persist between sessions.
-   **Dedicated Favorites Page:** Manage your collection of favorites on a separate screen, complete with its own search and pagination.
-   **Responsive Design:** The interface adapts perfectly to any device, whether it's a mobile phone (portrait/landscape) or a desktop, thanks to TailwindCSS.
-   **WebHook Notifications:** Actions on the favorites list (add, remove, clear) send real-time notifications to a backend server.
-   **Visual Feedback:** The application uses *Toasts* to notify users of API errors, improving the user experience.

## 🛠️ Technologies Used

-   **Frontend:**
  -   **Angular 20:** The main framework for the application's structure.
  -   **Ionic 8:** UI component library for building high-quality hybrid applications.
  -   **TypeScript:** A superset of JavaScript that adds static typing.
  -   **TailwindCSS:** A utility-first CSS framework for rapid and responsive styling.
  -   **RxJS:** A library for reactive programming, used to manage API calls and events.
-   **Backend (WebHook Server):**
  -   **Node.js:** JavaScript runtime environment on the server.
  -   **Express.js:** A minimalist framework for creating the server and the webhook route.
-   **Testing:**
  -   **Karma:** A test runner for executing unit tests.
  -   **Jasmine:** A behavior-driven testing framework for writing test cases.

## 🏛️ Architecture & Best Practices

-   **Component-Based Architecture:** The application is divided into `standalone` components (Pages, Header, Footer), promoting a separation of concerns.
-   **Dependency Injection (DI):** We use Angular's `inject()` to provide services (`PokeApiService`, `FavoritesService`, `PaginationService`) to the components. This decouples the code, facilitates maintenance, and makes unit testing possible.
-   **DRY Principle (Don't Repeat Yourself):** The pagination and search logic, which was duplicated across the Home and Favorites pages, has been abstracted into a reusable service, `PaginationService`. This centralizes the logic and makes the components cleaner.
-   **Reactivity with RxJS:** API calls return `Observables`, and the search bar uses a `Subject` with `debounceTime` to prevent excessive requests while the user is typing.
-   **Error Handling:** API failures are caught, and Ionic's `ToastController` is used to display user-friendly error messages, ensuring a more robust experience.

## 🪝 WebHook Implementation (Bonus)

A WebHook was implemented to demonstrate real-time communication from the frontend to a backend. When an action related to favorites occurs, the frontend notifies a server.

#### How It Works:

1.  **Action on the Frontend:** The user adds or removes a Pokémon from favorites in the `FavoritesService`.
2.  **HTTP Request:** The service immediately fires a `POST` request to the `http://localhost:3000/webhook` endpoint. The request `payload` contains the event type (`pokemon_added`, `pokemon_removed`, etc.) and relevant data.
    ```typescript
    // In favorites.service.ts
    this.http.post(this.webhookUrl, {
      event: 'pokemon_added',
      pokemonId,
      timestamp: new Date().toISOString()
    }).subscribe(...);
    ```
3.  **Reception on the Backend:** A simple server created with Node.js and Express is listening on port 3000.
4.  **Processing:** The server receives the `payload`, logs the information to the console, and returns a success response (`200 OK`). This simulates event processing, which in a real-world scenario could trigger an email, update a database, etc.
    ```javascript
    // In webhook-server/server.js
    app.post('/webhook', (req, res) => {
      console.log('Webhook received:', req.body);
      res.status(200).json({ message: 'Webhook processed successfully' });
    });
    ```

## 🧪 Unit Testing (Bonus)

The application has a suite of unit tests to ensure the quality and correct functioning of the components.

#### How the Tests Were Structured:

-   **Test Environment (`TestBed`):** For each component, Angular's `TestBed` is used to configure an isolated test environment, declaring the component under test and providing *mocks* for its dependencies.
-   **Mocks and Spies:** Dependencies like `PokeApiService` and `Router` are replaced with mock objects (`SpyObj`) created with `jasmine.createSpyObj`. This allows us to isolate the component and control the behavior of its dependencies during tests.
-   **Test Cases (`it` blocks):** Each `it` describes an expected behavior. We check if:
  -   The component is created successfully.
  -   Navigation to other pages is called with the correct parameters.
  -   Business logic (like adding/removing a favorite) calls the correct service methods.
  -   The component's state is updated correctly after an action.

```typescript
// Example test in favorites.page.spec.ts
it('should remove favorite and update pagination', fakeAsync(() => {
  // Initial setup of the component's state
  component.allFavorites = [
    { id: 1, name: 'bulbasaur' },
    { id: 25, name: 'pikachu' }
  ];
  component.paginationService.total = 2;
  spyOn(favoritesService, 'removeFavorite'); // Spy on the method

  // Execute the action
  component.removeFavorite(1);
  tick(); // Advance time to resolve async operations

  // Assertions
  expect(favoritesService.removeFavorite).toHaveBeenCalledWith(1);
  expect(component.allFavorites.length).toBe(1);
  expect(component.paginationService.total).toBe(1);
}));
```

## 🚀 Getting Started

You will need [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (or npm/yarn) installed.

#### 1. Frontend (Angular/Ionic App)

```bash
# Clone the repository
git clone https://github.com/Vidigal-code/challenge-PokeAPI-Angular.git

# Navigate to the project folder
cd challenge-PokeAPI-Angular

# Install dependencies
pnpm install

# Start the development server
pnpm start
```

The application will be available at `http://localhost:4200`.

#### 2. Backend (WebHook Server)

The webhook server must be run simultaneously in a separate terminal.

```bash
# In a new terminal, navigate to the server folder
cd webhook-server

# Install dependencies
pnpm install

# Create the environment file (if it doesn't exist)
cp .env.example .env

# Start the server
pnpm start
```

The server will be listening at `http://localhost:3000`. Now, favoriting actions in the application will be logged in this terminal's console.

## 📁 File Structure

The project structure was organized to maintain a clear separation of concerns.

```
.
├── src/
│   ├── app/
│   │   ├── favorites/        # Favorites Page (component, HTML, spec)
│   │   ├── home/             # Home Page (component, HTML, spec)
│   │   ├── pokemon-details/  # Details Page (component, HTML, spec)
│   │   ├── services/         # Reusable services
│   │   │   ├── favorites.service.ts
│   │   │   ├── pagination.service.ts
│   │   │   └── poke-api.service.ts
│   │   ├── header/           # Header component
│   │   ├── footer/           # Footer component
│   │   ├── app.component.ts  # Root component
│   │   └── app.routes.ts     # Route definitions
│   ├── assets/               # Static assets (icons, images)
│   └── environments/         # Environment variables
├── webhook-server/           # Node.js server for the WebHook
│   ├── server.js
│   ├── package.json
│   └── .env
└── ...
```

## ☁️ Deployment

The application is configured for deployment to GitHub Pages. The following scripts in `package.json` automate the process:

-   `build:gh-pages`: Compiles the project with the correct base URL for GitHub Pages.
-   `deploy:gh-pages`: Publishes the contents of the `dist/` folder to the `gh-pages` branch.

## 👨‍💻 Author

Made with ❤️ by **Kauan Vidigal**.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Vidigal-code)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kauan-vidigal/)

</details>


