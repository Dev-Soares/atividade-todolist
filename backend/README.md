# Backend - Tasks API

API Express minimalista para gerenciar tarefas com Prisma ORM e PostgreSQL.

## Setup

### Com Docker

```bash
# Subir Postgres + Backend
sudo docker compose up -d

# Primeira vez: aplicar migrations
sudo docker compose run --rm backend npx prisma migrate dev --name init

# Logs
sudo docker compose logs -f backend
```

### Localmente

```bash
npm install
npm run dev
```

Acesso: http://localhost:3000

## 📂 Estrutura

```
src/
├── app.js                 # Express app config + middlewares
├── server.js              # Entry point
├── controllers/
│   └── taskController.js  # Controllers de Tasks
├── services/
│   └── taskService.js     # Business logic (Prisma queries)
├── routes/
│   └── route.js           # Rotas
└── lib/
    └── prisma.js          # Singleton Prisma Client

prisma/
├── schema.prisma          # Schema do banco
└── migrations/            # Histórico de migrations
```

## 🔌 Endpoints

- `GET /tasks` — Listar tarefas (ordenado por data desc)
- `POST /tasks` — Criar tarefa (body: `{title, description}`)
- `PUT /tasks/:id` — Editar tarefa (body: `{title, description}`)
- `DELETE /tasks/:id` — Deletar tarefa

## 🐘 Database

**Postgres 16 Alpine** rodando em container:
- Host: `postgres` (dentro do Docker network)
- User: `postgres`
- Pass: `postgres`
- DB: `app_db`
- Volume: `postgres_data` (persistente)

## 🔧 Scripts

```bash
npm run dev                         # Start com nodemon
npm start                           # Start produção
npm run prisma:generate             # Generate Prisma Client
npm run prisma:migrate              # Executar migrations
```

## 📝 Environment

Arquivo `.env`:
```
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/app_db?schema=public"
PORT=3000
```

> Nota: Se rodar localmente, mude `postgres` para `localhost` no `DATABASE_URL`

## 🛑 Troubleshoot

**"Cannot find module '@prisma/client'"**
```bash
npm install
npm run prisma:generate
```

**Migration failing**
```bash
# Reset local migrations (dev only)
npx prisma migrate reset --force

# Ou com Docker
sudo docker compose run --rm backend npx prisma migrate reset --force
```

**Port already in use**
```bash
# Mude a porta na .env ou rodando:
PORT=3001 npm run dev
```

---

Ver [README.md](../README.md) na raiz para instruções completas do projeto.
