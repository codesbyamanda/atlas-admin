# Atlas Admin

Dashboard administrativo desenvolvido com **Next.js 15, React, TypeScript, Tailwind CSS, Zustand, React Hook Form e Zod**, simulando uma aplicação SaaS com autenticação, rotas protegidas, telas de gestão e estrutura modular por features.

O projeto foi criado como portfólio profissional para demonstrar boas práticas de desenvolvimento front-end em aplicações web modernas, com foco em arquitetura, experiência do usuário, componentização e organização escalável de código.

---

## Visão geral

O **Atlas Admin** é um painel administrativo que simula o ambiente de uma aplicação SaaS, com fluxo de login, área protegida e telas internas para acompanhamento de métricas, clientes, pedidos e configurações de conta.

A aplicação foi desenvolvida para demonstrar competências importantes em front-end, como:

* construção de interfaces responsivas;
* organização modular por domínio;
* gerenciamento de estado global;
* criação de rotas protegidas;
* formulários com validação;
* feedbacks visuais para o usuário;
* tratamento de estados de loading, error, empty e success;
* componentização reutilizável;
* estrutura preparada para futura integração com APIs reais.

---

## Funcionalidades

### Autenticação simulada

* Tela de login.
* Controle de estado de autenticação com Zustand.
* Redirecionamento com base no status do usuário.
* Área protegida para usuários autenticados.
* Logout funcional.

### Dashboard

* Tela inicial com indicadores administrativos.
* Cards de métricas.
* Estados de carregamento com skeleton.
* Organização visual para leitura rápida dos principais dados.

Exemplos de indicadores simulados:

* total de pedidos;
* receita;
* clientes ativos;
* pedidos pendentes.

### Customers

* Listagem de clientes.
* Exibição em tabela.
* Estado de carregamento.
* Estado vazio.
* Tratamento de erro.
* Modal de confirmação para exclusão.
* Estrutura preparada para evolução para CRUD completo.

### Orders

* Listagem de pedidos.
* Filtro por status.
* Badges visuais para diferenciação de status.
* Estado de carregamento com skeleton.
* Interface organizada para acompanhamento de pedidos.

### Settings

* Formulário de preferências de conta.
* Gerenciamento de formulário com React Hook Form.
* Validação de campos com Zod.
* Campos para nome, e-mail e alteração opcional de senha.
* Feedback visual para preenchimento e validação.

### Layout responsivo

* Sidebar para navegação principal.
* Header com ações e identificação da área logada.
* Menu mobile.
* Layout adaptado para diferentes tamanhos de tela.
* Organização visual consistente entre as páginas.

---

## Tecnologias utilizadas

* **Next.js 15** — framework React com App Router.
* **React** — construção da interface.
* **TypeScript** — tipagem estática e maior segurança no desenvolvimento.
* **Tailwind CSS** — estilização responsiva e utilitária.
* **Zustand** — gerenciamento de estado global.
* **React Hook Form** — controle de formulários.
* **Zod** — validação de dados.
* **Lucide React** — biblioteca de ícones.
* **Git/GitHub** — versionamento de código.
* **Vercel** — deploy da aplicação.

---

## Decisões técnicas

### Arquitetura baseada em features

O projeto utiliza uma organização modular baseada em features, separando a aplicação por domínios como `auth`, `dashboard`, `customers`, `orders` e `settings`.

Essa abordagem facilita:

* manutenção do código;
* localização de responsabilidades;
* evolução de funcionalidades;
* escalabilidade da aplicação;
* separação entre regras, componentes e telas.

### Rotas protegidas com App Router

A estrutura utiliza grupos de rota do Next.js para separar áreas públicas e protegidas:

* `(auth)` para telas de autenticação;
* `(protected)` para telas internas da aplicação.

Essa separação deixa o fluxo de autenticação mais claro e aproxima o projeto de uma estrutura comum em aplicações SaaS reais.

### Estado global com Zustand

O Zustand foi utilizado para controlar o estado de autenticação de forma simples e previsível.

Essa escolha evita complexidade desnecessária para o contexto do projeto e permite centralizar informações globais da sessão simulada.

### Formulários com React Hook Form e Zod

A tela de configurações utiliza React Hook Form para gerenciar os campos do formulário e Zod para validação.

Essa combinação melhora:

* controle dos dados;
* validação dos campos;
* legibilidade do código;
* experiência do usuário;
* segurança na manipulação das informações.

### Tratamento de estados da interface

A aplicação considera diferentes estados de uso:

