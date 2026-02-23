# 📱 Phonebook App

Aplicación full stack de agenda de contactos, construida como proyecto de práctica de **Full Stack Open**.

## 🚀 Demo en producción

- **URL:** https://phonebook-ausar.fly.dev/

## 🧩 Estructura del proyecto

```text
phonebook/
├── backend/   # API REST + MongoDB + deploy en Fly.io
└── frontend/  # React + Vite + tests unitarios + Playwright E2E
```

## 🛠️ Stack tecnológico

### Frontend
- React
- Vite
- Axios
- Vitest + Testing Library
- Playwright

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- node:test + supertest
- Fly.io (deploy)

## ⚙️ Requisitos

- Node.js instalado
- npm
- Cuenta y base de datos MongoDB

## 🔐 Variables de entorno (backend)

Crear `backend/.env` con:

- `MONGODB_URI` (base principal)
- `TEST_MONGODB_URI` (base de pruebas)
- `PORT` (opcional, por defecto `3001`)

## ▶️ Ejecutar en local

### 1) Backend

Desde `backend/`:

- `npm install`
- `npm run dev`

Servidor backend en `http://localhost:3001`.

### 2) Frontend

Desde `frontend/`:

- `npm install`
- `npm run dev`

Frontend en `http://localhost:5173`.

> El frontend usa proxy para `/api/*` hacia el backend.

## 🧪 Tests

### Backend

Desde `backend/`:

- `npm test`

### Frontend (unit/component)

Desde `frontend/`:

- `npm test`

### Frontend E2E

Con backend y frontend corriendo:

- `npm run test:e2e`

## 📦 Deploy

El deploy productivo está en Fly.io:

- https://phonebook-ausar.fly.dev/

## 📚 Documentación por módulo

- `backend/README.md`
- `frontend/README.md`

## ✅ Estado

- Backend funcional
- Frontend funcional
- Tests de backend y frontend configurados
- E2E Playwright disponible
