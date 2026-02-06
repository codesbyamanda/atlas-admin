# Admin Dashboard

Dashboard administrativo moderno construído com **Next.js 15**, **React**, **TypeScript** e **Tailwind CSS**, focado em boas práticas de arquitetura front‑end, UX e organização de código.

Projeto desenvolvido com objetivo de **portfólio profissional**, simulando um painel real de administração.

---

## Visão Geral

Este projeto representa um **Admin Dashboard completo**, com autenticação simulada, rotas protegidas e telas típicas de sistemas SaaS:

* Login
* Dashboard (métricas)
* Customers (CRUD parcial)
* Orders (listagem e filtros)
* Settings (formulário com validação)

Tudo organizado por **features**, seguindo um padrão escalável e fácil de manter.

---

## Stack Utilizada

* **Next.js 15 (App Router)**
* **React + TypeScript**
* **Tailwind CSS**
* **Zustand** (gerenciamento de estado)
* **React Hook Form**
* **Zod** (validação)
* **Lucide Icons**

---

## Estrutura de Pastas

```bash
app/
 ├─ (auth)/login
 ├─ (protected)/
 │   ├─ dashboard
 │   ├─ customers
 │   ├─ orders
 │   └─ settings
 ├─ layout.tsx
 └─ globals.css

features/
 ├─ auth
 ├─ dashboard
 ├─ customers
 ├─ orders
 └─ settings

shared/
 ├─ components
 └─ utils
```

> Organização baseada em **feature‑based architecture**, facilitando escala e manutenção.

---

## Autenticação

* Login simulado
* Estado global com **Zustand**
* Rotas protegidas usando layout `(protected)`
* Logout funcional

---

## Dashboard

* Cards de métricas
* Skeleton loading
* Dados simulados

Exemplos de métricas:

* Total Orders
* Revenue
* Active Customers
* Pending Orders

---

## Customers

Funcionalidades:

* Listagem de clientes
* Skeleton loading
* Empty state
* Modal de confirmação para exclusão

Estados tratados:

* Loading
* Error
* Empty
* Success

---

## Orders

Funcionalidades:

* Listagem de pedidos
* Filtro por status
* Skeleton loading
* Status visual (badges)

---

## Settings

* Formulário controlado com **React Hook Form**
* Validação com **Zod**
* Campos:

  * Nome
  * Email
  * Nova senha (opcional)

Pensado para simular uma tela real de preferências de conta.

---

## UI / UX

* Layout fixo com sidebar + header
* Design limpo e consistente
* Feedback visual para ações
* Estados bem definidos

---

## Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar em desenvolvimento
npm run dev
```

Acesse:

```
http://localhost:3000
```

---

## Deploy

Projeto pronto para deploy na **Vercel**.

```bash
npm run build
```

---

## Observações

* Projeto focado em **front‑end** (sem backend real)
* Dados mockados
* Estrutura pensada para fácil integração futura com APIs

---

## Autor

Desenvolvido por **codesbyamanda** 💙
Front‑end Developer

---

Se você chegou até aqui, obrigado por conferir o projeto 