* carregamento;
* erro;
* ausência de dados;
* sucesso;
* confirmação de ação.

Esse cuidado melhora a experiência do usuário e evita telas vazias, quebradas ou sem feedback.

---

## Estrutura do projeto

```bash
app/
├── (auth)/
│   └── login/
│
├── (protected)/
│   ├── customers/
│   ├── dashboard/
│   ├── orders/
│   ├── settings/
│   └── layout.tsx
│
├── globals.css
├── icon.ico
├── layout.tsx
└── page.tsx

features/
├── auth/
├── customers/
├── dashboard/
│   └── components/
├── orders/
└── settings/

shared/
├── components/
└── layout/

lib/
```

---

## Organização das principais pastas

### `app`

Contém a estrutura de rotas da aplicação utilizando o App Router do Next.js.

A pasta é separada em:

* `(auth)`: rotas públicas relacionadas à autenticação;
* `(protected)`: rotas internas acessadas após login;
* arquivos globais como layout, estilos e página inicial.

### `features`

Concentra os módulos principais da aplicação.

Cada feature representa uma área funcional do sistema, como autenticação, clientes, pedidos, dashboard e configurações.

Essa separação evita que regras e componentes de diferentes domínios fiquem misturados.

### `shared`

Armazena componentes e estruturas reutilizáveis entre diferentes partes da aplicação.

Inclui elementos compartilhados de interface e layout.

### `lib`

Contém utilitários e configurações auxiliares que podem ser reutilizados no projeto.

---

## Fluxo da aplicação

O fluxo principal da aplicação segue esta ideia:

```txt
Usuário acessa a aplicação
        ↓
Tela de login
        ↓
Estado de autenticação com Zustand
        ↓
Redirecionamento para área protegida
        ↓
Dashboard administrativo
        ↓
Navegação entre Customers, Orders e Settings
```

---

## Estados de interface tratados

O projeto utiliza diferentes componentes e padrões visuais para lidar com estados comuns em aplicações reais:

* **Loading:** uso de skeleton para indicar carregamento.
* **Error:** feedback visual para falhas.
* **Empty:** indicação clara quando não existem dados disponíveis.
* **Success:** exibição dos dados e feedbacks após ações.
* **Confirmation:** modal para confirmação de exclusão.

---

## Como rodar localmente

Clone o repositório:

```bash
git clone https://github.com/codesbyamanda/atlas-admin.git
```

Acesse a pasta do projeto:

```bash
cd atlas-admin
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse no navegador:

```bash
http://localhost:3000
```

---

## Scripts disponíveis

```bash
npm run dev
```

Executa a aplicação em ambiente de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção da aplicação.

```bash
npm run start
```

Executa a versão de produção após o build.

```bash
npm run lint
```

Executa a verificação de lint do projeto.

---

## Deploy

A aplicação está disponível em:

```txt
https://dashboardadmin-kohl.vercel.app/login
```

---

## Repositório

```txt
https://github.com/codesbyamanda/atlas-admin
```

---

## Aprendizados aplicados

Durante o desenvolvimento deste projeto, foram aplicados conceitos importantes para aplicações front-end modernas:

* criação de dashboard administrativo;
* organização modular por features;
* uso de rotas públicas e protegidas;
* gerenciamento de estado global com Zustand;
* construção de formulários com React Hook Form;
* validação com Zod;
* componentização de interface;
* criação de layout responsivo;
* feedbacks visuais para ações do usuário;
* tratamento de estados de loading, error, empty e success;
* estruturação de projeto com foco em manutenção e escalabilidade.

---

## Próximos passos

Possíveis melhorias futuras:

* integrar autenticação real;
* conectar a aplicação a uma API externa;
* implementar CRUD completo de clientes;
* adicionar criação e edição de pedidos;
* persistir dados em banco;
* adicionar testes unitários;
* adicionar testes de interface;
* melhorar acessibilidade dos componentes;
* incluir tema claro/escuro;
* criar permissões por tipo de usuário.

---

## Observações

Este projeto é focado em **front-end** e utiliza dados simulados para representar fluxos comuns de uma aplicação administrativa.

A estrutura foi pensada para facilitar uma futura evolução para um sistema completo, com autenticação real, API, banco de dados e regras de negócio persistidas.

---

## Autora

Desenvolvido por **Amanda Ribeiro**.

* Portfólio: `https://codesbyamanda.vercel.app`
* LinkedIn: `https://www.linkedin.com/in/codesbyamanda/`
* GitHub: `https://github.com/codesbyamanda`
