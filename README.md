# Atividade Prática - Tasks App

Um projeto full-stack minimalista com **Node.js + Express + React + PostgreSQL** para gerenciar tarefas.

## Estrutura

```
├── backend/          # API Express com Prisma + PostgreSQL
├── frontend/         # React + Vite
└── README.md
```

## ⚡ Início Rápido

### Com Docker Compose (Recomendado)

Na pasta raiz:

```bash
# Subir Postgres + Backend
cd backend
sudo docker compose up -d

# Aplicar migrations (primeira vez)
sudo docker compose run --rm backend npx prisma migrate dev --name init

# Frontend em outro terminal
cd frontend
npm install
npm run dev
```

Abra **http://localhost:5175/**

### Localmente (sem Docker)

#### Backend

```bash
cd backend
npm install
npm run dev
```

Acesso: http://localhost:3000

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesso: http://localhost:5174/ (ou próxima porta livre)

> **Nota**: Se rodar localmente, precisará de um Postgres rodando em `localhost:5432` com credenciais:
> - User: `postgres`
> - Password: `postgres`
> - DB: `app_db`

## 📝 API Endpoints

| Método | Endpoint      | Descrição            |
|--------|---------------|----------------------|
| GET    | `/tasks`      | Listar todas tarefas |
| POST   | `/tasks`      | Criar nova tarefa    |
| PUT    | `/tasks/:id`  | Editar tarefa        |
| DELETE | `/tasks/:id`  | Deletar tarefa       |

### Exemplo: Criar Tarefa

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Comprar leite","description":"Mercado"}'
```

## 📦 Stack

- **Backend**: Express.js, Prisma ORM, PostgreSQL, CORS
- **Frontend**: React 19, Vite, Fetch API
- **DevOps**: Docker, Docker Compose

## 🗂️ Diretórios Importantes

- `backend/prisma/` — Schema Prisma e migrations
- `backend/src/` — Controllers, Services, Rotas
- `frontend/src/` — Componentes React (App.jsx, Tasks.jsx)

## 📌 Variáveis de Ambiente

### Backend (`.env`)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db?schema=public"
PORT=3000
```

### Frontend
```
VITE_API_URL=http://localhost:3000
```

## 🛑 Parar Containers

```bash
cd backend
sudo docker compose down
```

## 🔄 Resetar DB

```bash
cd backend
sudo docker compose down -v  # Remove volumes
sudo docker compose up -d
sudo docker compose run --rm backend npx prisma migrate dev --name init
```

---

Pronto para usar! 🚀
# atividade-todolist
