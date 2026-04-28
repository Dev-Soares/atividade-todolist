# Frontend - Tasks UI

React + Vite minimalista para gerenciar tarefas via API.

## Setup

```bash
npm install
npm run dev
```

Acesso: **http://localhost:5174/** (ou próxima porta livre)

## 📂 Estrutura

```
src/
├── App.jsx           # Main component
├── Tasks.jsx         # Tasks list/create/edit/delete
├── App.css           # Estilos responsivos
├── index.css         # CSS global
├── main.jsx          # Entry point
└── assets/
```

## 🎨 UI Features

- ✅ **Listar tarefas** — GET `/tasks`
- ✅ **Criar tarefa** — POST `/tasks` com título + descrição
- ✅ **Editar inline** — PUT `/tasks/:id` com Save/Cancel
- ✅ **Deletar** — DELETE `/tasks/:id`
- ✅ **Responsivo** — Mobile-friendly

## 🔗 API Connection

O frontend conecta à API por padrão em `http://localhost:3000`.

Para mudar a URL, defina a env var:

```bash
VITE_API_URL=http://seu-backend:3000 npm run dev
```

Ou edite em `src/Tasks.jsx`:
```javascript
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'
```

## 📦 Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build otimizado
npm run preview   # Preview do build
npm run lint      # ESLint check
```

## 🎯 Componentes

### App.jsx
- Layout principal
- Monta `<Tasks />`

### Tasks.jsx
- Form de criar tarefa
- Lista de tarefas com edição inline
- Botões: Create, Edit, Save, Cancel, Delete
- Estados: `tasks`, `title`, `description`, `editingId`, etc

## 🎨 Estilos

Tema claro com:
- Cards com borda sutil
- Botões primários (azul) e secundários (cinza)
- Botão de delete (vermelho)
- Responsividade (mobile: layout em coluna)

Customizar cores em `src/App.css`

## 🚀 Build

```bash
npm run build
npm run preview
```

Gera pasta `dist/` otimizada para produção.

## 🔧 Troubleshoot

**"Cannot GET /tasks" / Network error**
- Verificar se backend está rodando: `curl http://localhost:3000/tasks`
- Conferir se `VITE_API_URL` está correto
- Verificar CORS no backend

**Port already in use**
```bash
# Vite tenta próxima porta automaticamente
# Ou especifique:
npm run dev -- --port 5177
```

**HMR issues**
```bash
npm run dev -- --clearScreen=false
```

---

Ver [README.md](../README.md) na raiz para instruções completas.
