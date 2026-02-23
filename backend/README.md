# Phonebook Backend

Backend de la aplicación Phonebook (Node.js + Express + MongoDB), preparado para desarrollo local, tests automáticos y despliegue.

## Demo en producción

- URL: https://phonebook-ausar.fly.dev/

## Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- Morgan
- CORS
- dotenv
- node:test + supertest

## Arquitectura

El backend está separado para mantener responsabilidades claras:

- `app.js`: configuración de la app Express (middlewares, rutas, handlers)
- `index.js`: arranque del servidor
- `controllers/`: rutas de dominio (`persons`, `testing`)
- `models/`: esquemas y validaciones de Mongoose
- `utils/`: configuración, logger y middlewares comunes
- `tests/`: pruebas de integración de la API

## Variables de entorno

Crear un archivo `.env` en `backend/` con:

- `MONGODB_URI` → base principal
- `TEST_MONGODB_URI` → base para tests
- `PORT` (opcional, por defecto `3001`)

También podés usar `.env.example` como plantilla.

## Ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar backend:

```bash
npm run dev
```

Servidor disponible en: `http://localhost:3001`

## Scripts

- `npm start` → inicia servidor
- `npm run dev` → servidor con nodemon
- `npm run start:test` → servidor en modo test (`NODE_ENV=test`)
- `npm test` → pruebas de integración API
- `npm run lint` → lint
- `npm run lint:fix` → lint con autofix
- `npm run build:ui` → compila frontend y copia `dist` al backend
- `npm run deploy` → despliegue
- `npm run deploy:full` → build frontend + deploy

## Endpoints principales

- `GET /api/persons`
- `GET /api/persons/:id`
- `POST /api/persons`
- `PUT /api/persons/:id`
- `DELETE /api/persons/:id`
- `GET /info`

### Endpoint de testing

- `POST /api/testing/reset`

Disponible solo en modo test, útil para pruebas E2E/integración.

## Validaciones de datos

En el modelo `Person`:

- `name`: requerido, mínimo 3 caracteres, único
- `number`: requerido y con formato válido (ejemplo: `09-1234556`)

## Estado del proyecto

- Backend funcional ✅
- Pruebas de API pasando ✅
